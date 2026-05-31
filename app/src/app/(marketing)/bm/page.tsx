// GoAds /bm product page — 100% cloned from /profiles
// Composition: Hero (swipe-file) → Comparison Table (pricing) → Products Grid → Testimonial 1
//   → Resources Grid → Testimonial 2 → FAQ → Final CTA

import { DotBg } from "@/components/atoms/dot-bg"
import { SectionContainer } from "@/components/atoms/section-container"
import { SectionHead } from "@/components/atoms/section-head"
import { SectionWhiteBlock } from "@/components/atoms/section-white-block"
import { HomeCta } from "@/components/home/cta"
import { ProductPageCtaCard } from "@/components/product/page-cta-card"
import { ProductPageFaqAccordion } from "@/components/product/page-faq-accordion"
import { ProductHero } from "@/components/product/hero"
import { ProductPageFeatureGridCards } from "@/components/product/page-feature-grid-cards"
import { ProductPageTestimonial } from "@/components/product/page-testimonial"
import { PricingComparison } from "@/components/pricing/comparison"
import { catalogCategories, catalogHeaderColumns } from "@/data/product-catalog-table-data"
import {
  bmHero,
  bmFaq,
  bmFeatureGrid1,
  bmFeatureGrid1Testimonial,
  bmFeatureGrid2,
  bmFeatureGrid2Testimonial,
  bmProductCta,
} from "@/data/bm-page-content"

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
        <DotBg />
        <SectionContainer variant="wide">
          <ProductHero {...bmHero} />
        </SectionContainer>
      </section>

      {/* Section 2: Product Catalog Table (BM category first) */}
      <SectionWhiteBlock className="overflow-visible">
        <SectionContainer variant="wide">
          <PricingComparison
            title="All Products & Pricing"
            description="Transparent pricing. No hidden fees. Pick what you need."
            hideTooltipBadge
            categories={bmFirstCategories}
            headerColumns={catalogHeaderColumns}
            defaultExpanded={[0]}
            footerTitle="Need a custom order?"
            footerCtaLabel="Talk to Sales"
            footerCtaHref="/book-demo"
            columns={3}
          />
        </SectionContainer>
      </SectionWhiteBlock>

      {/* Section 3-6: Feature Grids + Testimonials (GoAds text, original images/layout) */}
      <div className="section">
        <div className="flex flex-col py-[108px] max-md:py-24 max-sm:py-20">
          <SectionContainer>
            {/* Section 5: Feature Grid 1 */}
            <SectionHead
              subtitle={bmFeatureGrid1.subtitle}
              title={bmFeatureGrid1.title}
              titleSize="h2"
              description={bmFeatureGrid1.description}
              descSize="l"
              variant="light"
            />
            <div className="block pt-12 max-md:pt-10">
              <ProductPageFeatureGridCards cards={bmFeatureGrid1.cards} />
            </div>

            {/* Section 6: Testimonial — Stefan M. (with logo + decorations) */}
            <div className="section">
              <div className="mx-auto w-full px-10">
                <ProductPageTestimonial {...bmFeatureGrid1Testimonial} />
              </div>
            </div>

            {/* Section 7: Feature Grid 2 */}
            <div className="block pt-12 max-md:pt-10">
              <ProductPageFeatureGridCards cards={bmFeatureGrid2.cards} />
            </div>

            {/* Section 8: Testimonial — Ryan D. (with logo + decorations) */}
            <div className="section">
              <div className="mx-auto w-full px-10">
                <ProductPageTestimonial {...bmFeatureGrid2Testimonial} />
              </div>
            </div>
          </SectionContainer>
        </div>
        <div className="mb-[-80px] h-0" />
      </div>

      <div className="section">
        <SectionContainer>
          <ProductPageCtaCard {...bmProductCta} />
        </SectionContainer>
      </div>

      {/* Section 7: FAQ */}
      <div className="section">
        <SectionContainer variant="wide">
          <ProductPageFaqAccordion {...bmFaq} />
        </SectionContainer>
      </div>

      {/* Section 8: Final CTA */}
      <div className="section overflow-hidden">
        <SectionContainer variant="wide">
          <HomeCta />
        </SectionContainer>
      </div>
    </>
  )
}
