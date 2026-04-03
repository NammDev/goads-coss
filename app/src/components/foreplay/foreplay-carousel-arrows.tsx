// Foreplay carousel arrows — .slide-arrows + .carousel-arrow (reusable prev/next navigation)
// DOM: .slide-arrows > a.carousel-arrow*2 > .carousel-icon > svg
// .slide-arrows: flex, gap-6 (24px), justify-center, items-center
// .carousel-arrow: bg neutral-800, color neutral-600, cursor-pointer, rounded-full (200vw),
//   flex center, 36x36, transition all 0.2s, relative
// .carousel-arrow:hover: bg neutral-600, color neutral-25
// .carousel-arrow.is-disabled: opacity 0.5, pointer-events none
// .carousel-icon: 18x18
// SVG: stroke currentColor, stroke-opacity 0.44, stroke-width 1.5
//   Previous arrow: path with transform="rotate(180)" transform-origin="center"
//   Next arrow: path without transform

import { cn } from "@/lib/utils"

interface ForeplayCarouselArrowsProps {
  onPrev: () => void
  onNext: () => void
  canPrev: boolean
  canNext: boolean
  className?: string
}

export function ForeplayCarouselArrows({
  onPrev,
  onNext,
  canPrev,
  canNext,
  className,
}: ForeplayCarouselArrowsProps) {
  return (
    /* .slide-arrows */
    <div className={cn("flex items-center justify-center gap-6", className)}>
      {/* Previous — .carousel-arrow */}
      <button
        aria-label="Previous"
        aria-disabled={!canPrev}
        tabIndex={canPrev ? 0 : -1}
        onClick={onPrev}
        className={cn(
          "relative flex size-9 cursor-pointer items-center justify-center rounded-full",
          "bg-secondary text-muted-foreground",
          "transition-all duration-200",
          "hover:bg-border hover:text-foreground",
          !canPrev && "pointer-events-none opacity-50",
        )}
      >
        {/* .carousel-icon */}
        <div className="size-[18px]">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <title>Previous</title>
            <path
              transform="rotate(180)"
              style={{ transformOrigin: "center" }}
              d="M10.5 4.5L15 9L10.5 13.5M14.25 9H3"
              stroke="currentColor"
              strokeOpacity="0.44"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      {/* Next — .carousel-arrow */}
      <button
        aria-label="Next"
        aria-disabled={!canNext}
        tabIndex={canNext ? 0 : -1}
        onClick={onNext}
        className={cn(
          "relative flex size-9 cursor-pointer items-center justify-center rounded-full",
          "bg-secondary text-muted-foreground",
          "transition-all duration-200",
          "hover:bg-border hover:text-foreground",
          !canNext && "pointer-events-none opacity-50",
        )}
      >
        {/* .carousel-icon */}
        <div className="size-[18px]">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <title>Next</title>
            <path
              d="M10.5 4.5L15 9L10.5 13.5M14.25 9H3"
              stroke="currentColor"
              strokeOpacity="0.44"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
    </div>
  )
}
