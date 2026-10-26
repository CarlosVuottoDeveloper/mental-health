import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/sections";
import { Container, Heading, Text } from "@/components/ui";
import { footerContent, headerContent } from "@/content/landing";
import { privacyPolicy } from "@/content/privacy";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description:
    "Como os dados do formulário de contato e de navegação são tratados, com base na LGPD.",
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader {...headerContent} fixed />
      <main id="conteudo" className="pt-32 pb-section">
        <Container className="max-w-3xl">
          <article className="flex flex-col gap-10">
            <header className="flex flex-col gap-4">
              <Heading as="h1" size="xl">
                {privacyPolicy.title}
              </Heading>
              <Text size="sm" tone="muted">
                Atualizada em {privacyPolicy.updatedAt}
              </Text>
              <Text className="rounded-lg bg-surface-sunken p-4" size="sm">
                {privacyPolicy.notice}
              </Text>
            </header>

            {privacyPolicy.sections.map((section) => (
              <section key={section.title} className="flex flex-col gap-3">
                <Heading as="h2" size="sm">
                  {section.title}
                </Heading>
                {section.body.map((paragraph) => (
                  <Text key={paragraph} className="max-w-[65ch]">
                    {paragraph}
                  </Text>
                ))}
              </section>
            ))}
          </article>
        </Container>
      </main>
      <SiteFooter {...footerContent} />
    </>
  );
}
