// Channel pill — sibling of DatePill, used in the floating contact widget.
// Same visual rhythm as DatePill (border 1.5px, rounded-lg, p-3, flex-1, text-center)
// but renders an icon on top and a label below instead of dow/dom.
//
// CSS spec preserved from .date-pill:
//   border 1.5px solid-200, rounded-lg (8px), padding 12px, flex-1, text-center
//   hover: border solid-900 + bg solid-25, transition .2s

import Link from "next/link"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ChannelPillProps {
  icon: ReactNode
  label: string
  href: string
  /** External links open in a new tab */
  external?: boolean
  className?: string
}

export function ChannelPill({ icon, label, href, external = true, className }: ChannelPillProps) {
  const sharedClass = cn(
    "flex flex-1 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg p-3 text-center no-underline",
    "border-[1.5px] border-[var(--solid-200)] bg-white text-[var(--solid-900)]",
    "transition-all duration-200",
    "hover:border-[var(--solid-900)] hover:bg-[var(--solid-25)]",
    className,
  )

  const body = (
    <>
      <span className="flex size-5 items-center justify-center text-[var(--solid-900)]">{icon}</span>
      <span className="font-sans text-[0.8125rem] font-medium leading-[1.1] tracking-[-0.005em]">{label}</span>
    </>
  )

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={sharedClass}>
      {body}
    </a>
  ) : (
    <Link href={href} className={sharedClass}>
      {body}
    </Link>
  )
}
