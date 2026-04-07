// Foreplay reviews page — /reviews (Wall of Love)
// SOURCE DOM: .section > .container.section-container > .pricing > .section-head
//           + .section-padding > .section-white-block > .section > .container > .comparison > senja-embed
// Extremely simple: 1 section head + 1 Senja widget embed inside white block

import {
  ForeplaySectionContainer,
  ForeplaySectionHead,
  ForeplaySectionWhiteBlock,
  ForeplayHomeCta,
} from "@/components/foreplay"
import { SenjaReviewMasonryGrid } from "@/components/foreplay/senja-review-masonry-grid"
import { goadsReviews } from "@/data/goads-reviews-data"

export default function ForeplayReviewsPage() {
  return (
    <>
      {/* ═══ Section 1: Hero Header ═══ */}
      {/* .section > .container.section-container > .pricing > .section-head */}
      <section>
        <ForeplaySectionContainer variant="section">
          {/* .pricing: flex col, pt-[72px] pb-[108px] */}
          <div className="flex flex-col pt-[72px] pb-[108px] max-sm:pt-10 max-sm:pb-20">
            <ForeplaySectionHead
              subtitle="Wall of Love"
              title="What customers have to say"
              titleTag="h2"
              titleSize="h2"
              description="Don't just take our word for it. See what advertisers say about GoAds."
              descSize="l"
              variant="light"
            />
          </div>
        </ForeplaySectionContainer>
      </section>

      {/* ═══ Section 2: Reviews Widget (white block) ═══ */}
      {/* .section-padding > .section-white-block > .section > .container > .comparison > senja-embed */}
      <ForeplaySectionWhiteBlock>
        <ForeplaySectionContainer variant="wide">
          <div className="py-16">
            <SenjaReviewMasonryGrid reviews={goadsReviews} initialCount={10} loadMoreCount={10} />
          </div>
        </ForeplaySectionContainer>
      </ForeplaySectionWhiteBlock>

      {/* ═══ Section 3: Final CTA ═══ */}
      <section className="overflow-hidden">
        <ForeplaySectionContainer variant="section">
          <ForeplayHomeCta />
        </ForeplaySectionContainer>
      </section>
    </>
  )
}
