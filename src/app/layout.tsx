import type { Metadata } from "next";
import { CookieBanner } from "@/components/sections";
import { env } from "@/lib/env";
import { fontVariables } from "./fonts";
import "./globals.css";

const description =
  "Psiquiatra na Vila Mariana, em São Paulo, e online para todo o Brasil. Atendimento a adultos com ansiedade, depressão, TDAH, burnout, transtorno bipolar e insônia.";

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: "Psiquiatra na Vila Mariana e online | Dra. Helena Vasconcelos",
    template: "%s · Dra. Helena Vasconcelos",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Dra. Helena Vasconcelos · Psiquiatra",
    title: "Dra. Helena Vasconcelos · Psiquiatra em São Paulo e online",
    description,
  },
  twitter: { card: "summary_large_image" },
  // Conceptual portfolio project with a fictitious client: indexing stays off
  // unless NEXT_PUBLIC_SITE_INDEXABLE=true (decision D7).
  robots: env.indexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      // Next 16 only disables smooth scrolling during route changes with this flag.
      data-scroll-behavior="smooth"
      className={`${fontVariables} h-full`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <CookieBanner policyHref="/politica-de-privacidade" />
      </body>
    </html>
  );
}
