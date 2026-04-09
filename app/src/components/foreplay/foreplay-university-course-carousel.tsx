// Foreplay University course carousel — .university-classes-carousel
// Source: direct child of div.container.section-container (1216px container provided by parent hero)
// .university-classes-carousel: flex, gap-24px, justify-center, pt-50px pb-50px, mx-auto
// .cards-wrapper-new: perspective-1000px, inline-block, relative, cursor-pointer
// .cards-wrapper-new._2: opacity-0.5
// .cards-wrapper-new._3: opacity-0.25
// Desktop: _2 and _3 visible. Mobile: hidden

import { cn } from "@/lib/utils"
import { ForeplayUniversityCourseCard } from "./foreplay-university-course-card"
import type { CourseCardData } from "@/data/foreplay-university-classes-page-data"

interface ForeplayUniversityCourseCarouselProps {
  cards: CourseCardData[]
}

const opacityMap = {
  _2: "opacity-50",
  _3: "opacity-25",
} as const

export function ForeplayUniversityCourseCarousel({
  cards,
}: ForeplayUniversityCourseCarouselProps) {
  return (
    // .university-classes-carousel
    <div className="flex justify-center gap-6 pt-[50px] pb-[50px]">
      {cards.map((card, i) => (
        <div
          key={i}
          className={cn(
            // .cards-wrapper-new
            "relative inline-block cursor-pointer [perspective:1000px]",
            // opacity variants — hidden on mobile
            card.opacityVariant && opacityMap[card.opacityVariant],
            card.opacityVariant && "max-md:hidden",
          )}
        >
          <ForeplayUniversityCourseCard {...card} />
        </div>
      ))}
    </div>
  )
}
