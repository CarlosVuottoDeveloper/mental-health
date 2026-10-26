/**
 * Design tokens as data, for documentation and runtime use (e.g. charts, canvas).
 * The CSS source of truth is src/styles/tokens.css — tokens.test.ts keeps both in sync.
 */

export const palette = {
  cream: {
    50: "#fffaf0",
    100: "#f6f1e7",
    200: "#e7e1d8",
    300: "#d6cfc2",
  },
  ink: {
    300: "#c8c6bc",
    400: "#a9a79c",
    500: "#86847a",
    600: "#6b6a60",
    700: "#4e4e45",
    800: "#3d3c33",
    900: "#302f27",
    950: "#1f1e18",
  },
  lime: {
    300: "#ddf77e",
    400: "#c6f038",
    500: "#add61f",
    600: "#8aae0f",
  },
  sage: {
    300: "#c9ccae",
    400: "#acb086",
    500: "#8e936a",
    600: "#5d6147",
  },
  clay: {
    600: "#a23b2a",
  },
} as const;

type PaletteRef = {
  [
    Scale in keyof typeof palette
  ]: `${Scale}-${keyof (typeof palette)[Scale] & number}`;
}[keyof typeof palette];

export type SemanticColor = {
  token: string;
  value: PaletteRef;
  usage: string;
};

export const semanticColors = [
  { token: "background", value: "cream-50", usage: "Fundo da página" },
  {
    token: "surface",
    value: "cream-50",
    usage: "Cartões e itens sobre o fundo",
  },
  {
    token: "surface-sunken",
    value: "cream-100",
    usage: "Áreas rebaixadas: trilho das abas, grupo do FAQ, botões suaves",
  },
  { token: "border", value: "cream-200", usage: "Divisores e contornos sutis" },
  {
    token: "border-strong",
    value: "cream-300",
    usage: "Contornos com mais presença",
  },
  { token: "foreground", value: "ink-900", usage: "Texto principal e títulos" },
  {
    token: "foreground-muted",
    value: "ink-600",
    usage: "Texto secundário (AA em qualquer tamanho)",
  },
  {
    token: "foreground-subtle",
    value: "ink-500",
    usage: "Trechos atenuados em títulos — apenas tamanhos ≥ 24px",
  },
  {
    token: "inverse",
    value: "ink-900",
    usage: "Fundo de seções e cartões escuros",
  },
  {
    token: "inverse-raised",
    value: "ink-700",
    usage: "Elementos elevados sobre fundo escuro",
  },
  {
    token: "inverse-foreground",
    value: "cream-50",
    usage: "Texto sobre fundo escuro",
  },
  {
    token: "inverse-muted",
    value: "ink-300",
    usage: "Texto secundário sobre fundo escuro",
  },
  {
    token: "primary",
    value: "ink-900",
    usage: "Ação primária neutra, aba ativa",
  },
  { token: "primary-hover", value: "ink-800", usage: "Hover da ação primária" },
  {
    token: "primary-foreground",
    value: "cream-50",
    usage: "Texto sobre primary",
  },
  {
    token: "accent",
    value: "lime-400",
    usage: "Ação de maior destaque (uma por tela)",
  },
  { token: "accent-hover", value: "lime-300", usage: "Hover do accent" },
  { token: "accent-foreground", value: "ink-900", usage: "Texto sobre accent" },
  { token: "ring", value: "ink-900", usage: "Foco visível sobre fundo claro" },
  {
    token: "ring-inverse",
    value: "lime-400",
    usage: "Foco visível sobre fundo escuro",
  },
  {
    token: "danger",
    value: "clay-600",
    usage: "Mensagens e bordas de erro em formulários",
  },
] as const satisfies readonly SemanticColor[];

export function resolvePaletteRef(ref: PaletteRef): string {
  const [scale, step] = ref.split("-") as [keyof typeof palette, string];
  return (palette[scale] as Record<string, string>)[step];
}

export const typeScale = [
  {
    token: "display-2xl",
    family: "display",
    size: "48–88px",
    lineHeight: "0.95",
    usage: "Título do hero",
  },
  {
    token: "display-xl",
    family: "display",
    size: "40–64px",
    lineHeight: "1",
    usage: "Títulos de seção de impacto",
  },
  {
    token: "display-lg",
    family: "display",
    size: "32–48px",
    lineHeight: "1.05",
    usage: "Títulos de seção",
  },
  {
    token: "display-md",
    family: "display",
    size: "28–36px",
    lineHeight: "1.1",
    usage: "Subtítulos, citações",
  },
  {
    token: "display-sm",
    family: "display",
    size: "24px",
    lineHeight: "1.2",
    usage: "Títulos de cartão",
  },
  {
    token: "body-lg",
    family: "sans",
    size: "18px",
    lineHeight: "1.6",
    usage: "Parágrafos de destaque",
  },
  {
    token: "body-md",
    family: "sans",
    size: "16px",
    lineHeight: "1.6",
    usage: "Texto corrido padrão",
  },
  {
    token: "body-sm",
    family: "sans",
    size: "14px",
    lineHeight: "1.5",
    usage: "Itens de FAQ, rodapé",
  },
  {
    token: "caption",
    family: "sans",
    size: "12px",
    lineHeight: "1.4",
    usage: "Legendas e metadados",
  },
  {
    token: "label",
    family: "sans",
    size: "13px",
    lineHeight: "1",
    usage: "Botões e navegação (caixa alta)",
  },
] as const;

export const radii = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
  "2xl": "2rem",
  pill: "9999px",
} as const;

export const motion = {
  ease: { soft: "cubic-bezier(0.22, 1, 0.36, 1)" },
  duration: { fast: "150ms", base: "250ms" },
} as const;
