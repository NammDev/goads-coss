import { fontInter } from "@/fonts"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { AdsToolkitHeader } from "@/components/layout/adstoolkit-header"
import { AdsToolkitFooter } from "@/components/layout/adstoolkit-footer"
import { NavProgress } from "@/components/layout/nav-progress"
import { CartPopover } from "@/components/cart-popover"
import { brand } from "@/config/brand"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={[
        "site",
        fontInter.variable,
        // AdsToolkit (tools-only): column flex so the footer sticks to the bottom
        // even on short pages. GOADS keeps its normal block flow.
        brand.toolsOnly ? "flex flex-col" : "",
        // .body exact CSS
        "min-h-svh bg-background text-muted-foreground",
        "font-sans text-base font-normal leading-6 tracking-[-0.01125em]",
        "overflow-x-clip",
        // font smoothing
        "antialiased",
        // Disable optical sizing globally — only display headings enable it
        "[font-optical-sizing:none]",
      ].join(" ")}
    >
      <NavProgress />
      {/* Chrome is brand-aware: the neutral AdsToolkit build swaps the GOADS
          header/footer for a tools-only wordmark shell. GOADS is unchanged. */}
      {brand.key === "adstoolkit" ? <AdsToolkitHeader /> : <Header />}
      {/* flex-1 main pushes the AdsToolkit footer to the viewport bottom. */}
      {brand.toolsOnly ? <main className="flex-1">{children}</main> : children}
      {brand.key === "adstoolkit" ? <AdsToolkitFooter /> : <Footer />}
      {/* Cart — GOADS shop only; the tools-only brand has no store. */}
      {!brand.toolsOnly && <CartPopover />}
    </div>
  )
}
