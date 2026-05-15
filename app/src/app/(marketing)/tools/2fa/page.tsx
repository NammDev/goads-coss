// Foreplay /tools/2fa — functional TOTP tool.
// Composition uses tool design language atoms — see docs/foreplay/tool-design-language.md

import type { Metadata } from "next"

import {
  ForeplayToolShell,
  ForeplayToolHeader,
  ForeplayToolBody,
  ForeplayTwoFaTool,
} from "@/components/foreplay"

export const metadata: Metadata = {
  title: "2FA Code Generator | Foreplay Tools",
  description:
    "Generate TOTP two-factor authentication codes from your 2FA secrets. Browser-only — no signup, no server.",
}

function ShieldCheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <path
        d="M16 4.667 5.333 9.333v6.667c0 6.166 4.553 11.933 10.667 13.333 6.114-1.4 10.667-7.167 10.667-13.333V9.333L16 4.667Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m12 16 3 3 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ForeplayTwoFaPage() {
  return (
    <ForeplayToolShell>
      <ForeplayToolHeader icon={<ShieldCheckIcon />} title="2FA Generator" />
      <ForeplayToolBody>
        <ForeplayTwoFaTool />
      </ForeplayToolBody>
    </ForeplayToolShell>
  )
}
