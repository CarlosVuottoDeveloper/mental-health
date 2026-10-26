import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Checkbox, ChoiceGroup, Field, Input } from "./form";

const meta = {
  title: "Componentes/Formulário",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Campos acessíveis: rótulo associado, erro ligado por `aria-describedby` e `aria-invalid`. Use com `react-hook-form` espalhando `register()` no controle.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex max-w-md flex-col gap-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputStates: Story = {
  name: "Input",
  render: () => (
    <>
      <Field id="nome" label="Nome">
        <Input id="nome" placeholder="Seu nome" />
      </Field>
      <Field
        id="email"
        label="E-mail"
        error="Informe um e-mail válido, como nome@exemplo.com."
      >
        <Input
          id="email"
          defaultValue="ana@"
          error="Informe um e-mail válido, como nome@exemplo.com."
        />
      </Field>
      <Field id="telefone" label="Telefone com DDD">
        <Input id="telefone" disabled defaultValue="(11) 91234-5678" />
      </Field>
    </>
  ),
};

export const Choice: Story = {
  name: "ChoiceGroup",
  render: () => (
    <>
      <ChoiceGroup
        id="preferencia"
        name="preferencia"
        legend="Preferência de atendimento"
        options={[
          { value: "presencial", label: "Presencial" },
          { value: "online", label: "Online" },
        ]}
        defaultChecked={false}
      />
      <ChoiceGroup
        id="periodo"
        name="periodo"
        legend="Melhor período para retorno"
        options={[
          { value: "manha", label: "Manhã" },
          { value: "tarde", label: "Tarde" },
          { value: "noite", label: "Noite" },
        ]}
        error="Escolha o melhor período para retorno."
      />
    </>
  ),
};

export const CheckboxStates: Story = {
  name: "Checkbox",
  render: () => (
    <>
      <Checkbox id="aceite">Concordo com a política de privacidade.</Checkbox>
      <Checkbox
        id="aceite-erro"
        error="Para enviarmos o seu contato, é preciso concordar com a política de privacidade."
      >
        Concordo com a política de privacidade.
      </Checkbox>
    </>
  ),
};
