"use client"

import { Button } from "@/components/ui/button"

/** Auth error boundary — catches errors in sign-in/sign-up pages */
export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <h2 className="text-2xl font-semibold">Authentication Error</h2>
      <p className="text-muted-foreground">
        Something went wrong with authentication. Please try again.
      </p>
      <Button onClick={reset} variant="outline">
        Try again
      </Button>
    </div>
  )
}
