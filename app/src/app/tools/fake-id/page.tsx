import type { Metadata } from "next"
import { FakeIdContent } from "./fake-id-content"

export const metadata: Metadata = {
  title: "ID Generator | Generate Test Identity Data",
  description: "Generate fictional identity data for testing purposes. Free ID generator tool for development and testing.",
}

export default function FakeIDPage() {
  return <FakeIdContent />
}
