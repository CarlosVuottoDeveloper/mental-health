# LPC-2 — Definir com a cliente o destino da seção de depoimentos

> Fonte: [LPC-2 no Jira](https://kaduvuotto.atlassian.net/browse/LPC-2) · cópia de 2026-10-26.
> Em caso de divergência, a issue no Jira prevalece.

| Campo          | Valor                                      |
| -------------- | ------------------------------------------ |
| Tipo           | Tarefa                                     |
| Status         | Fazendo                                    |
| Prioridade     | Medium                                     |
| Labels         | `descoberta`, `lp-psiquiatria`             |
| Relator        | Kadu Vuotto                                |
| Responsável    | —                                          |
| Criada em      | 2026-09-08                                 |
| Atualizada em  | 2026-09-30                                 |
| Issues citadas | LPC-1 (Briefing), LPC-14 (seção da página) |

## Descrição

A Resolução CFM 2.336/2023 permite depoimentos de pacientes, mas com limites: sóbrios, sem
adjetivos de superioridade, sem induzir promessa de resultado e sem uso reiterado. Em psiquiatria o
depoimento ainda expõe a condição de saúde mental de quem escreve.

**DECISÃO DA CLIENTE:** não usar depoimentos de pacientes.

**Consequência:** a seção correspondente (LPC-14) muda de escopo para "Como funciona o
acompanhamento", com as três etapas do processo, mantendo o mesmo peso visual e a mesma posição na
página.

## Decisão registrada — seção de depoimentos (cliente fictícia Dra. Helena Vasconcelos)

_Comentário de Kadu Vuotto em 2026-09-30._

### 1. Decisão

**Não usar depoimentos de pacientes** em nenhuma parte do site — nem na landing, nem em prints de
avaliações do Google/Doctoralia, nem em redes sociais linkadas no site.

### 2. Justificativa (visão da cliente)

- **Exposição do paciente:** em psiquiatria, um depoimento revela publicamente a condição de saúde
  mental de quem escreve, mesmo com nome abreviado.
- **Risco ético-regulatório:** a Resolução CFM 2.336/2023 permite depoimentos, mas com limites
  (sóbrios, sem superioridade, sem sugerir resultado, sem uso reiterado). O ganho de conversão não
  compensa o risco de interpretação.
- **Coerência com o posicionamento:** o site vende acolhimento e sigilo; exibir relatos de pacientes
  contradiz essa mensagem.

### 3. Consequência no escopo

- A seção de depoimentos vira **"Como funciona o acompanhamento"** (LPC-14), na **mesma posição** e
  com o **mesmo peso visual**.
- A prova de confiança passa a vir da **transparência do processo** e das **credenciais da médica**
  (formação, residência, RQE), não de terceiros.

### 4. Textos base da nova seção (LPC-14)

**Título:** _Como funciona o acompanhamento_

**Subtítulo:** _Cada pessoa tem seu tempo. O tratamento é construído em etapas, sempre com você
participando das decisões._

1. **Primeira consulta** — _Um encontro de cerca de 60 minutos para conhecer sua história, seu
   contexto de vida e o que te trouxe até aqui. Ao final, definimos juntos um plano inicial._
2. **Ajuste inicial** — _Nas primeiras semanas, os retornos são mais próximos para acompanhar como
   você está respondendo ao tratamento e ajustar o que for preciso, incluindo possíveis efeitos
   colaterais._
3. **Acompanhamento** — _Com a estabilidade, os retornos vão ficando mais espaçados, no ritmo que faz
   sentido para você._

**CTA ao final da seção:** _Agendar primeira consulta_ (mesmo link de WhatsApp do hero)

**Regras de copy da seção**

- Sem prazo para "melhora" ou "alta".
- Sem números de pacientes atendidos ou taxa de sucesso.
- Tom acolhedor, pensado para quem nunca consultou psiquiatra.

### 5. Ajustes em outras tasks

- **Briefing (LPC-1):** a lista "Como funciona a consulta" (4 passos) é absorvida por esta seção —
  evitar duas seções parecidas na página. Duração da primeira consulta padronizada em **~60 min**.
- **SEO / dados estruturados:** não usar `Review` nem `AggregateRating` no schema.org; manter só
  `Physician` / `MedicalClinic`.
- **Credenciais como prova de confiança:** garantir que o bloco "Sobre" destaque formação, residência
  e RQE.
- **Layout:** reaproveitar o grid/cards que seriam dos depoimentos, trocando por 3 cards numerados
  (ou timeline horizontal no desktop, vertical no mobile).

---

**Status:** decisão definida e escopo da LPC-14 validado — task pode ser concluída.
