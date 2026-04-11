import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "Terms of Service | Foreplay", description: "Terms of Service stub." }

export default function Page() {
  return <ForeplayStubInheritancePage title="Terms of Service" inheritsFrom="/foreplay/page/privacy-policy" />
}
