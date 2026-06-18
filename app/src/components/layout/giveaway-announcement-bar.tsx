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
    <div className="relative w-full border-b border-[var(--giveaway-banner-border)] [background:var(--giveaway-banner-bg)]">
      <Link
        href={giveawayBanner.href}
        className="group flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 px-12 py-3 text-center no-underline"
      >
        <span className={cn(siteText.labelS, "text-[1.05rem] leading-6 font-semibold text-white")}>
          {giveawayBanner.text}
          <span className="font-bold text-[var(--giveaway-banner-highlight)]">
            {giveawayBanner.highlight}
          </span>
        </span>
        <span
          className={cn(
            siteText.labelS,
            "inline-flex items-center gap-1 rounded-full bg-white px-3.5 py-1 text-[1.05rem] leading-6 font-semibold text-[var(--giveaway-banner-cta-text)] shadow-sm transition-transform group-hover:scale-105",
          )}
        >
          {giveawayBanner.cta}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </Link>

      {/* Dismiss (×) — stays hidden afterwards via localStorage */}
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss giveaway banner"
        className="absolute top-1/2 right-3 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/10 hover:text-white"
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
