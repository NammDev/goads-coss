import type { Metadata } from "next"
import { FilterTextContent } from "./filter-text-content"

export const metadata: Metadata = {
  title: "Text Filter | Filter & Clean Text Data",
  description: "Filter and clean text data with multiple options. Free text filtering tool for data processing.",
}

export default function FilterTextPage() {
  return <FilterTextContent />
}
