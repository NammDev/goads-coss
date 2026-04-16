// Foreplay product hero — .product-hero (reusable across product pages)
// DOM: section.relative > .dot-bg + .container > .product-hero > .product-hero-animation-trigger + .product-hero-sticky + .product-hero-overlay + .product-hero-preview
// .product-hero: flex col, center, pt-[10px] pb-0 (desktop CSS), pt-[64px] (tablet), pt-[24px] pb-[24px] (mobile)
// .product-hero-animation-trigger: absolute, h-screen, inset -72px 0 auto, pointer-events-none
// .product-hero-sticky: flex col, center, sticky top-[100px] — scroll-animated scale+opacity+translate
// .product-hero-overlay: gradient + box-shadow, covers bottom of sticky, pointer-events-none
// .product-hero-icon: p-8 (desktop), p-6 (mobile), 128x128 image
// .product-hero-content: flex col, gap-7, pb-6, items-center
// .product-hero-preview: aspect-[16/10], mt-[52px] mb-[-48px], overflow-clip, perspective-1000

"use client"

import { ForeplayCtaButton } from "@/components/foreplay/foreplay-cta-button"
import { fpText, FP_HERO_GRADIENT } from "@/components/foreplay/foreplay-typography"
import { useHeroScrollAnimation } from "@/components/foreplay/use-hero-scroll-animation"

interface ForeplayProductHeroProps {
  iconSrc: string
  iconVideoSrc?: string
  overline: string
  title: string
  description: string
  ctaLabel?: string
  ctaHref?: string
  previewImageSrc: string
  /** .product-hero-video.w-embed — inline webm/mp4 video inside monitor */
  previewVideoSrc?: string
  /** .product-hero-video.w-background-video — background video with poster, inside monitor */
  previewBgVideoSrc?: string
  previewBgVideoPoster?: string
}

export function ForeplayProductHero({
  iconSrc,
  iconVideoSrc,
  overline,
  title,
  description,
  ctaLabel = "Start free trial",
  ctaHref = "/sign-up",
  previewImageSrc,
  previewVideoSrc,
  previewBgVideoSrc,
  previewBgVideoPoster,
}: ForeplayProductHeroProps) {
  const { triggerRef, stickyRef } = useHeroScrollAnimation()

  return (
    // .product-hero: flex col, center, pt-[10px] pb-0
    <div className="flex flex-col items-center pt-[10px] pb-0 text-center max-md:pt-16 max-sm:pt-6 max-sm:pb-6">
      {/* .product-hero-animation-trigger: invisible scroll trigger zone */}
      <div
        ref={triggerRef}
        className="pointer-events-none absolute inset-x-0 -top-[72px] h-screen"
        aria-hidden="true"
      />

      {/* .product-hero-sticky: scroll-animated, sticky top-[100px] */}
      <div
        ref={stickyRef}
        className="sticky top-[100px] flex flex-col items-center [transform-style:preserve-3d] [will-change:opacity,transform] max-md:relative max-md:top-0"
        style={{ opacity: 0, transform: "translate3d(0, -33%, 0) scale3d(0.75, 0.75, 1)" }}
      >
        {/* .product-hero-icon — 256x256, mt-[-40px] mb-[-24px] (desktop), p-8 (tablet), p-6 (mobile) */}
        <div className="relative size-64 -mt-10 -mb-6 max-md:size-auto max-md:p-8 max-sm:p-6">
          {/* .product-hero-icon-video — animated icon, fills parent */}
          {iconVideoSrc && (
            <div className="absolute inset-0 z-[1]">
              <video autoPlay loop muted playsInline className="size-full object-contain" style={{ margin: 0, padding: 0 }}>
                <source src={iconVideoSrc} type={iconVideoSrc.endsWith(".webm") ? "video/webm" : "video/mp4"} />
              </video>
            </div>
          )}
          {/* .product-hero-icon-image — 128x128 (tablet), 108x108 (mobile), hidden on desktop when video plays */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={iconSrc}
            alt={`${overline} icon`}
            width={128}
            height={128}
            className={`hidden max-md:block max-md:size-32 max-sm:size-[108px] ${iconVideoSrc ? "invisible" : ""}`}
            loading="eager"
          />
        </div>

        {/* .product-hero-content: flex col, gap-7 (28px desktop), gap-6 + pb-6 + relative (tablet) */}
        <div className="flex flex-col items-center gap-7 max-md:relative max-md:gap-6 max-md:pb-6">
          {/* h1.text-overline.text-white-68 */}
          <h1 className={`text-[var(--fp-alpha-300)] ${fpText.overline}`}>
            {overline}
          </h1>

          {/* .hero-text: flex col, gap-4 (16px), max-w-[900px], items-center. Tablet: gap-3 */}
          <div className="flex max-w-[900px] flex-col items-center gap-4 max-md:gap-3">
            {/* h2.text-display-h1.hero-title: gradient text, balance, responsive sizes */}
            <h2
              className={`${fpText.displayH1} [text-wrap:balance] ${FP_HERO_GRADIENT} max-md:text-[3.25rem] max-md:leading-[3.75rem] max-sm:text-[2.375rem] max-sm:leading-[3rem]`}
            >
              {title}
            </h2>
            {/* .max-w-lg (512px) > .text-alpha-100 (flex-1) > p.text-body-l */}
            <div className="max-w-lg">
              <div className="flex-1 text-[var(--fp-alpha-100)]">
                <p className={fpText.bodyL}>{description}</p>
              </div>
            </div>
          </div>

          {/* a.button-dark.button-primary */}
          <ForeplayCtaButton href={ctaHref} variant="hero">
            {ctaLabel}
          </ForeplayCtaButton>
        </div>
      </div>

      {/* .product-hero-overlay: top fade gradient only.
          FIX (2nd pass): also removed `box-shadow: inset 0 0 48px 32px bg`.
          The inset box-shadow was casting an ~80px dark vignette on ALL
          sides of the 640px overlay. The BOTTOM vignette band overlapped
          the sticky heading at scroll 40-150px — darkening the 2nd line
          of multi-line titles to the background colour, producing the
          "ghost" effect. Top fade gradient alone is enough to blend into
          the page background. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-[linear-gradient(180deg,var(--background),transparent_16%)]"
        aria-hidden="true"
      />

      {/* .product-hero-preview: aspect-[16/10], perspective-1000, mt-52px mb-[-48px], overflow-clip, self-stretch */}
      <div className="relative mt-[52px] mb-[-48px] flex aspect-[16/10] flex-col items-center self-stretch overflow-clip [perspective:1000px] [transform-origin:50%] max-md:mt-10 max-sm:[transform-origin:50%_100%]">
        {/* .product-hero-video.w-embed — inline webm video inside monitor */}
        {previewVideoSrc && (
          <div className="absolute top-[6.6%] left-[11%] z-[1] m-0 flex aspect-[1400/730] w-[77.8%] items-center justify-center overflow-hidden bg-background p-0 [transform-style:preserve-3d] [transform:rotateX(7deg)_rotateY(0)_rotate(0)]">
            <video autoPlay loop muted playsInline className="size-full" style={{ margin: 0, padding: 0 }}>
              <source src={previewVideoSrc} type="video/webm" />
            </video>
          </div>
        )}

        {/* .product-hero-preview-image — monitor mockup frame (z-2) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={previewImageSrc}
          alt="Product preview"
          width={1440}
          height={900}
          className="pointer-events-none relative z-[2] aspect-[16/10] w-full"
          loading="eager"
        />

        {/* .product-hero-preview-underlay — gradient, display:none on desktop */}
        <div
          className="pointer-events-none absolute inset-x-0 -top-[12%] bottom-0 hidden w-screen bg-[linear-gradient(0deg,var(--background)_75%,transparent)]"
          aria-hidden="true"
        />

        {/* .product-hero-video.w-background-video — background video with poster, same position as first video */}
        {previewBgVideoSrc && (
          <div className="absolute top-[6.6%] left-[11%] z-[1] m-0 flex aspect-[1400/730] w-[77.8%] items-center justify-center overflow-hidden bg-background p-0 [transform-style:preserve-3d] [transform:rotateX(7deg)_rotateY(0)_rotate(0)]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-[-100%] m-auto size-full object-cover"
              style={previewBgVideoPoster ? { backgroundImage: `url(${previewBgVideoPoster})`, backgroundSize: "cover", backgroundPosition: "50%" } : undefined}
            >
              <source src={previewBgVideoSrc} type="video/mp4" />
            </video>
          </div>
        )}
      </div>
    </div>
  )
}
