import { useQuery } from "@tanstack/react-query";
import { useClerk } from "@clerk/react";
import { Link } from "wouter";
import { FileText, LogOut, ShieldCheck, Loader2, Inbox } from "lucide-react";
import {
  getGetMeQueryOptions,
  getListMyDocumentsQueryOptions,
  getGetMyDocumentContentUrl,
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function formatDate(value: string | Date): string {
  const d = typeof value === "string" ? new Date(value) : value;
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function Portal() {
  const { signOut } = useClerk();
  const { data: me } = useQuery(getGetMeQueryOptions());
  const { data: documents, isLoading } = useQuery(
    getListMyDocumentsQueryOptions(),
  );

  const isAdmin = me?.role === "admin";

  return (
    <div className="min-h-[100dvh] bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-serif text-lg text-primary"
          >
            <img src={`${basePath}/logo.svg`} alt="AKORP" className="h-8 w-8" />
            AKORP
          </Link>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Administração
                </Button>
              </Link>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signOut({ redirectUrl: basePath || "/" })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="mb-8">
          <h1 className="font-serif text-3xl text-foreground">
            Olá{me?.name ? `, ${me.name}` : ""}
          </h1>
          <p className="mt-1 text-muted-foreground">
            Estes são os seus documentos disponíveis.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Carregando documentos...
          </div>
        ) : !documents || documents.length === 0 ? (
          <Card className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <Inbox className="h-10 w-10 text-muted-foreground" />
            <p className="text-muted-foreground">
              Você ainda não possui documentos.
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <Card
                key={doc.id}
                className="flex items-center justify-between gap-4 p-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium text-foreground">
                      {doc.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(doc.createdAt)}
                    </p>
                  </div>
                </div>
                <a
                  href={getGetMyDocumentContentUrl(doc.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="sm">Abrir</Button>
                </a>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
