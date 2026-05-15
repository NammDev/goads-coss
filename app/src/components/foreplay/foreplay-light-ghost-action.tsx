// Foreplay light ghost action — text + icon, transparent bg, used for secondary/bulk actions
// inside a white block (Copy all, Export, Clear, etc.).
// Hover: bg solid-25, text solid-900.
// Spec: see docs/foreplay/tool-design-language.md → Composition primitives.

import type { ButtonHTMLAttributes, ReactNode } from "react"

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"

interface ForeplayLightGhostActionProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon: ReactNode    // size-3.5 typically
  label: string
}

export function ForeplayLightGhostAction({
  icon,
  label,
  className,
  type = "button",
  ...rest
}: ForeplayLightGhostActionProps) {
  return (
    <button
      type={type}
      {...rest}
      className={cn(
        "flex items-center gap-2 rounded-[10px] px-3 py-2 text-[var(--fp-solid-500)] no-underline",
        "transition-colors duration-150",
        "hover:bg-[var(--fp-solid-25)] hover:text-[var(--fp-solid-900)]",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
    >
      {icon}
      <span className={fpText.labelS}>{label}</span>
    </button>
  )
}
