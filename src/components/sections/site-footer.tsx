import type { ReactNode } from "react";
import {
  Container,
  Logo,
  SocialLinks,
  Text,
  type SocialLinksProps,
} from "@/components/ui";
import { CookiePreferencesButton } from "./cookie-banner";
import type { NavLink } from "./site-header";

export type SiteFooterProps = {
  id?: string;
  description: string;
  /** Professional identification (name · specialty · CRM · RQE), required by CFM. */
  credentials: string;
  address: string;
  socials: SocialLinksProps["links"];
  columns: { title: string; links: NavLink[] }[];
  /** Informational and emergency notice (SAMU 192 / CVV 188). */
  disclaimer: ReactNode;
  legal: NavLink[];
  copyright: string;
  /** Development credit and the note that this is a conceptual project. */
  credit: string;
};

export function SiteFooter({
  id,
  description,
  credentials,
  address,
  socials,
  columns,
  disclaimer,
  legal,
  copyright,
  credit,
}: SiteFooterProps) {
  return (
    <footer id={id} className="pt-section pb-8">
      <Container className="flex flex-col gap-16">
        <div className="grid gap-12 md:grid-cols-[1fr_auto]">
          <div className="flex max-w-sm flex-col gap-4">
            <Logo />
            <Text size="sm" tone="muted">
              {description}
            </Text>
            <Text size="sm" className="font-medium">
              {credentials}
            </Text>
            <Text as="div" size="sm" tone="muted">
              <address className="not-italic">{address}</address>
            </Text>
            <SocialLinks links={socials} className="mt-2" />
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:gap-16">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="mb-4 text-body-sm font-medium">
                  {column.title}
                </h2>
                <ul className="flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="rounded-xs text-body-sm text-foreground-muted transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-border pt-6">
          <Text size="caption" tone="muted" className="max-w-3xl">
            {disclaimer}
          </Text>
          <div className="flex flex-col gap-4 text-caption text-foreground-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              {copyright} · {credit}
            </p>
            <ul className="flex gap-6">
              {legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="rounded-xs hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <CookiePreferencesButton />
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
