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
//
// Endpoints:
//   GET  ?uid=NNN            → { uid, status }               (single; marketing tool)
//   POST { uids: string[] }  → { results: { uid: status } }  (batch; portal tables)
// Batch runs behind a concurrency POOL so a customer with ~100 profiles never
// bursts 100 requests at Facebook (which would rate-limit us → false DEADs).
// A short-TTL in-memory cache dedupes repeat loads and overlapping UIDs.

import { NextResponse } from "next/server"

type UIDStatus = "LIVE" | "DEAD"

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"

/** Max Facebook probes in flight at once (protects our IP from rate limiting). */
const POOL_SIZE = 6
/** Max UIDs accepted in a single batch request. */
const MAX_BATCH = 200
/** How long a probe result stays fresh in the server cache. */
const CACHE_TTL_MS = 5 * 60 * 1000

export const dynamic = "force-dynamic"

// ---- Server-side cache (survives across requests within a warm instance) ----
const cache = new Map<string, { status: UIDStatus; at: number }>()

function getCached(uid: string): UIDStatus | null {
  const hit = cache.get(uid)
  if (!hit) return null
  if (Date.now() - hit.at > CACHE_TTL_MS) {
    cache.delete(uid)
    return null
  }
  return hit.status
}

const isValidUid = (uid: string) => /^\d{6,20}$/.test(uid)

export async function GET(req: Request) {
  const uid = new URL(req.url).searchParams.get("uid")?.trim()
  if (!uid || !isValidUid(uid)) {
    return NextResponse.json({ uid: uid ?? "", status: "DEAD" satisfies UIDStatus })
  }
  return NextResponse.json({ uid, status: await probeCached(uid) })
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { uids?: unknown; force?: unknown }
    | null
  const raw = Array.isArray(body?.uids) ? body!.uids : []
  // `force` (manual re-check) skips the cache read so the result is fresh.
  const force = body?.force === true

  // Dedupe + validate, cap at MAX_BATCH.
  const uids = Array.from(
    new Set(raw.filter((u): u is string => typeof u === "string").map((u) => u.trim())),
  )
    .filter(isValidUid)
    .slice(0, MAX_BATCH)

  const results: Record<string, UIDStatus> = {}
  await runPool(uids, POOL_SIZE, async (uid) => {
    results[uid] = await probeCached(uid, force)
  })

  return NextResponse.json({ results })
}

/** Run `worker` over `items` with at most `limit` promises in flight. */
async function runPool<T>(
  items: T[],
  limit: number,
  worker: (item: T) => Promise<void>,
): Promise<void> {
  let cursor = 0
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const item = items[cursor++]
      await worker(item)
    }
  })
  await Promise.all(runners)
}

async function probeCached(uid: string, force = false): Promise<UIDStatus> {
  if (!force) {
    const cached = getCached(uid)
    if (cached) return cached
  }
  const status = await probe(uid)
  cache.set(uid, { status, at: Date.now() })
  return status
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
