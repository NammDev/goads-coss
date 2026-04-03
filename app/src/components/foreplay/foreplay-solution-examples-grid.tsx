// Foreplay solution examples grid — .industries-examples-grid
// 3-col grid of case study cards showing brand ads
// .industries-examples-grid: grid 3col, gap-4, relative. Tablet: 2col. Mobile: flex col, pt-[75px]
// .industries-examples-card: bg neutral-700, rounded-2xl. Mobile: stacked with negative margin
// .industries-examples-header: flex, gap-2, items-center, p-3
// .industries-examples-avatar: rounded-[6px], w-7
// .industries-examples-header-text: flex-1, flex, items-center
// .industries-examples-content: pb-1, px-1
// .industries-examples-image: rounded-xl, w-full
// .industries-examples-date: flex, gap-2, color neutral-100, items-center, justify-end

import { fpText } from "@/components/foreplay/foreplay-typography"

interface ExampleCard {
  avatarSrc: string
  brandName: string
  date: string
  isActive?: boolean
  imageSrc: string
  imageAlt?: string
}

interface ForeplaySolutionExamplesGridProps {
  cards: ExampleCard[]
}

export function ForeplaySolutionExamplesGrid({ cards }: ForeplaySolutionExamplesGridProps) {
  return (
    // .industries-examples-grid
    <div className="relative grid auto-cols-fr grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:flex max-sm:flex-col max-sm:pt-[75px]">
      {cards.map((card, i) => (
        // .industries-examples-card
        <div key={i} className="rounded-2xl bg-secondary max-sm:rounded-xl">
          {/* .industries-examples-header */}
          <div className="flex items-center gap-2 p-3 max-sm:p-2 max-sm:pl-[9px]">
            {/* .industries-examples-avatar */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={card.avatarSrc} alt={card.brandName} className="w-7 rounded-[6px] max-sm:w-6 max-sm:rounded-[5px]" loading="lazy" />
            {/* .industries-examples-header-text */}
            <div className="flex flex-1 items-center">
              <div className="text-foreground"><div className={fpText.labelS}>{card.brandName}</div></div>
            </div>
            {/* .industries-examples-date */}
            <div className="flex items-center justify-end gap-2 text-muted-foreground">
              {card.isActive && (
                <div className="size-[5px] rounded-full bg-[var(--fp-teal,#10b981)]" />
              )}
              <div className={fpText.bodyS}>{card.date}</div>
            </div>
          </div>
          {/* .industries-examples-content */}
          <div className="px-1 pb-1">
            {/* .industries-examples-image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={card.imageSrc} alt={card.imageAlt ?? card.brandName} className="w-full rounded-xl" loading="lazy" />
          </div>
        </div>
      ))}
    </div>
  )
}
