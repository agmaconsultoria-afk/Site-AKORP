import { Router, type IRouter } from "express";
import { Readable } from "stream";
import { eq, desc } from "drizzle-orm";
import { db, documentsTable } from "@workspace/db";
import {
  GetMeResponse,
  ListMyDocumentsResponse,
  GetMyDocumentContentParams,
} from "@workspace/api-zod";
import { requireAuth } from "../middlewares/auth";
import { ObjectStorageService, ObjectNotFoundError } from "../lib/objectStorage";

const router: IRouter = Router();
const objectStorage = new ObjectStorageService();

router.get("/portal/me", requireAuth, async (req, res): Promise<void> => {
  const user = req.localUser!;
  res.json(
    GetMeResponse.parse({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }),
  );
});

router.get("/portal/documents", requireAuth, async (req, res): Promise<void> => {
  const user = req.localUser!;
  const rows = await db
    .select()
    .from(documentsTable)
    .where(eq(documentsTable.ownerUserId, user.id))
    .orderBy(desc(documentsTable.createdAt));

  res.json(
    ListMyDocumentsResponse.parse(
      rows.map((d) => ({
        id: d.id,
        title: d.title,
        contentType: d.contentType,
        size: d.size,
        createdAt: d.createdAt,
      })),
    ),
  );
});

router.get(
  "/portal/documents/:id/content",
  requireAuth,
  async (req, res): Promise<void> => {
    const params = GetMyDocumentContentParams.safeParse(req.params);
    if (!params.success) {
      res.status(400).json({ error: "Identificador inválido" });
      return;
    }

    const user = req.localUser!;
    const [doc] = await db
      .select()
      .from(documentsTable)
      .where(eq(documentsTable.id, params.data.id));

    if (!doc) {
      res.status(404).json({ error: "Documento não encontrado" });
      return;
    }

    if (doc.ownerUserId !== user.id && user.role !== "admin") {
      res.status(403).json({ error: "Acesso negado" });
      return;
    }

    try {
      const objectFile = await objectStorage.getObjectEntityFile(doc.objectPath);
      const response = await objectStorage.downloadObject(objectFile);

      res.status(response.status);
      response.headers.forEach((value, key) => res.setHeader(key, value));

      if (response.body) {
        const nodeStream = Readable.fromWeb(
          response.body as ReadableStream<Uint8Array>,
        );
        nodeStream.pipe(res);
      } else {
        res.end();
      }
    } catch (error) {
      if (error instanceof ObjectNotFoundError) {
        res.status(404).json({ error: "Arquivo não encontrado" });
        return;
      }
      req.log.error({ err: error }, "Error serving document");
      res.status(500).json({ error: "Erro ao carregar o documento" });
    }
  },
);

export default router;
