// Foreplay footer product nav — .footer-products (horizontal product badges above footer)
// DOM: .footer-products > ul.list.w-list-unstyled > li.list-item* > a.u-footer-product-badge
// .footer-products: flex, gap-4 (16px), justify-between
// .u-footer-product-badge: flex, gap-3 (12px), color #ffffffb8, flex-1, items-center,
//   min-w-[200px], p-2 px-2.5 (desktop), py-1 px-0 (mobile), no-underline, whitespace-nowrap
// .footer-product-icon: 44x44
// .list-item: flex-1, flex
// .w-list-unstyled: pl-0, list-none

import Link from "next/link"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { cn } from "@/lib/utils"

interface FooterProduct {
  /** Icon SVG path — rendered as <img> at 44x44 with object-contain. */
  iconSrc: string
  subtitle: string
  label: string
  href: string
}

// GoAds product nav — 5 core products. Icons swapped from Foreplay's sprite WebPs
// (footer_1-5.webp) to GoAds brand SVGs that match the header nav + product hero icons.
const defaultProducts: FooterProduct[] = [
  { iconSrc: "/foreplay/BM.svg",       subtitle: "BM1–BM10, verified",     label: "Business Manager",  href: "/bm" },
  { iconSrc: "/foreplay/PROFILES.svg", subtitle: "Aged, verified accounts", label: "Facebook Profile",  href: "/profiles" },
  { iconSrc: "/foreplay/PAGES.svg",    subtitle: "Niche, verified pages",   label: "Facebook Fanpage",  href: "/profiles" },
  { iconSrc: "/foreplay/META.svg",     subtitle: "Unlimited daily spend",   label: "Agency Ad Account", href: "/agency-ad-account" },
  { iconSrc: "/foreplay/TIKTOK.svg",   subtitle: "Shop & Business Center",  label: "TikTok Asset",      href: "/tiktok-accounts" },
]

interface ForeplayFooterProductNavProps {
  products?: FooterProduct[]
  currentHref?: string
  className?: string
}

export function ForeplayFooterProductNav({
  products = defaultProducts,
  currentHref,
  className,
}: ForeplayFooterProductNavProps) {
  return (
    // .footer-products
    <div className={cn("flex justify-between gap-4", className)}>
      {/* ul.list.w-list-unstyled */}
      <ul className="flex w-full list-none gap-4 pl-0 max-md:flex-col">
        {products.map((product) => (
          // li.list-item
          <li key={product.href} className="flex flex-1">
            {/* a.u-footer-product-badge */}
            <Link
              href={product.href}
              aria-current={currentHref === product.href ? "page" : undefined}
              className={cn(
                "flex flex-1 items-center gap-3 whitespace-nowrap py-2 px-2.5 no-underline",
                "min-w-[200px] text-[#ffffffb8]",
                "max-sm:min-w-0 max-sm:px-0 max-sm:py-1",
                currentHref === product.href && "text-foreground",
              )}
            >
              {/* .footer-product-icon — 44x44 GoAds brand SVG (was Foreplay sprite WebP) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.iconSrc}
                alt={product.label}
                width={44}
                height={44}
                className="size-11 shrink-0 object-contain"
                loading="lazy"
              />

              {/* .u-footer-product-text: text-decoration none */}
              <div className="no-underline">
                <div>
                  <div className={fpText.bodyS}>{product.subtitle}</div>
                </div>
                {/* .text-white = color #fff + flex:1 */}
                <div className="flex-1 text-foreground">
                  <div className={fpText.labelM}>{product.label}</div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
