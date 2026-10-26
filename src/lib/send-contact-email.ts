import "server-only";
import {
  periodOptions,
  preferenceOptions,
  type ContactData,
} from "./contact-schema";

export type SendResult = { ok: true; simulated?: boolean } | { ok: false };

const labelOf = (
  options: readonly { value: string; label: string }[],
  value: string,
) => options.find((option) => option.value === value)?.label ?? value;

/**
 * Sends the contact by e-mail through the Resend REST API (LPC-17).
 * Never logs the message content: it holds personal data.
 */
export async function sendContactEmail(data: ContactData): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    // Development, or an explicit demo deploy (portfolio, decision D14):
    // validate everything but do not send.
    if (
      process.env.NODE_ENV !== "production" ||
      process.env.CONTACT_SIMULATE === "true"
    ) {
      console.info("[contato] Resend não configurado; envio simulado.");
      return { ok: true, simulated: true };
    }
    console.error("[contato] Resend não configurado.");
    return { ok: false };
  }

  const text = [
    "Novo pedido de contato pelo site.",
    "",
    `Nome: ${data.name}`,
    `E-mail: ${data.email}`,
    `Telefone: ${data.phone}`,
    `Preferência: ${labelOf(preferenceOptions, data.preference)}`,
    `Melhor período para retorno: ${labelOf(periodOptions, data.period)}`,
    "",
    "A pessoa concordou com a política de privacidade.",
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: data.email,
        subject: "Novo contato pelo site",
        text,
      }),
    });
    if (!response.ok) {
      console.error("[contato] Resend respondeu", response.status);
      return { ok: false };
    }
    return { ok: true };
  } catch {
    console.error("[contato] Falha de rede ao chamar o Resend.");
    return { ok: false };
  }
}
