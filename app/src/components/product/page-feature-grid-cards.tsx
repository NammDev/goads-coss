// Foreplay product page feature grid — .product-page-feature-grid-new (3-col grid of feature cards)
// DOM: .section-content-main > .w-layout-grid.product-page-feature-grid-new > .product-page-feature-block-new*
// .product-page-feature-grid-new: z-4, grid 3col (2col tablet, 1col mobile), gap-6, rounded-xl, relative, overflow-hidden
// .product-page-feature-block-new: z-1, border 1px solid-700, rounded-[20px], flex col, p-0, relative, overflow-hidden, hover bg solid-900
// .product-page-feature-image: self-center, w-full, h-auto
// .product-page-feature-content: flex-1, flex, justify-start, items-end, p-6
// .product-page-feature-text: flex col, gap-2

import Link from "next/link"
import { siteText } from "@/components/atoms/typography"

// Product cards (the "Everything You Need to Scale" grid) link to their route.
// Resource/article cards and feature-attribute cards don't match → stay static.
const PRODUCT_ROUTES: Record<string, string> = {
  "Business Manager": "/bm",
  "Facebook Profiles": "/profiles",
  "Facebook Pages": "/pages",
  "Unban Service": "/unban",
  "Verified Badge": "/blue-verification",
  "TikTok Assets": "/tiktok-accounts",
  "Free Tools": "/tools",
}

interface FeatureCard {
  /** Image at top of card. Omit (or pass empty string) to render a "coming soon" placeholder block. */
  imageSrc?: string
  imageAlt?: string
  title: string
  description: string
  /** Explicit destination; falls back to PRODUCT_ROUTES[title] when omitted. */
  href?: string
}

interface ProductPageFeatureGridCardsProps {
  cards: FeatureCard[]
}

export function ProductPageFeatureGridCards({
  cards,
}: ProductPageFeatureGridCardsProps) {
  return (
    <div className="relative z-[4] grid auto-cols-fr grid-cols-3 gap-6 overflow-hidden rounded-xl max-md:grid-cols-2 max-sm:grid-cols-1">
      {cards.map((card, i) => {
        const href = card.href ?? PRODUCT_ROUTES[card.title]
        const interactive = Boolean(href)
        // Base card. NO border-colour / ring change on hover (that reads as a
        // tacky white outline). Instead a soft internal light-sheen fades in
        // from the top + image zoom + arrow — signature 500ms cubic-bezier.
        // The static solid-700 hairline never changes. Static cards stay flat.
        const cardClass = [
          "group relative z-[1] flex flex-col items-stretch justify-start overflow-hidden rounded-[20px] border border-[var(--solid-700)] p-0",
          interactive
            ? "cursor-pointer no-underline transition-colors duration-[500ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:bg-[var(--solid-900)]"
            : "transition-colors duration-200 hover:bg-[var(--solid-900)]",
        ].join(" ")
        const inner = (
          <>
            {/* Hover sheen — soft light glow from the top, fades in. No edges,
                no outline. Sits above the image, below the text. */}
            {interactive && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-[500ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:opacity-100 [background:radial-gradient(120%_90%_at_50%_0%,rgba(255,255,255,0.07),transparent_55%)]"
              />
            )}
            {/* .product-page-feature-image — real image OR 2:1 "coming soon" placeholder
                when card.imageSrc is empty (e.g. /pages page while final illustrations are pending). */}
            {card.imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={card.imageSrc}
                alt={card.imageAlt ?? card.title}
                className="h-auto w-full self-center transition-transform duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.04]"
                loading="lazy"
              />
            ) : (
              <div
                aria-hidden="true"
                className="flex aspect-[2/1] w-full items-center justify-center self-center border-b border-dashed border-[var(--solid-700)] bg-[var(--alpha-700)] text-[var(--alpha-100)]"
              >
                <span className={siteText.overline}>Illustration coming soon</span>
              </div>
            )}
            {/* .product-page-feature-content */}
            <div className="relative z-[2] flex flex-1 items-end justify-start p-6">
              <div className="w-full text-foreground">
                {/* .product-page-feature-text */}
                <div className="flex flex-col gap-2">
                  <h3 className={`${siteText.labelM} flex items-center justify-between gap-2`}>
                    <span>{card.title}</span>
                    {interactive && (
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-[var(--alpha-100)] opacity-0 -translate-x-1 transition-all duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-0 group-hover:opacity-100"
                      >
                        <svg viewBox="0 0 20 20" width="18" height="18" fill="none">
                          <path d="M7 13l6-6m0 0H8m5 0v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    )}
                  </h3>
                  <div className="text-[var(--alpha-100)]">
                    <p className={siteText.bodyM}>{card.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
        return href ? (
          <Link key={i} href={href} className={cardClass}>
            {inner}
          </Link>
        ) : (
          <div key={i} className={cardClass}>
            {inner}
          </div>
        )
      })}
    </div>
  )
}
