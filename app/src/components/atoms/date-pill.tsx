// Foreplay date pill — a.date-pill (with .is-today modifier)
// CSS: border 1.5px solid-200, rounded-lg (8px), padding 12px, flex-1, text-center.
// .is-today: border-color solid-900.
// Hover: border solid-900 + bg solid-25. Smooth .2s transition.
// .dow / .dom inner text: Inter 1rem/1.5rem font-medium, color solid-900.

import Link from "next/link"
import { cn } from "@/lib/utils"

interface DatePillProps {
  /** Day of week label e.g. "Wed" */
  dow: string
  /** Day of month label e.g. "20" */
  dom: string
  isToday?: boolean
  /** Render as a real link to a booking destination */
  href?: string
  onClick?: () => void
  className?: string
}

export function DatePill({
  dow,
  dom,
  isToday = false,
  href,
  onClick,
  className,
}: DatePillProps) {
  const sharedClass = cn(
    "flex flex-1 cursor-pointer flex-col items-center gap-0 rounded-lg p-3 text-center no-underline",
    "border-[1.5px] bg-white text-[var(--solid-900)]",
    "transition-all duration-200",
    "hover:border-[var(--solid-900)] hover:bg-[var(--solid-25)]",
    isToday ? "border-[var(--solid-900)]" : "border-[var(--solid-200)]",
    className,
  )

  // .dow / .dom — Inter 1rem/1.5rem 500, tracking -0.01125em
  const text = (
    <>
      <span className="font-sans text-base font-medium leading-6 tracking-[-0.01125em]">{dow}</span>
      <span className="font-sans text-base font-medium leading-6 tracking-[-0.01125em]">{dom}</span>
    </>
  )

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={sharedClass}>
        {text}
      </Link>
    )
  }
  return (
    <button type="button" onClick={onClick} className={sharedClass}>
      {text}
    </button>
  )
}
