import type { ReactNode } from "react";
import { contrastRatio, wcagLevel, type WcagLevel } from "../contrast";
import { radii, resolvePaletteRef, semanticColors, typeScale } from "../tokens";

// Presentational blocks for the MDX style guide. Kept out of the component library on purpose.

type PaletteRef = Parameters<typeof resolvePaletteRef>[0];

export const contrastPairs = [
  {
    label: "Texto principal / fundo",
    fg: "ink-900",
    bg: "cream-50",
    expected: "AAA",
  },
  {
    label: "Texto secundário / fundo",
    fg: "ink-600",
    bg: "cream-50",
    expected: "AA",
  },
  {
    label: "Texto secundário / superfície rebaixada",
    fg: "ink-600",
    bg: "cream-100",
    expected: "AA",
  },
  {
    label: "Trecho atenuado / fundo",
    fg: "ink-500",
    bg: "cream-50",
    expected: "AA grande",
  },
  { label: "Texto / accent", fg: "ink-900", bg: "lime-400", expected: "AAA" },
  {
    label: "Texto invertido / inverse",
    fg: "cream-50",
    bg: "ink-900",
    expected: "AAA",
  },
  {
    label: "Texto secundário invertido / inverse",
    fg: "ink-300",
    bg: "ink-900",
    expected: "AAA",
  },
  {
    label: "Texto / inverse-raised",
    fg: "cream-50",
    bg: "ink-700",
    expected: "AAA",
  },
  {
    label: "Erro / fundo",
    fg: "clay-600",
    bg: "cream-50",
    expected: "AA",
  },
  {
    label: "Cinza da referência (#A9A79C) / fundo",
    fg: "ink-400",
    bg: "cream-50",
    expected: "Falha",
  },
] as const satisfies readonly {
  label: string;
  fg: PaletteRef;
  bg: PaletteRef;
  expected: WcagLevel;
}[];

const cell = "border-b border-border px-3 py-2.5 text-left align-middle";

function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse font-sans text-body-sm text-foreground">
        <thead>
          <tr>
            {head.map((h) => (
              <th
                key={h}
                className={`${cell} text-caption font-medium text-foreground-muted`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function Swatch({ color }: { color: string }) {
  return (
    <span
      className="inline-block size-6 rounded-sm border border-ink-900/10 align-middle"
      style={{ background: color }}
    />
  );
}

export function SemanticColorTable() {
  return (
    <Table head={["", "Token", "Primitiva", "Uso"]}>
      {semanticColors.map((c) => (
        <tr key={c.token}>
          <td className={cell}>
            <Swatch color={resolvePaletteRef(c.value)} />
          </td>
          <td className={cell}>
            <code>{c.token}</code>
          </td>
          <td className={cell}>
            <code>{c.value}</code>
          </td>
          <td className={cell}>{c.usage}</td>
        </tr>
      ))}
    </Table>
  );
}

export function ContrastTable() {
  return (
    <Table head={["Amostra", "Combinação", "Contraste", "WCAG"]}>
      {contrastPairs.map((pair) => {
        const fg = resolvePaletteRef(pair.fg);
        const bg = resolvePaletteRef(pair.bg);
        const ratio = contrastRatio(fg, bg);
        return (
          <tr key={pair.label}>
            <td className={cell}>
              <span
                className="inline-flex h-8 w-14 items-center justify-center rounded-sm border border-ink-900/10 font-display text-display-sm"
                style={{ color: fg, background: bg }}
              >
                Aa
              </span>
            </td>
            <td className={cell}>
              {pair.label}
              <br />
              <code className="text-caption">
                {pair.fg} / {pair.bg}
              </code>
            </td>
            <td className={cell}>{ratio.toFixed(2)}:1</td>
            <td className={cell}>{wcagLevel(ratio)}</td>
          </tr>
        );
      })}
    </Table>
  );
}

// Literal class names so Tailwind can detect them (it can't see `text-${token}`).
const typeClasses: Record<(typeof typeScale)[number]["token"], string> = {
  "display-2xl": "font-display text-display-2xl",
  "display-xl": "font-display text-display-xl",
  "display-lg": "font-display text-display-lg",
  "display-md": "font-display text-display-md",
  "display-sm": "font-display text-display-sm",
  "body-lg": "font-sans text-body-lg",
  "body-md": "font-sans text-body-md",
  "body-sm": "font-sans text-body-sm",
  caption: "font-sans text-caption",
  label: "font-sans text-label font-medium uppercase",
};

export function TypeScaleTable() {
  return (
    <div className="my-6 flex flex-col">
      {typeScale.map((t) => (
        <div
          key={t.token}
          className="grid gap-2 border-b border-border py-5 md:grid-cols-[12rem_1fr] md:items-baseline"
        >
          <div className="font-sans text-caption text-foreground-muted">
            <code>text-{t.token}</code>
            <br />
            {t.size} · {t.lineHeight}
            <br />
            {t.usage}
          </div>
          <p className={`${typeClasses[t.token]} text-foreground`}>
            Cuidar da mente é cuidar de tudo
          </p>
        </div>
      ))}
    </div>
  );
}

export function RadiusScale() {
  return (
    <div className="my-6 flex flex-wrap gap-6 font-sans">
      {Object.entries(radii).map(([name, value]) => (
        <div
          key={name}
          className="flex flex-col items-center gap-2 text-caption text-foreground-muted"
        >
          <div
            className="size-20 border border-border-strong bg-surface-sunken"
            style={{ borderRadius: value }}
          />
          <code>rounded-{name}</code>
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
}

const spacingSteps = [1, 2, 3, 4, 6, 8, 10, 12, 16, 24];

export function SpacingScale() {
  return (
    <div className="my-6 flex flex-col gap-2 font-sans text-caption text-foreground-muted">
      {spacingSteps.map((step) => (
        <div
          key={step}
          className="grid grid-cols-[4rem_4rem_1fr] items-center gap-3"
        >
          <code>{step}</code>
          <span>{step * 4}px</span>
          <span
            className="h-3 rounded-xs bg-accent"
            style={{ width: step * 4 }}
          />
        </div>
      ))}
    </div>
  );
}

export function DoDont({ doo, dont }: { doo: ReactNode; dont: ReactNode }) {
  return (
    <div className="my-6 grid gap-4 font-sans text-body-sm md:grid-cols-2">
      <div className="rounded-lg border-t-4 border-lime-500 bg-surface-sunken p-5">
        <p className="mb-2 font-medium text-foreground">Faça</p>
        <div className="text-foreground-muted">{doo}</div>
      </div>
      <div className="rounded-lg border-t-4 border-ink-900 bg-surface-sunken p-5">
        <p className="mb-2 font-medium text-foreground">Evite</p>
        <div className="text-foreground-muted">{dont}</div>
      </div>
    </div>
  );
}
