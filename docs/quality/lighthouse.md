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

## Com as fotos do Pexels (2026-10-28)

As fotos (decisão D12) entraram depois da medição acima. Nova rodada nas mesmas condições, três
execuções simuladas e uma com estrangulamento aplicado:

| Cenário                             | Performance | Acessibilidade | Boas práticas | SEO  | LCP       | CLS |
| ----------------------------------- | ----------- | -------------- | ------------- | ---- | --------- | --- |
| Home, estrangulamento simulado (3×) | **91–92**   | **100**        | **100**       | 69 † | 3,3–3,5 s | 0   |
| Home, estrangulamento aplicado      | **99**      | **100**        | **100**       | 69 † | 1,5 s     | 0   |

† Só a auditoria `is-crawlable` reprova, pelo `noindex` do portfólio (D7).

- **O LCP continua sendo o título do hero**, não a foto: o valor observado no trace é 39 ms (igual
  ao FCP). A alta na estimativa simulada vem de o simulador passar a contar a foto do hero (68 KiB
  no celular) como dependência do LCP, o mesmo efeito descrito na seção anterior.
- **`priority` trocado por `loading="eager"`** na foto do hero: o `priority` está depreciado no
  Next.js 16, e a documentação indica `loading="eager"` quando a imagem está acima da dobra mas não
  é o elemento de LCP. Não houve diferença medida entre os dois.
- **`sizes` do retrato do "Sobre"** corrigido para `min(100vw, 24rem)` no celular, onde ele é
  limitado a 24rem. A auditoria de imagens responsivas ainda aponta 34 KiB, por causa do recorte
  4:5 de uma foto 3:4.
- O `next/image` entrega as fotos em WebP/AVIF; o total transferido na primeira visita é 527 KiB.

## URL publicada (2026-10-28)

Medido em https://dra-helena-vasconcelos.vercel.app, release `v0.3.0`, Lighthouse 12, três execuções mobile e uma desktop:

| Perfil                | Performance | Acessibilidade | Boas práticas | SEO  | FCP   | LCP       | CLS |
| --------------------- | ----------- | -------------- | ------------- | ---- | ----- | --------- | --- |
| Mobile (3×, simulado) | **98**      | **100**        | **100**       | 69 † | 1,7 s | 2,1–2,3 s | 0   |
| Desktop               | **100**     | **100**        | **100**       | 69 † | 0,4 s | 0,8 s     | 0   |

† Só `is-crawlable`, pelo `noindex` (D7).

Os números da URL publicada são melhores que os locais porque a Vercel serve a página pela CDN, já
comprimida e com cache, em vez do `next start` sem compressão. As medições foram feitas bloqueando um
script que o antivírus da máquina de teste injeta nas páginas (detalhes em `qa.md`); sem o bloqueio,
o mesmo site marcou entre 76 e 91.

## Oportunidades restantes

- **JavaScript não usado (~70 KB):** principalmente o formulário (React Hook Form + Zod) e o Radix,
  carregados na primeira visita. Carregar o formulário só quando ele se aproxima da tela reduziria
  esse custo.
- **"Legacy JavaScript":** polyfills (`Array.prototype.at`, `flat`…) dentro do runtime do Next.js,
  fora do controle do projeto.
