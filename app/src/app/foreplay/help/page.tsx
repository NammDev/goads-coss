import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "Help Center | Foreplay", description: "Help Center stub." }

export default function Page() {
  return <ForeplayStubInheritancePage title="Help Center" note="Target source: help.foreplay.co/en/help (external)." />
}
