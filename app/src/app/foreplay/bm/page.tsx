// GoAds /bm product page — 100% cloned from /foreplay/profiles
// Composition: Hero (swipe-file) → Comparison Table (pricing) → Products Grid → Testimonial 1
//   → Resources Grid → Testimonial 2 → FAQ → Final CTA

import {
  ForeplaySectionContainer,
  ForeplayDotBg,
  ForeplaySectionWhiteBlock,
  ForeplaySectionHead,
  ForeplayProductPageFaqAccordion,
  ForeplayHomeCta,
  ForeplayProductPageCtaCard,
} from "@/components/foreplay"
import { ForeplayProductHero } from "@/components/foreplay/foreplay-product-hero"
import { ForeplayProductPageFeatureGridCards } from "@/components/foreplay/foreplay-product-page-feature-grid-cards"
import { ForeplayProductPageTestimonial } from "@/components/foreplay/foreplay-product-page-testimonial"
import { ForeplayPricingComparison } from "@/components/foreplay/foreplay-pricing-comparison"
import { catalogCategories, catalogHeaderColumns } from "@/data/goads-product-catalog-table-data"
import {
  bmHero,
  bmFaq,
  bmFeatureGrid1,
  bmFeatureGrid1Testimonial,
  bmFeatureGrid2,
  bmFeatureGrid2Testimonial,
  bmProductCta,
} from "@/data/goads-bm-page-data"

// Reorder catalog so Business Manager category sits at index 0 — defaultExpanded={[0]}
// will therefore auto-open the BM row on this page. No component or shared-data edits.
const bmFirstCategories = [
  ...catalogCategories.filter((c) => c.name === "Business Manager"),
  ...catalogCategories.filter((c) => c.name !== "Business Manager"),
]

export default function BmPage() {
  return (
    <>
      {/* Section 1: Product Hero (from swipe-file) */}
      <section id="product-hero-section" className="section relative">
        <ForeplayDotBg />
        <ForeplaySectionContainer variant="wide">
          <ForeplayProductHero {...bmHero} />
        </ForeplaySectionContainer>
      </section>

      {/* Section 2: Product Catalog Table (BM category first) */}
      <ForeplaySectionWhiteBlock className="overflow-visible">
        <ForeplaySectionContainer variant="wide">
          <ForeplayPricingComparison
            title="All Products & Pricing"
            description="Transparent pricing. No hidden fees. Pick what you need."
            hideTooltipBadge
            categories={bmFirstCategories}
            headerColumns={catalogHeaderColumns}
            defaultExpanded={[0]}
            footerTitle="Need a custom order?"
            footerCtaLabel="Talk to Sales"
            footerCtaHref="/talk-to-sales"
            columns={3}
          />
        </ForeplaySectionContainer>
      </ForeplaySectionWhiteBlock>

      {/* Section 3-6: Feature Grids + Testimonials (GoAds text, original images/layout) */}
      <div className="section">
        <div className="flex flex-col py-[108px] max-md:py-24 max-sm:py-20">
          <ForeplaySectionContainer>
            {/* Section 5: Feature Grid 1 */}
            <ForeplaySectionHead
              subtitle={bmFeatureGrid1.subtitle}
              title={bmFeatureGrid1.title}
              titleSize="h2"
              description={bmFeatureGrid1.description}
              descSize="l"
              variant="light"
            />
            <div className="block pt-12 max-md:pt-10">
              <ForeplayProductPageFeatureGridCards cards={bmFeatureGrid1.cards} />
            </div>

            {/* Section 6: Testimonial — Stefan M. (with logo + decorations) */}
            <div className="section">
              <div className="mx-auto w-full px-10">
                <ForeplayProductPageTestimonial {...bmFeatureGrid1Testimonial} />
              </div>
            </div>

            {/* Section 7: Feature Grid 2 */}
            <div className="block pt-12 max-md:pt-10">
              <ForeplayProductPageFeatureGridCards cards={bmFeatureGrid2.cards} />
            </div>

            {/* Section 8: Testimonial — Ryan D. (with logo + decorations) */}
            <div className="section">
              <div className="mx-auto w-full px-10">
                <ForeplayProductPageTestimonial {...bmFeatureGrid2Testimonial} />
              </div>
            </div>
          </ForeplaySectionContainer>
        </div>
        <div className="mb-[-80px] h-0" />
      </div>

      <div className="section">
        <ForeplaySectionContainer>
          <ForeplayProductPageCtaCard {...bmProductCta} />
        </ForeplaySectionContainer>
      </div>

      {/* Section 7: FAQ */}
      <div className="section">
        <ForeplaySectionContainer variant="wide">
          <ForeplayProductPageFaqAccordion {...bmFaq} />
        </ForeplaySectionContainer>
      </div>

      {/* Section 8: Final CTA */}
      <div className="section overflow-hidden">
        <ForeplaySectionContainer variant="wide">
          <ForeplayHomeCta />
        </ForeplaySectionContainer>
      </div>
    </>
  )
}
