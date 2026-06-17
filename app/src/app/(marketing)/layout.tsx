import { fontInter } from "@/fonts"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { GiveawayAnnouncementBar } from "@/components/layout/giveaway-announcement-bar"
import { NavProgress } from "@/components/layout/nav-progress"
import { CartPopover } from "@/components/cart-popover"

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
      <GiveawayAnnouncementBar />
      <Header />
      {children}
      <Footer />
      {/* Cart — no floating trigger; opens via header "View cart" (`cart:open`)
          or pricing "Buy Now" (`cart:item-added`). Marketing routes only. */}
      <CartPopover />
    </div>
  )
}
