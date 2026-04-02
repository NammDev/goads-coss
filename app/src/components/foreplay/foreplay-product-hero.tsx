// Foreplay product hero — .product-hero (reusable across product pages)
// DOM: section.relative > .dot-bg + .container > .product-hero > .product-hero-sticky > .product-hero-icon + .product-hero-content + .product-hero-preview
// .product-hero: flex col, center, pt-[64px] pb-0 (desktop), pt-[24px] pb-[24px] (mobile)
// .product-hero-sticky: flex col, center, relative top-0 (mobile override)
// .product-hero-icon: p-8 (desktop), p-6 (mobile)
// .product-hero-icon-image: 128x128 (desktop), 108x108 (mobile)
// .product-hero-content: flex col, gap-7 (28px desktop), gap-6 (24px mobile), pb-6, relative
// .product-hero-preview: aspect-[16/10], flex col, center, self-stretch, mt-[52px] mb-[-48px], relative, overflow-clip

import { ForeplayCtaButton } from "@/components/foreplay/foreplay-cta-button"
import { fpText } from "@/components/foreplay/foreplay-typography"

interface ForeplayProductHeroProps {
  iconSrc: string
  iconVideoSrc?: string  // .product-hero-icon-video — animated icon overlay
  overline: string
  title: string
  description: string
  ctaLabel?: string
  ctaHref?: string
  previewImageSrc: string
  previewVideoSrc?: string  // .product-hero-video — big monitor preview video
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
}: ForeplayProductHeroProps) {
  return (
    <div className="flex flex-col items-center pt-16 pb-0 text-center max-md:pt-6 max-md:pb-6">
      {/* .product-hero-sticky */}
      <div className="relative top-0 flex flex-col items-center">
        {/* .product-hero-icon — 256x256 desktop, auto with p-8 on tablet, p-6 mobile */}
        <div className="relative p-8 max-md:p-6">
          {/* .product-hero-icon-video — animated icon video overlay */}
          {iconVideoSrc && (
            <div className="absolute inset-0 z-[1]">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="size-full object-contain"
              >
                <source src={iconVideoSrc} type={iconVideoSrc.endsWith(".webm") ? "video/webm" : "video/mp4"} />
              </video>
            </div>
          )}
          {/* .product-hero-icon-image — static fallback, hidden when video plays */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={iconSrc}
            alt={`${overline} icon`}
            width={128}
            height={128}
            className={`size-32 max-md:size-[108px] ${iconVideoSrc ? "invisible" : ""}`}
            loading="eager"
          />
        </div>

        {/* .product-hero-content */}
        <div className="relative flex flex-col items-center gap-7 pb-6 max-md:gap-6">
          {/* .text-overline.text-white-68 */}
          <h1 className={`text-[var(--fp-alpha-300)] ${fpText.overline}`}>
            {overline}
          </h1>

          {/* .hero-text */}
          <div>
            <h2 className={`text-foreground ${fpText.displayH1}`}>
              {title}
            </h2>
            {/* .max-w-lg > .text-alpha-100 > p.text-body-l.text-white-84 */}
            <div className="mx-auto mt-4 max-w-lg">
              <div className="text-[var(--fp-alpha-100)]">
                <p className={fpText.bodyL}>{description}</p>
              </div>
            </div>
          </div>

          <ForeplayCtaButton href={ctaHref} variant="hero">
            {ctaLabel}
          </ForeplayCtaButton>
        </div>
      </div>

      {/* .product-hero-preview */}
      <div className="relative mt-[52px] mb-[-48px] flex aspect-[16/10] flex-col items-center self-stretch overflow-clip max-md:mt-10">
        {/* .product-hero-video — video behind the mockup frame */}
        {previewVideoSrc && (
          <div className="absolute top-[6.6%] left-[11%] z-[1] flex aspect-[1400/730] w-[77.8%] items-center justify-center overflow-hidden [transform:rotateX(7deg)_rotateY(0)_rotate(0)]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="size-full object-cover"
            >
              <source src={previewVideoSrc} type={previewVideoSrc.endsWith(".webm") ? "video/webm" : "video/mp4"} />
            </video>
          </div>
        )}

        {/* .product-hero-preview-image — monitor mockup */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={previewImageSrc}
          alt="Product preview"
          width={1440}
          height={900}
          className="pointer-events-none relative z-[2] aspect-[16/10] w-full"
          loading="eager"
        />
      </div>
    </div>
  )
}
