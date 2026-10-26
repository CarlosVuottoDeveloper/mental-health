import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

// 4×4 pixel mark; echoes the pixel band used in the CTA section.
const MARK = ["1100", "1011", "0110", "0011"];

export function LogoMark({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 4 4"
      aria-hidden
      shapeRendering="crispEdges"
      className={cn("size-5 fill-current", className)}
      {...props}
    >
      {MARK.flatMap((row, y) =>
        [...row].map((cell, x) =>
          cell === "1" ? (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />
          ) : null,
        ),
      )}
    </svg>
  );
}

export type LogoProps = ComponentProps<"span"> & {
  name?: string;
  tone?: "default" | "inverse";
};

export function Logo({
  name = "Mental Health",
  tone = "default",
  className,
  ...props
}: LogoProps) {
  return (
    <span
      data-slot="logo"
      className={cn(
        "inline-flex items-center gap-2 font-display text-display-sm leading-none",
        tone === "default" ? "text-foreground" : "text-inverse-foreground",
        className,
      )}
      {...props}
    >
      <LogoMark className={tone === "inverse" ? "text-accent" : undefined} />
      {name}
    </span>
  );
}
