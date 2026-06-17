"use client"

// Sitewide giveaway announcement bar — sits above the header on marketing routes.
// Click anywhere → /giveaway. Decisions:
//  - All routes (marketing layout) for max reach, not homepage-only.
//  - Auto-hidden on /giveaway (redundant once on the destination).
//  - Dismissible via ×, persisted in localStorage (don't re-nag a returning user).
// Tokens only — zero hex.

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { siteText } from "@/components/atoms/typography"
import { cn } from "@/lib/utils"
import { giveawayBanner } from "@/data/giveaway-page-data"

const DISMISS_KEY = "giveaway-banner-dismissed"

export function GiveawayAnnouncementBar() {
  const pathname = usePathname()
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Deferred (not a synchronous setState in the effect body) → server + first
    // client render match (bar shown); collapses on mount if previously dismissed.
    const id = setTimeout(() => {
      setDismissed(localStorage.getItem(DISMISS_KEY) === "1")
    }, 0)
    return () => clearTimeout(id)
  }, [])

  // Hidden on the giveaway page itself, or once the user has dismissed it.
  if (dismissed || pathname === giveawayBanner.href) return null

  const dismiss = () => {
    setDismissed(true)
    localStorage.setItem(DISMISS_KEY, "1")
  }

  return (
    <div className="relative w-full border-b border-[var(--alpha-700)] bg-[var(--alpha-800)]">
      <Link
        href={giveawayBanner.href}
        className="group flex items-center justify-center gap-1.5 px-12 py-2.5 text-center no-underline"
      >
        <span className={cn(siteText.labelS, "text-foreground")}>
          {giveawayBanner.text}
        </span>
        <span
          className={cn(
            siteText.labelS,
            "inline-flex items-center gap-1 text-foreground underline-offset-4 group-hover:underline",
          )}
        >
          {giveawayBanner.cta}
          <span aria-hidden="true">→</span>
        </span>
      </Link>

      {/* Dismiss (×) — stays hidden afterwards via localStorage */}
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss giveaway banner"
        className="absolute top-1/2 right-3 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-[var(--alpha-100)] transition-colors hover:bg-[var(--alpha-700)] hover:text-foreground"
      >
        <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true">
          <path
            d="M6 6l8 8M14 6l-8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  )
}
