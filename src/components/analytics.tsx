"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { useEffect } from "react";
import { eventForLink, trackEvent } from "@/lib/analytics";
import { useConsent } from "@/lib/consent";

/** Removes GA cookies (_ga, _ga_*) when consent is withdrawn. */
function clearGoogleAnalyticsCookies() {
  const domains = ["", location.hostname, `.${location.hostname}`];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name?.startsWith("_ga")) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const consent = useConsent();

  useEffect(() => {
    const disableKey = `ga-disable-${measurementId}`;
    (window as unknown as Record<string, boolean>)[disableKey] =
      consent !== "accepted";
    if (consent === "rejected") clearGoogleAnalyticsCookies();
  }, [consent, measurementId]);

  if (consent !== "accepted") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${measurementId}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}

/** One delegated listener tracks every WhatsApp, phone and directions link. */
function ConversionTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest("a");
      if (!link) return;
      const conversion = eventForLink(link);
      if (conversion) trackEvent(conversion);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}

export type SiteAnalyticsProps = {
  gaMeasurementId?: string;
  /** Vercel's scripts only exist on Vercel deployments (they 404 elsewhere). */
  onVercel?: boolean;
};

export function SiteAnalytics({
  gaMeasurementId,
  onVercel = false,
}: SiteAnalyticsProps) {
  return (
    <>
      {onVercel && (
        <>
          <VercelAnalytics />
          <SpeedInsights />
        </>
      )}
      <ConversionTracker />
      {gaMeasurementId && <GoogleAnalytics measurementId={gaMeasurementId} />}
    </>
  );
}
