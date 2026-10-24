import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";

const meta = {
  title: "Componentes/Button",
  component: Button,
  args: { children: "Agendar sessão" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["accent", "primary", "secondary", "soft", "link"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Ações em caixa alta, formato pílula. Use **accent** para a ação mais importante da tela (no máximo uma por área visível), **primary** para ações neutras sobre fundo claro e **secondary** como segunda ação sobre fundo escuro. `withArrow` indica navegação para outro lugar.",
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = { args: { variant: "accent", withArrow: true } };

export const Primary: Story = { args: { variant: "primary", withArrow: true } };

export const Secondary: Story = {
  args: {
    variant: "secondary",
    withArrow: true,
    children: "Falar com a equipe",
  },
  globals: { backgrounds: { value: "inverse" } },
};

export const Soft: Story = { args: { variant: "soft" } };

export const Link: Story = {
  args: { variant: "link", children: "Fale conosco" },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="sm" />
      <Button {...args} size="md" />
      <Button {...args} size="lg" />
    </div>
  ),
  args: { variant: "primary", withArrow: true },
};

export const AsLink: Story = {
  name: "Como link (asChild)",
  render: (args) => (
    <Button {...args} asChild>
      <a href="#agendar">Agendar sessão</a>
    </Button>
  ),
  args: { variant: "accent", withArrow: true },
};

export const Disabled: Story = { args: { variant: "primary", disabled: true } };
