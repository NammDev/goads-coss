// Track switcher — Standard ⇄ High-risk verticals.
//
// LIGHT scope: it sits on the white block with the plan cards, so the active
// segment is the near-black fill the rest of the site uses for primary actions
// on white.
//
// A two-segment pill rather than tabs-with-underline: there are exactly two
// options and the choice re-prices everything below it, so it should read as a
// switch, not as navigation. Implemented as a radiogroup so arrow keys move
// between tracks, which is what a keyboard user expects from a segmented control.
//
// The two labels are very different lengths ("Standard" vs "High-risk
// verticals"), so below sm the control goes full-width with equal halves rather
// than letting the longer label decide the pill's size or wrap mid-word.

"use client"

import { cn } from "@/lib/utils"
import { RENTAL_TRACKS, type RentalTrackId } from "@/data/rental-page-data"

interface RentalTrackSwitcherProps {
  value: RentalTrackId
  onChange: (id: RentalTrackId) => void
}

export function RentalTrackSwitcher({ value, onChange }: RentalTrackSwitcherProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Rental track"
      className="flex items-center gap-1 rounded-full bg-[var(--solid-25)] p-1 shadow-[inset_0_0_0_1px_var(--solid-50)] max-sm:w-full"
    >
      {RENTAL_TRACKS.map((track) => {
        const active = track.id === value
        return (
          <button
            key={track.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(track.id)}
            className={cn(
              "flex items-center justify-center gap-2",
              // labelS below sm → labelM from sm up. Written out rather than
              // overriding just the font-size on `siteText.labelM`: the scale
              // pairs each size with its own leading and tracking, and changing
              // one without the others lands between two steps of the scale.
              "font-sans font-medium no-underline",
              "text-[0.875rem] leading-5 tracking-[-0.00643em]",
              "sm:text-base sm:leading-6 sm:tracking-[-0.01125em]",
              "cursor-pointer rounded-full px-6 py-2.5 whitespace-nowrap",
              "transition-colors duration-200",
              "max-sm:flex-1 max-sm:px-3 max-sm:py-2",
              active
                ? "bg-background text-foreground shadow-[0_6px_16px_-10px_color-mix(in_oklab,var(--solid-900),transparent_30%)]"
                : "text-[var(--solid-400)] hover:text-[var(--solid-900)]",
            )}
          >
            {track.label}
          </button>
        )
      })}
    </div>
  )
}
