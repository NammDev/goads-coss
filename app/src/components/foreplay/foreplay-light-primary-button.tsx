// Foreplay .button-light.button-primary — primary CTA inside a white block.
// Outer: z-5 p-2 rounded-[10px] flex relative, transition-all 0.15s
// Bg: background (#020308), hover solid-600, active solid-400
// Inner text: z-2 px-1.5 font-[550] text-heading-m
// Optional .button-icon-block.icon-right — z-2 opacity-0.68 -ml-1
// Spec: see docs/foreplay/tool-design-language.md → Composition primitives.

import type { ButtonHTMLAttributes, ReactNode } from "react"

import { cn } from "@/lib/utils"
import { fpText } from "@/components/foreplay/foreplay-typography"

interface ForeplayLightPrimaryButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode      // label
  icon?: ReactNode         // optional right-side icon (.button-icon-block.icon-right)
}

export function ForeplayLightPrimaryButton({
  children,
  icon,
  className,
  type = "button",
  ...rest
}: ForeplayLightPrimaryButtonProps) {
  return (
    <button
      type={type}
      {...rest}
      className={cn(
        "relative z-[5] flex items-center rounded-[10px] bg-background p-2 text-foreground no-underline",
        "transition-all duration-150",
        "hover:bg-[var(--fp-solid-600)] active:bg-[var(--fp-solid-400)]",
        "disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-background",
        className,
      )}
    >
      {/* .button-text-block */}
      <span className={cn(fpText.headingM, "relative z-[2] px-1.5")}>{children}</span>
      {icon && (
        /* .button-icon-block.icon-right */
        <span className="relative z-[2] -ml-1 flex opacity-[0.68]">{icon}</span>
      )}
    </button>
  )
}
