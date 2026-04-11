import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "Milestones | Foreplay", description: "Milestones stub." }

export default function Page() {
  return (
    <ForeplayStubInheritancePage
      title="Milestones"
      note="Target source: featurebase.app/en/roadmap (external)."
    />
  )
}
