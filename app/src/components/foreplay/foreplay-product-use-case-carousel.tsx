// Foreplay product use-case carousel — .product-carousel (horizontal slide cards with arrows)
// DOM: div.section > .product-page-padding-y > .section-content-main > .container > .section-head + .product-carousel
// .product-carousel: relative
// .product-carousel-viewport: flex col, gap-12 (48px), pt-16 (64px)
// .product-carousel-track: flex, gap-4 (16px), transition transform 0.8s cubic-bezier(.19,1,.22,1)
// .slide: flex-none
// .slide-card: color #1c1d21, rounded-[28px], flex col, w-[39vw] max-w-[576px], min-h-[320px], overflow-hidden, shadow inset 0 0 0 1px #1b1c21
// .product-carousel-image: object-cover, flex-1, w-full h-full
// .product-page-carousel-content: flex-1, p-6
// .product-page-carousel-text-content: z-1, flex col, gap-[7px], color neutral-0, relative
// .slide-arrows: flex, gap-6, center
// .carousel-arrow: bg neutral-800, color neutral-600, rounded-full, 36x36 (44x44 on md), transition, hover bg neutral-600

"use client"

import { useState, useCallback } from "react"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplayCarouselArrows } from "@/components/foreplay/foreplay-carousel-arrows"
import { ForeplaySectionContainer } from "@/components/foreplay/foreplay-section-container"

interface UseCase {
  imageSrc: string
  imageAlt?: string
  title: string
  description: string
}

interface ForeplayProductUseCaseCarouselProps {
  cards: UseCase[]
}

export function ForeplayProductUseCaseCarousel({
  cards,
}: ForeplayProductUseCaseCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const canPrev = currentIndex > 0
  const canNext = currentIndex < cards.length - 1

  const goTo = useCallback((dir: "left" | "right") => {
    setCurrentIndex(prev => {
      if (dir === "left") return Math.max(0, prev - 1)
      return Math.min(cards.length - 1, prev + 1)
    })
  }, [cards.length])

  return (
    <div className="relative">
      {/* .container.section-container */}
      <ForeplaySectionContainer>
        {/* .product-carousel-viewport */}
        <div className="flex flex-col gap-12 pt-16">
          {/* .product-carousel-track */}
          <div
            className="flex items-stretch gap-4 transition-transform duration-[800ms] [transition-timing-function:cubic-bezier(0.19,1,0.22,1)]"
            style={{ transform: `translateX(-${currentIndex * (576 + 16)}px)` }}
          >
            {cards.map((card, i) => (
              /* .slide */
              <div key={i} className="flex-none">
                {/* .slide-card */}
                <div className="flex min-h-[320px] w-[39vw] max-w-[576px] flex-col overflow-hidden rounded-[28px] text-[#1c1d21] shadow-[0_0_0_1px_#1b1c21] max-md:w-[480px] max-sm:w-[calc(100vw-48px)]">
                  {/* .product-carousel-image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.imageSrc}
                    alt={card.imageAlt ?? card.title}
                    className="h-full w-full flex-1 object-cover"
                    loading="lazy"
                  />
                  {/* .product-page-carousel-content */}
                  <div className="flex-1 p-6 max-sm:px-4 max-sm:py-4">
                    {/* .product-page-carousel-text-content */}
                    <div className="relative z-[1] flex flex-col gap-[7px] text-foreground">
                      <h3 className={fpText.labelM}>{card.title}</h3>
                      <div className="text-[var(--fp-alpha-100)]">
                        <p className={fpText.bodyM}>{card.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* .slide-arrows — reusable carousel arrows */}
          <ForeplayCarouselArrows
            onPrev={() => goTo("left")}
            onNext={() => goTo("right")}
            canPrev={canPrev}
            canNext={canNext}
          />
        </div>
      </ForeplaySectionContainer>
    </div>
  )
}
