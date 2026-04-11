import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "Merge Data | Foreplay", description: "Merge Data stub." }

export default function Page() {
  return (
    <ForeplayStubInheritancePage
      title="Merge Data"
      note="Functional utility tool — không có Foreplay counterpart. Có thể giữ UI hiện tại hoặc refactor riêng."
    />
  )
}
