// Buy-or-rent question, asked once when someone lands on /rental.
//
// The header's "Agency Ad Account" link sends everyone here, and a good share of
// them want to buy an account outright rather than rent a setup. Asking on
// arrival routes them in one click instead of letting them read the wrong page.
//
// Shown ONCE per browser, remembered in localStorage. An interstitial that
// reappears on every visit stops being a router and becomes an obstacle, and the
// same choice stays available further down the page anyway.
//
// The "have they seen it" flag is read through useSyncExternalStore, not an
// effect. localStorage does not exist during SSR, so the server needs its own
// snapshot; doing it with `useEffect(() => setOpen(true))` both trips
// react-hooks/set-state-in-effect and renders one wasted frame. The server
// snapshot reports "seen", so the dialog is closed in the HTML and only appears
// once the client has actually checked.
//
// Paint follows the site's other Radix dialogs (flat dark panel, blurred
// backdrop, 200ms fade + zoom-95).

"use client"

import { useState, useSyncExternalStore } from "react"
import Link from "next/link"
import { Dialog as DialogPrimitive } from "radix-ui"
import { RefreshCw, ShoppingBag, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"
import { RENTAL_INTENT_OPTIONS, type RentalIntentOption } from "@/data/rental-page-data"

/** Bump the suffix to show the question again to everyone, e.g. after a rewrite. */
const SEEN_KEY = "goads:rental-intent-seen-v1"

const ICONS = { buy: ShoppingBag, rent: RefreshCw } as const

// Module scope so the references stay stable across renders, which
// useSyncExternalStore requires.
/** The flag never changes underneath us, so there is nothing to subscribe to. */
const noSubscription = () => () => {}
/** Private mode or storage disabled reads as "seen": better to skip the question
 *  than to ask it on every single navigation with no way to remember the answer. */
const hasSeenIntent = () => {
  try {
    return localStorage.getItem(SEEN_KEY) !== null
  } catch {
    return true
  }
}
/** Server has no localStorage, so it renders the dialog closed. */
const seenOnServer = () => true

export function RentalIntentDialog() {
  const seen = useSyncExternalStore(noSubscription, hasSeenIntent, seenOnServer)
  const [dismissed, setDismissed] = useState(false)
  const open = !seen && !dismissed

  const dismiss = () => {
    setDismissed(true)
    try {
      localStorage.setItem(SEEN_KEY, "1")
    } catch {
      // Nothing to do; `dismissed` already closed it for this page view.
    }
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(next) => !next && dismiss()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            // `site` re-scopes the Foreplay tokens: the portal renders outside the
            // marketing layout, where --alpha-* and --background are undefined.
            "site fixed top-1/2 left-1/2 z-[121] w-[calc(100%-2rem)] max-w-[560px] -translate-x-1/2 -translate-y-1/2",
            "flex flex-col gap-6 rounded-[20px] border border-white/12 bg-background p-7 max-sm:p-5",
            "shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.04] outline-none",
            "duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          )}
        >
          <DialogPrimitive.Close
            aria-label="Close"
            className="absolute top-5 right-5 flex size-8 cursor-pointer items-center justify-center rounded-[10px] text-[var(--alpha-100)] transition-colors duration-150 hover:bg-white/10 hover:text-foreground"
          >
            <XIcon className="size-4" />
          </DialogPrimitive.Close>

          <div className="flex flex-col gap-2 pr-8">
            <DialogPrimitive.Title className={cn(siteText.displayH5, "text-foreground")}>
              Two ways to run agency ad accounts
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className={cn(siteText.bodyM, "text-[var(--alpha-100)]")}>
              Own the asset outright, or rent a setup that is ready to spend.
            </DialogPrimitive.Description>
          </div>

          <div className="flex flex-col gap-3">
            {RENTAL_INTENT_OPTIONS.map((option) => (
              <IntentOption key={option.id} option={option} onChoose={dismiss} />
            ))}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

/** A link when it leaves the page, a button when it does not. Rendering the
 *  rental option as an <a href="/rental"> would be a link to the page you are
 *  already on: no navigation, and a confusing target for screen readers. */
function IntentOption({
  option,
  onChoose,
}: {
  option: RentalIntentOption
  onChoose: () => void
}) {
  const Icon = ICONS[option.id]

  const body = (
    <>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-[12px] bg-[var(--alpha-800)] text-foreground">
        <Icon className="size-5" strokeWidth={1.8} />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className={cn(siteText.labelL, "text-foreground")}>{option.label}</span>
        <span className={cn(siteText.bodyS, "text-[var(--alpha-100)] [text-wrap:pretty]")}>
          {option.body}
        </span>
      </span>
    </>
  )

  const shell = cn(
    "flex w-full items-start gap-4 rounded-[14px] border border-[var(--alpha-700)] p-4 text-left no-underline",
    "transition-colors duration-150 hover:border-[var(--alpha-400)] hover:bg-white/[0.03]",
  )

  if (!option.href) {
    return (
      <button type="button" onClick={onChoose} className={cn(shell, "cursor-pointer")}>
        {body}
      </button>
    )
  }

  return (
    <Link href={option.href} onClick={onChoose} className={shell}>
      {body}
    </Link>
  )
}
