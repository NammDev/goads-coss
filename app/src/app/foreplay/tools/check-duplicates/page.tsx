import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "Check Duplicates | Foreplay", description: "Check Duplicates stub." }

export default function Page() {
  return (
    <ForeplayStubInheritancePage
      title="Check Duplicates"
      note="Functional utility tool — không có Foreplay counterpart. Có thể giữ UI hiện tại hoặc refactor riêng."
    />
  )
}
