import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { palette, radii, resolvePaletteRef, semanticColors } from "./tokens";

const css = readFileSync(resolve(__dirname, "../styles/tokens.css"), "utf8");

function cssVar(name: string) {
  const match = css.match(new RegExp(`--${name}:\\s*([^;]+);`));
  return match?.[1].trim();
}

describe("design tokens", () => {
  it.each(
    Object.entries(palette).flatMap(([scale, steps]) =>
      Object.entries(steps).map(([step, hex]) => [`${scale}-${step}`, hex]),
    ),
  )("palette color %s matches tokens.css", (name, hex) => {
    expect(cssVar(`color-${name}`)).toBe(hex);
  });

  it.each(semanticColors.map((c) => [c.token, c.value]))(
    "semantic color %s points to %s",
    (token, value) => {
      expect(cssVar(`color-${token}`)).toBe(`var(--color-${value})`);
    },
  );

  it.each(Object.entries(radii))(
    "radius %s matches tokens.css",
    (name, value) => {
      expect(cssVar(`radius-${name}`)).toBe(value);
    },
  );

  it("resolves palette references to hex values", () => {
    expect(resolvePaletteRef("lime-400")).toBe("#c6f038");
  });
});
