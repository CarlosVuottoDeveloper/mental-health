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

As divergências encontradas entre as tasks e as decisões tomadas durante a implementação estão
registradas aqui, todas de 2026-10-26. A justificativa de cada
uma está em [`docs/discovery/decisoes-do-projeto.md`](../discovery/decisoes-do-projeto.md).

| #   | Tema                         | Decisão                                                                                           | Afeta                                 |
| --- | ---------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------- |
| D1  | Paleta e tipografia          | Mantido o design system de `example.webp` (creme, oliva, sálvia, limão; Instrument Serif + Inter) | LPC-4, LPC-6                          |
| D2  | Versão do Next.js            | Next.js 16 (a LPC-5 citava o 15)                                                                  | LPC-5                                 |
| D3  | Duração das consultas        | Primeira consulta ~60 min; retornos de 50 min                                                     | LPC-12, LPC-13                        |
| D4  | Horário                      | Segunda a sexta 8h–19h; sábado 8h–12h, só online                                                  | LPC-15, LPC-19, LPC-21                |
| D5  | Mensagem do WhatsApp         | "Olá, vim pelo site e gostaria de agendar uma primeira consulta com a Dra. Helena."               | LPC-18                                |
| D6  | Título do hero               | O da LPC-9; o do briefing foi para o bloco de agendamento                                         | LPC-9, LPC-19                         |
| D7  | Dados estruturados           | `Physician` + `FAQPage`, sem avaliações; site inteiro com `noindex` enquanto for portfólio        | LPC-20, LPC-21, LPC-25                |
| D8  | Respostas do FAQ             | Respostas escritas no projeto e aprovadas após o checklist da CFM                                 | LPC-13, LPC-23                        |
| D9  | Seção "Presencial ou online" | Incorporada à LPC-15, como dois cards                                                             | LPC-15                                |
| D10 | Montagem da página           | `src/app/page.tsx` monta as seções prontas com o mesmo `LandingPage` do Storybook                 | LPC-8                                 |
| D11 | Ordem da publicação          | Vercel (LPC-7) e domínio (LPC-25) por último; variáveis de ambiente locais até lá                 | LPC-7, LPC-17, LPC-18, LPC-25, LPC-27 |
| D12 | Fotos                        | Fotos do Pexels, sem pessoas identificáveis no papel da médica                                    | LPC-9, LPC-10, LPC-15                 |
| D13 | Mapa                         | Embed do OpenStreetMap (sem cookies), região da estação Ana Rosa                                  | LPC-15, LPC-24                        |
| D14 | Formulário no portfólio      | `CONTACT_SIMULATE=true` liga um modo de demonstração explícito                                    | LPC-17                                |
| D15 | Analytics                    | Vercel (sem cookies) sempre; GA4 só após consentimento; eventos por um ouvinte único              | LPC-26                                |
| D16 | Layout do wireframe          | Estrutura do wireframe da LPC-3; textos revisados, sem ícones de diagnóstico                      | LPC-3                                 |

## Ordem de execução

| Ordem | Task   | Título                                                       | Fase                  | Depende de             | Repo |
| ----- | ------ | ------------------------------------------------------------ | --------------------- | ---------------------- | ---- |
| 1     | LPC-1  | Briefing e coleta de conteúdo com a cliente                  | 0 · Descoberta        | —                      | ✅   |
| 2     | LPC-2  | Definir com a cliente o destino da seção de depoimentos      | 0 · Descoberta        | LPC-1                  | ✅   |
| 3     | LPC-3  | Referências e wireframe mobile-first                         | 1 · Design            | LPC-1, LPC-2           | 🟡   |
| 4     | LPC-4  | Design system e layouts mobile, tablet e desktop no Figma    | 1 · Design            | LPC-3                  | ✅   |
| 5     | LPC-5  | Criar repositório com Next.js 15 + TypeScript                | 2 · Fundação          | —                      | 🟡   |
| 6     | LPC-6  | Tailwind com tokens, ESLint, Prettier e Husky                | 2 · Fundação          | LPC-4, LPC-5           | ✅   |
| 7     | LPC-8  | Header, navegação e CTA fixo                                 | 3 · Seções            | LPC-6                  | ✅   |
| 8     | LPC-9  | Hero com proposta de valor e CTA principal                   | 3 · Seções            | LPC-8                  | ✅   |
| 9     | LPC-10 | Seção Sobre a profissional com identificação CRM/RQE         | 3 · Seções            | LPC-6                  | ✅   |
| 10    | LPC-11 | Seção de especialidades                                      | 3 · Seções            | LPC-6                  | ✅   |
| 11    | LPC-12 | Seção de benefícios do atendimento                           | 3 · Seções            | LPC-6                  | ✅   |
| 12    | LPC-14 | Seção Como funciona o acompanhamento                         | 3 · Seções            | LPC-2                  | ✅   |
| 13    | LPC-13 | FAQ com acordeão acessível                                   | 3 · Seções            | LPC-6                  | ✅   |
| 14    | LPC-15 | Seção de localização com mapa e footer                       | 3 · Seções            | LPC-6                  | ✅   |
| 15    | LPC-18 | Botão flutuante de WhatsApp com mensagem pré-preenchida      | 4 · Conversão e LGPD  | LPC-6                  | ✅   |
| 16    | LPC-24 | Política de privacidade, aviso LGPD e banner de cookies      | 4 · Conversão e LGPD  | LPC-6                  | ✅   |
| 17    | LPC-16 | Formulário de contato com React Hook Form + Zod              | 4 · Conversão e LGPD  | LPC-24                 | ✅   |
| 18    | LPC-17 | Route Handler de envio com Resend e honeypot anti-spam       | 4 · Conversão e LGPD  | LPC-16                 | ✅   |
| 19    | LPC-19 | Bloco de agendamento via WhatsApp (sem integração de agenda) | 4 · Conversão e LGPD  | LPC-18, LPC-16         | ✅   |
| 20    | LPC-20 | Metadata API, Open Graph e favicon                           | 5 · SEO e performance | LPC-9                  | ✅   |
| 21    | LPC-21 | JSON-LD Physician/MedicalBusiness, sitemap.ts e robots.ts    | 5 · SEO e performance | LPC-13, LPC-15         | ✅   |
| 22    | LPC-23 | Revisar conteúdo contra a Resolução CFM 2.336/2023           | 6 · Qualidade         | Fases 3 e 4            | ✅   |
| 23    | LPC-26 | GA4 e Vercel Analytics com eventos de conversão              | 6 · Qualidade         | LPC-24, LPC-18, LPC-16 | ✅   |
| 24    | LPC-22 | Otimizar imagens e fontes até Lighthouse ≥ 90                | 6 · Qualidade         | LPC-23, LPC-26         | ✅   |
| 25    | LPC-7  | Vercel com preview por PR e variáveis de ambiente            | 7 · Publicação        | Fases 3 a 6            | ⬜   |
| 26    | LPC-25 | Configurar domínio e DNS                                     | 7 · Publicação        | LPC-7                  | ⬜   |
| 27    | LPC-27 | QA cross-browser e revisão de acessibilidade                 | 7 · Publicação        | LPC-25                 | 🟡   |
| 28    | LPC-28 | Handoff: README, acessos e case de portfólio                 | 7 · Publicação        | LPC-27                 | 🟡   |

**Por que esta ordem**

- **Vercel por último (D11):** o site é construído e validado localmente, e a publicação (LPC-7 e
  LPC-25) fica para o fim. As variáveis de ambiente da LPC-18 e da LPC-17 usam `.env.local` e um
  `.env.example` versionado até lá. O QA (LPC-27) vem depois do deploy, para testar em iPhone e
  Android reais pela URL publicada.
- **LPC-24 vem antes do formulário (LPC-16):** o checkbox de consentimento precisa apontar para a
  política de privacidade, e o banner de cookies precisa existir antes do GA4 (LPC-26).
- **LPC-14 antes da LPC-13:** segue a ordem da página definida na LPC-3 (… benefícios → como
  funciona → FAQ …) e já está pronta.
- **LPC-23 e LPC-26 antes da LPC-22:** o Lighthouse só faz sentido com o conteúdo final e com todo o
  JavaScript de analytics já na página.
- **LPC-19 por último na fase 4:** o bloco de agendamento junta o WhatsApp (LPC-18) e o link para o
  formulário (LPC-16).

## Situação por task (2026-10-26)

Tudo o que não depende da publicação está implementado e mesclado na `develop`, uma branch
`feature/lpc-*` por task. O que falta está abaixo.

### Pendentes

**LPC-7 — Vercel** ⬜ · Importar o repositório, configurar previews por PR e cadastrar as variáveis do
`.env.example` (`NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL`, Resend ou `CONTACT_SIMULATE`,
GA4 opcional). Os previews da Vercel já saem com `noindex`, como todo o site (D7).

**LPC-25 — Domínio e DNS** ⬜ · Subdomínio de portfólio com HTTPS e redirect www/apex;
`NEXT_PUBLIC_SITE_URL` apontando para ele, para o canonical e o sitemap.

**LPC-27 — QA** 🟡 · A rodada pré-deploy está em `docs/quality/qa.md` (axe com 0 violações,
teclado, formulário). Faltam navegadores (Safari, Firefox, Edge), iPhone e Android reais e leitor de
tela, na URL publicada.

**LPC-28 — Handoff** 🟡 · README completo e rascunho do case em `docs/case/estudo-de-caso.md`.
Faltam os números de Lighthouse da URL publicada e a lista final de acessos.

**LPC-3 — Referências e wireframe** 🟡 · O wireframe mobile-first (celular, tablet e desktop, com
anotações e estados) foi gerado no Claude Design a partir de
`docs/design/prompt-wireframe-claude-design.md` (imagens em `docs/design/wireframe/`), e o layout
do site foi ajustado a ele (D16). Falta o
levantamento de 5 a 8 referências.

**LPC-5 — Repositório** 🟡 · Falta só a proteção da branch `main` no GitHub (configuração do
repositório).

### Concluídas no código

| Task   | Onde está                                                                              |
| ------ | -------------------------------------------------------------------------------------- |
| LPC-4  | Design system em `src/styles/tokens.css`, `src/components/ui` e Storybook (D1)         |
| LPC-6  | Tailwind v4, ESLint, Prettier, Husky + lint-staged, `next/font`                        |
| LPC-8  | `SiteHeader`: fixo, transparente sobre o hero, menu com foco preso e Esc, scroll suave |
| LPC-9  | `Hero` com a copy da LPC-9, `h1` único e linha de identificação                        |
| LPC-10 | `AboutSection`: texto em primeira pessoa, retrato e credenciais com CRM/RQE            |
| LPC-11 | `SpecialtiesSection`: 6 condições descritas pelo dia a dia                             |
| LPC-12 | `BenefitsSection`: 4 itens sobre o processo de atendimento                             |
| LPC-13 | `FaqSection`: 8 perguntas, respostas no HTML mesmo fechadas                            |
| LPC-14 | `CareStepsSection`: as 3 etapas do acompanhamento                                      |
| LPC-15 | `LocationSection` (presencial/online e mapa OSM) e rodapé completo                     |
| LPC-16 | `ContactSection` com React Hook Form + Zod e componentes de formulário                 |
| LPC-17 | `POST /api/contato` com honeypot, tempo mínimo, limite por IP e Resend                 |
| LPC-18 | `WhatsAppButton` e número via `NEXT_PUBLIC_WHATSAPP_NUMBER`                            |
| LPC-19 | Bloco de agendamento com horários, WhatsApp e link para o formulário                   |
| LPC-20 | Metadata, Open Graph gerado, favicon e ícones da marca                                 |
| LPC-21 | JSON-LD `Physician` e `FAQPage`, `sitemap.xml` e `robots.txt`                          |
| LPC-22 | Lighthouse mobile ≥ 90 nas quatro categorias (`docs/quality/lighthouse.md`)            |
| LPC-23 | Revisão CFM (`docs/quality/revisao-cfm.md`) e checagem automática da copy              |
| LPC-24 | `/politica-de-privacidade`, banner de cookies e preferências no rodapé                 |
| LPC-26 | Vercel Analytics, Speed Insights, GA4 com consentimento e eventos de conversão         |
