// Sends transactional email through the Resend connector (Replit integration).
// The SDK handles identity, token refresh, and auth headers automatically.
import { ReplitConnectors } from "@replit/connectors-sdk";

const connectors = new ReplitConnectors();

// Sender address. Until the akorp.com.br domain is verified in Resend, only
// Resend's shared onboarding address can be used (and it only delivers to the
// connected account's own email). Set RESEND_FROM to
// "AKORP <no-reply@akorp.com.br>" once the domain is verified.
const FROM = process.env.RESEND_FROM ?? "AKORP <onboarding@resend.dev>";

export interface DocumentNotification {
  toEmail: string;
  toName: string | null;
  documentTitle: string;
  portalUrl: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(n: DocumentNotification): string {
  const greeting = n.toName ? `Olá, ${escapeHtml(n.toName)}` : "Olá";
  const title = escapeHtml(n.documentTitle);
  const url = escapeHtml(n.portalUrl);
  return `<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;background:#f4f6f4;font-family:Arial,Helvetica,sans-serif;color:#0f1f16;">
    <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
      <div style="background:#1a5233;color:#ffffff;padding:24px;border-radius:8px 8px 0 0;">
        <h1 style="margin:0;font-size:20px;">AKORP Gestão Empresarial</h1>
      </div>
      <div style="background:#ffffff;padding:28px 24px;border:1px solid #e2e8e2;border-top:none;border-radius:0 0 8px 8px;">
        <p style="margin:0 0 16px;font-size:16px;">${greeting},</p>
        <p style="margin:0 0 16px;font-size:15px;line-height:1.5;">
          Um novo documento foi disponibilizado para você na sua Área do Cliente:
        </p>
        <p style="margin:0 0 24px;font-size:16px;font-weight:bold;">${title}</p>
        <a href="${url}" style="display:inline-block;background:#1a5233;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:6px;font-size:15px;">
          Acessar meus documentos
        </a>
        <p style="margin:24px 0 0;font-size:13px;color:#5b6b60;line-height:1.5;">
          Se você ainda não possui uma conta, cadastre-se com este mesmo e-mail
          para visualizar seus documentos.
        </p>
      </div>
      <p style="margin:16px 0 0;font-size:12px;color:#8a978e;text-align:center;">
        AKORP Gestão Empresarial — Jundiaí/SP
      </p>
    </div>
  </body>
</html>`;
}

export async function sendDocumentNotification(
  n: DocumentNotification,
): Promise<void> {
  const safeSubjectTitle = n.documentTitle.replace(/[\r\n\t]+/g, " ").trim();
  const response = await connectors.proxy("resend", "/emails", {
    method: "POST",
    body: {
      from: FROM,
      to: [n.toEmail],
      subject: `Novo documento disponível — ${safeSubjectTitle}`,
      html: buildHtml(n),
    },
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend respondeu ${response.status}: ${detail}`);
  }
}
