import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "TikTok Accounts | Foreplay", description: "TikTok Accounts stub." }

export default function Page() {
  return <ForeplayStubInheritancePage title="TikTok Accounts" inheritsFrom="/foreplay/profiles" />
}
