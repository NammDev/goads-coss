// Foreplay demo social proof — .demo-socialproof
// DOM: .demo-socialproof > .demo-socailproof-head-copy (grid 2 cols) > .section-head.is-align-left + .demo-socialproof-icons
// .demo-socialproof: flex col, gap-16 (64px), py-16 (64px)
// .demo-socailproof-head-copy: grid 2 cols (1fr 1fr), gap-4 (16px)
// .section-head.is-align-left: text-left, items-start
// .demo-socialproof-icons: grid 3 cols, gap-2 (8px)
// .demo-socialproof-item: inset border solid-50, rounded-xl, p-1, flex col, min-w-[144px]
// .demo-socialproof-content: flex col, gap-0, items-center, pt-1 pb-2
// .dev-socialproof-rating: flex, gap-0.5, items-center, text-solid-600, text-[1.2rem]
// .demo-socialproof-item-name: bg solid-25, text solid-900, text-center, rounded-lg, py-1.5 px-2

import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"

/* Rounded icon tile — 40x40, #F9F9FA bg, brand-blue glyph (matches the
   review-badge tile geometry it replaces). */
function StatTile({ children }: { children: React.ReactNode }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="20" fill="#F9F9FA" />
      <g transform="translate(10 10)" stroke="#528BFF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {children}
      </g>
    </svg>
  )
}

// GoAds proof — real traction, not third-party review scores. Numbers kept
// consistent with the site's existing "1000+ / 500+ advertisers" claims.
const socialProofItems = [
  {
    // happy clients — people
    icon: (
      <StatTile>
        <circle cx="7.5" cy="6" r="3" />
        <path d="M2 18c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
        <path d="M14 5.2a3 3 0 0 1 0 5.6" />
        <path d="M15.5 18c0-2.6-1.4-4.4-3.2-5" />
      </StatTile>
    ),
    value: "1,000+",
    label: "HAPPY CLIENTS",
  },
  {
    // agencies — building
    icon: (
      <StatTile>
        <path d="M3 18V4.5A1.5 1.5 0 0 1 4.5 3h11A1.5 1.5 0 0 1 17 4.5V18" />
        <path d="M1 18h18" />
        <path d="M7 7h2M11 7h2M7 10.5h2M11 10.5h2" />
        <path d="M8 18v-3.5h4V18" />
      </StatTile>
    ),
    value: "500+",
    label: "AGENCIES SCALING",
  },
  {
    // ad spend managed — trending up
    icon: (
      <StatTile>
        <path d="M2 14l5-5 4 4 7-7" />
        <path d="M13 6h5v5" />
        <path d="M2 18h16" />
      </StatTile>
    ),
    value: "$50M+",
    label: "AD SPEND MANAGED",
  },
]

export function DemoSocialProof() {
  return (
    <div className="flex flex-col py-20">
      {/* .demo-socailproof-head-copy: 2-col desktop; stack ≤991 so the icon grid
          gets full width below the heading (Foreplay stacks this on mobile). */}
      <div className="grid grid-cols-[1fr_1fr] items-stretch gap-4 max-fp-lg:grid-cols-1">
        {/* .section-head.is-align-left */}
        <div className="flex flex-col items-start gap-2 text-left">
          <div className="[text-wrap:balance]">
            <h2 className={cn(siteText.displayH3, "text-[var(--solid-700)]")}>
              Loved by brands and agencies globally.
            </h2>
          </div>
          <div className="[text-wrap:balance]">
            <div className="text-[var(--solid-600)]">
              <p className={siteText.bodyL}>
                Thousands of advertisers and agencies scale on GoAds infrastructure every day.
              </p>
            </div>
          </div>
        </div>

        {/* .demo-socialproof-icons: 3-col; →1-col ≤479 (Foreplay) so the min-w-144 cards don't overflow */}
        <div className="grid auto-cols-fr grid-cols-3 items-stretch gap-2 max-fp-sm:grid-cols-1">
          {socialProofItems.map((item, i) => (
            <div
              key={i}
              className={cn(
                // .demo-socialproof-item
                "flex min-w-[144px] flex-col items-stretch rounded-xl p-1",
                "shadow-[inset_0_0_0_1px_var(--solid-50)]",
              )}
            >
              {/* .demo-socialproof-content */}
              <div className="flex flex-1 flex-col items-center justify-center gap-0 pt-1 pb-2">
                <div className="size-10">{item.icon}</div>
                {/* stat value */}
                <div className="mt-1 flex items-center gap-0.5 text-[1.2rem] text-[var(--solid-600)]">
                  <div className="font-semibold">{item.value}</div>
                </div>
              </div>
              {/* .demo-socialproof-item-name */}
              <div className="rounded-lg bg-[var(--solid-25)] px-2 py-1.5 text-center text-[var(--solid-900)]">
                <div className={siteText.overline}>{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
