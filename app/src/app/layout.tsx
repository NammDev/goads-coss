import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { fontMono, fontSans } from "@/fonts";
import { CommandMenu } from "@/components/command-menu";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FloatingContactButton } from "@/components/floating-contact-button";
import type { Metadata } from "next";

export const metadata: Metadata = {
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
          <TooltipProvider>
            <ScrollToTop />
            <CommandMenu />
            {children}
            <FloatingContactButton />
            <Analytics />
            <SpeedInsights />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
