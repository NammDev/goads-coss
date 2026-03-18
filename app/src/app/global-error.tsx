"use client"

/** Root-level error boundary — catches errors in root layout itself */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem", fontFamily: "system-ui, sans-serif" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 600 }}>Something went wrong</h2>
          <p style={{ color: "#666" }}>A critical error occurred. Please try again.</p>
          <button
            onClick={reset}
            style={{ padding: "0.5rem 1rem", border: "1px solid #ccc", borderRadius: "0.375rem", cursor: "pointer", background: "white" }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
