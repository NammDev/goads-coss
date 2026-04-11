import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "Refund Policy | Foreplay", description: "Refund Policy stub." }

export default function Page() {
  return <ForeplayStubInheritancePage title="Refund Policy" inheritsFrom="/foreplay/page/privacy-policy" />
}
