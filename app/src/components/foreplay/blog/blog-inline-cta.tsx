// Blog inline CTA — .blog-cta (adapted from Foreplay "30 Second Summary")
// CSS .blog-cta: bg neutral-700, rounded-[12px], sticky top-[120px]
// CSS .blog-cta-content: rounded-[12px], flex col, p-1
// CSS .blog-cta-text: flex col, center, p-3
// GoAds adaptation: "Scale Your Ads with GoAds" CTA with trial + pricing buttons

import Link from "next/link"

import { cn } from "@/lib/utils"
import { ForeplaySectionContainer } from "@/components/foreplay/foreplay-section-container"
import { fpText } from "@/components/foreplay/foreplay-typography"

export function BlogInlineCta() {
  return (
    <section className="py-10">
      <ForeplaySectionContainer>
        {/* .blog-cta: bg neutral-700, rounded-[12px] */}
        <div className="rounded-xl bg-[#ffffff1a]">
          {/* .blog-cta-content: rounded-[12px], flex col, p-1 */}
          <div className="flex flex-col rounded-xl p-1">
            {/* .blog-cta-text: flex col, center, p-3 */}
            <div className="flex flex-col items-center p-6 text-center">
              <h3 className={cn(fpText.displayH5, "text-foreground")}>
                Scale Your Ads with GoAds
              </h3>
              <p className={cn(fpText.bodyS, "mt-2 text-[var(--fp-alpha-100,#ffffffad)]")}>
                Get agency ad accounts with 7-day warranty and under 2-hour support.
              </p>
              <div className="mt-4 flex gap-3">
                <Link
                  href="/pricing"
                  className={cn(
                    fpText.labelS,
                    "rounded-[10px] bg-foreground px-4 py-2 text-background transition-colors hover:bg-[#ffffffd6]",
                  )}
                >
                  View Pricing
                </Link>
                <Link
                  href="/book-demo"
                  className={cn(
                    fpText.labelS,
                    "rounded-[10px] px-4 py-2 text-foreground shadow-[0_0_0_1px_#ffffff1a] transition-colors hover:bg-[#ffffff0f]",
                  )}
                >
                  Talk to Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ForeplaySectionContainer>
    </section>
  )
}
