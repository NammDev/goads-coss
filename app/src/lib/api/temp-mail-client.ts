"use client"

import { getFingerprint } from "@/lib/fingerprint"
import { safeBearerHeader, safeHeaderValue } from "@/lib/headers"
import { viewerTokenStorage } from "@/lib/storage/browser-storage"

const DEFAULT_TIMEOUT_MS = 30000

type ApiFetchOptions = {
  method?: string
  body?: unknown
  headers?: HeadersInit
  jwt?: string
  timeoutMs?: number
}

/**
 * Resolve the base URL for temp-mail API calls.
 *
 * Priority:
 *  1. NEXT_PUBLIC_TEMP_MAIL_WORKER_ORIGIN — direct browser → Cloudflare Worker call
 *     (eliminates the Vercel proxy hop, saves ~200-400 ms).
 *     Requires:
 *       a) Worker ALLOWED_ORIGINS includes this site's origin (already done).
 *       b) next.config.ts CSP connect-src includes the Worker origin (already done).
 *  2. Fallback: internal Next.js proxy route /api/tempmail/* (always safe).
 *
 * NOTE: Next.js inlines NEXT_PUBLIC_* at build time. The value must be referenced
 * as `process.env.NEXT_PUBLIC_TEMP_MAIL_WORKER_ORIGIN` directly (not via an
 * intermediate variable) so the bundler can replace it correctly.
 */
export const buildTempMailApiUrl = (path: string): string => {
  const normalized = path.startsWith("/") ? path : `/${path}`
  // Next.js replaces this literal at build time — do NOT extract to a variable before this point.
  const directOrigin = process.env.NEXT_PUBLIC_TEMP_MAIL_WORKER_ORIGIN
  if (directOrigin) {
    return `${directOrigin}${normalized}`
  }
  // Proxy fallback — same-origin, no CORS/CSP issues
  const base = typeof window !== "undefined" ? window.location.origin : ""
  return `${base}/api/tempmail${normalized}`
}

/** True when the browser calls the Worker directly (no Vercel proxy hop). */
const isDirectMode = (): boolean =>
  Boolean(process.env.NEXT_PUBLIC_TEMP_MAIL_WORKER_ORIGIN)

export async function tempMailFetch<T = unknown>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const controller = new AbortController()
  const timeout = globalThis.setTimeout(
    () => controller.abort(),
    options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
  )
  try {
    const fingerprint = await getFingerprint()

    const headers = new Headers(options.headers)
    if (!safeHeaderValue(headers.get("x-custom-auth"))) headers.delete("x-custom-auth")
    headers.set("x-fingerprint", fingerprint)
    headers.set("Content-Type", "application/json")
    const viewerToken = safeBearerHeader(options.jwt || viewerTokenStorage.get())
    if (viewerToken) headers.set("Authorization", viewerToken)

    const response = await fetch(buildTempMailApiUrl(path), {
      method: options.method ?? "GET",
      body:
        options.body == null
          ? undefined
          : typeof options.body === "string"
            ? options.body
            : JSON.stringify(options.body),
      headers,
      // Direct cross-origin calls: omit credentials (cookies not needed, avoids preflight overhead).
      // Same-origin proxy calls: include credentials.
      credentials: isDirectMode() ? "omit" : "include",
      signal: controller.signal,
    })

    const text = await response.text()
    const data = text
      ? (() => {
          try {
            return JSON.parse(text)
          } catch {
            return text
          }
        })()
      : null

    if (response.status >= 300) {
      const detail = typeof data === "string" ? data : JSON.stringify(data)
      throw new Error(detail ? `[${response.status}]: ${detail}` : "Request failed")
    }
    return data as T
  } finally {
    globalThis.clearTimeout(timeout)
  }
}
