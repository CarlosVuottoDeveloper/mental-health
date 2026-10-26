import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MapPin, Video } from "lucide-react";
import { faqContent } from "@/content/landing";
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

const questions = faqContent.categories[0]?.items.slice(0, 3) ?? [];

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
    <Accordion type="single" collapsible defaultValue="0">
      {questions.map((item, i) => (
        <AccordionItem key={item.question} value={String(i)}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

export const TabsStory: Story = {
  name: "Tabs",
  render: () => (
    <Tabs defaultValue="presencial">
      <TabsList aria-label="Formato de atendimento">
        <TabsTrigger value="presencial">
          <MapPin aria-hidden />
          Presencial
        </TabsTrigger>
        <TabsTrigger value="online">
          <Video aria-hidden />
          Online
        </TabsTrigger>
      </TabsList>
      <TabsContent value="presencial" className="text-body-sm">
        Consultório na Vila Mariana, em São Paulo, a 5 minutos do metrô.
      </TabsContent>
      <TabsContent value="online" className="text-body-sm">
        Teleconsulta por vídeo para todo o Brasil, com receitas emitidas por
        assinatura digital.
      </TabsContent>
    </Tabs>
  ),
};
