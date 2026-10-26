"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button, Container, IconButton, Logo } from "@/components/ui";
import { cn } from "@/lib/cn";

export type NavLink = { label: string; href: string };

export type SiteHeaderProps = {
  links: NavLink[];
  contact: NavLink;
  /** Keep the header pinned to the top of the viewport. */
  fixed?: boolean;
  /**
   * Id of the element the header floats over transparently (usually the
   * hero). Once it scrolls out of view the header turns solid. Without it the
   * header is always solid.
   */
  overlayTargetId?: string;
  className?: string;
};

const HEADER_HEIGHT = 80;

function useOverlay(targetId: string | undefined) {
  const [overlay, setOverlay] = useState(Boolean(targetId));

  useEffect(() => {
    const target = targetId ? document.getElementById(targetId) : null;
    if (!target || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setOverlay(entry?.isIntersecting ?? false),
      { rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px` },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  return overlay;
}

/** Keeps Tab inside the open mobile menu and closes it with Escape. */
function useMenuKeyboard(
  open: boolean,
  close: () => void,
  container: React.RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !container.current) return;

      const focusable = Array.from(
        container.current.querySelectorAll<HTMLElement>("[data-menu-item]"),
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close, container]);
}

export function SiteHeader({
  links,
  contact,
  fixed = false,
  overlayTargetId,
  className,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const overlay = useOverlay(overlayTargetId);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };
  useMenuKeyboard(open, closeMenu, headerRef);

  return (
    <header
      ref={headerRef}
      className={cn(
        "z-40 transition-colors duration-(--duration-base) ease-soft",
        fixed && "fixed inset-x-0 top-0",
        overlay
          ? "text-inverse-foreground"
          : "border-b border-border bg-background/95 text-foreground backdrop-blur-md",
        className,
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link href="/" className="rounded-xs">
          <Logo tone={overlay ? "inverse" : "default"} />
        </Link>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-7 text-label uppercase">
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

        {/* Over the hero the hero's own accent button is the visible CTA. */}
        <Button
          variant={overlay ? "link" : "accent"}
          size="sm"
          asChild
          className={cn(
            "hidden xl:inline-flex",
            overlay && "focus-visible:outline-ring-inverse",
          )}
        >
          <a href={contact.href} data-cta="header">
            {contact.label}
          </a>
        </Button>

        <IconButton
          ref={toggleRef}
          data-menu-item
          label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="site-menu"
          variant={overlay ? "inverse-outline" : "soft"}
          className="xl:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </IconButton>
      </Container>

      {open && (
        <nav id="site-menu" aria-label="Principal" className="pb-4 xl:hidden">
          <Container>
            <ul
              className={cn(
                "flex flex-col gap-1 rounded-lg p-2 text-label uppercase",
                overlay
                  ? "bg-inverse/85 backdrop-blur-md"
                  : "bg-surface-sunken",
              )}
            >
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-menu-item
                    className="block rounded-sm px-3 py-3"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="p-1">
                <Button variant="accent" asChild className="w-full">
                  <a
                    href={contact.href}
                    data-menu-item
                    data-cta="header"
                    onClick={() => setOpen(false)}
                  >
                    {contact.label}
                  </a>
                </Button>
              </li>
            </ul>
          </Container>
        </nav>
      )}
    </header>
  );
}
