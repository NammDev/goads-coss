import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "Docs | Foreplay", description: "Documentation stub." }

export default function Page() {
  return <ForeplayStubInheritancePage title="Documentation" note="Target: Fumadocs at /docs (external to foreplay scope)." />
}
