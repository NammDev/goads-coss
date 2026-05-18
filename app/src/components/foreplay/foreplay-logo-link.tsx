"use client"

// Logo link. On other routes it navigates to "/" normally. When ALREADY on
// "/", a plain <Link href="/"> is a no-op (SPA) — so scroll to top + refresh
// the route data, giving the expected "reload" feel.

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import type { ReactNode } from "react"

interface ForeplayLogoLinkProps {
  children: ReactNode
  className?: string
  "aria-label"?: string
}

export function ForeplayLogoLink({ children, className, ...rest }: ForeplayLogoLinkProps) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Link
      href="/"
      className={className}
      {...rest}
      onClick={(e) => {
        if (pathname === "/") {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: "smooth" })
          router.refresh()
        }
      }}
    >
      {children}
    </Link>
  )
}
