import { Container, Logo, Text } from "@/components/ui";
import type { NavLink } from "./site-header";

export type SiteFooterProps = {
  description: string;
  columns: { title: string; links: NavLink[] }[];
  legal: NavLink[];
  copyright: string;
};

export function SiteFooter({
  description,
  columns,
  legal,
  copyright,
}: SiteFooterProps) {
  return (
    <footer className="pt-section pb-8">
      <Container className="flex flex-col gap-16">
        <div className="grid gap-12 md:grid-cols-[1fr_auto]">
          <div className="flex max-w-xs flex-col gap-4">
            <Logo />
            <Text size="sm" tone="muted">
              {description}
            </Text>
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

        <div className="flex flex-col gap-4 border-t border-border pt-6 text-caption text-foreground-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{copyright}</p>
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
          </ul>
        </div>
      </Container>
    </footer>
  );
}
