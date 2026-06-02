// Foreplay footer — footer.u-footer > .container.footer-container > .u-footer-block
// .u-footer: mt-10, pt-24, pb-10
// .u-footer-block: flex col, gap-11 (44px), pb-[60px]. Mobile: gap-10
// .footer-divider: bg #ffffff29, w-full, h-px
// Sections: products → divider → company → divider → links → divider → foot

import { SectionContainer } from "@/components/atoms/section-container"
import { FooterProductNav } from "@/components/layout/footer-product-nav"
import { FooterCompanyReviews } from "@/components/layout/footer/footer-company-reviews"
import { FooterLinkColumns } from "@/components/layout/footer/footer-link-columns"
import { FooterSocialAndLegal } from "@/components/layout/footer/footer-social-and-legal"

function FooterDivider() {
  return <div className="h-px w-full bg-[#ffffff29]" />
}

export function Footer() {
  return (
    <footer className="mt-10 pt-10 pb-10">
      <SectionContainer variant="footer">
        {/* .u-footer-block */}
        <div className="flex flex-col gap-11 pb-[60px] max-md:gap-10">
          {/* 1. Footer Products */}
          <FooterProductNav />

          <FooterDivider />

          {/* 2. Company + Reviews */}
          <FooterCompanyReviews />

          <FooterDivider />

          {/* 3. Link Columns */}
          <FooterLinkColumns />

          <FooterDivider />

          {/* 4. Copyright + Social */}
          <FooterSocialAndLegal />
        </div>
      </SectionContainer>
    </footer>
  )
}
