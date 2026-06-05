import "./globals.css";

import { fontMono, fontSans } from "@/fonts";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
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

const clerkProxyUrl = process.env.NEXT_PUBLIC_CLERK_PROXY_URL;

// Single source for the shared link-preview copy. Facebook, Instagram, LinkedIn,
// WhatsApp, Telegram, Discord, Slack, Pinterest, etc. ALL read the same Open Graph
// tags below; X/Twitter reads the twitter:* tags. Discord also colours its embed
// bar from `theme-color` (set in `viewport`).
const SITE_URL = "https://goadsagency.com";
const SITE_NAME = "GOADS";
const SITE_TITLE = "GOADS | Agency Ad Accounts & Meta Assets | 24/7 Support";
const SITE_DESCRIPTION =
  "Premium agency ad accounts and Meta assets backed by industry-leading warranty, dedicated customer support, fast delivery, and long-term reliability.";
const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "GOADS - Agency Ad Accounts & Meta Assets",
  type: "image/png",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "GOADS",
    "agency ad accounts",
    "Meta Business Manager",
    "verified BM",
    "Facebook ad accounts",
    "Facebook profiles",
    "Facebook pages",
    "TikTok accounts",
    "Meta assets",
    "unban service",
    "blue verification",
    "scale Facebook ads",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  alternates: { canonical: "/" },
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
        <ClerkProvider
          appearance={{ theme: shadcn }}
          proxyUrl={clerkProxyUrl}
          signInForceRedirectUrl="/portal"
          signUpForceRedirectUrl="/portal"
        >
          <ThemeProvider>
            <CartProvider>
              <TooltipProvider>
                {children}
                <CommandMenu />
                <CalendarPopup />
                <ScrollToTop />
                <Toaster position="top-right" />
              </TooltipProvider>
            </CartProvider>
          </ThemeProvider>
        </ClerkProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
