// Foreplay /tiktok-agency — 100% cloned from /foreplay/swipe-file
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
  tiktokAgencyHero,
  tiktokAgencySolution,
  tiktokAgencyUseCases,
  tiktokAgencyCoreFeaturesSection,
  tiktokAgencyCoreFeatureTabs,
  tiktokAgencyFeatureGrid1,
  tiktokAgencyTestimonial1,
  tiktokAgencyFeatureGrid2,
  tiktokAgencyTestimonial2,
  tiktokAgencyProductCta,
  tiktokAgencyFaq,
} from "@/data/goads-tiktok-agency-page-data"
import { SaveIcon, TagIcon, ShareIcon } from "../swipe-file/tab-icons"

// Merge icons into tab data
const tabsWithIcons = tiktokAgencyCoreFeatureTabs.map((tab, i) => ({
  ...tab,
  icon: [<SaveIcon key="save" />, <TagIcon key="tag" />, <ShareIcon key="share" />][i],
}))

export default function TiktokAgencyPage() {
  return (
    <>
      {/* Section 1: Product Hero (dark bg + dot grid) */}
      <section id="product-hero-section" className="section relative">
        <ForeplayDotBg />
        <ForeplaySectionContainer variant="wide">
          <ForeplayProductHero {...tiktokAgencyHero} />
        </ForeplaySectionContainer>
      </section>

      {/* Section 2: Before/After Solution (white block) */}
      <section className="section">
        <ForeplaySectionWhiteBlock>
          <ForeplaySectionContainer>
            <ForeplayProductPageSolution {...tiktokAgencySolution} />
          </ForeplaySectionContainer>
        </ForeplaySectionWhiteBlock>
      </section>

      {/* Section 3: Use Cases Carousel */}
      <div className="section">
        <div className="flex flex-col overflow-hidden py-[108px] max-md:py-24 max-sm:py-20">
          <div className="block pt-12 max-md:pt-10">
            <ForeplaySectionContainer variant="section">
              <ForeplaySectionHead
                subtitle={tiktokAgencyUseCases.subtitle}
                title={tiktokAgencyUseCases.title}
                titleSize="h2"
                description={tiktokAgencyUseCases.description}
                descSize="l"
                variant="light"
              />
            </ForeplaySectionContainer>

            <ForeplayProductUseCaseCarousel cards={tiktokAgencyUseCases.cards} />
          </div>
        </div>
      </div>

      {/* Section 4: Core Features Tabs + Chrome Extension */}
      <div className="section">
        <div className="flex flex-col py-[108px] max-md:py-24 max-sm:py-20">
          <ForeplaySectionContainer>
            <ForeplaySectionHead
              subtitle={tiktokAgencyCoreFeaturesSection.subtitle}
              title={tiktokAgencyCoreFeaturesSection.title}
              titleSize="h2"
              description={tiktokAgencyCoreFeaturesSection.description}
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
              subtitle={tiktokAgencyFeatureGrid1.subtitle}
              title={tiktokAgencyFeatureGrid1.title}
              titleSize="h2"
              description={tiktokAgencyFeatureGrid1.description}
              descSize="l"
              variant="light"
            />
            <div className="block pt-12 max-md:pt-10">
              <ForeplayProductPageFeatureGridCards cards={tiktokAgencyFeatureGrid1.cards} />
            </div>

            {/* Section 6: Testimonial 1 */}
            <div className="section">
              <div className="mx-auto w-full px-10">
                <ForeplayProductPageTestimonial {...tiktokAgencyTestimonial1} />
              </div>
            </div>

            {/* Section 7: Feature Grid 2 */}
            <div className="block pt-12 max-md:pt-10">
              <ForeplayProductPageFeatureGridCards cards={tiktokAgencyFeatureGrid2.cards} />
            </div>

            {/* Section 8: Testimonial 2 */}
            <div className="section">
              <div className="mx-auto w-full px-10">
                <ForeplayProductPageTestimonial {...tiktokAgencyTestimonial2} />
              </div>
            </div>
          </ForeplaySectionContainer>
        </div>
        <div className="mb-[-80px] h-0" />
      </div>

      {/* Section 9: Product CTA Card */}
      <div className="section">
        <ForeplaySectionContainer>
          <ForeplayProductPageCtaCard {...tiktokAgencyProductCta} />
        </ForeplaySectionContainer>
      </div>

      {/* Section 10: FAQ Accordion */}
      <div className="section">
        <ForeplaySectionContainer variant="wide">
          <ForeplayProductPageFaqAccordion {...tiktokAgencyFaq} />
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
