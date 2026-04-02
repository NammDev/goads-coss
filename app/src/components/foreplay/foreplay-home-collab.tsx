// Foreplay home collab organism — .home-collab + .lens-enrichment + .home-sharing
// DOM inside .section-white-block:
//   .home-collab > .container.section-container > .section-head (centered)
//   .lens-enrichment.home-enrichment (illustration — placeholder)
//   .container > .home-sharing (tabs grid)
// .home-collab: flex col, gap-10 (40px via grid-row-gap), items-center, py-20 (80px)

import { ForeplaySectionContainer } from "@/components/foreplay/foreplay-section-container"
import { ForeplaySectionHead } from "@/components/foreplay/foreplay-section-head"
import { ForeplayHomeSharing } from "@/components/foreplay/foreplay-home-sharing"

export function ForeplayHomeCollab() {
  return (
    <>
      {/* .home-collab */}
      <div className="flex flex-col items-center gap-10 py-20">
        <ForeplaySectionContainer>
          <ForeplaySectionHead
            subtitle="Collaboration"
            title="Bringing performance & creative teams together."
            titleTag="h2" titleSize="h2"
            description="Magic happens when strategy, creative, and data speak the same language. Foreplay bridges the gap between media buyers, creatives, and agencies."
            descSize="l"
            variant="dark"
          />
        </ForeplaySectionContainer>
      </div>

      {/* .lens-enrichment.home-enrichment — illustration placeholder */}
      <div className="mb-20 flex flex-col gap-32 overflow-x-clip">
        <figure className="relative -mx-20 grid auto-cols-fr grid-cols-1 gap-4 [aspect-ratio:1440/520]">
          {/* Placeholder for Venn diagram SVG illustration — user replaces */}
          <div className="flex items-center justify-center">
            <div className="text-[var(--fp-solid-400)]">Enrichment illustration placeholder</div>
          </div>
        </figure>
      </div>

      {/* .container > .home-sharing */}
      <div className="mx-auto w-full max-w-[1440px] px-10 overflow-hidden">
        <ForeplayHomeSharing />
      </div>
    </>
  )
}
