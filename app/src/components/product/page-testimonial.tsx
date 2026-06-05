// Foreplay product page testimonial — .home-testimonial-wrapper (centered quote with laurel decorations)
// DOM: .section > .container.w-container > .home-testimonial-wrapper > .testemonial-contents
// .home-testimonial-wrapper: py-[120px] (desktop), py-[108px] (tablet), py-20 (mobile), relative
// .testemonial-contents: flex col, gap-6, text-center, items-center, max-w-[80%] (desktop) / max-w-[640px] (mobile), mx-auto
// .testimonial-logo-image: object-contain, w-24 (96px) max-h-10 (40px) — last CSS definition wins
// .text-quote: color body, 1.5em/150% (desktop), 1.2em (tablet), 1em (mobile)
// .testimonial-bio: flex, gap-4, items-center
// .testimonial-author-image: rounded-[5px], 48x48 (desktop), 40x40 (mobile)
// .testimonial-avatar-text: text-left
// .testimonial-decoration: opacity-0.7, w-12%, absolute, left-0, top/bottom 50%, translateY(-50%)
// .testimonial-decoration.is-right: right-0

import { siteText } from "@/components/atoms/typography"

interface ProductPageTestimonialProps {
  logoSrc?: string
  logoAlt?: string
  quote: string
  authorName: string
  authorRole: string
  authorImageSrc: string
  decorationLeftSrc?: string
  decorationRightSrc?: string
}

export function ProductPageTestimonial({
  logoSrc,
  logoAlt = "",
  quote,
  authorName,
  authorRole,
  authorImageSrc,
  decorationLeftSrc = "/assets/test_left.svg",
  decorationRightSrc = "/assets/test_right.svg",
}: ProductPageTestimonialProps) {
  return (
    <div className="relative py-[120px] max-md:py-[108px] max-sm:py-20">
      {/* .testemonial-contents — max-w 80% desktop; ≤991px (max-fp-lg) → 640px */}
      <div className="mx-auto flex max-w-[80%] flex-col items-center gap-6 text-center max-fp-lg:max-w-[640px]">
        {/* .testimonial-logo-image */}
        {logoSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoSrc}
            alt={logoAlt}
            width={96}
            height={40}
            className="max-h-10 w-24 object-contain"
            loading="lazy"
          />
        )}

        {/* .text-quote */}
        <div className="text-[var(--alpha-100)] text-[1.5em] leading-[150%] max-md:text-[1.2em] max-sm:text-[1em]">
          &quot;{quote}&quot;
        </div>

        {/* .testimonial-bio */}
        <div className="flex items-center gap-4">
          {/* .testimonial-author-image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={authorImageSrc}
            alt={authorName}
            className="size-12 rounded-[5px] max-sm:size-10"
            loading="lazy"
          />
          {/* .testimonial-avatar-text */}
          <div className="text-left">
            <div className="text-foreground">
              <div className={siteText.labelM}>{authorName}</div>
            </div>
            <div className="text-[var(--alpha-100)]">
              <div className={siteText.bodyM}>{authorRole}</div>
            </div>
          </div>
        </div>
      </div>

      {/* .testimonial-decoration (left) — ≤991px: shift out left:-10% + h-full;
          ≤479px: width 40% (per testi-res.css). SVG preserves its aspect. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={decorationLeftSrc}
        alt=""
        className="absolute top-1/2 left-0 w-[12%] -translate-y-1/2 opacity-70 max-fp-lg:left-[-10%] max-fp-lg:h-full max-fp-sm:w-[40%]"
        loading="lazy"
      />
      {/* .testimonial-decoration.is-right — ≤991px: shift out right:-10% + h-full */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={decorationRightSrc}
        alt=""
        className="absolute top-1/2 right-0 w-[12%] -translate-y-1/2 opacity-70 max-fp-lg:right-[-10%] max-fp-lg:h-full max-fp-sm:w-[40%]"
        loading="lazy"
      />
    </div>
  )
}
