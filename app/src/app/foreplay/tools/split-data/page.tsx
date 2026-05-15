import type { Metadata } from "next"

import {
  ForeplayToolShell,
  ForeplayToolHeader,
  ForeplayToolBody,
} from "@/components/foreplay"
import { ForeplaySplitDataTool } from "@/components/foreplay/foreplay-split-data-tool"

export const metadata: Metadata = {
  title: "Split Data Profile | Foreplay Tools",
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

export default function ForeplaySplitDataPage() {
  return (
    <ForeplayToolShell>
      <ForeplayToolHeader icon={<ScissorsIcon />} title="Split Data Profile" />
      <ForeplayToolBody>
        <ForeplaySplitDataTool />
      </ForeplayToolBody>
    </ForeplayToolShell>
  )
}
