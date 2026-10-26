import {
  AboutSection,
  CareStepsSection,
  CtaBanner,
  FaqSection,
  Hero,
  SiteFooter,
  SiteHeader,
} from "@/components/sections";
import {
  aboutContent,
  careStepsContent,
  ctaContent,
  faqContent,
  footerContent,
  headerContent,
  heroContent,
} from "@/content/landing";

/**
 * The landing page: implemented sections in the order defined in LPC-3.
 * Used by `src/app/page.tsx` and by Storybook. Especialidades, benefícios and
 * localização are still to be built (see docs/planning).
 */
export function LandingPage() {
  return (
    <>
      <Hero
        {...heroContent}
        header={<SiteHeader {...headerContent} tone="inverse" />}
      />
      <main>
        <AboutSection {...aboutContent} />
        <CareStepsSection {...careStepsContent} />
        <FaqSection {...faqContent} />
        <CtaBanner {...ctaContent} />
      </main>
      <SiteFooter {...footerContent} />
    </>
  );
}
