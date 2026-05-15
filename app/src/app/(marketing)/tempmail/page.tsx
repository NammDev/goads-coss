// Foreplay /tempmail — UI-only page (no business logic).
// Sections: Hero (dark, ForeplaySolutionHero) → Mail Viewer (white block) → FAQ → Final CTA.
// Header + footer provided by app/src/app/foreplay/layout.tsx.

import {
  ForeplaySectionContainer,
  ForeplaySectionWhiteBlock,
  ForeplayProductPageFaqAccordion,
  ForeplayHomeCta,
  ForeplaySolutionHero,
} from "@/components/foreplay"
import {
  tempmailHero,
  tempmailFaq,
} from "@/data/foreplay-tempmail-page-data"
import { TempMailViewer } from "@/components/temp-mail/temp-mail-viewer"

export default function TempmailPage() {
  return (
    <>
      {/* Section 1: Hero (dark) — clones /tools composition
          pb-[108px] compensates for hidden CTA buttons (--fp-py-section). Without this,
          description sits flush against the white block — see design-guideline.md section padding tokens. */}
      <div className="section pb-[108px] max-md:pb-24 max-sm:pb-20">
        <ForeplaySectionContainer>
          <ForeplaySolutionHero
            icon={<MailIcon />}
            subtitle={tempmailHero.subtitle}
            title={tempmailHero.title}
            description={tempmailHero.description}
            hideButtons
          />
        </ForeplaySectionContainer>
      </div>

      {/* Section 2: Mail Viewer (white block) — integrated real logic */}
      <ForeplaySectionWhiteBlock>
        <div className="px-10 py-[108px] max-md:px-6 max-md:py-24 max-sm:px-4 max-sm:py-20 max-w-[1136px] mx-auto">
          <TempMailViewer />
        </div>
      </ForeplaySectionWhiteBlock>

      {/* Section 3: FAQ */}
      <div className="section">
        <ForeplaySectionContainer variant="wide">
          <ForeplayProductPageFaqAccordion {...tempmailFaq} />
        </ForeplaySectionContainer>
      </div>

      {/* Section 4: Final CTA — "Your next winning campaign starts here" */}
      <div className="section overflow-hidden">
        <ForeplaySectionContainer variant="wide">
          <ForeplayHomeCta />
        </ForeplaySectionContainer>
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
