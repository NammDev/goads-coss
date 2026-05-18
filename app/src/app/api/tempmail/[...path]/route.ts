import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"
// Edge runtime: eliminates Node.js cold-start overhead (~100-300 ms) on Vercel.
// The proxy only does header manipulation + a single fetch — no Node-specific APIs needed.
export const runtime = "edge"

const WORKER_ORIGIN =
  process.env.TEMP_MAIL_WORKER_ORIGIN ?? "https://mail-api.goadsagency.com"

const EXCLUDED_REQUEST_HEADERS = new Set([
  "accept-encoding",
  "connection",
  "content-length",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "host",
])

const EXCLUDED_RESPONSE_HEADERS = new Set([
  ...EXCLUDED_REQUEST_HEADERS,
  "content-encoding",
])

async function proxy(request: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(request.url)
    // Strip /api/tempmail prefix to get the real worker path
    const workerPath = url.pathname.replace(/^\/api\/tempmail/, "") || "/"
    const targetUrl = new URL(`${WORKER_ORIGIN}${workerPath}${url.search}`)

    // Build forward headers (drop hop-by-hop)
    const headers = new Headers()
    request.headers.forEach((value, key) => {
      if (!EXCLUDED_REQUEST_HEADERS.has(key.toLowerCase())) {
        headers.set(key, value)
      }
    })
    // Set correct host for the Worker
    headers.set("host", new URL(WORKER_ORIGIN).host)

    // This is a server-to-server request (Vercel → Cloudflare Worker).
    // Strip the browser's Origin header so the Worker's CORS middleware does not
    // reject it based on the browser origin — CORS enforcement is already handled
    // by the same-origin proxy boundary on the Vercel side.
    headers.delete("origin")
    headers.delete("referer")

    // Forward real client IP so Worker can rate-limit per user, not per Vercel server
    const clientIp =
      request.headers.get("x-forwarded-for") ??
      request.headers.get("x-real-ip")
    if (clientIp) {
      headers.set("x-forwarded-for", clientIp.split(",")[0].trim())
    }

    // Edge Runtime uses the Web Streams API natively — `duplex: "half"` is a
    // Node.js-only workaround and must NOT be set here (it causes a TypeError
    // on the Edge runtime and is simply ignored / harmful in some runtimes).
    const init: RequestInit = {
      method: request.method,
      headers,
      redirect: "manual",
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      init.body = request.body
    }

    const response = await fetch(targetUrl.toString(), init)

    // Build response headers (drop hop-by-hop)
    const responseHeaders = new Headers()
    response.headers.forEach((value, key) => {
      if (!EXCLUDED_RESPONSE_HEADERS.has(key.toLowerCase())) {
        responseHeaders.set(key, value)
      }
    })

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    })
  } catch (error) {
    console.error("[tempmail-proxy] Error:", error)
    return NextResponse.json(
      { error: "Temp mail worker unavailable", detail: error instanceof Error ? error.message : String(error) },
      { status: 502 },
    )
  }
}

export const GET = proxy
export const POST = proxy
export const PUT = proxy
export const PATCH = proxy
export const DELETE = proxy
export const OPTIONS = proxy
export const HEAD = proxy