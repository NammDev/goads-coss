import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "TikTok Agency | Foreplay", description: "TikTok Agency stub." }

export default function Page() {
  return <ForeplayStubInheritancePage title="TikTok Agency" inheritsFrom="/foreplay/swipe-file" />
}
