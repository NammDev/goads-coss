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
} from "@/components/foreplay"
import { ForeplayUniversityHero } from "@/components/foreplay/foreplay-university-hero"
import { ForeplayUniversityCourseCarousel } from "@/components/foreplay/foreplay-university-course-carousel"
import { ForeplayUniversityFeatureRow } from "@/components/foreplay/foreplay-university-feature-row"
import { ForeplaySolutionExamplesGrid } from "@/components/foreplay/foreplay-solution-examples-grid"
import { ForeplayProductPageFaqAccordion } from "@/components/foreplay/foreplay-product-page-faq-accordion"
import {
  unbanHero,
  unbanCourseCards,
  unbanFeatureRows,
  unbanExamplesSection,
  unbanFaq,
} from "@/data/goads-unban-page-data"
import { ecommerceExamples } from "@/data/foreplay-ecommerce-solution-page-data"

export default function ForeplayUnbanPage() {
  return (
    <>
      {/* ═══ Section 1: Hero (from /foreplay/university/classes) ═══ */}
      <ForeplayUniversityHero {...unbanHero}>
        <ForeplayUniversityCourseCarousel cards={unbanCourseCards} />
      </ForeplayUniversityHero>

      {/* ═══ Section 2: Left-Right Feature Rows (from /foreplay/university/classes) ═══ */}
      {/* pb section scale added for /unban only (not shared with /industries/ecommerce) */}
      <div className="section pb-(--fp-py-section) max-md:pb-(--fp-py-section-md) max-sm:pb-(--fp-py-section-sm)">
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
