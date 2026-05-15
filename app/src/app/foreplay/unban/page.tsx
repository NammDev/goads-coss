// Foreplay /unban — 100% cloned from /foreplay/blue-verification
// Section order (identical composition):
//   1. Hero (from /foreplay/university/classes)
//   2. Left-right feature rows (from /foreplay/university/classes)
//   3. Examples grid (from /foreplay/industries/ecommerce — shared ads array)
//   4. FAQ accordion
//   5. Final CTA banner
// Only TEXT differs (via goads-unban-page-data). All components, layouts, CSS, images,
// SVGs, wrapper classes and section ordering are identical to blue-verification.

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
  unbanHero,
  unbanFeatureRows,
  unbanExamplesSection,
  unbanFaq,
} from "@/data/goads-unban-page-data"
import { ecommerceExamples } from "@/data/foreplay-ecommerce-solution-page-data"
import { cn } from "@/lib/utils"
import { UnbanIcon } from "@/assets/svg/unban-icon"

// Hero stats strip — Foreplay KPI pattern (matches /foreplay/home bottom stats)
const UNBAN_STATS = [
  { value: "500+", label: "Assets recovered" },
  { value: "95%", label: "Success rate" },
  { value: "100%", label: "Refund if failed" },
  { value: "#1", label: "Trusted in market" },
] as const

export default function ForeplayUnbanPage() {
  return (
    <>
      {/* ═══ Section 1: Hero — 3D unban icon + title + subtitle + CTA + stats strip ═══ */}
      <ForeplayUniversityHero
        {...unbanHero}
        badgeIcon={
          <UnbanIcon
            className="size-32 max-md:size-28 max-sm:size-24 drop-shadow-[0_16px_40px_rgba(0,149,246,0.4)]"
          />
        }
      >
        <div className="flex flex-col items-center gap-10 pt-3 pb-10 max-md:gap-8 max-md:pb-6">
          {/* Subtitle — Foreplay body-l in alpha-50, max-w 640px for readability */}
          <p className="max-w-[640px] text-center font-sans text-[1.125rem] font-normal leading-7 tracking-[-0.0144em] text-[var(--fp-alpha-50)] [text-wrap:balance]">
            Disabled BM? Banned profile? Page restricted? We recover Meta assets via official appeal channels — no shady workarounds, no short-term fixes.
          </p>

          {/* Primary CTA — Foreplay hero variant (white pill) */}
          <ForeplayCtaButton href="/talk-to-sales" variant="hero">
            Start Recovery
          </ForeplayCtaButton>

          {/* Stats strip — 4-col desktop, 2-col mobile. Matches /foreplay/home KPI strip style */}
          <div className="grid w-full max-w-[720px] grid-cols-2 gap-4 md:grid-cols-4">
            {UNBAN_STATS.map(stat => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center gap-0.5 p-3 transition-all duration-200"
              >
                {/* KPI value — Foreplay display-h5 (1.5rem/2rem, 600) */}
                <span className={cn(fpText.displayH5, "text-foreground")}>
                  {stat.value}
                </span>
                {/* Label — refined small caption: 13px, alpha-50 muted */}
                <span className="font-sans text-[0.8125rem] font-normal leading-5 tracking-[-0.005em] text-[var(--fp-alpha-50)]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ForeplayUniversityHero>

      {/* ═══ Section 2: Left-Right Feature Rows (from /foreplay/university/classes) ═══ */}
      {/* pt + pb section scale — pt added because hero content is shorter than original (475px carousel) */}
      <div className="section pt-(--fp-py-section) pb-(--fp-py-section) max-md:pt-(--fp-py-section-md) max-md:pb-(--fp-py-section-md) max-sm:pt-(--fp-py-section-sm) max-sm:pb-(--fp-py-section-sm)">
        <ForeplaySectionContainer>
          {/* .left-right-section-wrapper: flex col, gap-80px */}
          <div className="flex flex-col gap-20">
            {unbanFeatureRows.map((row, i) => (
              <ForeplayUniversityFeatureRow key={i} {...row} />
            ))}
          </div>
        </ForeplaySectionContainer>
      </div>

      {/* ═══ Section 3: Examples Grid (from /foreplay/industries/ecommerce) ═══ */}
      <div className="section">
        <div className="flex flex-col py-[108px] max-md:py-24 max-sm:py-20">
          <ForeplaySectionContainer>
            <ForeplaySectionHead
              subtitle={unbanExamplesSection.subtitle}
              title={unbanExamplesSection.title}
              titleSize="h2"
              description={unbanExamplesSection.description}
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


      {/* ═══ Section 5: FAQ ═══ */}
      {/* Override default py-[140px] → py-108px for this route */}
      <div className="section">
        <ForeplaySectionContainer variant="wide">
          <ForeplayProductPageFaqAccordion
            {...unbanFaq}
            className="py-(--fp-py-section) max-md:py-(--fp-py-section-md) max-sm:py-(--fp-py-section-sm)"
          />
        </ForeplaySectionContainer>
      </div>

      {/* ═══ Section 6: Final CTA Banner ═══ */}
      <div className="section overflow-hidden">
        <ForeplaySectionContainer variant="wide">
          <ForeplayHomeCta />
        </ForeplaySectionContainer>
      </div>
    </>
  )
}
