// Foreplay floating calendar popup — clone of .calendar-popup-wrapper widget.
// Default state: small trigger chip pinned bottom-left (avatar + "Click Me!" +
// subline). On click: expands to the full action-plan card.
//
// DOM map (source: foreplay-homepage-latest.html:1027-1029):
//   .calendar-popup-wrapper       → outer fixed wrapper (this file)
//     .calendar-pop-up-wrap       → relative container
//       .calendar-pop-up-trigger  → collapsed chip (always rendered)
//       .calendar-pop-up-main     → expanded card (animated mount)
//
// CSS spec (extracted exactly):
//   wrapper:  fixed inset auto auto 0 0, padding 20px (bottom/left 0 per override)
//   trigger:  bg #fff, 1px solid solid-100, radius 12px (bottom corners 0 when card mounted)
//   trigger-body: gap 10px, padding 8px 14px 8px 8px, items-center
//   main:     absolute bottom 0 left 0, w 360px, radius 18px

"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { fontInter } from "@/fonts"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplayAvatarOnline } from "@/components/foreplay/foreplay-avatar-online"
import { ForeplayActionPlanCard } from "@/components/foreplay/foreplay-action-plan-card"
import {
  actionPlanFounder,
  actionPlanCopy,
  getActionPlanDates,
  type ActionPlanDate,
} from "@/data/goads-action-plan-page-data"

export function ForeplayCalendarPopup() {
  const [open, setOpen] = useState(false)
  // Dates computed client-side to avoid SSR/CSR drift on rolling "today".
  const [dates, setDates] = useState<ActionPlanDate[]>([])

  useEffect(() => {
    setDates(getActionPlanDates())
  }, [])

  return (
    // .calendar-popup-wrapper — fixed bottom-left, padded inset so chip sits
    // away from the viewport edges. Wrapped in `.foreplay` so `--fp-*` CSS
    // tokens resolve (they're scoped to `.foreplay` in globals.css, and this
    // widget mounts in the root layout — outside the marketing wrapper).
    <div
      className={cn(
        "foreplay",
        fontInter.variable,
        "pointer-events-none fixed inset-auto bottom-5 left-5 z-10 flex flex-col items-start justify-end",
      )}
    >
      {/* .calendar-pop-up-wrap — relative positioning context */}
      <div className="pointer-events-auto relative flex flex-col items-start">
        {/* .calendar-pop-up-main — expanded card; sits ABOVE the trigger */}
        {open && dates.length > 0 && (
          <div className="absolute bottom-full left-0 mb-2">
            <ForeplayActionPlanCard
              dates={dates}
              onClose={() => setOpen(false)}
            />
          </div>
        )}

        {/* .calendar-pop-up-trigger — collapsed chip, always visible */}
        <button
          type="button"
          onClick={() => setOpen(prev => !prev)}
          aria-expanded={open}
          aria-label={open ? "Close action plan" : "Open free action plan"}
          className={cn(
            "flex cursor-pointer flex-col items-stretch",
            "rounded-[12px] bg-white text-left",
            "border border-[var(--fp-solid-100)] shadow-2xl",
            "transition-colors duration-200 hover:bg-[var(--fp-solid-50)]",
          )}
        >
          {/* .calendar-pop-up-trigger-body — gap 10px, padding 8px 14px 8px 8px */}
          <div className="flex items-center gap-[10px] py-2 pl-2 pr-[14px]">
            <ForeplayAvatarOnline
              src={actionPlanFounder.avatarSrc}
              alt={actionPlanFounder.avatarAlt}
            />
            {/* .calendar-pop-up-text — flex col, flex-1, gap 0 */}
            <div className="flex flex-1 flex-col">
              <div className={cn(fpText.labelS, "text-[var(--fp-solid-900)]")}>
                {actionPlanCopy.triggerTitle}
              </div>
              <div className={cn(fpText.bodyXs, "text-[var(--fp-solid-400)]")}>
                {actionPlanCopy.triggerSubline}
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}
