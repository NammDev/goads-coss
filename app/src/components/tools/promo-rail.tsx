// Promo rail for the /tools shell — the two ways to get accounts, shown beside
// the free tools.
//
// Why here: the tools are the top of the funnel. Someone on /tools/bookmark is
// already running Business Managers, which is exactly the person who needs ad
// accounts, and today nothing on these pages tells them GOADS sells any. The
// rail fills the empty gutter to the right of the tool panel rather than
// interrupting the tool itself.
//
// Hidden below xl: at narrower widths the sidebar + tool panel already use the
// row, and squeezing a third column would cost the tool more than the ad gains.
// Hidden entirely on tools-only brand builds (ToolFB), which must not carry
// GOADS product advertising.
//
// Paint is .product-page-feature-block-new from foreplay-source.css — the same
// card the /rental feature grid uses — because once this card carries a
// full-bleed image that is structurally what it is: border 1px --solid-700,
// radius 20px, padding 0, hover background --solid-900, overflow hidden, with
// the image self-centred at w-full/h-auto and content on 24px padding.
// Prices are derived (LOWEST_MONTHLY_FEE / LOWEST_SETUP_PRICE), never typed.

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"
import { brand } from "@/config/brand"
import { LOWEST_MONTHLY_FEE, formatMonthlyFee } from "@/data/rental-page-data"
import { LOWEST_SETUP_PRICE } from "@/data/pricing-setups-data"

interface Offer {
  /** Illustration from the /rental feature grid, reused so the rail looks like
   *  the product it points at. 2:1, renders ~140px tall in the 280px rail. */
  imageSrc: string
  imageAlt: string
  overline: string
  price: string
  /** Billing note next to the price, e.g. "/mo". */
  priceSuffix: string
  body: string
  ctaLabel: string
  href: string
  /** Marks the newer, less expected of the two. Only one may carry it. */
  badge?: string
}

const OFFERS: Offer[] = [
  {
    // A dimmed profile swapped for a live one — the same-day replacement the
    // body text promises, stated as a picture.
    imageSrc: "/agency-ad-account/all-features/Fast%20Replacement%20SLA.webp",
    imageAlt: "A disabled profile being swapped for a fresh one",
    overline: "Rent",
    price: formatMonthlyFee(LOWEST_MONTHLY_FEE),
    priceSuffix: "/mo",
    body: "A complete setup on loan. BM, agency ad accounts and profiles arrive linked, and every asset is replaced the same day it goes down.",
    ctaLabel: "See rental plans",
    href: "/rental",
    badge: "New",
  },
  {
    // An admin profile with the accounts linked beneath it — the stack you own
    // outright.
    imageSrc: "/agency-ad-account/all-features/Multi-Account%20Structure.webp",
    imageAlt: "An admin profile with linked ad accounts beneath it",
    overline: "Buy once",
    price: `$${LOWEST_SETUP_PRICE.toLocaleString("en-US")}`,
    priceSuffix: "one-time",
    body: "Own the stack outright. Full credentials handed over on day one, no monthly fee, yours to keep.",
    ctaLabel: "See setups",
    href: "/pricing",
  },
]

function OfferCard({ offer }: { offer: Offer }) {
  return (
    <Link
      href={offer.href}
      className={cn(
        // .product-page-feature-block-new — z-1, border 1px solid-700,
        // radius 20, flex col, items stretch, padding 0, relative, overflow
        // hidden. Hover changes the FILL, never the border: a border-colour
        // change on hover reads as a tacky outline (same call the /rental
        // feature grid makes).
        "group relative z-[1] flex flex-col items-stretch justify-start overflow-hidden rounded-[20px] border border-[var(--solid-700)] p-0 no-underline",
        "cursor-pointer transition-colors duration-[500ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:bg-[var(--solid-900)]",
      )}
    >
      {/* Same treatment as the /rental feature grid: full-bleed 2:1 illustration
          that zooms on hover, over a soft light sheen from the top. No border or
          ring change — that reads as a tacky outline. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-[500ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:opacity-100 [background:radial-gradient(120%_90%_at_50%_0%,rgba(255,255,255,0.07),transparent_55%)]"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={offer.imageSrc}
        alt={offer.imageAlt}
        className="h-auto w-full self-center transition-transform duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.04]"
        loading="lazy"
      />

      {/* .product-page-feature-content — flex-1, padding 24px. gap-3 rather
          than .product-page-feature-text's gap-2: that class stacks two blocks
          (title + description), this stacks four. */}
      <div className="relative z-[2] flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-2">
          {/* Rent vs buy is the first thing a reader has to resolve, so the
              label is a filled pill at full white, not the --alpha-300 overline
              it started as. At 36% white it was the dimmest text on the card
              while the price was the brightest, so the eye landed on "$499"
              before it knew what $499 bought. */}
          <span
            className={cn(
              siteText.overline,
              "rounded-full bg-[var(--alpha-700)] px-2.5 py-1 text-foreground",
            )}
          >
            {offer.overline}
          </span>
          {offer.badge && (
            // Same Meta gradient as the rental cards' "Recommended" pill, so a
            // highlight reads the same wherever it appears on the site.
            <span
              className={cn(
                siteText.overline,
                "rounded-full px-2 py-0.5 text-white",
                "bg-[linear-gradient(160deg,var(--meta-blue-light),var(--meta-blue-deep))]",
              )}
            >
              {offer.badge}
            </span>
          )}
        </div>

        {/* Price is the headline — it is the one fact that decides whether the
            reader keeps going. display-h5 is the smallest display step, which
            fits a 280px column without wrapping.
            "From" is literal, not marketing: both figures are the minimum across
            their tiers (LOWEST_MONTHLY_FEE / LOWEST_SETUP_PRICE). It sits in
            body-s alpha-100 on either side so the number stays the headline. */}
        <div className="flex items-baseline gap-1.5">
          <span className={cn(siteText.bodyS, "text-[var(--alpha-100)]")}>From</span>
          <span className={cn(siteText.displayH5, "text-foreground")}>{offer.price}</span>
          <span className={cn(siteText.bodyS, "text-[var(--alpha-100)]")}>{offer.priceSuffix}</span>
        </div>

        <p className={cn(siteText.bodyS, "text-[var(--alpha-100)] [text-wrap:pretty]")}>{offer.body}</p>

        <span className={cn(siteText.labelS, "mt-1 flex items-center gap-1.5 text-foreground")}>
          {offer.ctaLabel}
          <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}

// One copy of the heading, so the rail and the row cannot drift apart.
const PROMO_TITLE = "Need accounts to run?"
const PROMO_BODY = "The tools are free. The accounts they manage are what we sell."

function PromoHead({ centered }: { centered?: boolean }) {
  return (
    <div className={cn("flex flex-col gap-1.5 px-1", centered && "items-center text-center")}>
      <h2 className={cn(siteText.labelL, "text-foreground")}>{PROMO_TITLE}</h2>
      <p className={cn(siteText.bodyS, "text-[var(--alpha-100)]")}>{PROMO_BODY}</p>
    </div>
  )
}

/** Right rail, xl and up. Sticky at the same offset as ToolsSidebar so both
 *  rails hold position together as the tool content scrolls. */
export function ToolsPromoRail() {
  // Tools-only builds are brand-neutral — no GOADS product advertising.
  if (brand.toolsOnly) return null

  return (
    <aside className="hidden w-[280px] shrink-0 xl:block">
      <div className="sticky top-28 flex flex-col gap-4">
        <PromoHead />
        {OFFERS.map((offer) => (
          <OfferCard key={offer.href} offer={offer} />
        ))}
      </div>
    </aside>
  )
}

interface PromoRowProps {
  /** Visibility/width is the caller's call: the tools shell hides this when the
   *  rail is showing (`xl:hidden`), a full-width page caps it instead. */
  className?: string
  /** Centre the heading. Full-width marketing sections centre their section
   *  heads; the tools shell keeps it left-aligned under the tool panel. */
  centered?: boolean
}

/** The same two offers side by side. Used below the tool at widths where the
 *  rail cannot fit, and as a standalone section on pages that have no rail
 *  (e.g. /tempmail). Two columns from sm up, so the pair stays one glance. */
export function ToolsPromoRow({ className, centered }: PromoRowProps) {
  if (brand.toolsOnly) return null

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <PromoHead centered={centered} />
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        {OFFERS.map((offer) => (
          <OfferCard key={offer.href} offer={offer} />
        ))}
      </div>
    </div>
  )
}
