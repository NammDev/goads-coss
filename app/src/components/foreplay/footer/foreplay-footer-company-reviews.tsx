// Footer company section — .footer-company (logo only — Chrome/G2 review badges removed)
// .footer-company: flex, items-center (desktop). Mobile: flex-col, items-start

import Link from "next/link"
import { ForeplayLogoSvg } from "@/components/foreplay/footer/foreplay-logo-svg"

export function ForeplayFooterCompanyReviews() {
  return (
    <div className="flex items-center max-md:items-start">
      {/* Logo — exact Foreplay logo SVG from source sprite */}
      <Link href="/foreplay/home" aria-label="GoAds home">
        <ForeplayLogoSvg />
      </Link>
    </div>
  )
}
