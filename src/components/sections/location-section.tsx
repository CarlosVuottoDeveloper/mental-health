import { ArrowUpRight, MapPin, Video } from "lucide-react";
import {
  Button,
  Container,
  Heading,
  MediaShape,
  SectionLabel,
  Text,
  type MediaShapeProps,
} from "@/components/ui";

export type LocationSectionProps = {
  id?: string;
  label: string;
  title: string;
  description: string;
  inPerson: {
    title: string;
    address: string[];
    details: string[];
    directions: { label: string; href: string };
  };
  online: { title: string; details: string[] };
  map: { src: string; title: string; caption: string };
  facade: Pick<MediaShapeProps, "src" | "alt" | "placeholder">;
};

/**
 * Location (LPC-15) with the "Presencial ou online" cards from the briefing
 * (decision D9). The map is an OpenStreetMap embed, which sets no cookies
 * before consent (decision D13), and loads lazily to protect LCP.
 */
export function LocationSection({
  id,
  label,
  title,
  description,
  inPerson,
  online,
  map,
  facade,
}: LocationSectionProps) {
  return (
    <section id={id} className="scroll-mt-20 py-section">
      <Container className="flex flex-col gap-12">
        <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-10">
          <SectionLabel>{label}</SectionLabel>
          <div className="flex flex-col gap-4">
            <Heading size="lg">{title}</Heading>
            <Text size="lg" tone="muted" className="max-w-[55ch]">
              {description}
            </Text>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="flex flex-col gap-6 rounded-xl bg-surface-sunken p-6 md:p-8">
            <MapPin aria-hidden className="size-6" strokeWidth={1.5} />
            <div className="flex flex-col gap-3">
              <h3 className="font-display text-display-md">{inPerson.title}</h3>
              <address className="text-body-md not-italic">
                {inPerson.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
            <ul className="flex flex-col gap-2 text-body-sm text-foreground-muted">
              {inPerson.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
            <Button variant="link" asChild className="mt-auto self-start">
              <a
                href={inPerson.directions.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {inPerson.directions.label}
                <ArrowUpRight aria-hidden />
              </a>
            </Button>
          </article>

          <article className="flex flex-col gap-6 rounded-xl bg-inverse p-6 text-inverse-foreground md:p-8">
            <Video aria-hidden className="size-6" strokeWidth={1.5} />
            <h3 className="font-display text-display-md">{online.title}</h3>
            <ul className="flex flex-col gap-2 text-body-sm text-inverse-muted">
              {online.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
          <figure className="flex flex-col gap-2">
            <iframe
              src={map.src}
              title={map.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="aspect-[16/10] w-full rounded-lg border border-border bg-surface-sunken"
            />
            <figcaption className="text-caption text-foreground-muted">
              {map.caption}
            </figcaption>
          </figure>
          <MediaShape
            shape="rounded"
            sizes="(min-width: 768px) 33vw, 100vw"
            className="w-full max-md:aspect-[4/3]"
            {...facade}
          />
        </div>
      </Container>
    </section>
  );
}
