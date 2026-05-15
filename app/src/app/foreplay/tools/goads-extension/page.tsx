import type { Metadata } from "next"
import { Chrome } from "lucide-react"

import {
  ForeplayToolShell,
  ForeplayToolHeader,
  ForeplayToolBody,
} from "@/components/foreplay"
import { ForeplayGoadsExtensionTool } from "@/components/foreplay/foreplay-goads-extension-tool"

export const metadata: Metadata = {
  title: "GOADS Extension | Foreplay Tools",
  description:
    "Free Chrome extension to bypass Business Manager invites and login by cookie. Built for ad agencies.",
}

export default function ForeplayGoadsExtensionPage() {
  return (
    <ForeplayToolShell>
      <ForeplayToolHeader icon={<Chrome className="size-7" />} title="GOADS Extension" />
      <ForeplayToolBody>
        <ForeplayGoadsExtensionTool />
      </ForeplayToolBody>
    </ForeplayToolShell>
  )
}
