// Foreplay /google-agency — 100% cloned from /foreplay/swipe-file
// Identical composition, data, and layout. Only the default-export name differs.
// tab-icons imported from sibling swipe-file route to avoid duplication.

import {
  ForeplaySectionContainer,
  ForeplayDotBg,
  ForeplaySectionWhiteBlock,
  ForeplaySectionHead,
  ForeplayHomeChromeExtension,
  ForeplayHomeCta,
} from "@/components/foreplay"
import { ForeplayProductHero } from "@/components/foreplay/foreplay-product-hero"
import { ForeplayProductPageSolution } from "@/components/foreplay/foreplay-product-page-solution-before-after"
import { ForeplayProductUseCaseCarousel } from "@/components/foreplay/foreplay-product-use-case-carousel"
import { ForeplayProductPageFeatureTabs } from "@/components/foreplay/foreplay-product-page-feature-tabs"
import { ForeplayProductPageFeatureGridCards } from "@/components/foreplay/foreplay-product-page-feature-grid-cards"
import { ForeplayProductPageTestimonial } from "@/components/foreplay/foreplay-product-page-testimonial"
import { ForeplayProductPageCtaCard } from "@/components/foreplay/foreplay-product-page-cta-card"
import { ForeplayProductPageFaqAccordion } from "@/components/foreplay/foreplay-product-page-faq-accordion"
import {
  googleAgencyHero,
  googleAgencySolution,
  googleAgencyUseCases,
  googleAgencyCoreFeaturesSection,
  googleAgencyCoreFeatureTabs,
  googleAgencyFeatureGrid1,
  googleAgencyTestimonial1,
  googleAgencyFeatureGrid2,
  googleAgencyTestimonial2,
  googleAgencyProductCta,
  googleAgencyFaq,
} from "@/data/goads-google-agency-page-data"
import { SaveIcon, TagIcon, ShareIcon } from "../swipe-file/tab-icons"

// Merge icons into tab data
const tabsWithIcons = googleAgencyCoreFeatureTabs.map((tab, i) => ({
  ...tab,
  icon: [<SaveIcon key="save" />, <TagIcon key="tag" />, <ShareIcon key="share" />][i],
}))

export default function GoogleAgencyPage() {
  return (
    <>
      {/* Section 1: Product Hero (dark bg + dot grid) */}
      <section id="product-hero-section" className="section relative">
        <ForeplayDotBg />
        <ForeplaySectionContainer variant="wide">
          <ForeplayProductHero {...googleAgencyHero} />
        </ForeplaySectionContainer>
      </section>

      {/* Section 2: Before/After Solution (white block) */}
      <section className="section">
        <ForeplaySectionWhiteBlock>
          <ForeplaySectionContainer>
            <ForeplayProductPageSolution {...googleAgencySolution} />
          </ForeplaySectionContainer>
        </ForeplaySectionWhiteBlock>
      </section>

      {/* Section 3: Use Cases Carousel */}
      <div className="section">
        <div className="flex flex-col overflow-hidden py-[108px] max-md:py-24 max-sm:py-20">
          <div className="block pt-12 max-md:pt-10">
            <ForeplaySectionContainer variant="section">
              <ForeplaySectionHead
                subtitle={googleAgencyUseCases.subtitle}
                title={googleAgencyUseCases.title}
                titleSize="h2"
                description={googleAgencyUseCases.description}
                descSize="l"
                variant="light"
              />
            </ForeplaySectionContainer>

            <ForeplayProductUseCaseCarousel cards={googleAgencyUseCases.cards} />
          </div>
        </div>
      </div>

      {/* Section 4: Core Features Tabs + Chrome Extension */}
      <div className="section">
        <div className="flex flex-col py-[108px] max-md:py-24 max-sm:py-20">
          <ForeplaySectionContainer>
            <ForeplaySectionHead
              subtitle={googleAgencyCoreFeaturesSection.subtitle}
              title={googleAgencyCoreFeaturesSection.title}
              titleSize="h2"
              description={googleAgencyCoreFeaturesSection.description}
              descSize="l"
              variant="light"
            />

            <div className="block pt-12 max-md:pt-10">
              <ForeplayProductPageFeatureTabs tabs={tabsWithIcons} />

              <div className="mt-8">
                <ForeplayHomeChromeExtension />
              </div>
            </div>
          </ForeplaySectionContainer>
        </div>
      </div>

      {/* Section 5-8: Feature Grids + Testimonials (single container) */}
      <div className="section">
        <div className="flex flex-col py-[108px] max-md:py-24 max-sm:py-20">
          <ForeplaySectionContainer>
            <ForeplaySectionHead
              subtitle={googleAgencyFeatureGrid1.subtitle}
              title={googleAgencyFeatureGrid1.title}
              titleSize="h2"
              description={googleAgencyFeatureGrid1.description}
              descSize="l"
              variant="light"
            />
            <div className="block pt-12 max-md:pt-10">
              <ForeplayProductPageFeatureGridCards cards={googleAgencyFeatureGrid1.cards} />
            </div>

            {/* Section 6: Testimonial 1 */}
            <div className="section">
              <div className="mx-auto w-full px-10">
                <ForeplayProductPageTestimonial {...googleAgencyTestimonial1} />
              </div>
            </div>

            {/* Section 7: Feature Grid 2 */}
            <div className="block pt-12 max-md:pt-10">
              <ForeplayProductPageFeatureGridCards cards={googleAgencyFeatureGrid2.cards} />
            </div>

            {/* Section 8: Testimonial 2 */}
            <div className="section">
              <div className="mx-auto w-full px-10">
                <ForeplayProductPageTestimonial {...googleAgencyTestimonial2} />
              </div>
            </div>
          </ForeplaySectionContainer>
        </div>
        <div className="mb-[-80px] h-0" />
      </div>

      {/* Section 9: Product CTA Card */}
      <div className="section">
        <ForeplaySectionContainer>
          <ForeplayProductPageCtaCard {...googleAgencyProductCta} />
        </ForeplaySectionContainer>
      </div>

      {/* Section 10: FAQ Accordion */}
      <div className="section">
        <ForeplaySectionContainer variant="wide">
          <ForeplayProductPageFaqAccordion {...googleAgencyFaq} />
        </ForeplaySectionContainer>
      </div>

      {/* Section 11: Final CTA */}
      <div className="section overflow-hidden">
        <ForeplaySectionContainer variant="wide">
          <ForeplayHomeCta />
        </ForeplaySectionContainer>
      </div>
    </>
  )
}
