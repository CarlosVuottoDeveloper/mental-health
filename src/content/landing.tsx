import { Clock, MessageCircle, ReceiptText, Users } from "lucide-react";
import { HeadingMuted } from "@/components/ui";
import type {
  AboutSectionProps,
  BenefitsSectionProps,
  CareStepsSectionProps,
  ContactSectionProps,
  CtaBannerProps,
  FaqSectionProps,
  HeroProps,
  LocationSectionProps,
  SiteFooterProps,
  SpecialtiesSectionProps,
  SiteHeaderProps,
} from "@/components/sections";
import { env } from "@/lib/env";
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
  specialties: "especialidades",
  benefits: "atendimento",
  care: "como-funciona",
  faq: "duvidas",
  location: "localizacao",
  footer: "rodape",
  booking: "agendar",
  contact: "contato",
} as const;

// Placeholder registration numbers on purpose (LPC-1), to never match a real doctor.
export const professional = {
  name: "Dra. Helena Vasconcelos",
  specialty: "Psiquiatra",
  crm: "CRM-SP 000000",
  rqe: "RQE 00000",
} as const;

export const credentialsLine = `${professional.name} · ${professional.specialty} · ${professional.crm} · ${professional.rqe}`;

// Fictitious practice details (LPC-1). Phone matches the WhatsApp placeholder;
// the e-mail uses the reserved .example domain.
export const practice = {
  address: ["Rua das Acácias, 250 · conj. 42", "Vila Mariana · São Paulo/SP"],
  phone: { label: "(11) 90000-0000", href: "tel:+5511900000000" },
  email: {
    label: "contato@helenavasconcelos.example",
    href: "mailto:contato@helenavasconcelos.example",
  },
  // Decision D4.
  hours: {
    weekdays: "Segunda a sexta, das 8h às 19h",
    saturday: "Sábado, das 8h às 12h, somente online",
  },
} as const;

// Number from NEXT_PUBLIC_WHATSAPP_NUMBER (LPC-18, decision D11). Message
// combines LPC-1 and LPC-18 (decision D5).
export const whatsappHref = whatsappUrl(
  env.whatsappNumber,
  "Olá, vim pelo site e gostaria de agendar uma primeira consulta com a Dra. Helena.",
);

export const headerContent: Omit<SiteHeaderProps, "tone"> = {
  links: [
    { label: "Sobre", href: `/#${anchors.about}` },
    { label: "Especialidades", href: `/#${anchors.specialties}` },
    { label: "Como funciona", href: `/#${anchors.care}` },
    { label: "Dúvidas", href: `/#${anchors.faq}` },
    { label: "Localização", href: `/#${anchors.location}` },
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
  image: {
    src: "/images/hero-consultorio.jpg",
    alt: "Poltrona e pufe cinza diante de uma parede de plantas, em uma sala clara",
  },
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
  // Pexels photos without an identifiable person standing in for the doctor (decision D12).
  portrait: {
    src: "/images/sobre-poltrona.jpg",
    alt: "Poltrona bege ao lado de uma janela com plantas, no consultório",
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
    { src: "/images/detalhe-folhas-ocre.jpg", alt: "" },
    {
      src: "/images/detalhe-anotacoes.jpg",
      alt: "Mão anotando em um caderno durante uma conversa",
    },
    { src: "/images/detalhe-sombra-folhas.jpg", alt: "" },
  ],
};

// LPC-11: how each condition shows up in daily life, never the clinical definition.
export const specialtiesContent: SpecialtiesSectionProps = {
  id: anchors.specialties,
  label: "Especialidades",
  title: "Como posso ajudar",
  description:
    "Atendimento a adultos, a partir de 18 anos. Se você se reconhece em alguma destas situações, uma conversa pode ajudar a entender o que está acontecendo.",
  items: [
    {
      title: "Transtornos de ansiedade",
      description:
        "Preocupação constante, tensão no corpo ou crises que atrapalham o trabalho, o sono e a rotina.",
    },
    {
      title: "Depressão",
      description:
        "Desânimo que não passa, perda de interesse pelo que antes fazia sentido e cansaço para as tarefas do dia.",
    },
    {
      title: "TDAH em adultos",
      description:
        "Dificuldade crônica de organizar tarefas, prazos e atenção, com impacto no trabalho e nas relações.",
    },
    {
      title: "Burnout e esgotamento profissional",
      description:
        "Exaustão ligada ao trabalho, distanciamento e sensação de não dar conta, mesmo depois de descansar.",
    },
    {
      title: "Transtorno bipolar",
      description:
        "Fases de humor muito elevado ou irritável que se alternam com períodos de desânimo profundo.",
    },
    {
      title: "Insônia e distúrbios do sono",
      description:
        "Dificuldade para pegar no sono, despertares durante a noite ou acordar sem se sentir descansado.",
    },
  ],
};

// LPC-12: the care process, not results. Durations follow decision D3.
export const benefitsContent: BenefitsSectionProps = {
  id: anchors.benefits,
  label: "Atendimento",
  title: "Como é ser atendido aqui",
  items: [
    {
      icon: Clock,
      title: "Consultas sem pressa",
      description:
        "Primeira consulta de cerca de 60 minutos e retornos de 50 minutos, com tempo para ouvir sua história.",
    },
    {
      icon: MessageCircle,
      title: "Contato entre as consultas",
      description:
        "Dúvidas sobre o tratamento e possíveis efeitos colaterais podem ser enviadas pelo WhatsApp entre um retorno e outro.",
    },
    {
      icon: Users,
      title: "Trabalho integrado",
      description:
        "Se você faz psicoterapia, o acompanhamento pode ser alinhado com o seu psicólogo, sempre com a sua autorização.",
    },
    {
      icon: ReceiptText,
      title: "Recibo para reembolso",
      description:
        "O atendimento é particular, com recibo ou nota fiscal para solicitar reembolso ao seu plano de saúde.",
    },
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
            "Para a maioria das pessoas, sim. A teleconsulta é feita por vídeo, conforme a Resolução CFM nº 2.314/2022, e as receitas são emitidas com assinatura digital. Se a avaliação indicar a necessidade de uma consulta presencial, isso é combinado com você.",
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

// LPC-15 + decision D9 (in-person or online) + D13 (OpenStreetMap, no cookies).
// The address is fictitious, so the map shows the area around Ana Rosa station.
export const locationContent: LocationSectionProps = {
  id: anchors.location,
  label: "Localização",
  title: "Presencial ou online",
  description:
    "Escolha o formato que funciona melhor para você. O cuidado e o tempo de consulta são os mesmos.",
  inPerson: {
    title: "Presencial",
    address: [...practice.address],
    details: [
      "A 5 minutos a pé da estação Ana Rosa do metrô (linhas 1-Azul e 2-Verde).",
      "Estacionamentos pagos a menos de uma quadra.",
      `${practice.hours.weekdays}.`,
    ],
    directions: {
      label: "Como chegar",
      href: "https://www.google.com/maps/dir/?api=1&destination=Esta%C3%A7%C3%A3o+Ana+Rosa%2C+S%C3%A3o+Paulo",
    },
  },
  online: {
    title: "Online",
    details: [
      "Teleconsulta por vídeo para todo o Brasil, conforme a Resolução CFM nº 2.314/2022.",
      "Receitas e atestados emitidos com assinatura digital.",
      `${practice.hours.weekdays}. ${practice.hours.saturday}.`,
    ],
  },
  map: {
    src: "https://www.openstreetmap.org/export/embed.html?bbox=-46.6430%2C-23.5845%2C-46.6330%2C-23.5785&layer=mapnik&marker=-23.5815%2C-46.6380",
    title: "Mapa da região da estação Ana Rosa, na Vila Mariana",
    caption:
      "Região da estação Ana Rosa. O endereço do consultório é fictício (projeto de portfólio). Mapa © colaboradores do OpenStreetMap.",
  },
  facade: {
    src: "/images/fachada.jpg",
    alt: "Fachada de um prédio residencial com varandas e plantas, em São Paulo",
  },
};

// Booking block (LPC-19): WhatsApp only, no calendar integration.
export const ctaContent: CtaBannerProps = {
  id: anchors.booking,
  title: "Cuidar da sua saúde mental começa com uma boa conversa",
  primary: { label: "Agendar pelo WhatsApp", href: whatsappHref },
  secondary: {
    label: "Prefiro deixar meus dados",
    href: `/#${anchors.contact}`,
  },
  // Hours from the briefing, including online Saturdays (decision D4).
  note: `${practice.hours.weekdays}; ${practice.hours.saturday.toLowerCase()}. As mensagens costumam ser respondidas até o fim do dia.`,
};

// LPC-16: minimal data only (LGPD art. 11).
export const contactContent: Omit<ContactSectionProps, "endpoint"> = {
  id: anchors.contact,
  label: "Contato",
  title: "Prefere que a gente entre em contato?",
  description:
    "Deixe seu nome e um telefone e escolha um período para o retorno. Não pedimos o motivo da consulta: essa conversa fica para o atendimento.",
  privacyHref: "/politica-de-privacidade",
  whatsappHref,
};

export const footerContent: SiteFooterProps = {
  id: anchors.footer,
  description:
    "Psiquiatria para adultos, com atendimento presencial na Vila Mariana, em São Paulo, e online para todo o Brasil.",
  credentials: credentialsLine,
  columns: [
    {
      title: "Navegação",
      links: [
        ...headerContent.links,
        { label: "Agendamento", href: `/#${anchors.booking}` },
      ],
    },
    {
      title: "Contato",
      links: [
        { label: "WhatsApp", href: whatsappHref },
        { label: practice.phone.label, href: practice.phone.href },
        { label: practice.email.label, href: practice.email.href },
      ],
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
  address: practice.address.join(" · "),
  socials: aboutContent.socials,
  copyright: "© 2026 Dra. Helena Vasconcelos",
  credit:
    "Projeto conceitual de portfólio, com cliente fictícia. Design e desenvolvimento: Kadu Vuotto.",
};
