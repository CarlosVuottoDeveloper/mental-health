import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export const badgeVariants = cva(
  "inline-flex items-center gap-2 rounded-pill font-sans text-caption font-medium [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** Translucent pill for use over photography. */
        glass:
          "border border-inverse-foreground/20 bg-inverse-foreground/15 text-inverse-foreground backdrop-blur-md",
        soft: "bg-surface-sunken text-foreground",
        accent: "bg-accent text-accent-foreground",
        inverse: "bg-inverse text-inverse-foreground",
      },
      size: {
        sm: "h-6 px-2.5",
        md: "h-8 px-3.5",
      },
    },
    defaultVariants: {
      variant: "soft",
      size: "md",
    },
  },
);

export type BadgeProps = ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}
