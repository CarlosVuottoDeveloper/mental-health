import type { FaqSectionProps } from "@/components/sections";

type PhysicianInput = {
  name: string;
  url: string;
  telephone: string;
  email: string;
  street: string;
  locality: string;
  region: string;
  description: string;
};

/**
 * schema.org Physician for the practice (LPC-21). No Review or
 * AggregateRating: the client decided against testimonials (LPC-2).
 */
export function physicianJsonLd(input: PhysicianInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: input.name,
    description: input.description,
    url: input.url,
    telephone: input.telephone,
    email: input.email,
    medicalSpecialty: "Psychiatric",
    isAcceptingNewPatients: true,
    address: {
      "@type": "PostalAddress",
      streetAddress: input.street,
      addressLocality: input.locality,
      addressRegion: input.region,
      addressCountry: "BR",
    },
    areaServed: [
      { "@type": "City", name: "São Paulo" },
      { "@type": "Country", name: "Brasil" },
    ],
    // Decision D4: weekdays in person and online, Saturday mornings online.
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "12:00",
      },
    ],
  };
}

export function faqPageJsonLd(categories: FaqSectionProps["categories"]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: categories.flatMap((category) =>
      category.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    ),
  };
}

/** Serializes JSON-LD safe for inline <script>: escapes "<" so content can't close the tag. */
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
