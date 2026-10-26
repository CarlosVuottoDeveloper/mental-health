import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export const headingVariants = cva("font-display font-normal text-balance", {
  variants: {
    size: {
      "2xl": "text-display-2xl",
      xl: "text-display-xl",
      lg: "text-display-lg",
      md: "text-display-md",
      sm: "text-display-sm",
    },
    tone: {
      default: "text-foreground",
      inverse: "text-inverse-foreground",
    },
  },
  defaultVariants: {
    size: "lg",
    tone: "default",
  },
});

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type HeadingProps = ComponentProps<"h2"> &
  VariantProps<typeof headingVariants> & {
    /** Semantic level — independent from the visual `size`. */
    as?: HeadingLevel;
  };

export function Heading({
  as: Tag = "h2",
  size,
  tone,
  className,
  ...props
}: HeadingProps) {
  return (
    <Tag
      data-slot="heading"
      className={cn(headingVariants({ size, tone }), className)}
      {...props}
    />
  );
}

/**
 * De-emphasised run inside a display heading (e.g. the second half of a statement).
 * Uses `foreground-subtle`, which only meets contrast at display sizes.
 */
export function HeadingMuted({ className, ...props }: ComponentProps<"span">) {
  return (
    <span className={cn("text-foreground-subtle", className)} {...props} />
  );
}

export const textVariants = cva("font-sans text-pretty", {
  variants: {
    size: {
      lg: "text-body-lg",
      md: "text-body-md",
      sm: "text-body-sm",
      caption: "text-caption",
    },
    tone: {
      default: "text-foreground",
      muted: "text-foreground-muted",
      inverse: "text-inverse-foreground",
      "inverse-muted": "text-inverse-muted",
    },
  },
  defaultVariants: {
    size: "md",
    tone: "default",
  },
});

export type TextProps = ComponentProps<"p"> &
  VariantProps<typeof textVariants> & {
    as?: "p" | "span" | "div";
  };

export function Text({
  as: Tag = "p",
  size,
  tone,
  className,
  ...props
}: TextProps) {
  return (
    <Tag
      data-slot="text"
      className={cn(textVariants({ size, tone }), className)}
      {...props}
    />
  );
}
