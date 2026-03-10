import type { Metadata } from "next"
import { CheckUidContent } from "./check-uid-content"

export const metadata: Metadata = {
  title: "UID Checker | Validate Facebook UIDs",
  description: "Validate and check Facebook user IDs. Free UID verification tool for ad account management.",
}

export default function CheckUIDPage() {
  return <CheckUidContent />
}
