// Review wall as a vertical marquee — 3 columns scroll endlessly, adjacent
// columns run opposite directions for an organic "wall of love" feel.
// Pauses on hover; top/bottom fade mask; respects reduced-motion.
// Uses the marquee-vertical keyframes defined in globals.css.

"use client"

import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"
import { SenjaReviewCard } from "@/components/reviews/senja-card"
import { PlatformIcon } from "@/components/reviews/review-platform-icon"
import type { ReviewData } from "@/data/reviews-data"

interface SenjaReviewMarqueeProps {
  reviews: ReviewData[]
  className?: string
}

// Per-column speed + direction. Slightly different durations avoid a robotic,
// in-sync look. Middle column scrolls the opposite way.
const COLUMNS = [
  { duration: "46s", reverse: false },
  { duration: "56s", reverse: true },
  { duration: "50s", reverse: false },
] as const

function ReviewCard({ review }: { review: ReviewData }) {
  return (
    <SenjaReviewCard
      name={review.name}
      avatarUrl={review.avatarUrl}
      rating={review.rating}
      content={review.content}
      date={review.date}
      platformIcon={
        review.platform ? <PlatformIcon platform={review.platform} /> : undefined
      }
    />
  )
}

export function SenjaReviewMarquee({ reviews, className }: SenjaReviewMarqueeProps) {
  // Round-robin into 3 columns so each holds a varied mix.
  const columns: ReviewData[][] = [[], [], []]
  reviews.forEach((r, i) => columns[i % 3].push(r))

  return (
    <div
      className={cn(
        // `group` so any hover pauses every column at once.
        "group relative grid h-[560px] grid-cols-1 gap-6 overflow-hidden sm:h-[680px] sm:grid-cols-2 lg:h-[760px] lg:grid-cols-3",
        className,
      )}
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      {columns.map((col, ci) => (
        <div
          key={ci}
          className={cn(
            "flex flex-col [--marquee-gap:1.5rem] [gap:var(--marquee-gap)]",
            // Reveal columns progressively: 1 (mobile) → 2 (tablet) → 3 (desktop).
            ci === 1 && "hidden sm:flex",
            ci === 2 && "hidden lg:flex",
          )}
        >
          {/* Two identical stacks → seamless loop (keyframe shifts by one stack + gap). */}
          {[0, 1].map((dup) => (
            <div
              key={dup}
              aria-hidden={dup === 1}
              className={cn(
                "flex shrink-0 flex-col [gap:var(--marquee-gap)]",
                "animate-marquee-vertical group-hover:[animation-play-state:paused]",
                "motion-reduce:animate-none",
                COLUMNS[ci].reverse && "[animation-direction:reverse]",
              )}
              style={{ "--marquee-duration": COLUMNS[ci].duration } as CSSProperties}
            >
              {col.map((review, i) => (
                <ReviewCard key={`${dup}-${i}`} review={review} />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
