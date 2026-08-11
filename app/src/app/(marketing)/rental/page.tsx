// Meta Asset Rental — /rental
//
// Rhythm: dark hero → WHITE block plan cards → dark "why rent" → FAQ → CTA.
//
// Section padding follows the Foreplay scale used by the product pages
// (`py-[108px] max-md:py-24 max-sm:py-20` = --py-section / -md / -sm). The hero
// keeps the pricing-page opening of pt-[72px], since the sticky header already
// supplies visual space above it.

import type { Metadata } from "next"

import { DotBg } from "@/components/atoms/dot-bg"
import { SectionContainer } from "@/components/atoms/section-container"
import { SectionHead } from "@/components/atoms/section-head"
import { CtaButton } from "@/components/atoms/cta-button"
import { ProductPageFaqAccordion } from "@/components/product/page-faq-accordion"
import { RentalHero } from "@/components/rental/rental-hero"
import { RentalPlans } from "@/components/rental/rental-plans"
import { RentalBenefits } from "@/components/rental/rental-benefits"
import { RentalComparisonTable } from "@/components/rental/rental-comparison-table"
import {
  LOWEST_MONTHLY_FEE,
  RENTAL_FAQ_ITEMS,
  formatMonthlyFee,
} from "@/data/rental-page-data"

export const metadata: Metadata = {
  title: "Meta Asset Rental | GOADS",
  description: `Rent a full Meta stack by the month from ${formatMonthlyFee(LOWEST_MONTHLY_FEE)}. Ad accounts, Business Manager, profiles and pages included, with unlimited same-day replacement on every asset. Plans for standard and high-risk verticals.`,
}

export default function RentalPage() {
  return (
    <>
      {/* ═══ Hero ═══ */}
      <section className="relative overflow-hidden">
        <DotBg />
        {/* `section` (1216px), same as the /pricing hero. `wide` (1440px) is for
            full-bleed content like the white-block tables, not for a centred
            headline. */}
        <SectionContainer variant="section">
          <div className="pt-[72px] pb-[108px] max-md:pb-24 max-sm:pt-10 max-sm:pb-20">
            <RentalHero />
          </div>
        </SectionContainer>
      </section>

      {/* ═══ Plan cards — the signature white block ═══ */}
      <RentalPlans />

      {/* ═══ GOADS vs a typical agency account ═══
          Straight after the plans: the customer has just seen the price, and the
          next question is what that price actually buys compared with renting
          anywhere else. */}
      <section>
        <SectionContainer variant="section">
          <div className="flex flex-col gap-12 py-[108px] max-md:gap-10 max-md:py-24 max-sm:gap-8 max-sm:py-20">
            <SectionHead
              subtitle="The difference"
              title="Not every rented account is the same"
              titleTag="h2"
              titleSize="h2"
              description="How our rentals compare with a typical agency account."
              descSize="l"
              variant="light"
            />
            <RentalComparisonTable />
          </div>
        </SectionContainer>
      </section>

      {/* ═══ Why rent ═══ */}
      <section>
        <SectionContainer variant="section">
          <div className="flex flex-col gap-12 pb-[108px] max-md:gap-10 max-md:pb-24 max-sm:gap-8 max-sm:pb-20">
            <SectionHead
              subtitle="Why rent"
              title="Your budget belongs in ads, not in assets"
              titleTag="h2"
              titleSize="h2"
              variant="light"
            />
            <RentalBenefits />

            {/* Back to the plans — the section argues for renting, so it should
                end at the thing you rent, not leave the reader to scroll up. */}
            <div className="flex justify-center">
              <CtaButton href="#plans" variant="hero">
                See rental plans
              </CtaButton>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* ═══ FAQ ═══
          No wrapper padding: ProductPageFaqAccordion carries Foreplay's own
          `.faq` spacing (py-[140px] / max-md:py-20). Adding a section rhythm on
          top of it doubles the gap — this is how /bm and the other product pages
          mount it too. */}
      <section>
        <SectionContainer variant="wide">
          <ProductPageFaqAccordion title="Rental questions answered" items={RENTAL_FAQ_ITEMS} />
        </SectionContainer>
      </section>
    </>
  )
}
