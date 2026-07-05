// Custom setup builder dialog — customers assemble their own setup one BM at a
// time. Each BM card picks a tier, an optional "pixel bank" role, and its OWN
// profiles/pages via "+ Add" → chip-with-stepper. A big live topology diagram
// shows one detailed pod per BM so multi-BM builds are easy to picture.
//
// Same dark flat Radix panel as SetupConfiguratorDialog. Prices/logic come from
// custom-setup-data.ts; the diagram is the shared SetupTopologyDiagram. Volume
// discount is deferred (applyDiscount is identity in v1).

"use client"

import { type ReactNode, useCallback, useRef, useState } from "react"
import { XIcon, MinusIcon, PlusIcon, ChevronDownIcon, Trash2Icon } from "lucide-react"
import { Dialog as DialogPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"
import { CtaButton } from "@/components/atoms/cta-button"
import { useCart } from "@/lib/cart-context"
import { SetupTopologyDiagram } from "@/components/pricing/setup-topology-diagram"
import { VerifiedBadge } from "@/assets/svg/verified-badge"
import {
  itemsByCategory,
  getItem,
  SETUP_TEMPLATES,
  DEFAULT_TEMPLATE,
  computeTotal,
  applyDiscount,
  validate,
  buildTopology,
  flattenToCartLines,
  ORIGINAL_PROFILE_ID,
  AD_ACCOUNT_ID,
  type CustomSetup,
  type TemplateId,
  type BuildableItem,
} from "@/data/custom-setup-data"

// ── Small building blocks ──

function MiniDropdown({
  trigger,
  options,
  onSelect,
}: {
  trigger: ReactNode
  options: { value: string; label: string }[]
  onSelect: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          siteText.labelS,
          "flex cursor-pointer items-center gap-1.5 rounded-[10px] border border-[#ffffff1a] bg-[var(--alpha-800)] px-2.5 py-1.5 text-foreground transition-colors hover:border-[var(--alpha-400)]",
        )}
      >
        {trigger}
        <ChevronDownIcon className="size-3.5 text-[var(--alpha-100)]" />
      </button>
      {open && (
        <>
          <button type="button" aria-hidden="true" className="fixed inset-0 z-[122] cursor-default" onClick={() => setOpen(false)} />
          <div className="absolute left-0 z-[123] mt-1 max-h-[240px] min-w-[190px] overflow-y-auto rounded-[10px] border border-[#ffffff1a] bg-background p-1 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.85)]">
            {options.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => { onSelect(o.value); setOpen(false) }}
                className={cn(siteText.bodyS, "flex w-full cursor-pointer items-center rounded-[7px] px-2.5 py-1.5 text-left text-[var(--alpha-100)] transition-colors hover:bg-white/[0.06] hover:text-foreground")}
              >
                {o.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// Chip for one assigned asset type: label + − qty + (removing at 0).
function AssetPill({ item, qty, onChange }: { item: BuildableItem; qty: number; onChange: (next: number) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-[10px] border border-[#ffffff1a] bg-white/[0.02] py-1.5 pr-1.5 pl-2.5">
      <span className={cn(siteText.bodyXs, "whitespace-nowrap text-foreground")}>{item.chipLabel ?? item.label}</span>
      <button
        type="button"
        aria-label={`Fewer ${item.label}`}
        onClick={() => onChange(qty - 1)}
        disabled={qty === 0}
        className="flex size-5 cursor-pointer items-center justify-center rounded-[6px] text-[var(--alpha-100)] transition-colors hover:bg-white/10 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
      >
        <MinusIcon className="size-3" />
      </button>
      <span className={cn(siteText.labelS, "w-4 text-center text-foreground")}>{qty}</span>
      <button
        type="button"
        aria-label={`More ${item.label}`}
        onClick={() => onChange(qty + 1)}
        className="flex size-5 cursor-pointer items-center justify-center rounded-[6px] text-[var(--alpha-100)] transition-colors hover:bg-white/10 hover:text-foreground"
      >
        <PlusIcon className="size-3" />
      </button>
    </div>
  )
}

// One segment of the Scaling | Pixel bank role control.
function RolePill({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        siteText.labelS,
        "cursor-pointer rounded-full px-3 py-1 transition-colors",
        active ? "bg-[var(--alpha-800)] text-foreground" : "text-[var(--alpha-100)] hover:text-foreground",
      )}
    >
      {label}
    </button>
  )
}

interface CustomSetupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CustomSetupDialog({ open, onOpenChange }: CustomSetupDialogProps) {
  const { addItem } = useCart()
  // BM slot uids: template seeds use deterministic slot-<i>; runtime-added BMs use
  // a monotonic new-<n> counter (read only inside the addBm handler, never during
  // render) so uids never collide, even across resets.
  const uidRef = useRef(0)

  const seed = useCallback(
    (t: TemplateId): CustomSetup => ({
      bms: SETUP_TEMPLATES[t].bms.map((s, i) => ({ uid: `slot-${i}`, bmId: s.bmId, isBank: s.isBank, assets: { ...s.assets } })),
      extras: { ...SETUP_TEMPLATES[t].extras },
    }),
    [],
  )

  const [setup, setSetup] = useState<CustomSetup>(() => seed(DEFAULT_TEMPLATE))

  const total = applyDiscount(computeTotal(setup))
  const { warnings, canCheckout } = validate(setup)
  const topology = buildTopology(setup)
  const itemCount = flattenToCartLines(setup).reduce((n, l) => n + l.qty, 0)

  const bmOptions = itemsByCategory("bm").map((i) => ({ value: i.id, label: `${i.label} · $${i.unitPrice}` }))
  // Original profile is hidden from the picker — it has its own per-BM toggle.
  const profileOptions = itemsByCategory("profile").filter((i) => !i.builderHidden).map((i) => ({ value: i.id, label: `${i.label} · $${i.unitPrice}` }))
  const pageOptions = itemsByCategory("page").map((i) => ({ value: i.id, label: `${i.label} · $${i.unitPrice}` }))
  const extraItems = itemsByCategory("extra")
  const adAccountItem = getItem(AD_ACCOUNT_ID)

  // ── mutations ──
  const reset = useCallback(() => setSetup(seed(DEFAULT_TEMPLATE)), [seed])

  const addBm = () => {
    const uid = `new-${uidRef.current++}`
    setSetup((s) => ({ ...s, bms: [...s.bms, { uid, bmId: "bm5", isBank: false, assets: {} }] }))
  }
  const removeBm = (uid: string) => setSetup((s) => ({ ...s, bms: s.bms.filter((b) => b.uid !== uid) }))
  const setBmTier = (uid: string, bmId: string) =>
    setSetup((s) => ({
      ...s,
      bms: s.bms.map((b) => {
        if (b.uid !== uid) return b
        // Switching to a non-eligible tier (BM3) clears the pixel-bank role.
        return { ...b, bmId, isBank: getItem(bmId)?.bankEligible ? b.isBank : false }
      }),
    }))
  const setBank = (uid: string, isBank: boolean) =>
    setSetup((s) => ({
      ...s,
      // Only one pixel bank at a time; a pixel bank doesn't run agency ad accounts.
      bms: s.bms.map((b) => {
        if (b.uid === uid) {
          const assets = { ...b.assets }
          if (isBank) delete assets[AD_ACCOUNT_ID]
          return { ...b, isBank, assets }
        }
        return isBank ? { ...b, isBank: false } : b
      }),
    }))
  const setOriginalProfile = (uid: string, on: boolean) =>
    setSetup((s) => ({
      ...s,
      bms: s.bms.map((b) => {
        if (b.uid !== uid) return b
        const assets = { ...b.assets }
        if (on) assets[ORIGINAL_PROFILE_ID] = 1
        else delete assets[ORIGINAL_PROFILE_ID]
        return { ...b, assets }
      }),
    }))
  const setAsset = (uid: string, itemId: string, qty: number) =>
    setSetup((s) => ({
      ...s,
      bms: s.bms.map((b) => {
        if (b.uid !== uid) return b
        const assets = { ...b.assets }
        if (qty <= 0) delete assets[itemId]
        else assets[itemId] = qty
        return { ...b, assets }
      }),
    }))
  const addAsset = (uid: string, itemId: string) =>
    setSetup((s) => ({ ...s, bms: s.bms.map((b) => (b.uid === uid ? { ...b, assets: { ...b.assets, [itemId]: (b.assets[itemId] ?? 0) + 1 } } : b)) }))
  const setExtra = (itemId: string, qty: number) =>
    setSetup((s) => {
      const extras = { ...s.extras }
      if (qty <= 0) delete extras[itemId]
      else extras[itemId] = qty
      return { ...s, extras }
    })

  const handleAddToCart = () => {
    if (!canCheckout) return
    for (const line of flattenToCartLines(setup)) {
      // addItem merges by name-derived id, so N calls set quantity N and merge
      // with any matching à-la-carte line already in the cart.
      for (let i = 0; i < line.qty; i++) addItem({ name: line.catalogName, price: line.unitPrice })
    }
    onOpenChange(false)
    reset()
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => { if (!o) reset(); onOpenChange(o) }}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            // Desktop: fixed frame — header + diagram + footer stay put, only the
            // left product column scrolls (overflow-hidden here, scroll on the column).
            // Mobile: the whole panel scrolls normally.
            "site fixed top-1/2 left-1/2 z-[121] flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[1520px] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 overflow-y-auto rounded-[20px] lg:overflow-hidden",
            "bg-background border border-white/12 p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.04] outline-none max-sm:p-5",
            "duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          )}
        >
          <DialogPrimitive.Close
            aria-label="Close"
            className="absolute top-5 right-5 flex size-8 cursor-pointer items-center justify-center rounded-[10px] text-[var(--alpha-100)] transition-colors duration-150 hover:bg-white/10 hover:text-foreground"
          >
            <XIcon className="size-4" />
          </DialogPrimitive.Close>

          {/* Header (fixed) */}
          <div className="flex shrink-0 flex-col gap-2 pr-8">
            <DialogPrimitive.Title className={cn(siteText.displayH4, "text-foreground")}>
              Build your own setup
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className={cn(siteText.bodyM, "text-[var(--alpha-100)]")}>
              Start from a template, add Business Managers, and assign profiles &amp; pages to each one. The diagram updates live.
            </DialogPrimitive.Description>
          </div>

          {/* Two columns: product selection left (scrolls), big live diagram right (fixed) */}
          <div className="grid gap-6 lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(0,420px)_1fr]">
            {/* ── LEFT: product selection — the only scrolling area on desktop ── */}
            <div className="flex min-w-0 flex-col gap-6 lg:min-h-0 lg:overflow-y-auto lg:pr-2">

          {/* BM cards */}
          <div className="flex flex-col gap-3">
            <div className={cn(siteText.overline, "text-[var(--alpha-100)]")}>Business Managers</div>
            {setup.bms.map((bm, idx) => {
              const bmItem = getItem(bm.bmId)
              const profileChips = itemsByCategory("profile").filter((i) => !i.builderHidden && (bm.assets[i.id] ?? 0) > 0)
              const pageChips = itemsByCategory("page").filter((i) => (bm.assets[i.id] ?? 0) > 0)
              const hasOriginal = (bm.assets[ORIGINAL_PROFILE_ID] ?? 0) > 0
              return (
                <div key={bm.uid} className="flex flex-col gap-3 rounded-[14px] border border-[#ffffff1a] p-4">
                  {/* header: #index + tier + (bank toggle, BM5/BM10 only) + remove */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={cn(siteText.labelS, "flex size-6 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-foreground")}>
                      {idx + 1}
                    </span>
                    <MiniDropdown
                      trigger={
                        <span className="flex items-center gap-1.5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={bmItem?.iconSrc ?? "/assets/BM.webp"} alt="" className="size-5 object-contain" />
                          {bmItem?.label ?? "BM"}
                        </span>
                      }
                      options={bmOptions}
                      onSelect={(v) => setBmTier(bm.uid, v)}
                    />
                    {/* Role: every BM can scale; only BM5/BM10 can be the pixel bank */}
                    {bmItem?.bankEligible ? (
                      <div className="flex items-center gap-0.5 rounded-full border border-[#ffffff1a] p-0.5">
                        <RolePill active={!bm.isBank} label="Scaling" onClick={() => setBank(bm.uid, false)} />
                        <RolePill active={bm.isBank} label="Pixel bank" onClick={() => setBank(bm.uid, true)} />
                      </div>
                    ) : (
                      <span className={cn(siteText.labelS, "rounded-full border border-[#ffffff1a] px-3 py-1.5 text-[var(--alpha-100)]")}>
                        Scaling
                      </span>
                    )}
                    <button
                      type="button"
                      aria-label="Remove Business Manager"
                      onClick={() => removeBm(bm.uid)}
                      className="ml-auto flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-[8px] text-[var(--alpha-100)] transition-colors hover:bg-white/10 hover:text-foreground"
                    >
                      <Trash2Icon className="size-4" />
                    </button>
                  </div>

                  {/* profiles */}
                  <div className="flex flex-col gap-2">
                    <span className={cn(siteText.bodyXs, "text-[var(--alpha-100)]")}>Profiles</span>
                    <div className="flex flex-wrap items-center gap-2">
                      {profileChips.map((i) => (
                        <AssetPill key={i.id} item={i} qty={bm.assets[i.id] ?? 0} onChange={(n) => setAsset(bm.uid, i.id, n)} />
                      ))}
                      <MiniDropdown trigger="+ Add profile" options={profileOptions} onSelect={(v) => addAsset(bm.uid, v)} />
                    </div>
                  </div>

                  {/* pages */}
                  <div className="flex flex-col gap-2">
                    <span className={cn(siteText.bodyXs, "text-[var(--alpha-100)]")}>Pages</span>
                    <div className="flex flex-wrap items-center gap-2">
                      {pageChips.map((i) => (
                        <AssetPill key={i.id} item={i} qty={bm.assets[i.id] ?? 0} onChange={(n) => setAsset(bm.uid, i.id, n)} />
                      ))}
                      <MiniDropdown trigger="+ Add page" options={pageOptions} onSelect={(v) => addAsset(bm.uid, v)} />
                    </div>
                  </div>

                  {/* Agency ad accounts — scaling BMs only */}
                  {!bm.isBank && (
                    <div className="flex flex-col gap-2">
                      <span className={cn(siteText.bodyXs, "text-[var(--alpha-100)]")}>Agency ad accounts</span>
                      <div className="flex flex-wrap items-center gap-2">
                        {(bm.assets[AD_ACCOUNT_ID] ?? 0) > 0 && adAccountItem && (
                          <AssetPill item={adAccountItem} qty={bm.assets[AD_ACCOUNT_ID] ?? 0} onChange={(n) => setAsset(bm.uid, AD_ACCOUNT_ID, n)} />
                        )}
                        <button
                          type="button"
                          onClick={() => addAsset(bm.uid, AD_ACCOUNT_ID)}
                          className={cn(siteText.labelS, "flex cursor-pointer items-center gap-1.5 rounded-[10px] border border-[#ffffff1a] bg-[var(--alpha-800)] px-2.5 py-1.5 text-foreground transition-colors hover:border-[var(--alpha-400)]")}
                        >
                          + Add ad account
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Original profile add-on — BM5/BM10 only */}
                  {bmItem?.bankEligible && (
                    <button
                      type="button"
                      onClick={() => setOriginalProfile(bm.uid, !hasOriginal)}
                      className={cn(
                        "flex cursor-pointer items-center gap-2.5 rounded-[10px] border p-2.5 text-left transition-colors",
                        hasOriginal ? "border-[var(--alpha-300)] bg-[var(--alpha-800)]" : "border-[#ffffff1a] hover:border-[var(--alpha-400)]",
                      )}
                    >
                      <span className={cn("flex size-5 shrink-0 items-center justify-center rounded-[6px] border transition-colors", hasOriginal ? "border-foreground bg-foreground text-background" : "border-[var(--alpha-400)]")}>
                        {hasOriginal && (
                          <svg viewBox="0 0 20 20" className="size-3.5" fill="none" aria-hidden="true">
                            <path d="M6 10.5 8.5 13l5.5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <span className="flex flex-1 flex-col">
                        <span className={cn(siteText.labelS, "text-foreground")}>Add original profile</span>
                        <span className={cn(siteText.bodyXs, "text-[var(--alpha-100)]")}>The profile that created the BM · +$50</span>
                      </span>
                    </button>
                  )}
                </div>
              )
            })}
            <button
              type="button"
              onClick={addBm}
              className={cn(
                siteText.labelS,
                "flex cursor-pointer items-center justify-center gap-1.5 rounded-[12px] border border-dashed border-[#ffffff1a] py-2.5 text-[var(--alpha-100)] transition-colors hover:border-[var(--alpha-400)] hover:text-foreground",
              )}
            >
              <PlusIcon className="size-4" /> Add Business Manager
            </button>
          </div>

          {/* Extras */}
          <div className="flex flex-col gap-2">
            <div className={cn(siteText.overline, "text-[var(--alpha-100)]")}>Extras (optional)</div>
            {extraItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 rounded-[12px] border border-[#ffffff1a] px-3 py-2">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-[8px] bg-white/[0.05]">
                  {item.verifiedBadge ? (
                    <VerifiedBadge className="size-6 drop-shadow-[0_1px_2px_rgba(0,149,246,0.35)]" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.iconSrc} alt="" className="size-6 object-contain" loading="lazy" />
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className={cn(siteText.labelS, "truncate text-foreground")}>{item.label}</span>
                  <span className={cn(siteText.bodyXs, "text-[var(--alpha-100)]")}>${item.unitPrice}</span>
                </div>
                <AssetPill item={item} qty={setup.extras[item.id] ?? 0} onChange={(n) => setExtra(item.id, n)} />
              </div>
            ))}
          </div>

            </div>
            {/* ── RIGHT: big live diagram — fixed frame, scrolls within itself only ── */}
            <div className="flex min-w-0 flex-col gap-3 lg:min-h-0 lg:overflow-y-auto">
          {/* Live diagram */}
          <div className="flex flex-col gap-3">
            <div className={cn(siteText.overline, "text-[var(--alpha-100)]")}>Your setup, connected</div>
            {setup.bms.length > 0 ? (
              <SetupTopologyDiagram topology={topology} />
            ) : (
              <div className="flex min-h-40 items-center justify-center rounded-[14px] border border-dashed border-[#ffffff1a] p-6 text-center">
                <span className={cn(siteText.bodyS, "text-[var(--alpha-100)]")}>
                  Add a Business Manager to see how your setup connects.
                </span>
              </div>
            )}
            {warnings.length > 0 && (
              <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
                {warnings.map((w, i) => (
                  <li key={i} className={cn(siteText.bodyXs, "flex items-start gap-2 text-[var(--alpha-100)]")}>
                    <span aria-hidden="true" className="mt-1.5 size-1 shrink-0 rounded-full bg-[var(--alpha-300)]" />
                    {w}
                  </li>
                ))}
              </ul>
            )}
          </div>

            </div>
          </div>{/* end two-column grid */}

          {/* Footer (fixed) */}
          <div className="flex shrink-0 items-center justify-between gap-4 border-t border-[#ffffff1a] pt-5 max-sm:flex-col max-sm:items-stretch">
            <div className="flex flex-col">
              <span className={cn(siteText.bodyXs, "text-[var(--alpha-100)]")}>
                Setup total{itemCount > 0 ? ` · ${itemCount} item${itemCount > 1 ? "s" : ""}` : ""}
              </span>
              <span className={cn(siteText.displayH5, "text-foreground")}>${total}</span>
            </div>
            <CtaButton
              variant="hero"
              onClick={handleAddToCart}
              className={cn("justify-center max-sm:w-full", !canCheckout && "pointer-events-none opacity-50")}
            >
              {canCheckout ? `Add to cart, $${total}` : "Add a Business Manager"}
            </CtaButton>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
