// Foreplay nav link — 100% nested DOM clone of .navlink + .text-navlink
//
// Source DOM:
//   <a class="navlink w-inline-block" href="...">
//     <div class="text-navlink">Label</div>
//   </a>
//
// .navlink source CSS:
//   color:#ffffff85; border-radius:10px; padding:6px 10px; text-decoration:none;
//   transition:all .5s cubic-bezier(.19,1,.22,1);
//   justify-content:flex-start; align-items:center; display:flex;
//   :hover { color: var(--_lens---neutral-50) }
//   :focus { box-shadow: 0 0 0 3px var(--_lens---neutral-700) }
//
// .text-navlink source CSS:
//   font-size: .9375rem; line-height: 1.25rem (15px/20px)
//
// Reuse: Header nav links (Pricing, Book a Demo, Sign in)

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
    // a.navlink.w-inline-block — layout + color + transition
    <Link
      href={href}
      className={cn(
        "flex items-center justify-start rounded-[10px] px-2.5 py-1.5 no-underline",
        "text-foreground/50 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
        "hover:text-muted-foreground",
        "focus:shadow-[0_0_0_3px] focus:shadow-secondary focus:outline-none",
        className,
      )}
    >
      {/* div.text-navlink — typography only (15px/20px) */}
      <div className="font-sans text-[0.9375rem] leading-[1.25rem]">
        {children}
      </div>
    </Link>
  )
}
