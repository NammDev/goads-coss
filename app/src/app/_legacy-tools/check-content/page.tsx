import type { Metadata } from "next"
import { CheckContentContent } from "./check-content-content"

export const metadata: Metadata = {
  title: "Content Checker | Validate Ad Content",
  description: "Check and validate your ad content for compliance. Free content checking tool for advertisers.",
}

export default function CheckContentPage() {
  return <CheckContentContent />
}
