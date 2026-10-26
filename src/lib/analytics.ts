import { track } from "@vercel/analytics";

/** Conversion events (LPC-26). Properties must never carry personal data. */
export type AnalyticsEvent =
  | { name: "whatsapp_click"; source: string }
  | { name: "phone_click"; source: string }
  | { name: "directions_click"; source: string }
  | { name: "contact_form_submit"; source: string };

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent({ name, ...properties }: AnalyticsEvent) {
  // Vercel Analytics is cookieless; GA4 only exists after consent (LPC-24).
  track(name, properties);
  window.gtag?.("event", name, properties);
}

/** Maps a clicked link to a conversion event, or null if it isn't one. */
export function eventForLink(link: HTMLAnchorElement): AnalyticsEvent | null {
  const source = link.dataset.cta ?? link.closest("[id]")?.id ?? "desconhecida";
  const href = link.getAttribute("href") ?? "";

  if (href.startsWith("https://wa.me/"))
    return { name: "whatsapp_click", source };
  if (href.startsWith("tel:")) return { name: "phone_click", source };
  if (href.includes("google.com/maps"))
    return { name: "directions_click", source };
  return null;
}
