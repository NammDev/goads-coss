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
      {/* .container > .home-sharing */}
      <ForeplaySectionContainer variant="wide" className="overflow-hidden">
        <ForeplayHomeSharing />
      </ForeplaySectionContainer>
    </>
  )
}
