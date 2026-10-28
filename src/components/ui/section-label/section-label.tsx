import { ChevronsRight } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export type SectionLabelProps = ComponentProps<"p"> & {
  tone?: "default" | "inverse";
  /** Use `h2` when the label is the section's heading and the large text below is a statement. */
  as?: "p" | "h2";
};

/** Small marker that names the section a heading belongs to (• Sobre nós »). */
export function SectionLabel({
  tone = "default",
  as: Tag = "p",
  className,
  children,
  ...props
}: SectionLabelProps) {
  return (
    <Tag
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
    </Tag>
  );
}
