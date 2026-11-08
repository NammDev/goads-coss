// Foreplay /tempmail — UI-only page (no business logic).
// Sections: Hero (dark) → Mail viewer (white block) + promo rail → FAQ → Final CTA.
// Header + footer provided by app/src/app/foreplay/layout.tsx.

import { SectionContainer } from "@/components/atoms/section-container"
import { SectionWhiteBlock } from "@/components/atoms/section-white-block"
import { HomeCta } from "@/components/home/cta"
import { ProductPageFaqAccordion } from "@/components/product/page-faq-accordion"
import { SolutionHero } from "@/components/solution/hero"
import {
  tempmailHero,
  tempmailFaq,
} from "@/data/tempmail-page-data"
import { TempMailViewer } from "@/components/temp-mail/temp-mail-viewer"
import { ToolsPromoRail, ToolsPromoRow } from "@/components/tools/promo-rail"

export default function TempmailPage() {
  return (
    <>
      {/* Section 1: Hero (dark) — clones /tools composition
          pb-[108px] compensates for hidden CTA buttons (--py-section). Without this,
          description sits flush against the white block — see design-guideline.md section padding tokens. */}
      <div className="section pb-[108px] max-md:pb-24 max-sm:pb-20">
        <SectionContainer>
          <SolutionHero
            icon={<MailIcon />}
            subtitle={tempmailHero.subtitle}
            title={tempmailHero.title}
            description={tempmailHero.description}
            hideButtons
          />
        </SectionContainer>
      </div>

      {/* Section 2: Mail viewer + promo rail.
          Mirrors the /tools shell: the tool sits in a white block, the promo
          rides the dark page background beside it. That means the white block
          is contained here rather than full-bleed — there is no room for a
          rail next to an edge-to-edge block. Inner padding drops from
          py-[108px] to the tool-panel rhythm (p-8), since a contained card
          does not need section-sized padding inside it. */}
      <div className="pb-[108px] max-md:pb-24 max-sm:pb-16">
        <SectionContainer variant="wide">
          <div className="flex gap-8">
            <div className="flex min-w-0 flex-1 flex-col gap-6">
              <SectionWhiteBlock>
                <div className="p-8 max-md:p-5">
                  <TempMailViewer />
                </div>
              </SectionWhiteBlock>
              {/* Below xl the rail has nowhere to sit, so the offers follow the
                  tool instead of disappearing. */}
              <ToolsPromoRow className="xl:hidden" />
            </div>

            <ToolsPromoRail />
          </div>
        </SectionContainer>
      </div>

      {/* Section 3: FAQ */}
      <div className="section">
        <SectionContainer variant="wide">
          <ProductPageFaqAccordion {...tempmailFaq} />
        </SectionContainer>
      </div>

      {/* Section 4: Final CTA — "Your next winning campaign starts here" */}
      <div className="section overflow-hidden">
        <SectionContainer variant="wide">
          <HomeCta />
        </SectionContainer>
      </div>
    </>
  )
}

// Envelope icon — co-located like EcommerceIcon in /tools page.
function MailIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.333 8h21.334c1.473 0 2.666 1.194 2.666 2.667v10.666c0 1.473-1.193 2.667-2.666 2.667H5.333a2.667 2.667 0 0 1-2.666-2.667V10.667C2.667 9.194 3.86 8 5.333 8Z"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m4 11 12 8 12-8"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
