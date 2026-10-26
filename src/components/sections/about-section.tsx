import { Stethoscope } from "lucide-react";
import type { ReactNode } from "react";
import {
  Button,
  Container,
  Heading,
  LogoMark,
  MediaShape,
  SectionLabel,
  SocialLinks,
  type MediaShapeProps,
  type SocialLinksProps,
} from "@/components/ui";

export type AboutSectionProps = {
  id?: string;
  label: string;
  statement: ReactNode;
  /** Name and registration (CRM/UF/RQE): CFM requires them in this section, not only in the footer. */
  credentials: { name: string; detail: string };
  socials: SocialLinksProps["links"];
  cta: { label: string; href: string };
  media: [MediaShapeProps, MediaShapeProps, MediaShapeProps];
};

export function AboutSection({
  id,
  label,
  statement,
  credentials,
  socials,
  cta,
  media,
}: AboutSectionProps) {
  const [first, wide, last] = media;

  return (
    <section id={id} className="scroll-mt-20 py-section">
      <Container className="flex flex-col gap-12 md:gap-16">
        <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-10">
          <SectionLabel>{label}</SectionLabel>
          <Heading size="lg">{statement}</Heading>
        </div>

        <div className="grid items-center gap-8 border-t border-border pt-8 md:grid-cols-[1fr_2fr] md:gap-10">
          <div className="flex items-center gap-4">
            <Stethoscope
              aria-hidden
              className="size-9 shrink-0"
              strokeWidth={1.25}
            />
            <span className="h-10 w-px bg-border-strong" aria-hidden />
            <p className="text-body-sm">
              <span className="block font-medium">{credentials.name}</span>
              <span className="block text-foreground-muted">
                {credentials.detail}
              </span>
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <SocialLinks links={socials} highlight={socials[0]?.network} />
            <Button withArrow asChild>
              <a href={cta.href}>{cta.label}</a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-[1fr_2fr_1fr_1fr]">
          <MediaShape shape="circle" {...first} />
          <MediaShape
            shape="pill"
            className="col-span-2 row-start-2 md:col-span-1 md:row-start-auto"
            {...wide}
          />
          <MediaShape
            shape="circle"
            placeholder="ink"
            overlay={<LogoMark className="size-1/2 text-inverse-foreground" />}
          />
          <MediaShape shape="circle" className="max-md:hidden" {...last} />
        </div>
      </Container>
    </section>
  );
}
