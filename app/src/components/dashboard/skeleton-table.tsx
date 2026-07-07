import { Skeleton } from '@/components/ui/skeleton'

/**
 * Loading placeholder shaped like the real dense DataTable: a bordered,
 * rounded container with a muted header row and tight body rows. Neutral
 * (bg-muted) so it never picks up the accent/brand tint.
 */
export function SkeletonTable({ rows = 6, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="overflow-hidden rounded-lg border">
      {/* Header row */}
      <div className="bg-muted/50 flex h-10 items-center gap-4 border-b px-3">
        {Array.from({ length: cols }).map((_, j) => (
          <Skeleton key={j} className="h-3 flex-1" />
        ))}
      </div>
      {/* Body rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex h-10 items-center gap-4 border-b px-3 last:border-0">
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} className="h-3 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}
