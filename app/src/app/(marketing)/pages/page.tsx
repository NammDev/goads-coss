// GoAds /pages product page — Facebook Pages
// Composition mirrors /bm: Hero (text-only) → Comparison Table (Pages first)
//   → Feature Grid 1 + Testimonial 1 → Feature Grid 2 + Testimonial 2 → Product CTA → FAQ → Final CTA

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
  pagesHero,
  pagesFaq,
  pagesFeatureGrid1,
  pagesFeatureGrid1Testimonial,
  pagesFeatureGrid2,
  pagesFeatureGrid2Testimonial,
  pagesProductCta,
} from "@/data/goads-pages-page-data"

// Reorder catalog so the Facebook Pages category sits at index 0 — defaultExpanded={[0]}
// auto-opens the Pages row on this page. No component or shared-data edits.
const pagesFirstCategories = [
  ...catalogCategories.filter((c) => c.name === "Facebook Pages"),
  ...catalogCategories.filter((c) => c.name !== "Facebook Pages"),
]

export default function PagesPage() {
  return (
    <>
      {/* Section 1: Product Hero (text-only) */}
      <section id="product-hero-section" className="section relative">
        <ForeplayDotBg />
        <ForeplaySectionContainer variant="wide">
          <ForeplayProductHero {...pagesHero} />
        </ForeplaySectionContainer>
      </section>

      {/* Section 2: Product Catalog Table (Pages category first) */}
      <ForeplaySectionWhiteBlock className="overflow-visible">
        <ForeplaySectionContainer variant="wide">
          <ForeplayPricingComparison
            title="All Products & Pricing"
            description="Transparent pricing. No hidden fees. Pick what you need."
            hideTooltipBadge
            categories={pagesFirstCategories}
            headerColumns={catalogHeaderColumns}
            defaultExpanded={[0]}
            footerTitle="Need a custom order?"
            footerCtaLabel="Talk to Sales"
            footerCtaHref="/book-demo"
            columns={3}
          />
        </ForeplaySectionContainer>
      </ForeplaySectionWhiteBlock>

      {/* Section 3-6: Feature Grids + Testimonials */}
      <div className="section">
        <div className="flex flex-col py-[108px] max-md:py-24 max-sm:py-20">
          <ForeplaySectionContainer>
            {/* Section 3: Feature Grid 1 */}
            <ForeplaySectionHead
              subtitle={pagesFeatureGrid1.subtitle}
              title={pagesFeatureGrid1.title}
              titleSize="h2"
              description={pagesFeatureGrid1.description}
              descSize="l"
              variant="light"
            />
            <div className="block pt-12 max-md:pt-10">
              <ForeplayProductPageFeatureGridCards cards={pagesFeatureGrid1.cards} />
            </div>

            {/* Section 4: Testimonial — Stefan M. */}
            <div className="section">
              <div className="mx-auto w-full px-10">
                <ForeplayProductPageTestimonial {...pagesFeatureGrid1Testimonial} />
              </div>
            </div>

            {/* Section 5: Feature Grid 2 */}
            <div className="block pt-12 max-md:pt-10">
              <ForeplayProductPageFeatureGridCards cards={pagesFeatureGrid2.cards} />
            </div>

            {/* Section 6: Testimonial — Ryan D. */}
            <div className="section">
              <div className="mx-auto w-full px-10">
                <ForeplayProductPageTestimonial {...pagesFeatureGrid2Testimonial} />
              </div>
            </div>
          </ForeplaySectionContainer>
        </div>
        <div className="mb-[-80px] h-0" />
      </div>

      {/* Section 7: Product CTA Card */}
      <div className="section">
        <ForeplaySectionContainer>
          <ForeplayProductPageCtaCard {...pagesProductCta} />
        </ForeplaySectionContainer>
      </div>

      {/* Section 8: FAQ */}
      <div className="section">
        <ForeplaySectionContainer variant="wide">
          <ForeplayProductPageFaqAccordion {...pagesFaq} />
        </ForeplaySectionContainer>
      </div>

      {/* Section 9: Final CTA */}
      <div className="section overflow-hidden">
        <ForeplaySectionContainer variant="wide">
          <ForeplayHomeCta />
        </ForeplaySectionContainer>
      </div>
    </>
  )
}
