// Draggable bookmarklet anchor — the green "drag me to your bookmark bar"
// button on /tools/bookmark.
//
// Two constraints shape this component:
//
//  1. React 19 BLOCKS `javascript:` URLs passed to `href` (it throws instead of
//     rendering). Browsers, however, need a real `javascript:` href on the
//     anchor for a drag-to-bookmark-bar drop to become a working bookmarklet.
//     Fix: render the anchor href-less and set the attribute imperatively in an
//     effect, which bypasses React's URL sanitiser. `dangerouslySetInnerHTML`
//     would also work but loses the styled children.
//
//  2. CLICKING must never navigate. A `javascript:` href activated on our own
//     page would execute the payload against goads.* instead of Facebook. So
//     the click is swallowed and turned into an inline "drag me instead" hint.
//
// Paint reuses CTA_VARIANT_STYLES["light-primary"] so it stays identical to
// every other primary button inside a white block.

"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"
import { CTA_VARIANT_STYLES } from "@/components/atoms/cta-button"

interface BookmarkletDragAnchorProps {
  /** Full `javascript:(function(){...})()` payload */
  payload: string
  /** Bookmark title the browser stores when dropped on the bar */
  title: string
  children: ReactNode
  icon?: ReactNode
  className?: string
}

export function BookmarkletDragAnchor({
  payload,
  title,
  children,
  icon,
  className,
}: BookmarkletDragAnchorProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [hintVisible, setHintVisible] = useState(false)

  // Set the javascript: href outside of React's control (see note 1 above).
  useEffect(() => {
    ref.current?.setAttribute("href", payload)
  }, [payload])

  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <a
        ref={ref}
        draggable
        title={title}
        // Belt-and-braces: even if a browser ignores preventDefault, an empty
        // target keeps the payload out of this document.
        onClick={(e) => {
          e.preventDefault()
          setHintVisible(true)
          window.setTimeout(() => setHintVisible(false), 2600)
        }}
        className={cn(
          "relative z-[5] flex cursor-grab items-center justify-center rounded-[10px] p-2 no-underline active:cursor-grabbing",
          CTA_VARIANT_STYLES["light-primary"],
          "focus-visible:shadow-[0_0_0_2px_white,0_0_0_3px_var(--solid-900)] focus-visible:outline-none",
          className,
        )}
      >
        {icon && (
          <span className="relative z-[2] -mr-1 flex size-6 items-center justify-center opacity-[0.68]">
            {icon}
          </span>
        )}
        <span className="relative z-[2] truncate px-1.5 font-sans text-base font-[550] leading-6 tracking-[-0.01125em]">
          {children}
        </span>
      </a>

      {/* Inline nudge instead of a toast — stays inside the card, no extra deps */}
      {hintVisible && (
        <span
          role="status"
          className="font-sans text-[0.75rem] leading-4 font-normal text-[var(--solid-400)]"
        >
          Drag this button onto your Bookmark Bar — clicking it here does nothing.
        </span>
      )}
    </div>
  )
}
