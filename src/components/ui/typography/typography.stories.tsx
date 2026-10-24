import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Heading, HeadingMuted, Text } from "./typography";

const meta = {
  title: "Componentes/Typography",
  component: Heading,
  args: {
    children: "Comece sua jornada para mais calma",
    size: "lg",
    as: "h2",
  },
  argTypes: {
    size: { control: "inline-radio", options: ["2xl", "xl", "lg", "md", "sm"] },
    tone: { control: "inline-radio", options: ["default", "inverse"] },
    as: { control: "select", options: ["h1", "h2", "h3", "h4", "h5", "h6"] },
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "`Heading` usa a serifada de display; o nível semântico (`as`) é independente do tamanho visual (`size`). `Text` cobre o texto corrido em Inter.",
      },
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeadingStory: Story = { name: "Heading" };

export const Statement: Story = {
  name: "Heading com trecho atenuado",
  args: {
    size: "lg",
    className: "max-w-3xl",
    children: (
      <>
        Um caminho mais leve para o bem-estar, com acompanhamento personalizado,{" "}
        <HeadingMuted>
          práticas de atenção plena e hábitos simples que duram.
        </HeadingMuted>
      </>
    ),
  },
};

export const TextScale: Story = {
  name: "Text",
  render: () => (
    <div className="flex max-w-xl flex-col gap-4">
      <Text size="lg">
        Body lg — parágrafos de destaque logo abaixo de títulos.
      </Text>
      <Text size="md">
        Body md — texto corrido padrão para descrições e conteúdo longo.
      </Text>
      <Text size="sm" tone="muted">
        Body sm muted — informações de apoio, itens de FAQ e rodapé.
      </Text>
      <Text size="caption" tone="muted">
        Caption — legendas e metadados.
      </Text>
    </div>
  ),
};
