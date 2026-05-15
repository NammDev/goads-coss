// Foreplay IP Checker — auto-detects user's IP and looks up any IP on demand.
// Spec: docs/foreplay/tool-design-language.md
// API: ipwho.is — free, HTTPS, CORS-enabled, supports own-IP (empty path) and lookup by IP.
//      Returns { ip, success, city, region, country, timezone, connection: { isp, org }, ... }

"use client"

import { useCallback, useEffect, useState, type FormEvent } from "react"
import { ArrowRight, Copy, RefreshCw } from "lucide-react"

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplayLightPrimaryButton } from "@/components/foreplay/foreplay-light-primary-button"
import { ForeplayLightGhostAction } from "@/components/foreplay/foreplay-light-ghost-action"

type IPInfo = {
  ip: string
  city: string
  region: string
  country: string
  isp: string
  timezone: string
  valid: boolean
}

// Extract a clean IPv4/IPv6 from common proxy formats:
//   "1.2.3.4"                  → "1.2.3.4"
//   "1.2.3.4:8080"             → "1.2.3.4"
//   "1.2.3.4:8080:user:pass"   → "1.2.3.4"
//   "user:pass@1.2.3.4:8080"   → "1.2.3.4"
//   "[2001:db8::1]:8080"       → "2001:db8::1"
function extractIp(raw: string): string | null {
  const trimmed = raw.trim()
  if (!trimmed) return null
  // IPv4 first (most common)
  const ipv4 = trimmed.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/)
  if (ipv4) return ipv4[0]
  // Bracketed IPv6
  const ipv6b = trimmed.match(/\[([0-9a-fA-F:]+)\]/)
  if (ipv6b) return ipv6b[1]
  // Plain IPv6 — at least two colons + hex chars
  const ipv6p = trimmed.match(/\b([0-9a-fA-F]{1,4}(?::[0-9a-fA-F]{0,4}){2,})\b/)
  if (ipv6p) return ipv6p[1]
  return null
}

async function fetchIP(query?: string): Promise<IPInfo> {
  const path = query ? `/${encodeURIComponent(query)}` : ""
  const res = await fetch(`https://ipwho.is${path}`)
  const data = await res.json()
  if (!data?.success) {
    return {
      ip: query ?? "—",
      city: "",
      region: "",
      country: "",
      isp: "",
      timezone: "",
      valid: false,
    }
  }
  return {
    ip: data.ip ?? "",
    city: data.city ?? "",
    region: data.region ?? "",
    country: data.country ?? "",
    isp: data.connection?.isp ?? data.connection?.org ?? "",
    timezone: data.timezone?.id ?? "",
    valid: true,
  }
}

export function ForeplayCheckIpTool() {
  const [info, setInfo] = useState<IPInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [parsedFrom, setParsedFrom] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<"network" | "no-ip" | null>(null)

  const load = useCallback(async (raw?: string) => {
    setLoading(true)
    setError(null)

    let ip: string | undefined
    let original: string | null = null

    if (raw && raw.trim()) {
      const extracted = extractIp(raw)
      if (!extracted) {
        setLoading(false)
        setInfo(null)
        setParsedFrom(null)
        setError("no-ip")
        return
      }
      ip = extracted
      if (extracted !== raw.trim()) original = raw.trim()
    }

    setParsedFrom(original)

    try {
      const data = await fetchIP(ip)
      setInfo(data)
    } catch {
      setInfo(null)
      setError("network")
    }
    setLoading(false)
  }, [])

  // Auto-detect own IP on mount.
  useEffect(() => {
    load()
  }, [load])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    load(query)
  }

  const copyIp = () => {
    if (!info?.ip) return
    navigator.clipboard.writeText(info.ip)
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }

  const details = info && info.valid
    ? [
        { label: "ISP / Org", value: info.isp },
        { label: "City", value: info.city },
        { label: "Region", value: info.region },
        { label: "Country", value: info.country },
        { label: "Timezone", value: info.timezone },
      ]
    : []

  return (
    <>
      {/* Search input — leave empty for own IP */}
      <form
        onSubmit={onSubmit}
        className={cn(
          "flex items-center gap-2 rounded-[16px] border border-[var(--fp-solid-50)] bg-white p-2",
          "transition-colors duration-[500ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
          "focus-within:border-[var(--fp-solid-400)]",
        )}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter an IP, or leave blank to check yours"
          spellCheck={false}
          className={cn(
            fpText.bodyM,
            "flex-1 min-w-0 bg-transparent px-3 py-2 font-mono text-[var(--fp-solid-700)] outline-none",
            "placeholder:font-sans placeholder:tracking-[-0.01125em] placeholder:text-[var(--fp-solid-400)]",
          )}
        />
        <ForeplayLightPrimaryButton
          type="submit"
          disabled={loading}
          icon={<ArrowRight className="size-4" />}
        >
          Check
        </ForeplayLightPrimaryButton>
      </form>

      {/* Header bar: hint + refresh */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-col">
          <p className={cn(fpText.bodyM, "text-[var(--fp-solid-500)]")}>
            {parsedFrom
              ? "Looked-up IP details."
              : query
                ? "Looked-up IP details."
                : "Your public IP and location."}
          </p>
          {parsedFrom && (
            <p className={cn(fpText.bodyS, "truncate text-[var(--fp-solid-400)]")}>
              Parsed from <span className="font-mono">{parsedFrom}</span>
            </p>
          )}
        </div>
        <ForeplayLightGhostAction
          onClick={() => {
            setQuery("")
            load()
          }}
          disabled={loading}
          icon={<RefreshCw className={cn("size-3.5", loading && "animate-spin")} />}
          label="My IP"
        />
      </div>

      {/* Hero IP card */}
      <div
        className={cn(
          "rounded-[16px] border border-[var(--fp-solid-50)] bg-white p-5 max-md:p-4",
          "transition-colors duration-[500ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className={cn(fpText.overline, "text-[var(--fp-solid-400)]")}>IP Address</span>
            {info && !loading && <StatusBadge valid={info.valid} />}
          </div>

          {loading ? (
            <span className="h-9 w-48 animate-pulse rounded-[6px] bg-[var(--fp-solid-25)] max-md:w-32" />
          ) : info ? (
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "font-display text-[2.25rem] font-semibold leading-none tracking-[0.02em] [font-optical-sizing:auto] [font-variant-numeric:tabular-nums]",
                  "max-md:text-[1.5rem]",
                  info.valid ? "text-[var(--fp-solid-900)]" : "text-[var(--fp-solid-300)]",
                )}
              >
                {info.ip || "—"}
              </span>
              {info.valid && (
                <button
                  type="button"
                  onClick={copyIp}
                  aria-label="Copy IP"
                  className={cn(
                    "flex size-8 items-center justify-center rounded-[10px] text-[var(--fp-solid-400)] transition-colors duration-200",
                    "hover:bg-[var(--fp-solid-25)] hover:text-[var(--fp-solid-900)]",
                    copied && "text-[var(--fp-solid-900)]",
                  )}
                >
                  <Copy className="size-3.5" />
                </button>
              )}
            </div>
          ) : (
            <span className={cn(fpText.bodyS, "text-[var(--fp-solid-400)]")}>—</span>
          )}
        </div>
      </div>

      {/* Details list */}
      {(loading || (info && info.valid)) && (
        <div className="overflow-hidden rounded-[16px] border border-[var(--fp-solid-50)] bg-white">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-[var(--fp-solid-50)] px-5 py-4 last:border-b-0 max-md:px-4"
                >
                  <span className="h-3 w-24 animate-pulse rounded-[6px] bg-[var(--fp-solid-25)]" />
                  <span className="h-3 w-32 animate-pulse rounded-[6px] bg-[var(--fp-solid-25)]" />
                </div>
              ))
            : details.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-4 border-b border-[var(--fp-solid-50)] px-6 py-4 last:border-b-0 max-md:px-4"
                >
                  <span className={cn(fpText.bodyS, "text-[var(--fp-solid-400)]")}>{row.label}</span>
                  <span className={cn(fpText.labelM, "truncate text-right text-[var(--fp-solid-700)]")}>
                    {row.value || "—"}
                  </span>
                </div>
              ))}
        </div>
      )}

      {info && !info.valid && !loading && (
        <p className={cn(fpText.bodyS, "text-[var(--fp-solid-400)]")}>
          Couldn&apos;t resolve this IP. The address looks well-formed but no data was returned.
        </p>
      )}

      {error === "no-ip" && (
        <p className={cn(fpText.bodyS, "text-[var(--fp-solid-400)]")}>
          No valid IP found in your input. Supports plain IP, <span className="font-mono">IP:port</span>, or <span className="font-mono">IP:port:user:pass</span>.
        </p>
      )}

      {error === "network" && (
        <p className={cn(fpText.bodyS, "text-[var(--fp-solid-400)]")}>
          Network error. Try again in a moment.
        </p>
      )}
    </>
  )
}

function StatusBadge({ valid }: { valid: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span
        className={cn(
          "size-2 rounded-full",
          valid ? "bg-emerald-500" : "bg-[var(--fp-solid-300)]",
        )}
      />
      <span
        className={cn(
          fpText.labelS,
          "tracking-[0.04em]",
          valid ? "text-[var(--fp-solid-900)]" : "text-[var(--fp-solid-400)]",
        )}
      >
        {valid ? "VALID" : "INVALID"}
      </span>
    </span>
  )
}
