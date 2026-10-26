import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AvatarGroup, Avatar } from "./avatar/avatar";
import { Logo, LogoMark } from "./logo/logo";
import { SectionLabel } from "./section-label/section-label";

const meta = {
  title: "Componentes/Identidade e apoio",
  parameters: {
    docs: {
      description: {
        component:
          "Peças pequenas usadas em várias seções: marca, avatares e rótulo de seção.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const LogoStory: Story = {
  name: "Logo",
  render: () => (
    <div className="flex flex-col items-start gap-6">
      <Logo />
      <div className="rounded-lg bg-inverse p-4">
        <Logo tone="inverse" />
      </div>
      <LogoMark className="size-16" />
    </div>
  ),
};

const people = [
  { name: "Ana Souza" },
  { name: "Bruno Lima" },
  { name: "Carla Dias" },
  { name: "Diego Alves" },
];

export const Avatars: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Para identificar profissionais e equipe. Nunca use para exibir pacientes ou contagem de pacientes como prova social (decisão da LPC-2 e Resolução CFM 2.336/2023).",
      },
    },
  },
  render: () => (
    <div className="flex flex-col items-start gap-6">
      <div className="flex items-center gap-3">
        <Avatar name="Ana Souza" size="sm" />
        <Avatar name="Ana Souza" size="md" />
        <Avatar name="Ana Souza" size="lg" />
      </div>
      <AvatarGroup people={people} />
    </div>
  ),
};

export const SectionLabelStory: Story = {
  name: "SectionLabel",
  render: () => <SectionLabel>Sobre a Dra. Helena</SectionLabel>,
};
