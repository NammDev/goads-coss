// /giveaway — Foreplay MCP UI clone, content-only (200 free aged Facebook pages).
// Section 1: Hero + Claim steps (dark, dot grid) → Section 2: Feature rows (white
// block) → Section 3: Final CTA (reused HomeCta). Components own their SectionContainer;
// the page provides only the <section> + DotBg (mirror of book-demo/page.tsx).

import type { Metadata } from "next"
import { SectionContainer } from "@/components/atoms/section-container"
import { GiveawayHero } from "@/components/giveaway/giveaway-hero"
import { GiveawayClaimSteps } from "@/components/giveaway/giveaway-claim-steps"
import { GiveawayFeatureRows } from "@/components/giveaway/giveaway-feature-rows"
import { ProductPageFaqAccordion } from "@/components/product/page-faq-accordion"
import { HomeCta } from "@/components/home/cta"
import { giveawayFaq, giveawayFinalCta } from "@/data/giveaway-page-data"

export const metadata: Metadata = {
  title: "200 Free Facebook Pages Giveaway | GOADS",
  description:
    "Claim one of 200 free aged, reinstated Facebook Pages ($35 each, $7,000 total). Created 2021–2023. First 200 only — join Telegram and Discord to claim.",
  alternates: { canonical: "/giveaway" },
  openGraph: {
    title: "200 Free Facebook Pages Giveaway | GOADS",
    description:
      "200 free aged, reinstated Facebook Pages — $35 each, $7,000 total. First 200 only.",
    url: "/giveaway",
  },
}

export default function GiveawayPage() {
  return (
    <>
      {/* Section 1: Hero + Claim steps (plain dark background, no dot grid).
          pt offsets the sticky translucent header so the hero doesn't hug it. */}
      <section className="relative overflow-hidden pt-8 max-sm:pt-8">
        <GiveawayHero />
        <GiveawayClaimSteps />
      </section>

      {/* Section 2: Feature rows (white block — component owns the white block) */}
      <GiveawayFeatureRows />

      {/* Section 3: FAQ (reused ProductPageFaqAccordion, dark bg, wide container) */}
      <section className="relative overflow-hidden">
        <SectionContainer variant="wide">
          <ProductPageFaqAccordion {...giveawayFaq} />
        </SectionContainer>
      </section>

      {/* Section 4: Final CTA (reused HomeCta with giveaway copy, single button) */}
      <HomeCta
        title={giveawayFinalCta.title}
        description={giveawayFinalCta.description}
        primaryLabel={giveawayFinalCta.primaryLabel}
        primaryHref={giveawayFinalCta.primaryHref}
        secondaryLabel=""
      />
    </>
  )
}
