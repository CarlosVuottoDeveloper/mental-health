import { Container, Heading, SectionLabel, Text } from "@/components/ui";

export type Specialty = { title: string; description: string };

export type SpecialtiesSectionProps = {
  id?: string;
  label: string;
  title: string;
  description: string;
  /** Each item describes how the condition shows up in daily life, not its clinical definition. */
  items: Specialty[];
};

export function SpecialtiesSection({
  id,
  label,
  title,
  description,
  items,
}: SpecialtiesSectionProps) {
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

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-3 rounded-lg bg-surface-sunken p-6 md:p-8"
            >
              <h3 className="font-display text-display-sm text-balance">
                {item.title}
              </h3>
              <Text size="sm" tone="muted">
                {item.description}
              </Text>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
