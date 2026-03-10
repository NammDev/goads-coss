import type { Metadata } from "next"
import { FindFbIdContent } from "./find-fb-id-content"

export const metadata: Metadata = {
  title: "Find Facebook ID | FB Profile ID Lookup",
  description: "Find any Facebook profile or page ID from URL. Free Facebook ID finder tool.",
}

export default function FindFbIdPage() {
  return <FindFbIdContent />
}
