"use client";

import { Minus, Plus } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function Accordion({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn(
        "flex flex-col gap-2 rounded-xl bg-surface-sunken p-2",
        className,
      )}
      {...props}
    />
  );
}

export function AccordionItem({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "group/item rounded-md bg-surface text-foreground transition-colors duration-(--duration-base) ease-soft",
        "data-[state=open]:bg-inverse data-[state=open]:text-inverse-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 cursor-pointer items-center justify-between gap-4 rounded-md p-4 text-left text-body-sm font-medium",
          "focus-visible:outline-offset-[-2px] group-data-[state=open]/item:focus-visible:outline-ring-inverse",
          className,
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-pill bg-surface-sunken text-foreground transition-colors duration-(--duration-base) ease-soft",
            "group-data-[state=open]/item:bg-accent group-data-[state=open]/item:text-accent-foreground",
          )}
        >
          <Plus
            className="size-4 group-data-[state=open]/item:hidden"
            strokeWidth={1.75}
          />
          <Minus
            className="hidden size-4 group-data-[state=open]/item:block"
            strokeWidth={1.75}
          />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    // forceMount keeps closed answers in the HTML (crawlers and Ctrl+F find
    // them); CSS hides them while closed.
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      forceMount
      className="overflow-hidden data-[state=closed]:hidden data-[state=open]:animate-collapsible-down"
      {...props}
    >
      <div
        className={cn(
          "max-w-[65ch] px-4 pb-4 text-body-sm text-inverse-muted",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}
