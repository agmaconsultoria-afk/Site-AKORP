import type { Request, Response, NextFunction } from "express";
import { getAuth, clerkClient } from "@clerk/express";
import { eq } from "drizzle-orm";
import { db, usersTable, type User } from "@workspace/db";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      localUser?: User;
    }
  }
}

const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase() || null;

function isAdminEmail(email: string): boolean {
  return adminEmail !== null && email.toLowerCase() === adminEmail;
}

/**
 * Provision (or update) the local user row that mirrors the authenticated
 * Clerk user. Bridges Clerk identities to our own `users` table:
 * - Links a Clerk id to a pending row that an admin created by email.
 * - Creates a fresh row on first sign-in.
 * - Always keeps the configured ADMIN_EMAIL promoted to the admin role.
 */
async function provisionLocalUser(clerkUserId: string): Promise<User | null> {
  const [existing] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerkUserId, clerkUserId));

  if (existing) {
    if (isAdminEmail(existing.email) && existing.role !== "admin") {
      const [promoted] = await db
        .update(usersTable)
        .set({ role: "admin" })
        .where(eq(usersTable.id, existing.id))
        .returning();
      return promoted ?? existing;
    }
    return existing;
  }

  const clerkUser = await clerkClient.users.getUser(clerkUserId);
  const email =
    clerkUser.primaryEmailAddress?.emailAddress ??
    clerkUser.emailAddresses[0]?.emailAddress;

  if (!email) {
    return null;
  }

  const emailLower = email.toLowerCase();
  const name =
    [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || null;
  const admin = isAdminEmail(emailLower);

  const [pending] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, emailLower));

  if (pending) {
    const [linked] = await db
      .update(usersTable)
      .set({
        clerkUserId,
        name: pending.name ?? name,
        role: admin ? "admin" : pending.role,
      })
      .where(eq(usersTable.id, pending.id))
      .returning();
    return linked ?? pending;
  }

  try {
    const [created] = await db
      .insert(usersTable)
      .values({
        clerkUserId,
        email: emailLower,
        name,
        role: admin ? "admin" : "client",
      })
      .returning();
    return created ?? null;
  } catch {
    // A concurrent request (another login, or an admin assigning a document by
    // email) may have created a row first. The collision can happen on either
    // the email or the clerkUserId unique constraint, so re-read by both and
    // link the Clerk id to a pending (clerk-less) row if needed.
    const [byClerk] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.clerkUserId, clerkUserId));
    if (byClerk) return byClerk;

    const [byEmail] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, emailLower));
    if (!byEmail) return null;
    if (byEmail.clerkUserId) return byEmail;

    const [linked] = await db
      .update(usersTable)
      .set({
        clerkUserId,
        name: byEmail.name ?? name,
        role: admin ? "admin" : byEmail.role,
      })
      .where(eq(usersTable.id, byEmail.id))
      .returning();
    return linked ?? byEmail;
  }
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const auth = getAuth(req);
  const clerkUserId = auth?.userId;

  if (!clerkUserId) {
    res.status(401).json({ error: "Não autenticado" });
    return;
  }

  try {
    const user = await provisionLocalUser(clerkUserId);
    if (!user) {
      res.status(401).json({ error: "Não foi possível carregar o usuário" });
      return;
    }
    req.localUser = user;
    next();
  } catch (error) {
    req.log.error({ err: error }, "Failed to provision local user");
    res.status(500).json({ error: "Erro ao carregar o usuário" });
  }
}

export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (!req.localUser || req.localUser.role !== "admin") {
    res.status(403).json({ error: "Acesso restrito ao administrador" });
    return;
  }
  next();
}
