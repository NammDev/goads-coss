// Setup blueprint dialog — a read-only popup that shows how the assets in a setup
// connect, so customers can picture the infrastructure they're buying. Reuses the
// exact dark Radix panel of SetupConfiguratorDialog (site-scoped tokens, blurred
// backdrop, close X). The topology visual itself lives in SetupTopologyDiagram so
// the custom-setup builder can render the same diagram live; this file owns the
// dialog chrome (header + "How it works" steps) around it.

"use client"

import { XIcon } from "lucide-react"
import { Dialog as DialogPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"
import { SetupTopologyDiagram, type SetupTopology } from "@/components/pricing/setup-topology-diagram"

// Re-export so existing importers (e.g. pricing/card.tsx) keep their path.
export type { SetupPod, SetupTopology } from "@/components/pricing/setup-topology-diagram"

interface SetupBlueprintDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  planName: string
  topology: SetupTopology
}

export function SetupBlueprintDialog({ open, onOpenChange, planName, topology }: SetupBlueprintDialogProps) {
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

          {/* Diagram — shared, live-renderable topology visual */}
          <SetupTopologyDiagram topology={topology} />

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
