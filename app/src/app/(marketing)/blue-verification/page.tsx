// Foreplay /blue-verification — mirrors /unban layout pattern
// Section order:
//   1. Hero (title + subtitle + CTA + stats strip; no carousel cards)
//   2. Left-right feature rows (no FU logo icon)
//   3. Examples grid (ecommerce cards with verification-themed section head)
//   4. FAQ accordion
//   5. Final CTA banner

import { CtaButton } from "@/components/atoms/cta-button"
import { SectionContainer } from "@/components/atoms/section-container"
import { siteText } from "@/components/atoms/typography"
import { HomeCta } from "@/components/home/cta"
import { UniversityHero } from "@/components/university/hero"
import { UniversityFeatureRow } from "@/components/university/feature-row"
import { ProductPageFaqAccordion } from "@/components/product/page-faq-accordion"
import {
  blueVerificationHero,
  blueVerificationFeatureRows,
  blueVerificationFaq,
} from "@/data/blue-verification-page-data"
import { cn } from "@/lib/utils"
import { VerifiedBadge } from "@/assets/svg/verified-badge"

// Hero stats strip — Foreplay KPI pattern (matches /unban hero stats)
const VERIFICATION_STATS = [
  { value: "650+", label: "Accounts verified" },
  { value: "98%", label: "Approval rate" },
  { value: "2 days", label: "Verification time" },
  { value: "#1", label: "Trusted in market" },
] as const

export default function BlueVerificationPage() {
  return (
    <>
      {/* ═══ Section 1: Hero — verified badge icon (128x128 matching .product-hero-icon spec) ═══ */}
      <UniversityHero
        {...blueVerificationHero}
        badgeIcon={
          <VerifiedBadge
            className="size-32 max-md:size-28 max-sm:size-24 drop-shadow-[0_16px_40px_rgba(0,149,246,0.4)]"
          />
        }
      >
        <div className="flex flex-col items-center gap-10 pt-3 pb-10 max-md:gap-8 max-md:pb-6">
          {/* Subtitle — Foreplay body-l in alpha-50, max-w 640px */}
          <p className="max-w-[640px] text-center font-sans text-[1.125rem] font-normal leading-7 tracking-[-0.0144em] text-[var(--alpha-50)] [text-wrap:balance]">
            Earn the blue badge that signals authority and builds instant trust. We submit through official platform channels, no shortcuts, no risk to your account.
          </p>

          {/* Primary CTA — jumps to pricing and auto-opens the "Other Service" row */}
          <CtaButton href="/pricing#other-service" variant="hero">
            Start Verification
          </CtaButton>

          {/* Stats strip — 4-col desktop, 2-col mobile */}
          <div className="grid w-full max-w-[720px] grid-cols-2 gap-4 md:grid-cols-4">
            {VERIFICATION_STATS.map(stat => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center gap-0.5 p-3 transition-all duration-200"
              >
                <span className={cn(siteText.displayH5, "text-foreground")}>
                  {stat.value}
                </span>
                <span className="font-sans text-[0.8125rem] font-normal leading-5 tracking-[-0.005em] text-[var(--alpha-50)]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </UniversityHero>

      {/* ═══ Section 2: Left-Right Feature Rows ═══ */}
      {/* pt + pb section scale — pt added because hero content is shorter than original (475px carousel) */}
      <div className="section pt-(--py-section) pb-(--py-section) max-md:pt-(--py-section-md) max-md:pb-(--py-section-md) max-sm:pt-(--py-section-sm) max-sm:pb-(--py-section-sm)">
        <SectionContainer>
          {/* .left-right-section-wrapper: flex col, gap-80px */}
          <div className="flex flex-col gap-20">
            {blueVerificationFeatureRows.map((row, i) => (
              <UniversityFeatureRow key={i} {...row} />
            ))}
          </div>
        </SectionContainer>
      </div>

      {/* ═══ Section 3: FAQ ═══ */}
      <div className="section">
        <SectionContainer variant="wide">
          <ProductPageFaqAccordion
            {...blueVerificationFaq}
            className="py-(--py-section) max-md:py-(--py-section-md) max-sm:py-(--py-section-sm)"
          />
        </SectionContainer>
      </div>

      {/* ═══ Section 4: Final CTA Banner ═══ */}
      <div className="section overflow-hidden">
        <SectionContainer variant="wide">
          <HomeCta />
        </SectionContainer>
      </div>
    </>
  )
}
