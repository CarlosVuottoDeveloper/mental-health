# Decisões do projeto

Registro das divergências encontradas entre as tasks do quadro Landing Page Consultório (LPC) e de
como cada uma foi resolvida. Critério geral: **o projeto é um case de portfólio**, então cada
decisão precisa ser defensável, documentada e verificável no código.

Decidido em 2026-10-26. Origem das divergências: `docs/planning/plano-de-implementacao.md`.

## D1 — Paleta e tipografia

**Decisão:** manter o design system implementado a partir de `docs/references/example.webp`
(creme, oliva-carvão, sálvia e limão; Instrument Serif + Inter) e registrá-lo como a entrega da
LPC-4.

**Por quê:**

- Atende à intenção do briefing (LPC-1): off-white quente, tons terrosos e verde-sálvia, "calma, não
  clínica fria". Os hex da LPC-4 eram uma proposta inicial; a tipografia segue a mesma regra
  (serifada nos títulos + Inter no corpo, que é uma das sugestões da task).
- Contraste verificado em teste: o CTA limão com texto oliva tem 10,2:1 (AAA). O acento sugerido na
  LPC-4 (`#5C8577`) com texto branco tem 4,1:1 e não passa no AA para texto de botão.
- Identidade mais marcante para portfólio, sem perder a calma: o limão é restrito a uma ação por
  área visível (regra do styleguide).

**Consequência:** a LPC-4 é entregue como design system em código e Storybook (tokens, styleguide,
estados e contraste AA). Os layouts por breakpoint são documentados nas stories de página.

## D2 — Versão do Next.js

**Decisão:** manter o Next.js 16. A LPC-5 pedia o 15, que era a versão atual quando a task foi
escrita.

**Por quê:** versão estável mais recente, sem custo de migração, e com o App Router pedido na task.

## D3 — Duração das consultas

**Decisão:** primeira consulta de **cerca de 60 minutos**; retornos de **50 minutos**.

**Por quê:** a LPC-2 padronizou a primeira consulta em ~60 min, e a LPC-12, mais recente que o
briefing, define os retornos em 50 min. Os valores do briefing (60–75 e ~40 min) ficam superados.

## D4 — Horário de atendimento

**Decisão:** segunda a sexta, das 8h às 19h; sábado, das 8h às 12h, **somente online**.

**Por quê:** é a informação completa do briefing (LPC-1). A LPC-19 só resumiu o horário de semana;
omitir o sábado esconderia uma opção útil para quem trabalha durante a semana.

## D5 — Mensagem pré-preenchida do WhatsApp

**Decisão:** "Olá, vim pelo site e gostaria de agendar uma primeira consulta com a Dra. Helena."

**Por quê:** junta as duas versões. "Vim pelo site" (LPC-1) permite à clínica saber a origem do
contato; "primeira consulta" (LPC-18) deixa a intenção clara.

## D6 — Título do hero

**Decisão:** usar o título da LPC-9, "Acompanhamento psiquiátrico para quem está pronto para pedir
ajuda". O título do briefing, "Cuidar da sua saúde mental começa com uma boa conversa", foi
reaproveitado no bloco de agendamento.

**Por quê:** a LPC-9 é a task de implementação e diz que a copy foi aprovada; reaproveitar a frase do
briefing evita perder um texto bom.

## D7 — Dados estruturados e indexação

**Decisão:** JSON-LD com `Physician` (o tipo do schema.org para médico e consultório, citado nas
duas tasks) e `FAQPage`, sem `Review` nem `AggregateRating`. O site inteiro sai com `noindex`
enquanto for portfólio.

**Por quê:** os dados estruturados demonstram a competência técnica no case, e o `noindex` evita que
uma clínica fictícia apareça nas buscas ou concorra com profissionais reais (alerta das LPC-21 e
LPC-25).

## D8 — Respostas do FAQ

**Decisão:** as respostas das 5 perguntas sem texto no briefing foram escritas no projeto e
aprovadas, depois de passar pelo checklist da CFM (LPC-23). Estão em `src/content/landing.tsx`.

**Por quê:** a cliente é fictícia, então não há validação externa possível; o checklist garante que
as respostas não prometem resultado nem prazo.

## D9 — Seção "Presencial ou online"

**Decisão:** incorporada à LPC-15 (localização), como dois cards lado a lado: presencial (endereço,
metrô, horários) e online (teleconsulta, receita digital, sábado de manhã).

**Por quê:** evita uma seção a mais com conteúdo que se sobrepõe ao de localização, e mantém a ordem
de seções da LPC-3.

## D10 — Montagem da página

**Decisão:** a página real (`src/app/page.tsx`) passa a montar as seções já prontas, e o mesmo
componente `LandingPage` é usado no Storybook.

**Por quê:** cada deploy de preview mostra o progresso real do site, que é o que interessa num
portfólio; e o Storybook deixa de manter uma cópia da composição.

## D11 — Vercel por último

**Decisão:** a integração com a Vercel (LPC-7) e o domínio (LPC-25) ficam para a última fase. Até
lá, o site é construído e validado localmente. As variáveis de ambiente da LPC-18 (número do
WhatsApp) e da LPC-17 (chave do Resend) usam `.env.local`, com um `.env.example` versionado. O QA
(LPC-27) e o handoff (LPC-28) acontecem depois do deploy.

**Por quê:** pedido do usuário em 2026-10-26. Nenhuma task de código depende da Vercel além das
variáveis de ambiente, que funcionam localmente; e o QA em iPhone e Android reais pede uma URL
publicada.
