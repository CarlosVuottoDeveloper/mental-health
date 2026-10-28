"use client";

import Link from "next/link";
import { Button, Text } from "@/components/ui";
import { useConsent, writeConsent } from "@/lib/consent";

export type CookieBannerProps = {
  policyHref: string;
};

/**
 * Asks for analytics consent (LPC-24). Refusing is as easy as accepting, and
 * nothing beyond essential storage runs until the visitor decides.
 */
export function CookieBanner({ policyHref }: CookieBannerProps) {
  const consent = useConsent();
  if (consent !== null) return null;

  return (
    <section
      aria-label="Preferências de cookies"
      className="fixed inset-x-4 bottom-4 z-50 flex max-w-lg flex-col gap-4 rounded-xl bg-inverse p-5 text-inverse-foreground shadow-[0_12px_40px_rgb(31_30_24/0.3)] sm:right-auto sm:left-6 md:bottom-6"
    >
      <Text size="sm" tone="inverse">
        Usamos cookies de análise (Google Analytics) só se você permitir, para
        entender como o site é usado. Sem a sua permissão, nenhum dado de
        navegação é compartilhado com o Google.{" "}
        <Link
          href={policyHref}
          className="underline underline-offset-4 focus-visible:outline-ring-inverse"
        >
          Política de privacidade
        </Link>
      </Text>
      {/* Refusing is as easy as accepting: same size, same style (LGPD). */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="secondary" onClick={() => writeConsent("rejected")}>
          Recusar
        </Button>
        <Button variant="secondary" onClick={() => writeConsent("accepted")}>
          Aceitar
        </Button>
      </div>
    </section>
  );
}

/** Reopens the banner so the visitor can change their choice. */
export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      className="inline-flex min-h-11 cursor-pointer items-center rounded-xs hover:text-foreground md:min-h-0"
      onClick={() => writeConsent(null)}
    >
      Preferências de cookies
    </button>
  );
}
