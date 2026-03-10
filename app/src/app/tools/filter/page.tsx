import type { Metadata } from "next"
import { FilterContent } from "./filter-content"

export const metadata: Metadata = {
  title: "Data Filter | Filter Fields (2FA, Email, UID)",
  description: "Filter and extract specific data fields — 2FA codes, emails, passwords, UIDs. Free data filtering tool.",
}

export default function FilterPage() {
  return <FilterContent />
}
