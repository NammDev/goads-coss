"use client"

// Sitewide giveaway announcement bar — sits above the header on marketing routes.
// Click anywhere → /giveaway. Decisions:
//  - All routes (marketing layout) for max reach, not homepage-only.
//  - Auto-hidden on /giveaway (redundant once on the destination).
//  - Always shown (non-dismissible) — no × button.
// Tokens only — zero hex.

import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteText } from "@/components/atoms/typography"
import { cn } from "@/lib/utils"
import { giveawayBanner } from "@/data/giveaway-page-data"

export function GiveawayAnnouncementBar() {
  const pathname = usePathname()

  // Hidden only on the giveaway page itself (redundant there).
  if (pathname === giveawayBanner.href) return null

  return (
    <div className="relative w-full border-b border-[var(--giveaway-banner-border)] [background:var(--giveaway-banner-bg)]">
      <Link
        href={giveawayBanner.href}
        className="group flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 px-12 py-3 text-center no-underline"
      >
        <span className={cn(siteText.labelS, "text-[1.05rem] leading-6 font-semibold text-white uppercase")}>
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
          {/* Chevron — same icon as the landing CtaButton (not a text arrow) */}
          <svg
            viewBox="0 0 20 20"
            width="18"
            height="18"
            fill="none"
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5"
          >
            <path
              d="M8 6.5l3.5 3.5L8 13.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </Link>
    </div>
  )
}
