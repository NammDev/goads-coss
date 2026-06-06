// UID liveness via Facebook's public Graph picture endpoint, proxied
// SERVER-SIDE. Client-side direct calls to graph.facebook.com are blocked by
// ad-blockers / privacy extensions (facebook.com is on every blocklist), so
// every UID would falsely read DEAD. The server has no ad-blocker and no CORS
// constraint.
//
// LIVE/DEAD is decided by the picture URL HOST, not by `is_silhouette`:
//   • Active account  → a real per-user photo on  scontent*.fbcdn.net/v/t...
//   • Disabled/deactivated (or nonexistent) → the GENERIC default avatar on
//     static.*.fbcdn.net/rsrc.php/...  (a shared .gif placeholder)
// The old rule ("any data.url ⇒ LIVE") wrongly flagged disabled accounts LIVE
// because Graph still hands back the placeholder URL for them. `is_silhouette`
// is unreliable — Facebook returns `true` even for accounts that DO have a real
// photo — so we ignore it and inspect the host instead.

import { NextResponse } from "next/server"

type UIDStatus = "LIVE" | "DEAD"

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const uid = new URL(req.url).searchParams.get("uid")?.trim()
  if (!uid || !/^\d{6,20}$/.test(uid)) {
    return NextResponse.json({ uid: uid ?? "", status: "DEAD" satisfies UIDStatus })
  }
  return NextResponse.json({ uid, status: await probe(uid) })
}

// Generic default-avatar placeholder served for disabled / deactivated /
// nonexistent accounts. Real photos live on scontent*.fbcdn.net; the shared
// silhouette lives on static.*.fbcdn.net under /rsrc.php/.
function isPlaceholderAvatar(url: string): boolean {
  return /\/rsrc\.php\//i.test(url) || /:\/\/static\./i.test(url)
}

async function probe(uid: string): Promise<UIDStatus> {
  try {
    const res = await fetch(
      `https://graph.facebook.com/${encodeURIComponent(uid)}/picture?redirect=false`,
      {
        signal: AbortSignal.timeout(10000),
        cache: "no-store",
        headers: { "User-Agent": UA, Accept: "application/json" },
      },
    )
    if (!res.ok) return "DEAD" // 400 = nonexistent UID
    const json = (await res.json().catch(() => null)) as
      | { data?: { url?: string } }
      | null
    const url = json?.data?.url
    if (!url) return "DEAD"
    // Real per-user photo ⇒ active; generic placeholder ⇒ disabled/deactivated.
    return isPlaceholderAvatar(url) ? "DEAD" : "LIVE"
  } catch {
    return "DEAD"
  }
}
