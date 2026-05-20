// TEMP demo route — Server Component awaits 4s so the sibling loading.tsx
// (Suspense fallback) is visible long enough to inspect the skeleton.
// Delete the /test-skeleton folder when no longer needed.

export const dynamic = "force-dynamic"

async function delay(ms: number) {
  await new Promise((r) => setTimeout(r, ms))
}

export default async function TestSkeletonPage() {
  await delay(4000)
  return (
    <div className="section">
      <div className="mx-auto max-w-[720px] px-6 py-24 text-center">
        <h1 className="text-3xl font-semibold text-foreground">
          Page loaded ✅
        </h1>
        <p className="mt-3 text-[var(--fp-alpha-100)]">
          Bạn vừa thấy skeleton trong ~4 giây. Xoá folder
          <code className="mx-1 rounded bg-white/5 px-1.5 py-0.5 font-mono text-sm">
            src/app/(marketing)/test-skeleton
          </code>
          khi không cần nữa.
        </p>
      </div>
    </div>
  )
}
