import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "Find Facebook ID | Foreplay", description: "Find Facebook ID stub." }

export default function Page() {
  return (
    <ForeplayStubInheritancePage
      title="Find Facebook ID"
      note="Functional utility tool — không có Foreplay counterpart. Có thể giữ UI hiện tại hoặc refactor riêng."
    />
  )
}
