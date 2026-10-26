# Revisão de conteúdo — Resolução CFM nº 2.336/2023 (LPC-23)

Revisão de todo o texto visível da landing page (home) feita em 2026-10-26, sobre o build de
produção. Parte do checklist também roda automaticamente em `src/components/sections/sections.test.tsx`
a cada commit e push.

## Checklist

| Critério                                  | Situação | Onde está / como é verificado                                                                          |
| ----------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| Nome completo, CRM, UF e RQE visíveis     | ✅       | Hero, seção "Sobre" e rodapé. Teste: `shows CRM and RQE in the hero, the about section and the footer` |
| Sem promessa ou garantia de resultado     | ✅       | Revisão manual + teste (`cura`, `garant`)                                                              |
| Sem adjetivos de superioridade            | ✅       | Revisão manual + teste (`o/a melhor`, `referência em`, `nº 1`)                                         |
| Sem sensacionalismo, urgência ou escassez | ✅       | Revisão manual + teste (`últimas vagas`, `vagas limitadas`, `imperdível`…)                             |
| Sem comparação com outros profissionais   | ✅       | Revisão manual + teste (`melhor que`, `diferente dos outros`…)                                         |
| Sem divulgação de preço ou desconto       | ✅       | Teste (`R$`)                                                                                           |
| Sem imagens de antes e depois             | ✅       | Não há fotos de pacientes; teste para o texto (`antes e depois`)                                       |
| Sem depoimentos de pacientes (LPC-2)      | ✅       | Componentes de depoimento e avaliação removidos; teste (`depoimento`, números de pacientes)            |

## Ajustes de copy feitos ao longo do projeto

| Antes                                                            | Depois                                                                                                                             | Motivo                                 |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Seção de depoimentos com avaliação em estrelas                   | "Como funciona o acompanhamento", em 3 etapas                                                                                      | Decisão da LPC-2                       |
| "+100 mil pessoas já começaram" no hero                          | Linha de identificação: nome, especialidade, CRM e RQE                                                                             | Número de pacientes como prova social  |
| "Volte para o que faz você se sentir bem" (bloco de agendamento) | "Cuidar da sua saúde mental começa com uma boa conversa"                                                                           | Sugeria resultado                      |
| "…e escolha o melhor período" (formulário)                       | "…e escolha um período para o retorno"                                                                                             | Evitar qualquer leitura de superlativo |
| FAQ online: "Para a maioria dos casos, sim."                     | "Para a maioria das pessoas, sim. […] Se a avaliação indicar a necessidade de uma consulta presencial, isso é combinado com você." | Afirmação de eficácia sem ressalva     |

## Pontos de atenção para um consultório real

- **"Mais de 10 anos de experiência"** é permitido, desde que seja verdadeiro e comprovável.
- **Contato por WhatsApp entre consultas** (benefícios): confirmar com a profissional os limites do
  que é respondido por mensagem, para não configurar consulta sem avaliação.
- **Fotos:** quando forem incluídas, não usar pacientes nem imagens que sugiram resultado.
