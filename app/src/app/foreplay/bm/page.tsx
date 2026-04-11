import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "Business Managers | Foreplay", description: "BM stub." }

export default function Page() {
  return <ForeplayStubInheritancePage title="Business Managers" inheritsFrom="/foreplay/profiles" />
}
