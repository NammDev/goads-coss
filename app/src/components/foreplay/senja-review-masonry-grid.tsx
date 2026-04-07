// Senja-style masonry grid for review cards — 4 columns, 24px gap
// Cloned from Senja widget: .sj-masonry-grid with CSS columns layout
// Supports "Load More" pagination via initialCount prop

"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { SenjaReviewCard } from "@/components/foreplay/senja-review-card"
import type { ReviewData } from "@/data/goads-reviews-data"

interface SenjaReviewMasonryGridProps {
  reviews: ReviewData[]
  /** Number of reviews to show initially. Omit or 0 = show all. */
  initialCount?: number
  /** Number of reviews to add on each "Load More" click */
  loadMoreCount?: number
  className?: string
}

export function SenjaReviewMasonryGrid({
  reviews,
  initialCount = 0,
  loadMoreCount = 6,
  className,
}: SenjaReviewMasonryGridProps) {
  const showAll = initialCount <= 0
  const [visibleCount, setVisibleCount] = useState(
    showAll ? reviews.length : initialCount,
  )

  const visibleReviews = reviews.slice(0, visibleCount)
  const hasMore = visibleCount < reviews.length

  return (
    <div className="flex flex-col gap-8">
      <div
        className={cn(
          "columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4",
          className,
        )}
      >
        {visibleReviews.map((review, i) => (
          <div key={i} className="mb-6 break-inside-avoid">
            <SenjaReviewCard
              name={review.name}
              avatarUrl={review.avatarUrl}
              rating={review.rating}
              content={review.content}
              date={review.date}
              platformIcon={
                review.platform ? (
                  <PlatformIcon platform={review.platform} />
                ) : undefined
              }
            />
          </div>
        ))}
      </div>

      {/* Load More button — only shown when there are hidden reviews */}
      {!showAll && hasMore && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() =>
              setVisibleCount((prev) =>
                Math.min(prev + loadMoreCount, reviews.length),
              )
            }
            className={cn(
              "cursor-pointer rounded-xl px-8 py-3 text-sm font-semibold",
              "border border-[hsl(0,0%,85%)] bg-white text-[#374151]",
              "transition-colors hover:bg-[#f5f5f5]",
            )}
          >
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  )
}

function PlatformIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "chrome_web_store":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" fill="none">
          <path fill="#4285F4" d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Z" />
          <path fill="#4285F4" d="M24 4C12.954 4 4 12.954 4 24h13.6A7.2 7.2 0 0 1 24 16.8h20.4A20 20 0 0 0 24 4Z" />
          <path fill="#DB4437" d="M4 24c0 11.046 8.954 20 20 20l6.8-11.8A7.2 7.2 0 0 1 17.6 24H4Z" />
          <path fill="#F4B400" d="M30.8 32.2 24 44a20 20 0 0 0 20.4-27.2H31.2A7.16 7.16 0 0 1 30.8 32.2Z" />
          <path fill="#0F9D58" d="M44.4 16.8H24a7.2 7.2 0 0 1 6.8 15.4L24 44c11.046 0 20-8.954 20-20 0-2.48-.46-4.86-1.28-7.04l-.32-.16Z" />
          <circle cx="24" cy="24" r="5.6" fill="#F1F1F1" />
          <circle cx="24" cy="24" r="4.4" fill="#4285F4" />
        </svg>
      )
    case "google":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l2.85-2.22.81-.62Z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" />
        </svg>
      )
    case "telegram":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path fill="#229ED9" d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z" />
          <path fill="#fff" d="m5.43 11.87 11.38-4.39c.53-.19.99.13.82.93l-1.94 9.13c-.14.64-.52.8-.76.49l-3.07-2.26-1.48 1.42c-.16.17-.3.3-.62.3l.22-3.13 5.7-5.15c.25-.22-.05-.34-.38-.13l-7.05 4.44-3.03-.95c-.66-.2-.67-.66.14-.97Z" />
        </svg>
      )
    case "facebook":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path fill="#1877F2" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
        </svg>
      )
    default:
      return null
  }
}
