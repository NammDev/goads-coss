import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "Freelancers & Creators | Foreplay", description: "Freelancers stub." }

export default function Page() {
  return <ForeplayStubInheritancePage title="Freelancers & Creators" inheritsFrom="/foreplay/industries/ecommerce" />
}
