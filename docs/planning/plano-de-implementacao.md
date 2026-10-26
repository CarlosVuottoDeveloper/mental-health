# Plano de implementação — Landing Page Consultório

> Fonte: quadro [Landing Page Consultório (LPC)](https://kaduvuotto.atlassian.net/issues?jql=project%20%3D%20LPC%20ORDER%20BY%20key%20ASC)
> no Jira, 28 tasks, lidas em 2026-10-26. O Jira é a fonte da verdade para escopo e status; este
> documento define a **ordem de execução** e cruza cada task com o que já existe no repositório.

Projeto conceitual de portfólio: landing page da psiquiatra fictícia **Dra. Helena Vasconcelos**
(CRM-SP 000000 · RQE 00000, placeholders propositais).

## Como ler

- **Ordem:** sequência recomendada, respeitando dependências. Tasks da mesma fase sem dependência
  entre si podem andar em paralelo.
- **Repo:** situação no código hoje — ✅ feito, 🟡 parcial, ⬜ não iniciado.
- **Fluxo:** cada task vira uma branch `feature/lpc-<n>-<slug>` a partir de `develop`, com merge
  `--no-ff` de volta. Releases saem por `release/x.y.z` para `main`.

## Decisões

As divergências encontradas entre as tasks foram resolvidas em 2026-10-26. A justificativa de cada
uma está em [`docs/discovery/decisoes-do-projeto.md`](../discovery/decisoes-do-projeto.md).

| #   | Tema                         | Decisão                                                                                           | Afeta                  |
| --- | ---------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------- |
| D1  | Paleta e tipografia          | Mantido o design system de `example.webp` (creme, oliva, sálvia, limão; Instrument Serif + Inter) | LPC-4, LPC-6           |
| D2  | Versão do Next.js            | Next.js 16 (a LPC-5 citava o 15)                                                                  | LPC-5                  |
| D3  | Duração das consultas        | Primeira consulta ~60 min; retornos de 50 min                                                     | LPC-12, LPC-13         |
| D4  | Horário                      | Segunda a sexta 8h–19h; sábado 8h–12h, só online                                                  | LPC-15, LPC-19, LPC-21 |
| D5  | Mensagem do WhatsApp         | "Olá, vim pelo site e gostaria de agendar uma primeira consulta com a Dra. Helena."               | LPC-18                 |
| D6  | Título do hero               | O da LPC-9; o do briefing foi para o bloco de agendamento                                         | LPC-9, LPC-19          |
| D7  | Dados estruturados           | `Physician` + `FAQPage`, sem avaliações; site inteiro com `noindex` enquanto for portfólio        | LPC-20, LPC-21, LPC-25 |
| D8  | Respostas do FAQ             | Respostas escritas no projeto e aprovadas após o checklist da CFM                                 | LPC-13, LPC-23         |
| D9  | Seção "Presencial ou online" | Incorporada à LPC-15, como dois cards                                                             | LPC-15                 |
| D10 | Montagem da página           | `src/app/page.tsx` monta as seções prontas com o mesmo `LandingPage` do Storybook                 | LPC-8                  |

## Ordem de execução

| Ordem | Task   | Título                                                       | Fase                  | Depende de              | Repo |
| ----- | ------ | ------------------------------------------------------------ | --------------------- | ----------------------- | ---- |
| 1     | LPC-1  | Briefing e coleta de conteúdo com a cliente                  | 0 · Descoberta        | —                       | ✅   |
| 2     | LPC-2  | Definir com a cliente o destino da seção de depoimentos      | 0 · Descoberta        | LPC-1                   | ✅   |
| 3     | LPC-3  | Referências e wireframe mobile-first                         | 1 · Design            | LPC-1, LPC-2            | ⬜   |
| 4     | LPC-4  | Design system e layouts mobile, tablet e desktop no Figma    | 1 · Design            | LPC-3                   | 🟡   |
| 5     | LPC-5  | Criar repositório com Next.js 15 + TypeScript                | 2 · Fundação          | —                       | 🟡   |
| 6     | LPC-6  | Tailwind com tokens, ESLint, Prettier e Husky                | 2 · Fundação          | LPC-4, LPC-5            | 🟡   |
| 7     | LPC-7  | Vercel com preview por PR e variáveis de ambiente            | 2 · Fundação          | LPC-5                   | ⬜   |
| 8     | LPC-8  | Header, navegação e CTA fixo                                 | 3 · Seções            | LPC-6                   | 🟡   |
| 9     | LPC-9  | Hero com proposta de valor e CTA principal                   | 3 · Seções            | LPC-8                   | 🟡   |
| 10    | LPC-10 | Seção Sobre a profissional com identificação CRM/RQE         | 3 · Seções            | LPC-6                   | 🟡   |
| 11    | LPC-11 | Seção de especialidades                                      | 3 · Seções            | LPC-6                   | ⬜   |
| 12    | LPC-12 | Seção de benefícios do atendimento                           | 3 · Seções            | LPC-6                   | ⬜   |
| 13    | LPC-14 | Seção Como funciona o acompanhamento                         | 3 · Seções            | LPC-2                   | ✅   |
| 14    | LPC-13 | FAQ com acordeão acessível                                   | 3 · Seções            | LPC-6                   | 🟡   |
| 15    | LPC-15 | Seção de localização com mapa e footer                       | 3 · Seções            | LPC-6                   | 🟡   |
| 16    | LPC-18 | Botão flutuante de WhatsApp com mensagem pré-preenchida      | 4 · Conversão e LGPD  | LPC-7                   | 🟡   |
| 17    | LPC-24 | Política de privacidade, aviso LGPD e banner de cookies      | 4 · Conversão e LGPD  | LPC-6                   | ⬜   |
| 18    | LPC-16 | Formulário de contato com React Hook Form + Zod              | 4 · Conversão e LGPD  | LPC-24                  | ⬜   |
| 19    | LPC-17 | Route Handler de envio com Resend e honeypot anti-spam       | 4 · Conversão e LGPD  | LPC-16, LPC-7           | ⬜   |
| 20    | LPC-19 | Bloco de agendamento via WhatsApp (sem integração de agenda) | 4 · Conversão e LGPD  | LPC-18, LPC-16          | 🟡   |
| 21    | LPC-20 | Metadata API, Open Graph e favicon                           | 5 · SEO e performance | LPC-9                   | 🟡   |
| 22    | LPC-21 | JSON-LD Physician/MedicalBusiness, sitemap.ts e robots.ts    | 5 · SEO e performance | LPC-13, LPC-15          | ⬜   |
| 23    | LPC-23 | Revisar conteúdo contra a Resolução CFM 2.336/2023           | 6 · Publicação        | Fases 3 e 4             | 🟡   |
| 24    | LPC-22 | Otimizar imagens e fontes até Lighthouse ≥ 90                | 6 · Publicação        | LPC-23 (conteúdo final) | 🟡   |
| 25    | LPC-26 | GA4 e Vercel Analytics com eventos de conversão              | 6 · Publicação        | LPC-24, LPC-18, LPC-16  | ⬜   |
| 26    | LPC-25 | Configurar domínio e DNS                                     | 6 · Publicação        | LPC-7                   | ⬜   |
| 27    | LPC-27 | QA cross-browser e revisão de acessibilidade                 | 6 · Publicação        | Todas as anteriores     | 🟡   |
| 28    | LPC-28 | Handoff: README, acessos e case de portfólio                 | 6 · Publicação        | LPC-27                  | 🟡   |

**Por que esta ordem**

- **LPC-24 vem antes do formulário (LPC-16):** o checkbox de consentimento precisa apontar para a
  política de privacidade, e o banner de cookies precisa existir antes do GA4 (LPC-26).
- **LPC-14 antes da LPC-13:** segue a ordem da página definida na LPC-3 (… benefícios → como
  funciona → FAQ …) e já está pronta.
- **LPC-23 antes da LPC-22:** o Lighthouse final só faz sentido com o conteúdo e as imagens
  definitivos.
- **LPC-19 por último na fase 4:** o bloco de agendamento junta o WhatsApp (LPC-18) e o link para o
  formulário (LPC-16).

## Detalhamento por fase

### Fase 0 · Descoberta

**LPC-1 — Briefing** ✅ · Concluída no Jira. Briefing completo no comentário da task: público,
diferenciais, identificação CFM, especialidades, formatos, textos base, fotos e agendamento.

**LPC-2 — Destino da seção de depoimentos** ✅ · Concluída. Decisão: não usar depoimentos em
nenhuma parte do site; a seção vira "Como funciona o acompanhamento" (LPC-14). Registro em
`docs/discovery/LPC-2-destino-secao-depoimentos.md`.

### Fase 1 · Design

**LPC-3 — Referências e wireframe** ⬜

- Falta: 5–8 referências de landing pages de saúde mental e wireframe de baixa fidelidade,
  mobile-first.
- Ordem das seções: header → hero → sobre → especialidades → benefícios → como funciona o
  acompanhamento → FAQ → localização → contato → footer.
- Evitar: linguagem de autoajuda, promessa de resultado, fotos genéricas de pessoas sorrindo.

**LPC-4 — Design system e layouts** 🟡

- Existe: design system em código e documentado no Storybook (tokens, styleguide, componentes,
  contraste AA verificado em teste), feito a partir de `docs/references/example.webp`.
- Decisão D1: a entrega é o design system em código e no Storybook, e os layouts por breakpoint
  ficam nas stories de página (desktop e mobile).
- Falta: estados de input, select e checkbox (necessários para a LPC-16) e a story de tablet.

### Fase 2 · Fundação

**LPC-5 — Repositório** 🟡

- Existe: Next.js 16 (App Router), TypeScript strict, `src/app`, `src/components`,
  `src/content` (conteúdo tipado separado dos componentes), `src/lib`, README e `.gitignore`.
- Falta: proteção da branch `main` no GitHub. A versão 16 foi mantida (D2).

**LPC-6 — Tailwind, ESLint, Prettier e Husky** 🟡

- Existe: Tailwind v4 com tokens em `@theme`, ESLint, Prettier com ordenação de classes, Husky +
  lint-staged no pre-commit (typecheck e testes no pre-push), `next/font` com `display: swap`.
- Nada pendente além do que vier da LPC-16 (tokens de estados de formulário).

**LPC-7 — Vercel** ⬜

- Falta: projeto na Vercel com deploy automático e preview por PR; variáveis para a chave do
  Resend e o número do WhatsApp; `.env.example` versionado; `noindex` no preview.
- Nota: hoje o número do WhatsApp é uma constante em `src/content/landing.tsx`.

### Fase 3 · Seções (na ordem da página)

**LPC-8 — Header** 🟡

- Existe: `SiteHeader` com logo, navegação por âncoras, link de WhatsApp e menu mobile com
  `aria-expanded`. A página real (`src/app/page.tsx`) já monta as seções prontas (D10).
- Falta: trap de foco e fechamento por Esc no menu; scroll suave; fundo sólido após sair do hero;
  CTA de WhatsApp sempre visível (header fixo).

**LPC-9 — Hero** 🟡

- Existe: copy aprovada da LPC-9, `h1` único, CTA primário (WhatsApp) e secundário (âncora para
  Sobre), linha de identificação CRM/RQE.
- Falta: foto real com `priority` (o componente já aceita `image`).

**LPC-10 — Sobre** 🟡

- Existe: `AboutSection` com nome, especialidade, CRM e RQE visíveis na própria seção, e uma versão
  condensada do texto do briefing.
- Falta: texto completo em primeira pessoa (2–3 parágrafos, formação, residência, tempo de atuação,
  decisão compartilhada sobre medicação) e foto vertical.

**LPC-11 — Especialidades** ⬜

- Falta: grid de 6 cards (ansiedade, depressão, TDAH em adultos, burnout, transtorno bipolar,
  insônia), cada um com uma linha sobre como a condição aparece no dia a dia.

**LPC-12 — Benefícios** ⬜

- Falta: 4 blocos sobre o processo (duração das consultas, retorno por WhatsApp entre consultas,
  trabalho integrado com o psicólogo, recibo para reembolso), com ícones simples. Usar 50 min para retornos e ~60 min para a primeira consulta (D3).

**LPC-14 — Como funciona o acompanhamento** ✅

- Feito em `feature/lpc-14-como-funciona-acompanhamento`: `CareStepsSection` com as 3 etapas e o
  CTA "Agendar primeira consulta", na posição e com o peso visual da antiga seção de depoimentos.
  Timeline vertical no mobile e horizontal no desktop.
- Os componentes de depoimento (`TestimonialCard`) e avaliação (`Rating`) foram removidos do design
  system.

**LPC-13 — FAQ** 🟡

- Existe: `FaqSection` com as 8 perguntas da task, acordeão Radix com `aria-expanded` e teclado.
- Falta: manter o conteúdo das respostas no HTML mesmo fechado (hoje o Radix desmonta; usar
  `forceMount` + `hidden`), e gerar o `FAQPage` (LPC-21). As respostas estão aprovadas (D8).

**LPC-15 — Localização e footer** 🟡

- Existe: rodapé com identificação completa, aviso de emergência (SAMU 192 / CVV 188) e link para a
  política de privacidade.
- Falta: seção de localização (mapa em iframe lazy, endereço, metrô Ana Rosa, estacionamento, foto
  da fachada) com os cards "Presencial" e "Online" (D9); no rodapé, endereço, telefone, e-mail, redes sociais e crédito de desenvolvimento.

### Fase 4 · Conversão e LGPD

**LPC-18 — Botão flutuante de WhatsApp** 🟡

- Existe: `whatsappUrl()` em `src/lib/whatsapp.ts` (com teste) e a mensagem da task.
- Falta: botão flutuante com `aria-label`, sem cobrir conteúdo no mobile nem o rodapé; número via
  variável de ambiente (LPC-7); evento de clique (LPC-26).

**LPC-24 — Privacidade, LGPD e cookies** ⬜

- Falta: rota `/politica-de-privacidade` (o rodapé já aponta para ela); aviso junto ao checkbox do
  formulário; banner de cookies com recusa real e sem carregar o GA4 antes do aceite.

**LPC-16 — Formulário de contato** ⬜

- Falta: componentes de formulário no design system (input, radio, checkbox, mensagens de erro) e o
  formulário com React Hook Form + Zod.
- Campos: nome, e-mail, telefone, preferência (presencial/online), período de retorno e
  consentimento. **Não** coletar motivo da consulta, sintomas, medicação nem texto livre.

**LPC-17 — Envio com Resend** ⬜

- Falta: Route Handler POST com o mesmo schema Zod, honeypot, tempo mínimo de preenchimento, rate
  limit por IP, chave só no servidor, sem log do corpo e erro genérico para o usuário.

**LPC-19 — Bloco de agendamento** 🟡

- Existe: `CtaBanner` usado como bloco de agendamento, com botão de WhatsApp e o horário de
  atendimento.
- Existe também o horário completo, com sábado online (D4).
- Falta: link alternativo para o formulário (após a LPC-16).

### Fase 5 · SEO e performance

**LPC-20 — Metadata, Open Graph e favicon** 🟡

- Existe: `lang="pt-BR"`, título e descrição provisórios e `noindex, nofollow` em todo o site (D7).
- Falta: title e description otimizados para as buscas do público, Open Graph e Twitter Card
  1200×630, favicons e canonical.

**LPC-21 — JSON-LD, sitemap e robots** ⬜

- Falta: JSON-LD `Physician` com horários e área atendida, e `FAQPage` (D7); `sitemap.ts` e `robots.ts`;
  validação no Rich Results Test. Sem `Review` nem `AggregateRating` (LPC-2).

### Fase 6 · Publicação

**LPC-23 — Revisão CFM** 🟡

- Existe: checagem automática de parte das regras em `sections.test.tsx` (depoimentos, cura,
  garantia, superlativos, preços e números de pacientes) e CRM/RQE visíveis em hero, Sobre e rodapé.
- Falta: revisão manual completa do texto final e registro dos ajustes no comentário da task.

**LPC-22 — Lighthouse ≥ 90** 🟡

- Existe: `next/font` com subset latin e `display: swap`; `next/image` nos componentes de mídia.
- Falta: medir antes e depois em mobile (Performance, Acessibilidade, Boas práticas e SEO),
  `priority` só no hero, iframe do mapa lazy, revisar CLS e bundle; registrar os números na task.

**LPC-26 — GA4 e Vercel Analytics** ⬜

- Falta: GA4 só após aceite de cookies; Vercel Analytics e Speed Insights; eventos de clique no
  WhatsApp por origem (header, hero, botão flutuante, agendamento) e envio do formulário, sem dado
  pessoal.

**LPC-25 — Domínio e DNS** ⬜

- Falta: subdomínio de portfólio com `noindex`, HTTPS, redirect www/apex e canonical no domínio
  final.

**LPC-27 — QA e acessibilidade** 🟡

- Existe: addon de acessibilidade no Storybook, foco visível, `prefers-reduced-motion` respeitado
  e testes de comportamento dos componentes interativos.
- Falta: rodada em Chrome, Safari (desktop e iOS), Firefox e Edge, com iPhone e Android reais;
  leitor de tela no menu, acordeão e formulário.

**LPC-28 — Handoff** 🟡

- Existe: README com stack, scripts, estrutura e fluxo de branches.
- Falta: como editar o conteúdo e trocar WhatsApp e chave de e-mail, lista de acessos e serviços,
  créditos das fotos, números finais do Lighthouse e o case de portfólio (deixando claro que é um
  projeto conceitual).
