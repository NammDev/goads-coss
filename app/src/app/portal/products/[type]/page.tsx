import { redirect } from 'next/navigation'

/**
 * Legacy per-type route → redirect to the single tabbed products page.
 * BM/Profile/Page now switch instantly client-side via `?type=` (no per-tab
 * server round-trip). Kept for backward-compatible deep links.
 */
export default async function LegacyProductTypePage({
  params,
}: {
  params: Promise<{ type: string }>
}) {
  const { type } = await params
  redirect(`/portal/products?type=${type}`)
}
