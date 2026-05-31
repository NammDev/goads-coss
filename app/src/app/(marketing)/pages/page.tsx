// GoAds /pages product page — Facebook Pages
// Composition mirrors /bm: Hero (text-only) → Comparison Table (Pages first)
//   → Feature Grid 1 + Testimonial 1 → Feature Grid 2 + Testimonial 2 → Product CTA → FAQ → Final CTA

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
  pagesHero,
  pagesFaq,
  pagesFeatureGrid1,
  pagesFeatureGrid1Testimonial,
  pagesFeatureGrid2,
  pagesFeatureGrid2Testimonial,
  pagesProductCta,
} from "@/data/pages-page-content"

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
        <DotBg />
        <SectionContainer variant="wide">
          <ProductHero {...pagesHero} />
        </SectionContainer>
      </section>

      {/* Section 2: Product Catalog Table (Pages category first) */}
      <SectionWhiteBlock className="overflow-visible">
        <SectionContainer variant="wide">
          <PricingComparison
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
        </SectionContainer>
      </SectionWhiteBlock>

      {/* Section 3-6: Feature Grids + Testimonials */}
      <div className="section">
        <div className="flex flex-col py-[108px] max-md:py-24 max-sm:py-20">
          <SectionContainer>
            {/* Section 3: Feature Grid 1 */}
            <SectionHead
              subtitle={pagesFeatureGrid1.subtitle}
              title={pagesFeatureGrid1.title}
              titleSize="h2"
              description={pagesFeatureGrid1.description}
              descSize="l"
              variant="light"
            />
            <div className="block pt-12 max-md:pt-10">
              <ProductPageFeatureGridCards cards={pagesFeatureGrid1.cards} />
            </div>

            {/* Section 4: Testimonial — Stefan M. */}
            <div className="section">
              <div className="mx-auto w-full px-10">
                <ProductPageTestimonial {...pagesFeatureGrid1Testimonial} />
              </div>
            </div>

            {/* Section 5: Feature Grid 2 */}
            <div className="block pt-12 max-md:pt-10">
              <ProductPageFeatureGridCards cards={pagesFeatureGrid2.cards} />
            </div>

            {/* Section 6: Testimonial — Ryan D. */}
            <div className="section">
              <div className="mx-auto w-full px-10">
                <ProductPageTestimonial {...pagesFeatureGrid2Testimonial} />
              </div>
            </div>
          </SectionContainer>
        </div>
        <div className="mb-[-80px] h-0" />
      </div>

      {/* Section 7: Product CTA Card */}
      <div className="section">
        <SectionContainer>
          <ProductPageCtaCard {...pagesProductCta} />
        </SectionContainer>
      </div>

      {/* Section 8: FAQ */}
      <div className="section">
        <SectionContainer variant="wide">
          <ProductPageFaqAccordion {...pagesFaq} />
        </SectionContainer>
      </div>

      {/* Section 9: Final CTA */}
      <div className="section overflow-hidden">
        <SectionContainer variant="wide">
          <HomeCta />
        </SectionContainer>
      </div>
    </>
  )
}
