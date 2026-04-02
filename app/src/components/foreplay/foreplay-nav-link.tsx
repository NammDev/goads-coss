// Foreplay nav link — pixel-perfect from .navlink
// Spec: color #ffffff85, rounded-[10px], py-1.5 px-2.5 (6px 10px)
// .navlink:hover: color neutral-50
// .navlink:focus: box-shadow 3px neutral-700
// .text-navlink: 0.9375rem/1.25rem (15px/20px)
// transition: all .5s cubic-bezier(.19,1,.22,1)
// Reuse: Header nav links, "Sign in", footer links

import type { ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ForeplayNavLinkProps {
  href: string
  children: ReactNode
  className?: string
}

export function ForeplayNavLink({
  href,
  children,
  className,
}: ForeplayNavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        // .navlink layout
        "flex items-center rounded-[10px] px-2.5 py-1.5 no-underline",
        // .text-navlink typography
        "font-sans text-[0.9375rem] leading-[1.25rem]",
        // .navlink color + transition
        "text-foreground/50 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
        // hover + focus
        "hover:text-muted-foreground",
        "focus:shadow-[0_0_0_3px] focus:shadow-secondary focus:outline-none",
        className,
      )}
    >
      {children}
    </Link>
  )
}
