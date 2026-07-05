// "Build your own setup" panel — sits below the 3 preset cards on the pricing
// page. Compact bordered panel matching the PricingFooterCta look (border
// #ffffff29, rounded-20): a short headline + one line on the left, CTA on the
// right. The CTA opens the CustomSetup builder dialog. Client wrapper.

"use client"

import { useState } from "react"
import { siteText } from "@/components/atoms/typography"
import { CtaButton } from "@/components/atoms/cta-button"
import { CustomSetupDialog } from "@/components/pricing/custom-setup-dialog"

export function CustomSetupCta() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="flex w-full items-center justify-between gap-6 rounded-[20px] border border-[#ffffff29] px-8 py-6 max-sm:flex-col max-sm:items-start max-sm:px-6">
        <div className="flex flex-col gap-1.5">
          <div className="text-foreground">
            <div className={siteText.overline}>BUILD YOUR OWN</div>
          </div>
          <div className="text-[var(--alpha-100)]">
            <div className={siteText.bodyM}>Configure the exact mix of Meta assets your business runs on, built and connected live.</div>
          </div>
        </div>
        <CtaButton onClick={() => setOpen(true)} variant="secondary" className="shrink-0 justify-center max-sm:w-full">
          Build your own setup
        </CtaButton>
      </div>

      <CustomSetupDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
