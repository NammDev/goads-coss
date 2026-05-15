import type { Metadata } from "next"
import { SplitDataContent } from "./split-data-content"

export const metadata: Metadata = {
  title: "Split Data Tool | Divide Data into Parts",
  description: "Split large data sets into smaller parts. Free data splitting tool for batch processing.",
}

export default function SplitDataPage() {
  return <SplitDataContent />
}
