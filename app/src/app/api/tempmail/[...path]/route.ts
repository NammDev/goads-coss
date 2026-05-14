import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const WORKER_ORIGIN =
  process.env.TEMP_MAIL_WORKER_ORIGIN ?? "https://goadsagency.com"

const HOP_BY_HOP = new Set([
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

async function proxy(request: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(request.url)
    // Strip /api/tempmail prefix to get the real worker path
    const workerPath = url.pathname.replace(/^\/api\/tempmail/, "") || "/"
    const targetUrl = new URL(`${WORKER_ORIGIN}${workerPath}${url.search}`)

    // Build forward headers (drop hop-by-hop)
    const headers = new Headers()
    request.headers.forEach((value, key) => {
      if (!HOP_BY_HOP.has(key.toLowerCase())) {
        headers.set(key, value)
      }
    })
    // Set correct host for the Worker
    headers.set("host", new URL(WORKER_ORIGIN).host)

    // Forward real client IP so Worker can rate-limit per user, not per Vercel server
    const clientIp =
      request.headers.get("x-forwarded-for") ??
      request.headers.get("x-real-ip")
    if (clientIp) {
      headers.set("x-forwarded-for", clientIp.split(",")[0].trim())
    }

    const init: RequestInit & { duplex?: "half" } = {
      method: request.method,
      headers,
      redirect: "manual",
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      init.body = request.body
      init.duplex = "half"
    }

    const response = await fetch(targetUrl.toString(), init)

    // Build response headers (drop hop-by-hop)
    const responseHeaders = new Headers()
    response.headers.forEach((value, key) => {
      if (!HOP_BY_HOP.has(key.toLowerCase())) {
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
