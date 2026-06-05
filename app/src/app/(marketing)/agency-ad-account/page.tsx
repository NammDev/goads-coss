// Foreplay /agency-ad-account — 100% cloned from /foreplay/swipe-file
// Identical composition, data, and layout. Only the default-export name differs.
// tab-icons imported from sibling swipe-file route to avoid duplication.

import { DotBg } from "@/components/atoms/dot-bg"
import { SectionContainer } from "@/components/atoms/section-container"
import { SectionHead } from "@/components/atoms/section-head"
import { SectionWhiteBlock } from "@/components/atoms/section-white-block"
import { HomeChromeExtension } from "@/components/home/chrome-extension"
import { HomeCta } from "@/components/home/cta"
import { ProductHero } from "@/components/product/hero"
import { ProductPageSolution } from "@/components/product/page-solution-before-after"
import { ProductUseCaseCarousel } from "@/components/product/use-case-carousel"
import { ProductPageFeatureTabs } from "@/components/product/page-feature-tabs"
import { ProductPageFeatureGridCards } from "@/components/product/page-feature-grid-cards"
import { ProductPageTestimonial } from "@/components/product/page-testimonial"
import { ProductPageCtaCard } from "@/components/product/page-cta-card"
import { ProductPageFaqAccordion } from "@/components/product/page-faq-accordion"
import {
  AgencyDisabledAccountMockup,
  AgencyWhitelistedAccountMockup,
} from "@/components/solution/agency-ad-account-mockups"
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
} from "@/data/agency-ad-account-page-data"
import { SaveIcon, TagIcon, ShareIcon } from "@/components/misc/swipe-file-tab-icons"

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
        <DotBg />
        <SectionContainer variant="wide">
          <ProductHero {...agencyAdAccountHero} />
        </SectionContainer>
      </section>

      {/* Section 2: Before/After Solution (white block).
          Override each card's trailing visual with an inline status-widget mockup
          so the section visualizes "disabled account / $0 spend" vs "whitelisted /
          unlimited spend" instead of the generic Foreplay swipe-file image. */}
      <section className="section">
        <SectionWhiteBlock>
          <SectionContainer>
            <ProductPageSolution
              {...agencyAdAccountSolution}
              before={{ ...agencyAdAccountSolution.before, visual: <AgencyDisabledAccountMockup /> }}
              after={{ ...agencyAdAccountSolution.after, visual: <AgencyWhitelistedAccountMockup /> }}
            />
          </SectionContainer>
        </SectionWhiteBlock>
      </section>

      {/* Section 3: Use Cases Carousel */}
      <div className="section">
        <div className="flex flex-col overflow-hidden py-[108px] max-md:py-24 max-sm:py-20">
          <div className="block pt-12 max-md:pt-10">
            <SectionContainer variant="section">
              <SectionHead
                subtitle={agencyAdAccountUseCases.subtitle}
                title={agencyAdAccountUseCases.title}
                titleSize="h2"
                description={agencyAdAccountUseCases.description}
                descSize="l"
                variant="light"
              />
            </SectionContainer>

            <ProductUseCaseCarousel cards={agencyAdAccountUseCases.cards} />
          </div>
        </div>
      </div>

      {/* Section 4: Core Features Tabs + Chrome Extension */}
      <div className="section">
        <div className="flex flex-col py-[108px] max-md:py-24 max-sm:py-20">
          <SectionContainer>
            <SectionHead
              subtitle={agencyAdAccountCoreFeaturesSection.subtitle}
              title={agencyAdAccountCoreFeaturesSection.title}
              titleSize="h2"
              description={agencyAdAccountCoreFeaturesSection.description}
              descSize="l"
              variant="light"
            />

            <div className="block pt-12 max-md:pt-10">
              <ProductPageFeatureTabs tabs={tabsWithIcons} />

              <div className="mt-8 max-fp-sm:hidden">
                <HomeChromeExtension />
              </div>
            </div>
          </SectionContainer>
        </div>
      </div>

      {/* Section 5-8: Feature Grids + Testimonials (single container) */}
      <div className="section">
        <div className="flex flex-col py-[108px] max-md:py-24 max-sm:py-20">
          <SectionContainer>
            <SectionHead
              subtitle={agencyAdAccountFeatureGrid1.subtitle}
              title={agencyAdAccountFeatureGrid1.title}
              titleSize="h2"
              description={agencyAdAccountFeatureGrid1.description}
              descSize="l"
              variant="light"
            />
            <div className="block pt-12 max-md:pt-10">
              <ProductPageFeatureGridCards cards={agencyAdAccountFeatureGrid1.cards} />
            </div>

            {/* Section 6: Testimonial 1 */}
            <div className="section">
              <div className="mx-auto w-full px-10">
                <ProductPageTestimonial {...agencyAdAccountTestimonial1} />
              </div>
            </div>

            {/* Section 7: Feature Grid 2 */}
            <div className="block pt-12 max-md:pt-10">
              <ProductPageFeatureGridCards cards={agencyAdAccountFeatureGrid2.cards} />
            </div>

            {/* Section 8: Testimonial 2 */}
            <div className="section">
              <div className="mx-auto w-full px-10">
                <ProductPageTestimonial {...agencyAdAccountTestimonial2} />
              </div>
            </div>
          </SectionContainer>
        </div>
        <div className="mb-[-80px] h-0" />
      </div>

      {/* Section 9: Product CTA Card */}
      <div className="section">
        <SectionContainer>
          <ProductPageCtaCard {...agencyAdAccountProductCta} contentClassName="md:max-w-[72%]" />
        </SectionContainer>
      </div>

      {/* Section 10: FAQ Accordion */}
      <div className="section">
        <SectionContainer variant="wide">
          <ProductPageFaqAccordion {...agencyAdAccountFaq} />
        </SectionContainer>
      </div>

      {/* Section 11: Final CTA */}
      <div className="section overflow-hidden">
        <SectionContainer variant="wide">
          <HomeCta />
        </SectionContainer>
      </div>
    </>
  )
}
