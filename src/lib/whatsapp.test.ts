import { whatsappUrl } from "./whatsapp";

describe("whatsappUrl", () => {
  it("strips formatting from the phone number", () => {
    expect(whatsappUrl("+55 (11) 90000-0000", "Oi")).toBe(
      "https://wa.me/5511900000000?text=Oi",
    );
  });

  it("encodes the pre-filled message", () => {
    expect(whatsappUrl("5511900000000", "Olá, tudo bem?")).toBe(
      "https://wa.me/5511900000000?text=Ol%C3%A1%2C%20tudo%20bem%3F",
    );
  });
});
