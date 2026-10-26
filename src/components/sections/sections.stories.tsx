import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  aboutContent,
  benefitsContent,
  careStepsContent,
  ctaContent,
  faqContent,
  footerContent,
  headerContent,
  heroContent,
  locationContent,
  specialtiesContent,
} from "@/content/landing";
import { AboutSection } from "./about-section";
import { BenefitsSection } from "./benefits-section";
import { CareStepsSection } from "./care-steps-section";
import { CtaBanner } from "./cta-banner";
import { FaqSection } from "./faq-section";
import { Hero } from "./hero";
import { LocationSection } from "./location-section";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { SpecialtiesSection } from "./specialties-section";

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
      header={
        <SiteHeader {...headerContent} overlayTargetId={heroContent.id} />
      }
    />
  ),
};

export const About: Story = {
  name: "Sobre",
  render: () => <AboutSection {...aboutContent} />,
};

export const Specialties: Story = {
  name: "Especialidades",
  render: () => <SpecialtiesSection {...specialtiesContent} />,
};

export const Benefits: Story = {
  name: "Atendimento (benefícios)",
  render: () => <BenefitsSection {...benefitsContent} />,
};

export const CareSteps: Story = {
  name: "Como funciona o acompanhamento",
  parameters: {
    docs: {
      description: {
        story:
          "Substitui a seção de depoimentos (decisão da LPC-2), na mesma posição e com o mesmo peso visual. Linha do tempo vertical no mobile e horizontal a partir de `md`.",
      },
    },
  },
  render: () => (
    <div className="py-12">
      <CareStepsSection {...careStepsContent} />
    </div>
  ),
};

export const Faq: Story = {
  name: "FAQ",
  render: () => <FaqSection {...faqContent} />,
};

export const FaqWithCategories: Story = {
  name: "FAQ com categorias",
  parameters: {
    docs: {
      description: {
        story: "Com mais de uma categoria, as perguntas são agrupadas em abas.",
      },
    },
  },
  render: () => {
    const [general] = faqContent.categories;
    const items = general?.items ?? [];
    return (
      <FaqSection
        {...faqContent}
        categories={[
          { id: "consulta", label: "Consulta", items: items.slice(0, 4) },
          { id: "tratamento", label: "Tratamento", items: items.slice(4) },
        ]}
      />
    );
  },
};

export const Location: Story = {
  name: "Localização",
  render: () => <LocationSection {...locationContent} />,
};

export const Cta: Story = {
  name: "Agendamento (CTA)",
  render: () => <CtaBanner {...ctaContent} />,
};

export const Footer: Story = {
  name: "Rodapé",
  render: () => <SiteFooter {...footerContent} />,
};
