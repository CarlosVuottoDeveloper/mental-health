import { z } from "zod";

/*
 * Contact form schema (LPC-16), shared by the form and the Route Handler
 * (LPC-17). Health data is sensitive (LGPD art. 11): collect the minimum and
 * never add symptoms, reasons for the visit or free text.
 */

export const preferenceOptions = [
  { value: "presencial", label: "Presencial" },
  { value: "online", label: "Online" },
] as const;

export const periodOptions = [
  { value: "manha", label: "Manhã" },
  { value: "tarde", label: "Tarde" },
  { value: "noite", label: "Noite" },
] as const;

const values = <T extends readonly { value: string }[]>(options: T) =>
  options.map((option) => option.value) as [
    T[number]["value"],
    ...T[number]["value"][],
  ];

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Informe seu nome." })
    .max(80, { error: "Use até 80 caracteres." }),
  email: z.email({ error: "Informe um e-mail válido, como nome@exemplo.com." }),
  phone: z
    .string()
    .trim()
    .refine((value) => /^\d{10,11}$/.test(value.replace(/\D/g, "")), {
      error: "Informe um telefone com DDD, como (11) 91234-5678.",
    }),
  preference: z.enum(values(preferenceOptions), {
    error: "Escolha presencial ou online.",
  }),
  period: z.enum(values(periodOptions), {
    error: "Escolha o melhor período para retorno.",
  }),
  consent: z.literal(true, {
    error:
      "Para enviarmos o seu contato, é preciso concordar com a política de privacidade.",
  }),
});

export type ContactData = z.infer<typeof contactSchema>;

/** What the browser posts: the form data plus the anti-spam fields. */
export const contactRequestSchema = contactSchema.extend({
  /** Honeypot: hidden from people, filled in by bots. */
  website: z.string().max(200).optional(),
  /** When the form was rendered (ms since epoch), to reject instant submits. */
  startedAt: z.number().int().positive(),
});

export type ContactRequest = z.infer<typeof contactRequestSchema>;
