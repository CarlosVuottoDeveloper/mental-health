import { Sparkle } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import {
  Badge,
  Button,
  Container,
  Heading,
  placeholders,
  Text,
} from "@/components/ui";
import { cn } from "@/lib/cn";

export type HeroProps = {
  badge: string;
  title: ReactNode;
  description: string;
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /**
   * Professional identification (name · specialty · CRM · RQE), required by
   * CFM 2.336/2023. Replaces patient counts or other social proof.
   */
  credentials: string;
  image?: { src: string; alt: string };
  /** Rendered at the top of the hero, over the image (usually `SiteHeader tone="inverse"`). */
  header?: ReactNode;
  id?: string;
  className?: string;
};

export function Hero({
  badge,
  title,
  description,
  cta,
  secondaryCta,
  credentials,
  image,
  header,
  id,
  className,
}: HeroProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate flex min-h-[min(100svh,52rem)] flex-col overflow-hidden bg-inverse text-inverse-foreground",
        className,
      )}
      style={image ? undefined : { backgroundImage: placeholders.sage }}
    >
      {image && (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          // Above the fold but not the LCP element (the h1 is), so no <head> preload
          // competing with the display font.
          loading="eager"
          sizes="100vw"
          className="-z-20 object-cover"
        />
      )}
      {/* Scrim keeps text legible over any photograph. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950/85 via-ink-950/50 to-ink-950/65"
      />

      {header}

      <Container className="mt-auto flex flex-col gap-10 pt-24 pb-10">
        <div className="flex flex-col gap-6">
          <Badge variant="glass" className="self-start">
            <Sparkle aria-hidden className="text-accent" />
            {badge}
          </Badge>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Heading as="h1" size="2xl" tone="inverse" className="max-w-[22ch]">
              {title}
            </Heading>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 lg:shrink-0">
              <Button variant="accent" withArrow asChild>
                <a href={cta.href}>{cta.label}</a>
              </Button>
              {secondaryCta && (
                <Button
                  variant="link"
                  asChild
                  className="focus-visible:outline-ring-inverse"
                >
                  <a href={secondaryCta.href}>{secondaryCta.label}</a>
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Text size="caption" tone="inverse" className="uppercase">
            {credentials}
          </Text>
          <Text size="sm" tone="inverse" className="max-w-[46ch] opacity-90">
            {description}
          </Text>
        </div>
      </Container>
    </section>
  );
}
