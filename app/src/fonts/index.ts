import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Inter } from "next/font/google";

export const fontSans = GeistSans;
export const fontMono = GeistMono;

// Foreplay redesign: Inter for both headings (display optical size) and body
export const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
