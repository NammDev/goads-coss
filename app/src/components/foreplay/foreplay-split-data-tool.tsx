// Foreplay Split Data Profile — dedicated Facebook profile parser.
// Spec: docs/foreplay/tool-design-language.md
// Parses pipe-separated profile rows into 8 named columns and outputs as
// TAB-separated lines (paste-ready for Google Sheets — auto-splits into columns).
//
// Schema (positional, pipe-separated):
//   1. UID
//   2. Password Profile
//   3. 2FA Secret
//   4. Email
//   5. Email Password
//   6. Recover Email
//   7. Cookie (semicolon-separated key=value pairs — c_user; xs; fr; datr; ...)
//   8. Token (Facebook access token — typically starts with EAA…, 150–250 chars)

"use client"

import { Fragment, useMemo, useState } from "react"
import { Check, Copy, Download } from "lucide-react"

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplayLightGhostAction } from "@/components/foreplay/foreplay-light-ghost-action"

const COLUMNS = [
  "UID",
  "Password Profile",
  "2FA",
  "Email",
  "Email Password",
  "Recover Email",
  "Cookie",
  "Token",
] as const

type ParsedRow = string[] // length === 8 — order matches COLUMNS

// Identify the kind of a single pipe-separated field by its CONTENT shape.
// Position is also tracked separately for password disambiguation.
type FieldKind =
  | "uid"
  | "twoFa"
  | "email"          // mainstream provider (hotmail/gmail/yahoo/outlook/...)
  | "recoverEmail"   // any other proper-format email (typically temp mail)
  | "cookie"
  | "token"
  | "passwordLike"

// Mainstream email providers — anything else with a valid email shape is
// treated as Recover Email (typically temp mail like fviadropinbox.com).
const MAINSTREAM_EMAIL_DOMAINS = [
  "hotmail",
  "gmail",
  "googlemail",
  "yahoo",
  "outlook",
  "live",
  "msn",
  "aol",
  "icloud",
  "me.com",
  "mac.com",
  "protonmail",
  "proton.me",
] as const

function isMainstreamEmail(email: string): boolean {
  const domain = email.toLowerCase().split("@")[1] ?? ""
  return MAINSTREAM_EMAIL_DOMAINS.some(
    (d) => domain === d || domain.startsWith(d + ".") || domain.endsWith("." + d),
  )
}

function classify(part: string): FieldKind | null {
  if (!part) return null
  // Token — Facebook access token. Starts with EAA prefix + base64-url chars.
  if (/^EAA[A-Za-z0-9_-]{40,}$/.test(part)) return "token"
  // Cookie — semicolon-separated key=value pairs with known FB session keys.
  if (/(?:^|; ?|;)(?:c_user|xs|fr|datr|sb|wd|presence)=/.test(part)) return "cookie"
  // Fallback cookie heuristic: many "key=value;" segments.
  if ((part.match(/=/g)?.length ?? 0) >= 2 && part.includes(";")) return "cookie"
  // Email — strict format: local@domain.tld. Mainstream → Email, else → Recover Email.
  // Rejects garbage like "AnhSon@17103Cz" that has @ but no dot/TLD (falls through to passwordLike).
  if (/^[^\s@|]+@[^\s@|]+\.[a-zA-Z]{2,}$/.test(part)) {
    return isMainstreamEmail(part) ? "email" : "recoverEmail"
  }
  // 2FA base32 — uppercase letters + digits 2-7, 16-32 chars.
  if (/^[A-Z2-7]{16,32}$/.test(part.replace(/\s+/g, ""))) return "twoFa"
  // UID — pure digits, 10-18 chars.
  if (/^\d{10,18}$/.test(part)) return "uid"
  // Anything else falls into the password bucket (positional disambiguation).
  return "passwordLike"
}

function parseProfile(line: string): ParsedRow | null {
  const trimmed = line.trim()
  if (!trimmed) return null
  const parts = trimmed.split("|").map((p) => p.trim()).filter(Boolean)
  if (parts.length < 2) return null

  const out = {
    uid: "",
    passwordProfile: "",
    twoFa: "",
    email: "",
    emailPassword: "",
    recoverEmail: "",
    cookie: "",
    token: "",
  }

  // Track positions for password disambiguation:
  //   Password Profile  = first passwordLike AFTER UID, BEFORE Email
  //   Email Password    = first passwordLike AFTER Email
  let uidIdx = -1
  let emailIdx = -1
  const passwordItems: { index: number; value: string }[] = []

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    const kind = classify(part)
    switch (kind) {
      case "uid":
        if (!out.uid) {
          out.uid = part
          uidIdx = i
        } else {
          passwordItems.push({ index: i, value: part })
        }
        break
      case "twoFa":
        if (!out.twoFa) out.twoFa = part
        break
      case "email":
        if (!out.email) {
          out.email = part
          emailIdx = i
        } else if (!out.recoverEmail) {
          // Extra mainstream email → fall back into Recover Email slot.
          out.recoverEmail = part
        }
        break
      case "recoverEmail":
        if (!out.recoverEmail) out.recoverEmail = part
        break
      case "cookie":
        if (!out.cookie) out.cookie = part
        break
      case "token":
        if (!out.token) out.token = part
        break
      case "passwordLike":
        passwordItems.push({ index: i, value: part })
        break
    }
  }

  // Profile Password — first passwordLike after UID, before Email (or anywhere if no Email).
  const profileCandidate = passwordItems.find(
    (p) => p.index > uidIdx && (emailIdx === -1 || p.index < emailIdx),
  )
  if (profileCandidate) out.passwordProfile = profileCandidate.value

  // Email Password — first passwordLike after Email.
  const emailPassCandidate = passwordItems.find(
    (p) => emailIdx !== -1 && p.index > emailIdx,
  )
  if (emailPassCandidate) out.emailPassword = emailPassCandidate.value

  // Fallback: if Profile not set but we still have unused passwords, claim the first.
  if (!out.passwordProfile && passwordItems[0]) {
    if (passwordItems[0].value !== out.emailPassword) {
      out.passwordProfile = passwordItems[0].value
    } else if (passwordItems[1]) {
      out.passwordProfile = passwordItems[1].value
    }
  }

  return [
    out.uid,
    out.passwordProfile,
    out.twoFa,
    out.email,
    out.emailPassword,
    out.recoverEmail,
    out.cookie,
    out.token,
  ]
}

export function ForeplaySplitDataTool() {
  const [input, setInput] = useState("")
  const [copied, setCopied] = useState(false)
  const [copiedCell, setCopiedCell] = useState<string | null>(null)

  const copyField = (cellId: string, value: string) => {
    if (!value) return
    navigator.clipboard.writeText(value)
    setCopiedCell(cellId)
    setTimeout(() => setCopiedCell((c) => (c === cellId ? null : c)), 1400)
  }

  const rows = useMemo(() => {
    return input
      .split("\n")
      .map(parseProfile)
      .filter((r): r is ParsedRow => r !== null)
  }, [input])

  const output = useMemo(() => rows.map((r) => r.join("\t")).join("\n"), [rows])

  const flashCopied = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }
  const copyOutput = () => {
    navigator.clipboard.writeText(output)
    flashCopied()
  }
  const exportTsv = () => {
    const header = COLUMNS.join("\t") + "\n"
    const blob = new Blob([header + output], { type: "text/tab-separated-values" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `profiles-${Date.now()}.tsv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      {/* Column legend */}
      <div className="rounded-[16px] border border-[var(--fp-solid-50)] bg-[var(--fp-solid-25)] p-5 max-md:p-4">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
          <span className={cn(fpText.overline, "text-[var(--fp-solid-400)]")}>Columns</span>
          {COLUMNS.map((col, i) => (
            <Fragment key={col}>
              {i > 0 && (
                <span className={cn(fpText.bodyS, "text-[var(--fp-solid-300)]")}>·</span>
              )}
              <span className={cn(fpText.labelS, "text-[var(--fp-solid-700)]")}>
                <span className="text-[var(--fp-solid-400)]">{i + 1}.</span> {col}
              </span>
            </Fragment>
          ))}
        </div>
        <p className={cn(fpText.bodyS, "mt-3 text-[var(--fp-solid-400)] [text-wrap:pretty]")}>
          Paste your profiles. Copy the result into Google Sheets — 8 columns fill in.
        </p>
      </div>

      {/* Input / Output split */}
      <div className="grid grid-cols-2 gap-3 max-lg:grid-cols-1">
        <TextField
          label="Input"
          value={input}
          onChange={setInput}
          placeholder="UID|Password|2FA|Email|EmailPass|RecoverEmail|Cookie|Token"
        />
        <TextField
          label="Output"
          value={output}
          readOnly
          placeholder="Result will appear here…"
          action={
            output && (
              <div className="flex items-center gap-2">
                <ForeplayLightGhostAction
                  onClick={copyOutput}
                  icon={<Copy className="size-3.5" />}
                  label={copied ? "Copied" : "Copy"}
                />
                <ForeplayLightGhostAction
                  onClick={exportTsv}
                  icon={<Download className="size-3.5" />}
                  label="Export"
                />
              </div>
            )
          }
        />
      </div>

      {/* Parsed preview */}
      {rows.length > 0 && (
        <div className="flex flex-col gap-3">
          <span className={cn(fpText.overline, "text-[var(--fp-solid-400)]")}>
            Parsed · {rows.length} profile{rows.length === 1 ? "" : "s"}
          </span>
          <div className="flex flex-col gap-3">
            {rows.map((row, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-[16px] border border-[var(--fp-solid-50)] bg-[var(--fp-solid-25)] p-5 max-md:p-4",
                  "transition-colors duration-[500ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
                  "hover:border-[var(--fp-solid-400)]",
                )}
              >
                <div className="grid grid-cols-[140px_1fr_auto] items-center gap-x-4 gap-y-3 max-md:grid-cols-[1fr_auto]">
                  {COLUMNS.map((label, ci) => {
                    const value = row[ci] ?? ""
                    const cellId = `${i}-${ci}`
                    const isCopied = copiedCell === cellId
                    return (
                      <Fragment key={label}>
                        <span
                          className={cn(
                            fpText.bodyS,
                            "text-[var(--fp-solid-400)] max-md:col-span-2",
                          )}
                        >
                          {label}
                        </span>
                        <span
                          className={cn(
                            fpText.bodyS,
                            "min-w-0 break-all font-mono",
                            value ? "text-[var(--fp-solid-700)]" : "text-[var(--fp-solid-300)]",
                          )}
                        >
                          {value || "—"}
                        </span>
                        {value ? (
                          <button
                            type="button"
                            onClick={() => copyField(cellId, value)}
                            aria-label={`Copy ${label}`}
                            className={cn(
                              "flex size-7 shrink-0 items-center justify-center self-start rounded-[10px] transition-colors duration-200",
                              isCopied
                                ? "text-[var(--fp-solid-900)]"
                                : "text-[var(--fp-solid-400)] hover:bg-white hover:text-[var(--fp-solid-900)]",
                            )}
                          >
                            {isCopied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                          </button>
                        ) : (
                          <span aria-hidden />
                        )}
                      </Fragment>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

// Shared text field with header strip + action slot — same pattern across tools.
function TextField({
  label,
  value,
  onChange,
  placeholder,
  readOnly,
  action,
}: {
  label: string
  value: string
  onChange?: (v: string) => void
  placeholder?: string
  readOnly?: boolean
  action?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col rounded-[16px] border border-[var(--fp-solid-50)] bg-white",
        "transition-colors duration-[500ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
        !readOnly && "focus-within:border-[var(--fp-solid-400)]",
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-[var(--fp-solid-50)] px-4 py-3">
        <span className={cn(fpText.overline, "text-[var(--fp-solid-400)]")}>{label}</span>
        {action}
      </div>
      <textarea
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        readOnly={readOnly}
        placeholder={placeholder}
        rows={10}
        spellCheck={false}
        className={cn(
          fpText.bodyM,
          "w-full resize-none bg-transparent px-4 py-3 font-mono text-[var(--fp-solid-700)] outline-none",
          "placeholder:font-sans placeholder:tracking-[-0.01125em] placeholder:text-[var(--fp-solid-400)]",
        )}
      />
    </div>
  )
}
