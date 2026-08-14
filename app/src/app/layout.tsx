import "./globals.css";

import { fontMono, fontSans } from "@/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/lib/cart-context";
import { Toaster } from "@/components/ui/sonner";
import { CommandMenu } from "@/components/command-menu";
import { CalendarPopup } from "@/components/cal/calendar-popup";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";

import { brand } from "@/config/brand";

// Single source for the shared link-preview copy. Facebook, Instagram, LinkedIn,
// WhatsApp, Telegram, Discord, Slack, Pinterest, etc. ALL read the same Open Graph
// tags below; X/Twitter reads the twitter:* tags. Discord also colours its embed
// bar from `theme-color` (set in `viewport`).
// Site identity comes from the active brand (white-label). Unset NEXT_PUBLIC_BRAND
// → GOADS, so these resolve to the exact previous values.
const SITE_URL = brand.url;
const SITE_NAME = brand.name;
const SITE_TITLE = brand.title;
const SITE_DESCRIPTION = brand.description;
const OG_IMAGE = {
  url: brand.ogImage,
  width: 1200,
  height: 630,
  alt: brand.ogImageAlt,
  type: "image/png",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: brand.keywords,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  alternates: { canonical: "/" },
  // Icons served from /public (reliable static serving) + declared explicitly so
  // the tab favicon AND the iOS "Add to Home Screen" apple-touch-icon both resolve.
  // Paths come from the active brand so a white-label domain never shows the
  // GOADS mark in the tab or on the home screen.
  icons: {
    icon: [
      { url: brand.favicon, sizes: "any" },
      { url: brand.icon, type: "image/png", sizes: "512x512" },
    ],
    shortcut: [brand.favicon],
    apple: [{ url: brand.appleIcon, sizes: "180x180", type: "image/png" }],
  },
  // Open Graph — used by Facebook, Instagram, LinkedIn, WhatsApp, Telegram,
  // Discord, Slack, Pinterest, Messenger, Zalo and most link unfurlers.
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [OG_IMAGE],
  },
  // X / Twitter card.
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

// theme-color: tints the mobile browser UI and the Discord embed accent bar.
export const viewport: Viewport = {
  themeColor: "#10b981",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} relative bg-background font-sans text-foreground antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none"
        >
          Skip to main content
        </a>
        {/* Clerk is NOT provided here — see AppClerkProvider. Marketing routes
            skip Clerk's client bundle for faster hydration/LCP; portal, admin
            and (auth) layouts each mount their own <AppClerkProvider>. */}
        <ThemeProvider>
          <CartProvider>
            <TooltipProvider>
              {children}
              {/* Marketing-only floating UI (search palette over marketing pages,
                  "book a call" popup) — omitted on the tools-only brand. */}
              {!brand.toolsOnly && <CommandMenu />}
              {!brand.toolsOnly && <CalendarPopup />}
              <ScrollToTop />
              <Toaster position="top-right" />
            </TooltipProvider>
          </CartProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
