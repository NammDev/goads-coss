// Server-side UID liveness probe for /tools/check-uid.
// Why server-side: browser-direct Graph API calls hit CORS preflight + auth
// requirements, and <img> hotlink probes are inconsistent for new-format UIDs.
// From the server we can spoof a real user-agent, follow redirects, and inspect
// raw HTTP semantics + HTML body without browser sandboxing.

import { NextResponse } from "next/server"

type UIDStatus = "LIVE" | "DEAD"

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0 Safari/537.36"

// Facebook serves HTTP 200 OK for both live profiles AND disabled/deleted ones.
// The disabled state is signalled only in the HTML body via standard error
// fragments. Anything in this list means the UID is NOT viewable → DEAD.
const DEAD_BODY_MARKERS = [
  "isn't available right now",
  "this content isn't available",
  "the link you followed may",
  "page may have been removed",
  "content not found",
  "sorry, something went wrong",
  "page you requested cannot be displayed",
] as const

// Avoid Next.js caching — these checks must hit Facebook every request.
export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const uid = new URL(req.url).searchParams.get("uid")?.trim()
  if (!uid || !/^\d{6,20}$/.test(uid)) {
    return NextResponse.json({ uid: uid ?? "", status: "DEAD" satisfies UIDStatus })
  }

  const status = await probeUid(uid)
  return NextResponse.json({ uid, status })
}

async function probeUid(uid: string): Promise<UIDStatus> {
  try {
    const res = await fetch(`https://www.facebook.com/${encodeURIComponent(uid)}`, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
      headers: {
        "User-Agent": UA,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
    })

    // Hard error (4xx/5xx) — UID doesn't exist or upstream blocked us.
    if (res.status === 404 || res.status === 410) return "DEAD"
    if (!res.ok) {
      // 5xx or 403 — treat as DEAD conservatively. (Re-running usually clears
      // transient blocks; user can re-check.)
      return "DEAD"
    }

    const body = (await res.text()).toLowerCase()

    // Disabled/deleted profile → FB renders an error fragment in the body.
    if (DEAD_BODY_MARKERS.some((m) => body.includes(m))) return "DEAD"

    // Reaching here = 200 OK + no error fragment → live (login wall HTML
    // or preview metadata, both of which exist only for valid UIDs).
    return "LIVE"
  } catch {
    return "DEAD"
  }
}
