// Neutral header for the AdsToolkit (tools-only) brand.
//
// Same sticky shell as the GOADS header (sticky, blurred nav background,
// max-w-site container) for visual continuity, but a plain text wordmark instead
// of the GOADS panda mark and a tools-only nav — no product/pricing/marketing
// links, no GOADS branding. Chosen over <Header /> in (marketing)/layout when
// `brand.key === "adstoolkit"`.

import Link from "next/link"

import { brand } from "@/config/brand"
import { cn } from "@/lib/utils"

export function AdsToolkitHeader() {
  return (
    <header
      className={cn(
        "sticky top-0 z-[100] text-[var(--alpha-100)]",
        "bg-[var(--nav-bg)] backdrop-blur-[24px]",
      )}
    >
      <div className="mx-auto flex max-w-site items-center px-2 fp-lg:px-10">
        <div className="relative flex w-full items-center p-4 max-fp-lg:h-[72px] max-fp-lg:py-3">
          <Link
            href="/tools/bookmark"
            aria-label={`${brand.name} home`}
            className="z-[5] rounded-[10px] p-1 text-lg font-semibold tracking-[-0.02em] text-[var(--alpha-100)] transition-opacity hover:opacity-80 focus-visible:shadow-[0_0_0_3px] focus-visible:shadow-secondary focus-visible:outline-none"
          >
            {brand.name}
          </Link>
        </div>
      </div>
    </header>
  )
}
