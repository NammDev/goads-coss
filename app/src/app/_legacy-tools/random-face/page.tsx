import type { Metadata } from "next"
import { RandomFaceContent } from "./random-face-content"

export const metadata: Metadata = {
  title: "Random Face Generator | AI Avatar Photos",
  description: "Generate random avatar photos instantly. Free random face generator for testing and prototyping.",
}

export default function RandomFacePage() {
  return <RandomFaceContent />
}
