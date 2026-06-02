// Foreplay pricing page — exact DOM clone
// SOURCE DOM: .section > .container.section-container > .pricing > .section-head | .pricing-content
// .pricing: flex col, pt-[72px] pb-[108px] (desktop), pt-[40px] pb-[80px] (mobile)
// .pricing-content: flex col (contains .pricing-tabs then .pricing-footer)

import { SectionContainer } from "@/components/atoms/section-container"
import { SectionHead } from "@/components/atoms/section-head"
import { SectionWhiteBlock } from "@/components/atoms/section-white-block"
import { HomeCta } from "@/components/home/cta"
import { ProductPageFaqAccordion } from "@/components/product/page-faq-accordion"
import { PricingCard } from "@/components/pricing/card"
import { PricingFooterCta } from "@/components/pricing/footer-cta"
import { PricingComparison } from "@/components/pricing/comparison"
import { SITE_HERO_GRADIENT } from "@/components/atoms/typography"
import { goadsSetupCards, goadsPricingFaqItems } from "@/data/pricing-setups-data"
import { catalogCategories, catalogHeaderColumns } from "@/data/product-catalog-table-data"

// GOADS setup tiers — 3 one-time pricing cards (replaces Foreplay subscription tiers)
// place-items-center matches Foreplay .pricing-grid: middle card's extra py-4 padding extends
// it taller than side cards (visually highlighted middle tier)
function PricingCardsGrid() {
  return (
    <div className="grid grid-cols-3 place-items-center gap-0 max-md:grid-cols-1">
      <PricingCard variant="first" data={goadsSetupCards[0]} />
      <PricingCard variant="middle" data={goadsSetupCards[1]} />
      <PricingCard variant="last" data={goadsSetupCards[2]} />
    </div>
  )
}

export default function PricingPage() {
  return (
    <>
      {/* ═══ Section 1: .section > .container.section-container > .pricing ═══ */}
      <section>
        <SectionContainer variant="section">
          {/* .pricing */}
          {/* .pricing: flex col, pt-[72px] pb-[108px] — gap-16 (was gap-9) gives more breathing room between section-head and cards */}
          <div className="flex flex-col gap-16 pt-[72px] pb-[108px] max-md:gap-12 max-sm:gap-10 max-sm:pt-10 max-sm:pb-20">

            {/* .section-head */}
            <SectionHead
              subtitle="Pricing"
              title={
                <span className={SITE_HERO_GRADIENT}>
                  All Products &amp; Pricing
                </span>
              }
              titleTag="h1"
              titleSize="h1"
              description="Transparent pricing. No hidden fees. Pick what you need."
              descSize="l"
              variant="light"
              size="large"
            />

            {/* .pricing-content: cards (no tabs) + footer */}
            <div className="flex flex-col gap-9">
              <PricingCardsGrid />
              <PricingFooterCta />
            </div>

          </div>
        </SectionContainer>
      </section>

      {/* ═══ Section 2: All Products & Pricing — /bm catalog table on white block ═══ */}
      <SectionWhiteBlock className="overflow-visible">
        <SectionContainer variant="wide">
          <PricingComparison
            title=""
            description=""
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

      {/* ═══ Section 3: FAQ ═══ */}
      <section>
        <SectionContainer variant="wide">
          <ProductPageFaqAccordion
            title="Questions? We have answers."
            description="Common questions about GOADS warranty, delivery, and pricing. Always confirm with support for the latest details."
            items={goadsPricingFaqItems}
          />
        </SectionContainer>
      </section>

      {/* ═══ Section 4: Final CTA ═══ */}
      <section className="overflow-hidden">
        <SectionContainer variant="section">
          <HomeCta />
        </SectionContainer>
      </section>
    </>
  )
}
