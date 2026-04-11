// Foreplay /agency-ad-account — 100% cloned from /foreplay/swipe-file
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
  agencyAdAccountHero,
  agencyAdAccountSolution,
  agencyAdAccountUseCases,
  agencyAdAccountCoreFeaturesSection,
  agencyAdAccountCoreFeatureTabs,
  agencyAdAccountFeatureGrid1,
  agencyAdAccountTestimonial1,
  agencyAdAccountFeatureGrid2,
  agencyAdAccountTestimonial2,
  agencyAdAccountProductCta,
  agencyAdAccountFaq,
} from "@/data/goads-agency-ad-account-page-data"
import { SaveIcon, TagIcon, ShareIcon } from "../swipe-file/tab-icons"

// Merge icons into tab data
const tabsWithIcons = agencyAdAccountCoreFeatureTabs.map((tab, i) => ({
  ...tab,
  icon: [<SaveIcon key="save" />, <TagIcon key="tag" />, <ShareIcon key="share" />][i],
}))

export default function AgencyAdAccountPage() {
  return (
    <>
      {/* Section 1: Product Hero (dark bg + dot grid) */}
      <section id="product-hero-section" className="section relative">
        <ForeplayDotBg />
        <ForeplaySectionContainer variant="wide">
          <ForeplayProductHero {...agencyAdAccountHero} />
        </ForeplaySectionContainer>
      </section>

      {/* Section 2: Before/After Solution (white block) */}
      <section className="section">
        <ForeplaySectionWhiteBlock>
          <ForeplaySectionContainer>
            <ForeplayProductPageSolution {...agencyAdAccountSolution} />
          </ForeplaySectionContainer>
        </ForeplaySectionWhiteBlock>
      </section>

      {/* Section 3: Use Cases Carousel */}
      <div className="section">
        <div className="flex flex-col overflow-hidden py-[108px] max-md:py-24 max-sm:py-20">
          <div className="block pt-12 max-md:pt-10">
            <ForeplaySectionContainer variant="section">
              <ForeplaySectionHead
                subtitle={agencyAdAccountUseCases.subtitle}
                title={agencyAdAccountUseCases.title}
                titleSize="h2"
                description={agencyAdAccountUseCases.description}
                descSize="l"
                variant="light"
              />
            </ForeplaySectionContainer>

            <ForeplayProductUseCaseCarousel cards={agencyAdAccountUseCases.cards} />
          </div>
        </div>
      </div>

      {/* Section 4: Core Features Tabs + Chrome Extension */}
      <div className="section">
        <div className="flex flex-col py-[108px] max-md:py-24 max-sm:py-20">
          <ForeplaySectionContainer>
            <ForeplaySectionHead
              subtitle={agencyAdAccountCoreFeaturesSection.subtitle}
              title={agencyAdAccountCoreFeaturesSection.title}
              titleSize="h2"
              description={agencyAdAccountCoreFeaturesSection.description}
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
              subtitle={agencyAdAccountFeatureGrid1.subtitle}
              title={agencyAdAccountFeatureGrid1.title}
              titleSize="h2"
              description={agencyAdAccountFeatureGrid1.description}
              descSize="l"
              variant="light"
            />
            <div className="block pt-12 max-md:pt-10">
              <ForeplayProductPageFeatureGridCards cards={agencyAdAccountFeatureGrid1.cards} />
            </div>

            {/* Section 6: Testimonial 1 */}
            <div className="section">
              <div className="mx-auto w-full px-10">
                <ForeplayProductPageTestimonial {...agencyAdAccountTestimonial1} />
              </div>
            </div>

            {/* Section 7: Feature Grid 2 */}
            <div className="block pt-12 max-md:pt-10">
              <ForeplayProductPageFeatureGridCards cards={agencyAdAccountFeatureGrid2.cards} />
            </div>

            {/* Section 8: Testimonial 2 */}
            <div className="section">
              <div className="mx-auto w-full px-10">
                <ForeplayProductPageTestimonial {...agencyAdAccountTestimonial2} />
              </div>
            </div>
          </ForeplaySectionContainer>
        </div>
        <div className="mb-[-80px] h-0" />
      </div>

      {/* Section 9: Product CTA Card */}
      <div className="section">
        <ForeplaySectionContainer>
          <ForeplayProductPageCtaCard {...agencyAdAccountProductCta} />
        </ForeplaySectionContainer>
      </div>

      {/* Section 10: FAQ Accordion */}
      <div className="section">
        <ForeplaySectionContainer variant="wide">
          <ForeplayProductPageFaqAccordion {...agencyAdAccountFaq} />
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
