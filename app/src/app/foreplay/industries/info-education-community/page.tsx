import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "Info, Education & Community | Foreplay", description: "Info/Education stub." }

export default function Page() {
  return <ForeplayStubInheritancePage title="Info, Education & Community" inheritsFrom="/foreplay/industries/ecommerce" />
}
