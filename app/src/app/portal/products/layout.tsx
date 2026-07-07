/**
 * Portal products layout — thin wrapper.
 * The in-page ProductTypeTabs was removed in the redesign: BM / Profile / Page
 * are now top-level sidebar tabs, so per-type navigation lives in the sidebar.
 * Each /portal/products/[type] page owns its own heading + table.
 */
export default function PortalProductsLayout({ children }: { children: React.ReactNode }) {
  return <div className="space-y-6">{children}</div>
}
