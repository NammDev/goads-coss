// Foreplay solution testimonial card — .industries-testimonial
// Large card with quote left + background image right, different from product page testimonial
// .industries-testimonial: border 1px neutral-700, rounded-[20px], flex col, items-start, p-12, relative, overflow-hidden
// .industries-testimonial-content: z-1, flex col, gap-[74px], relative
// .industries-testimonial-link: self-start, transition 0.2s, hover opacity 0.8
// .industries-testimonial-logo: max-w-[125px], max-h-[75px]
// .industries-testimonial-copy: max-w-[60%] (desktop), max-w-none (mobile)
// .industries-testimonial-bio: flex, gap-3, items-center
// .industires-testimonial-headshot: rounded-[10px], 64x64
// .industry-testimonial-image-holder: absolute, h-full, inset 0% 0% 0% auto (desktop), static + rounded (mobile)
// .industry-testimonial-bg: h-full
// .industry-testimonial-image-fade: absolute inset-0, gradient left fade (desktop), none (mobile)

import { fpText } from "@/components/foreplay/foreplay-typography"

interface ForeplaySolutionTestimonialCardProps {
  logoSrc: string
  logoAlt?: string
  logoHref?: string
  quote: string
  authorName: string
  authorRole: string
  authorImageSrc: string
  bgImageSrc: string
  bgImageAlt?: string
}

export function ForeplaySolutionTestimonialCard({
  logoSrc, logoAlt = "", logoHref = "#",
  quote, authorName, authorRole, authorImageSrc,
  bgImageSrc, bgImageAlt = "",
}: ForeplaySolutionTestimonialCardProps) {
  return (
    // .industries-testimonial
    <div className="relative flex flex-col items-start overflow-hidden rounded-[20px] border border-[#ffffff1a] p-12 max-md:p-6 max-sm:p-3">
      {/* .industries-testimonial-content */}
      <div className="relative z-[1] flex flex-col gap-[74px] max-md:gap-12 max-md:pt-6">
        {/* .industries-testimonial-link > logo */}
        <a href={logoHref} target="_blank" rel="noopener noreferrer" className="self-start transition-all duration-200 hover:opacity-80">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt={logoAlt} className="max-h-[75px] max-w-[125px]" loading="lazy" />
        </a>

        {/* .industries-testimonial-copy */}
        <div className="max-w-[60%] max-md:max-w-none">
          <div className="text-foreground">
            <blockquote className={fpText.displayH4}>&ldquo;{quote}&rdquo;</blockquote>
          </div>
        </div>

        {/* .industries-testimonial-bio */}
        <div className="flex items-center gap-3">
          {/* .industires-testimonial-headshot */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={authorImageSrc} alt={authorName} className="size-16 rounded-[10px]" loading="lazy" />
          {/* .industries-testimonial-bio-content */}
          <div className="flex flex-col">
            <div className="text-foreground"><div className={fpText.labelM}>{authorName}</div></div>
            <div className="text-[var(--fp-alpha-100)]"><div className={fpText.bodyS}>{authorRole}</div></div>
          </div>
        </div>
      </div>

      {/* .industry-testimonial-image-holder — desktop: absolute right, mobile: static */}
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
    </div>
  )
}
