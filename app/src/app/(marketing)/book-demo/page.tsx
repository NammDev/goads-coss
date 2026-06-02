// Foreplay book-demo page — /book-demo (Talk to Sales)
// DOM: section.overflow-hidden.old-demo > .container.section-container > .demo-hero
//    + section > .section-padding > .section-white-block > .container > .demo-socialproof

import { DotBg } from "@/components/atoms/dot-bg"
import { SectionContainer } from "@/components/atoms/section-container"
import { SectionWhiteBlock } from "@/components/atoms/section-white-block"
import { DemoHero } from "@/components/demo/hero"
import { DemoSocialProof } from "@/components/demo/social-proof"
import { SenjaReviewMasonryGrid } from "@/components/reviews/senja-masonry-grid"
import { goadsReviews } from "@/data/reviews-data"

export default function BookDemoPage() {
  return (
    <>
      {/* Section 1: Demo Hero (dark bg + dot grid) */}
      <section className="relative overflow-hidden">
        <DotBg />
        <SectionContainer>
          <DemoHero />
        </SectionContainer>
      </section>

      {/* Section 2: Social Proof + Reviews (white block) */}
      <section>
        <SectionWhiteBlock>
          <SectionContainer>
            <DemoSocialProof />
          </SectionContainer>
          <SectionContainer>
            <div className="pb-16">
              <SenjaReviewMasonryGrid reviews={goadsReviews} initialCount={8} loadMoreCount={8} />
            </div>
          </SectionContainer>
        </SectionWhiteBlock>
      </section>
    </>
  )
}
