// GoAds Refund Policy — same structure as the Privacy Policy page
// (hero title section + white rich-text block). Content from data file.

import type { Metadata } from "next"
import { SectionContainer } from "@/components/atoms/section-container"
import { SectionHead } from "@/components/atoms/section-head"
import { SectionWhiteBlock } from "@/components/atoms/section-white-block"
import { foreplayRefundPolicyContent } from "@/data/refund-policy-content"

export const metadata: Metadata = {
  title: "Warranty & Replacement Policy | GOADS",
  description:
    "GOADS Warranty & Replacement Policy, replacement-only coverage for Facebook Profiles, Business Managers, Agency Ad Accounts and Pages, exclusions, and how to request a replacement.",
}

export default function RefundPolicyPage() {
  return (
    <>
      <section className="overflow-hidden">
        <SectionContainer variant="section">
          <div className="flex flex-col py-[75px]">
            <SectionHead
              title={foreplayRefundPolicyContent.title}
              titleTag="h1"
              titleSize="h2"
              variant="light"
            />
          </div>
        </SectionContainer>
      </section>

      <SectionWhiteBlock>
        <SectionContainer variant="wide">
          <div className="py-[25px]" />
          <div className="text-base leading-6 tracking-[-0.18px] text-[var(--alpha-50)]">
            <div className="text-[var(--solid-700)]">
              <div
                className="prose prose-neutral max-w-none font-sans [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-[1.125rem] [&_h3]:font-[550] [&_h3]:leading-6 [&_h3]:tracking-[-0.0144em] [&_h3]:text-[var(--solid-900)] [&_h4]:mt-5 [&_h4]:mb-1.5 [&_h4]:text-base [&_h4]:font-[550] [&_h4]:leading-6 [&_h4]:tracking-[-0.01125em] [&_h4]:text-[var(--solid-900)] [&_p]:my-3 [&_p]:text-base [&_p]:leading-6 [&_p]:tracking-[-0.01125em] [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-1 [&_li]:text-base [&_li]:leading-6 [&_hr]:my-6 [&_hr]:border-[var(--solid-100)] [&_strong]:text-[var(--solid-900)] [&_strong]:font-[550] [&_a]:text-[var(--solid-900)] [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: foreplayRefundPolicyContent.html }}
              />
            </div>
          </div>
          <div className="py-[25px]" />
        </SectionContainer>
      </SectionWhiteBlock>
    </>
  )
}
