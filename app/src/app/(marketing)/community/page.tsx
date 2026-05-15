import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "Community | Foreplay", description: "Community stub." }

export default function Page() {
  return <ForeplayStubInheritancePage title="Community" note="Target source: featurebase.app/en (external)." />
}
