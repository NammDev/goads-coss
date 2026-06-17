"use client"

// Step chip — clone of Foreplay MCP .mcp-steps-button (+ .div-block-362 inner row).
// "link" → external anchor with chevron; "copy" → button that copies text and
// swaps the label to "Copied!" for 1.5s (React port of the source data-copy script).
// EXACT CSS (researcher-03): gap 8px / bg #ffffff14 (--alpha-800) / radius 8px /
// mt 12px / padding 8px 8px 8px 12px; inner div-block-362 gap 6px / flex 1.

import { useState } from "react"
import { siteText } from "@/components/atoms/typography"
import { cn } from "@/lib/utils"

type GiveawayChip =
  | { kind: "link"; label: string; href: string }
  | { kind: "copy"; label: string; copyText: string }

const CHIP_SHELL =
  "flex items-center gap-2 rounded-lg bg-[var(--alpha-800)] mt-3 py-2 pr-2 pl-3 text-foreground no-underline transition-all hover:bg-[var(--alpha-700)]"

export function GiveawayStepChip({ chip }: { chip: GiveawayChip }) {
  const [copied, setCopied] = useState(false)

  if (chip.kind === "link") {
    return (
      <a
        href={chip.href}
        target="_blank"
        rel="noopener noreferrer"
        className={CHIP_SHELL}
      >
        {/* .div-block-362 */}
        <span className="flex flex-1 items-center gap-1.5">
          <span className={cn(siteText.labelS, "text-foreground")}>
            {chip.label}
          </span>
        </span>
        <ChevronIcon />
      </a>
    )
  }

  const onCopy = () => {
    navigator.clipboard?.writeText(chip.copyText)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button type="button" onClick={onCopy} className={CHIP_SHELL}>
      <span className="flex flex-1 items-center gap-1.5">
        <span className={cn(siteText.labelS, "text-foreground")}>
          {copied ? "Copied!" : chip.label}
        </span>
      </span>
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  )
}

function IconShell({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex size-5 items-center justify-center opacity-[0.68]">
      {children}
    </span>
  )
}

function ChevronIcon() {
  return (
    <IconShell>
      <svg viewBox="0 0 20 20" width="20" height="20" fill="none">
        <path
          d="M8 6.5l3.5 3.5L8 13.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconShell>
  )
}

function CopyIcon() {
  return (
    <IconShell>
      <svg viewBox="0 0 20 20" width="20" height="20" fill="none">
        <path
          d="M7.75 7.75V4.5h8v8h-3.25M12.25 7.75h-8v8h8v-8Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconShell>
  )
}

function CheckIcon() {
  return (
    <IconShell>
      <svg viewBox="0 0 20 20" width="20" height="20" fill="none">
        <path
          d="M5 10.5l3.5 3.5L15 6.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconShell>
  )
}
