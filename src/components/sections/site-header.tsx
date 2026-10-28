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

/**
 * While the full-screen menu is open the page behind it must not scroll, and
 * the menu closes if the viewport grows to the desktop layout (where it is hidden).
 */
function useMenuOverlay(open: boolean, close: () => void) {
  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";

    // Absent in some test environments.
    const desktop = window.matchMedia?.("(min-width: 80rem)");
    const onChange = (event: MediaQueryListEvent) => event.matches && close();
    desktop?.addEventListener("change", onChange);

    return () => {
      root.style.overflow = previous;
      desktop?.removeEventListener("change", onChange);
    };
  }, [open, close]);
}

export function SiteHeader({
  links,
  contact,
  fixed = false,
  overlayTargetId,
  className,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const overHero = useOverlay(overlayTargetId);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };
  useMenuKeyboard(open, closeMenu, headerRef);
  useMenuOverlay(open, closeMenu);
  // The open menu covers the hero, so the header switches to its solid style.
  const overlay = overHero && !open;

  return (
    <header
      ref={headerRef}
      className={cn(
        "z-40 transition-colors duration-(--duration-base) ease-soft",
        fixed && "fixed inset-x-0 top-0",
        overlay && "text-inverse-foreground",
        !overlay && "border-b border-border text-foreground",
        // backdrop-filter would become the containing block of the fixed
        // full-screen menu and clip it to the header, so it is off while open.
        !overlay &&
          (open ? "bg-background" : "bg-background/95 backdrop-blur-md"),
        className,
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link href="/" className="inline-flex min-h-11 items-center rounded-xs">
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

        {/* Filled in both states; lime only once the hero (and its own lime CTA) is gone. */}
        <Button
          variant={overlay ? "soft" : "accent"}
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
          size="lg"
          className="xl:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </IconButton>
      </Container>

      {open && (
        <nav
          id="site-menu"
          aria-label="Principal"
          className="fixed inset-x-0 top-20 bottom-0 overflow-y-auto bg-background xl:hidden"
        >
          <Container className="flex min-h-full flex-col gap-10 pt-4 pb-8">
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.href} className="border-b border-border">
                  <a
                    href={link.href}
                    data-menu-item
                    className="block rounded-xs py-4 font-display text-display-sm"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button
              variant="accent"
              size="lg"
              asChild
              className="mt-auto w-full"
            >
              <a
                href={contact.href}
                data-menu-item
                data-cta="header"
                onClick={() => setOpen(false)}
              >
                {contact.label}
              </a>
            </Button>
          </Container>
        </nav>
      )}
    </header>
  );
}
