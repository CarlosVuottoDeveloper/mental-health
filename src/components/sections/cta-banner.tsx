import {
  Button,
  Container,
  Heading,
  PixelBand,
  pixelPatterns,
  Text,
} from "@/components/ui";

export type CtaBannerProps = {
  id?: string;
  title: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Short supporting line under the buttons (e.g. opening hours). */
  note?: string;
};

export function CtaBanner({
  id,
  title,
  primary,
  secondary,
  note,
}: CtaBannerProps) {
  return (
    <section id={id} className="scroll-mt-20 py-section">
      <Container>
        <PixelBand pattern={pixelPatterns.dissolveIn} />
        <div className="flex flex-col items-center gap-8 bg-inverse px-6 py-16 text-center md:py-24">
          <Heading size="lg" tone="inverse" className="max-w-[20ch]">
            {title}
          </Heading>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="accent" withArrow asChild>
              <a href={primary.href}>{primary.label}</a>
            </Button>
            {secondary && (
              <Button variant="secondary" withArrow asChild>
                <a href={secondary.href}>{secondary.label}</a>
              </Button>
            )}
          </div>
          {note && (
            <Text size="sm" tone="inverse-muted" className="max-w-[48ch]">
              {note}
            </Text>
          )}
        </div>
        <PixelBand pattern={pixelPatterns.dissolveOut} />
      </Container>
    </section>
  );
}
