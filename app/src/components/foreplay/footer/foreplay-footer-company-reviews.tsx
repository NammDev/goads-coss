// Footer company section — .footer-company (logo + Chrome / G2 review badges)
// .footer-company: flex, gap-[60px], items-center (desktop). Mobile: flex-col, gap-6, items-start
// .footer-company-reviews: flex, gap-7 (28px), items-center. Mobile: flex-col, gap-5, items-start
// .u-footer-company-review-block: flex, gap-3, items-center, transition 0.2s. hover: opacity 0.8
// .u-footer-company-review-text: flex, gap-2, items-center, color #ffffffad

import Link from "next/link"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplayLogoSvg } from "@/components/foreplay/footer/foreplay-logo-svg"

export function ForeplayFooterCompanyReviews() {
  return (
    <div className="flex items-center gap-[60px] max-md:flex-col max-md:items-start max-md:gap-6">
      {/* GoAds horizontal logo. Wrapper color drives `currentColor` inside the SVG
          so the panda silhouette blends with the page bg (no opaque black box). */}
      <Link href="/" aria-label="GoAds home" className="text-[var(--background)]">
        <ForeplayLogoSvg />
      </Link>

      {/* .footer-company-reviews */}
      <div className="flex items-center gap-7 max-md:flex-col max-md:items-start max-md:gap-5">
        {/* Chrome Web Store */}
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 transition-all duration-200 hover:opacity-80"
        >
          <div className="size-5">
            <ChromeIcon />
          </div>
          <div className="flex items-center gap-2 text-[#ffffffad]">
            <div className="text-foreground">
              <div className={fpText.labelM}>4.9/5</div>
            </div>
            <div className={fpText.labelM}>228 Reviews</div>
          </div>
        </a>

        {/* G2 */}
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 transition-all duration-200 hover:opacity-80"
        >
          <div className="size-5">
            <G2Icon />
          </div>
          <div className="flex items-center gap-2 text-[#ffffffad]">
            <div className="text-foreground">
              <div className={fpText.labelM}>4.8/5</div>
            </div>
            <div className={fpText.labelM}>118 Reviews</div>
          </div>
        </a>
      </div>
    </div>
  )
}

function ChromeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#fc1)">
        <path d="M10 15.56a5.56 5.56 0 1 0 0-11.12 5.56 5.56 0 0 0 0 11.12Z" fill="#fff" />
        <path d="M2.8 7.27C2.4 6.55 1.9 5.79 1.34 5A10 10 0 0 0 10 20a40.5 40.5 0 0 0 1.88-2.8c.63-1.09 1.45-2.66 2.45-4.7a5 5 0 0 1-8.66 0A226.37 226.37 0 0 0 2.8 7.27Z" fill="#229342" />
        <path d="M10 20a10 10 0 0 0 8.66-15c-1.9-.19-3.3-.28-4.2-.28-1.02 0-2.5.1-4.46.28a5 5 0 0 1 4.33 7.5L10 20Z" fill="#FBC116" />
        <path d="M10 13.96a3.96 3.96 0 1 0 0-7.92 3.96 3.96 0 0 0 0 7.92Z" fill="#1A73E8" />
        <path d="M10 5h8.66A10 10 0 0 0 1.34 5l4.33 7.5A5 5 0 0 1 10 5Z" fill="#E33B2E" />
      </g>
      <defs><clipPath id="fc1"><path fill="#fff" d="M0 0h20v20H0z" /></clipPath></defs>
    </svg>
  )
}

function G2Icon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#fg2)">
        <path d="M20.16 0H0v20.16h20.16V0Z" fill="#FF492C" />
        <path d="M14.33 7.66h-1.71c.05-.27.21-.42.55-.59l.31-.16c.56-.29.86-.61.86-1.14 0-.34-.13-.6-.38-.8a1.5 1.5 0 0 0-.92-.28c-.28 0-.55.08-.78.23-.23.14-.4.33-.52.56l.5.5c.19-.4.47-.58.83-.58.31 0 .5.16.5.38 0 .18-.09.34-.44.52l-.2.1a2.2 2.2 0 0 0-.92.76c-.18.29-.27.65-.27 1.09v.12h2.59v-.71Z" fill="#fff" />
        <path d="M10.1 13.27a3.27 3.27 0 0 1 0-6.54l1.12-2.33a5.71 5.71 0 1 0 2.25 10.22l-1.24-2.15c-.6.51-1.35.8-2.13.8Z" fill="#fff" />
        <path d="M14.1 9.18h-2.83l-1.41 2.45h2.83l1.41 2.45 1.41-2.45-1.41-2.45Z" fill="#fff" />
      </g>
      <defs><clipPath id="fg2"><rect width="20" height="20" rx="10" fill="#fff" /></clipPath></defs>
    </svg>
  )
}
