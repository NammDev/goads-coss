import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "Unban | Foreplay", description: "Unban stub." }

export default function Page() {
  return <ForeplayStubInheritancePage title="Unban" inheritsFrom="/foreplay/blue-verification" />
}
