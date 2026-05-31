import type { Metadata } from "next"

import { ToolBody } from "@/components/tools/body"
import { ToolHeader } from "@/components/tools/header"
import { SplitDataTool } from "@/components/tools/split-data"

export const metadata: Metadata = {
  title: "Split Data Profile | GoAds Tools",
  description: "Split text by delimiter into separate columns.",
}

function ScissorsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="8" cy="24" r="3.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M10.5 10.5 26 26M10.5 21.5 26 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function SplitDataPage() {
  return (
    <>
      <ToolHeader icon={<ScissorsIcon />} title="Split Data Profile" />
      <ToolBody>
        <SplitDataTool />
      </ToolBody>
    </>
  )
}
