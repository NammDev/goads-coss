import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "About | Foreplay", description: "About stub." }

export default function Page() {
  return <ForeplayStubInheritancePage title="About" />
}
