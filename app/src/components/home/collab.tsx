// Foreplay home collab organism — .home-collab + .lens-enrichment + .home-sharing
// DOM inside .section-white-block:
//   .home-collab > .container.section-container > .section-head (centered)
//   .lens-enrichment.home-enrichment (illustration — placeholder)
//   .container > .home-sharing (tabs grid)
// .home-collab: flex col, gap-10 (40px via grid-row-gap), items-center, py-20 (80px)

import { SectionContainer } from "@/components/atoms/section-container"
import { SectionHead } from "@/components/atoms/section-head"
import { HomeSharing } from "@/components/home/sharing"

export function HomeCollab() {
  return (
    <>
      {/* .container > .home-sharing */}
      <SectionContainer variant="wide" className="overflow-hidden">
        <HomeSharing />
      </SectionContainer>
    </>
  )
}
