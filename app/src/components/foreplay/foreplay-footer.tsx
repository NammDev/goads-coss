// Foreplay footer — footer.u-footer > .container.footer-container > .u-footer-block
// .u-footer: mt-10, pt-24, pb-10
// .u-footer-block: flex col, gap-11 (44px), pb-[60px]. Mobile: gap-10
// .footer-divider: bg #ffffff29, w-full, h-px
// Sections: products → divider → company → divider → links → divider → foot

import { ForeplaySectionContainer } from "@/components/foreplay/foreplay-section-container"
import { ForeplayFooterProductNav } from "@/components/foreplay/foreplay-footer-product-nav"
import { ForeplayFooterCompanyReviews } from "@/components/foreplay/footer/foreplay-footer-company-reviews"
import { ForeplayFooterLinkColumns } from "@/components/foreplay/footer/foreplay-footer-link-columns"
import { ForeplayFooterSocialAndLegal } from "@/components/foreplay/footer/foreplay-footer-social-and-legal"

function FooterDivider() {
  return <div className="h-px w-full bg-[#ffffff29]" />
}

export function ForeplayFooter() {
  return (
    <footer className="mt-10 pt-10 pb-10">
      <ForeplaySectionContainer variant="footer">
        {/* .u-footer-block */}
        <div className="flex flex-col gap-11 pb-[60px] max-md:gap-10">
          {/* 1. Footer Products */}
          <ForeplayFooterProductNav />

          <FooterDivider />

          {/* 2. Company + Reviews */}
          <ForeplayFooterCompanyReviews />

          <FooterDivider />

          {/* 3. Link Columns */}
          <ForeplayFooterLinkColumns />

          <FooterDivider />

          {/* 4. Copyright + Social */}
          <ForeplayFooterSocialAndLegal />
        </div>
      </ForeplaySectionContainer>
    </footer>
  )
}
