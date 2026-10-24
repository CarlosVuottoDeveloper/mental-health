import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArrowLeft, ArrowRight, Menu, Plus } from "lucide-react";
import { IconButton } from "./icon-button";

const meta = {
  title: "Componentes/IconButton",
  component: IconButton,
  args: { label: "Adicionar", children: <Plus /> },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "soft", "accent", "ghost", "inverse-outline"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Botão circular só com ícone. `label` é obrigatório: vira o nome acessível lido por leitores de tela.",
      },
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Soft: Story = {};

export const Primary: Story = {
  args: { variant: "primary", label: "Abrir menu", children: <Menu /> },
};

export const Accent: Story = { args: { variant: "accent" } };

export const CarouselOnDark: Story = {
  name: "Navegação sobre fundo escuro",
  render: () => (
    <div className="flex gap-2">
      <IconButton label="Anterior" variant="inverse-outline" size="sm">
        <ArrowLeft />
      </IconButton>
      <IconButton label="Próximo" variant="inverse-outline" size="sm">
        <ArrowRight />
      </IconButton>
    </div>
  ),
  globals: { backgrounds: { value: "inverse" } },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <IconButton {...args} size="sm" />
      <IconButton {...args} size="md" />
      <IconButton {...args} size="lg" />
    </div>
  ),
};
