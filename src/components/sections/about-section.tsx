import type { ReactNode } from "react";
import {
  Button,
  Container,
  headingVariants,
  LogoMark,
  MediaShape,
  SectionLabel,
  SocialLinks,
  Text,
  type MediaShapeProps,
  type SocialLinksProps,
} from "@/components/ui";

export type AboutSectionProps = {
  id?: string;
  label: string;
  statement: ReactNode;
  /** First-person bio, 2 to 3 paragraphs (LPC-10). */
  paragraphs: string[];
  /**
   * Professional identification and background. CFM requires name, CRM/UF and
   * RQE visible in this section, not only in the footer.
   */
  credentials: { label: string; value: string }[];
  /** Vertical portrait next to the bio. */
  portrait: Pick<MediaShapeProps, "src" | "alt" | "placeholder">;
  socials: SocialLinksProps["links"];
  cta: { label: string; href: string };
  /** Office ambience photos shown below the bio. */
  media: [MediaShapeProps, MediaShapeProps, MediaShapeProps];
};

export function AboutSection({
  id,
  label,
  statement,
  paragraphs,
  credentials,
  portrait,
  socials,
  cta,
  media,
}: AboutSectionProps) {
  const [first, wide, last] = media;

  return (
    <section id={id} className="scroll-mt-20 py-section">
      <Container className="flex flex-col gap-12 md:gap-16">
        {/* Mobile reads label → statement → portrait → bio; from md the portrait
            takes the left column and the text stacks on the right. */}
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-[2fr_3fr] lg:gap-x-16">
          <div className="flex flex-col gap-6 md:col-start-2">
            <SectionLabel as="h2">{label}</SectionLabel>
            <p className={headingVariants({ size: "lg" })}>{statement}</p>
          </div>

          <MediaShape
            shape="rounded"
            // max-w-sm caps it at 24rem below md.
            sizes="(min-width: 768px) 40vw, min(100vw, 24rem)"
            className="w-full self-start max-md:max-w-sm md:sticky md:top-28 md:col-start-1 md:row-span-2 md:row-start-1"
            {...portrait}
          />

          <div className="flex flex-col gap-10 md:col-start-2">
            <div className="flex max-w-[65ch] flex-col gap-4">
              {paragraphs.map((paragraph) => (
                <Text key={paragraph} size="lg">
                  {paragraph}
                </Text>
              ))}
            </div>

            <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {credentials.map((item) => (
                <div key={item.label} className="border-t border-border pt-3">
                  <dt className="text-caption text-foreground-muted">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-body-sm font-medium">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap items-center gap-6 max-md:flex-col-reverse max-md:items-start">
              <Button withArrow asChild>
                <a href={cta.href}>{cta.label}</a>
              </Button>
              <SocialLinks links={socials} highlight={socials[0]?.network} />
            </div>
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
