import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "Google Agency | Foreplay", description: "Google Agency stub." }

export default function Page() {
  return <ForeplayStubInheritancePage title="Google Agency" inheritsFrom="/foreplay/swipe-file" />
}
