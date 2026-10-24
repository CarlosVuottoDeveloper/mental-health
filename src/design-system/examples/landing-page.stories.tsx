import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LandingPageExample } from "./landing-page";

const meta = {
  title: "Páginas/Landing page",
  component: LandingPageExample,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Composição de referência com todas as seções na ordem recomendada. As fotos são placeholders em gradiente até a chegada das imagens reais.",
      },
    },
  },
} satisfies Meta<typeof LandingPageExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};

export const Mobile: Story = {
  globals: { viewport: { value: "mobile2", isRotated: false } },
};
