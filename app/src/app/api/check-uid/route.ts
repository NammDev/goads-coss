// UID liveness via Facebook's public Graph picture endpoint, proxied
// SERVER-SIDE. Client-side direct calls to graph.facebook.com are blocked by
// ad-blockers / privacy extensions (facebook.com is on every blocklist), so
// every UID would falsely read DEAD. The server has no ad-blocker and no CORS
// constraint. A returned `data.url` (incl. silhouette) ⇒ profile exists ⇒ LIVE.

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
    return json?.data?.url ? "LIVE" : "DEAD"
  } catch {
    return "DEAD"
  }
}
