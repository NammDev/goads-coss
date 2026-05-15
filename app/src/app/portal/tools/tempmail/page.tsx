import type { Metadata } from "next"
import { TempMailViewer } from "@/components/temp-mail/temp-mail-viewer"

export const metadata: Metadata = {
  title: "Temp Mail — Portal",
  description: "Tạo địa chỉ email tạm thời và nhận mail trong vài giây.",
  robots: { index: false, follow: false },
}

export default function TempMailPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Temp Mail</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Tạo địa chỉ email tạm thời để nhận mail trong thời gian ngắn.
        </p>
      </div>
      <TempMailViewer />
    </div>
  )
}
