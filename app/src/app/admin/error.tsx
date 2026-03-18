"use client"

import { Button } from "@/components/ui/button"

/** Admin error boundary — catches errors in admin dashboard pages */
export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <h2 className="text-2xl font-semibold">Something went wrong</h2>
      <p className="text-muted-foreground">
        An error occurred in the admin panel. Please try again.
      </p>
      <Button onClick={reset} variant="outline">
        Try again
      </Button>
    </div>
  )
}
