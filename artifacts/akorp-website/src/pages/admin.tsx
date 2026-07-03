import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useClerk } from "@clerk/react";
import { Link } from "wouter";
import {
  ArrowLeft,
  LogOut,
  Loader2,
  Trash2,
  UploadCloud,
  Users,
  FileText,
} from "lucide-react";
import { useUpload } from "@workspace/object-storage-web";
import {
  getListAdminDocumentsQueryOptions,
  getListClientsQueryOptions,
  getListAdminDocumentsQueryKey,
  getListClientsQueryKey,
  useCreateDocument,
  useDeleteDocument,
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function formatDate(value: string | Date): string {
  const d = typeof value === "string" ? new Date(value) : value;
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function Admin() {
  const { signOut } = useClerk();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { data: documents, isLoading: docsLoading } = useQuery(
    getListAdminDocumentsQueryOptions(),
  );
  const { data: clients } = useQuery(getListClientsQueryOptions());

  const { uploadFile, isUploading } = useUpload({ basePath: "/api/admin" });

  const createDocument = useCreateDocument({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getListAdminDocumentsQueryKey(),
        });
        queryClient.invalidateQueries({ queryKey: getListClientsQueryKey() });
        setTitle("");
        setOwnerEmail("");
        setFile(null);
        toast({ title: "Documento enviado com sucesso." });
      },
      onError: () => {
        toast({
          title: "Erro ao salvar o documento.",
          variant: "destructive",
        });
      },
    },
  });

  const deleteDocument = useDeleteDocument({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getListAdminDocumentsQueryKey(),
        });
        toast({ title: "Documento removido." });
      },
      onError: () => {
        toast({ title: "Erro ao remover.", variant: "destructive" });
      },
    },
  });

  const busy = isUploading || createDocument.isPending;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !title.trim() || !ownerEmail.trim()) {
      toast({
        title: "Preencha o título, o e-mail do cliente e selecione o arquivo.",
        variant: "destructive",
      });
      return;
    }

    const uploaded = await uploadFile(file);
    if (!uploaded) {
      toast({ title: "Falha no upload do arquivo.", variant: "destructive" });
      return;
    }

    createDocument.mutate({
      data: {
        title: title.trim(),
        ownerEmail: ownerEmail.trim(),
        objectPath: uploaded.objectPath,
        contentType: uploaded.metadata.contentType,
        size: uploaded.metadata.size,
      },
    });
  }

  return (
    <div className="min-h-[100dvh] bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link
            href="/portal"
            className="flex items-center gap-2 font-serif text-lg text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            <img src={`${basePath}/logo.svg`} alt="AKORP" className="h-8 w-8" />
            Administração
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut({ redirectUrl: basePath || "/" })}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-8 px-4 py-10 lg:grid-cols-[380px_1fr]">
        <section>
          <Card className="p-6">
            <h2 className="mb-4 flex items-center gap-2 font-serif text-xl text-foreground">
              <UploadCloud className="h-5 w-5 text-primary" />
              Enviar documento
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="title">Título do documento</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex.: Balancete Junho/2026"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">E-mail do cliente</Label>
                <Input
                  id="email"
                  type="email"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  placeholder="cliente@empresa.com.br"
                  list="clients-list"
                />
                <datalist id="clients-list">
                  {clients?.map((c) => (
                    <option key={c.id} value={c.email} />
                  ))}
                </datalist>
                <p className="text-xs text-muted-foreground">
                  O cliente verá o documento ao entrar com este e-mail.
                </p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="file">Arquivo (HTML)</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".html,text/html"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
              </div>
              <Button type="submit" disabled={busy} className="w-full">
                {busy ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar documento"
                )}
              </Button>
            </form>
          </Card>

          <Card className="mt-6 p-6">
            <h2 className="mb-4 flex items-center gap-2 font-serif text-xl text-foreground">
              <Users className="h-5 w-5 text-primary" />
              Clientes ({clients?.length ?? 0})
            </h2>
            {!clients || clients.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nenhum cliente cadastrado ainda.
              </p>
            ) : (
              <ul className="space-y-2">
                {clients.map((c) => (
                  <li key={c.id} className="text-sm">
                    <span className="text-foreground">{c.email}</span>
                    {c.name && (
                      <span className="text-muted-foreground"> — {c.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </section>

        <section>
          <h2 className="mb-4 flex items-center gap-2 font-serif text-xl text-foreground">
            <FileText className="h-5 w-5 text-primary" />
            Documentos ({documents?.length ?? 0})
          </h2>
          {docsLoading ? (
            <div className="flex items-center justify-center py-16 text-muted-foreground">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Carregando...
            </div>
          ) : !documents || documents.length === 0 ? (
            <Card className="py-12 text-center text-muted-foreground">
              Nenhum documento enviado ainda.
            </Card>
          ) : (
            <div className="space-y-3">
              {documents.map((doc) => (
                <Card
                  key={doc.id}
                  className="flex items-center justify-between gap-4 p-4"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-foreground">
                      {doc.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {doc.ownerEmail} · {formatDate(doc.createdAt)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={deleteDocument.isPending}
                    onClick={() => {
                      if (
                        confirm(`Remover "${doc.title}"? Esta ação é permanente.`)
                      ) {
                        deleteDocument.mutate({ id: doc.id });
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
