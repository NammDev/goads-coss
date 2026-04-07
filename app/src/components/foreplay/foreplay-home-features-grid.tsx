// Foreplay features grid — .lens-security inside "Miles beyond the status quo" section
// DOM: .lens-security > .section-head + .lens-security-grid > .lens-security-card x3
// .lens-security: flex col, gap-12 (48px via grid-row-gap), max-w-[1152px], mx-auto
// .lens-security-grid: grid 3 cols, border 1px solid-700, rounded-[28px]
// .lens-security-card: flex col, p-6 pb-4 (24px 24px 16px)
// .lens-security-card.is-middle: border-left + border-right solid-700
// .lens-security-card-head: flex, gap-2, items-center, color white
// .lens-security-card-body.home-card-body: h-auto, -mx-6
// .lens-security-card-footer: text-wrap balance
// .card-button-holder: flex col, gap-[15px], flex-1, justify-end, pt-[15px]

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplaySectionHead } from "@/components/foreplay/foreplay-section-head"
import { ForeplayCtaButton } from "@/components/foreplay/foreplay-cta-button"

const cards = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.917 10.833a2.917 2.917 0 1 0 0-5.833 2.917 2.917 0 0 0 0 5.833Z" stroke="currentColor" strokeWidth="1.667" />
        <path d="M3.667 18.667c0-2.3 1.553-4.238 3.668-4.821" stroke="currentColor" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.167 18.667l1.407-4.927a1 1 0 0 1 .96-.907h5.342a1 1 0 0 1 .96 1.335l-1.16 4.06a1 1 0 0 1-.962.44H11.167Zm0 0H7.833" stroke="currentColor" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Direct access anytime",
    description: "Reach us on Telegram, WhatsApp or Discord. Real answers from real people, 24/7.",
    ctaLabel: "Contact Us",
    ctaHref: "/talk-to-sales",
    image: "/foreplay/feature_1.webp",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.333 17.833h3.334M8.667 20.333h6.666C16.254 20.333 17 19.587 17 18.667V5.333C17 4.413 16.254 3.667 15.333 3.667H8.667C7.746 3.667 7 4.413 7 5.333v13.334c0 .92.746 1.666 1.667 1.666Z" stroke="currentColor" strokeWidth="1.667" strokeLinecap="round" />
      </svg>
    ),
    title: "Built to save you time",
    description: "Extensions and tools we built to fix what Meta breaks. Free for all users.",
    ctaLabel: "View Tools",
    ctaHref: "/tools",
    isMiddle: true,
    image: "/foreplay/feature_2.webp",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.667" />
        <path d="M12 5v2m0 10v2m-7-7h2m10 0h2m-2.95-4.95-1.41 1.41m-5.66 5.66-1.42 1.42m0-8.49 1.42 1.42m5.66 5.66 1.41 1.41" stroke="currentColor" strokeWidth="1.667" strokeLinecap="round" />
      </svg>
    ),
    title: "Stay in the loop",
    description: "Platform changes, new products, insider tips. Fresh updates straight from us.",
    ctaLabel: "Learn More",
    ctaHref: "/blog",
    image: "/foreplay/feature_3.webp",
  },
]

export function ForeplayHomeFeaturesGrid() {
  return (
    <div className="py-27">
      <div className="mx-auto flex max-w-[1152px] flex-col gap-12">
        {/* .section-head (REUSE) */}
        <ForeplaySectionHead
          subtitle="COMMUNITY & RESOURCES"
          title="Stay connected, stay ahead"
          titleTag="h2" titleSize="h2"
          description="Tools, updates, and direct access to our team. Everything to keep you moving."
          descSize="l"
          variant="light"
        />

        {/* .lens-security-grid: 3 cols, border solid-700, rounded-[28px] */}
        <div className="grid auto-cols-fr grid-cols-3 rounded-[28px] border border-[var(--fp-solid-700)]">
          {cards.map((card, i) => (
            <div
              key={i}
              className={cn(
                // .lens-security-card
                "flex flex-col px-6 pt-6 pb-6",
                // .is-middle: border-left + border-right
                card.isMiddle && "border-x border-[var(--fp-solid-700)]",
              )}
            >
              {/* .lens-security-card-head */}
              <div className="flex items-center gap-2 text-foreground">
                <div className="flex size-6 items-center justify-center">{card.icon}</div>
                <h3 className={fpText.labelM}>
                  {card.title}
                </h3>
              </div>

              {/* .lens-security-card-body.home-card-body: h-auto, -mx-6 */}
              <div className="-mx-6 h-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full"
                  loading="lazy"
                />
              </div>

              {/* .lens-security-card-footer > .card-button-holder: flex-1 pushes to bottom */}
              <div className="flex flex-1 [text-wrap:balance]">
                <div className="flex flex-1 flex-col items-start justify-end gap-[15px] pt-[15px]">
                  <div className="text-[var(--fp-alpha-50)]">
                    <div className={fpText.bodyM}>
                      {card.description}
                    </div>
                  </div>
                  <div className="-ml-2.5">
                    <ForeplayCtaButton href={card.ctaHref} variant="ghost">
                      {card.ctaLabel}
                    </ForeplayCtaButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
