// Footer company section — .footer-company (logo + Chrome / G2 review badges)
// .footer-company: flex, gap-[60px], items-center (desktop). Mobile: flex-col, gap-6, items-start
// .footer-company-reviews: flex, gap-7 (28px), items-center. Mobile: flex-col, gap-5, items-start
// .u-footer-company-review-block: flex, gap-3, items-center, transition 0.2s. hover: opacity 0.8
// .u-footer-company-review-text: flex, gap-2, items-center, color #ffffffad

import Link from "next/link"
import { ForeplayLogoSvg } from "@/components/foreplay/footer/foreplay-logo-svg"

export function ForeplayFooterCompanyReviews() {
  return (
    <div className="flex items-center gap-[60px] max-md:flex-col max-md:items-start max-md:gap-6">
      {/* GoAds horizontal logo. Wrapper color drives `currentColor` inside the SVG
          so the panda silhouette blends with the page bg (no opaque black box). */}
      <Link href="/" aria-label="GoAds home" className="text-[var(--background)]">
        <ForeplayLogoSvg />
      </Link>
    </div>
  )
}
