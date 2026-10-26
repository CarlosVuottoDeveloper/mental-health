/**
 * Public configuration read from environment variables, with safe fallbacks
 * for local development and Storybook. NEXT_PUBLIC_* values are inlined by
 * Next.js at build time. See .env.example.
 */
function read(value: string | undefined) {
  return value?.trim() || undefined;
}

export const env = {
  /** Country + area code + number, digits only. Placeholder until LPC-7. */
  whatsappNumber:
    read(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) ?? "5511900000000",
  siteUrl: read(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000",
  /** GA4 is only loaded when this is set and the visitor accepts cookies. */
  gaMeasurementId: read(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
  /** Portfolio default: never indexed (decision D7). */
  indexable: read(process.env.NEXT_PUBLIC_SITE_INDEXABLE) === "true",
} as const;
