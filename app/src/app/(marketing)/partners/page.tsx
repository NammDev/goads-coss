// Foreplay /partners — hero + partner offers grid + final CTA.
// Structure mirrors /about (UniversityHero → section → HomeCta).
// Content/partner data ported from the production (marketing)/partners page.

import type { Metadata } from "next"
import {
  ForeplaySectionContainer,
  ForeplaySectionHead,
  ForeplayHomeCta,
  ForeplayCtaButton,
} from "@/components/foreplay"
import { ForeplayUniversityHero } from "@/components/foreplay/foreplay-university-hero"
import { ForeplayProductPageFeatureGridCards } from "@/components/foreplay/foreplay-product-page-feature-grid-cards"
import { partnersHero } from "@/data/goads-partners-page-data"
import { bmFeatureGrid1 } from "@/data/goads-bm-page-data"

export const metadata: Metadata = {
  title: "Partners | GoAds Affiliate & Reseller Program",
  description:
    "Take advantage of exclusive discounts from our trusted partners in the ad-tech ecosystem.",
}

export default function ForeplayPartnersPage() {
  return (
    <>
      {/* ═══ Section 1: Hero ═══ */}
      <ForeplayUniversityHero
        {...partnersHero}
        title={
          <>
            <span className="text-foreground">Offers by Our</span>
            <br />
            <span className="text-[var(--fp-alpha-100)]">Trusted Partners</span>
          </>
        }
      >
        <div className="flex flex-col items-center gap-8 pt-3 pb-10 max-md:gap-6 max-md:pb-6">
          <p className="max-w-[820px] text-center font-sans text-[1.0625rem] font-normal leading-[1.6] tracking-[-0.0125em] text-[var(--fp-alpha-50)] [text-wrap:balance]">
            Take advantage of exclusive discounts from the leading tools in the
            ad-tech ecosystem — handpicked for GoAds clients.
          </p>
          <ForeplayCtaButton href="#partners" variant="hero">
            View Offers
          </ForeplayCtaButton>
        </div>
      </ForeplayUniversityHero>

      {/* ═══ Section 2: copied 1:1 from /bm "ALL PRODUCTS" (data + images unchanged) ═══ */}
      <div id="partners" className="section">
        <div className="flex flex-col py-[108px] max-md:py-24 max-sm:py-20">
          <ForeplaySectionContainer>
            <ForeplaySectionHead
              subtitle={bmFeatureGrid1.subtitle}
              title={bmFeatureGrid1.title}
              titleSize="h2"
              description={bmFeatureGrid1.description}
              descSize="l"
              variant="light"
            />
            <div className="block pt-12 max-md:pt-10">
              <ForeplayProductPageFeatureGridCards cards={bmFeatureGrid1.cards} />
            </div>
          </ForeplaySectionContainer>
        </div>
      </div>

      {/* ═══ Section 3: Final CTA Banner ═══ */}
      <div className="section overflow-hidden">
        <ForeplaySectionContainer variant="wide">
          <ForeplayHomeCta />
        </ForeplaySectionContainer>
      </div>
    </>
  )
}
