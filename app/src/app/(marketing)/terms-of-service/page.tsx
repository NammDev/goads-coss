// GoAds Terms of Service — same structure as the Privacy Policy page
// (hero title section + white rich-text block). Content from data file.

import type { Metadata } from "next"
import { ForeplaySectionContainer } from "@/components/foreplay/foreplay-section-container"
import { ForeplaySectionHead } from "@/components/foreplay/foreplay-section-head"
import { ForeplaySectionWhiteBlock } from "@/components/foreplay/foreplay-section-white-block"
import { foreplayTermsOfServiceContent } from "@/data/foreplay-terms-of-service-content"

export const metadata: Metadata = {
  title: "Terms of Service | GoAds",
  description:
    "GoAds Terms of Service — how our advertising assets and services are provided, warranty terms, payment, and your responsibilities.",
}

export default function ForeplayTermsOfServicePage() {
  return (
    <>
      <section className="overflow-hidden">
        <ForeplaySectionContainer variant="section">
          <div className="flex flex-col py-[75px]">
            <ForeplaySectionHead
              title={foreplayTermsOfServiceContent.title}
              titleTag="h1"
              titleSize="h2"
              variant="light"
            />
          </div>
        </ForeplaySectionContainer>
      </section>

      <ForeplaySectionWhiteBlock>
        <ForeplaySectionContainer variant="wide">
          <div className="py-[25px]" />
          <div className="text-base leading-6 tracking-[-0.18px] text-[var(--fp-alpha-50)]">
            <div className="text-[var(--fp-solid-700)]">
              <div
                className="prose prose-neutral max-w-none font-sans [&_h3]:mt-4 [&_h3]:mb-3 [&_h3]:text-2xl [&_h3]:leading-8 [&_p]:my-4 [&_p]:text-base [&_p]:leading-6 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-1"
                dangerouslySetInnerHTML={{ __html: foreplayTermsOfServiceContent.html }}
              />
            </div>
          </div>
          <div className="py-[25px]" />
        </ForeplaySectionContainer>
      </ForeplaySectionWhiteBlock>
    </>
  )
}
