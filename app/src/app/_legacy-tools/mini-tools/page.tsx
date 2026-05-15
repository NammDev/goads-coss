import type { Metadata } from "next"
import { MiniToolsContent } from "./mini-tools-content"

export const metadata: Metadata = {
  title: "Mini Tools | Quick Utility Collection",
  description: "Collection of quick utility tools for everyday ad management tasks. Free mini tools by GoAds.",
}

export default function MiniToolsPage() {
  return <MiniToolsContent />
}
