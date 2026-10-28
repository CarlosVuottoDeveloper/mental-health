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

## D12 — Fotos

**Decisão:** fotos do **Pexels** (licença livre, sem exigência de crédito), sem nenhuma pessoa
identificável representando a Dra. Helena. O retrato do "Sobre" mostra o consultório (poltrona,
janela e plantas), e a única foto com pessoa é um detalhe de mão anotando num caderno, sem rosto. O
hero usa uma sala com parede de plantas, que conversa com a paleta sálvia, e a fachada é um prédio
de São Paulo. Os créditos ficam no README.

**Por quê:**

- Apresentar o modelo de uma foto de banco como psiquiatra, num contexto de saúde mental, cria uma
  associação falsa com uma pessoa real, e a licença do Pexels não permite sugerir que as pessoas das
  fotos endossam o serviço.
- Também ficaram de fora cenas de "paciente em sofrimento" (mão na cabeça, choro), comuns nos
  bancos de imagem: reforçam estigma e contrariam o tom da página.
- Com a foto no hero, o degradê sobre a imagem ficou mais escuro para manter todos os textos acima
  de 4,5:1 de contraste, medido sobre os pixels mais claros atrás de cada texto.

## D13 — Mapa sem cookies de terceiros

**Decisão:** o mapa da seção de localização usa o embed do **OpenStreetMap**, carregado com
`loading="lazy"`, em vez do embed do Google Maps. O link "Como chegar" continua abrindo o Google
Maps. Como o endereço é fictício, o mapa mostra a região da estação Ana Rosa, e a legenda diz isso.

**Por quê:** o embed do Google Maps grava cookies de terceiros assim que carrega, antes de qualquer
consentimento, o que contraria a LPC-24 e a LGPD. O OpenStreetMap não grava cookies. O link para o
Google Maps só é acionado por um clique da pessoa, quando ela já está saindo do site.

## D14 — Formulário na versão de demonstração

**Decisão:** sem a chave do Resend, o envio é simulado em desenvolvimento e falha em produção (o
visitante vê o erro e o atalho para o WhatsApp). A variável `CONTACT_SIMULATE=true` liga um modo de
demonstração explícito em produção: o servidor valida tudo (schema, honeypot, tempo mínimo, limite
por IP) e confirma sem enviar e-mail.

**Por quê:** num consultório real, um formulário que finge enviar seria uma falha grave; por isso o
padrão é falhar de forma visível. Já no portfólio publicado, sem conta de e-mail, o fluxo completo
precisa ser demonstrável. O modo é opt-in e documentado no `.env.example`.

## D15 — Analytics e consentimento

**Decisão:** o Vercel Analytics e o Speed Insights carregam sem pedir consentimento, só em deploys
da Vercel. O GA4 só carrega depois do aceite e se `NEXT_PUBLIC_GA_MEASUREMENT_ID` estiver definido;
se a pessoa recusar depois, o GA é desligado e os cookies `_ga` são apagados. Os eventos de
conversão (WhatsApp, telefone, "Como chegar" e envio do formulário) vêm de um único ouvinte de
cliques, com a origem tirada do `data-cta` ou da seção do link.

**Por quê:** as ferramentas da Vercel não usam cookies nem identificam a pessoa, o que a política
de privacidade explica; o GA4 usa cookies e por isso depende do aceite (LPC-24). O ouvinte único
evita espalhar código de rastreamento pelos componentes e garante que nenhum dado pessoal entra nos
eventos.

## D16 — Layout a partir do wireframe da LPC-3

**Decisão:** o layout segue o wireframe de baixa fidelidade gerado no Claude Design a partir do
prompt em `docs/design/prompt-wireframe-claude-design.md`. Mudou a estrutura, não a identidade
visual (D1):

- Hero em uma coluna, na ordem de leitura: selo, título, descrição, CTAs e identificação
  profissional.
- "Sobre" com o retrato à esquerda; o rótulo "Sobre a Dra. Helena" passa a ser o h2 da seção e a
  frase grande, um parágrafo de destaque.
- Rótulos de seção só no "Sobre"; nas demais, o título já diz o que a seção é.
- Atendimento em quatro colunas, FAQ em duas colunas, cards "Presencial" e "Online" com o mesmo
  peso, e faixas de fundo em Especialidades e Localização.
- "Como funciona o acompanhamento" deixa de ser um bloco escuro: o escuro fica só na faixa de
  agendamento, a ação principal da página.
- Menu do celular em tela cheia, CTA do header sempre preenchido, botões do banner de cookies com o
  mesmo estilo, erros de formulário com ícone e texto, sucesso com foco no título e link para o
  WhatsApp, aviso de emergência em caixa com borda e áreas de toque de 44 px.

**Onde o site não segue o wireframe, e por quê:**

- **Textos:** o wireframe reescreveu parte da copy e usa marcadores como `[instituição]`. O site
  mantém os textos revisados contra a CFM (LPC-23).
- **Ícones nas especialidades:** o wireframe desenha um ícone em cada card. Ícone para diagnóstico
  psiquiátrico tende a ser reducionista ou estigmatizante; os cards ficam só com texto.
- **Faixa pixelada** do bloco de agendamento mantida: é o único gesto gráfico da marca (D1) e não
  aparece num wireframe em escala de cinza.
