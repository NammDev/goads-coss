import type { Metadata } from "next"
import { CheckDuplicatesContent } from "./check-duplicates-content"

export const metadata: Metadata = {
  title: "Duplicate Checker | Find Duplicate Lines",
  description: "Find and identify duplicate lines in your data. Free duplicate detection tool with case-sensitive option.",
}

export default function CheckDuplicatesPage() {
  return <CheckDuplicatesContent />
}
