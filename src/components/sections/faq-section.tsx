import type { LucideIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Container,
  Heading,
  SectionLabel,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";

export type FaqCategory = {
  id: string;
  label: string;
  icon?: LucideIcon;
  items: { question: string; answer: string }[];
};

export type FaqSectionProps = {
  label: string;
  title: string;
  categories: FaqCategory[];
};

export function FaqSection({ label, title, categories }: FaqSectionProps) {
  return (
    <section className="py-section">
      <Container className="flex max-w-3xl flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionLabel>{label}</SectionLabel>
          <Heading size="lg">{title}</Heading>
        </div>

        <Tabs defaultValue={categories[0]?.id} className="w-full">
          <TabsList aria-label="Categorias de perguntas">
            {categories.map(({ id, label: categoryLabel, icon: Icon }) => (
              <TabsTrigger key={id} value={id}>
                {Icon && <Icon aria-hidden strokeWidth={1.75} />}
                {categoryLabel}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map(({ id, items }) => (
            <TabsContent key={id} value={id}>
              <Accordion type="single" collapsible defaultValue={`${id}-1`}>
                {items.map((item, i) => (
                  <AccordionItem key={item.question} value={`${id}-${i}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </section>
  );
}
