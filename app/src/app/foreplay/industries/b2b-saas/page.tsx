import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "B2B & SaaS | Foreplay", description: "B2B SaaS stub." }

export default function Page() {
  return <ForeplayStubInheritancePage title="B2B & SaaS" inheritsFrom="/foreplay/industries/ecommerce" />
}
