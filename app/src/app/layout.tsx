import "./globals.css";

import { fontMono, fontSans } from "@/fonts";
import Footer from "@/components/shadcn-studio/blocks/footer-component-02/footer-component-02";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
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
          <div className="relative isolate flex min-h-svh flex-col overflow-clip [--header-height:4rem]">
            {/* Vertical grid frame lines (left + right) */}
            <div
              aria-hidden="true"
              className="before:-left-3 after:-right-3 container pointer-events-none absolute inset-0 z-45 before:absolute before:inset-y-0 before:w-px before:bg-border/64 after:absolute after:inset-y-0 after:w-px after:bg-border/64"
            />
            {/* Corner dots at header bottom intersection */}
            <div
              aria-hidden="true"
              className="before:-left-[11.5px] before:-ml-1 after:-right-[11.5px] after:-mr-1 container pointer-events-none fixed inset-0 z-45 before:absolute before:top-[calc(var(--header-height)-4.5px)] before:z-1 before:size-2 before:rounded-[2px] before:border before:border-border before:bg-popover before:bg-clip-padding before:shadow-xs after:absolute after:top-[calc(var(--header-height)-4.5px)] after:z-1 after:size-2 after:rounded-[2px] after:border after:border-border after:bg-background after:bg-clip-padding after:shadow-xs dark:after:bg-clip-border dark:before:bg-clip-border"
            />
            <SiteHeader />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
