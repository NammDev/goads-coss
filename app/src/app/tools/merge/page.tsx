import type { Metadata } from "next"
import { MergeContent } from "./merge-content"

export const metadata: Metadata = {
  title: "Data Merge Tool | Combine Data Sets",
  description: "Merge and combine multiple data sets into one. Free data merging tool for account management.",
}

export default function MergePage() {
  return <MergeContent />
}
