# Mental Health

Aplicação web construída com [Next.js](https://nextjs.org) (App Router), React e TypeScript.

## Stack

- **Next.js 16** + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4**
- **ESLint** (`eslint-config-next`) + **Prettier** (com `prettier-plugin-tailwindcss`)
- **Vitest** + **React Testing Library** (ambiente `jsdom`)
- **Storybook 10** para documentar o design system

## Primeiros passos

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

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

## Design system

Derivado da referência em `docs/references/example.webp`. A documentação completa (tokens,
styleguide, componentes e a landing page de exemplo) está no Storybook: `npm run storybook`.

- **Tokens:** `src/styles/tokens.css` é a fonte da verdade (Tailwind `@theme`), espelhado em
  `src/design-system/tokens.ts`. Use os tokens semânticos (`bg-background`, `text-foreground-muted`,
  `bg-accent`, `text-display-lg`…).
- **Componentes base:** `src/components/ui`, importados de `@/components/ui`.
- **Seções da landing page:** `src/components/sections`, importadas de `@/components/sections`.

## Estrutura

```
src/
  app/              # rotas do App Router (layout, páginas, fontes, estilos globais)
  components/
    ui/             # componentes base do design system
    sections/       # seções da landing page
  design-system/
    docs/           # styleguide (MDX do Storybook)
    examples/       # conteúdo de exemplo e landing page completa
  lib/              # utilitários (cn)
  styles/           # tokens de design
  test/             # setup do Vitest
public/             # arquivos estáticos
.storybook/         # configuração do Storybook
```

Testes ficam em arquivos `*.test.ts(x)`, próximos ao código ou em pastas `__tests__/`.

## Git hooks

Configurados com [Husky](https://typicode.github.io/husky) e [lint-staged](https://github.com/lint-staged/lint-staged), instalados automaticamente no `npm install` (script `prepare`):

- **pre-commit**: roda `eslint --fix` e `prettier --write` apenas nos arquivos em stage.
- **pre-push**: roda `npm run typecheck` e `npm run test:run`.

## Fluxo de branches (Gitflow)

- `main`: código em produção; recebe merges apenas de `release/*` e `hotfix/*`.
- `develop`: branch de integração; base para novas features.
- `feature/<nome>`: criada a partir de `develop` e mesclada de volta com `--no-ff`.
- `release/<versão>`: criada a partir de `develop`, mesclada em `main` (com tag) e em `develop`.
- `hotfix/<nome>`: criada a partir de `main`, mesclada em `main` (com tag) e em `develop`.
