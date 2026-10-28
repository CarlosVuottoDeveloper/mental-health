import type { LucideIcon } from "lucide-react";
import { Container, Heading, Text } from "@/components/ui";

export type Benefit = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type BenefitsSectionProps = {
  id?: string;
  title: string;
  /** Focused on how care works, never on promised results (LPC-12). */
  items: Benefit[];
};

export function BenefitsSection({ id, title, items }: BenefitsSectionProps) {
  return (
    <section id={id} className="scroll-mt-20 py-section">
      <Container className="flex flex-col gap-12">
        <Heading size="lg">{title}</Heading>

        {/* List on mobile, 2 × 2 on tablet, one row of four on desktop. */}
        <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title: itemTitle, description }) => (
            <li
              key={itemTitle}
              className="flex gap-4 border-t border-border py-6 sm:flex-col"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-pill bg-surface-sunken">
                <Icon aria-hidden className="size-5" strokeWidth={1.5} />
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-body-lg font-medium text-balance">
                  {itemTitle}
                </h3>
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
