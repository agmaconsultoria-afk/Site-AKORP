import { useQuery } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import {
  getListMyDocumentsQueryOptions,
  getGetMyDocumentContentUrl,
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";

export default function DocumentViewer() {
  const [, params] = useRoute("/portal/documents/:id");
  const id = Number(params?.id);
  const hasId = Number.isFinite(id);

  const { data: documents, isLoading } = useQuery(
    getListMyDocumentsQueryOptions(),
  );

  const doc = documents?.find((d) => d.id === id);
  const contentUrl = hasId ? getGetMyDocumentContentUrl(id) : "";
  const downloadUrl = contentUrl
    ? `${contentUrl}${contentUrl.includes("?") ? "&" : "?"}download=1`
    : "";

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
          <Link href="/portal">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
          <p className="min-w-0 flex-1 truncate text-center font-medium text-foreground">
            {doc?.title ?? "Documento"}
          </p>
          {downloadUrl ? (
            <a href={downloadUrl} download>
              <Button size="sm">
                <Download className="mr-2 h-4 w-4" />
                Baixar
              </Button>
            </a>
          ) : (
            <div className="w-[92px]" />
          )}
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-6">
        {isLoading ? (
          <div className="flex flex-1 items-center justify-center text-muted-foreground">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Carregando documento...
          </div>
        ) : !doc ? (
          <div className="flex flex-1 items-center justify-center text-muted-foreground">
            Documento não encontrado.
          </div>
        ) : (
          <iframe
            key={id}
            src={contentUrl}
            title={doc.title}
            sandbox=""
            referrerPolicy="no-referrer"
            className="min-h-[70vh] w-full flex-1 rounded-md border border-border bg-white"
          />
        )}
      </main>
    </div>
  );
}
