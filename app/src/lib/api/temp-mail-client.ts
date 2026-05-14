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
 * Build URL to the goads-coss internal tempmail proxy route.
 * All API calls go through /api/tempmail/* which proxies to the Cloudflare Worker.
 */
export const buildTempMailApiUrl = (path: string): string => {
  const base = typeof window !== "undefined" ? window.location.origin : ""
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${base}/api/tempmail${normalized}`
}

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
      credentials: "include",
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
