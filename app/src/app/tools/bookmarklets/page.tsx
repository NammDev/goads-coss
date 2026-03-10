import type { Metadata } from "next"
import { BookmarkletsContent } from "./bookmarklets-content"

export const metadata: Metadata = {
  title: "Bookmarklets Collection | Browser Shortcuts",
  description: "Useful browser bookmarklets for ad management — copy UIDs, dark mode, clear cookies, and more.",
}

export default function BookmarkletsPage() {
  return <BookmarkletsContent />
}
