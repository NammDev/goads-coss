// Foreplay Check Live UID — functional tool body.
// Spec: docs/foreplay/tool-design-language.md
// Logic ported verbatim from app/src/app/tools/check-uid/check-uid-content.tsx.
// UI: input card → progress chip → two grouped result lists (Active / Disabled,
// each with a count badge + Copy) → export.

"use client"

import { useState } from "react"
import { ArrowRight, Copy, Download } from "lucide-react"

import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"
import { LightPrimaryButton } from "@/components/atoms/light-primary-button"
import { LightGhostAction } from "@/components/atoms/light-ghost-action"

import {
  type UIDResult,
  type UIDStatus,
  runUidPool,
} from "@/components/tools/check-uid-runner"

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

export function CheckUidTool() {
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
    setProgress({ done: 0, total: uids.length })

    await runUidPool(uids, (done, partial) => {
      setProgress({ done, total: uids.length })
      setResults(partial)
    })

    setProgress(null)
    setLoading(false)
  }

  const flashCopied = (id: string) => {
    setCopiedId(id)
    setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 1400)
  }

  // Internal API uses LIVE/DEAD; surface them to the user as Active/Disabled.
  const labelOf = (s: UIDStatus) => (s === "LIVE" ? "Active" : "Disabled")

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
  const activeUids = results.filter((r) => r.status === "LIVE").map((r) => r.uid)
  const disabledUids = results.filter((r) => r.status === "DEAD").map((r) => r.uid)
  // Total to show in the count badges: the run target while checking, else the
  // settled result count.
  const total = progress?.total ?? results.length

  return (
    <>
      {/* How it works — 3 steps strip */}
      <div className="rounded-[16px] border border-[var(--solid-50)] bg-[var(--solid-25)] p-5 max-md:p-4">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <span className={cn(siteText.overline, "text-[var(--solid-400)]")}>How it works</span>
          <Step n={1} label="Paste UIDs or full profile rows (one per line)" />
          <Step n={2} label="Click Check" />
          <Step n={3}>
            <span className="text-[var(--solid-900)]">Active</span>
            <span> or </span>
            <span className="text-[var(--solid-400)]">Disabled</span>
            <span> per UID</span>
          </Step>
        </div>
      </div>

      {/* Input card */}
      <div
        className={cn(
          "flex flex-col rounded-[16px] border border-[var(--solid-50)] bg-white p-2",
          "transition-colors duration-[500ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
          "focus-within:border-[var(--solid-400)]",
        )}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={"100012345678\nor paste the full profile row, UID is auto-extracted"}
          rows={5}
          spellCheck={false}
          className={cn(
            siteText.bodyM,
            "w-full resize-none bg-transparent px-4 py-3 font-mono text-[var(--solid-700)] outline-none",
            "placeholder:font-sans placeholder:tracking-[-0.01125em] placeholder:text-[var(--solid-400)]",
          )}
        />
        <div className="flex justify-end p-1">
          <LightPrimaryButton
            onClick={handleCheck}
            disabled={loading || !input.trim()}
            icon={<ArrowRight className="size-4" />}
          >
            {loading ? "Checking…" : "Check UIDs"}
          </LightPrimaryButton>
        </div>
      </div>

      {/* Results — split into two grouped lists (Active / Disabled) */}
      {(hasResults || progress) && (
        <div className="flex flex-col gap-3">
          {/* Progress row */}
          {progress && (
            <div className="flex items-center justify-end">
              <span className={cn(siteText.bodyS, "text-[var(--solid-400)]")}>
                Checking {Math.min(progress.done + 1, progress.total)}/{progress.total}…
              </span>
            </div>
          )}

          <ResultList
            kind="active"
            uids={activeUids}
            total={total}
            onCopy={copyActiveOnly}
            copied={copiedId === "__active"}
          />
          <ResultList
            kind="disabled"
            uids={disabledUids}
            total={total}
            onCopy={copyDisabledOnly}
            copied={copiedId === "__disabled"}
          />

          {/* Export full list */}
          {hasResults && !progress && (
            <div className="flex justify-end pt-1">
              <LightGhostAction
                onClick={exportTxt}
                icon={<Download className="size-3.5" />}
                label="Export .txt"
              />
            </div>
          )}
        </div>
      )}
    </>
  )
}

// One grouped result list: header (status dot + label + count badge + Copy) and
// a read-only mono textarea of UIDs. Same card/typography/colors as the rest of
// the tool — only the layout (grouped, not per-row) follows the new spec.
function ResultList({
  kind,
  uids,
  total,
  onCopy,
  copied,
}: {
  kind: "active" | "disabled"
  uids: string[]
  total: number
  onCopy: () => void
  copied: boolean
}) {
  const isActive = kind === "active"
  return (
    <div className="flex flex-col gap-3 rounded-[16px] border border-[var(--solid-50)] bg-[var(--solid-25)] p-5 max-md:p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2">
          <span className={cn("size-2 rounded-full", isActive ? "bg-emerald-500" : "bg-[var(--solid-300)]")} />
          <span className={cn(siteText.labelS, isActive ? "text-[var(--solid-900)]" : "text-[var(--solid-400)]")}>
            {isActive ? "Active" : "Disabled"}
          </span>
          <span
            className={cn(
              siteText.labelS,
              "rounded-full px-2 py-0.5",
              isActive
                ? "bg-emerald-50 text-emerald-700"
                : "bg-white text-[var(--solid-500)] shadow-[inset_0_0_0_1px_var(--solid-50)]",
            )}
          >
            {uids.length} / {total}
          </span>
        </span>
        <LightGhostAction
          onClick={onCopy}
          icon={<Copy className="size-3.5" />}
          label={copied ? "Copied" : "Copy"}
        />
      </div>
      <textarea
        readOnly
        value={uids.join("\n")}
        rows={Math.min(Math.max(uids.length, 3), 8)}
        placeholder="—"
        spellCheck={false}
        className={cn(
          siteText.bodyM,
          "w-full resize-y rounded-[12px] border border-[var(--solid-50)] bg-white px-4 py-3 font-mono text-[var(--solid-700)] outline-none",
          "placeholder:font-sans placeholder:text-[var(--solid-300)]",
        )}
      />
    </div>
  )
}

// Step chip — compact numbered guidance bullet for "How it works" strip.
function Step({ n, label, children }: { n: number; label?: string; children?: React.ReactNode }) {
  return (
    <span className={cn(siteText.bodyS, "flex items-center gap-2 text-[var(--solid-500)]")}>
      <span
        className={cn(
          siteText.labelS,
          "flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-[var(--solid-700)] shadow-[inset_0_0_0_1px_var(--solid-50)]",
        )}
      >
        {n}
      </span>
      {label ?? children}
    </span>
  )
}

