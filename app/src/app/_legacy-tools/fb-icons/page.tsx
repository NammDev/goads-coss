import type { Metadata } from "next"
import { FbIconsContent } from "./fb-icons-content"

export const metadata: Metadata = {
  title: "Facebook Icons | FB Emoji & Icon Collection",
  description: "Browse and copy Facebook icons and emojis. Free icon collection for social media marketing.",
}

export default function FbIconsPage() {
  return <FbIconsContent />
}
