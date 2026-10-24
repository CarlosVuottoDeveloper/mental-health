import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

const shapes = {
  circle: "aspect-square rounded-pill",
  pill: "aspect-[2/1] rounded-pill",
  rounded: "aspect-[4/5] rounded-lg",
  wide: "aspect-[16/9] rounded-lg",
} as const;

/** Warm photographic stand-ins used until real imagery is available. */
export const placeholders = {
  sage: "radial-gradient(120% 90% at 70% 20%, #c9ccae 0%, #8e936a 45%, #3d3c33 100%)",
  sun: "radial-gradient(110% 90% at 30% 25%, #f3d9a8 0%, #b9744a 45%, #3d2a1e 100%)",
  blush:
    "radial-gradient(100% 90% at 60% 30%, #f1cfc4 0%, #a8796b 50%, #3d3c33 100%)",
  ink: "linear-gradient(135deg, #4e4e45 0%, #1f1e18 100%)",
} as const;

export type MediaShapeProps = Omit<ComponentProps<"div">, "children"> & {
  shape?: keyof typeof shapes;
  src?: string;
  /** Required with `src`; describe the image, or pass "" if purely decorative. */
  alt?: string;
  placeholder?: keyof typeof placeholders;
  /** Content layered over the media (e.g. a logo mark). */
  overlay?: ReactNode;
  sizes?: string;
};

export function MediaShape({
  shape = "circle",
  src,
  alt = "",
  placeholder = "sage",
  overlay,
  sizes = "(min-width: 768px) 25vw, 50vw",
  className,
  style,
  ...props
}: MediaShapeProps) {
  return (
    <div
      data-slot="media-shape"
      className={cn(
        "relative isolate overflow-hidden",
        // Hairline inner ring from the reference photography treatment.
        "after:pointer-events-none after:absolute after:inset-1.5 after:rounded-[inherit] after:border after:border-cream-50/40",
        shapes[shape],
        className,
      )}
      style={
        src ? style : { backgroundImage: placeholders[placeholder], ...style }
      }
      {...props}
    >
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="-z-10 object-cover"
        />
      )}
      {overlay && (
        <div className="absolute inset-0 grid place-items-center">
          {overlay}
        </div>
      )}
    </div>
  );
}
