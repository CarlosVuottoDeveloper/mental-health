import {
  Button,
  Container,
  Heading,
  PixelBand,
  pixelPatterns,
} from "@/components/ui";

export type CtaBannerProps = {
  title: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function CtaBanner({ title, primary, secondary }: CtaBannerProps) {
  return (
    <section className="py-section">
      <Container>
        <PixelBand pattern={pixelPatterns.dissolveIn} />
        <div className="flex flex-col items-center gap-8 bg-inverse px-6 py-16 text-center md:py-24">
          <Heading size="lg" tone="inverse" className="max-w-[18ch]">
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
        </div>
        <PixelBand pattern={pixelPatterns.dissolveOut} />
      </Container>
    </section>
  );
}
