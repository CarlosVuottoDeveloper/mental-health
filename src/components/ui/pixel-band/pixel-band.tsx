import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** "1" = filled cell, "0" = empty. Every row must have the same length. */
export type PixelPattern = readonly string[];

export const pixelPatterns = {
  /** Ragged edge where a dark block starts (top of the CTA). */
  dissolveIn: [
    "010110001101000111011001",
    "101111110101111101110111",
    "111011111111111111111011",
  ],
  /** Ragged edge where a dark block ends (bottom of the CTA). */
  dissolveOut: [
    "110111111101111111111110",
    "101011100110111011011101",
    "010010100100110010001010",
  ],
} as const satisfies Record<string, PixelPattern>;

export type PixelBandProps = Omit<ComponentProps<"div">, "children"> & {
  pattern: PixelPattern;
};

/** Decorative pixel grid that dissolves a solid `inverse` block into the page. */
export function PixelBand({
  pattern,
  className,
  style,
  ...props
}: PixelBandProps) {
  const columns = pattern[0]?.length ?? 0;

  return (
    <div
      data-slot="pixel-band"
      aria-hidden
      className={cn("grid w-full", className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        ...style,
      }}
      {...props}
    >
      {pattern.flatMap((row, y) =>
        [...row].map((cell, x) => (
          <span
            key={`${x}-${y}`}
            className={cn("aspect-square", cell === "1" && "bg-inverse")}
          />
        )),
      )}
    </div>
  );
}
