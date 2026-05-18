// Check Live UID — liveness probe + throttled bulk runner.
// Goes through our own /api/check-uid (server proxy → Graph picture endpoint).
// Direct browser calls to graph.facebook.com are blocked by ad-blockers, so
// the probe MUST be server-side. The route returns { status: LIVE|DEAD }
// (LIVE = picture object present, incl. silhouette avatars).

export type UIDStatus = "LIVE" | "DEAD"
export type UIDResult = { uid: string; status: UIDStatus }

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

// Throws on transient (429 / 5xx / network) so the caller can retry once.
async function probeUID(uid: string): Promise<UIDStatus> {
  if (!/^\d{6,20}$/.test(uid)) return "DEAD"
  const res = await fetch(`/api/check-uid?uid=${encodeURIComponent(uid)}`, {
    signal: AbortSignal.timeout(15000),
    cache: "no-store",
  })
  if (res.status === 429 || res.status >= 500) throw new Error("transient")
  if (!res.ok) return "DEAD"
  const json = (await res.json().catch(() => null)) as { status?: UIDStatus } | null
  return json?.status === "LIVE" ? "LIVE" : "DEAD"
}

export async function checkUID(uid: string): Promise<UIDResult> {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      return { uid, status: await probeUID(uid) }
    } catch {
      if (attempt === 0) await sleep(600)
    }
  }
  return { uid, status: "DEAD" }
}

const CONCURRENCY = 5

// Runs uids through a small concurrency pool with jitter (client-side calls
// burst from one IP → keep it gentle to avoid self-inflicted rate-limiting).
// Results preserve input order; onProgress fires after each settle.
export async function runUidPool(
  uids: string[],
  onProgress: (done: number, results: UIDResult[]) => void,
): Promise<UIDResult[]> {
  const acc: (UIDResult | undefined)[] = new Array(uids.length)
  let next = 0
  let done = 0

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, uids.length) }, async () => {
      while (next < uids.length) {
        const idx = next++
        await sleep(80 + Math.random() * 70)
        acc[idx] = await checkUID(uids[idx])
        done++
        onProgress(done, acc.filter((r): r is UIDResult => r !== undefined))
      }
    }),
  )

  return acc.filter((r): r is UIDResult => r !== undefined)
}
