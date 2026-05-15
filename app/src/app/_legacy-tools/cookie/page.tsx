import type { Metadata } from "next"
import { CookieContent } from "./cookie-content"

export const metadata: Metadata = {
  title: "Cookie Converter | Parse & Format Cookies",
  description: "Convert and format browser cookies. Free cookie parsing tool for ad account management.",
}

export default function CookiePage() {
  return <CookieContent />
}
