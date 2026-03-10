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
  },
  twitter: {
    card: "summary_large_image",
    title: "GoAds - Agency Ad Accounts",
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
