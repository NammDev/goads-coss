// Foreplay /blue-verification — mirrors /foreplay/unban layout pattern
// Section order:
//   1. Hero (title + subtitle + CTA + stats strip; no carousel cards)
//   2. Left-right feature rows (no FU logo icon)
//   3. Examples grid (ecommerce cards with verification-themed section head)
//   4. FAQ accordion
//   5. Final CTA banner

import {
  ForeplaySectionContainer,
  ForeplaySectionHead,
  ForeplayHomeCta,
  ForeplayCtaButton,
  fpText,
} from "@/components/foreplay"
import { ForeplayUniversityHero } from "@/components/foreplay/foreplay-university-hero"
import { ForeplayUniversityFeatureRow } from "@/components/foreplay/foreplay-university-feature-row"
import { ForeplaySolutionExamplesGrid } from "@/components/foreplay/foreplay-solution-examples-grid"
import { ForeplayProductPageFaqAccordion } from "@/components/foreplay/foreplay-product-page-faq-accordion"
import {
  blueVerificationHero,
  blueVerificationFeatureRows,
  blueVerificationExamplesSection,
  blueVerificationFaq,
} from "@/data/goads-blue-verification-page-data"
import { ecommerceExamples } from "@/data/foreplay-ecommerce-solution-page-data"
import { cn } from "@/lib/utils"
import { VerifiedBadge } from "@/assets/svg/verified-badge"

// Hero stats strip — Foreplay KPI pattern (matches /foreplay/unban hero stats)
const VERIFICATION_STATS = [
  { value: "650+", label: "Accounts verified" },
  { value: "98%", label: "Approval rate" },
  { value: "2 days", label: "Verification time" },
  { value: "#1", label: "Trusted in market" },
] as const

export default function ForeplayBlueVerificationPage() {
  return (
    <>
      {/* ═══ Section 1: Hero — verified badge icon (128x128 matching .product-hero-icon spec) ═══ */}
      <ForeplayUniversityHero
        {...blueVerificationHero}
        badgeIcon={
          <VerifiedBadge
            className="size-32 max-md:size-28 max-sm:size-24 drop-shadow-[0_16px_40px_rgba(0,149,246,0.4)]"
          />
        }
      >
        <div className="flex flex-col items-center gap-10 pt-3 pb-10 max-md:gap-8 max-md:pb-6">
          {/* Subtitle — Foreplay body-l in alpha-50, max-w 640px */}
          <p className="max-w-[640px] text-center font-sans text-[1.125rem] font-normal leading-7 tracking-[-0.0144em] text-[var(--fp-alpha-50)] [text-wrap:balance]">
            Earn the blue badge that signals authority and builds instant trust. We submit through official platform channels — no shortcuts, no risk to your account.
          </p>

          {/* Primary CTA */}
          <ForeplayCtaButton href="/talk-to-sales" variant="hero">
            Start Verification
          </ForeplayCtaButton>

          {/* Stats strip — 4-col desktop, 2-col mobile */}
          <div className="grid w-full max-w-[720px] grid-cols-2 gap-4 md:grid-cols-4">
            {VERIFICATION_STATS.map(stat => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center gap-0.5 p-3 transition-all duration-200"
              >
                <span className={cn(fpText.displayH5, "text-foreground")}>
                  {stat.value}
                </span>
                <span className="font-sans text-[0.8125rem] font-normal leading-5 tracking-[-0.005em] text-[var(--fp-alpha-50)]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ForeplayUniversityHero>

      {/* ═══ Section 2: Left-Right Feature Rows ═══ */}
      {/* pt + pb section scale — pt added because hero content is shorter than original (475px carousel) */}
      <div className="section pt-(--fp-py-section) pb-(--fp-py-section) max-md:pt-(--fp-py-section-md) max-md:pb-(--fp-py-section-md) max-sm:pt-(--fp-py-section-sm) max-sm:pb-(--fp-py-section-sm)">
        <ForeplaySectionContainer>
          {/* .left-right-section-wrapper: flex col, gap-80px */}
          <div className="flex flex-col gap-20">
            {blueVerificationFeatureRows.map((row, i) => (
              <ForeplayUniversityFeatureRow key={i} {...row} />
            ))}
          </div>
        </ForeplaySectionContainer>
      </div>

      {/* ═══ Section 3: Examples Grid (verification-themed copy) ═══ */}
      <div className="section">
        <div className="flex flex-col py-[108px] max-md:py-24 max-sm:py-20">
          <ForeplaySectionContainer>
            <ForeplaySectionHead
              subtitle={blueVerificationExamplesSection.subtitle}
              title={blueVerificationExamplesSection.title}
              titleSize="h2"
              description={blueVerificationExamplesSection.description}
              descSize="l"
              variant="light"
            />
            <div className="block pt-12 max-md:pt-10">
              {/* Duplicate 3 cards → 6 cards (2x3 grid) for this route only */}
              <ForeplaySolutionExamplesGrid cards={[...ecommerceExamples, ...ecommerceExamples]} />
            </div>
          </ForeplaySectionContainer>
        </div>
      </div>

      {/* ═══ Section 4: FAQ ═══ */}
      <div className="section">
        <ForeplaySectionContainer variant="wide">
          <ForeplayProductPageFaqAccordion
            {...blueVerificationFaq}
            className="py-(--fp-py-section) max-md:py-(--fp-py-section-md) max-sm:py-(--fp-py-section-sm)"
          />
        </ForeplaySectionContainer>
      </div>

      {/* ═══ Section 5: Final CTA Banner ═══ */}
      <div className="section overflow-hidden">
        <ForeplaySectionContainer variant="wide">
          <ForeplayHomeCta />
        </ForeplaySectionContainer>
      </div>
    </>
  )
}
