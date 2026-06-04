// Foreplay /partners — hero + partner offers grid + final CTA.
// Structure mirrors /about (UniversityHero → section → HomeCta).
// Content/partner data ported from the production (marketing)/partners page.

import type { Metadata } from "next"
import { CtaButton } from "@/components/atoms/cta-button"
import { SectionContainer } from "@/components/atoms/section-container"
import { SectionHead } from "@/components/atoms/section-head"
import { HomeCta } from "@/components/home/cta"
import { UniversityHero } from "@/components/university/hero"
import { ProductPageFeatureGridCards } from "@/components/product/page-feature-grid-cards"
import { partnersHero, partnersOffers } from "@/data/partners-page-data"

export const metadata: Metadata = {
  title: "Partners | GOADS Affiliate & Reseller Program",
  description:
    "Take advantage of exclusive discounts from our trusted partners in the ad-tech ecosystem.",
}

export default function PartnersPage() {
  return (
    <>
      {/* ═══ Section 1: Hero ═══ */}
      <UniversityHero
        {...partnersHero}
        title={
          <>
            <span className="text-foreground">Offers by Our</span>
            <br />
            <span className="text-[var(--alpha-100)]">Trusted Partners</span>
          </>
        }
      >
        <div className="flex flex-col items-center gap-8 pt-3 pb-10 max-md:gap-6 max-md:pb-6">
          <p className="max-w-[820px] text-center font-sans text-[1.0625rem] font-normal leading-[1.6] tracking-[-0.0125em] text-[var(--alpha-50)] [text-wrap:balance]">
            Take advantage of exclusive discounts from the leading tools in the
            ad-tech ecosystem, handpicked for GOADS clients.
          </p>
          <CtaButton href="#partners" variant="hero">
            View Offers
          </CtaButton>
        </div>
      </UniversityHero>

      {/* ═══ Section 2: copied 1:1 from /bm "ALL PRODUCTS" (data + images unchanged) ═══ */}
      <div id="partners" className="section">
        <div className="flex flex-col py-[108px] max-md:py-24 max-sm:py-20">
          <SectionContainer>
            <SectionHead
              subtitle={partnersOffers.subtitle}
              title={partnersOffers.title}
              titleSize="h2"
              description={partnersOffers.description}
              descSize="l"
              variant="light"
            />
            <div className="block pt-12 max-md:pt-10">
              <ProductPageFeatureGridCards cards={partnersOffers.cards} />
            </div>
          </SectionContainer>
        </div>
      </div>

      {/* ═══ Section 3: Final CTA Banner ═══ */}
      <div className="section overflow-hidden">
        <SectionContainer variant="wide">
          <HomeCta />
        </SectionContainer>
      </div>
    </>
  )
}
