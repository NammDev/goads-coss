// Setup topology diagram — the reusable visual of how a setup's assets connect.
// Each "pod" is a BM hub with its linked profiles/pages; an optional pixel-bank
// pod feeds the scaling pods via a "pixel sharing" bridge. Used by both the preset
// blueprint popup and the live custom-setup builder.
//
// Two layouts:
//  - Legacy (<=2 pods, no `isBank`): the original centred single / bridged double
//    pod — presets rely on this and render exactly as before.
//  - Multi-pod (any pod flags `isBank`, or 3+ pods): a bank column + a scrollable
//    row of scaling pods, so builds with many BMs stay readable.
//
// Monochrome black/white + alpha tokens only (flat Foreplay theme, no gradients).
// Static markup only — no effects/observers, so no hydration or LCP cost.

import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"

/** A linked asset shown as a chip, with a quantity (×N badge when > 1). */
export interface PodAsset {
  iconSrc: string
  label: string
  count: number
}

export interface SetupPod {
  /** 1-based BM number, shown as a #badge to match the builder's BM card. */
  index?: number
  /** Pod heading, e.g. "Pixel Bank" | "Scaling" */
  label: string
  /** The Business Manager that acts as this pod's hub */
  bm: { iconSrc: string; name: string; sub: string }
  /** Typed asset chips (builder). Takes precedence over profiles/pages. */
  assets?: PodAsset[]
  /** Legacy generic counts (presets): rendered as repeated "Profile"/"Page" chips. */
  profiles?: number
  pages?: number
  /** Highlights this pod as the shared pixel bank (multi-pod layout). */
  isBank?: boolean
  /** one-line role, e.g. "Creates & warms your pixel" */
  caption?: string
}

export interface SetupTopology {
  /** Short intro under the title (used by the blueprint dialog header) */
  intro?: string
  pods: SetupPod[]
  /** Bridge label from the pixel bank to the scaling pods (e.g. "pixel sharing"). */
  bridgeLabel?: string
  /** Ordered "how to read it" steps (rendered by the blueprint dialog, not here) */
  steps?: string[]
}

const PROFILE_ICON = "/assets/PROFILES.webp"
const PAGE_ICON = "/assets/PAGES.webp"

type Chip = { key: string; iconSrc: string; label: string; count: number }

function podChips(pod: SetupPod): Chip[] {
  if (pod.assets && pod.assets.length > 0) {
    return pod.assets.map((a, i) => ({ key: `a${i}`, iconSrc: a.iconSrc, label: a.label, count: a.count }))
  }
  // Legacy: expand generic counts into repeated single chips (preset behaviour).
  return [
    ...Array.from({ length: pod.profiles ?? 0 }, (_, i) => ({ key: `p${i}`, iconSrc: PROFILE_ICON, label: "Profile", count: 1 })),
    ...Array.from({ length: pod.pages ?? 0 }, (_, i) => ({ key: `g${i}`, iconSrc: PAGE_ICON, label: "Page", count: 1 })),
  ]
}

function AssetChip({ iconSrc, label, count }: { iconSrc: string; label: string; count: number }) {
  return (
    <div className="flex items-center gap-2 rounded-[10px] border border-[#ffffff1a] bg-white/[0.02] px-3 py-2 transition-colors hover:border-[var(--alpha-400)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={iconSrc} alt="" className="size-6 object-contain" loading="lazy" />
      <span className={cn(siteText.bodyS, "whitespace-nowrap text-[var(--alpha-100)]")}>{label}</span>
      {count > 1 && (
        <span className="rounded-[6px] bg-white/[0.06] px-1.5 font-sans text-[11px] font-medium leading-4 text-foreground">×{count}</span>
      )}
    </div>
  )
}

// One pod: BM hub node on top, a connector stem, then a forked rail of chips.
function Pod({ pod }: { pod: SetupPod }) {
  const chips = podChips(pod)
  return (
    <div className="flex min-w-[180px] flex-1 flex-col items-center gap-4">
      {/* pod label pill — #index badge (matches the builder BM card) + role */}
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border py-1 pr-3 pl-1",
          pod.isBank ? "border-[var(--alpha-300)] bg-[var(--alpha-800)]" : "border-[#ffffff1a] bg-white/[0.04]",
        )}
      >
        {pod.index != null ? (
          <span className="flex size-5 items-center justify-center rounded-full bg-white/[0.08] font-sans text-[11px] font-medium leading-none text-foreground">
            {pod.index}
          </span>
        ) : (
          <span className={cn("ml-2 size-1.5 rounded-full", pod.isBank ? "bg-foreground" : "bg-[var(--alpha-200)]")} aria-hidden="true" />
        )}
        <span className={cn(siteText.labelS, "text-foreground")}>{pod.label}</span>
      </span>

      {/* BM hub node — flat elevated panel (no gradient) */}
      <div
        className={cn(
          "relative flex items-center gap-3 rounded-[14px] border bg-[var(--alpha-800)] px-4 py-3",
          pod.isBank ? "border-[var(--alpha-300)]" : "border-[#ffffff1a]",
        )}
      >
        <div className="flex size-12 items-center justify-center rounded-[10px] bg-white/[0.05]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={pod.bm.iconSrc} alt="" className="size-9 object-contain" loading="lazy" />
        </div>
        <span className="flex flex-col">
          <span className={cn(siteText.labelL, "text-foreground")}>{pod.bm.name}</span>
          <span className={cn(siteText.bodyXs, "text-[var(--alpha-100)]")}>{pod.bm.sub}</span>
        </span>
      </div>

      {chips.length > 0 ? (
        <>
          {/* connector stem: BM → asset rail */}
          <div className="h-5 w-px bg-[#ffffff1a]" aria-hidden="true" />
          {/* linked assets — each hangs off the rail via a short fork tick */}
          <div className="flex w-full flex-wrap justify-center gap-x-3 gap-y-3 border-t border-[#ffffff1a] pt-4">
            {chips.map((c) => (
              <div key={c.key} className="flex flex-col items-center">
                <span className="mb-2 h-3 w-px bg-[#ffffff1a]" aria-hidden="true" />
                <AssetChip iconSrc={c.iconSrc} label={c.label} count={c.count} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <span className={cn(siteText.bodyXs, "pt-1 text-center text-[var(--alpha-100)]")}>No profiles or pages yet</span>
      )}

      {pod.caption && (
        <span className={cn(siteText.bodyS, "text-center text-[var(--alpha-100)]")}>{pod.caption}</span>
      )}
    </div>
  )
}

// Dashed arrow signalling flow between BMs. Horizontal on desktop; rotates to
// point downward when the layout stacks on small screens.
function BridgeArrow() {
  return (
    <svg viewBox="0 0 64 12" className="h-3 w-16 shrink-0 text-[var(--alpha-300)] max-lg:rotate-90" fill="none" aria-hidden="true">
      <path
        d="M0 6h58m0 0-5-4m5 4-5 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="4 3"
      />
    </svg>
  )
}

function Bridge({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-1 max-lg:py-2">
      {label && (
        <span className="rounded-full border border-[#ffffff1a] bg-[var(--alpha-800)] px-2.5 py-1 text-[var(--alpha-100)]">
          <span className={siteText.bodyXs}>{label}</span>
        </span>
      )}
      <BridgeArrow />
    </div>
  )
}

interface SetupTopologyDiagramProps {
  topology: SetupTopology
  /** Extra classes on the outer diagram panel */
  className?: string
}

export function SetupTopologyDiagram({ topology, className }: SetupTopologyDiagramProps) {
  const pods = topology.pods
  if (pods.length === 0) return null

  const usesBank = pods.some((p) => p.isBank)

  // Legacy preset layout — one centred pod, or two joined by the bridge.
  if (!usesBank && pods.length <= 2) {
    const [first, second] = pods
    const single = !second
    return (
      <div className={cn("rounded-[14px] border border-[#ffffff1a] p-5 max-sm:p-4", className)}>
        <div className={cn("flex items-stretch gap-4 max-lg:flex-col", single && "justify-center")}>
          {single ? (
            <div className="w-full max-w-[420px]">
              <Pod pod={first} />
            </div>
          ) : (
            <>
              <Pod pod={first} />
              {topology.bridgeLabel && <Bridge label={topology.bridgeLabel} />}
              <Pod pod={second} />
            </>
          )}
        </div>
      </div>
    )
  }

  // Multi-pod builder layout — bank column feeding a scrollable row of scaling pods.
  const bankPods = pods.filter((p) => p.isBank)
  const scalingPods = pods.filter((p) => !p.isBank)
  return (
    <div className={cn("overflow-x-auto rounded-[14px] border border-[#ffffff1a] p-5 max-sm:p-4", className)}>
      <div className="flex items-stretch gap-4 max-lg:flex-col">
        {bankPods.length > 0 && (
          <div className="flex items-stretch gap-4 max-lg:flex-col">
            {bankPods.map((p, i) => (
              <Pod key={`bank${i}`} pod={p} />
            ))}
          </div>
        )}
        {bankPods.length > 0 && scalingPods.length > 0 && <Bridge label={topology.bridgeLabel} />}
        <div className="flex items-stretch gap-4 max-lg:flex-col">
          {scalingPods.map((p, i) => (
            <Pod key={`scale${i}`} pod={p} />
          ))}
        </div>
      </div>
    </div>
  )
}
