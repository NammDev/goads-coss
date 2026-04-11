import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "Facebook Pages | Foreplay", description: "Facebook Pages stub." }

export default function Page() {
  return <ForeplayStubInheritancePage title="Facebook Pages" inheritsFrom="/foreplay/profiles" />
}
