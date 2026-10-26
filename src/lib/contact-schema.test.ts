import { contactRequestSchema, contactSchema } from "./contact-schema";

const valid = {
  name: "Ana Souza",
  email: "ana@exemplo.com",
  phone: "(11) 91234-5678",
  preference: "online",
  period: "tarde",
  consent: true,
};

describe("contactSchema", () => {
  it("accepts the minimal contact data", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it.each([
    ["name", { name: "A" }],
    ["email", { email: "ana@" }],
    ["phone without area code", { phone: "91234-5678" }],
    ["preference", { preference: "domicilio" }],
    ["period", { period: "madrugada" }],
    ["consent", { consent: false }],
  ])("rejects an invalid %s", (_, override) => {
    expect(contactSchema.safeParse({ ...valid, ...override }).success).toBe(
      false,
    );
  });

  it("drops fields outside the minimal set (no free text)", () => {
    const parsed = contactSchema.parse({ ...valid, motivo: "ansiedade" });
    expect(parsed).not.toHaveProperty("motivo");
  });

  it("requires the anti-spam timestamp on requests", () => {
    expect(contactRequestSchema.safeParse(valid).success).toBe(false);
    expect(
      contactRequestSchema.safeParse({ ...valid, startedAt: Date.now() })
        .success,
    ).toBe(true);
  });
});
