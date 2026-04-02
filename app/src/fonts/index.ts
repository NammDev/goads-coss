import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Inter } from "next/font/google";

export const fontSans = GeistSans;
export const fontMono = GeistMono;

// Foreplay redesign: Inter with optical size axis for display headings
// opsz axis enables "Inter Display" look at large sizes (tighter, condensed)
export const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  axes: ["opsz"],
});
