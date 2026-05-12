// Foreplay Temp Mail Viewer — Section 2 (white block).
// Conventions: docs/foreplay/design-guideline.md → "Pricing Comparison Table" spec.
//   - Cards: bg-white + border solid-50 + rounded-[16px] (matches .comparison-grid)
//   - Card header strip: bg-solid-25 + border-b solid-50 (matches .comparison-category-head)
//   - Buttons: .button-light.button-primary (Load) + .button-light.button-secondary (Random/Copy)
//   - Tooltip: Radix Portal — bg #343642, rounded-[12px], font-sans antialiased (outside .foreplay scope)

"use client"

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"

interface ForeplayTempmailViewerProps {
  placeholderEmail: string
  loadLabel: string
  loadTooltip?: string
  randomLabel: string
  randomTooltip?: string
  copyLabel: string
  copyTooltip?: string
  mailboxLabel: string
  clearAllLabel: string
  clearAllTooltip?: string
  emptyMailbox: string
  emptyContent: string
  className?: string
}

export function ForeplayTempmailViewer({
  placeholderEmail,
  loadLabel,
  loadTooltip,
  randomLabel,
  randomTooltip,
  copyLabel,
  copyTooltip,
  mailboxLabel,
  clearAllLabel,
  clearAllTooltip,
  emptyMailbox,
  emptyContent,
  className,
}: ForeplayTempmailViewerProps) {
  return (
    <div className={cn("px-10 py-[108px] max-md:px-6 max-md:py-24 max-sm:px-4 max-sm:py-20", className)}>
      {/* Outer rhythm: gap-10 (40px) between major sub-blocks — matches .comparison spacing */}
      <TooltipPrimitive.Provider delayDuration={200}>
        <div className="mx-auto flex max-w-[1136px] flex-col gap-10">
          {/* Input row — naked layout, no wrapper card. gap-3 between grouped controls. */}
          <div className="flex items-center gap-3 max-md:flex-col max-md:items-stretch">
            <input
              defaultValue={placeholderEmail}
              readOnly
              aria-label="Disposable email address"
              className={cn(
                fpText.bodyM,
                "flex-1 rounded-[10px] border border-[var(--fp-solid-50)] bg-white px-4 py-3 font-mono text-[var(--fp-solid-700)] outline-none",
                "focus:border-[var(--fp-solid-400)]",
              )}
            />
            <Tooltip text={loadTooltip}>
              <ButtonPrimary label={loadLabel} ariaLabel={loadTooltip ?? loadLabel} />
            </Tooltip>
            <Tooltip text={randomTooltip}>
              <ButtonOutline label={randomLabel} ariaLabel={randomTooltip ?? randomLabel} />
            </Tooltip>
            <Tooltip text={copyTooltip}>
              <ButtonOutline label={copyLabel} ariaLabel={copyTooltip ?? copyLabel} />
            </Tooltip>
          </div>

          {/* Body — 4/8 grid; MailBox aside + Content section. */}
          <div className="grid grid-cols-12 gap-4 max-md:grid-cols-1">
            <aside
              className={cn(
                "col-span-4 overflow-hidden rounded-[16px] border border-[var(--fp-solid-50)] bg-white",
                "max-md:col-span-1",
              )}
            >
              <div className="flex items-center justify-between border-b border-[var(--fp-solid-50)] bg-[var(--fp-solid-25)] p-4">
                <span className={cn(fpText.headingM, "text-[var(--fp-solid-700)]")}>{mailboxLabel}</span>
                <Tooltip text={clearAllTooltip}>
                  <ButtonDanger label={clearAllLabel} ariaLabel={clearAllTooltip ?? clearAllLabel} />
                </Tooltip>
              </div>
              <div className={cn(fpText.bodyS, "p-4 text-[var(--fp-solid-400)]")}>{emptyMailbox}</div>
            </aside>

            <section
              className={cn(
                fpText.bodyS,
                "col-span-8 flex items-start rounded-[16px] border border-[var(--fp-solid-50)] bg-white p-4 text-[var(--fp-solid-400)]",
                "max-md:col-span-1 max-md:min-h-[140px]",
              )}
            >
              {emptyContent}
            </section>
          </div>
        </div>
      </TooltipPrimitive.Provider>
    </div>
  )
}

// Tooltip wrap — exact .comparison-tooltip-body spec from foreplay-source.css:
//   bg solid-500 (#343642), color solid-0 (#fff), rounded-[12px], p-3 (12px)
//   min-width 240px, max-width 280px, flex-col items-center gap-1 (4px)
//   transform-origin 50% 100%, transition all .6s cubic-bezier(.19,1,.22,1)
//   hover state: scale(0.96) translateY(8px) opacity 0 → scale(1) translateY(0) opacity 1
//   sideOffset 8px matches .comparison-tooltip-body-container { padding-bottom: 8px }
//   text-body-s: 0.875rem / 1.25rem / 400 / -0.00643em, Inter
// Radix Portal renders OUTSIDE .foreplay scope → raw hex + explicit font-sans antialiased.
function Tooltip({ text, children }: { text?: string; children: ReactNode }) {
  if (!text) return <>{children}</>
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side="top"
          sideOffset={8}
          className={cn(
            // Layout — flex-col items-center gap-1, min/max width, padding, radius
            "z-[100] flex min-w-[240px] max-w-[280px] flex-col items-center gap-1 rounded-[12px] p-3",
            // Color — raw hex (outside .foreplay scope)
            "bg-[#343642] text-white",
            // Typography — text-body-s (Inter, 0.875rem / 20px / 400 / -0.00643em), explicit font scope
            "text-center font-sans text-[0.875rem] font-normal leading-5 tracking-[-0.00643em] antialiased [font-optical-sizing:none]",
          )}
        >
          {text}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}

// Buttons are forwardRef so Radix Tooltip's asChild Trigger can attach hover listeners.
type ButtonExtras = { label: string; ariaLabel?: string }
type ButtonProps = ButtonExtras & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">

// .button-light.button-primary — bg-background, hover bg-solid-600, active bg-solid-400
const ButtonPrimary = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, ariaLabel, className, ...rest }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      {...rest}
      className={cn(
        "relative z-[5] flex cursor-pointer items-center rounded-[10px] p-2 no-underline",
        "bg-background text-foreground transition-all duration-150",
        "hover:bg-[var(--fp-solid-600)] active:bg-[var(--fp-solid-400)]",
        className,
      )}
    >
      <span className={cn(fpText.headingM, "relative z-[2] px-1.5")}>{label}</span>
    </button>
  ),
)
ButtonPrimary.displayName = "ButtonPrimary"

// .button-light.button-secondary — bg-solid-25, hover bg-solid-50, active bg-solid-100
const ButtonOutline = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, ariaLabel, className, ...rest }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      {...rest}
      className={cn(
        "relative z-[5] flex cursor-pointer items-center rounded-[10px] p-2 no-underline",
        "bg-[var(--fp-solid-25)] text-[var(--fp-solid-900)] transition-all duration-150",
        "hover:bg-[var(--fp-solid-50)] active:bg-[var(--fp-solid-100)]",
        className,
      )}
    >
      <span className={cn(fpText.headingM, "relative z-[2] px-1.5")}>{label}</span>
    </button>
  ),
)
ButtonOutline.displayName = "ButtonOutline"

// Destructive — sits on solid-25 card. White bg + inset red-200 ring.
const ButtonDanger = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, ariaLabel, className, ...rest }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      {...rest}
      className={cn(
        "relative z-[5] flex cursor-pointer items-center rounded-[10px] p-2 no-underline",
        "bg-white text-red-500 transition-all duration-150",
        "shadow-[inset_0_0_0_1px_rgb(254_202_202)] hover:bg-red-50",
        className,
      )}
    >
      <span className={cn(fpText.labelS, "relative z-[2] px-1.5")}>{label}</span>
    </button>
  ),
)
ButtonDanger.displayName = "ButtonDanger"
