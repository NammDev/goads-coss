import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "Free Tools | Foreplay", description: "Tools hub stub." }

export default function Page() {
  return <ForeplayStubInheritancePage title="Free Tools" note="Hub landing page. Individual /tools/[slug] are functional utilities." />
}
