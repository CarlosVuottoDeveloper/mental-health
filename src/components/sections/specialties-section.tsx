import { Container, Heading, Text } from "@/components/ui";

export type Specialty = { title: string; description: string };

export type SpecialtiesSectionProps = {
  id?: string;
  title: string;
  description: string;
  /** Each item describes how the condition shows up in daily life, not its clinical definition. */
  items: Specialty[];
};

export function SpecialtiesSection({
  id,
  title,
  description,
  items,
}: SpecialtiesSectionProps) {
  return (
    <section id={id} className="scroll-mt-20 bg-surface-sunken py-section">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <Heading size="lg">{title}</Heading>
          <Text size="lg" tone="muted" className="max-w-[44ch] md:pb-1">
            {description}
          </Text>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-3 rounded-lg bg-background p-6 md:p-8"
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
