# Changelog

Todas as mudanças relevantes deste projeto são documentadas aqui.
O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o projeto usa
[Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Não lançado]

## [0.3.1] - 2026-10-28

Publicação na Vercel.

### Adicionado

- Site publicado na Vercel em https://dra-helena-vasconcelos.vercel.app (LPC-7), com previews por branch e PR, e decisão
  D17 sobre o domínio (LPC-25).
- Rodada de QA e Lighthouse na URL publicada (LPC-27, LPC-28).

## [0.3.0] - 2026-10-28

Fotos e layout a partir do wireframe da LPC-3.

### Adicionado

- Fotos do Pexels no hero, na seção "Sobre" e na localização, sem pessoas identificáveis no papel
  da médica (D12).
- Wireframe da LPC-3 em `docs/design/` (prompt do Claude Design e imagens) e decisão D16.

### Alterado

- Degradê do hero mais escuro, para manter o menu e os textos acima de 4,5:1 sobre a foto.
- Layout ajustado ao wireframe da LPC-3 (D16): hero em uma coluna, "Sobre" com retrato à esquerda,
  rótulos de seção só no "Sobre", atendimento em quatro colunas, FAQ em duas colunas, "Como
  funciona" em seção clara e cards de localização com o mesmo peso.
- Menu do celular em tela cheia; CTA do header sempre preenchido.
- Banner de cookies com "Recusar" e "Aceitar" no mesmo estilo.
- Formulário: preferência e período lado a lado, erros com ícone, sucesso com foco no título e
  link para o WhatsApp.
- Aviso de emergência do rodapé em caixa com borda; links de texto, botão de menu e links do
  rodapé com área de toque de 44 px no celular.

## [0.2.0] - 2026-10-26

Landing page completa da Dra. Helena Vasconcelos (cliente fictícia), cobrindo as tasks do quadro
LPC que não dependem da publicação.

### Adicionado

- Seções: header fixo com menu acessível (LPC-8), hero (LPC-9), sobre com CRM/RQE (LPC-10),
  especialidades (LPC-11), atendimento (LPC-12), FAQ (LPC-13), como funciona o acompanhamento
  (LPC-14), localização com mapa OpenStreetMap e rodapé completo (LPC-15).
- Conversão: botão flutuante de WhatsApp (LPC-18), formulário de contato com React Hook Form + Zod
  (LPC-16), `POST /api/contato` com Resend, honeypot e limite por IP (LPC-17), bloco de agendamento
  (LPC-19).
- LGPD: política de privacidade, banner de cookies e preferências no rodapé (LPC-24).
- SEO: metadata, Open Graph gerado, ícones da marca (LPC-20), JSON-LD `Physician` e `FAQPage`,
  sitemap e robots (LPC-21).
- Analytics: Vercel Analytics, Speed Insights e GA4 com consentimento, com eventos de conversão
  (LPC-26).
- Design system: componentes de formulário e token de erro (`danger`).
- Documentação: plano de implementação, decisões D1–D15, revisão CFM, Lighthouse, QA pré-deploy e
  rascunho do estudo de caso.

### Alterado

- Conteúdo movido para `src/content` e alinhado ao briefing (LPC-1, LPC-2).
- Site inteiro com `noindex` enquanto for portfólio.

### Removido

- Componentes de depoimento e de avaliação em estrelas (decisão da LPC-2).

### Corrigido

- `cn()` não deixava `max-w-3xl` sobrescrever `max-w-page`, deixando FAQ e política com largura
  total.

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

[Não lançado]: https://github.com/CarlosVuottoDeveloper/mental-health/compare/v0.3.1...HEAD
[0.3.1]: https://github.com/CarlosVuottoDeveloper/mental-health/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/CarlosVuottoDeveloper/mental-health/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/CarlosVuottoDeveloper/mental-health/releases/tag/v0.2.0
[0.1.0]: https://github.com/CarlosVuottoDeveloper/mental-health/releases/tag/v0.1.0
