import type { Metadata } from "next"
import { TwoFaContent } from "./two-fa-content"

export const metadata: Metadata = {
  title: "2FA Code Generator | Free TOTP Tool",
  description: "Generate TOTP two-factor authentication codes online. Free 2FA code generator for ad account security.",
}

export default function TwoFaPage() {
  return <TwoFaContent />
}
