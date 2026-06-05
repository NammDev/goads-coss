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
//     .container (wide, max-w-site, px-10)
//       .v-padding-50 (spacer: py-[25px])
//       .blog-rtb > .text-solid-700 > .w-richtext (rich text content)
//       .v-padding-50 (spacer: py-[25px])
//
// No hero subtitle, no last updated date, no footer CTA on this page.
// Content is rendered via dangerouslySetInnerHTML with @tailwindcss/typography `prose` classes.

import type { Metadata } from "next"
import { SectionContainer } from "@/components/atoms/section-container"
import { SectionHead } from "@/components/atoms/section-head"
import { SectionWhiteBlock } from "@/components/atoms/section-white-block"
import { foreplayPrivacyPolicyContent } from "@/data/privacy-policy-content"

export const metadata: Metadata = {
  title: "Privacy Policy | GOADS",
  description:
    "Read GOADS's Privacy Policy to understand how we protect your data and ensure your privacy. Learn about our practices and your rights.",
}

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* .section.overflow-hidden — hero wrapper */}
      <section className="overflow-hidden">
        {/* .container.section-container — max-w-[1216px] px-10 */}
        <SectionContainer variant="section">
          {/* .pages-title — flex-col, py-[75px] */}
          <div className="flex flex-col py-[75px]">
            {/* .section-head — reuse SectionHead atom
                variant="light" → text-foreground (white) matches source .section-head_title { color: neutral-0 = white }
                titleTag="h1" (semantic) + titleSize="h2" (visual .text-display-h2 size) */}
            <SectionHead
              title={foreplayPrivacyPolicyContent.title}
              titleTag="h1"
              titleSize="h2"
              variant="light"
            />
          </div>
        </SectionContainer>
      </section>

      {/* .section-white-block — bg white, rounded-[36px], text color solid-700 (dark on white) */}
      <SectionWhiteBlock>
        {/* .container (wide variant per source — max-w-site px-10) */}
        <SectionContainer variant="wide">
          {/* .v-padding-50 — empty spacer (padding: 25px 0) */}
          <div className="py-[25px]" />
          {/* .blog-rtb — source CSS: font-size:16px, line-height:24px, letter-spacing:-0.18px,
              color:var(--_lens---neutral-50). NO width constraint, NO margin — full container width. */}
          <div className="text-base leading-6 tracking-[-0.18px] text-[var(--alpha-50)]">
            {/* .text-solid-700 — overrides parent .blog-rtb color back to dark for readability on white bg */}
            <div className="text-[var(--solid-700)]">
              {/* .w-richtext — prose styling via @tailwindcss/typography
                  h3 source: font-size:24px, line-height:32px, margin:16px 0 12px
                    → [&_h3]:text-2xl [&_h3]:leading-8 [&_h3]:mt-4 [&_h3]:mb-3
                  p/ol/ul: match .blog-rtb body typography (16px/24px from parent) */}
              <div
                className="prose prose-neutral max-w-none font-sans [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-[1.125rem] [&_h3]:font-[550] [&_h3]:leading-6 [&_h3]:tracking-[-0.0144em] [&_h3]:text-[var(--solid-900)] [&_h4]:mt-5 [&_h4]:mb-1.5 [&_h4]:text-base [&_h4]:font-[550] [&_h4]:leading-6 [&_h4]:tracking-[-0.01125em] [&_h4]:text-[var(--solid-900)] [&_p]:my-3 [&_p]:text-base [&_p]:leading-6 [&_p]:tracking-[-0.01125em] [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-1 [&_li]:text-base [&_li]:leading-6 [&_hr]:my-6 [&_hr]:border-[var(--solid-100)] [&_strong]:text-[var(--solid-900)] [&_strong]:font-[550] [&_a]:text-[var(--solid-900)] [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: foreplayPrivacyPolicyContent.html }}
              />
            </div>
          </div>
          {/* .v-padding-50 — empty spacer (padding: 25px 0) */}
          <div className="py-[25px]" />
        </SectionContainer>
      </SectionWhiteBlock>
    </>
  )
}
