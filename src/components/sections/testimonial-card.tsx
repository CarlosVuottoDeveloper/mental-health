"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import {
  IconButton,
  MediaShape,
  Rating,
  Text,
  type MediaShapeProps,
} from "@/components/ui";
import { cn } from "@/lib/cn";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating: number;
  media?: Pick<MediaShapeProps, "src" | "alt" | "placeholder">;
};

export type TestimonialCardProps = {
  testimonials: Testimonial[];
  className?: string;
};

export function TestimonialCard({
  testimonials,
  className,
}: TestimonialCardProps) {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const current = testimonials[index];

  if (!current) return null;

  const go = (step: number) => setIndex((i) => (i + step + total) % total);

  return (
    <figure
      aria-roledescription="carrossel"
      aria-label="Depoimentos"
      className={cn(
        "grid gap-6 rounded-xl bg-inverse p-6 text-inverse-foreground md:grid-cols-[1fr_auto] md:p-8",
        className,
      )}
    >
      <div className="flex flex-col justify-between gap-10">
        <div aria-live="polite" className="flex flex-col gap-5">
          <Rating value={current.rating} className="text-inverse-foreground" />
          <blockquote className="font-display text-display-md text-balance">
            “{current.quote}”
          </blockquote>
        </div>

        <div className="flex items-end justify-between gap-4">
          <figcaption>
            <Text size="sm" tone="inverse" className="font-medium">
              {current.name}
            </Text>
            <Text size="caption" tone="inverse-muted">
              {current.role}
            </Text>
          </figcaption>
          {total > 1 && (
            <div className="flex gap-2">
              <IconButton
                label="Depoimento anterior"
                variant="inverse-outline"
                size="sm"
                onClick={() => go(-1)}
              >
                <ArrowLeft />
              </IconButton>
              <IconButton
                label="Próximo depoimento"
                variant="inverse-outline"
                size="sm"
                onClick={() => go(1)}
              >
                <ArrowRight />
              </IconButton>
            </div>
          )}
        </div>
      </div>

      <MediaShape
        shape="rounded"
        placeholder="blush"
        {...current.media}
        className="w-full max-md:aspect-[4/3] md:w-64"
        sizes="(min-width: 768px) 16rem, 100vw"
      />
    </figure>
  );
}
