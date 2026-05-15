// Foreplay book-demo page — /book-demo (Talk to Sales)
// DOM: section.overflow-hidden.old-demo > .container.section-container > .demo-hero
//    + section > .section-padding > .section-white-block > .container > .demo-socialproof

import {
  ForeplaySectionContainer,
  ForeplayDotBg,
  ForeplaySectionWhiteBlock,
} from "@/components/foreplay"
import { ForeplayDemoHero } from "@/components/foreplay/foreplay-demo-hero"
import { ForeplayDemoSocialProof } from "@/components/foreplay/foreplay-demo-social-proof"
import { SenjaReviewMasonryGrid } from "@/components/foreplay/senja-review-masonry-grid"
import { goadsReviews } from "@/data/goads-reviews-data"

export default function ForeplayBookDemoPage() {
  return (
    <>
      {/* Section 1: Demo Hero (dark bg + dot grid) */}
      <section className="relative overflow-hidden">
        <ForeplayDotBg />
        <ForeplaySectionContainer>
          <ForeplayDemoHero />
        </ForeplaySectionContainer>
      </section>

      {/* Section 2: Social Proof + Reviews (white block) */}
      <section>
        <ForeplaySectionWhiteBlock>
          <ForeplaySectionContainer>
            <ForeplayDemoSocialProof />
          </ForeplaySectionContainer>
          <ForeplaySectionContainer>
            <div className="pb-16">
              <SenjaReviewMasonryGrid reviews={goadsReviews} initialCount={8} loadMoreCount={8} />
            </div>
          </ForeplaySectionContainer>
        </ForeplaySectionWhiteBlock>
      </section>
    </>
  )
}
