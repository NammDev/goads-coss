import type { Metadata } from "next";

import { AppClerkProvider } from "@/components/app-clerk-provider";

export const metadata: Metadata = {
  title: "GOADS, Sign In",
};

/**
 * Minimal auth layout — no SiteHeader, no footer.
 * Centers content on a subtle background.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppClerkProvider>
      <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
        {children}
      </div>
    </AppClerkProvider>
  );
}
