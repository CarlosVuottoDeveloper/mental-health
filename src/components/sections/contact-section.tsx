"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { useState, type BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import {
  Button,
  Checkbox,
  ChoiceGroup,
  Container,
  Field,
  Heading,
  Input,
  Text,
} from "@/components/ui";
import {
  contactSchema,
  periodOptions,
  preferenceOptions,
  type ContactData,
} from "@/lib/contact-schema";
import { trackEvent } from "@/lib/analytics";

export type ContactSectionProps = {
  id?: string;
  title: string;
  description: string;
  privacyHref: string;
  whatsappHref: string;
  endpoint?: string;
};

type Status = "idle" | "success" | "error";

export function ContactSection({
  id,
  title,
  description,
  privacyHref,
  whatsappHref,
  endpoint = "/api/contato",
}: ContactSectionProps) {
  return (
    <section id={id} className="scroll-mt-20 py-section">
      <Container className="grid gap-10 md:grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-4">
          <Heading size="lg">{title}</Heading>
          <Text size="lg" tone="muted" className="max-w-[40ch]">
            {description}
          </Text>
        </div>
        <ContactForm
          privacyHref={privacyHref}
          whatsappHref={whatsappHref}
          endpoint={endpoint}
        />
      </Container>
    </section>
  );
}

function ContactForm({
  privacyHref,
  whatsappHref,
  endpoint,
}: Pick<ContactSectionProps, "privacyHref" | "whatsappHref"> & {
  endpoint: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  // When the visitor started filling in the form (first focus), to reject
  // instant bot submissions. Set in an event handler: the page is prerendered,
  // so time can't be read during render.
  const [startedAt, setStartedAt] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.input<typeof contactSchema>, unknown, ContactData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: ContactData, event?: BaseSyntheticEvent) => {
    setStatus("idle");
    const form = event?.target as HTMLFormElement | undefined;
    const website = form ? new FormData(form).get("website") : null;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          website: typeof website === "string" && website ? website : undefined,
          // A person always focuses a field first; 0 (a bot) fails validation.
          startedAt: startedAt ?? 0,
        }),
      });
      if (!response.ok) throw new Error(String(response.status));
      reset();
      setStatus("success");
      trackEvent({ name: "contact_form_submit", source: "formulario" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      // Replaces the form in place; focus moves to the title so keyboard and
      // screen reader users land on the confirmation.
      <div
        role="status"
        className="flex flex-col items-start gap-4 rounded-xl border border-border-strong p-6 md:p-8"
      >
        <CircleCheck aria-hidden className="size-8" strokeWidth={1.5} />
        <Heading
          as="h3"
          size="sm"
          tabIndex={-1}
          ref={(heading) => heading?.focus()}
          className="rounded-xs"
        >
          Retorno solicitado
        </Heading>
        <Text tone="muted">
          Vamos entrar em contato no período que você escolheu, pelo telefone ou
          e-mail informado.
        </Text>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="formulario-sucesso"
          className="rounded-xs text-body-md font-medium underline underline-offset-4"
        >
          Prefere falar agora? Chamar no WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      noValidate
      onFocusCapture={() => setStartedAt((time) => time ?? Date.now())}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <Field id="contato-nome" label="Nome" error={errors.name?.message}>
        <Input
          id="contato-nome"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="contato-email" label="E-mail" error={errors.email?.message}>
          <Input
            id="contato-email"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />
        </Field>
        <Field
          id="contato-telefone"
          label="Telefone com DDD"
          error={errors.phone?.message}
        >
          <Input
            id="contato-telefone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </Field>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChoiceGroup
          id="contato-preferencia"
          legend="Preferência de atendimento"
          options={[...preferenceOptions]}
          error={errors.preference?.message}
          {...register("preference")}
        />

        <ChoiceGroup
          id="contato-periodo"
          legend="Melhor período para retorno"
          options={[...periodOptions]}
          error={errors.period?.message}
          {...register("period")}
        />
      </div>

      {/* Honeypot: hidden from people and assistive tech, filled by bots. */}
      <div
        aria-hidden
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="contato-website">Site</label>
        <input
          id="contato-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Checkbox
        id="contato-consentimento"
        error={errors.consent?.message}
        {...register("consent")}
      >
        Concordo com o uso destes dados apenas para retornar o meu contato,
        conforme a{" "}
        <Link
          href={privacyHref}
          className="text-foreground underline underline-offset-4"
        >
          política de privacidade
        </Link>
        .
      </Checkbox>

      {status === "error" && (
        <p role="alert" className="text-body-sm text-danger">
          Não foi possível enviar agora. Tente de novo em alguns minutos ou{" "}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            chame no WhatsApp
          </a>
          .
        </p>
      )}

      <Button
        type="submit"
        withArrow
        disabled={isSubmitting}
        className="self-start"
      >
        {isSubmitting ? "Enviando…" : "Solicitar retorno"}
      </Button>
    </form>
  );
}
