import type { Metadata } from "next"
import { Chrome } from "lucide-react"

import { ToolBody } from "@/components/tools/body"
import { ToolHeader } from "@/components/tools/header"
import { ExtensionTool } from "@/components/tools/extension"
import { brand } from "@/config/brand"

export const metadata: Metadata = {
  title: `${brand.name} Extension | ${brand.name} Tools`,
  description:
    "Free Chrome extension to bypass Business Manager invites and login by cookie. Built for ad agencies.",
}

export default function ExtensionPage() {
  return (
    <>
      <ToolHeader icon={<Chrome className="size-7" />} title={`${brand.name} Extension`} />
      <ToolBody>
        <ExtensionTool />
      </ToolBody>
    </>
  )
}
