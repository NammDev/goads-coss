// Foreplay /industries/ecommerce — Solutions page for E-Commerce brands
// Sections: SolutionHero + LogoCarousel → Testimonials → ProductTabs → Examples → HomeCTA

import {
  ForeplaySectionContainer,
  ForeplaySectionHead,
  ForeplayHomeCta,
} from "@/components/foreplay"
import { ForeplaySolutionProductTabs } from "@/components/foreplay/foreplay-solution-product-tabs"
import { ForeplaySolutionHero } from "@/components/foreplay/foreplay-solution-hero"
import { ForeplaySolutionLogoCarousel } from "@/components/foreplay/foreplay-solution-logo-carousel"
import { ForeplaySolutionTestimonialCard } from "@/components/foreplay/foreplay-solution-testimonial-card"
import { ForeplaySolutionExamplesGrid } from "@/components/foreplay/foreplay-solution-examples-grid"
import {
  ecommerceHero,
  ecommerceLogos,
  ecommerceTestimonialsSection,
  ecommerceTestimonials,
  ecommerceProductTabsSection,
  ecommerceExamplesSection,
  ecommerceExamples,
} from "@/data/foreplay-ecommerce-solution-page-data"

export default function EcommerceSolutionPage() {
  return (
    <>
      {/* Section 1: Solution Hero + Logo Carousel */}
      <div className="section">
        <ForeplaySectionContainer>
          <ForeplaySolutionHero
            icon={<EcommerceIcon />}
            subtitle={ecommerceHero.subtitle}
            title={ecommerceHero.title}
            description={ecommerceHero.description}
          />
        </ForeplaySectionContainer>

        {/* .industries-carousel-container — full width within container */}
        <ForeplaySolutionLogoCarousel logos={ecommerceLogos} />
      </div>

      {/* Section 2: Testimonials */}
      <div className="section">
        <div className="flex flex-col py-[108px] max-md:py-24 max-sm:py-20">
          <ForeplaySectionContainer>
            <ForeplaySectionHead
              subtitle={ecommerceTestimonialsSection.subtitle}
              title={ecommerceTestimonialsSection.title}
              titleSize="h2"
              description={ecommerceTestimonialsSection.description}
              descSize="l"
              variant="light"
            />

            {/* .industries-testimonial-wrapper */}
            <div className="flex flex-col gap-16 pt-12 max-md:pt-10">
              {ecommerceTestimonials.map((t, i) => (
                <ForeplaySolutionTestimonialCard key={i} {...t} />
              ))}
            </div>
          </ForeplaySectionContainer>
        </div>
      </div>

      {/* Section 3: Product Tabs (5 Apps in One) — tabbed showcase, 1 visible at a time */}
      <section className="section">
        <ForeplaySolutionProductTabs
          subtitle={ecommerceProductTabsSection.subtitle}
          title={ecommerceProductTabsSection.title}
          description={ecommerceProductTabsSection.description}
        />
      </section>

      {/* Section 4: Examples Grid */}
      <div className="section">
        <div className="flex flex-col py-[108px] max-md:py-24 max-sm:py-20">
          <ForeplaySectionContainer>
            <ForeplaySectionHead
              subtitle={ecommerceExamplesSection.subtitle}
              title={ecommerceExamplesSection.title}
              titleSize="h2"
              description={ecommerceExamplesSection.description}
              descSize="l"
              variant="light"
            />
            <div className="block pt-12 max-md:pt-10">
              <ForeplaySolutionExamplesGrid cards={ecommerceExamples} />
            </div>
          </ForeplaySectionContainer>
        </div>
      </div>

      {/* Section 5: Final CTA — reuse */}
      <div className="section overflow-hidden">
        <ForeplaySectionContainer>
          <ForeplayHomeCta />
        </ForeplaySectionContainer>
      </div>
    </>
  )
}

// Ecommerce shopping bag icon from source HTML
function EcommerceIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 10.667a4 4 0 1 1-8 0M6.511 7.834l-1 16c-.096 1.535 1.123 2.833 2.662 2.833h15.656c1.538 0 2.757-1.298 2.661-2.833l-1-16a2.67 2.67 0 0 0-2.661-2.5H9.173a2.67 2.67 0 0 0-2.662 2.5Z"
        stroke="white"
        strokeWidth="2.667"
        strokeLinecap="round"
      />
    </svg>
  )
}
