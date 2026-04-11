import type { Metadata } from "next"
import { ForeplayStubInheritancePage } from "@/components/foreplay/foreplay-stub-inheritance-page"

export const metadata: Metadata = { title: "2FA Generator | Foreplay", description: "2FA Generator stub." }

export default function Page() {
  return (
    <ForeplayStubInheritancePage
      title="2FA Generator"
      note="Functional utility tool — không có Foreplay counterpart. Có thể giữ UI hiện tại hoặc refactor riêng."
    />
  )
}
