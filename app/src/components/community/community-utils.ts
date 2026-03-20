/** Format a date to relative time string (e.g. "2h ago", "3d ago") */
export function formatTimeAgo(date: Date | string): string {
  const now = Date.now()
  const then = new Date(date).getTime()
  const seconds = Math.floor((now - then) / 1000)

  if (seconds < 60) return "just now"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}

/** Serialize dates in an object for client component consumption */
export function serializeDates<T extends Record<string, unknown>>(obj: T): T {
  const result = { ...obj } as Record<string, unknown>
  for (const key in result) {
    if (result[key] instanceof Date) {
      result[key] = (result[key] as Date).toISOString()
    }
  }
  return result as T
}
