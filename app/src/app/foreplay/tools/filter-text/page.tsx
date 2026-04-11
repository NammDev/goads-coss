import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "Filter Text | Foreplay", description: "Filter Text stub." }

export default function Page() {
  return (
    <ForeplayStubInheritancePage
      title="Filter Text"
      note="Functional utility tool — không có Foreplay counterpart. Có thể giữ UI hiện tại hoặc refactor riêng."
    />
  )
}
