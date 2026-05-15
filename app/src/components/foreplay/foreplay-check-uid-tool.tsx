// Foreplay Check Live UID — functional tool body.
// Spec: docs/foreplay/tool-design-language.md
// Logic ported verbatim from app/src/app/tools/check-uid/check-uid-content.tsx.
// UI: input card → progress chip → result cards (status dot + label) → bulk actions.

"use client"

import { useState } from "react"
import { ArrowRight, Copy, Download } from "lucide-react"

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplayLightPrimaryButton } from "@/components/foreplay/foreplay-light-primary-button"
import { ForeplayLightGhostAction } from "@/components/foreplay/foreplay-light-ghost-action"
import { ForeplayCodeChip } from "@/components/foreplay/foreplay-code-chip"

type UIDStatus = "LIVE" | "DEAD"
type UIDResult = { uid: string; status: UIDStatus }

// Smart UID extraction — customers often paste full profile dumps instead of
// pure UIDs. Order of preference:
//   1. Pure digit line                       → use as-is
//   2. First numeric field in pipe-separated row (profile dump)
//   3. c_user=NNN inside a cookie blob
//   4. Any 10–18 digit run in the line       (last-resort fallback)
function extractUid(line: string): string | null {
  const trimmed = line.trim()
  if (!trimmed) return null
  if (/^\d{10,18}$/.test(trimmed)) return trimmed
  for (const part of trimmed.split("|")) {
    const clean = part.trim()
    if (/^\d{10,18}$/.test(clean)) return clean
  }
  const cookieMatch = trimmed.match(/c_user=(\d{10,18})/)
  if (cookieMatch) return cookieMatch[1]
  const anyDigits = trimmed.match(/\b\d{10,18}\b/)
  return anyDigits ? anyDigits[0] : null
}

// UID liveness check goes through our Next.js API route (/api/check-uid).
// Browser-direct calls to Facebook Graph fail (CORS + auth) and <img> probes
// are inconsistent for new-format UIDs like 61…  The server route can spoof a
// real user-agent + inspect raw HTTP redirects, which is the only reliable
// signal for "profile exists on facebook.com".
async function checkUID(uid: string): Promise<UIDResult> {
  try {
    const res = await fetch(`/api/check-uid?uid=${encodeURIComponent(uid)}`, {
      signal: AbortSignal.timeout(12000),
      cache: "no-store",
    })
    if (!res.ok) return { uid, status: "DEAD" }
    const data = (await res.json()) as { uid: string; status: UIDStatus }
    return { uid, status: data.status === "LIVE" ? "LIVE" : "DEAD" }
  } catch {
    return { uid, status: "DEAD" }
  }
}

export function ForeplayCheckUidTool() {
  const [input, setInput] = useState("")
  const [results, setResults] = useState<UIDResult[]>([])
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null)
  const [loading, setLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCheck = async () => {
    // Extract a UID from each line — accepts pure UIDs, profile dumps, or
    // cookie blobs. Dedupe so repeated pastes don't trigger redundant probes.
    const extracted = input
      .split("\n")
      .map(extractUid)
      .filter((u): u is string => u !== null)
    const uids = Array.from(new Set(extracted))

    if (!uids.length) return

    setLoading(true)
    setResults([])
    const acc: UIDResult[] = []

    for (let i = 0; i < uids.length; i++) {
      setProgress({ done: i, total: uids.length })
      const result = await checkUID(uids[i])
      acc.push(result)
      setResults([...acc])
      if (i < uids.length - 1) await new Promise((r) => setTimeout(r, 100))
    }

    setProgress(null)
    setLoading(false)
  }

  const flashCopied = (id: string) => {
    setCopiedId(id)
    setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 1400)
  }

  // Internal API uses LIVE/DEAD; surface them to the user as Active/Disabled.
  const labelOf = (s: UIDStatus) => (s === "LIVE" ? "Active" : "Disabled")

  const copyResults = () => {
    navigator.clipboard.writeText(
      results.map((r) => `${r.uid} | ${labelOf(r.status)}`).join("\n"),
    )
    flashCopied("__all")
  }
  const copyActiveOnly = () => {
    navigator.clipboard.writeText(
      results.filter((r) => r.status === "LIVE").map((r) => r.uid).join("\n"),
    )
    flashCopied("__active")
  }
  const copyDisabledOnly = () => {
    navigator.clipboard.writeText(
      results.filter((r) => r.status === "DEAD").map((r) => r.uid).join("\n"),
    )
    flashCopied("__disabled")
  }
  const exportTxt = () => {
    const text = results.map((r) => `${r.uid} | ${labelOf(r.status)}`).join("\n")
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `uid-check-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const hasResults = results.length > 0
  const liveCount = results.filter((r) => r.status === "LIVE").length
  const deadCount = results.length - liveCount

  return (
    <>
      {/* How it works — 3 steps strip */}
      <div className="rounded-[16px] border border-[var(--fp-solid-50)] bg-[var(--fp-solid-25)] p-5 max-md:p-4">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <span className={cn(fpText.overline, "text-[var(--fp-solid-400)]")}>How it works</span>
          <Step n={1} label="Paste UIDs or full profile rows (one per line)" />
          <Step n={2} label="Click Check" />
          <Step n={3}>
            <span className="text-[var(--fp-solid-900)]">Active</span>
            <span> or </span>
            <span className="text-[var(--fp-solid-400)]">Disabled</span>
            <span> per UID</span>
          </Step>
        </div>
      </div>

      {/* Input card */}
      <div
        className={cn(
          "flex flex-col rounded-[16px] border border-[var(--fp-solid-50)] bg-white p-2",
          "transition-colors duration-[500ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
          "focus-within:border-[var(--fp-solid-400)]",
        )}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={"100012345678\nor paste the full profile row — UID is auto-extracted"}
          rows={5}
          spellCheck={false}
          className={cn(
            fpText.bodyM,
            "w-full resize-none bg-transparent px-4 py-3 font-mono text-[var(--fp-solid-700)] outline-none",
            "placeholder:font-sans placeholder:tracking-[-0.01125em] placeholder:text-[var(--fp-solid-400)]",
          )}
        />
        <div className="flex justify-end p-1">
          <ForeplayLightPrimaryButton
            onClick={handleCheck}
            disabled={loading || !input.trim()}
            icon={<ArrowRight className="size-4" />}
          >
            {loading ? "Checking…" : "Check UIDs"}
          </ForeplayLightPrimaryButton>
        </div>
      </div>

      {/* Results */}
      {(hasResults || progress) && (
        <div className="flex flex-col gap-3">
          {/* Stats / progress row */}
          <div className="flex items-center justify-end gap-2">
            {progress && (
              <span className={cn(fpText.bodyS, "text-[var(--fp-solid-400)]")}>
                Checking {progress.done + 1}/{progress.total}…
              </span>
            )}
            {hasResults && !progress && (
              <span className={cn(fpText.bodyS, "text-[var(--fp-solid-400)]")}>
                <span className="text-[var(--fp-solid-900)]">{liveCount} active</span> · {deadCount} disabled · {results.length} total
              </span>
            )}
          </div>

          {/* Result cards */}
          {results.map((r) => (
            <div
              key={r.uid}
              className={cn(
                "group flex items-center justify-between gap-4 rounded-[16px] border border-[var(--fp-solid-50)] bg-[var(--fp-solid-25)] p-5 max-md:p-4",
                "transition-colors duration-[500ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
                "hover:border-[var(--fp-solid-400)]",
              )}
            >
              <ForeplayCodeChip text={r.uid} />
              <StatusBadge status={r.status} />
            </div>
          ))}

          {/* Bulk actions */}
          {hasResults && !progress && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <ForeplayLightGhostAction
                onClick={copyResults}
                icon={<Copy className="size-3.5" />}
                label={copiedId === "__all" ? "Copied" : "Copy all"}
              />
              <ForeplayLightGhostAction
                onClick={copyActiveOnly}
                icon={<Copy className="size-3.5" />}
                label={copiedId === "__active" ? "Copied" : "Copy active"}
              />
              <ForeplayLightGhostAction
                onClick={copyDisabledOnly}
                icon={<Copy className="size-3.5" />}
                label={copiedId === "__disabled" ? "Copied" : "Copy disabled"}
              />
              <ForeplayLightGhostAction
                onClick={exportTxt}
                icon={<Download className="size-3.5" />}
                label="Export"
              />
            </div>
          )}
        </div>
      )}
    </>
  )
}

// Step chip — compact numbered guidance bullet for "How it works" strip.
function Step({ n, label, children }: { n: number; label?: string; children?: React.ReactNode }) {
  return (
    <span className={cn(fpText.bodyS, "flex items-center gap-2 text-[var(--fp-solid-500)]")}>
      <span
        className={cn(
          fpText.labelS,
          "flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-[var(--fp-solid-700)] shadow-[inset_0_0_0_1px_var(--fp-solid-50)]",
        )}
      >
        {n}
      </span>
      {label ?? children}
    </span>
  )
}

function StatusBadge({ status }: { status: UIDStatus }) {
  const isLive = status === "LIVE"
  return (
    <span className="flex shrink-0 items-center gap-2">
      <span
        className={cn(
          "size-2 rounded-full",
          isLive ? "bg-emerald-500" : "bg-[var(--fp-solid-300)]",
        )}
      />
      <span
        className={cn(
          fpText.labelS,
          isLive ? "text-[var(--fp-solid-900)]" : "text-[var(--fp-solid-400)]",
        )}
      >
        {isLive ? "Active" : "Disabled"}
      </span>
    </span>
  )
}
