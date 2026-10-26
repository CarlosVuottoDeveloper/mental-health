import { HeadingMuted } from "@/components/ui";
import type {
  AboutSectionProps,
  CareStepsSectionProps,
  CtaBannerProps,
  FaqSectionProps,
  HeroProps,
  SiteFooterProps,
  SiteHeaderProps,
} from "@/components/sections";
import { whatsappUrl } from "@/lib/whatsapp";

/*
 * Landing page copy for the fictitious client Dra. Helena Vasconcelos
 * (conceptual portfolio project). Sources are the Jira tasks of the
 * "Landing Page Consultório" board — see docs/planning for the full plan.
 *
 * CFM 2.336/2023 rules for every text here: no promise of results, no
 * superlatives, no patient testimonials or patient counts, no prices.
 */

// Section anchors, shared by the navigation and the sections themselves.
export const anchors = {
  hero: "inicio",
  main: "conteudo",
  about: "sobre",
  care: "como-funciona",
  faq: "duvidas",
  booking: "agendar",
} as const;

// Placeholder registration numbers on purpose (LPC-1), to never match a real doctor.
export const professional = {
  name: "Dra. Helena Vasconcelos",
  specialty: "Psiquiatra",
  crm: "CRM-SP 000000",
  rqe: "RQE 00000",
} as const;

export const credentialsLine = `${professional.name} · ${professional.specialty} · ${professional.crm} · ${professional.rqe}`;

// LPC-18: the number will come from an environment variable (.env.local, decision D11).
// Message combines LPC-1 and LPC-18 (decision D5 in docs/discovery/decisoes-do-projeto.md).
const whatsappNumber = "5511900000000";
export const whatsappHref = whatsappUrl(
  whatsappNumber,
  "Olá, vim pelo site e gostaria de agendar uma primeira consulta com a Dra. Helena.",
);

export const headerContent: Omit<SiteHeaderProps, "tone"> = {
  links: [
    { label: "Sobre", href: `/#${anchors.about}` },
    { label: "Como funciona", href: `/#${anchors.care}` },
    { label: "Dúvidas", href: `/#${anchors.faq}` },
    { label: "Agendamento", href: `/#${anchors.booking}` },
  ],
  contact: { label: "Agendar pelo WhatsApp", href: whatsappHref },
};

// LPC-9 (copy approved in the briefing).
export const heroContent: Omit<HeroProps, "header"> = {
  id: anchors.hero,
  badge: "Psiquiatria para adultos",
  title: "Acompanhamento psiquiátrico para quem está pronto para pedir ajuda",
  description:
    "Atendimento presencial na Vila Mariana e online, com escuta cuidadosa e decisões sobre tratamento tomadas junto com você.",
  cta: { label: "Agendar pelo WhatsApp", href: whatsappHref },
  secondaryCta: {
    label: "Conhecer o atendimento",
    href: `/#${anchors.about}`,
  },
  credentials: credentialsLine,
};

// LPC-10, built from the LPC-1 "Sobre" text. Institutions are fictitious on purpose.
export const aboutContent: AboutSectionProps = {
  id: anchors.about,
  label: "Sobre a Dra. Helena",
  statement: (
    <>
      Um bom tratamento nasce de uma relação de confiança.{" "}
      <HeadingMuted>
        Por isso reservo tempo para ouvir sua história, explicar cada etapa e
        decidir junto com você os próximos passos.
      </HeadingMuted>
    </>
  ),
  paragraphs: [
    "Sou psiquiatra, formada em Medicina pela Universidade Fictícia, com residência médica em Psiquiatria e mais de 10 anos de experiência no atendimento de adultos.",
    "Na consulta, explico o que estou observando e quais caminhos de tratamento existem. Quando a medicação faz sentido, conversamos sobre benefícios, possíveis efeitos colaterais e alternativas, e a decisão é tomada junto com você.",
    "Também olho para o que acontece fora do consultório: sono, rotina e, quando indicado, o trabalho em conjunto com a psicoterapia.",
  ],
  credentials: [
    { label: "Nome", value: professional.name },
    { label: "Especialidade", value: "Psiquiatria" },
    { label: "Registro", value: `${professional.crm} · ${professional.rqe}` },
    { label: "Formação", value: "Medicina · Universidade Fictícia" },
    { label: "Residência médica", value: "Psiquiatria · Hospital Fictício" },
    { label: "Atuação", value: "Mais de 10 anos, atendimento de adultos" },
  ],
  // No stock photos of identifiable people as the doctor (decision D12).
  portrait: {
    placeholder: "sage",
    alt: "Consultório da Dra. Helena Vasconcelos",
  },
  socials: [
    { network: "instagram", href: "https://instagram.com" },
    { network: "linkedin", href: "https://linkedin.com" },
  ],
  cta: {
    label: "Como funciona o acompanhamento",
    href: `/#${anchors.care}`,
  },
  media: [
    { placeholder: "sun" },
    { placeholder: "sage" },
    { placeholder: "blush" },
  ],
};

// LPC-14, with the base texts recorded in LPC-2.
export const careStepsContent: CareStepsSectionProps = {
  id: anchors.care,
  label: "Acompanhamento",
  title: "Como funciona o acompanhamento",
  description:
    "Cada pessoa tem seu tempo. O tratamento é construído em etapas, sempre com você participando das decisões.",
  steps: [
    {
      title: "Primeira consulta",
      description:
        "Um encontro de cerca de 60 minutos para conhecer sua história, seu contexto de vida e o que te trouxe até aqui. Ao final, definimos juntos um plano inicial.",
    },
    {
      title: "Ajuste inicial",
      description:
        "Nas primeiras semanas, os retornos são mais próximos para acompanhar como você está respondendo ao tratamento e ajustar o que for preciso, incluindo possíveis efeitos colaterais.",
    },
    {
      title: "Acompanhamento",
      description:
        "Com a estabilidade, os retornos vão ficando mais espaçados, no ritmo que faz sentido para você.",
    },
  ],
  cta: { label: "Agendar primeira consulta", href: whatsappHref },
};

// LPC-13 questions. Answers 1, 4 and 5 come from the briefing (LPC-1); the others were
// written in the project and checked against the CFM checklist (decision D8).
export const faqContent: FaqSectionProps = {
  id: anchors.faq,
  label: "Dúvidas",
  title: "Perguntas frequentes",
  categories: [
    {
      id: "geral",
      label: "Geral",
      items: [
        {
          question: "Preciso de encaminhamento para consultar com psiquiatra?",
          answer:
            "Não. Você pode agendar diretamente pelo WhatsApp, sem pedido de outro médico.",
        },
        {
          question: "Vou sair da primeira consulta com receita?",
          answer:
            "Depende da avaliação. A medicação é uma das ferramentas do tratamento e só é indicada quando necessária, sempre em decisão conjunta com você.",
        },
        {
          question:
            "Qual a diferença entre psiquiatra e psicólogo? Preciso dos dois?",
          answer:
            "O psiquiatra é médico: avalia, faz o diagnóstico e pode indicar medicação. O psicólogo conduz a psicoterapia. Em muitos casos os dois trabalham juntos, e o acompanhamento pode ser integrado com o seu psicólogo ou incluir uma indicação, se você ainda não tiver um.",
        },
        {
          question: "O atendimento online funciona tanto quanto o presencial?",
          answer:
            "Para a maioria dos casos, sim. A teleconsulta é feita por vídeo, conforme a Resolução CFM nº 2.314/2022, e as receitas são emitidas com assinatura digital.",
        },
        {
          question: "Vocês atendem convênio?",
          answer:
            "O atendimento é particular. Você recebe recibo ou nota fiscal para solicitar reembolso ao seu plano de saúde.",
        },
        {
          question: "Quanto tempo dura o tratamento?",
          answer:
            "Varia de pessoa para pessoa, e não há um prazo definido de antemão. Os retornos começam mais próximos e vão se espaçando conforme o quadro se estabiliza.",
        },
        {
          question: "Meus dados e o que eu falo ficam registrados onde?",
          answer:
            "As informações da consulta ficam no seu prontuário médico, protegido por sigilo profissional e guardado com segurança, conforme as normas do CFM e a LGPD. Nada é compartilhado sem a sua autorização.",
        },
        {
          question: "E se eu não quiser tomar medicação?",
          answer:
            "A decisão é sua. A medicação é uma possibilidade, não a única: conversamos sobre alternativas, como psicoterapia e cuidados com sono e rotina, e definimos juntos o caminho.",
        },
      ],
    },
  ],
};

// Booking block (LPC-19): WhatsApp only, no calendar integration.
export const ctaContent: CtaBannerProps = {
  id: anchors.booking,
  title: "Cuidar da sua saúde mental começa com uma boa conversa",
  primary: { label: "Agendar pelo WhatsApp", href: whatsappHref },
  // Hours from the briefing, including online Saturdays (decision D4).
  note: "Segunda a sexta, das 8h às 19h; sábado, das 8h às 12h, somente online. As mensagens costumam ser respondidas até o fim do dia.",
};

export const footerContent: SiteFooterProps = {
  description:
    "Psiquiatria para adultos, com atendimento presencial na Vila Mariana, em São Paulo, e online para todo o Brasil.",
  credentials: credentialsLine,
  columns: [
    {
      title: "Navegação",
      links: headerContent.links,
    },
    {
      title: "Contato",
      links: [{ label: "WhatsApp", href: whatsappHref }],
    },
  ],
  disclaimer: (
    <>
      Este site tem caráter informativo e não substitui uma consulta médica. Em
      caso de emergência, procure o pronto-socorro mais próximo ou ligue 192
      (SAMU). Se precisar conversar, o CVV atende 24h pelo 188.
    </>
  ),
  // The route is created in LPC-24.
  legal: [
    { label: "Política de privacidade", href: "/politica-de-privacidade" },
  ],
  copyright:
    "© 2026 Dra. Helena Vasconcelos. Projeto conceitual de portfólio com cliente fictícia.",
};
