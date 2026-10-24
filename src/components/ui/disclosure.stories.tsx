import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CircleHelp, CreditCard, LayoutGrid } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs/tabs";

const meta = {
  title: "Componentes/Tabs e Accordion",
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const questions = [
  {
    q: "Como agendo minha primeira sessão?",
    a: "Escolha um terapeuta, selecione um horário livre e confirme. Você recebe a confirmação por e-mail.",
  },
  {
    q: "As sessões podem ser online?",
    a: "Sim. As sessões online acontecem por vídeo em uma sala segura, e você pode participar de onde estiver.",
  },
  {
    q: "O que eu compartilho é confidencial?",
    a: "Sim. Tudo o que é dito nas sessões é protegido pelo sigilo profissional e pela LGPD.",
  },
];

export const AccordionStory: Story = {
  name: "Accordion",
  parameters: {
    docs: {
      description: {
        story:
          'Itens claros sobre um trilho rebaixado; o item aberto inverte para o fundo escuro e o ícone vira o botão limão. Use `type="single"` + `collapsible` para FAQ.',
      },
    },
  },
  render: () => (
    <Accordion type="single" collapsible defaultValue="1">
      {questions.map((item, i) => (
        <AccordionItem key={item.q} value={String(i)}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

export const TabsStory: Story = {
  name: "Tabs",
  render: () => (
    <Tabs defaultValue="geral">
      <TabsList aria-label="Categorias">
        <TabsTrigger value="geral">
          <CircleHelp aria-hidden />
          Geral
        </TabsTrigger>
        <TabsTrigger value="programas">
          <LayoutGrid aria-hidden />
          Programas
        </TabsTrigger>
        <TabsTrigger value="pagamentos">
          <CreditCard aria-hidden />
          Pagamentos
        </TabsTrigger>
      </TabsList>
      <TabsContent value="geral" className="text-body-sm">
        Perguntas gerais sobre o atendimento.
      </TabsContent>
      <TabsContent value="programas" className="text-body-sm">
        Terapia individual, de casal e programas de atenção plena.
      </TabsContent>
      <TabsContent value="pagamentos" className="text-body-sm">
        Pix, cartão de crédito e boleto.
      </TabsContent>
    </Tabs>
  ),
};
