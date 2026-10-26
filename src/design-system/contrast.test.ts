import { contrastRatio, wcagLevel } from "./contrast";
import { contrastPairs } from "./docs/doc-blocks";
import { resolvePaletteRef } from "./tokens";

describe("contrastRatio", () => {
  it("matches the WCAG reference values", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 5);
    expect(contrastRatio("#ffffff", "#ffffff")).toBe(1);
  });

  it("is symmetric", () => {
    expect(contrastRatio("#302f27", "#fffaf0")).toBe(
      contrastRatio("#fffaf0", "#302f27"),
    );
  });
});

describe("documented color pairs", () => {
  it.each(contrastPairs.map((p) => [p.label, p]))(
    "%s meets its documented level",
    (_, pair) => {
      const ratio = contrastRatio(
        resolvePaletteRef(pair.fg),
        resolvePaletteRef(pair.bg),
      );
      expect(wcagLevel(ratio)).toBe(pair.expected);
    },
  );
});
