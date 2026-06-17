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
import { SITE_HERO_GRADIENT, siteText } from "@/components/atoms/typography"
import { goadsSetupCards, goadsPricingFaqItems } from "@/data/pricing-setups-data"
import { catalogCategories, catalogHeaderColumns } from "@/data/product-catalog-table-data"
import { CONTACT } from "@/data/contact-info"

// GOADS setup tiers — 3 one-time pricing cards (replaces Foreplay subscription tiers)
// place-items-center matches Foreplay .pricing-grid: middle card's extra py-4 padding extends
// it taller than side cards (visually highlighted middle tier)
function PricingCardsGrid() {
  // Desktop: 3 cols joined edge-to-edge (gap-0, shared box-shadow borders).
  // ≤991px: 1 col with gap so the stacked card borders DON'T touch (32 → 24 → 20px).
  return (
    <div className="grid grid-cols-3 place-items-center gap-0 max-[991px]:grid-cols-1 max-[991px]:gap-8 max-[767px]:gap-6 max-[479px]:gap-5">
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
            defaultExpanded={catalogCategories.map((_, i) => i)}
            footerTitle="Need a custom order?"
            footerCtaLabel="Talk to Sales"
            footerCtaHref={CONTACT.telegram.sales}
            columns={3}
          />
        </SectionContainer>
      </SectionWhiteBlock>

      {/* ═══ Legal disclaimer — advertising-only use notice (VN compliance) ═══ */}
      {/* tokens: border --alpha-700 (#ffffff1a/10%), bg --alpha-900 (#ffffff08/3%), */}
      {/* body --alpha-100 (#ffffffad/68%), emphasis --alpha-25 (#ffffffeb/92%) */}
      <section>
        <SectionContainer variant="wide">
          <div className="mx-auto flex max-w-[820px] flex-col gap-3 rounded-2xl border border-[var(--alpha-700)] bg-[var(--alpha-900)] px-8 py-6 text-left max-sm:px-5 max-sm:py-5">
            <p className={`${siteText.bodyS} leading-6 text-[var(--alpha-100)]`}>
              The resources on this website are provided strictly for{" "}
              <strong className="font-[550] text-[var(--alpha-25)]">ADVERTISING</strong> purposes only. We assume no
              liability whatsoever for any unlawful use of these resources by customers.
            </p>
            <p className={`${siteText.bodyS} leading-6 text-[var(--alpha-100)]`}>
              We only sell cleanly nurtured and aged Pages &amp; Profiles. We strictly do not sell hacked, stolen, or
              scam-related accounts from real individuals or organizations.
            </p>
          </div>
        </SectionContainer>
      </section>

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
