"use client";

import { useSyncExternalStore } from "react";

/** Analytics cookie consent (LPC-24). Essential storage never needs consent. */
export type Consent = "accepted" | "rejected";

const STORAGE_KEY = "lpc-cookie-consent";
const CHANGE_EVENT = "lpc:consent-change";

export function readConsent(): Consent | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

/** Saves the choice (or clears it to ask again) and notifies listeners. */
export function writeConsent(value: Consent | null) {
  try {
    if (value) window.localStorage.setItem(STORAGE_KEY, value);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage blocked (private mode): the choice lasts for this page view.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/**
 * Current consent. `undefined` while rendering on the server, so nothing that
 * depends on consent (banner, analytics) renders before the client knows.
 */
export function useConsent(): Consent | null | undefined {
  return useSyncExternalStore(subscribe, readConsent, () => undefined);
}
