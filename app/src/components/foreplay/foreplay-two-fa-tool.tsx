// Foreplay 2FA Code Generator — uses tool design language atoms.
// Spec reference: docs/foreplay/tool-design-language.md
// Atoms used: ForeplayLightPrimaryButton, ForeplayLightGhostAction, ForeplayCodeChip.
// TOTP logic (RFC 6238) ported verbatim from app/src/app/tools/2fa/two-fa-content.tsx.

"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowRight, Copy, Download } from "lucide-react"

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplayLightPrimaryButton } from "@/components/foreplay/foreplay-light-primary-button"
import { ForeplayLightGhostAction } from "@/components/foreplay/foreplay-light-ghost-action"
import { ForeplayCodeChip } from "@/components/foreplay/foreplay-code-chip"

// ─── TOTP — RFC 6238 / RFC 4226 (verbatim from legacy) ───
async function generateTOTP(secret: string): Promise<string> {
  const base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
  const cleanSecret = secret.replace(/[\s=-]/g, "").toUpperCase()
  let bits = ""
  for (const c of cleanSecret) {
    const val = base32Chars.indexOf(c)
    if (val === -1) throw new Error("Invalid base32")
    bits += val.toString(2).padStart(5, "0")
  }
  const keyBytes = new Uint8Array(Math.floor(bits.length / 8))
  for (let i = 0; i < keyBytes.length; i++) {
    keyBytes[i] = parseInt(bits.slice(i * 8, i * 8 + 8), 2)
  }

  const epoch = Math.floor(Date.now() / 1000)
  const counter = Math.floor(epoch / 30)
  const counterBytes = new Uint8Array(8)
  let tmp = counter
  for (let i = 7; i >= 0; i--) {
    counterBytes[i] = tmp & 0xff
    tmp = Math.floor(tmp / 256)
  }

  const key = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"],
  )
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, counterBytes))

  const offset = sig[sig.length - 1] & 0x0f
  const code =
    ((sig[offset] & 0x7f) << 24) |
    ((sig[offset + 1] & 0xff) << 16) |
    ((sig[offset + 2] & 0xff) << 8) |
    (sig[offset + 3] & 0xff)

  return (code % 1000000).toString().padStart(6, "0")
}

function parseSecrets(input: string): string[] {
  const lines = input.split("\n").filter((l) => l.trim())
  const secrets = new Set<string>()
  for (const line of lines) {
    const parts = line.split("|")
    for (const part of parts) {
      const clean = part.trim().replace(/[\s=-]/g, "").toUpperCase()
      if (/^[A-Z2-7]{16,}$/.test(clean)) {
        secrets.add(clean)
        break
      }
    }
  }
  return Array.from(secrets)
}

type CodeEntry = { secret: string; code: string }

const formatCode = (code: string) =>
  code.length === 6 ? `${code.slice(0, 3)} ${code.slice(3)}` : code

// ─── Component ───
export function ForeplayTwoFaTool() {
  const [input, setInput] = useState("")
  const [entries, setEntries] = useState<CodeEntry[]>([])
  const [timeLeft, setTimeLeft] = useState(30)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const generate = useCallback(async () => {
    const secrets = parseSecrets(input)
    const results: CodeEntry[] = []
    for (const secret of secrets) {
      try {
        const code = await generateTOTP(secret)
        results.push({ secret, code })
      } catch {
        results.push({ secret, code: "ERROR" })
      }
    }
    setEntries(results)
  }, [input])

  useEffect(() => {
    if (entries.length === 0) return
    const tick = () => {
      const remaining = 30 - (Math.floor(Date.now() / 1000) % 30)
      setTimeLeft(remaining)
      if (remaining === 30) generate()
    }
    tick()
    intervalRef.current = setInterval(tick, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [entries.length, generate])

  const flashCopied = (id: string) => {
    setCopiedId(id)
    setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 1400)
  }
  const copyCode = (entry: CodeEntry) => {
    navigator.clipboard.writeText(entry.code)
    flashCopied(entry.secret)
  }
  const copyAll = () => {
    navigator.clipboard.writeText(entries.map((e) => e.code).join("\n"))
    flashCopied("__all")
  }
  const exportTxt = () => {
    const text = entries.map((e) => `${e.secret}|${e.code}`).join("\n")
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `2fa-codes-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const hasResults = entries.length > 0

  return (
    <>
      {/* Input card — standard pattern: rounded-[16px] border-solid-50 bg-white p-2 */}
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
          placeholder="Paste secrets — one per line"
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
            onClick={generate}
            disabled={!input.trim()}
            icon={<ArrowRight className="size-4" />}
          >
            Generate
          </ForeplayLightPrimaryButton>
        </div>
      </div>

      {/* Results */}
      {hasResults && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-end">
            <CountdownRing seconds={timeLeft} />
          </div>

          {entries.map((entry) => (
            <CodeCard
              key={entry.secret}
              entry={entry}
              copied={copiedId === entry.secret}
              onCopy={() => copyCode(entry)}
            />
          ))}

          <div className="flex items-center gap-2 pt-1">
            <ForeplayLightGhostAction
              onClick={copyAll}
              icon={<Copy className="size-3.5" />}
              label={copiedId === "__all" ? "Copied" : "Copy all"}
            />
            <ForeplayLightGhostAction
              onClick={exportTxt}
              icon={<Download className="size-3.5" />}
              label="Export"
            />
          </div>
        </div>
      )}
    </>
  )
}

// ─── CodeCard — result card pattern: rounded-[16px] bg-solid-25 border-solid-50 ─
function CodeCard({
  entry,
  copied,
  onCopy,
}: {
  entry: CodeEntry
  copied: boolean
  onCopy: () => void
}) {
  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={`Copy ${entry.code}`}
      className={cn(
        "group flex w-full items-center justify-between gap-4 rounded-[16px] border border-[var(--fp-solid-50)] bg-[var(--fp-solid-25)] px-5 py-4 text-left max-md:px-4",
        "transition-all duration-[500ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
        "hover:border-[var(--fp-solid-400)]",
        copied && "border-[var(--fp-solid-700)]",
      )}
    >
      <ForeplayCodeChip text={entry.secret} />

      <div className="flex shrink-0 items-center gap-3">
        {/* Code — display-h3 scale, positive tracking for digit readability */}
        <span
          className={cn(
            "font-display text-[2.25rem] font-semibold leading-none tracking-[0.04em] text-[var(--fp-solid-900)] [font-optical-sizing:auto] [font-variant-numeric:tabular-nums]",
            "max-md:text-[1.75rem]",
          )}
        >
          {formatCode(entry.code)}
        </span>
        <Copy
          className={cn(
            "size-3.5 text-[var(--fp-solid-400)] transition-colors duration-200",
            "group-hover:text-[var(--fp-solid-900)]",
            copied && "text-[var(--fp-solid-900)]",
          )}
        />
      </div>
    </button>
  )
}

// ─── CountdownRing — tool-specific (2FA 30s window) ───
function CountdownRing({ seconds }: { seconds: number }) {
  const r = 13
  const c = 2 * Math.PI * r
  const offset = c - (seconds / 30) * c

  return (
    <span className="relative flex size-9 items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" width="36" height="36" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r={r} fill="none" stroke="var(--fp-solid-50)" strokeWidth="2" />
        <circle
          cx="18"
          cy="18"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="text-[var(--fp-solid-700)] transition-[stroke-dashoffset] duration-1000 ease-linear"
        />
      </svg>
      <span
        className={cn(
          fpText.labelS,
          "relative text-[var(--fp-solid-700)] [font-variant-numeric:tabular-nums]",
        )}
      >
        {seconds}
      </span>
    </span>
  )
}
