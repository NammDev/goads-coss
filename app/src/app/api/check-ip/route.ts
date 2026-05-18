// IP lookup proxied SERVER-SIDE. Client-side IP-geo calls are blocked by
// ad-blockers; ipwho.is also 403s server fetches ("CORS not supported on Free
// plan"). Uses ip-api.com (free, no key, reliable server-side; HTTP-only on
// the free tier — fine, the browser only ever talks to this same-origin route).
// - ?q=<ip> → look that IP up.
// - no q   → resolve the caller's own public IP from forwarded headers.
// Returns the normalized shape the IP tool expects.

import { NextResponse } from "next/server"

type IPInfo = {
  ip: string
  city: string
  region: string
  country: string
  isp: string
  timezone: string
  valid: boolean
}

export const dynamic = "force-dynamic"

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for")
  if (xff) return xff.split(",")[0].trim()
  return req.headers.get("x-real-ip")?.trim() ?? ""
}

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q")?.trim()
  const target = q || clientIp(req) // empty → ipwho.is returns server IP (dev/local only)
  const path = target ? `/${encodeURIComponent(target)}` : ""

  const fail: IPInfo = {
    ip: q ?? target ?? "—",
    city: "",
    region: "",
    country: "",
    isp: "",
    timezone: "",
    valid: false,
  }

  try {
    const res = await fetch(
      `http://ip-api.com/json${path}?fields=status,query,city,regionName,country,isp,timezone`,
      { signal: AbortSignal.timeout(10000), cache: "no-store" },
    )
    if (!res.ok) return NextResponse.json(fail)
    const d = (await res.json().catch(() => null)) as
      | {
          status?: string
          query?: string
          city?: string
          regionName?: string
          country?: string
          isp?: string
          timezone?: string
        }
      | null
    if (d?.status !== "success") return NextResponse.json(fail)
    return NextResponse.json({
      ip: d.query ?? "",
      city: d.city ?? "",
      region: d.regionName ?? "",
      country: d.country ?? "",
      isp: d.isp ?? "",
      timezone: d.timezone ?? "",
      valid: true,
    } satisfies IPInfo)
  } catch {
    return NextResponse.json(fail)
  }
}
