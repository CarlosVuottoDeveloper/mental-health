import type { Metadata } from "next";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  // Search-optimized title, Open Graph and favicons come in LPC-20.
  title: "Dra. Helena Vasconcelos · Psiquiatra em São Paulo",
  description:
    "Psiquiatria para adultos, com atendimento presencial na Vila Mariana e online para todo o Brasil.",
  // Conceptual portfolio project with a fictitious client: never index it (decision D7).
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      // Next 16 only disables smooth scrolling during route changes with this flag.
      data-scroll-behavior="smooth"
      className={`${fontVariables} h-full`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
