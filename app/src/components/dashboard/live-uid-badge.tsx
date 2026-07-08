'use client'

import { useCallback, useEffect, useState } from 'react'
import { RefreshCwIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'checking' | 'live' | 'dead'
type Live = 'live' | 'dead'

/** Session cache so switching product tabs / re-rendering doesn't re-probe. */
const sessionCache = new Map<string, Live>()

// --- Micro-batcher --------------------------------------------------------
// Every badge that mounts asks for its UID; requests within a short window are
// coalesced into ONE POST /api/check-uid. So a 100-profile table (paginated)
// fires a single batch per page instead of dozens of parallel requests.
const BATCH_WINDOW_MS = 40
let queue = new Map<string, ((s: Live) => void)[]>()
let timer: ReturnType<typeof setTimeout> | null = null

function flush() {
  timer = null
  const batch = queue
  queue = new Map()
  const uids = [...batch.keys()]

  fetch('/api/check-uid', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uids }),
  })
    .then((r) => r.json())
    .catch(() => null)
    .then((json: { results?: Record<string, string> } | null) => {
      for (const [uid, waiters] of batch) {
        const st: Live = json?.results?.[uid] === 'LIVE' ? 'live' : 'dead'
        sessionCache.set(uid, st)
        waiters.forEach((w) => w(st))
      }
    })
}

function requestProbe(uid: string): Promise<Live> {
  return new Promise((resolve) => {
    const waiters = queue.get(uid) ?? []
    waiters.push(resolve)
    queue.set(uid, waiters)
    if (!timer) timer = setTimeout(flush, BATCH_WINDOW_MS)
  })
}

/** Manual re-check — one immediate request that bypasses both caches. */
async function forceProbe(uid: string): Promise<Live> {
  try {
    const res = await fetch('/api/check-uid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uids: [uid], force: true }),
    })
    const json = (await res.json().catch(() => null)) as {
      results?: Record<string, string>
    } | null
    const st: Live = json?.results?.[uid] === 'LIVE' ? 'live' : 'dead'
    sessionCache.set(uid, st)
    return st
  } catch {
    return 'dead'
  }
}

/**
 * Auto-checks a delivered account's UID against Facebook and shows whether it's
 * still Active or Disabled, so customers can watch their profiles stay alive.
 * Probes once on mount (batched); the badge is clickable to re-check.
 */
export function LiveUidBadge({ uid }: { uid?: string | null }) {
  // Lazy init to 'checking' when a probe is pending — keeps the effect free of
  // synchronous setState and matches SSR (caches empty on the server).
  const [status, setStatus] = useState<Status>(() => {
    if (!uid) return 'idle'
    return sessionCache.get(uid) ?? 'checking'
  })

  useEffect(() => {
    if (!uid || sessionCache.has(uid)) return
    let cancelled = false
    requestProbe(uid).then((next) => {
      if (!cancelled) setStatus(next)
    })
    return () => {
      cancelled = true
    }
  }, [uid])

  const recheck = useCallback(() => {
    if (!uid) return
    setStatus('checking')
    forceProbe(uid).then(setStatus)
  }, [uid])

  if (!uid) return <span className="text-muted-foreground">—</span>

  if (status === 'idle' || status === 'checking') {
    return (
      <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
        <RefreshCwIcon className="size-3 animate-spin" />
        Checking
      </span>
    )
  }

  const live = status === 'live'
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        recheck()
      }}
      title="Click to re-check"
      className="group inline-flex items-center gap-1.5"
    >
      <Badge
        variant="outline"
        className={cn(
          'rounded-full border-transparent px-2 py-0.5 text-xs font-medium',
          live
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        )}
      >
        {live ? 'Active' : 'Disabled'}
      </Badge>
      <RefreshCwIcon className="text-muted-foreground size-3 opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  )
}
