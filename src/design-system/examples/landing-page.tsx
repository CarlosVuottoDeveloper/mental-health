import {
  AboutSection,
  CtaBanner,
  FaqSection,
  Hero,
  SiteFooter,
  SiteHeader,
  TestimonialCard,
} from "@/components/sections";
import { Container } from "@/components/ui";
import {
  aboutContent,
  ctaContent,
  faqContent,
  footerContent,
  headerContent,
  heroContent,
  testimonials,
} from "./landing-content";

/** Reference composition of every landing-page section, in order. */
export function LandingPageExample() {
  return (
    <>
      <Hero
        {...heroContent}
        header={<SiteHeader {...headerContent} tone="inverse" />}
      />
      <main>
        <AboutSection {...aboutContent} />
        <Container>
          <TestimonialCard testimonials={testimonials} />
        </Container>
        <FaqSection {...faqContent} />
        <CtaBanner {...ctaContent} />
      </main>
      <SiteFooter {...footerContent} />
    </>
  );
}
