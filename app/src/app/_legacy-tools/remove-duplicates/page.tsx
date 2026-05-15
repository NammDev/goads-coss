import type { Metadata } from "next"
import { RemoveDuplicatesContent } from "./remove-duplicates-content"

export const metadata: Metadata = {
  title: "Remove Duplicates | Clean Duplicate Lines",
  description: "Remove duplicate lines from your data. Free deduplication tool with multiple sorting options.",
}

export default function RemoveDuplicatesPage() {
  return <RemoveDuplicatesContent />
}
