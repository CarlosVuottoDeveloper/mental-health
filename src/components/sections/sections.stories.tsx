import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Container } from "@/components/ui";
import {
  aboutContent,
  ctaContent,
  faqContent,
  footerContent,
  headerContent,
  heroContent,
  testimonials,
} from "@/design-system/examples/landing-content";
import { AboutSection } from "./about-section";
import { CtaBanner } from "./cta-banner";
import { FaqSection } from "./faq-section";
import { Hero } from "./hero";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { TestimonialCard } from "./testimonial-card";

const meta = {
  title: "Seções",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Header: Story = {
  render: () => <SiteHeader {...headerContent} />,
};

export const HeroSection: Story = {
  name: "Hero",
  render: () => (
    <Hero
      {...heroContent}
      header={<SiteHeader {...headerContent} tone="inverse" />}
    />
  ),
};

export const About: Story = {
  name: "Sobre",
  render: () => <AboutSection {...aboutContent} />,
};

export const Testimonials: Story = {
  name: "Depoimentos",
  render: () => (
    <Container className="py-12">
      <TestimonialCard testimonials={testimonials} />
    </Container>
  ),
};

export const Faq: Story = {
  name: "FAQ",
  render: () => <FaqSection {...faqContent} />,
};

export const Cta: Story = {
  name: "CTA",
  render: () => <CtaBanner {...ctaContent} />,
};

export const Footer: Story = {
  name: "Rodapé",
  render: () => <SiteFooter {...footerContent} />,
};
