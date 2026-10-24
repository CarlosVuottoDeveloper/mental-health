import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Sparkle } from "lucide-react";
import { placeholders } from "../media-shape/media-shape";
import { Badge } from "./badge";

const meta = {
  title: "Componentes/Badge",
  component: Badge,
  args: { children: "Novo programa" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["glass", "soft", "accent", "inverse"],
    },
    size: { control: "inline-radio", options: ["sm", "md"] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Soft: Story = {};

export const Accent: Story = { args: { variant: "accent" } };

export const Inverse: Story = { args: { variant: "inverse" } };

export const GlassOverPhoto: Story = {
  name: "Glass (sobre foto)",
  args: { variant: "glass" },
  render: (args) => (
    <div
      className="grid h-40 w-80 place-items-center rounded-lg"
      style={{ backgroundImage: placeholders.sage }}
    >
      <Badge {...args}>
        <Sparkle aria-hidden className="text-accent" />
        Cuidado com a sua mente
      </Badge>
    </div>
  ),
};
