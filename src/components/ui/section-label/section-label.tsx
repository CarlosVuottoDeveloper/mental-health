import { ChevronsRight } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export type SectionLabelProps = ComponentProps<"p"> & {
  tone?: "default" | "inverse";
};

/** Small marker that names the section a heading belongs to (• Sobre nós »). */
export function SectionLabel({
  tone = "default",
  className,
  children,
  ...props
}: SectionLabelProps) {
  return (
    <p
      data-slot="section-label"
      className={cn(
        "inline-flex items-center gap-2 text-caption font-medium",
        tone === "default" ? "text-foreground" : "text-inverse-foreground",
        className,
      )}
      {...props}
    >
      <span aria-hidden className="size-1.5 rounded-pill bg-current" />
      {children}
      <ChevronsRight
        aria-hidden
        className="size-3.5 opacity-60"
        strokeWidth={1.5}
      />
    </p>
  );
}
