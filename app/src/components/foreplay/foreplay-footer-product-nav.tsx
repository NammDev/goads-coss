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
  /** background-image URL — rendered as div with bg sprite (matches Foreplay source) */
  iconBg: string
  /** sprite background-size, e.g. "2376px 100%" — each icon has different sprite width */
  bgSize: string
  subtitle: string
  label: string
  href: string
}

// GoAds product nav — 5 core products (sprite icons kept 1:1, hrefs verified)
const defaultProducts: FooterProduct[] = [
  { iconBg: "/foreplay/footer_2.webp", bgSize: "2376px 100%", subtitle: "BM1–BM10, verified", label: "Business Manager", href: "/foreplay/bm" },
  { iconBg: "/foreplay/footer_1.webp", bgSize: "2728px 100%", subtitle: "Aged, verified accounts", label: "Facebook Profile", href: "/foreplay/profiles" },
  { iconBg: "/foreplay/footer_5.webp", bgSize: "2420px 100%", subtitle: "Niche, verified pages", label: "Facebook Fanpage", href: "/foreplay/pages" },
  { iconBg: "/foreplay/footer_4.webp", bgSize: "924px 100%", subtitle: "Unlimited daily spend", label: "Agency Ad Account", href: "/foreplay/agency-ad-account" },
  { iconBg: "/foreplay/footer_3.webp", bgSize: "1364px 100%", subtitle: "Shop & Business Center", label: "TikTok Asset", href: "/foreplay/tiktok-accounts" },
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
              {/* .footer-product-icon.sprite-image: 44x44, bg-cover bg-center (HQ individual images) */}
              {/* Foreplay uses div + background-image (not <img>) */}
              <div
                role="img"
                aria-label={product.label}
                className="size-11 shrink-0 bg-no-repeat"
                style={{
                  backgroundImage: `url(${product.iconBg})`,
                  backgroundSize: product.bgSize,
                  backgroundPosition: "0px 0px",
                }}
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
