// GoAds /profiles product page
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
  profilesHero,
  profilesFaq,
  profilesFeatureGrid1,
  profilesFeatureGrid1Testimonial,
  profilesFeatureGrid2,
  profilesFeatureGrid2Testimonial,
  profilesProductCta,
} from "@/data/profiles-page-content"

export default function ProfilesPage() {
  return (
    <>
      {/* Section 1: Product Hero (from swipe-file) */}
      <section id="product-hero-section" className="section relative">
        <DotBg />
        <SectionContainer variant="wide">
          <ProductHero {...profilesHero} />
        </SectionContainer>
      </section>

      {/* Section 2: Product Catalog Table */}
      <SectionWhiteBlock className="overflow-visible">
        <SectionContainer variant="wide">
          <PricingComparison
            title="All Products & Pricing"
            description="Transparent pricing. No hidden fees. Pick what you need."
            hideTooltipBadge
            categories={catalogCategories}
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
              subtitle={profilesFeatureGrid1.subtitle}
              title={profilesFeatureGrid1.title}
              titleSize="h2"
              description={profilesFeatureGrid1.description}
              descSize="l"
              variant="light"
            />
            <div className="block pt-12 max-md:pt-10">
              <ProductPageFeatureGridCards cards={profilesFeatureGrid1.cards} />
            </div>

            {/* Section 6: Testimonial — Stefan M. (with logo + decorations) */}
            <div className="section">
              <div className="mx-auto w-full px-10">
                <ProductPageTestimonial {...profilesFeatureGrid1Testimonial} />
              </div>
            </div>

            {/* Section 7: Feature Grid 2 */}
            <div className="block pt-12 max-md:pt-10">
              <ProductPageFeatureGridCards cards={profilesFeatureGrid2.cards} />
            </div>

            {/* Section 8: Testimonial — Ryan D. (with logo + decorations) */}
            <div className="section">
              <div className="mx-auto w-full px-10">
                <ProductPageTestimonial {...profilesFeatureGrid2Testimonial} />
              </div>
            </div>
          </SectionContainer>
        </div>
        <div className="mb-[-80px] h-0" />
      </div>

      <div className="section">
        <SectionContainer>
          <ProductPageCtaCard {...profilesProductCta} />
        </SectionContainer>
      </div>

      {/* Section 7: FAQ */}
      <div className="section">
        <SectionContainer variant="wide">
          <ProductPageFaqAccordion {...profilesFaq} />
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
