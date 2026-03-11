import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GoAds — Sign In",
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
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      {children}
    </div>
  );
}
