# QA e acessibilidade (LPC-27)

## Rodada pré-deploy — 2026-10-26

Feita sobre o build de produção local, no Chrome (Playwright).

### Acessibilidade automatizada (axe-core, WCAG 2.0/2.1/2.2 A e AA)

Todas as respostas do FAQ foram abertas antes da varredura, para que o conteúdo escondido também
fosse verificado.

| Página                  | Largura | Violações | Regras aprovadas |
| ----------------------- | ------- | --------- | ---------------- |
| Home                    | 1280px  | 0         | 33               |
| Home                    | 390px   | 0         | 33               |
| Política de privacidade | 390px   | 0         | 23               |

Os componentes também passam pelo addon de acessibilidade do Storybook, configurado para falhar
quando encontra violações.

### Teclado

- Ordem de tabulação: pular para o conteúdo → logo → navegação → CTA do header → CTAs do hero → Sobre.
  Todos os itens mostram foco visível.
- Menu mobile: Tab fica preso no menu aberto; Esc fecha e devolve o foco ao botão (teste
  automatizado e verificação no navegador).
- Acordeão do FAQ: abre e fecha com Enter e Espaço.
- Formulário: no envio inválido, o foco vai para o primeiro campo com erro, e cada erro é lido junto
  com o campo (`aria-describedby`).

### Outros itens do checklist

| Item                               | Situação                                                                            |
| ---------------------------------- | ----------------------------------------------------------------------------------- |
| Contraste AA em textos e botões    | ✅ Pares documentados e verificados em teste (`contrast.test.ts`)                   |
| Um único `h1`                      | ✅ Teste em `page.test.tsx` e `sections.test.tsx`                                   |
| `prefers-reduced-motion`           | ✅ Transições zeradas e scroll suave desligado                                      |
| Alt text                           | ✅ Placeholders decorativos com `alt` vazio; retrato e fachada com `alt` descritivo |
| Botão flutuante não cobre o rodapé | ✅ Some sobre o hero e o rodapé (verificado no navegador)                           |
| Formulário de ponta a ponta        | ✅ Validação, envio e confirmação (modo de demonstração, D14)                       |

### Observação

O banner de cookies fica no fim do documento, então quem navega por teclado só chega nele depois de
percorrer a página. Ele não bloqueia nada (o site funciona sem resposta), mas vale avaliar movê-lo
para o início da ordem de foco se testes com leitor de tela apontarem dificuldade.

## Rodada na URL publicada — 2026-10-28

Feita em https://dra-helena-vasconcelos.vercel.app, release `v0.3.0`, no Chrome (Playwright e Lighthouse 12).

| Verificação                                | Resultado                                                           |
| ------------------------------------------ | ------------------------------------------------------------------- |
| axe, home a 390 e 1280 px (FAQ aberto)     | ✅ 0 violações, em quatro rodadas                                   |
| axe, política de privacidade a 390 px      | ✅ 0 violações                                                      |
| Páginas, robots, sitemap, ícones, OG image | ✅ 200; robots bloqueia `/api/`                                     |
| `noindex` e canonical                      | ✅ `noindex, nofollow`; canonical para o domínio de produção        |
| Formulário (`POST /api/contato`)           | ✅ 200 em modo demonstração (D14)                                   |
| Vercel Analytics e Speed Insights          | ✅ Scripts carregados; Speed Insights já recebendo dados            |
| Lighthouse                                 | ✅ mobile 98 / 100 / 100, desktop 100 / 100 / 100 (`lighthouse.md`) |

### Observação: script injetado pelo antivírus

Na máquina usada para os testes, um antivírus que inspeciona HTTPS injeta um script de 152 KiB
(`/<GUID>/main.js`) em toda página aberta no Chrome. Ele não vem da Vercel (o mesmo caminho retorna
404 pelo servidor), mas bloqueia a renderização e derrubou o desempenho para 76–91 nas primeiras
medições. As medições válidas foram feitas bloqueando essas URLs. Uma axe com 1 violação também
apareceu uma vez, medida durante a animação do acordeão; com espera após abrir as respostas, 0.

## Pendente (testes manuais)

- [ ] Chrome, Safari (desktop e iOS), Firefox e Edge.
- [ ] iPhone e Android reais, não só emulador.
- [ ] Leitor de tela (VoiceOver e TalkBack) no menu, no acordeão e no formulário.
- [ ] WhatsApp abrindo o app com a mensagem pré-preenchida, no celular.
- [x] Lighthouse na URL publicada.
- Envio real com o Resend: não se aplica ao portfólio, que usa o modo de demonstração (D14).
