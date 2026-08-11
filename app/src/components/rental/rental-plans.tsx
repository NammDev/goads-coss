// Plans experience — the whole thing on ONE white block: heading, track
// switcher, three plan cards, and the line of terms every plan shares.
//
// It used to be two sections — dark cards, then a white comparison table — which
// printed the same six numbers twice and split the page into two competing
// surfaces. The cards already carry every spec row, so the table was pure
// duplication; deleting it leaves one place to look.

"use client"

import { useState } from "react"

import { RefreshCw } from "lucide-react"

import { cn } from "@/lib/utils"
import { SectionContainer } from "@/components/atoms/section-container"
import { SectionHead } from "@/components/atoms/section-head"
import { SectionWhiteBlock } from "@/components/atoms/section-white-block"
import { siteText } from "@/components/atoms/typography"
import { RentalTrackSwitcher } from "@/components/rental/rental-track-switcher"
import { RentalPlanCard } from "@/components/rental/rental-plan-card"
import {
  DEFAULT_TRACK,
  getTrack,
  orderForDisplay,
  type RentalTrackId,
} from "@/data/rental-page-data"

export function RentalPlans() {
  const [trackId, setTrackId] = useState<RentalTrackId>(DEFAULT_TRACK)
  const track = getTrack(trackId)

  return (
    <SectionWhiteBlock>
      <SectionContainer variant="wide">
        {/* scroll-mt clears the sticky header when the hero CTA jumps here */}
        {/* Foreplay section scale: --py-section 108 / -md 96 / -sm 80 */}
        <div
          id="plans"
          className="flex scroll-mt-28 flex-col gap-12 py-[108px] max-md:gap-10 max-md:py-24 max-sm:gap-8 max-sm:py-20"
        >
          {/* Heading + switcher + the selected track's blurb */}
          <div className="flex flex-col items-center gap-7">
            {/* No description: the hero covers the offer, and the track tagline
                below the switcher explains the choice with the selected track's
                own wording. A line here would only sit between them repeating both. */}
            <SectionHead
              subtitle="Rental plans"
              title="Pick the track you run on"
              titleTag="h2"
              titleSize="h2"
              variant="dark"
            />

            <RentalTrackSwitcher value={trackId} onChange={setTrackId} />
          </div>

          {/* Cards. items-start keeps the lifted middle card from stretching
              its siblings; lg:mt-5 leaves room for its -my-5 overhang.

              Transition is the setup-configurator dialog's, verbatim:
              `animate-in fade-in-0 zoom-in-95 duration-200`. Two earlier
              attempts were worse for reasons worth recording —
                · slide-from-bottom + 500ms + a 70ms per-card stagger: the travel
                  and the piecemeal build-up both read as stutter;
                · a fade-out/swap/fade-in crossfade: continuous, but two moves
                  where the reference is one, so it felt slow.
              Fade plus a small scale has no positional travel, so the row
              materialises in place. Keyed on the track so it replays each swap;
              both tracks measure 601px tall, so nothing reflows underneath. */}
          <div
            key={track.id}
            className={cn(
              // Stacked below lg, but capped and centred: left to fill the
              // container the cards ran the full 768px width and the spec rows
              // opened up a dead gap between label and value.
              "grid grid-cols-3 items-start gap-6 lg:mt-5",
              "max-lg:mx-auto max-lg:w-full max-lg:max-w-[520px] max-lg:grid-cols-1 max-lg:gap-10",
              "animate-in fade-in-0 zoom-in-95 duration-200 motion-reduce:animate-none",
            )}
          >
            {orderForDisplay(track.plans).map((plan) => (
              <RentalPlanCard key={plan.id} plan={plan} track={track} />
            ))}
          </div>

          <ReplacementPromise />
        </div>
      </SectionContainer>
    </SectionWhiteBlock>
  )
}

/** The replacement promise, stated once and in full under the grid.
 *
 *  It is already a row inside every card, but a row reads as a spec — one line
 *  among seven — and this is the term that decides whether renting is worth it
 *  at all. It holds for every asset, on every plan, on both tracks, so it earns
 *  its own strip rather than repetition inside the cards. */
function ReplacementPromise() {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-[760px] items-center gap-4 rounded-[16px] px-6 py-4 max-sm:flex-col max-sm:gap-3 max-sm:px-5 max-sm:text-center",
        "bg-[var(--meta-tint)] shadow-[inset_0_0_0_1px_var(--meta-ring)]",
      )}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(160deg,var(--meta-blue-light),var(--meta-blue-deep))] text-white">
        <RefreshCw className="size-5" strokeWidth={2} aria-hidden="true" />
      </span>
      <p className={cn(siteText.bodyM, "text-[var(--solid-500)] [text-wrap:pretty]")}>
        <span className="font-medium text-[var(--solid-900)]">
          Unlimited replacement, on every plan.
        </span>{" "}
        If an ad account, Business Manager, profile or page in your setup is disabled, we
        replace it the same day. As many times as it happens, at no extra charge.
      </p>
    </div>
  )
}
