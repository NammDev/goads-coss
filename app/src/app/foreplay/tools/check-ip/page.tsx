import type { Metadata } from "next"

import {
  ForeplayToolShell,
  ForeplayToolHeader,
  ForeplayToolBody,
} from "@/components/foreplay"
import { ForeplayCheckIpTool } from "@/components/foreplay/foreplay-check-ip-tool"

export const metadata: Metadata = {
  title: "IP Checker | Foreplay Tools",
  description: "View your current public IP address and location info.",
}

function GlobeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="2" />
      <path
        d="M5 16h22M16 5c3 3 5 7 5 11s-2 8-5 11M16 5c-3 3-5 7-5 11s2 8 5 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function ForeplayCheckIpPage() {
  return (
    <ForeplayToolShell>
      <ForeplayToolHeader icon={<GlobeIcon />} title="IP Checker" />
      <ForeplayToolBody>
        <ForeplayCheckIpTool />
      </ForeplayToolBody>
    </ForeplayToolShell>
  )
}
