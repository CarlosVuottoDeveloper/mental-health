# Lighthouse (LPC-22)

Meta: **≥ 90 nas quatro categorias, em mobile**. Medido em 2026-10-26 com Lighthouse 12, perfil
mobile padrão (Moto G Power, 4G lento, CPU 4×), sobre o build de produção (`next build` +
`next start`) rodando localmente.

## Resultados

| Cenário                                 | Performance | Acessibilidade | Boas práticas | SEO     | LCP   |
| --------------------------------------- | ----------- | -------------- | ------------- | ------- | ----- |
| Antes (home)                            | 93          | 100            | 100           | 66 \*   | 3,2 s |
| Depois (home, estrangulamento simulado) | **95**      | **100**        | **100**       | 66 \*   | 2,9 s |
| Depois (home, estrangulamento aplicado) | **100**     | **100**        | **100**       | 66 \*   | 0,8 s |
| Depois (home, indexação ligada)         | **95**      | **100**        | **100**       | **100** | 2,9 s |
| Depois (política, indexação ligada)     | **96**      | **100**        | **100**       | **100** | —     |

\* O SEO de 66 é proposital: a única auditoria reprovada é `is-crawlable`, causada pelo `noindex`
do portfólio (decisão D7). Com `NEXT_PUBLIC_SITE_INDEXABLE=true`, como num lançamento real, o SEO é 100.

## O que foi feito

- **Fonte itálica removida:** a Instrument Serif carregava as variantes normal e itálica, e a itálica
  não é usada. O arquivo a menos deixou de competir com a fonte do título (LCP 3,2 s → 2,9 s).
- **Já atendido pelas tasks anteriores:** `next/font` com subset latin e `display: swap`; `priority`
  apenas na imagem do hero; iframe do mapa com `loading="lazy"`; CLS 0; scripts da Vercel só em
  deploys da Vercel (sem 404 no console); GA4 só após consentimento.

## Testado e descartado

- **`experimental.inlineCss`:** embutir o CSS no HTML não mudou o LCP (2,9 s nos dois casos). Como a
  opção é experimental e não trouxe ganho medido, ficou de fora.

## Sobre o LCP de 2,9 s na simulação

O elemento de LCP é o título do hero, pintado junto com a primeira pintura (FCP = LCP = 52 ms no
navegador sem estrangulamento). Em `localhost`, os scripts terminam de baixar antes dessa pintura, e
o modelo simulado do Lighthouse passa a tratá-los como dependências do LCP, embora sejam assíncronos.
Com estrangulamento aplicado de verdade (`--throttling-method=devtools`), o LCP é 0,8 s. O número
definitivo deve ser medido na URL publicada (LPC-28).

## Oportunidades restantes

- **JavaScript não usado (~70 KB):** principalmente o formulário (React Hook Form + Zod) e o Radix,
  carregados na primeira visita. Carregar o formulário só quando ele se aproxima da tela reduziria
  esse custo.
- **"Legacy JavaScript":** polyfills (`Array.prototype.at`, `flat`…) dentro do runtime do Next.js,
  fora do controle do projeto.
