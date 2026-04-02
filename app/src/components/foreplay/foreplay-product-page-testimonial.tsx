// Foreplay product page testimonial — .home-testimonial-wrapper (centered quote with laurel decorations)
// DOM: .section > .container.w-container > .home-testimonial-wrapper > .testemonial-contents
// .home-testimonial-wrapper: py-[120px] (desktop), py-[108px] (tablet), py-20 (mobile), relative
// .testemonial-contents: flex col, gap-6, text-center, items-center, max-w-[80%] (desktop) / max-w-[640px] (mobile), mx-auto
// .testimonial-logo-image: object-contain, w-[120px] max-h-12 (desktop), w-24 max-h-10 (mobile)
// .text-quote: color body, 1.5em/150% (desktop), 1.2em (tablet), 1em (mobile)
// .testimonial-bio: flex, gap-4, items-center
// .testimonial-author-image: rounded-[5px], 48x48 (desktop), 40x40 (mobile)
// .testimonial-avatar-text: text-left
// .testimonial-decoration: opacity-0.7, w-12%, absolute, left-0, top/bottom 50%, translateY(-50%)
// .testimonial-decoration.is-right: right-0

import { fpText } from "@/components/foreplay/foreplay-typography"

interface ForeplayProductPageTestimonialProps {
  logoSrc?: string
  logoAlt?: string
  quote: string
  authorName: string
  authorRole: string
  authorImageSrc: string
  decorationLeftSrc?: string
  decorationRightSrc?: string
}

export function ForeplayProductPageTestimonial({
  logoSrc,
  logoAlt = "",
  quote,
  authorName,
  authorRole,
  authorImageSrc,
  decorationLeftSrc = "https://cdn.prod.website-files.com/62a4ed18ddad95dde8b8bfa4/642db6082db5f7803a7a121e_award-left.svg",
  decorationRightSrc = "https://cdn.prod.website-files.com/62a4ed18ddad95dde8b8bfa4/642db608b19bd600e001723a_awward-right.svg",
}: ForeplayProductPageTestimonialProps) {
  return (
    <div className="relative py-[120px] max-md:py-[108px] max-sm:py-20">
      {/* .testemonial-contents */}
      <div className="mx-auto flex max-w-[80%] flex-col items-center gap-6 text-center max-sm:max-w-[640px]">
        {/* .testimonial-logo-image */}
        {logoSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoSrc}
            alt={logoAlt}
            width={120}
            height={48}
            className="max-h-12 w-[120px] object-contain max-sm:max-h-10 max-sm:w-24"
            loading="lazy"
          />
        )}

        {/* .text-quote */}
        <div className="text-[color:var(--body)] text-[1.5em] leading-[150%] max-md:text-[1.2em] max-sm:text-[1em]">
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
              <div className={fpText.labelM}>{authorName}</div>
            </div>
            <div className="text-[var(--fp-alpha-100)]">
              <div className={fpText.bodyM}>{authorRole}</div>
            </div>
          </div>
        </div>
      </div>

      {/* .testimonial-decoration (left) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={decorationLeftSrc}
        alt=""
        className="absolute top-1/2 left-0 w-[12%] -translate-y-1/2 opacity-70 max-md:w-[20%] max-sm:w-[40%]"
        loading="lazy"
      />
      {/* .testimonial-decoration.is-right */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={decorationRightSrc}
        alt=""
        className="absolute top-1/2 right-0 w-[12%] -translate-y-1/2 opacity-70 max-md:w-[20%] max-sm:w-[40%]"
        loading="lazy"
      />
    </div>
  )
}
