import type { Metadata } from "next"
import { BatchWatermarkContent } from "./batch-watermark-content"

export const metadata: Metadata = {
  title: "Batch Watermark Tool | Add Watermarks to Images",
  description: "Add watermarks to multiple images at once. Free batch watermark tool for protecting your ad creatives.",
}

export default function BatchWatermarkPage() {
  return <BatchWatermarkContent />
}
