// Foreplay product CTA card — .cta > .cta-block
// DOM: .container.section-container > .cta > .cta-block > .cta-block-content + .cta-block-animation + .cta-block-icon
// DESKTOP: .cta: py-20. .cta-block: bg bg, ring solid-700, rounded-[36px], p-[84px], relative, overflow-hidden
//   .cta-block-content: z-1, flex col, gap-8, max-w-[66%], relative
//   .cta-block-animation: z-0, mix-blend-lighten, 880x880, absolute inset(-50% -25% 0% auto)
//   .cta-block-icon-image: display:none (desktop)
// TABLET: .cta: py-[10em]. .cta-block: p-16 pb-0. .cta-block-content: max-w-none
//   .cta-block-animation: hidden. .cta-block-icon: flex col center. .cta-block-icon-image: 300x300 block
// MOBILE: .cta: py-[5em]. .cta-block: pt-8 px-8 pb-0. .cta-block-icon-image: 256x256 mb-[-64px]

import type { ReactNode } from "react"
import { ForeplayCtaButton } from "@/components/foreplay/foreplay-cta-button"
import { fpText } from "@/components/foreplay/foreplay-typography"

interface ForeplayProductPageCtaCardProps {
  title: string
  description: ReactNode
  ctaLabel?: string
  ctaHref?: string
  videoSrc?: string
  iconSrc?: string
  iconAlt?: string
}

export function ForeplayProductPageCtaCard({
  title,
  description,
  ctaLabel = "Start Free Trial",
  ctaHref = "/sign-up",
  videoSrc,
  iconSrc,
  iconAlt = "",
}: ForeplayProductPageCtaCardProps) {
  return (
    // .cta — desktop: py-20 (80px)
    <div className="py-20">
      {/* .cta-block — desktop: p-[84px], tablet: p-16 pb-0, mobile: pt-8 px-8 pb-0 */}
      <div className="relative overflow-hidden rounded-[36px] bg-background p-[84px] shadow-[0_0_0_1px_var(--fp-solid-700)] max-md:px-16 max-md:pt-16 max-md:pb-0 max-sm:px-8 max-sm:pt-8 max-sm:pb-0">
        {/* .cta-block-content — desktop: z-1, flex col, gap-8 (32px), max-w-[66%], relative */}
        <div className="relative z-[1] flex max-w-[66%] flex-col gap-8 max-md:max-w-none">
          {/* .flex-col-gap-2.align-start.text-balance */}
          <div className="flex flex-col items-start gap-2 [text-wrap:balance]">
            {/* .text-white: color #fff + flex:1 > h2.text-display-h3.mobile-landscape-text-display-h4 */}
            <div className="flex-1 text-foreground">
              <h2 className={`${fpText.displayH3} max-sm:text-[1.75rem] max-sm:leading-[2.25rem]`}>{title}</h2>
            </div>
            {/* .text-alpha-100: color + flex:1 > .text-balance > p.text-body-l.mobile-landscape-text-body-n */}
            <div className="flex-1 text-[var(--fp-alpha-100)]">
              <div className="[text-wrap:balance]">
                <p className={`${fpText.bodyL} max-sm:text-base max-sm:leading-6 whitespace-pre-line`}>{description}</p>
              </div>
            </div>
          </div>

          {/* .flex-col-gap-3 — gap-3 (12px), items-start */}
          <div className="flex flex-col items-start gap-3">
            <ForeplayCtaButton href={ctaHref} variant="hero">
              {ctaLabel}
            </ForeplayCtaButton>

            {/* .no-cc-required: display:none > .flex-gap-2 — gap-2, items-center */}
            <div className="hidden items-center gap-2">
              {/* .icon-20 — 20x20 */}
              <div className="size-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="20" height="20" viewBox="0 0 20 20">
                  <path
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeOpacity=".68"
                    strokeWidth="1.5"
                    d="M2.3 8.13v6.24c0 .92.74 1.67 1.66 1.67h7.29M2.29 8.13v-2.5c0-.92.75-1.67 1.67-1.67h12.08c.92 0 1.66.74 1.66 1.66v2.5m-15.4 0h15.4m0 0v1.25M17.8 12.6l-1.76 1.77m0 0-1.77 1.77m1.77-1.77-1.77-1.77m1.77 1.77 1.76 1.77"
                  />
                </svg>
              </div>
              {/* .text-alpha-100 > .text-label-s */}
              <div className="text-[var(--fp-alpha-100)]">
                <div className={fpText.labelS}>No credit card required</div>
              </div>
            </div>
          </div>
        </div>

        {/* .cta-block-animation — desktop: absolute, z-0, 880x880, mix-blend-lighten */}
        {/* tablet+mobile: hidden (display:none via media override) */}
        {videoSrc && (
          <div className="absolute top-[-50%] right-[-25%] bottom-0 left-auto z-0 size-[880px] mix-blend-lighten max-md:hidden">
            <video autoPlay loop muted playsInline className="size-full" style={{ margin: 0, padding: 0 }}>
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        )}

        {/* Desktop static-icon variant — only when no videoSrc. Anchored right, vertically centered,
            sized to roughly match the visual weight the 880px video had in the right column. */}
        {!videoSrc && iconSrc && (
          <div className="pointer-events-none absolute inset-y-0 right-[84px] z-0 hidden items-center justify-center max-md:hidden md:flex">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={iconSrc}
              alt={iconAlt}
              className="size-[280px] object-contain"
              loading="lazy"
            />
          </div>
        )}

        {/* .cta-block-icon — tablet/mobile only (desktop: icon-image is display:none) */}
        {iconSrc && (
          <div className="hidden flex-col items-center justify-center max-md:flex max-md:mt-6 max-sm:mt-6">
            {/* .cta-block-icon-image — tablet: 300x300 block, mobile: 256x256 mb-[-64px] */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={iconSrc}
              alt={iconAlt}
              className="hidden size-[300px] max-w-none max-md:block max-sm:mb-[-64px] max-sm:size-64"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  )
}
