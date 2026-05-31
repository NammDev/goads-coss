// /free-action-plan — "Free Creative Strategy Action Plan" booking page.
// Mirrors the Foreplay popup (founder card + day picker + Book a Call CTA)
// as the centerpiece, wrapped in the standard marketing dark-hero layout.
// UI atom rendered here is built via the /clone-foreplay workflow.

import { DotBg } from "@/components/atoms/dot-bg"
import { SectionContainer } from "@/components/atoms/section-container"

export default function FreeActionPlanPage() {
  return (
    <section className="relative overflow-hidden">
      <DotBg />
      <SectionContainer>
        {/* Hero placeholder — replaced by the cloned popup atom
            (FreeActionPlanHero) once /clone-foreplay completes. */}
        <div className="flex min-h-[60vh] items-center justify-center py-20 text-foreground/60">
          Free Action Plan — popup clone goes here.
        </div>
      </SectionContainer>
    </section>
  )
}
