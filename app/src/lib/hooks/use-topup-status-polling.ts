'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { getTopupRequest } from '@/lib/actions/topup-actions'
import type { TopupRequestStatus } from '@/lib/actions/topup-actions'

export type TopupStatusSnapshot = {
  status: TopupRequestStatus
  newBalance?: string
  amount: string
  expiresAt: string
  completedAt: string | null
}

type PollingState = {
  data: TopupStatusSnapshot | null
  isPolling: boolean
  error: string | null
}

/**
 * Shared hook for polling a topup request status.
 *
 * - Polls getTopupRequest() every `intervalMs` (default 3000ms) while status is "pending"
 * - Stops automatically when status is terminal or expiresAt is reached
 * - Exposes refresh() for user-driven manual check (the "I've paid" button)
 * - Cleans up timers on unmount
 */
export function useTopupStatusPolling(
  topupRequestId: string | null,
  options?: { intervalMs?: number; enabled?: boolean },
): PollingState & { refresh: () => void } {
  const intervalMs = options?.intervalMs ?? 3000
  const enabled = options?.enabled ?? true

  const [state, setState] = useState<PollingState>({
    data: null,
    isPolling: false,
    error: null,
  })

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isMountedRef = useRef(true)

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const fetchStatus = useCallback(
    async (id: string) => {
      if (!isMountedRef.current) return

      try {
        const result = await getTopupRequest({ topupRequestId: id })

        if (!isMountedRef.current) return

        if (!result.success) {
          setState((prev) => ({ ...prev, isPolling: false, error: result.message }))
          return
        }

        const snapshot: TopupStatusSnapshot = {
          status: result.status,
          newBalance: result.newBalance,
          amount: result.amount,
          expiresAt: result.expiresAt,
          completedAt: result.completedAt,
        }

        setState({ data: snapshot, isPolling: false, error: null })

        // Continue polling only if still pending and not expired
        const isTerminal = result.status !== 'pending'
        const isExpired = new Date(result.expiresAt) <= new Date()

        if (!isTerminal && !isExpired && enabled) {
          timerRef.current = setTimeout(() => {
            if (isMountedRef.current) {
              setState((prev) => ({ ...prev, isPolling: true }))
              fetchStatus(id)
            }
          }, intervalMs)
        }
      } catch (err) {
        if (!isMountedRef.current) return
        const message = err instanceof Error ? err.message : 'Polling error'
        setState((prev) => ({ ...prev, isPolling: false, error: message }))
        // Retry on network errors
        timerRef.current = setTimeout(() => {
          if (isMountedRef.current) fetchStatus(id)
        }, intervalMs * 2)
      }
    },
    [intervalMs, enabled],
  )

  // Start polling when topupRequestId changes
  useEffect(() => {
    isMountedRef.current = true

    if (!topupRequestId || !enabled) {
      clearTimer()
      setState({ data: null, isPolling: false, error: null })
      return
    }

    setState((prev) => ({ ...prev, isPolling: true }))
    fetchStatus(topupRequestId)

    return () => {
      isMountedRef.current = false
      clearTimer()
    }
  }, [topupRequestId, enabled, fetchStatus, clearTimer])

  // Manual refresh — user-driven "I've paid, check status" button
  const refresh = useCallback(() => {
    if (!topupRequestId) return
    clearTimer()
    setState((prev) => ({ ...prev, isPolling: true, error: null }))
    fetchStatus(topupRequestId)
  }, [topupRequestId, fetchStatus, clearTimer])

  return { ...state, refresh }
}
