import type { LucideIcon } from "lucide-react";
import { Container, Heading, SectionLabel, Text } from "@/components/ui";

export type Benefit = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type BenefitsSectionProps = {
  id?: string;
  label: string;
  title: string;
  /** Focused on how care works, never on promised results (LPC-12). */
  items: Benefit[];
};

export function BenefitsSection({
  id,
  label,
  title,
  items,
}: BenefitsSectionProps) {
  return (
    <section id={id} className="scroll-mt-20 py-section">
      <Container className="grid gap-10 md:grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-4">
          <SectionLabel>{label}</SectionLabel>
          <Heading size="lg">{title}</Heading>
        </div>

        <ul className="grid gap-x-10 sm:grid-cols-2">
          {items.map(({ icon: Icon, title: itemTitle, description }) => (
            <li
              key={itemTitle}
              className="flex gap-4 border-t border-border py-6"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-pill bg-surface-sunken">
                <Icon aria-hidden className="size-5" strokeWidth={1.5} />
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-body-lg font-medium">{itemTitle}</h3>
                <Text size="sm" tone="muted">
                  {description}
                </Text>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
