import { CircleHelp, CreditCard, Headset, LayoutGrid } from "lucide-react";
import { HeadingMuted } from "@/components/ui";
import type {
  AboutSectionProps,
  CtaBannerProps,
  FaqSectionProps,
  HeroProps,
  SiteFooterProps,
  SiteHeaderProps,
  Testimonial,
} from "@/components/sections";

// Example copy for stories and the full-page demo. Replace with real content.

export const headerContent: Omit<SiteHeaderProps, "tone"> = {
  links: [
    { label: "Início", href: "#inicio" },
    { label: "Sobre", href: "#sobre" },
    { label: "Serviços", href: "#servicos" },
    { label: "Terapeutas", href: "#terapeutas" },
    { label: "Blog", href: "#blog" },
  ],
  contact: { label: "Fale conosco", href: "#contato" },
};

export const heroContent: Omit<HeroProps, "header"> = {
  badge: "Cuidado com a sua mente",
  title: "Comece sua jornada para mais calma e equilíbrio",
  description:
    "Sessões com psicólogos e práticas de atenção plena para acalmar a mente e recuperar o equilíbrio no dia a dia.",
  cta: { label: "Agendar sessão", href: "#agendar" },
  socialProof: {
    label: (
      <>
        +100 mil pessoas
        <br />
        já começaram
      </>
    ),
    people: [
      { name: "Ana Souza" },
      { name: "Bruno Lima" },
      { name: "Carla Dias" },
      { name: "Diego Alves" },
    ],
  },
};

export const aboutContent: AboutSectionProps = {
  label: "Sobre nós",
  statement: (
    <>
      Um caminho mais leve para o bem-estar, com acompanhamento personalizado,{" "}
      <HeadingMuted>
        práticas de atenção plena e hábitos simples que duram.
      </HeadingMuted>
    </>
  ),
  community: (
    <>
      Comunidade de
      <br />
      bem-estar
    </>
  ),
  socials: [
    { network: "facebook", href: "https://facebook.com" },
    { network: "x", href: "https://x.com" },
    { network: "instagram", href: "https://instagram.com" },
    { network: "linkedin", href: "https://linkedin.com" },
  ],
  cta: { label: "Conheça a equipe", href: "#equipe" },
  media: [
    { placeholder: "sun" },
    { placeholder: "sage" },
    { placeholder: "blush" },
  ],
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Encontrei um espaço seguro para falar sobre ansiedade. Hoje durmo melhor e consigo lidar com o trabalho sem me sobrecarregar.",
    name: "Mariana Costa",
    role: "Professora",
    rating: 5,
    media: { placeholder: "blush" },
  },
  {
    quote:
      "As sessões online couberam na minha rotina. Em poucas semanas eu já percebia a diferença em como reagia ao estresse.",
    name: "Rafael Nunes",
    role: "Engenheiro de software",
    rating: 4,
    media: { placeholder: "sun" },
  },
];

export const faqContent: FaqSectionProps = {
  label: "Dúvidas",
  title: "Perguntas frequentes",
  categories: [
    {
      id: "geral",
      label: "Geral",
      icon: CircleHelp,
      items: [
        {
          question: "Como agendo minha primeira sessão?",
          answer:
            "Escolha um terapeuta na página de profissionais, selecione um horário livre e confirme. Você recebe a confirmação por e-mail.",
        },
        {
          question: "As sessões podem ser online?",
          answer:
            "Sim. As sessões online acontecem por vídeo em uma sala segura, e você pode participar de onde estiver.",
        },
        {
          question: "O que eu compartilho é confidencial?",
          answer:
            "Sim. Tudo o que é dito nas sessões é protegido pelo sigilo profissional e pela LGPD.",
        },
        {
          question: "Posso remarcar ou cancelar uma sessão?",
          answer: "Pode, sem custo, até 24 horas antes do horário marcado.",
        },
      ],
    },
    {
      id: "programas",
      label: "Programas",
      icon: LayoutGrid,
      items: [
        {
          question: "Quais programas estão disponíveis?",
          answer:
            "Terapia individual, terapia de casal e programas de 8 semanas de atenção plena.",
        },
        {
          question: "Quantas sessões vou precisar?",
          answer:
            "Depende dos seus objetivos. Na primeira sessão você e o terapeuta definem juntos um plano inicial.",
        },
      ],
    },
    {
      id: "pagamentos",
      label: "Pagamentos",
      icon: CreditCard,
      items: [
        {
          question: "Quais formas de pagamento são aceitas?",
          answer: "Pix, cartão de crédito e boleto.",
        },
        {
          question: "Vocês emitem recibo para reembolso do plano de saúde?",
          answer:
            "Sim. O recibo fica disponível na sua conta logo após cada sessão.",
        },
      ],
    },
    {
      id: "ajuda",
      label: "Central de ajuda",
      icon: Headset,
      items: [
        {
          question: "Como falo com o suporte?",
          answer: "Pelo chat no site, de segunda a sábado, das 8h às 20h.",
        },
        {
          question: "Estou em crise. O que faço?",
          answer:
            "Ligue para o CVV no 188 (gratuito, 24 horas) ou procure o pronto-socorro mais próximo. Este serviço não substitui atendimento de emergência.",
        },
      ],
    },
  ],
};

export const ctaContent: CtaBannerProps = {
  title: "Volte para o que faz você se sentir bem",
  primary: { label: "Começar agora", href: "#agendar" },
  secondary: { label: "Falar com a equipe", href: "#contato" },
};

export const footerContent: SiteFooterProps = {
  description:
    "Cuidado em saúde mental para você e quem você ama se sentirem ouvidos, acolhidos e fortalecidos.",
  columns: [
    {
      title: "Navegação",
      links: [
        { label: "Início", href: "#inicio" },
        { label: "Sobre", href: "#sobre" },
        { label: "Serviços", href: "#servicos" },
        { label: "Programas", href: "#programas" },
        { label: "Blog", href: "#blog" },
      ],
    },
    {
      title: "Empresa",
      links: [
        { label: "Trabalhe conosco", href: "#carreiras" },
        { label: "Nossa equipe", href: "#equipe" },
        { label: "Seja parceiro", href: "#parcerias" },
        { label: "Depoimentos", href: "#depoimentos" },
      ],
    },
    {
      title: "Contato",
      links: [
        { label: "Fale conosco", href: "#contato" },
        { label: "Perguntas frequentes", href: "#faq" },
        { label: "Suporte", href: "#suporte" },
      ],
    },
  ],
  legal: [
    { label: "Privacidade", href: "#privacidade" },
    { label: "Termos de uso", href: "#termos" },
  ],
  copyright: "© 2026 Mental Health. Todos os direitos reservados.",
};
