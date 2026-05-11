// Founder section — portrait + quote, free-style on white bg.
// Layout: 2-col grid (portrait left, quote+signature right). Stacks on mobile.

import { fpText } from "@/components/foreplay/foreplay-typography"

export function ForeplayHomeWinning() {
  return (
    <div className="py-20">
      <div className="mx-auto grid w-full max-w-[960px] grid-cols-1 gap-8 md:grid-cols-[2fr_3fr] md:gap-12">
        {/* Founder portrait — placeholder gradient + initials. Swap to <img src="/founder/justin-bui.jpg" /> when ready. */}
        <div
          role="img"
          aria-label="Justin Bui, Founder of GoAds"
          className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[radial-gradient(at_30%_20%,#a855f7,transparent_55%),radial-gradient(at_80%_60%,#ec4899,transparent_55%),radial-gradient(at_50%_100%,#fb923c,transparent_60%)] shadow-md ring-1 ring-black/5"
        >
          <span className="absolute inset-0 flex items-center justify-center font-display text-[6rem] font-bold leading-none text-white drop-shadow-md">
            JB
          </span>

          {/* Name overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent p-5">
            <div className="font-display text-xl font-semibold text-white">Justin Bui</div>
            <div className="text-sm text-white/80">Founder, GoAds</div>
          </div>
        </div>

        {/* Right: quote + signature */}
        <div className="flex flex-col justify-center gap-5 text-[var(--fp-solid-700)]">
          <p className={`${fpText.bodyL} font-medium text-[var(--fp-solid-900)]`}>
            GoAds was built from experience, not theory.
          </p>
          <p className={fpText.bodyL}>
            We&rsquo;ve lived through the instability of this industry ourselves &mdash; the bans, the uncertainty, the nights spent looking for answers no provider could give.
          </p>
          <p className={fpText.bodyL}>
            That&rsquo;s why we focus on solving problems at the root and building systems our clients can truly rely on.
          </p>

          {/* Signature */}
          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-2xl italic text-[var(--fp-solid-900)]">
              Justin Bui
            </span>
            <span className="text-sm text-[var(--fp-solid-500)]">/ Founder</span>
          </div>
        </div>
      </div>
    </div>
  )
}
