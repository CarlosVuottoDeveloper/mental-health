import {
  AboutSection,
  BenefitsSection,
  CareStepsSection,
  ContactSection,
  CtaBanner,
  FaqSection,
  Hero,
  LocationSection,
  SiteFooter,
  SiteHeader,
  SpecialtiesSection,
  WhatsAppButton,
} from "@/components/sections";
import {
  aboutContent,
  anchors,
  practice,
  professional,
  benefitsContent,
  careStepsContent,
  contactContent,
  ctaContent,
  faqContent,
  footerContent,
  headerContent,
  heroContent,
  locationContent,
  specialtiesContent,
  whatsappHref,
} from "@/content/landing";
import { env } from "@/lib/env";
import { faqPageJsonLd, physicianJsonLd } from "@/lib/structured-data";
import { JsonLd } from "./json-ld";

/**
 * The landing page: implemented sections in the order defined in LPC-3.
 * Used by `src/app/page.tsx` and by Storybook.
 */
export function LandingPage() {
  return (
    <>
      <a
        href={`#${anchors.main}`}
        className="sr-only z-50 rounded-pill bg-accent px-5 py-3 text-label font-medium text-accent-foreground uppercase focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Pular para o conteúdo
      </a>
      <SiteHeader {...headerContent} fixed overlayTargetId={anchors.hero} />
      <main id={anchors.main}>
        <Hero {...heroContent} />
        <AboutSection {...aboutContent} />
        <SpecialtiesSection {...specialtiesContent} />
        <BenefitsSection {...benefitsContent} />
        <CareStepsSection {...careStepsContent} />
        <FaqSection {...faqContent} />
        <LocationSection {...locationContent} />
        <CtaBanner {...ctaContent} />
        <ContactSection {...contactContent} />
      </main>
      <SiteFooter {...footerContent} />
      <JsonLd
        data={physicianJsonLd({
          name: professional.name,
          url: env.siteUrl,
          telephone: "+55-11-90000-0000",
          email: practice.email.label,
          street: practice.address[0],
          locality: "São Paulo",
          region: "SP",
          description: heroContent.description,
        })}
      />
      <JsonLd data={faqPageJsonLd(faqContent.categories)} />
      <WhatsAppButton
        href={whatsappHref}
        label="Agendar pelo WhatsApp"
        hideOverIds={[anchors.hero, anchors.footer]}
      />
    </>
  );
}
