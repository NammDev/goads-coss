// Foreplay docs article right-aside — "On this page" TOC + feedback buttons.
//
// Structure (verbatim from Foreplay spec):
//   <aside w-52 hidden sm:block flex-shrink-0 mt-[8px] custom-scrollbar-stronger>
//     <div fixed w-52 flex flex-col gap-6>
//       <div>                                                ← TOC block
//         <p flex items-center text-sm font-medium>icon + "On this page"</p>
//         <div mt-3 -ml-1 max-h-[calc(100dvh-120px)] overflow-auto>
//           <ul flex flex-col gap-1>
//             <a href="#id" ...>{title}</a>                  ← active gets accent color
//           </ul>
//         </div>
//       </div>
//       <div>                                                ← Feedback block
//         <p text-sm font-medium opacity-80>Was this helpful?</p>
//         <div inline-flex items-center gap-2 mt-3>
//           [😞 sad] [😐 neutral] [😊 happy] buttons
//         </div>
//       </div>
//     </div>
//   </aside>

"use client"

import { useCallback, useEffect, useState } from "react"

export type TocHeading = { id: string; title: string; depth: number }

interface DocsArticleAsideProps {
  headings: TocHeading[]
}

/** Scroll-trigger offset: a heading becomes "active" once its top edge
 *  passes this many px below the viewport top. 96 ≈ heading scroll-margin
 *  (48px from CSS) + a small lead so the highlight switches just before
 *  the heading reaches the top, matching Foreplay's feel. */
const SCROLL_TRIGGER_OFFSET = 96

export function DocsArticleAside({ headings }: DocsArticleAsideProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "")

  useEffect(() => {
    if (headings.length === 0) return

    // Cache live heading elements (skip any whose id failed to resolve —
    // protects against id mismatches between AST walk and React render).
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null)
    if (els.length === 0) return

    const updateActive = () => {
      // Pick the LAST heading whose top has crossed the trigger line.
      // This is the standard "topmost visible heading" pattern and is more
      // reliable than IntersectionObserver+rootMargin, which races on fast
      // scrolls and gives ambiguous results when multiple headings intersect.
      let current = els[0]
      for (const el of els) {
        if (el.getBoundingClientRect().top - SCROLL_TRIGGER_OFFSET <= 0) {
          current = el
        } else {
          break
        }
      }
      // Edge case: scrolled to absolute bottom — force-activate last heading
      // so users on long articles see the final section highlighted.
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 4
      setActiveId((nearBottom ? els[els.length - 1] : current).id)
    }

    updateActive()
    window.addEventListener("scroll", updateActive, { passive: true })
    window.addEventListener("resize", updateActive)
    return () => {
      window.removeEventListener("scroll", updateActive)
      window.removeEventListener("resize", updateActive)
    }
  }, [headings])

  // Smooth-scroll on TOC click. Native anchor jump works too (scroll-behavior:
  // smooth is set on <html>) but we also (a) update activeId immediately for
  // instant visual feedback and (b) call preventDefault so the URL hash update
  // doesn't fight the smooth scroll on Chromium.
  const handleClick = useCallback(
    (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      const target = document.getElementById(id)
      if (!target) return
      e.preventDefault()
      setActiveId(id)
      target.scrollIntoView({ behavior: "smooth", block: "start" })
      history.replaceState(null, "", `#${id}`)
    },
    [],
  )

  return (
    <aside className="custom-scrollbar-stronger relative mt-[8px] ml-0 hidden h-max w-52 flex-shrink-0 sm:block">
      <div className="fixed flex w-52 flex-col gap-6">
        {/* On this page — TOC */}
        {headings.length > 0 && (
          <div>
            <p className="flex items-center text-sm font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4 text-foreground/60"
              >
                <path d="M17 6.1H3" />
                <path d="M21 12.1H3" />
                <path d="M15.1 18H3" />
              </svg>
              On this page
            </p>
            <div className="custom-scrollbar mt-3 -ml-1 max-h-[calc(100dvh-120px)] overflow-auto">
              <ul className="!m-0 flex flex-col gap-1 !p-0">
                {headings.map((h) => {
                  const isActive = activeId === h.id
                  // Indent h3 by 1 step so users see hierarchy at a glance.
                  const indent = h.depth >= 3 ? "pl-4" : "pl-1"
                  return (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      onClick={handleClick(h.id)}
                      className={`block max-w-52 rounded pr-1 py-1 text-sm font-medium line-clamp-2 transition-colors duration-200 ${indent} ${
                        isActive
                          ? "text-foreground"
                          : "text-foreground/50 hover:text-foreground/80"
                      }`}
                    >
                      <span className="line-clamp-2">{h.title}</span>
                    </a>
                  )
                })}
              </ul>
            </div>
          </div>
        )}

        {/* Was this helpful? */}
        <div>
          <p className="flex items-center text-sm font-medium opacity-80">
            Was this helpful?
          </p>
          <div className="mt-3 inline-flex items-center gap-2">
            {/* Sad */}
            <button
              type="button"
              aria-label="Not helpful"
              className="flex h-full flex-1 items-center justify-center rounded-full border border-border/60 bg-border/50 px-1 py-1 text-foreground/60 shadow transition-colors duration-200 hover:border-rose-800/50 hover:bg-rose-900/30 hover:text-rose-300"
            >
              <div className="flex h-[22px] w-[22px] items-center justify-center">
                <svg
                  className="!m-0 h-6 w-6 !p-0"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="hsl(var(--secondary))"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 17C8.91212 15.7856 10.3643 15 12 15C13.6357 15 15.0879 15.7856 16 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.00897 9H8M16 9H15.991"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>

            {/* Neutral */}
            <button
              type="button"
              aria-label="Somewhat helpful"
              className="flex h-full flex-1 items-center justify-center rounded-full border border-border/60 bg-border/50 px-1 py-1 text-foreground/60 shadow transition-colors duration-200 hover:border-yellow-800/50 hover:bg-yellow-900/30 hover:text-yellow-300"
            >
              <div className="flex h-[22px] w-[22px] items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="hsl(var(--secondary))"
                  className="!m-0 h-6 w-6 !p-0"
                >
                  <path
                    d="M8.00897 9H8M16 9H15.991"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 16H15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>

            {/* Happy */}
            <button
              type="button"
              aria-label="Helpful"
              className="flex h-full flex-1 items-center justify-center rounded-full border border-border/60 bg-border/50 px-1 py-1 text-foreground/60 shadow transition-colors duration-200 hover:border-emerald-800/50 hover:bg-emerald-900/30 hover:text-emerald-300"
            >
              <div className="flex h-[22px] w-[22px] items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="!m-0 h-6 w-6 !p-0"
                  fill="hsl(var(--secondary))"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 15C8.91212 16.2144 10.3643 17 12 17C13.6357 17 15.0879 16.2144 16 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.00897 9H8M16 9H15.991"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
