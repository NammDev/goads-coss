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

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"
import { SectionHead } from "@/components/atoms/section-head"
import { CtaButton } from "@/components/atoms/cta-button"

// Card shape — single source of truth for both default + injected content.
export type HomeFeatureCard = {
  icon: ReactNode
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  isMiddle?: boolean
  image: string
}

// Optional overrides — contact page passes GET IN TOUCH content here.
// Defaults preserve home/payment pages (propless usage) unchanged.
type HomeFeaturesGridProps = {
  subtitle?: string
  title?: string
  description?: string
  cards?: HomeFeatureCard[]
  /** Fade card image top/bottom into the card so a solid-colour panel
      doesn't read as a hard horizontal band (contact/payment SVGs). */
  imageFade?: boolean
}

const defaultCards: HomeFeatureCard[] = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.917 10.833a2.917 2.917 0 1 0 0-5.833 2.917 2.917 0 0 0 0 5.833Z" stroke="currentColor" strokeWidth="1.667" />
        <path d="M3.667 18.667c0-2.3 1.553-4.238 3.668-4.821" stroke="currentColor" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.167 18.667l1.407-4.927a1 1 0 0 1 .96-.907h5.342a1 1 0 0 1 .96 1.335l-1.16 4.06a1 1 0 0 1-.962.44H11.167Zm0 0H7.833" stroke="currentColor" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Direct access, anytime",
    description: "Message us on Telegram, WhatsApp or Discord and get a real answer from a real person, around the clock, no tickets, no waiting.",
    ctaLabel: "Contact Us",
    ctaHref: "/contact",
    image: "/landing/community/support.webp",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.333 17.833h3.334M8.667 20.333h6.666C16.254 20.333 17 19.587 17 18.667V5.333C17 4.413 16.254 3.667 15.333 3.667H8.667C7.746 3.667 7 4.413 7 5.333v13.334c0 .92.746 1.666 1.667 1.666Z" stroke="currentColor" strokeWidth="1.667" strokeLinecap="round" />
      </svg>
    ),
    title: "Tools that do the work",
    description: "Free extensions and utilities we built to fix what Meta breaks, BM invites, cookie login, 2FA and more. No cost, no catch.",
    ctaLabel: "View Tools",
    ctaHref: "/tools",
    isMiddle: true,
    image: "/assets/extension-tool.webp",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.667" />
        <path d="M12 5v2m0 10v2m-7-7h2m10 0h2m-2.95-4.95-1.41 1.41m-5.66 5.66-1.42 1.42m0-8.49 1.42 1.42m5.66 5.66 1.41 1.41" stroke="currentColor" strokeWidth="1.667" strokeLinecap="round" />
      </svg>
    ),
    title: "Stay in the loop",
    description: "Policy shifts, new products and insider playbooks, straight from the GOADS team, before they cost you a campaign.",
    ctaLabel: "Read the Blog",
    ctaHref: "/blog",
    image: "/landing/community/blog.webp",
  },
]

export function HomeFeaturesGrid({
  subtitle = "SUPPORT & RESOURCES",
  title = "Support that never sleeps",
  description = "A direct line to our team, the tools we built to beat Meta's headaches, and updates that keep you in front of every platform change.",
  cards = defaultCards,
  imageFade = false,
}: HomeFeaturesGridProps = {}) {
  return (
    <div className="py-27">
      <div className="mx-auto flex max-w-[1152px] flex-col gap-12">
        {/* .section-head (REUSE) */}
        <SectionHead
          subtitle={subtitle}
          title={title}
          titleTag="h2" titleSize="h2"
          description={description}
          descSize="l"
          variant="light"
        />

        {/* .lens-security-grid: 3 cols desktop; ≤991 → 1 col, max-w-480 centered (Foreplay) */}
        <div className="grid auto-cols-fr grid-cols-3 rounded-[28px] border border-[var(--solid-700)] max-fp-lg:mx-auto max-fp-lg:max-w-[480px] max-fp-lg:grid-cols-1">
          {cards.map((card, i) => (
            <div
              key={i}
              className={cn(
                // .lens-security-card
                "flex flex-col px-6 pt-6 pb-6",
                // .is-middle: border-l+r on the 3-col desktop; on the 1-col mobile
                // stack switch to border-t+b so it separates the stacked cards.
                card.isMiddle && "border-x border-[var(--solid-700)] max-fp-lg:border-x-0 max-fp-lg:border-y",
              )}
            >
              {/* .lens-security-card-head */}
              <div className="flex items-center gap-2 text-foreground">
                <div className="flex size-6 items-center justify-center">{card.icon}</div>
                <h3 className={siteText.labelM}>
                  {card.title}
                </h3>
              </div>

              {/* .lens-security-card-body.home-card-body: h-auto, -mx-6.
                  Empty image → "Illustration coming soon" placeholder
                  (same pattern as foreplay-product-page-feature-grid-cards). */}
              <div className="-mx-6 h-auto">
                {card.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={card.image}
                    alt={card.title}
                    className={cn(
                      "w-full",
                      // fade top/bottom into the card so a solid-colour panel
                      // doesn't cut across as a hard horizontal band
                      imageFade &&
                        "[mask-image:linear-gradient(to_bottom,transparent,#000_22%,#000_78%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_22%,#000_78%,transparent)]",
                    )}
                    loading="lazy"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="flex aspect-[2/1] w-full items-center justify-center border-y border-dashed border-[var(--solid-700)] bg-[var(--alpha-700)] text-[var(--alpha-100)]"
                  >
                    <span className={siteText.overline}>Illustration coming soon</span>
                  </div>
                )}
              </div>

              {/* .lens-security-card-footer > .card-button-holder: flex-1 pushes to bottom */}
              <div className="flex flex-1 [text-wrap:balance]">
                <div className="flex flex-1 flex-col items-start justify-end gap-[15px] pt-[15px]">
                  <div className="text-[var(--alpha-50)]">
                    <div className={siteText.bodyM}>
                      {card.description}
                    </div>
                  </div>
                  <div className="-ml-2.5">
                    <CtaButton href={card.ctaHref} variant="ghost">
                      {card.ctaLabel}
                    </CtaButton>
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
