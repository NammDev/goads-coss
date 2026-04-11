import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "Agency Ad Account | Foreplay", description: "Agency Ad Account stub." }

export default function Page() {
  return <ForeplayStubInheritancePage title="Agency Ad Account" inheritsFrom="/foreplay/swipe-file" />
}
