// Foreplay product page feature grid — .product-page-feature-grid-new (3-col grid of feature cards)
// DOM: .section-content-main > .w-layout-grid.product-page-feature-grid-new > .product-page-feature-block-new*
// .product-page-feature-grid-new: z-4, grid 3col (2col tablet, 1col mobile), gap-6, rounded-xl, relative, overflow-hidden
// .product-page-feature-block-new: z-1, border 1px solid-700, rounded-[20px], flex col, p-0, relative, overflow-hidden, hover bg solid-900
// .product-page-feature-image: self-center, w-full, h-auto
// .product-page-feature-content: flex-1, flex, justify-start, items-end, p-6
// .product-page-feature-text: flex col, gap-2

import { fpText } from "@/components/foreplay/foreplay-typography"

interface FeatureCard {
  /** Image at top of card. Omit (or pass empty string) to render a "coming soon" placeholder block. */
  imageSrc?: string
  imageAlt?: string
  title: string
  description: string
}

interface ForeplayProductPageFeatureGridCardsProps {
  cards: FeatureCard[]
}

export function ForeplayProductPageFeatureGridCards({
  cards,
}: ForeplayProductPageFeatureGridCardsProps) {
  return (
    <div className="relative z-[4] grid auto-cols-fr grid-cols-3 gap-6 overflow-hidden rounded-xl max-md:grid-cols-2 max-sm:grid-cols-1">
      {cards.map((card, i) => (
        <div
          key={i}
          className="relative z-[1] flex flex-col items-stretch justify-start overflow-hidden rounded-[20px] border border-[var(--fp-solid-700)] p-0 transition-colors duration-200 hover:bg-[var(--fp-solid-900)]"
        >
          {/* .product-page-feature-image — real image OR 2:1 "coming soon" placeholder
              when card.imageSrc is empty (e.g. /pages page while final illustrations are pending). */}
          {card.imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={card.imageSrc}
              alt={card.imageAlt ?? card.title}
              className="h-auto w-full self-center"
              loading="lazy"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex aspect-[2/1] w-full items-center justify-center self-center border-b border-dashed border-[var(--fp-solid-700)] bg-[var(--fp-alpha-700)] text-[var(--fp-alpha-100)]"
            >
              <span className={fpText.overline}>Illustration coming soon</span>
            </div>
          )}
          {/* .product-page-feature-content */}
          <div className="flex flex-1 items-end justify-start p-6">
            <div className="text-foreground">
              {/* .product-page-feature-text */}
              <div className="flex flex-col gap-2">
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
  )
}
