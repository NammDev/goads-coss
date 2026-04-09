// Foreplay /blue-verification — composed from existing foreplay sections
// Section order (per user spec):
//   1. Hero (from /foreplay/university/classes)
//   2. Left-right feature rows (from /foreplay/university/classes)
//   3. Examples grid "eCommerce Advertising Inspiration" (from /foreplay/industries/ecommerce)
//   4. Reviews masonry (white bg)
//   5. FAQ accordion
//   6. Final CTA banner
// Header/footer from foreplay layout.tsx (keep existing layout)

import {
  ForeplaySectionContainer,
  ForeplaySectionHead,
  ForeplaySectionWhiteBlock,
  ForeplayHomeCta,
} from "@/components/foreplay"
import { ForeplayUniversityHero } from "@/components/foreplay/foreplay-university-hero"
import { ForeplayUniversityCourseCarousel } from "@/components/foreplay/foreplay-university-course-carousel"
import { ForeplayUniversityFeatureRow } from "@/components/foreplay/foreplay-university-feature-row"
import { ForeplaySolutionExamplesGrid } from "@/components/foreplay/foreplay-solution-examples-grid"
import { ForeplayProductPageFaqAccordion } from "@/components/foreplay/foreplay-product-page-faq-accordion"
import { SenjaReviewMasonryGrid } from "@/components/foreplay/senja-review-masonry-grid"
import {
  universityHero,
  courseCards,
  featureRows,
} from "@/data/foreplay-university-classes-page-data"
import {
  ecommerceExamplesSection,
  ecommerceExamples,
} from "@/data/foreplay-ecommerce-solution-page-data"
import { goadsReviews } from "@/data/goads-reviews-data"

// FAQ items — verification-specific
const verificationFaq = {
  subtitle: "FAQ",
  title: "Questions about Blue Verification?",
  description:
    "Most frequent questions about our blue badge verification service across Meta, TikTok and Business Manager.",
  items: [
    {
      question: "How long does verification take?",
      answer:
        "Most verifications complete within 7-14 business days. Timeline depends on platform review queue and account eligibility.",
    },
    {
      question: "What platforms do you verify?",
      answer:
        "We support Facebook, Instagram, TikTok and Meta Business Manager. Contact us for other platforms.",
    },
    {
      question: "Do you guarantee verification?",
      answer:
        "We have a 95%+ success rate. If verification is denied, we offer a full refund or reattempt at no extra cost.",
    },
    {
      question: "What do I need to provide?",
      answer:
        "Basic account info, proof of identity or business registration, and access to your account. We handle the rest.",
    },
    {
      question: "Is this official Meta verification?",
      answer:
        "Yes. We submit your application through official Meta channels. You get the real blue badge on your account.",
    },
  ],
}

export default function ForeplayBlueVerificationPage() {
  return (
    <>
      {/* ═══ Section 1: Hero (from /foreplay/university/classes) ═══ */}
      <ForeplayUniversityHero {...universityHero}>
        <ForeplayUniversityCourseCarousel cards={courseCards} />
      </ForeplayUniversityHero>

      {/* ═══ Section 2: Left-Right Feature Rows (from /foreplay/university/classes) ═══ */}
      {/* pb section scale added for /blue-verification only (not shared with /industries/ecommerce) */}
      <div className="section pb-(--fp-py-section) max-md:pb-(--fp-py-section-md) max-sm:pb-(--fp-py-section-sm)">
        <ForeplaySectionContainer>
          {/* .left-right-section-wrapper: flex col, gap-80px */}
          <div className="flex flex-col gap-20">
            {featureRows.map((row, i) => (
              <ForeplayUniversityFeatureRow key={i} {...row} />
            ))}
          </div>
        </ForeplaySectionContainer>
      </div>

      {/* ═══ Section 3: Examples Grid "eCommerce Advertising Inspiration" (from /foreplay/industries/ecommerce) ═══ */}
      <div className="section">
        <div className="flex flex-col py-[108px] max-md:py-24 max-sm:py-20">
          <ForeplaySectionContainer>
            <ForeplaySectionHead
              subtitle={ecommerceExamplesSection.subtitle}
              title={ecommerceExamplesSection.title}
              titleSize="h2"
              description={ecommerceExamplesSection.description}
              descSize="l"
              variant="light"
            />
            <div className="block pt-12 max-md:pt-10">
              <ForeplaySolutionExamplesGrid cards={ecommerceExamples} />
            </div>
          </ForeplaySectionContainer>
        </div>
      </div>


      {/* ═══ Section 5: FAQ ═══ */}
      {/* Override default py-[140px] → py-108px for this route */}
      <div className="section">
        <ForeplaySectionContainer variant="wide">
          <ForeplayProductPageFaqAccordion
            {...verificationFaq}
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
