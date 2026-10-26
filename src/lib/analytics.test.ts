import { track } from "@vercel/analytics";
import { eventForLink, trackEvent } from "./analytics";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

function link(html: string) {
  document.body.innerHTML = html;
  return document.querySelector("a")!;
}

describe("eventForLink", () => {
  it("prefers the explicit data-cta source", () => {
    expect(
      eventForLink(link('<a data-cta="floating" href="https://wa.me/1">x</a>')),
    ).toEqual({ name: "whatsapp_click", source: "floating" });
  });

  it("falls back to the id of the enclosing section", () => {
    expect(
      eventForLink(
        link(
          '<section id="como-funciona"><a href="https://wa.me/1">x</a></section>',
        ),
      ),
    ).toEqual({ name: "whatsapp_click", source: "como-funciona" });
  });

  it("recognizes phone and directions links and ignores the rest", () => {
    expect(
      eventForLink(
        link('<footer id="rodape"><a href="tel:+55">x</a></footer>'),
      ),
    ).toEqual({ name: "phone_click", source: "rodape" });
    expect(
      eventForLink(
        link('<a href="https://www.google.com/maps/dir/?api=1">x</a>'),
      ),
    ).toMatchObject({ name: "directions_click" });
    expect(eventForLink(link('<a href="/#sobre">x</a>'))).toBeNull();
  });
});

describe("trackEvent", () => {
  afterEach(() => {
    delete window.gtag;
    vi.mocked(track).mockClear();
  });

  it("sends to Vercel Analytics and, when consented, to GA4", () => {
    window.gtag = vi.fn();
    trackEvent({ name: "whatsapp_click", source: "hero" });

    expect(track).toHaveBeenCalledWith("whatsapp_click", { source: "hero" });
    expect(window.gtag).toHaveBeenCalledWith("event", "whatsapp_click", {
      source: "hero",
    });
  });

  it("works without GA4 loaded", () => {
    expect(() =>
      trackEvent({ name: "phone_click", source: "rodape" }),
    ).not.toThrow();
  });
});
