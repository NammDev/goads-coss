import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "Mobile Apps & Gaming | Foreplay", description: "Mobile Apps stub." }

export default function Page() {
  return <ForeplayStubInheritancePage title="Mobile Apps & Gaming" inheritsFrom="/foreplay/industries/ecommerce" />
}
