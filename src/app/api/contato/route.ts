import { contactRequestSchema } from "@/lib/contact-schema";
import { createRateLimiter } from "@/lib/rate-limit";
import { sendContactEmail } from "@/lib/send-contact-email";

/** Submissions faster than this are treated as bots. */
const MIN_FILL_MS = 3_000;

const isRateLimited = createRateLimiter({ limit: 5, windowMs: 10 * 60_000 });

function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * Contact form endpoint (LPC-17). Responses never echo the submitted data,
 * and errors stay generic for the visitor.
 */
export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const parsed = contactRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const { website, startedAt, ...data } = parsed.data;

  // Bots get a success response so they do not retry.
  if (website || Date.now() - startedAt < MIN_FILL_MS) {
    return Response.json({ ok: true });
  }

  const result = await sendContactEmail(data);
  if (!result.ok) {
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
