import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "Agencies | Foreplay", description: "Agencies stub." }

export default function Page() {
  return <ForeplayStubInheritancePage title="Agencies" inheritsFrom="/foreplay/industries/ecommerce" />
}
