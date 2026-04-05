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
import { ForeplayPricingTabs } from "@/components/foreplay/foreplay-pricing-tabs"
import { ForeplayPricingCard } from "@/components/foreplay/foreplay-pricing-card"
import { ForeplayPricingFooter } from "@/components/foreplay/foreplay-pricing-footer"
import { ForeplayPricingComparison } from "@/components/foreplay/foreplay-pricing-comparison"
import { FP_HERO_GRADIENT } from "@/components/foreplay/foreplay-typography"
import { monthlyCards, annualCards, pricingFaqItems } from "@/data/foreplay-pricing-page-data"

function MonthlyCardGrid() {
  return (
    <>
      <ForeplayPricingCard variant="first" data={monthlyCards[0]} />
      <ForeplayPricingCard variant="middle" data={monthlyCards[1]} />
      <ForeplayPricingCard variant="last" data={monthlyCards[2]} />
    </>
  )
}

function AnnualCardGrid() {
  return (
    <>
      <ForeplayPricingCard variant="first" data={annualCards[0]} />
      <ForeplayPricingCard variant="middle" data={annualCards[1]} />
      <ForeplayPricingCard variant="last" data={annualCards[2]} />
    </>
  )
}

export default function ForeplayPricingPage() {
  return (
    <>
      {/* ═══ Section 1: .section > .container.section-container > .pricing ═══ */}
      <section>
        <ForeplaySectionContainer variant="section">
          {/* .pricing */}
          {/* .pricing: flex col, pt-[72px] pb-[108px] — gap-9 matches Foreplay visual spacing */}
          <div className="flex flex-col gap-9 pt-[72px] pb-[108px] max-sm:pt-10 max-sm:pb-20">

            {/* .section-head */}
            <ForeplaySectionHead
              subtitle="Pricing"
              title={
                <span className={FP_HERO_GRADIENT}>
                  Flexible, risk-free pricing
                </span>
              }
              titleTag="h1"
              titleSize="h1"
              description="No contracts, no surprises. Unlimited usage and ad spend across all products so you can scale and ship more winning ads."
              descSize="l"
              variant="light"
              size="large"
            />

            {/* .pricing-content: flex col, gap-9 between tabs and footer */}
            <div className="flex flex-col gap-9">
              {/* .code-style.w-embed — hidden style block from source (display:none, fixed) */}
              <div className="fixed inset-[0%_auto_auto_0%] hidden" />
              <ForeplayPricingTabs
                monthlyContent={<MonthlyCardGrid />}
                annualContent={<AnnualCardGrid />}
              />
              <ForeplayPricingFooter />
            </div>

          </div>
        </ForeplaySectionContainer>
      </section>

      {/* ═══ Section 2: Comparison Table ═══ */}
      {/* Source: .section-padding > .section-white-block > .section > .container > .comparison */}
      <ForeplaySectionWhiteBlock className="overflow-visible">
        <ForeplaySectionContainer variant="wide">
          <ForeplayPricingComparison />
        </ForeplaySectionContainer>
      </ForeplaySectionWhiteBlock>

      {/* ═══ Section 3: FAQ ═══ */}
      <section>
        <ForeplaySectionContainer variant="wide">
          <ForeplayProductPageFaqAccordion
            title="Questions? We have answers."
            description="Still curious about Foreplay? Check out our FAQ below."
            items={pricingFaqItems}
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
