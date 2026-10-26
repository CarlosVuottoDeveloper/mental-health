"use client";

import { useEffect, useState } from "react";
import { SocialIcon } from "@/components/ui";
import { cn } from "@/lib/cn";

export type WhatsAppButtonProps = {
  href: string;
  label: string;
  /**
   * Ids of elements the button stays hidden over: the hero (whose own CTA is
   * visible) and the footer (so the button never covers it, LPC-18).
   */
  hideOverIds?: string[];
  className?: string;
};

function useHiddenOver(ids: string[]) {
  const [hidden, setHidden] = useState(ids.length > 0);
  const key = ids.join(",");

  useEffect(() => {
    const targets = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    // Every supported browser has IntersectionObserver; without it (or without
    // targets) the button simply keeps its initial state.
    if (typeof IntersectionObserver === "undefined" || targets.length === 0) {
      return;
    }

    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setHidden(visible.size > 0);
    });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [key]);

  return hidden;
}

/** Floating WhatsApp shortcut (LPC-18). Dark with a lime glyph so it never competes with the accent CTAs. */
export function WhatsAppButton({
  href,
  label,
  hideOverIds = [],
  className,
}: WhatsAppButtonProps) {
  const hidden = useHiddenOver(hideOverIds);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      data-cta="floating"
      inert={hidden}
      className={cn(
        "fixed right-4 bottom-4 z-30 grid size-14 place-items-center rounded-pill bg-primary text-accent shadow-[0_8px_24px_rgb(31_30_24/0.25)] md:right-6 md:bottom-6",
        "transition-[opacity,translate] duration-(--duration-base) ease-soft hover:bg-primary-hover",
        hidden && "pointer-events-none translate-y-4 opacity-0",
        className,
      )}
    >
      <SocialIcon network="whatsapp" className="size-7" />
    </a>
  );
}
