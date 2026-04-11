import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "Fake ID Generator | Foreplay", description: "Fake ID Generator stub." }

export default function Page() {
  return (
    <ForeplayStubInheritancePage
      title="Fake ID Generator"
      note="Functional utility tool — không có Foreplay counterpart. Có thể giữ UI hiện tại hoặc refactor riêng."
    />
  )
}
