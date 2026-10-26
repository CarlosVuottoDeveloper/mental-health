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

## Pendente para depois do deploy (LPC-7)

- [ ] Chrome, Safari (desktop e iOS), Firefox e Edge.
- [ ] iPhone e Android reais, não só emulador.
- [ ] Leitor de tela (VoiceOver e TalkBack) no menu, no acordeão e no formulário.
- [ ] WhatsApp abrindo o app com a mensagem pré-preenchida, no celular.
- [ ] Envio real do formulário com o Resend configurado.
- [ ] Lighthouse na URL publicada.
