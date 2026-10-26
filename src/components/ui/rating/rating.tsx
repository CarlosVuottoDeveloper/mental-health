import { Star } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export type RatingProps = ComponentProps<"div"> & {
  value: number;
  max?: number;
};

export function Rating({ value, max = 5, className, ...props }: RatingProps) {
  const rounded = Math.round(value);

  return (
    <div
      data-slot="rating"
      role="img"
      aria-label={`Avaliação: ${value} de ${max}`}
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          strokeWidth={0}
          className={cn(
            "size-4",
            // Empty stars follow the surrounding text color so they work on any surface.
            i < rounded ? "fill-accent" : "fill-current opacity-25",
          )}
        />
      ))}
    </div>
  );
}
