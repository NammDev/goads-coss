import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "Random Face | Foreplay", description: "Random Face stub." }

export default function Page() {
  return (
    <ForeplayStubInheritancePage
      title="Random Face"
      note="Functional utility tool — không có Foreplay counterpart. Có thể giữ UI hiện tại hoặc refactor riêng."
    />
  )
}
