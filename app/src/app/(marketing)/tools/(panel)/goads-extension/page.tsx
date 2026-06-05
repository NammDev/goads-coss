import type { Metadata } from "next"
import { Chrome } from "lucide-react"

import { ToolBody } from "@/components/tools/body"
import { ToolHeader } from "@/components/tools/header"
import { ExtensionTool } from "@/components/tools/extension"

export const metadata: Metadata = {
  title: "GOADS Extension | GOADS Tools",
  description:
    "Free Chrome extension to bypass Business Manager invites and login by cookie. Built for ad agencies.",
}

export default function ExtensionPage() {
  return (
    <>
      <ToolHeader icon={<Chrome className="size-7" />} title="GOADS Extension" />
      <ToolBody>
        <ExtensionTool />
      </ToolBody>
    </>
  )
}
