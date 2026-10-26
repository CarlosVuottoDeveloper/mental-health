import {
  Button,
  Container,
  Heading,
  SectionLabel,
  Text,
} from "@/components/ui";
import { cn } from "@/lib/cn";

export type CareStep = { title: string; description: string };

export type CareStepsSectionProps = {
  id?: string;
  label: string;
  title: string;
  description: string;
  steps: CareStep[];
  cta: { label: string; href: string };
};

/**
 * "Como funciona o acompanhamento" (LPC-14). Replaces the testimonials block
 * (decision in LPC-2) with the same position and visual weight: a dark block
 * whose trust signal is the transparency of the process.
 */
export function CareStepsSection({
  id,
  label,
  title,
  description,
  steps,
  cta,
}: CareStepsSectionProps) {
  return (
    <section id={id} className="scroll-mt-20">
      <Container>
        <div className="flex flex-col gap-12 rounded-xl bg-inverse px-6 py-10 text-inverse-foreground md:px-10 md:py-14">
          <div className="flex max-w-2xl flex-col gap-4">
            <SectionLabel tone="inverse">{label}</SectionLabel>
            <Heading size="lg" tone="inverse">
              {title}
            </Heading>
            <Text size="lg" tone="inverse-muted">
              {description}
            </Text>
          </div>

          {/* Vertical timeline on mobile, horizontal from md up. */}
          <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className={cn(
                  "relative flex gap-5 md:flex-col",
                  "not-last:before:absolute not-last:before:top-11 not-last:before:-bottom-10 not-last:before:left-5.5 not-last:before:w-px not-last:before:bg-inverse-foreground/20",
                  "md:not-last:before:top-5.5 md:not-last:before:right-[-2rem] md:not-last:before:bottom-auto md:not-last:before:left-11 md:not-last:before:h-px md:not-last:before:w-auto",
                )}
              >
                <span
                  aria-hidden
                  className="grid size-11 shrink-0 place-items-center rounded-pill border border-inverse-foreground/25 font-display text-display-sm"
                >
                  {i + 1}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-display-sm">{step.title}</h3>
                  <Text size="sm" tone="inverse-muted">
                    {step.description}
                  </Text>
                </div>
              </li>
            ))}
          </ol>

          <Button variant="accent" withArrow asChild className="self-start">
            <a href={cta.href}>{cta.label}</a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
