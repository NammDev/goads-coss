// Setup blueprint dialog — a read-only popup that shows how the assets in a setup
// connect, so customers can picture the infrastructure they're buying. Reuses the
// exact dark Radix panel of SetupConfiguratorDialog (site-scoped tokens, blurred
// backdrop, close X). No cart action here: it renders a labelled topology of asset
// "pods" (each a BM hub with its linked profiles/pages) plus an optional
// "pixel sharing" bridge arrow drawn from the first pod's BM to the second's.
//
// Monochrome black/white + alpha tokens only (matches the Foreplay dark theme,
// same palette as SetupConfiguratorDialog). Single-pod setups (one BM, e.g.
// Advanced) render one centred pod with no bridge. Static markup only (no
// effects/observers) so it adds no hydration or LCP cost.

"use client"

import { XIcon } from "lucide-react"
import { Dialog as DialogPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"

export interface SetupPod {
  /** Pod heading, e.g. "Pixel Bank" | "Scaling" */
  label: string
  /** The Business Manager that acts as this pod's hub */
  bm: { iconSrc: string; name: string; sub: string }
  /** number of profile nodes linked into this pod's BM */
  profiles: number
  /** number of page nodes linked into this pod's BM */
  pages: number
  /** one-line role, e.g. "Creates & warms your pixel" */
  caption?: string
}

export interface SetupTopology {
  /** Short intro under the title */
  intro?: string
  /** Left-to-right pods (2 for the pixel-bank + scaling layout, 1 for single-BM) */
  pods: SetupPod[]
  /** Arrow label drawn from pod[0] BM → pod[1] BM (e.g. "pixel sharing"). Omit for none. */
  bridgeLabel?: string
  /** Ordered "how to read it" steps shown below the diagram */
  steps?: string[]
}

const PROFILE_ICON = "/assets/PROFILES.webp"
const PAGE_ICON = "/assets/PAGES.webp"

// A linked asset chip (profile / page) hanging off a BM.
function AssetChip({ iconSrc, label }: { iconSrc: string; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-[10px] border border-[#ffffff1a] bg-white/[0.02] px-3 py-2 transition-colors hover:border-[var(--alpha-400)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={iconSrc} alt="" className="size-6 object-contain" loading="lazy" />
      <span className={cn(siteText.bodyS, "whitespace-nowrap text-[var(--alpha-100)]")}>{label}</span>
    </div>
  )
}

// One pod: BM hub node on top, a connector stem, then a forked rail of linked chips.
function Pod({ pod }: { pod: SetupPod }) {
  const chips = [
    ...Array.from({ length: pod.profiles }, (_, i) => ({ k: `p${i}`, iconSrc: PROFILE_ICON, label: "Profile" })),
    ...Array.from({ length: pod.pages }, (_, i) => ({ k: `g${i}`, iconSrc: PAGE_ICON, label: "Page" })),
  ]
  return (
    <div className="flex flex-1 flex-col items-center gap-4">
      {/* pod label pill */}
      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ffffff1a] bg-white/[0.04] px-3 py-1">
        <span className="size-1.5 rounded-full bg-[var(--alpha-200)]" aria-hidden="true" />
        <span className={cn(siteText.labelS, "text-foreground")}>{pod.label}</span>
      </span>

      {/* BM hub node — the anchor of the pod; flat elevated panel (no gradient) */}
      <div className="relative flex items-center gap-3 rounded-[14px] border border-[#ffffff1a] bg-[var(--alpha-800)] px-4 py-3">
        <div className="flex size-12 items-center justify-center rounded-[10px] bg-white/[0.05]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={pod.bm.iconSrc} alt="" className="size-9 object-contain" loading="lazy" />
        </div>
        <span className="flex flex-col">
          <span className={cn(siteText.labelL, "text-foreground")}>{pod.bm.name}</span>
          <span className={cn(siteText.bodyXs, "text-[var(--alpha-100)]")}>{pod.bm.sub}</span>
        </span>
      </div>

      {/* connector stem: BM → asset rail */}
      <div className="h-5 w-px bg-[#ffffff1a]" aria-hidden="true" />

      {/* linked assets — each hangs off the rail via a short fork tick */}
      <div className="flex w-full flex-wrap justify-center gap-x-3 gap-y-3 border-t border-[#ffffff1a] pt-4">
        {chips.map((c) => (
          <div key={c.k} className="flex flex-col items-center">
            <span className="mb-2 h-3 w-px bg-[#ffffff1a]" aria-hidden="true" />
            <AssetChip iconSrc={c.iconSrc} label={c.label} />
          </div>
        ))}
      </div>

      {pod.caption && (
        <span className={cn(siteText.bodyS, "text-center text-[var(--alpha-100)]")}>{pod.caption}</span>
      )}
    </div>
  )
}

// Dashed arrow signalling flow between the two BMs. Horizontal on desktop;
// the pods stack on mobile, so rotate it 90° to point downward there.
function BridgeArrow() {
  return (
    <svg viewBox="0 0 64 12" className="h-3 w-16 shrink-0 text-[var(--alpha-300)] max-sm:rotate-90" fill="none" aria-hidden="true">
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

interface SetupBlueprintDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  planName: string
  topology: SetupTopology
}

export function SetupBlueprintDialog({ open, onOpenChange, planName, topology }: SetupBlueprintDialogProps) {
  const [first, ...rest] = topology.pods
  const second = rest[0]
  const single = !second

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Backdrop — darker + blur so the near-black page recedes behind the panel. */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        {/* `site` re-scopes the Foreplay dark tokens (portal renders outside .site). */}
        <DialogPrimitive.Content
          className={cn(
            "site fixed top-1/2 left-1/2 z-[121] flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[880px] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 overflow-y-auto rounded-[20px]",
            "bg-background border border-white/12 p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.04] outline-none max-sm:p-5",
            "duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          )}
        >
          {/* Close (X) — top-right */}
          <DialogPrimitive.Close
            aria-label="Close"
            className="absolute top-5 right-5 flex size-8 items-center justify-center rounded-[10px] text-[var(--alpha-100)] transition-colors duration-150 hover:bg-white/10 hover:text-foreground"
          >
            <XIcon className="size-4" />
          </DialogPrimitive.Close>

          {/* Header */}
          <div className="flex flex-col gap-2 pr-8">
            <DialogPrimitive.Title className={cn(siteText.displayH4, "text-foreground")}>
              How your {planName} connects
            </DialogPrimitive.Title>
            {topology.intro && (
              <DialogPrimitive.Description className={cn(siteText.bodyM, "text-[var(--alpha-100)]")}>
                {topology.intro}
              </DialogPrimitive.Description>
            )}
          </div>

          {/* Diagram — flat panel matching the buy-setup dialog (no gradient) */}
          <div className="rounded-[14px] border border-[#ffffff1a] p-5 max-sm:p-4">
            <div
              className={cn(
                "flex items-stretch gap-4 max-sm:flex-col",
                single && "justify-center",
              )}
            >
              {single ? (
                <div className="w-full max-w-[420px]">
                  <Pod pod={first} />
                </div>
              ) : (
                <>
                  <Pod pod={first} />
                  <div className="flex flex-col items-center justify-center gap-2 px-1 max-sm:py-2">
                    {topology.bridgeLabel && (
                      <span className="rounded-full border border-[#ffffff1a] bg-[var(--alpha-800)] px-2.5 py-1 text-[var(--alpha-100)]">
                        <span className={siteText.bodyXs}>{topology.bridgeLabel}</span>
                      </span>
                    )}
                    <BridgeArrow />
                  </div>
                  <Pod pod={second} />
                </>
              )}
            </div>
          </div>

          {/* How to read it */}
          {topology.steps && topology.steps.length > 0 && (
            <div className="flex flex-col gap-3">
              <div className={cn(siteText.overline, "text-[var(--alpha-100)]")}>How it works</div>
              <ol className="m-0 grid list-none grid-cols-2 gap-x-6 gap-y-3 p-0 max-sm:grid-cols-1">
                {topology.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className={cn(
                        siteText.labelS,
                        "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-[#ffffff1a] bg-[var(--alpha-800)] text-foreground",
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className={cn(siteText.bodyS, "text-[var(--alpha-100)]")}>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
