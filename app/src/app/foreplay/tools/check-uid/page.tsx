import type { Metadata } from "next"

import {
  ForeplayToolShell,
  ForeplayToolHeader,
  ForeplayToolBody,
} from "@/components/foreplay"
import { ForeplayCheckUidTool } from "@/components/foreplay/foreplay-check-uid-tool"

export const metadata: Metadata = {
  title: "Check Live UID | Foreplay Tools",
  description: "Check if Facebook UIDs are live or dead accounts.",
}

function ScanFaceIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <path
        d="M5 10V7a2 2 0 0 1 2-2h3M27 10V7a2 2 0 0 0-2-2h-3M5 22v3a2 2 0 0 0 2 2h3M27 22v3a2 2 0 0 1-2 2h-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="14" r="1.4" fill="currentColor" />
      <circle cx="20" cy="14" r="1.4" fill="currentColor" />
      <path
        d="M12 20c1.2 1 2.5 1.5 4 1.5s2.8-.5 4-1.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function ForeplayCheckUidPage() {
  return (
    <ForeplayToolShell>
      <ForeplayToolHeader icon={<ScanFaceIcon />} title="Check Live UID" />
      <ForeplayToolBody>
        <ForeplayCheckUidTool />
      </ForeplayToolBody>
    </ForeplayToolShell>
  )
}
