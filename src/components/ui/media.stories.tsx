import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LogoMark } from "./logo/logo";
import { MediaShape } from "./media-shape/media-shape";
import { PixelBand, pixelPatterns } from "./pixel-band/pixel-band";
import { SocialLinks } from "./social-links/social-links";

const meta = {
  title: "Componentes/Mídia e decoração",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const MediaShapes: Story = {
  name: "MediaShape",
  parameters: {
    docs: {
      description: {
        story:
          "Fotos recortadas em círculo, pílula ou retângulo arredondado, com um filete claro interno. Sem `src`, mostra um gradiente quente como placeholder.",
      },
    },
  },
  render: () => (
    <div className="grid max-w-4xl grid-cols-[1fr_2fr_1fr_1fr] items-center gap-4">
      <MediaShape shape="circle" placeholder="sun" />
      <MediaShape shape="pill" placeholder="sage" />
      <MediaShape
        shape="circle"
        placeholder="ink"
        overlay={<LogoMark className="size-1/2 text-inverse-foreground" />}
      />
      <MediaShape shape="circle" placeholder="blush" />
      <MediaShape shape="rounded" placeholder="blush" className="col-span-1" />
      <MediaShape shape="wide" placeholder="sage" className="col-span-2" />
    </div>
  ),
};

export const PixelBands: Story = {
  name: "PixelBand",
  parameters: {
    docs: {
      description: {
        story:
          "Borda pixelada que dissolve um bloco escuro no fundo creme. É o elemento mais marcante da identidade: use uma vez por página.",
      },
    },
  },
  render: () => (
    <div className="max-w-4xl">
      <PixelBand pattern={pixelPatterns.dissolveIn} />
      <div className="h-24 bg-inverse" />
      <PixelBand pattern={pixelPatterns.dissolveOut} />
    </div>
  ),
};

export const Social: Story = {
  name: "SocialLinks",
  render: () => (
    <SocialLinks
      highlight="facebook"
      links={[
        { network: "facebook", href: "https://facebook.com" },
        { network: "x", href: "https://x.com" },
        { network: "instagram", href: "https://instagram.com" },
        { network: "linkedin", href: "https://linkedin.com" },
      ]}
    />
  ),
};
