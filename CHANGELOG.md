# Changelog

Todas as mudanças relevantes deste projeto são documentadas aqui.
O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o projeto usa
[Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [0.1.0] - 2026-10-26

### Adicionado

- Projeto Next.js 16 (App Router, Turbopack) com React 19, TypeScript e Tailwind CSS v4.
- Prettier, ESLint, Vitest + React Testing Library.
- Git hooks com Husky e lint-staged: lint e formatação no pre-commit; typecheck e testes no
  pre-push.
- Design system derivado de `docs/references/example.webp`:
  - tokens de cor, tipografia, raio, layout e movimento (`src/styles/tokens.css`);
  - componentes base em `src/components/ui` e seções da landing page em
    `src/components/sections`;
  - styleguide e documentação dos componentes no Storybook 10.
- Skills de agente em `.agents/`.

[0.1.0]: https://github.com/CarlosVuottoDeveloper/mental-health/releases/tag/v0.1.0
