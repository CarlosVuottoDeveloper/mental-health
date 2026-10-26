import { Instrument_Serif, Inter } from "next/font/google";

export const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const display = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  // Only the upright style is used; the italic file would compete with the LCP.
  style: "normal",
  display: "swap",
});

export const fontVariables = `${sans.variable} ${display.variable}`;
