// Foreplay reviews page — /reviews (Wall of Love)
// SOURCE DOM: .section > .container.section-container > .pricing > .section-head
//           + .section-padding > .section-white-block > .section > .container > .comparison > senja-embed
// Extremely simple: 1 section head + 1 Senja widget embed inside white block

import { SectionContainer } from "@/components/atoms/section-container"
import { SectionHead } from "@/components/atoms/section-head"
import { SectionWhiteBlock } from "@/components/atoms/section-white-block"
import { HomeCta } from "@/components/home/cta"
import { SenjaReviewMasonryGrid } from "@/components/reviews/senja-masonry-grid"
import { goadsReviews } from "@/data/reviews-data"

export default function ReviewsPage() {
  return (
    <>
      {/* ═══ Section 1: Hero Header ═══ */}
      {/* .section > .container.section-container > .pricing > .section-head */}
      <section>
        <SectionContainer variant="section">
          {/* .pricing: flex col, pt-[72px] pb-[108px] */}
          <div className="flex flex-col pt-[72px] pb-[108px] max-sm:pt-10 max-sm:pb-20">
            <SectionHead
              subtitle="Wall of Love"
              title="What customers have to say"
              titleTag="h2"
              titleSize="h2"
              description="Don't just take our word for it. See what advertisers say about GoAds."
              descSize="l"
              variant="light"
            />
          </div>
        </SectionContainer>
      </section>

      {/* ═══ Section 2: Reviews Widget (white block) ═══ */}
      {/* .section-padding > .section-white-block > .section > .container > .comparison > senja-embed */}
      <SectionWhiteBlock>
        <SectionContainer variant="wide">
          <div className="py-16">
            <SenjaReviewMasonryGrid reviews={goadsReviews} initialCount={10} loadMoreCount={10} />
          </div>
        </SectionContainer>
      </SectionWhiteBlock>

      {/* ═══ Section 3: Final CTA ═══ */}
      <section className="overflow-hidden">
        <SectionContainer variant="section">
          <HomeCta />
        </SectionContainer>
      </section>
    </>
  )
}
