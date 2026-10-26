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
  id?: string;
  label: string;
  title: string;
  /** With a single category the tabs are omitted and the questions render as one list. */
  categories: FaqCategory[];
};

function FaqAccordion({ category }: { category: FaqCategory }) {
  return (
    <Accordion type="single" collapsible defaultValue={`${category.id}-0`}>
      {category.items.map((item, i) => (
        <AccordionItem key={item.question} value={`${category.id}-${i}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function FaqSection({ id, label, title, categories }: FaqSectionProps) {
  const [first] = categories;

  return (
    <section id={id} className="scroll-mt-20 py-section">
      <Container className="flex max-w-3xl flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionLabel>{label}</SectionLabel>
          <Heading size="lg">{title}</Heading>
        </div>

        {categories.length === 1 && first ? (
          <div className="w-full">
            <FaqAccordion category={first} />
          </div>
        ) : (
          <Tabs defaultValue={first?.id} className="w-full">
            <TabsList aria-label="Categorias de perguntas">
              {categories.map(({ id, label: categoryLabel, icon: Icon }) => (
                <TabsTrigger key={id} value={id}>
                  {Icon && <Icon aria-hidden strokeWidth={1.75} />}
                  {categoryLabel}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <FaqAccordion category={category} />
              </TabsContent>
            ))}
          </Tabs>
        )}
      </Container>
    </section>
  );
}
