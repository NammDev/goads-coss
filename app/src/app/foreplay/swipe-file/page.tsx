// Foreplay /swipe-file product page — mirrors source HTML section order exactly
// Sections: ProductHero → Solution (white) → UseCase Carousel → Core Features Tabs + Chrome Extension
//   → Feature Grid 1 → Testimonial 1 → Feature Grid 2 → Testimonial 2 → Product CTA → FAQ → Home CTA

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
  swipeFileHero,
  swipeFileSolution,
  swipeFileUseCases,
  swipeFileCoreFeaturesSection,
  swipeFileCoreFeatureTabs,
  swipeFileFeatureGrid1,
  swipeFileTestimonial1,
  swipeFileFeatureGrid2,
  swipeFileTestimonial2,
  swipeFileProductCta,
  swipeFileFaq,
} from "@/data/foreplay-swipe-file-page-data"
import { SaveIcon, TagIcon, ShareIcon } from "./tab-icons"

// Merge icons into tab data
const tabsWithIcons = swipeFileCoreFeatureTabs.map((tab, i) => ({
  ...tab,
  icon: [<SaveIcon key="save" />, <TagIcon key="tag" />, <ShareIcon key="share" />][i],
}))

export default function SwipeFilePage() {
  return (
    <>
      {/* Section 1: Product Hero (dark bg + dot grid) */}
      <section id="product-hero-section" className="section relative">
        <ForeplayDotBg />
        <ForeplaySectionContainer variant="wide">
          <ForeplayProductHero {...swipeFileHero} />
        </ForeplaySectionContainer>
      </section>

      {/* Section 2: Before/After Solution (white block) */}
      <section className="section">
        {/* .section-padding > .section-white-block */}
        <ForeplaySectionWhiteBlock>
          <ForeplaySectionContainer>
            <ForeplayProductPageSolution {...swipeFileSolution} />
          </ForeplaySectionContainer>
        </ForeplaySectionWhiteBlock>
      </section>

      {/* Section 3: Use Cases Carousel */}
      <div className="section">
        <div className="flex flex-col overflow-hidden py-[108px] max-md:py-24 max-sm:py-20">
          {/* .section-content-main */}
          <div className="block pt-12 max-md:pt-10">
            {/* .container > .section-head */}
            <ForeplaySectionContainer variant="section">
              <ForeplaySectionHead
                subtitle={swipeFileUseCases.subtitle}
                title={swipeFileUseCases.title}
                titleSize="h2"
                description={swipeFileUseCases.description}
                descSize="l"
                variant="light"
              />
            </ForeplaySectionContainer>

            {/* .product-carousel — uses its own container inside */}
            <ForeplayProductUseCaseCarousel cards={swipeFileUseCases.cards} />
          </div>
        </div>
      </div>

      {/* Section 4: Core Features Tabs + Chrome Extension */}
      <div className="section">
        <div className="flex flex-col py-[108px] max-md:py-24 max-sm:py-20">
          <ForeplaySectionContainer>
            {/* .section-head */}
            <ForeplaySectionHead
              subtitle={swipeFileCoreFeaturesSection.subtitle}
              title={swipeFileCoreFeaturesSection.title}
              titleSize="h2"
              description={swipeFileCoreFeaturesSection.description}
              descSize="l"
              variant="light"
            />

            {/* .section-content-main */}
            <div className="block pt-12 max-md:pt-10">
              <ForeplayProductPageFeatureTabs tabs={tabsWithIcons} />

              {/* Chrome Extension banner — nested inside core features section per source */}
              <div className="mt-8">
                <ForeplayHomeChromeExtension />
              </div>
            </div>
          </ForeplaySectionContainer>
        </div>
      </div>

      {/* Section 5-8: All in ONE .container.section-container (1216px) per Foreplay source */}
      <div className="section">
        <div className="flex flex-col py-[108px] max-md:py-24 max-sm:py-20">
          <ForeplaySectionContainer>
            {/* .section-head */}
            <ForeplaySectionHead
              subtitle={swipeFileFeatureGrid1.subtitle}
              title={swipeFileFeatureGrid1.title}
              titleSize="h2"
              description={swipeFileFeatureGrid1.description}
              descSize="l"
              variant="light"
            />
            {/* .section-content-main */}
            <div className="block pt-12 max-md:pt-10">
              <ForeplayProductPageFeatureGridCards cards={swipeFileFeatureGrid1.cards} />
            </div>

            {/* Section 6: Testimonial 1 — .section > .container.w-container (px-10) > .home-testimonial-wrapper */}
            <div className="section">
              <div className="mx-auto w-full px-10">
                <ForeplayProductPageTestimonial {...swipeFileTestimonial1} />
              </div>
            </div>

            {/* Section 7: Feature Grid 2 — .section-content-main */}
            <div className="block pt-12 max-md:pt-10">
              <ForeplayProductPageFeatureGridCards cards={swipeFileFeatureGrid2.cards} />
            </div>

            {/* Section 8: Testimonial 2 — .section > .container.w-container (px-10) */}
            <div className="section">
              <div className="mx-auto w-full px-10">
                <ForeplayProductPageTestimonial {...swipeFileTestimonial2} />
              </div>
            </div>
          </ForeplaySectionContainer>
        </div>
        {/* .negative-spacing-bottom */}
        <div className="mb-[-80px] h-0" />
      </div>

      {/* Section 9: Product CTA Card */}
      <div className="section">
        <ForeplaySectionContainer>
          <ForeplayProductPageCtaCard {...swipeFileProductCta} />
        </ForeplaySectionContainer>
      </div>

      {/* Section 10: FAQ Accordion — .container uses max-w-[1440px] per Foreplay source */}
      <div className="section">
        <ForeplaySectionContainer variant="wide">
          <ForeplayProductPageFaqAccordion {...swipeFileFaq} />
        </ForeplaySectionContainer>
      </div>

      {/* Section 11: Final CTA — .container (1440px) */}
      <div className="section overflow-hidden">
        <ForeplaySectionContainer variant="wide">
          <ForeplayHomeCta />
        </ForeplaySectionContainer>
      </div>

    </>
  )
}
