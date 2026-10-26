import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Custom font-size tokens must be registered, otherwise tailwind-merge reads
// `text-display-xl` as a color and drops it when merged with `text-foreground`.
const twMerge = extendTailwindMerge({
  extend: {
    // Custom theme values, so `max-w-3xl` overrides `max-w-page` and
    // `px-0` overrides `px-gutter` instead of both classes being kept.
    theme: {
      container: ["page"],
      spacing: ["gutter", "section"],
    },
    classGroups: {
      "font-size": [
        {
          text: [
            "display-2xl",
            "display-xl",
            "display-lg",
            "display-md",
            "display-sm",
            "body-lg",
            "body-md",
            "body-sm",
            "caption",
            "label",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
