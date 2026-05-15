// Foreplay /aboutus — hero (trust pill + 2-line title) + testimonials section
// Section order:
//   1. Hero — trust pill badge (stars + avatars + count) + 2-tone title + description + CTA
//   2. Testimonials section (3 GOADS customer story cards)
//   3. Final CTA banner

import {
  ForeplaySectionContainer,
  ForeplaySectionHead,
  ForeplayHomeCta,
  ForeplayCtaButton,
  fpText,
} from "@/components/foreplay"
import { ForeplayUniversityHero } from "@/components/foreplay/foreplay-university-hero"
import { ForeplaySolutionTestimonialCard } from "@/components/foreplay/foreplay-solution-testimonial-card"
import {
  aboutusHero,
  aboutusTestimonialsSection,
  aboutusTestimonials,
} from "@/data/goads-aboutus-page-data"
import { cn } from "@/lib/utils"

export default function ForeplayAboutusPage() {
  return (
    <>
      {/* ═══ Section 1: Hero — 2-tone title + description + CTA (trust pill removed) ═══ */}
      <ForeplayUniversityHero
        {...aboutusHero}
        title={
          <>
            <span className="text-foreground">Meet the Team Behind Your</span>
            <br />
            <span className="text-[var(--fp-alpha-100)]">Advertising Success</span>
          </>
        }
      >
        <div className="flex flex-col items-center gap-8 pt-3 pb-10 max-md:gap-6 max-md:pb-6">
          {/* Description */}
          <p className="max-w-[820px] text-center font-sans text-[1.0625rem] font-normal leading-[1.6] tracking-[-0.0125em] text-[var(--fp-alpha-50)] [text-wrap:balance]">
            We combine operational experience, platform knowledge, and dedicated support to help brands scale campaigns with confidence.
          </p>

          {/* Single CTA — Learn More */}
          <ForeplayCtaButton href="#testimonials" variant="hero">
            Learn More
          </ForeplayCtaButton>
        </div>
      </ForeplayUniversityHero>

      {/* ═══ Section 2: Testimonials (3 GOADS team intros) ═══ */}
      <div id="testimonials" className="section">
        {/* pt reduced from 108→64 to pull section title closer to hero */}
        <div className="flex flex-col pt-16 pb-[108px] max-md:pt-12 max-md:pb-24 max-sm:pt-10 max-sm:pb-20">
          <ForeplaySectionContainer>
            <ForeplaySectionHead
              subtitle={aboutusTestimonialsSection.subtitle}
              title={aboutusTestimonialsSection.title}
              titleSize="h2"
              description={aboutusTestimonialsSection.description}
              descSize="l"
              variant="light"
            />

            <div className="flex flex-col gap-16 pt-12 max-md:pt-10">
              {aboutusTestimonials.map((t, i) => (
                <ForeplaySolutionTestimonialCard key={i} {...t} />
              ))}
            </div>
          </ForeplaySectionContainer>
        </div>
      </div>

      {/* ═══ Section 3: Final CTA Banner ═══ */}
      <div className="section overflow-hidden">
        <ForeplaySectionContainer variant="wide">
          <ForeplayHomeCta />
        </ForeplaySectionContainer>
      </div>
    </>
  )
}
