// Foreplay light ghost action — text + icon, transparent bg, used for secondary/bulk actions
// inside a white block (Copy all, Export, Clear, etc.).
// Hover: bg solid-25, text solid-900.
// Spec: see docs/foreplay/tool-design-language.md → Composition primitives.

import type { ButtonHTMLAttributes, ReactNode } from "react"

import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"

interface LightGhostActionProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon: ReactNode    // size-3.5 typically
  label: string
  /** Icon-only square button — `label` stays as the accessible name (sr-only +
   *  aria-label). Used where horizontal room is tight, e.g. bookmarklet cards. */
  hideLabel?: boolean
}

export function LightGhostAction({
  icon,
  label,
  hideLabel = false,
  className,
  type = "button",
  ...rest
}: LightGhostActionProps) {
  return (
    <button
      type={type}
      aria-label={hideLabel ? label : undefined}
      {...rest}
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-[10px] text-[var(--solid-500)] no-underline",
        hideLabel ? "justify-center px-2.5 py-2.5" : "px-3 py-2",
        "transition-colors duration-150",
        "hover:bg-[var(--solid-25)] hover:text-[var(--solid-900)]",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
    >
      {icon}
      <span className={cn(siteText.labelS, hideLabel && "sr-only")}>{label}</span>
    </button>
  )
}
