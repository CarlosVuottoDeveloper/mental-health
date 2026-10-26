import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export const iconButtonVariants = cva(
  [
    "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-pill",
    "transition-colors duration-(--duration-fast) ease-soft",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
        soft: "bg-surface-sunken text-foreground hover:bg-border",
        accent: "bg-accent text-accent-foreground hover:bg-accent-hover",
        ghost: "text-foreground hover:bg-surface-sunken",
        "inverse-outline":
          "border border-inverse-foreground/25 text-inverse-foreground hover:bg-inverse-foreground/10 focus-visible:outline-ring-inverse",
      },
      size: {
        sm: "size-7 [&_svg]:size-3.5",
        md: "size-10 [&_svg]:size-4",
        lg: "size-12 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "soft",
      size: "md",
    },
  },
);

export type IconButtonProps = Omit<ComponentProps<"button">, "aria-label"> &
  VariantProps<typeof iconButtonVariants> & {
    /** Accessible name — icon-only controls must always have one. */
    label: string;
    asChild?: boolean;
  };

export function IconButton({
  className,
  variant,
  size,
  label,
  asChild = false,
  ...props
}: IconButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="icon-button"
      aria-label={label}
      className={cn(iconButtonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
