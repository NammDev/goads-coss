import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "Payment Methods | Foreplay", description: "Payment stub." }

export default function Page() {
  return <ForeplayStubInheritancePage title="Payment Methods" />
}
