import {
  AboutSection,
  BenefitsSection,
  CareStepsSection,
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
  benefitsContent,
  careStepsContent,
  ctaContent,
  faqContent,
  footerContent,
  headerContent,
  heroContent,
  locationContent,
  specialtiesContent,
  whatsappHref,
} from "@/content/landing";

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
      </main>
      <SiteFooter {...footerContent} />
      <WhatsAppButton
        href={whatsappHref}
        label="Agendar pelo WhatsApp"
        hideOverIds={[anchors.hero, anchors.footer]}
      />
    </>
  );
}
