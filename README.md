# Landing page · Dra. Helena Vasconcelos, psiquiatra

Landing page de consultório psiquiátrico construída com Next.js, React e TypeScript.

> **Projeto conceitual de portfólio, com cliente fictícia.** A Dra. Helena Vasconcelos não existe.
> CRM e RQE são zerados de propósito, o endereço é fictício e o e-mail usa o domínio reservado
> `.example`. O site sai com `noindex` para não aparecer em buscas.

**Site publicado:** [dra-helena-vasconcelos.vercel.app](https://dra-helena-vasconcelos.vercel.app)

O escopo e as decisões vêm do quadro **Landing Page Consultório (LPC)** no Jira. O caminho completo
está em [`docs/`](#documentação), incluindo o [estudo de caso](docs/case/estudo-de-caso.md).

## Stack

- **Next.js 16** (App Router, Cache Components) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** com tokens de design próprios
- **Radix UI** (acordeão e abas), **React Hook Form** + **Zod** (formulário)
- **Vitest** + **React Testing Library**; **Storybook 10** para o design system
- **ESLint**, **Prettier**, **Husky** + **lint-staged**
- Envio de e-mail via **Resend**; **Vercel Analytics**, **Speed Insights** e **GA4** (com consentimento)

## Primeiros passos

```bash
npm install
cp .env.example .env.local   # opcional: os valores padrão funcionam localmente
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000). Sem a chave do Resend, o formulário de
contato é aceito em desenvolvimento sem enviar e-mail.

## Scripts

| Script                    | Descrição                               |
| ------------------------- | --------------------------------------- |
| `npm run dev`             | Servidor de desenvolvimento (Turbopack) |
| `npm run build`           | Build de produção                       |
| `npm run start`           | Servidor de produção                    |
| `npm run lint`            | Executa o ESLint                        |
| `npm run lint:fix`        | Executa o ESLint corrigindo o que puder |
| `npm run format`          | Formata o código com Prettier           |
| `npm run format:check`    | Verifica a formatação                   |
| `npm run typecheck`       | Checagem de tipos com `tsc`             |
| `npm test`                | Testes em modo watch                    |
| `npm run test:run`        | Executa os testes uma vez               |
| `npm run test:coverage`   | Testes com relatório de cobertura       |
| `npm run storybook`       | Storybook em http://localhost:6006      |
| `npm run build-storybook` | Build estático do Storybook             |

## Variáveis de ambiente

Todas estão documentadas em [`.env.example`](.env.example). Na Vercel, cadastre-as em
**Settings → Environment Variables**.

| Variável                        | Onde é usada                                  | Padrão                     |
| ------------------------------- | --------------------------------------------- | -------------------------- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`   | Todos os botões de WhatsApp                   | `5511900000000` (fictício) |
| `NEXT_PUBLIC_SITE_URL`          | Metadata, Open Graph, canonical, sitemap      | `http://localhost:3000`    |
| `NEXT_PUBLIC_SITE_INDEXABLE`    | `true` libera a indexação por buscadores      | desligado (`noindex`)      |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4, carregado só após o aceite de cookies    | sem GA4                    |
| `RESEND_API_KEY`                | Envio do formulário (só no servidor)          | —                          |
| `CONTACT_FROM_EMAIL`            | Remetente verificado no Resend                | —                          |
| `CONTACT_TO_EMAIL`              | Quem recebe os pedidos de contato             | —                          |
| `CONTACT_SIMULATE`              | `true`: demonstração sem envio (só portfólio) | desligado                  |

## Como editar o conteúdo

Nenhum texto fica dentro dos componentes:

- **Textos da landing page:** [`src/content/landing.tsx`](src/content/landing.tsx), um objeto por
  seção (hero, sobre, especialidades, FAQ, rodapé…).
- **Dados do consultório:** o objeto `practice` no mesmo arquivo (endereço, telefone, e-mail,
  horários). O horário é usado em mais de um lugar e muda em todos de uma vez.
- **Identificação profissional:** o objeto `professional` (nome, CRM, RQE). Aparece no hero, no
  "Sobre", no rodapé e nos dados estruturados.
- **Política de privacidade:** [`src/content/privacy.ts`](src/content/privacy.ts).
- **Número do WhatsApp:** variável `NEXT_PUBLIC_WHATSAPP_NUMBER`. A mensagem pré-preenchida fica em
  `whatsappHref`, em `landing.tsx`.
- **Chave de e-mail:** variáveis `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` e `CONTACT_TO_EMAIL`.

Antes de publicar qualquer texto novo, confira as regras da Resolução CFM nº 2.336/2023 em
[`docs/quality/revisao-cfm.md`](docs/quality/revisao-cfm.md). Os testes já barram parte delas
(depoimentos, promessas, superlativos, preços, urgência).

### Fotos

As fotos ficam em `public/images/` e vêm do Pexels (decisão D12). O `next/image` gera as versões
WebP/AVIF em cada tamanho, então o arquivo original pode ser JPEG. Para trocar uma foto:

1. Salve a imagem em `public/images/`, com no máximo ~1920 px no lado maior.
2. Em `src/content/landing.tsx`, preencha `src` e `alt` do item: `heroContent.image`,
   `aboutContent.portrait`, `aboutContent.media`, `locationContent.facade`.
3. Registre o crédito na seção [Créditos](#créditos).

Não use fotos de pacientes nem de pessoas identificáveis representando a médica. O texto
branco do hero fica sobre um degradê escuro; se trocar a foto, confira o contraste do menu e do
título.

## Design system

Derivado da referência em `docs/references/example.webp` e documentado no Storybook
(`npm run storybook`): tokens, styleguide (cores, tipografia, layout, movimento, voz e conteúdo),
componentes e a página completa.

- **Tokens:** `src/styles/tokens.css` é a fonte da verdade (Tailwind `@theme`), espelhado em
  `src/design-system/tokens.ts`; um teste garante que os dois não divergem.
- **Componentes base:** `src/components/ui`, importados de `@/components/ui`.
- **Seções:** `src/components/sections`, importadas de `@/components/sections`.

## Estrutura

```
src/
  app/                  # rotas: home, política de privacidade, /api/contato, metadata e ícones
  content/              # textos da landing page e da política, tipados
  components/
    ui/                 # componentes base do design system
    sections/           # seções da landing page
    landing-page.tsx    # composição da página (app e Storybook)
  design-system/docs/   # styleguide (MDX do Storybook)
  lib/                  # utilitários: env, consentimento, analytics, schema do formulário…
  styles/               # tokens de design
docs/                   # descoberta, planejamento, qualidade e estudo de caso
.storybook/             # configuração do Storybook
```

## Qualidade

- **Testes:** 143 testes (componentes, conteúdo, formulário, API, tokens, contraste, analytics).
- **Lighthouse na URL publicada:** mobile 98 / 100 / 100 e desktop 100 / 100 / 100 (desempenho,
  acessibilidade, boas práticas; SEO 100 com a indexação ligada). Detalhes em
  [`docs/quality/lighthouse.md`](docs/quality/lighthouse.md).
- **Acessibilidade:** 0 violações WCAG 2.2 AA no axe. Detalhes em
  [`docs/quality/qa.md`](docs/quality/qa.md).

## Git hooks e fluxo de branches

Hooks com [Husky](https://typicode.github.io/husky) e
[lint-staged](https://github.com/lint-staged/lint-staged), instalados no `npm install`:

- **pre-commit:** `eslint --fix` e `prettier --write` nos arquivos em stage.
- **pre-push:** `npm run typecheck` e `npm run test:run`.

Fluxo **Gitflow**:

- `main`: código em produção; recebe merges apenas de `release/*` e `hotfix/*`.
- `develop`: branch de integração.
- `feature/lpc-<n>-<slug>`: uma por task do Jira, criada a partir de `develop` e mesclada de volta
  com `--no-ff`.
- `release/<versão>` e `hotfix/<nome>`: entram na `main` por pull request (com tag depois do merge)
  e voltam para a `develop` com merge direto.

### CI e proteção da `main`

O workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml) roda em todo pull request e em
todo push na `main` e na `develop`: `npm ci`, typecheck, lint, formatação, testes e build, no
Node 24 (o mesmo da Vercel). Ao contrário do hook de pre-push, não dá para pular.

A `main` tem uma regra (Settings → Rules → Rulesets, "Proteção da main") que:

- só aceita mudanças por pull request, mesclado com merge commit (sem squash nem rebase);
- exige as checagens `verify` (CI) e `Vercel` (deploy de preview) verdes;
- bloqueia force push e exclusão da branch.

A regra não exige aprovação de outra pessoa, porque o projeto tem um só mantenedor. Fechando uma
release:

```bash
git checkout -b release/x.y.z develop      # versão no package.json e no CHANGELOG
git push -u origin release/x.y.z
gh pr create --base main --head release/x.y.z --title "Release x.y.z"
gh pr merge --merge --delete-branch        # depois de `verify` e `Vercel` verdes
git checkout main && git pull && git tag -a vx.y.z -m "..." && git push origin vx.y.z
git checkout develop && git merge --no-ff main && git push
```

## Deploy

Projeto **`dra-helena-vasconcelos`** na Vercel (LPC-7), ligado a este repositório no GitHub:

- **Produção:** cada push na `main` (ou seja, cada release) publica em [dra-helena-vasconcelos.vercel.app](https://dra-helena-vasconcelos.vercel.app).
- **Previews:** cada push e pull request nas outras branches gera uma URL de preview, protegida
  pelo login da Vercel. Previews e produção saem com `noindex` (D7).
- **Domínio:** o subdomínio `.vercel.app`, com HTTPS automático (decisão D17). Para usar um
  domínio próprio, adicione-o em **Settings → Domains**, troque `NEXT_PUBLIC_SITE_URL` e publique
  de novo.

Variáveis cadastradas (produção e preview):

| Variável               | Valor                                         |
| ---------------------- | --------------------------------------------- |
| `CONTACT_SIMULATE`     | `true` (formulário em modo demonstração, D14) |
| `NEXT_PUBLIC_SITE_URL` | `https://dra-helena-vasconcelos.vercel.app`   |

As demais ficam sem valor de propósito: `NEXT_PUBLIC_SITE_INDEXABLE` (portfólio sem indexação),
`NEXT_PUBLIC_WHATSAPP_NUMBER` (número fictício padrão) e `NEXT_PUBLIC_GA_MEASUREMENT_ID` (sem GA4).
Web Analytics e Speed Insights estão ativos no projeto.

## Serviços e acessos

| Serviço | Para quê                                  | Onde configurar                       |
| ------- | ----------------------------------------- | ------------------------------------- |
| Vercel  | Hospedagem, previews, Analytics           | Projeto `dra-helena-vasconcelos`      |
| Resend  | Envio do formulário de contato            | resend.com → API Keys e domínio       |
| GA4     | Métricas de conversão (com consentimento) | analytics.google.com → ID de medição  |
| Domínio | Endereço público                          | `.vercel.app` (D17); próprio: Domains |

## Documentação

| Documento                                                                                                | Conteúdo                                 |
| -------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| [`docs/case/estudo-de-caso.md`](docs/case/estudo-de-caso.md)                                             | Case de portfólio                        |
| [`docs/planning/plano-de-implementacao.md`](docs/planning/plano-de-implementacao.md)                     | As 28 tasks do Jira em ordem, com status |
| [`docs/discovery/decisoes-do-projeto.md`](docs/discovery/decisoes-do-projeto.md)                         | Decisões D1–D17 e justificativas         |
| [`docs/discovery/LPC-2-destino-secao-depoimentos.md`](docs/discovery/LPC-2-destino-secao-depoimentos.md) | Por que não há depoimentos               |
| [`docs/quality/`](docs/quality)                                                                          | Revisão CFM, Lighthouse e QA             |
| [`docs/design/`](docs/design)                                                                            | Prompt e imagens do wireframe (LPC-3)    |

## Créditos

- **Fontes:** [Instrument Serif](https://github.com/Instrument/instrument-serif) e
  [Inter](https://rsms.me/inter/), ambas sob SIL Open Font License (cópia em
  `src/app/_assets/OFL.txt`).
- **Ícones:** [Lucide](https://lucide.dev) (ISC); ícone do WhatsApp do
  [Simple Icons](https://simpleicons.org) (CC0).
- **Mapa:** © colaboradores do [OpenStreetMap](https://www.openstreetmap.org/copyright).
- **Fotos:** [Pexels](https://www.pexels.com/license/) (uso livre, sem exigência de crédito). Cada
  página abaixo mostra o autor:
  - Hero: [poltrona e parede de plantas](https://www.pexels.com/photo/6585744/)
  - Sobre: [poltrona junto à janela](https://www.pexels.com/photo/16269026/)
  - Detalhes: [folhas de oliveira](https://www.pexels.com/photo/16841999/),
    [chá e livros](https://www.pexels.com/photo/4186904/) e
    [parede de cal com cadeira](https://www.pexels.com/photo/27522843/)
  - Fachada: [varandas em São Paulo](https://www.pexels.com/photo/34147115/) (Rafaela Gonçalves
    Sanches)
