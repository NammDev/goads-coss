import "./globals.css";

import { fontMono, fontSans } from "@/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/lib/cart-context";
import { Toaster } from "@/components/ui/sonner";
import { CommandMenu } from "@/components/command-menu";
import { FloatingContactButton } from "@/components/floating-contact-button";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.goads.shop"),
  title: "Agency Ad Accounts | 7-Day Warranty + 24/7 Support | GoAds",
  description:
    "Buy verified Business Managers & agency ad accounts. 3,242+ BMs sold, 7-day warranty, 24/7 support. Scale your Facebook ads without bans.",
  openGraph: {
    title: "GoAds - Agency Ad Accounts",
    description:
      "Stop Losing Accounts. Start Scaling. 7-day warranty, 24/7 support.",
    url: "https://www.goads.shop",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "GoAds - Agency Ad Accounts" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoAds - Agency Ad Accounts",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <ThemeProvider>
          <CartProvider>
            <TooltipProvider>
              {children}
              <CommandMenu />
              <FloatingContactButton />
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
