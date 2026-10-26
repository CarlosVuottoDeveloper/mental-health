import { faqContent } from "@/content/landing";
import {
  faqPageJsonLd,
  physicianJsonLd,
  serializeJsonLd,
} from "./structured-data";

describe("structured data", () => {
  const physician = physicianJsonLd({
    name: "Dra. Helena Vasconcelos",
    url: "https://exemplo.com",
    telephone: "+55-11-90000-0000",
    email: "contato@exemplo.com",
    street: "Rua das Acácias, 250",
    locality: "São Paulo",
    region: "SP",
    description: "Psiquiatria para adultos.",
  });

  it("describes the practice as a Physician without reviews or ratings (LPC-2)", () => {
    expect(physician["@type"]).toBe("Physician");
    expect(physician.medicalSpecialty).toBe("Psychiatric");
    expect(JSON.stringify(physician)).not.toMatch(/Review|Rating/);
  });

  it("includes Saturday morning hours (decision D4)", () => {
    expect(physician.openingHoursSpecification).toContainEqual(
      expect.objectContaining({
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "12:00",
      }),
    );
  });

  it("builds the FAQPage from the FAQ content", () => {
    const faq = faqPageJsonLd(faqContent.categories);
    const total = faqContent.categories.reduce(
      (sum, c) => sum + c.items.length,
      0,
    );

    expect(faq.mainEntity).toHaveLength(total);
    expect(faq.mainEntity[0]).toMatchObject({
      "@type": "Question",
      acceptedAnswer: { "@type": "Answer" },
    });
  });

  it("escapes < so the JSON can't close the script tag", () => {
    expect(serializeJsonLd({ text: "</script><script>" })).not.toContain(
      "</script>",
    );
  });
});
