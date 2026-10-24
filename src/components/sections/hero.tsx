import { Sparkle } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import {
  AvatarGroup,
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
  socialProof: { label: ReactNode; people: { name: string; src?: string }[] };
  image?: { src: string; alt: string };
  /** Rendered at the top of the hero, over the image (usually `SiteHeader tone="inverse"`). */
  header?: ReactNode;
  className?: string;
};

export function Hero({
  badge,
  title,
  description,
  cta,
  socialProof,
  image,
  header,
  className,
}: HeroProps) {
  return (
    <section
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
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
      )}
      {/* Scrim keeps text legible over any photograph. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950/70 via-ink-950/20 to-ink-950/30"
      />

      {header}

      <Container className="mt-auto flex flex-col gap-10 pt-24 pb-10">
        <div className="flex flex-col gap-6">
          <Badge variant="glass" className="self-start">
            <Sparkle aria-hidden className="text-accent" />
            {badge}
          </Badge>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Heading as="h1" size="2xl" tone="inverse" className="max-w-[20ch]">
              {title}
            </Heading>
            <Button
              variant="accent"
              withArrow
              asChild
              className="self-start lg:self-auto"
            >
              <a href={cta.href}>{cta.label}</a>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-3">
            <AvatarGroup
              people={socialProof.people}
              size="md"
              ringClassName="ring-ink-900"
            />
            <Text as="span" size="caption" tone="inverse" className="uppercase">
              {socialProof.label}
            </Text>
          </div>
          <Text size="sm" tone="inverse" className="max-w-[46ch] opacity-90">
            {description}
          </Text>
        </div>
      </Container>
    </section>
  );
}
