# Estudo de caso — Landing page para consultório de psiquiatria

> Projeto conceitual de portfólio, com cliente fictícia (Dra. Helena Vasconcelos). Todos os dados
> profissionais, o endereço e os contatos são inventados.
>
> **Status:** rascunho. Os números da URL publicada entram depois do deploy (LPC-7 e LPC-28).

## O problema

Uma psiquiatra que atende adultos em São Paulo, presencialmente e online, quer uma página que leve
o visitante a agendar a primeira consulta pelo WhatsApp. O público principal são pessoas que nunca
foram a um psiquiatra e chegam com receio. A página precisa acolher sem prometer nada.

Duas restrições tornam o projeto diferente de uma landing page comum:

- **Publicidade médica (Resolução CFM nº 2.336/2023):** sem promessa de resultado, sem
  superlativos, sem preços, sem antes e depois, com nome, CRM e RQE sempre visíveis.
- **Dado sensível (LGPD, art. 11):** procurar um psiquiatra já revela informação de saúde. O que o
  site coleta, e como, precisa ser mínimo.

## Decisões que definiram o projeto

**Nada de depoimentos (LPC-2).** A resolução permite depoimentos com limites, mas, em psiquiatria,
um relato expõe a saúde mental de quem escreve, e o site vende sigilo. A seção de depoimentos virou
"Como funciona o acompanhamento", em três etapas, na mesma posição e com o mesmo peso visual. A
confiança passou a vir da transparência do processo e das credenciais da médica. Os componentes de
depoimento e de avaliação em estrelas saíram do design system, para não serem reaproveitados por
engano.

**Um formulário que não pergunta o motivo (LPC-16).** Nome, e-mail, telefone, presencial ou online
e um período para retorno. Nenhum campo de sintomas, histórico ou texto livre. O texto explica por
quê: "essa conversa fica para o atendimento".

**Prova social trocada por identificação.** O layout de referência tinha "+100 mil pessoas" com
avatares no hero. No lugar, entrou a linha com nome, especialidade, CRM e RQE, que a CFM exige e
que comunica confiança de forma legítima.

**Privacidade como padrão.** O GA4 só carrega depois do aceite de cookies, e recusar é tão fácil
quanto aceitar. O mapa usa OpenStreetMap em vez do Google Maps, que grava cookies antes de qualquer
consentimento.

**Conflitos entre tasks resolvidos e registrados.** O quadro tinha 28 tasks com divergências (duas
paletas, dois títulos de hero, durações de consulta diferentes). Cada uma virou uma decisão
numerada, com justificativa, em `docs/discovery/decisoes-do-projeto.md` (D1 a D16).

## Design

O design system nasceu de uma referência visual: creme quente, oliva-carvão, sálvia e um verde-limão
usado só na ação mais importante de cada área. A tipografia combina uma serifada condensada
(Instrument Serif) com Inter. A borda pixelada do bloco de agendamento é o único gesto geométrico e
aparece uma vez na página.

Tudo está documentado no Storybook: tokens com contraste verificado em teste, styleguide (cores,
tipografia, layout, movimento, voz e conteúdo) e cada componente com seus estados.

A estrutura da página veio de um wireframe de baixa fidelidade, mobile-first, gerado no Claude
Design a partir de um prompt com a ordem das seções, os textos reais, as restrições da CFM e oito
anotações de comportamento (`docs/design/`). O site seguiu o wireframe com três desvios
deliberados: manteve os textos já revisados, não pôs ícones nos diagnósticos e preservou a borda
pixelada da marca (D16). As fotos são do Pexels, sem nenhuma pessoa identificável no papel da
médica (D12).

## Engenharia

- **Next.js 16** com App Router e Cache Components; a página é pré-renderizada como estática.
- **Conteúdo separado dos componentes** (`src/content`): trocar um texto não exige mexer em código
  de interface.
- **Formulário** com React Hook Form e Zod, usando o mesmo schema no navegador e no servidor. O
  endpoint tem honeypot, tempo mínimo de preenchimento, limite por IP, chave do serviço de e-mail só
  no servidor e nenhum log com dados pessoais.
- **SEO:** metadata, imagem de Open Graph gerada com a fonte da marca, JSON-LD `Physician` e
  `FAQPage`, sitemap e robots. O site sai com `noindex` enquanto for portfólio.
- **Conversões:** um único ouvinte de cliques registra WhatsApp, telefone e rota, identificando
  qual CTA converteu, sem enviar dado pessoal.
- **Processo:** Gitflow, uma branch por task do Jira, hooks de lint e testes, 143 testes
  automatizados, incluindo uma checagem do texto contra as regras da CFM.

## Resultados (medição local, pré-deploy)

| Métrica                                  | Resultado                                                                             |
| ---------------------------------------- | ------------------------------------------------------------------------------------- |
| Lighthouse mobile                        | Performance 92, Acessibilidade 100, Boas práticas 100, SEO 100 (com indexação ligada) |
| Performance com estrangulamento aplicado | 99 (LCP 1,5 s)                                                                        |
| Acessibilidade (axe, WCAG 2.2 AA)        | 0 violações                                                                           |
| Testes automatizados                     | 143                                                                                   |

_A completar após o deploy: Lighthouse na URL publicada e QA em dispositivos reais._

## O que eu faria diferente num projeto real

- Fotografia própria do consultório e da profissional, em vez de fotos de banco de imagens.
- Validação jurídica da política de privacidade e revisão da copy com a profissional.
- Um limite de envios por IP compartilhado entre instâncias (por exemplo, Redis), se o tráfego
  justificar.
