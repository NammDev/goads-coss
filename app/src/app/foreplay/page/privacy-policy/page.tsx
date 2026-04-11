// Foreplay privacy policy page — clone of https://www.foreplay.co/page/privacy-policy
//
// Source DOM structure:
//   section.section.overflow-hidden
//     .container.section-container
//       .pages-title (py-[75px], flex-col)
//         .section-head (max-w-[720px], mx-auto, text-center)
//           .section-head_title
//             h1.text-display-h2 "Privacy Policy"
//   .section-white-block (bg white, color solid-700 dark, rounded-[36px])
//     .container (wide, max-w-[1440px], px-10)
//       .v-padding-50 (spacer: py-[25px])
//       .blog-rtb > .text-solid-700 > .w-richtext (rich text content)
//       .v-padding-50 (spacer: py-[25px])
//
// No hero subtitle, no last updated date, no footer CTA on this page.
// Content is rendered via dangerouslySetInnerHTML with @tailwindcss/typography `prose` classes.

import type { Metadata } from "next"
import { ForeplaySectionContainer } from "@/components/foreplay/foreplay-section-container"
import { ForeplaySectionWhiteBlock } from "@/components/foreplay/foreplay-section-white-block"
import { fpText } from "@/components/foreplay/foreplay-typography"
import { foreplayPrivacyPolicyContent } from "@/data/foreplay-privacy-policy-content"

export const metadata: Metadata = {
  title: "Privacy Policy | Foreplay",
  description:
    "Read Foreplay's Privacy Policy to understand how we protect your data and ensure your privacy. Learn about our practices and your rights.",
}

export default function ForeplayPrivacyPolicyPage() {
  return (
    <>
      {/* .section.overflow-hidden — hero wrapper */}
      <section className="overflow-hidden">
        {/* .container.section-container — max-w-[1216px] px-10 */}
        <ForeplaySectionContainer variant="section">
          {/* .pages-title — flex-col, py-[75px] */}
          <div className="flex flex-col py-[75px]">
            {/* .section-head — max-w-[720px] mx-auto text-center flex-col gap-3 items-center */}
            <div className="mx-auto flex w-full max-w-[720px] flex-col items-center gap-3 text-center">
              {/* .section-head_title */}
              <div>
                {/* h1.text-display-h2 */}
                <h1 className={fpText.displayH2}>{foreplayPrivacyPolicyContent.title}</h1>
              </div>
            </div>
          </div>
        </ForeplaySectionContainer>
      </section>

      {/* .section-white-block — bg white, rounded-[36px], text color solid-700 (dark on white) */}
      <ForeplaySectionWhiteBlock>
        {/* .container (wide variant per source — max-w-[1440px] px-10) */}
        <ForeplaySectionContainer variant="wide">
          {/* .v-padding-50 — empty spacer (padding: 25px 0) */}
          <div className="py-[25px]" />
          {/* .blog-rtb — rich text block wrapper, constrained to 832px for readability */}
          <div className="mx-auto max-w-[832px]">
            {/* .text-solid-700 (already inherited from ForeplaySectionWhiteBlock parent) */}
            {/* .w-richtext — prose styling via @tailwindcss/typography
                Override: font-sans, solid-700 color (inherited), Foreplay-like spacing */}
            <div
              className="prose prose-neutral max-w-none font-sans [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_p]:my-4 [&_p]:text-base [&_p]:leading-7 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-1"
              dangerouslySetInnerHTML={{ __html: foreplayPrivacyPolicyContent.html }}
            />
          </div>
          {/* .v-padding-50 — empty spacer (padding: 25px 0) */}
          <div className="py-[25px]" />
        </ForeplaySectionContainer>
      </ForeplaySectionWhiteBlock>
    </>
  )
}
