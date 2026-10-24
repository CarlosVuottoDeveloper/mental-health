import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Centers content at the page width with responsive side gutters. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="container"
      className={cn("mx-auto w-full max-w-page px-gutter", className)}
      {...props}
    />
  );
}
