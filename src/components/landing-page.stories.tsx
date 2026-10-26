import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LandingPage } from "./landing-page";

const meta = {
  title: "Páginas/Landing page",
  component: LandingPage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A página real (`src/app/page.tsx`) com as seções já implementadas, na ordem da LPC-3. As fotos são placeholders em gradiente até a chegada das imagens.",
      },
    },
  },
} satisfies Meta<typeof LandingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};

export const Mobile: Story = {
  globals: { viewport: { value: "mobile2", isRotated: false } },
};
