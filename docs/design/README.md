# Design

Wireframe de baixa fidelidade da LPC-3, gerado no Claude Design a partir do
[prompt](prompt-wireframe-claude-design.md). O layout do site segue esse wireframe, com os desvios
registrados na decisão D16 ([`docs/discovery/decisoes-do-projeto.md`](../discovery/decisoes-do-projeto.md)).

| Arquivo                                                        | Conteúdo                                                      |
| -------------------------------------------------------------- | ------------------------------------------------------------- |
| [`celular-390.png`](wireframe/celular-390.png)                 | Página inteira no celular (frame principal, mobile-first)     |
| [`tablet-768.png`](wireframe/tablet-768.png)                   | Página inteira no tablet                                      |
| [`desktop-1440.png`](wireframe/desktop-1440.png)               | Página inteira no desktop                                     |
| [`estados.png`](wireframe/estados.png)                         | Menu aberto, banner de cookies, header sólido, erro e sucesso |
| [`anotacoes-e-legenda.png`](wireframe/anotacoes-e-legenda.png) | As 8 anotações de comportamento e a legenda das convenções    |

A identidade visual (cores, tipografia, componentes) não vem do wireframe: está no design system,
documentado no Storybook (`npm run storybook`).
