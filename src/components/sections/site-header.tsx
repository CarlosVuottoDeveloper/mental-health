"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button, Container, IconButton, Logo } from "@/components/ui";
import { cn } from "@/lib/cn";

export type NavLink = { label: string; href: string };

export type SiteHeaderProps = {
  links: NavLink[];
  contact: NavLink;
  /** Use "inverse" when the header sits over photography or a dark block. */
  tone?: "default" | "inverse";
  className?: string;
};

export function SiteHeader({
  links,
  contact,
  tone = "default",
  className,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const inverse = tone === "inverse";

  return (
    <header
      className={cn(
        inverse ? "text-inverse-foreground" : "text-foreground",
        className,
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link href="/" className="rounded-xs">
          <Logo tone={tone} />
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8 text-label uppercase">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-xs opacity-80 transition-opacity hover:opacity-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Button variant="link" asChild className="hidden md:inline-flex">
          <a href={contact.href}>{contact.label}</a>
        </Button>

        <IconButton
          label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="site-menu"
          variant={inverse ? "inverse-outline" : "soft"}
          className="md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </IconButton>
      </Container>

      {open && (
        <nav id="site-menu" aria-label="Principal" className="md:hidden">
          <Container>
            <ul
              className={cn(
                "flex flex-col gap-1 rounded-lg p-2 text-label uppercase",
                inverse
                  ? "bg-inverse/80 backdrop-blur-md"
                  : "bg-surface-sunken",
              )}
            >
              {[...links, contact].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="block rounded-sm px-3 py-3">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      )}
    </header>
  );
}
