import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, documentsTable, usersTable } from "@workspace/db";
import {
  RequestUploadUrlBody,
  RequestUploadUrlResponse,
  ListAdminDocumentsResponse,
  ListAdminDocumentsResponseItem,
  CreateDocumentBody,
  DeleteDocumentParams,
  ListClientsResponse,
} from "@workspace/api-zod";
import type { Request } from "express";
import { requireAuth, requireAdmin } from "../middlewares/auth";
import { ObjectStorageService } from "../lib/objectStorage";
import { sendDocumentNotification } from "../lib/mailer";

const router: IRouter = Router();
const objectStorage = new ObjectStorageService();

// Build the public portal URL for email links. The API sits behind the shared
// reverse proxy, so prefer the forwarded host/proto set by the proxy, then the
// request host, then an explicit PUBLIC_APP_ORIGIN override. Returns null when
// no host can be determined so we never email a broken "https:///portal" link.
function firstHeaderValue(value: string | string[] | undefined): string | null {
  if (!value) return null;
  const raw = Array.isArray(value) ? value[0] : value;
  const first = raw.split(",")[0]?.trim();
  return first || null;
}

function resolvePortalUrl(req: Request): string | null {
  const host =
    firstHeaderValue(req.headers["x-forwarded-host"]) ?? req.get("host");
  if (host) {
    const proto =
      firstHeaderValue(req.headers["x-forwarded-proto"]) ??
      (host.includes("localhost") || host.startsWith("127.") ? "http" : "https");
    return `${proto}://${host}/portal`;
  }
  const envOrigin = process.env.PUBLIC_APP_ORIGIN;
  return envOrigin ? `${envOrigin.replace(/\/+$/, "")}/portal` : null;
}

router.use("/admin", requireAuth, requireAdmin);

router.post(
  "/admin/uploads/request-url",
  async (req, res): Promise<void> => {
    const parsed = RequestUploadUrlBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Dados de upload inválidos" });
      return;
    }

    try {
      const { name, size, contentType } = parsed.data;
      const uploadURL = await objectStorage.getObjectEntityUploadURL();
      const objectPath = objectStorage.normalizeObjectEntityPath(uploadURL);

      res.json(
        RequestUploadUrlResponse.parse({
          uploadURL,
          objectPath,
          metadata: { name, size, contentType },
        }),
      );
    } catch (error) {
      req.log.error({ err: error }, "Error generating upload URL");
      res.status(500).json({ error: "Falha ao gerar URL de upload" });
    }
  },
);

router.get("/admin/documents", async (_req, res): Promise<void> => {
  const rows = await db
    .select({
      id: documentsTable.id,
      title: documentsTable.title,
      contentType: documentsTable.contentType,
      size: documentsTable.size,
      createdAt: documentsTable.createdAt,
      ownerEmail: usersTable.email,
      ownerName: usersTable.name,
    })
    .from(documentsTable)
    .innerJoin(usersTable, eq(documentsTable.ownerUserId, usersTable.id))
    .orderBy(desc(documentsTable.createdAt));

  res.json(ListAdminDocumentsResponse.parse(rows));
});

router.post("/admin/documents", async (req, res): Promise<void> => {
  const parsed = CreateDocumentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Dados do documento inválidos" });
    return;
  }

  const { title, ownerEmail, objectPath, contentType, size } = parsed.data;
  const emailLower = ownerEmail.trim().toLowerCase();

  // Find or create the owner (a client may not have signed in yet, in which
  // case we create a pending row that gets linked on their first sign-in).
  // Upsert so this never races with the client's first-login provisioning.
  const [owner] = await db
    .insert(usersTable)
    .values({ email: emailLower, role: "client" })
    .onConflictDoUpdate({
      target: usersTable.email,
      set: { email: emailLower },
    })
    .returning();

  const [doc] = await db
    .insert(documentsTable)
    .values({
      title,
      ownerUserId: owner.id,
      objectPath,
      contentType,
      size,
    })
    .returning();

  // Notify the client by email that a new document is available. Email is a
  // best-effort side effect — never fail document creation if it can't send.
  const portalUrl = resolvePortalUrl(req);
  if (!portalUrl) {
    req.log.warn(
      "Skipping notification email: could not resolve public portal URL",
    );
  } else {
    try {
      await sendDocumentNotification({
        toEmail: owner.email,
        toName: owner.name,
        documentTitle: doc.title,
        portalUrl,
      });
    } catch (error) {
      req.log.error(
        { err: error, ownerEmail: owner.email },
        "Failed to send document notification email",
      );
    }
  }

  res.status(201).json(
    ListAdminDocumentsResponseItem.parse({
      id: doc.id,
      title: doc.title,
      contentType: doc.contentType,
      size: doc.size,
      createdAt: doc.createdAt,
      ownerEmail: owner.email,
      ownerName: owner.name,
    }),
  );
});

router.delete("/admin/documents/:id", async (req, res): Promise<void> => {
  const params = DeleteDocumentParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: "Identificador inválido" });
    return;
  }

  const [deleted] = await db
    .delete(documentsTable)
    .where(eq(documentsTable.id, params.data.id))
    .returning();

  if (!deleted) {
    res.status(404).json({ error: "Documento não encontrado" });
    return;
  }

  res.sendStatus(204);
});

router.get("/admin/clients", async (_req, res): Promise<void> => {
  const rows = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      name: usersTable.name,
      createdAt: usersTable.createdAt,
    })
    .from(usersTable)
    .where(eq(usersTable.role, "client"))
    .orderBy(usersTable.email);

  res.json(ListClientsResponse.parse(rows));
});

export default router;
