import { practice, professional } from "./landing";

// Privacy policy (LPC-24). Model text for a fictitious client: a real practice
// must have it reviewed by a lawyer before publishing.

export type PolicySection = { title: string; body: string[] };

export const privacyPolicy = {
  title: "Política de privacidade",
  updatedAt: "26 de outubro de 2026",
  notice:
    "Este é um projeto conceitual de portfólio, com cliente fictícia. O texto abaixo é um modelo e precisaria de revisão jurídica antes de ser usado por um consultório real.",
  sections: [
    {
      title: "Quem cuida dos seus dados",
      body: [
        `A controladora dos dados é ${professional.name}, psiquiatra (${professional.crm} · ${professional.rqe}), com consultório na ${practice.address.join(", ")}.`,
        `Para qualquer assunto sobre os seus dados, escreva para ${practice.email.label}.`,
      ],
    },
    {
      title: "Quais dados coletamos",
      body: [
        "Formulário de contato: nome, e-mail, telefone, preferência de atendimento (presencial ou online) e melhor período para retorno. Não pedimos motivo da consulta, sintomas, histórico ou medicações, e o formulário não tem campo de texto livre.",
        "WhatsApp: ao clicar em um botão de WhatsApp, a conversa acontece no aplicativo, sujeita à política de privacidade do WhatsApp.",
        "Navegação: medimos visitas e o desempenho das páginas de forma anônima, sem cookies, com o Vercel Analytics e o Speed Insights. O Google Analytics só é carregado se você aceitar os cookies de análise.",
      ],
    },
    {
      title: "Para que usamos",
      body: [
        "Os dados do formulário servem apenas para retornar o seu contato e agendar a primeira consulta. Não são usados para publicidade nem enviados para listas de e-mail.",
        "Os dados de navegação servem para entender quais partes do site são úteis e corrigir problemas. Eles nunca incluem nome, telefone ou e-mail.",
      ],
    },
    {
      title: "Base legal",
      body: [
        "Procurar um psiquiatra pode revelar informação sobre a sua saúde, que é dado pessoal sensível (art. 11 da LGPD). Por isso, o tratamento se baseia no seu consentimento, dado na caixa de seleção do formulário e no aviso de cookies, e que pode ser retirado a qualquer momento.",
      ],
    },
    {
      title: "Com quem compartilhamos",
      body: [
        "Resend, serviço que entrega por e-mail as mensagens do formulário; Vercel, que hospeda o site; e Google, apenas se você aceitar os cookies de análise. Esses serviços tratam os dados em nosso nome e apenas para essas finalidades.",
        "Não vendemos nem cedemos dados pessoais a terceiros.",
      ],
    },
    {
      title: "Por quanto tempo guardamos",
      body: [
        "Mensagens do formulário que não resultarem em consulta são apagadas em até 6 meses.",
        "Se você se tornar paciente, as informações passam a fazer parte do prontuário médico, guardado pelo prazo mínimo de 20 anos previsto na Lei nº 13.787/2018, sob sigilo profissional.",
      ],
    },
    {
      title: "Cookies",
      body: [
        "Essenciais: guardamos no seu navegador apenas a sua escolha sobre cookies, para não perguntar de novo.",
        "Análise: os cookies do Google Analytics (como _ga) só são gravados depois que você clica em Aceitar. Para mudar a sua escolha, use Preferências de cookies, no rodapé.",
      ],
    },
    {
      title: "Seus direitos",
      body: [
        `Pela LGPD (art. 18), você pode pedir confirmação e acesso aos seus dados, correção, anonimização, portabilidade, eliminação e informações sobre compartilhamento, além de revogar o consentimento. Basta escrever para ${practice.email.label}; respondemos em até 15 dias.`,
        "Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).",
      ],
    },
    {
      title: "Segurança",
      body: [
        "O site usa conexão criptografada (HTTPS). A chave do serviço de e-mail fica apenas no servidor, e o conteúdo das mensagens não é registrado em logs.",
      ],
    },
  ] satisfies PolicySection[],
};
