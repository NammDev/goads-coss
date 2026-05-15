// Inline UI mockup widgets for the /agency-ad-account Before/After solution
// cards. Parallel structure across both widgets so the contrast reads at a
// glance: header pill, big spend, trend chart, orders row, footer status.
//
// Card chrome (light Before / dark After) comes from the parent
// foreplay-product-page-solution-before-after.tsx; here we only render the
// floating widget + a soft ambient color glow.

export function AgencyDisabledAccountMockup() {
  return (
    <div className="relative w-full px-5 py-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-12 top-6 -z-10 h-48 rounded-full bg-red-400/15 blur-3xl"
      />

      <div className="mx-auto w-full max-w-[320px] rounded-2xl border border-zinc-200/80 bg-white p-5 text-left shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)]">
        <div className="flex items-center justify-between">
          <div className="font-mono text-[10px] tracking-wider text-zinc-400 uppercase">
            Ad Account
          </div>
          <div className="rounded-md bg-red-50 px-2 py-0.5 text-[10px] font-bold tracking-wider text-red-600">
            RESTRICTED
          </div>
        </div>

        <div className="mt-3 text-3xl font-semibold tabular-nums text-zinc-900">
          $4,210
        </div>
        <div className="text-xs text-zinc-500">Spend (last 7 days)</div>

        {/* CPM climbing chart — line ascends left to right (cost spiking UP = losing) */}
        <div className="mt-3 rounded-lg border border-zinc-200 bg-zinc-50/60 p-2">
          <div className="mb-1 flex items-center justify-between text-[10px] text-zinc-500">
            <span className="font-mono uppercase tracking-wider">CPM</span>
            <span className="tabular-nums">
              <span className="text-zinc-400">$12.40</span>
              <span className="px-1 text-zinc-300">→</span>
              <span className="font-semibold text-red-600">$48.20</span>
            </span>
          </div>
          <svg width="100%" height="32" viewBox="0 0 200 32" fill="none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="cpmBadArea" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Filled area under the rising curve */}
            <path
              d="M 5 26 L 30 24 L 55 21 L 80 18 L 105 14 L 130 11 L 155 8 L 180 5 L 195 4 L 195 32 L 5 32 Z"
              fill="url(#cpmBadArea)"
            />
            {/* Rising trend line */}
            <path
              d="M 5 26 L 30 24 L 55 21 L 80 18 L 105 14 L 130 11 L 155 8 L 180 5 L 195 4"
              stroke="#ef4444"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* End-point dot at peak */}
            <circle cx="195" cy="4" r="2.5" fill="#ef4444" />
          </svg>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs">
          <div className="text-zinc-500">Orders</div>
          <div className="flex items-center gap-1.5 font-semibold text-zinc-900 tabular-nums">
            <span>23</span>
            <span className="rounded bg-red-50 px-1.5 py-0.5 text-[10px] font-bold text-red-600">
              ↓ 68%
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 border-t border-zinc-100 pt-3">
          <span className="size-1.5 animate-pulse rounded-full bg-red-500" />
          <div className="text-[11px] text-red-700">
            Account flagged — 3rd restriction this month
          </div>
        </div>
      </div>
    </div>
  )
}

export function AgencyWhitelistedAccountMockup() {
  return (
    <div className="relative w-full px-5 py-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-12 top-6 z-0 h-48 rounded-full bg-emerald-400/20 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[320px] rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="font-mono text-[10px] tracking-wider uppercase text-foreground/50">
            Agency Account
          </div>
          <div className="rounded-md bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold tracking-wider text-emerald-400">
            WHITELISTED
          </div>
        </div>

        <div className="mt-3 text-3xl font-semibold tabular-nums text-foreground">
          $847,392
        </div>
        <div className="text-xs text-foreground/60">Spend (last 7 days)</div>

        {/* CPM trend — line descends left to right (cost going DOWN = winning) */}
        <div className="mt-3 rounded-lg border border-white/5 bg-black/20 p-2">
          <div className="mb-1 flex items-center justify-between text-[10px] text-foreground/50">
            <span className="font-mono uppercase tracking-wider">CPM</span>
            <span className="tabular-nums">
              <span className="text-red-400/80">$12.40</span>
              <span className="px-1 text-foreground/40">→</span>
              <span className="font-semibold text-emerald-400">$4.20</span>
            </span>
          </div>
          <svg width="100%" height="32" viewBox="0 0 200 32" fill="none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="cpmAreaFill" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="cpmStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            {/* Filled area under the curve */}
            <path
              d="M 5 5 L 30 9 L 55 7 L 80 13 L 105 16 L 130 19 L 155 23 L 180 26 L 195 27 L 195 32 L 5 32 Z"
              fill="url(#cpmAreaFill)"
            />
            {/* Trend line */}
            <path
              d="M 5 5 L 30 9 L 55 7 L 80 13 L 105 16 L 130 19 L 155 23 L 180 26 L 195 27"
              stroke="url(#cpmStroke)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* End point dot */}
            <circle cx="195" cy="27" r="2.5" fill="#10b981" />
          </svg>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs">
          <div className="text-foreground/60">Orders</div>
          <div className="flex items-center gap-1.5 font-semibold tabular-nums text-foreground">
            <span>12,487</span>
            <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">
              ↑ 42%
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3">
          <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <div className="text-[11px] text-emerald-400">
            Unlimited DSL — Meta rep online
          </div>
        </div>
      </div>
    </div>
  )
}
