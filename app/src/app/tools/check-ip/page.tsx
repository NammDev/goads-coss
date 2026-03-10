import type { Metadata } from "next"
import { CheckIpContent } from "./check-ip-content"

export const metadata: Metadata = {
  title: "IP Checker | Check Your IP Address",
  description: "Check your current IP address and geolocation. Free IP lookup tool for ad account management.",
}

export default function CheckIPPage() {
  return <CheckIpContent />
}
