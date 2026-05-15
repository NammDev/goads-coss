// Foreplay pricing page — exact DOM clone
// SOURCE DOM: .section > .container.section-container > .pricing > .section-head | .pricing-content
// .pricing: flex col, pt-[72px] pb-[108px] (desktop), pt-[40px] pb-[80px] (mobile)
// .pricing-content: flex col (contains .pricing-tabs then .pricing-footer)

import {
  ForeplaySectionContainer,
  ForeplaySectionHead,
  ForeplaySectionWhiteBlock,
  ForeplayProductPageFaqAccordion,
  ForeplayHomeCta,
} from "@/components/foreplay"
import { ForeplayPricingCard } from "@/components/foreplay/foreplay-pricing-card"
import { ForeplayPricingFooter } from "@/components/foreplay/foreplay-pricing-footer"
import { ForeplayPricingComparison } from "@/components/foreplay/foreplay-pricing-comparison"
import { FP_HERO_GRADIENT } from "@/components/foreplay/foreplay-typography"
import { goadsSetupCards, goadsPricingFaqItems } from "@/data/goads-pricing-setups-data"
import { catalogCategories, catalogHeaderColumns } from "@/data/goads-product-catalog-table-data"

// GOADS setup tiers — 3 one-time pricing cards (replaces Foreplay subscription tiers)
// place-items-center matches Foreplay .pricing-grid: middle card's extra py-4 padding extends
// it taller than side cards (visually highlighted middle tier)
function PricingCardsGrid() {
  return (
    <div className="grid grid-cols-3 place-items-center gap-0 max-md:grid-cols-1">
      <ForeplayPricingCard variant="first" data={goadsSetupCards[0]} />
      <ForeplayPricingCard variant="middle" data={goadsSetupCards[1]} />
      <ForeplayPricingCard variant="last" data={goadsSetupCards[2]} />
    </div>
  )
}

export default function ForeplayPricingPage() {
  return (
    <>
      {/* ═══ Section 1: .section > .container.section-container > .pricing ═══ */}
      <section>
        <ForeplaySectionContainer variant="section">
          {/* .pricing */}
          {/* .pricing: flex col, pt-[72px] pb-[108px] — gap-16 (was gap-9) gives more breathing room between section-head and cards */}
          <div className="flex flex-col gap-16 pt-[72px] pb-[108px] max-md:gap-12 max-sm:gap-10 max-sm:pt-10 max-sm:pb-20">

            {/* .section-head */}
            <ForeplaySectionHead
              subtitle="Pricing"
              title={
                <span className={FP_HERO_GRADIENT}>
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
              <ForeplayPricingFooter />
            </div>

          </div>
        </ForeplaySectionContainer>
      </section>

      {/* ═══ Section 2: All Products & Pricing — /bm catalog table on white block ═══ */}
      <ForeplaySectionWhiteBlock className="overflow-visible">
        <ForeplaySectionContainer variant="wide">
          <ForeplayPricingComparison
            title=""
            description=""
            hideTooltipBadge
            categories={catalogCategories}
            headerColumns={catalogHeaderColumns}
            defaultExpanded={[0]}
            footerTitle="Need a custom order?"
            footerCtaLabel="Talk to Sales"
            footerCtaHref="/talk-to-sales"
            columns={3}
          />
        </ForeplaySectionContainer>
      </ForeplaySectionWhiteBlock>

      {/* ═══ Section 3: FAQ ═══ */}
      <section>
        <ForeplaySectionContainer variant="wide">
          <ForeplayProductPageFaqAccordion
            title="Questions? We have answers."
            description="Common questions about GOADS warranty, delivery, and pricing. Always confirm with support for the latest details."
            items={goadsPricingFaqItems}
          />
        </ForeplaySectionContainer>
      </section>

      {/* ═══ Section 4: Final CTA ═══ */}
      <section className="overflow-hidden">
        <ForeplaySectionContainer variant="section">
          <ForeplayHomeCta />
        </ForeplaySectionContainer>
      </section>
    </>
  )
}
