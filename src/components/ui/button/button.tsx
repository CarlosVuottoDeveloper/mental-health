import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import { Slot } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export const buttonVariants = cva(
  [
    "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-pill font-sans font-medium whitespace-nowrap uppercase",
    "transition-colors duration-(--duration-fast) ease-soft",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        accent: "bg-accent text-accent-foreground hover:bg-accent-hover",
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary:
          "bg-inverse-raised text-inverse-foreground hover:bg-ink-600 focus-visible:outline-ring-inverse",
        soft: "bg-surface-sunken text-foreground hover:bg-border",
        link: "rounded-none px-0 underline decoration-1 underline-offset-[6px] hover:decoration-2",
      },
      size: {
        sm: "h-9 px-4 text-caption",
        md: "h-11 px-5 text-label",
        lg: "h-13 px-7 text-label",
      },
    },
    compoundVariants: [{ variant: "link", className: "h-auto px-0" }],
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** Render the child element (e.g. a Next.js `Link`) with button styles. */
    asChild?: boolean;
    /** Append the trailing arrow used on navigational CTAs. */
    withArrow?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  withArrow = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  const classes = cn(buttonVariants({ variant, size }), className);

  // Slot requires exactly one child (or a Slottable), so the arrow-less branch
  // must not leave a stray `false` next to `children`.
  if (!withArrow) {
    return (
      <Comp data-slot="button" className={classes} {...props}>
        {children}
      </Comp>
    );
  }

  return (
    <Comp data-slot="button" className={classes} {...props}>
      <Slot.Slottable>{children}</Slot.Slottable>
      <ArrowRight aria-hidden strokeWidth={2} />
    </Comp>
  );
}
