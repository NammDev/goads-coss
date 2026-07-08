/**
 * Portal products layout — thin wrapper.
 * The in-page ProductTypeTabs was removed in the redesign: BM / Profile / Page
 * are now top-level sidebar tabs, so per-type navigation lives in the sidebar.
 * Each /portal/products/[type] page owns its own heading + table.
 */
export default function PortalProductsLayout({ children }: { children: React.ReactNode }) {
  // flex-1 flex-col so the child page can grow to full height (pins table
  // pagination to the bottom of the page — see AdminDataTable fillHeight).
  return <div className="flex flex-1 flex-col">{children}</div>
}
