import type { LucideIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Container,
  Heading,
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

export function FaqSection({ id, title, categories }: FaqSectionProps) {
  const [first] = categories;

  return (
    <section id={id} className="scroll-mt-20 py-section">
      <Container className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
        <Heading size="lg" className="md:sticky md:top-28 md:self-start">
          {title}
        </Heading>

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
