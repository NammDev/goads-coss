// Foreplay /university/classes page
// Sections: University Hero (with course carousel) → Left-Right Features (x2) → Final CTA

import { ForeplaySectionContainer, ForeplayHomeCta } from "@/components/foreplay"
import { ForeplayUniversityHero } from "@/components/foreplay/foreplay-university-hero"
import { ForeplayUniversityCourseCarousel } from "@/components/foreplay/foreplay-university-course-carousel"
import { ForeplayUniversityFeatureRow } from "@/components/foreplay/foreplay-university-feature-row"
import {
  universityHero,
  courseCards,
  featureRows,
} from "@/data/foreplay-university-classes-page-data"

export default function UniversityClassesPage() {
  return (
    <>
      {/* Section 1: Hero + Course Cards Carousel */}
      <ForeplayUniversityHero {...universityHero}>
        <ForeplayUniversityCourseCarousel cards={courseCards} />
      </ForeplayUniversityHero>

      {/* Section 2: Left-Right Feature Rows */}
      <div className="section">
        <ForeplaySectionContainer>
          {/* .left-right-section-wrapper: flex col, gap-80px */}
          <div className="flex flex-col gap-20">
            {featureRows.map((row, i) => (
              <ForeplayUniversityFeatureRow key={i} {...row} />
            ))}
          </div>
        </ForeplaySectionContainer>
      </div>

      {/* Section 3: Final CTA */}
      <div className="section overflow-hidden">
        <ForeplaySectionContainer variant="wide">
          <ForeplayHomeCta />
        </ForeplaySectionContainer>
      </div>
    </>
  )
}
