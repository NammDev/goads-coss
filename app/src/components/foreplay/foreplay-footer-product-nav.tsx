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
  iconSrc: string
  subtitle: string
  label: string
  href: string
}

const defaultProducts: FooterProduct[] = [
  { iconSrc: "/foreplay/footer_1.webp", subtitle: "Organize Ad Inspo", label: "SwipeFile", href: "/swipe-file" },
  { iconSrc: "/foreplay/footer_2.webp", subtitle: "Browse +100M Ads", label: "Discovery", href: "/discovery" },
  { iconSrc: "/foreplay/footer_3.webp", subtitle: "Track Competitors", label: "Spyder", href: "/spyder" },
  { iconSrc: "/foreplay/footer_4.webp", subtitle: "Creative Analytics", label: "Lens", href: "/lens" },
  { iconSrc: "/foreplay/footer_5.webp", subtitle: "Write briefs with AI", label: "Briefs", href: "/briefs" },
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
              {/* .footer-product-icon: 44x44 */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.iconSrc}
                alt={product.label}
                width={44}
                height={44}
                className="size-11"
                loading="lazy"
              />

              {/* .u-footer-product-text */}
              <div className="no-underline">
                <div>
                  <div className={fpText.bodyS}>{product.subtitle}</div>
                </div>
                <div className="text-foreground">
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
