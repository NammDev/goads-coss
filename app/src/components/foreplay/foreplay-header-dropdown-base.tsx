// Foreplay header — 100% nested DOM clone of .nav-dropdown + children
//
// Source DOM:
//   <div class="nav-dropdown w-dropdown">                       ← padding:0 position:static
//     <div class="nav-dropdown-toggle w-dropdown-toggle">       ← button (flex gap-1 rounded-10 py-1.5 pr-1.5 pl-2.5)
//       <div class="text-navlink">Label</div>                   ← typography wrapper
//       <div class="icon-20">                                   ← 20x20 chevron
//         <div class="svg w-embed"><svg>chevron</svg></div>
//       </div>
//     </div>
//     <nav class="nav-dropdown-menu w-dropdown-list">           ← absolute top:100% left:0 right:0 min-w-full
//       <div class="nav-dropdown-menu-inner">                   ← bg border rounded-28 w-full
//         (content passed via children prop)
//       </div>
//     </nav>
//   </div>
//
// Source CSS merged:
//   .nav-dropdown { padding:0; position:static }
//   .nav-dropdown-toggle {
//     display:flex; gap:4px; color:#ffffff85; border-radius:10px;
//     padding: 6px 6px 6px 10px; align-items:center; justify-content:flex-start;
//     transition: all .5s cubic-bezier(.19,1,.22,1);
//     :hover { color: var(--_lens---neutral-50) }
//     .w--open { color: var(--_lens---neutral-0) }
//   }
//   .text-navlink { font-size:.9375rem; line-height:1.25rem }
//   .icon-20 { width:20px; height:20px }
//   .nav-dropdown-menu {
//     position:absolute; top:100%; left:0%; right:0%; min-width:100%;
//     margin-top:-5px; background-color:#0000; display:block;
//     transition: all .5s cubic-bezier(.19,1,.22,1);
//     closed: opacity:0; pointer-events:none; transform: translateY(-8px) scale(.96)
//     open  : z-index:5; opacity:1; pointer-events:auto; transform: none
//   }
//
// CRITICAL — positioning context escape:
//   .nav-dropdown is `position: static` (Foreplay override of Webflow's `.w-dropdown`
//   default `position: relative`). The absolute .nav-dropdown-menu therefore anchors
//   to `.nav-stack` (nearest positioned ancestor), NOT this wrapper. This makes the
//   dropdown appear below the entire header row and span full nav-stack width.

"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ForeplayHeaderDropdownBaseProps {
  label: string
  children: ReactNode
}

export function ForeplayHeaderDropdownBase({ label, children }: ForeplayHeaderDropdownBaseProps) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Click-to-toggle (matches foreplay.co behavior)
  const toggleMenu = () => setOpen((prev) => !prev)

  // ESC key + outside click
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    const onClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("mousedown", onClick)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("mousedown", onClick)
    }
  }, [open])

  return (
    // div.nav-dropdown.w-dropdown — padding:0, position:static (anchor escape)
    <div ref={wrapperRef} className="static p-0">
      {/* div.nav-dropdown-toggle.w-dropdown-toggle — rendered as button for a11y.
          flex gap-1 items-center justify-start rounded-10 py-1.5 pr-1.5 pl-2.5 color:alpha-50 transition */}
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={toggleMenu}
        className={cn(
          "flex items-center justify-start gap-1 rounded-[10px] py-1.5 pr-1.5 pl-2.5",
          "text-foreground/50 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
          "hover:text-foreground focus-visible:outline-none focus-visible:shadow-[0_0_0_3px] focus-visible:shadow-secondary",
          open && "text-foreground",
        )}
      >
        {/* div.text-navlink — typography only (15px/20px) */}
        <div className="font-sans text-[0.9375rem] leading-[1.25rem]">{label}</div>
        {/* div.icon-20 — 20x20 chevron box (rotates when open) */}
        <div className={cn("flex size-5 items-center justify-center transition-transform duration-300", open && "rotate-180")}>
          {/* div.svg.w-embed */}
          <svg viewBox="0 0 20 20" width="20" height="20" fill="none">
            <path d="M7 8.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      {/* nav.nav-dropdown-menu.w-dropdown-list — absolute, top:100% left:0 right:0 min-w-full bg-transparent */}
      <nav
        className={cn(
          "absolute top-full right-0 left-0 mt-[-5px] block min-w-full bg-transparent",
          "transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
          open
            ? "pointer-events-auto z-[5] opacity-100 transform-none"
            : "pointer-events-none -translate-y-2 scale-[0.96] opacity-0",
        )}
        aria-hidden={!open}
      >
        {children}
      </nav>
    </div>
  )
}
