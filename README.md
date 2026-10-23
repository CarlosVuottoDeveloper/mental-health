# Mental Health

Aplicação web construída com [Next.js](https://nextjs.org) (App Router), React e TypeScript.

## Stack

- **Next.js 16** + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4**
- **ESLint** (`eslint-config-next`) + **Prettier** (com `prettier-plugin-tailwindcss`)
- **Vitest** + **React Testing Library** (ambiente `jsdom`)

## Primeiros passos

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Scripts

| Script                  | Descrição                               |
| ----------------------- | --------------------------------------- |
| `npm run dev`           | Servidor de desenvolvimento (Turbopack) |
| `npm run build`         | Build de produção                       |
| `npm run start`         | Servidor de produção                    |
| `npm run lint`          | Executa o ESLint                        |
| `npm run lint:fix`      | Executa o ESLint corrigindo o que puder |
| `npm run format`        | Formata o código com Prettier           |
| `npm run format:check`  | Verifica a formatação                   |
| `npm run typecheck`     | Checagem de tipos com `tsc`             |
| `npm test`              | Testes em modo watch                    |
| `npm run test:run`      | Executa os testes uma vez               |
| `npm run test:coverage` | Testes com relatório de cobertura       |

## Estrutura

```
src/
  app/            # rotas do App Router (layout, páginas, estilos globais)
    __tests__/    # testes das páginas
  test/           # setup do Vitest
public/           # arquivos estáticos
```

Testes ficam em arquivos `*.test.ts(x)`, próximos ao código ou em pastas `__tests__/`.
