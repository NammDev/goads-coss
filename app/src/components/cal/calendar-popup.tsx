// Floating support widget — bottom-left fixed pill, click to expand the full
// contact card (founder + channel pills + 2 CTAs).
//
// Trigger chip is a GoAds-branded badge (dark pill + brand mark + "Support" label
// + online dot) to distinguish from Foreplay's white "Click Me!" Intercom-clone.

"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { fontInter } from "@/fonts"
import { siteText } from "@/components/atoms/typography"
import { GoadsMark } from "@/components/layout/goads-mark"
import { ActionPlanCard } from "@/components/misc/action-plan-card"

export function CalendarPopup() {
  const [open, setOpen] = useState(false)

  // Auto-close the support card on route change (per UX decision: don't carry
  // the open overlay across navigations). The trigger chip itself stays.
  const pathname = usePathname()
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <div
      className={cn(
        "site",
        fontInter.variable,
        "pointer-events-none fixed inset-auto bottom-5 left-5 z-10 flex flex-col items-start justify-end",
      )}
    >
      <div className="pointer-events-auto relative flex flex-col items-start">
        {/* Expanded card — sits ABOVE the trigger */}
        {open && (
          <div className="absolute bottom-full left-0 mb-2">
            <ActionPlanCard onClose={() => setOpen(false)} />
          </div>
        )}

        {/* Trigger chip — GoAds brand badge (dark pill) */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={open ? "Close support" : "Open GoAds support"}
          className={cn(
            "group flex cursor-pointer items-center gap-2.5 rounded-full",
            "bg-[var(--solid-900)] text-white",
            "py-2 pl-2 pr-4",
            "shadow-xl shadow-black/20 ring-1 ring-white/5",
            "transition-all duration-200",
            "hover:bg-[var(--solid-700)] hover:scale-[1.02]",
          )}
        >
          {/* Brand mark — circular dark plate so panda body punches through */}
          <span className="relative flex size-7 items-center justify-center rounded-full bg-[var(--solid-700)] text-[var(--solid-900)] transition-colors duration-200 group-hover:bg-[var(--solid-600)]">
            <GoadsMark className="size-5" />
            {/* Online dot — top-right of the mark */}
            <span className="absolute -right-0.5 -top-0.5 block size-2 rounded-full bg-[var(--lime-green)] ring-2 ring-[var(--solid-900)] transition-[ring-color] duration-200 group-hover:ring-[var(--solid-700)]" />
          </span>

          {/* Label */}
          <span className="flex flex-col items-start leading-tight">
            <span className={cn(siteText.labelS, "text-white")}>Support</span>
            <span className={cn(siteText.bodyXs, "text-white/60")}>Online · reply ~2m</span>
          </span>
        </button>
      </div>
    </div>
  )
}
