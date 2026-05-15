// Foreplay solution testimonial card — .industries-testimonial
// Large card with quote left + background image right, different from product page testimonial
// .industries-testimonial: border 1px neutral-700, rounded-[20px], flex col, items-start, p-12, relative, overflow-hidden
// .industries-testimonial-content: z-1, flex col, gap-[74px], relative
// .industries-testimonial-link: self-start, transition 0.2s, hover opacity 0.8
// .industries-testimonial-logo: max-w-[125px], max-h-[75px]
// .industries-testimonial-copy: max-w-none (full card width — text wraps to ~4 lines, card stays short)
// .industries-testimonial-bio: flex, gap-3, items-center
// .industires-testimonial-headshot: rounded-[10px], 64x64
// .industry-testimonial-image-holder: absolute, h-full, inset 0% 0% 0% auto (desktop), static + rounded (mobile)
// .industry-testimonial-bg: h-full
// .industry-testimonial-image-fade: absolute inset-0, gradient left fade (desktop), none (mobile)

import { fpText } from "@/components/foreplay/foreplay-typography"

interface ForeplaySolutionTestimonialCardProps {
  /** Image logo source (used when logoText not provided) */
  logoSrc?: string
  logoAlt?: string
  logoHref?: string
  /** Text logo alternative (overrides image — e.g. "GOADS Team") */
  logoText?: string
  quote: string
  /** Bio block (avatar + name + role) — all 3 are optional; bio hidden when authorName empty */
  authorName?: string
  authorRole?: string
  authorImageSrc?: string
  bgImageSrc: string
  bgImageAlt?: string
}

export function ForeplaySolutionTestimonialCard({
  logoSrc, logoAlt = "", logoHref = "#", logoText,
  quote, authorName = "", authorRole = "", authorImageSrc = "",
  bgImageSrc, bgImageAlt = "",
}: ForeplaySolutionTestimonialCardProps) {
  return (
    // .industries-testimonial
    <div className="relative flex flex-col items-start overflow-hidden rounded-[20px] border border-[#ffffff1a] p-12 max-md:p-6 max-sm:p-3">
      {/* .industries-testimonial-content */}
      <div className="relative z-[1] flex flex-col gap-[74px] max-md:gap-12 max-md:pt-6">
        {/* .industries-testimonial-link > logo (text or image) */}
        <a href={logoHref} target="_blank" rel="noopener noreferrer" className="self-start transition-all duration-200 hover:opacity-80">
          {logoText ? (
            // Styled text logo — Inter Display semibold, foreground color
            <div className="font-display text-xl font-semibold leading-tight tracking-tight text-foreground [font-optical-sizing:auto]">
              {logoText}
            </div>
          ) : logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoSrc} alt={logoAlt} className="max-h-[75px] max-w-[125px]" loading="lazy" />
          ) : null}
        </a>

        {/* .industries-testimonial-copy — full card width, no max constraint */}
        <div className="max-w-none">
          <div className="text-foreground">
            <blockquote className={fpText.displayH5}>&ldquo;{quote}&rdquo;</blockquote>
          </div>
        </div>

        {/* .industries-testimonial-bio — hidden when authorName empty (e.g. content-only cards) */}
        {authorName && (
          <div className="flex items-center gap-4">
            {/* .industires-testimonial-headshot — 80×80 */}
            {authorImageSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={authorImageSrc} alt={authorName} className="size-20 rounded-[10px] object-cover" loading="lazy" />
            )}
            {/* .industries-testimonial-bio-content — name labelL (18px), role bodyM (16px) */}
            <div className="flex flex-col">
              <div className="text-foreground"><div className={fpText.labelL}>{authorName}</div></div>
              {authorRole && (
                <div className="text-[var(--fp-alpha-100)]"><div className={fpText.bodyM}>{authorRole}</div></div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* .industry-testimonial-image-holder — only renders when bgImageSrc provided */}
      {bgImageSrc && (
        <div className="absolute inset-y-0 right-0 left-auto h-full max-md:static max-md:order-first max-md:overflow-hidden max-md:rounded-[15px] max-md:border max-md:border-[#ffffff1a]">
          {/* .industry-testimonial-bg */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={bgImageSrc} alt={bgImageAlt} className="h-full object-cover" loading="lazy" />
          {/* .industry-testimonial-image-fade — gradient fade on desktop, none on mobile */}
          <div
            className="absolute inset-0 max-md:hidden"
            style={{ backgroundImage: "linear-gradient(90deg, #020308, #02030900)" }}
          />
        </div>
      )}
    </div>
  )
}
