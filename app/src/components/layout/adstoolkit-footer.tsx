// Minimal, neutral footer for the AdsToolkit (tools-only) brand — a wordmark,
// tools links and a copyright line. No GOADS content, no marketing columns.
// Chosen over <Footer /> in (marketing)/layout when `brand.key === "adstoolkit"`.

import Link from "next/link"

import { brand } from "@/config/brand"

const YEAR = 2026

export function AdsToolkitFooter() {
  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="flex w-full flex-col gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between md:px-10">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-foreground">{brand.name}</span>
          <span className="text-xs text-muted-foreground">Free Meta ads &amp; Business Manager tools</span>
        </div>

        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/tools/bookmark" className="transition-colors hover:text-foreground">
            Bookmarklets
          </Link>
          <Link href="/tools/2fa" className="transition-colors hover:text-foreground">
            2FA
          </Link>
          <Link href="/tools/chrome-extension" className="transition-colors hover:text-foreground">
            Extension
          </Link>
        </nav>

        <span className="text-xs text-muted-foreground">
          © {YEAR} {brand.name}
        </span>
      </div>
    </footer>
  )
}
