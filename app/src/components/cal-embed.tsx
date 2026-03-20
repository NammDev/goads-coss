"use client"

import Cal from "@calcom/embed-react"
import { useTheme } from "next-themes"

interface CalEmbedProps {
  calLink: string
}

/** Inline Cal.com scheduling embed with theme sync */
export function CalEmbed({ calLink }: CalEmbedProps) {
  const { resolvedTheme } = useTheme()

  return (
    <Cal
      calLink={calLink}
      config={{
        theme: resolvedTheme === "dark" ? "dark" : "light",
        hideEventTypeDetails: "false",
      }}
      style={{ width: "100%", height: "100%", overflow: "auto" }}
    />
  )
}
