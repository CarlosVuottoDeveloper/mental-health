// @vitest-environment node
import { POST } from "./route";

vi.mock("server-only", () => ({}));

const valid = {
  name: "Ana Souza",
  email: "ana@exemplo.com",
  phone: "(11) 91234-5678",
  preference: "online",
  period: "tarde",
  consent: true,
};

let ipCounter = 0;
function post(body: unknown, ip = `10.0.0.${++ipCounter}`) {
  return POST(
    new Request("http://localhost/api/contato", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );
}

describe("POST /api/contato", () => {
  const fetchSpy = vi.fn();

  beforeEach(() => {
    fetchSpy.mockReset();
    vi.stubGlobal("fetch", fetchSpy);
    vi.spyOn(console, "info").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("rejects malformed JSON and invalid data", async () => {
    expect((await post("{")).status).toBe(400);
    expect((await post({ ...valid, email: "x" })).status).toBe(400);
  });

  it("silently accepts bots (honeypot or instant submit) without sending", async () => {
    const honeypot = await post({
      ...valid,
      website: "spam.example",
      startedAt: 1,
    });
    const instant = await post({ ...valid, startedAt: Date.now() });

    expect(honeypot.status).toBe(200);
    expect(instant.status).toBe(200);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("simulates sending in development when Resend is not configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const response = await post({ ...valid, startedAt: Date.now() - 10_000 });

    expect(response.status).toBe(200);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("fails in production without Resend unless the demo mode is on", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("RESEND_API_KEY", "");
    const body = { ...valid, startedAt: Date.now() - 10_000 };

    expect((await post(body)).status).toBe(502);

    vi.stubEnv("CONTACT_SIMULATE", "true");
    expect((await post(body)).status).toBe(200);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("sends through Resend without logging the message", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_FROM_EMAIL", "site@exemplo.com");
    vi.stubEnv("CONTACT_TO_EMAIL", "clinica@exemplo.com");
    fetchSpy.mockResolvedValue(new Response("{}", { status: 200 }));

    const response = await post({ ...valid, startedAt: Date.now() - 10_000 });

    expect(response.status).toBe(200);
    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(JSON.parse(init.body)).toMatchObject({
      to: "clinica@exemplo.com",
      reply_to: "ana@exemplo.com",
    });
    expect(console.info).not.toHaveBeenCalled();
  });

  it("returns a generic error when Resend fails", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_FROM_EMAIL", "site@exemplo.com");
    vi.stubEnv("CONTACT_TO_EMAIL", "clinica@exemplo.com");
    fetchSpy.mockResolvedValue(new Response("{}", { status: 500 }));

    const response = await post({ ...valid, startedAt: Date.now() - 10_000 });
    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ ok: false, error: "send_failed" });
  });

  it("rate limits repeated submissions from the same IP", async () => {
    const statuses = [];
    for (let i = 0; i < 6; i++) {
      statuses.push(
        (await post({ ...valid, startedAt: 1 }, "10.9.9.9")).status,
      );
    }
    expect(statuses.at(-1)).toBe(429);
  });
});
