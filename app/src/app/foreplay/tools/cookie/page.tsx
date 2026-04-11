import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "Cookie Converter | Foreplay", description: "Cookie Converter stub." }

export default function Page() {
  return (
    <ForeplayStubInheritancePage
      title="Cookie Converter"
      note="Functional utility tool — không có Foreplay counterpart. Có thể giữ UI hiện tại hoặc refactor riêng."
    />
  )
}
