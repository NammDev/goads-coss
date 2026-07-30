// GOADS Bookmark — bookmarklet script library at /tools/bookmark.
// Spec: docs/foreplay/tool-design-language.md (white block, --solid-* tokens).
//
// Sections, top to bottom:
//   1. "How to Use" strip — 3 numbered steps + the Bookmark Bar shortcut tip
//   2. Detail banner — only when the URL carries ?script={slug}
//   3. Category chips — rendered only once there are 2+ categories in use, so a
//      single-category library doesn't ship a filter where every chip is a no-op
//   4. Card grid
//
// Deep links: ?script={slug} narrows the grid to one card so a copied share
// link opens focused on that script. The param is read through
// useSyncExternalStore instead of useSearchParams so the route stays
// statically rendered (useSearchParams would force the whole tool behind a
// Suspense boundary) while the server snapshot of `null` keeps the first client
// render byte-identical to the server HTML.

"use client"

import { useMemo, useState, useSyncExternalStore } from "react"
import { ArrowLeft, Info, Lightbulb, LayoutGrid } from "lucide-react"

import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"
import { LightGhostAction } from "@/components/atoms/light-ghost-action"
import { BookmarkCard } from "@/components/tools/bookmark-card"
import {
  BOOKMARKLETS,
  getBookmarkletBySlug,
  getUsedBookmarkletCategories,
  type BookmarkletCategory,
} from "@/data/bookmarklets"

const HOW_TO_STEPS = [
  { title: "Find & Drag", detail: "Drag the dark button onto your Bookmark Bar" },
  { title: "Navigate", detail: "Open the Facebook page where you want to use it" },
  { title: "Click & Run", detail: "Click the bookmarklet in your Bookmark Bar" },
]

type CategoryFilter = BookmarkletCategory | "all"

// --- ?script= URL param as the single source of truth ------------------------
// The URL alone decides grid-vs-detail; there is no mirrored local state to keep
// in sync. Two things can change it, so the store listens for both:
//   - browser back/forward       → native `popstate`
//   - opening/closing a card     → `pushState`, which fires NOTHING natively,
//                                  so `navigate()` dispatches NAV_EVENT itself
// pushState is used directly rather than Next's router because this only ever
// toggles a query param on the current route — no server data depends on it, and
// going through the router would need `useSearchParams`, which forces the whole
// tool behind a Suspense boundary and gives up static prerendering.
const NAV_EVENT = "goads:bookmark-nav"

const subscribeToUrl = (onChange: () => void) => {
  window.addEventListener("popstate", onChange)
  window.addEventListener(NAV_EVENT, onChange)
  return () => {
    window.removeEventListener("popstate", onChange)
    window.removeEventListener(NAV_EVENT, onChange)
  }
}
const readScriptParam = () => new URLSearchParams(window.location.search).get("script")
const noScriptParam = () => null

/** Push a same-route URL and tell the store to re-read it. */
function navigate(url: string) {
  window.history.pushState(null, "", url)
  window.dispatchEvent(new Event(NAV_EVENT))
}

const detailHref = (slug: string) => `/tools/bookmark?script=${encodeURIComponent(slug)}`

export function BookmarkTool() {
  const [category, setCategory] = useState<CategoryFilter>("all")

  const categories = getUsedBookmarkletCategories()

  const slugFromUrl = useSyncExternalStore(
    subscribeToUrl,
    readScriptParam,
    noScriptParam,
  )

  // Unknown slugs fall through to the full library rather than an empty state.
  const openedScript = slugFromUrl ? getBookmarkletBySlug(slugFromUrl) : undefined

  const closeDetail = () => navigate("/tools/bookmark")

  const visible = useMemo(() => {
    if (openedScript) return [openedScript]
    if (category === "all") return BOOKMARKLETS
    return BOOKMARKLETS.filter((s) => s.category === category)
  }, [category, openedScript])

  return (
    <>
      {/* 1 — How to Use */}
      <div className="flex flex-col gap-4 rounded-[16px] border border-[var(--solid-50)] bg-[var(--solid-25)] p-5 max-md:p-4">
        <div className="flex items-center gap-2">
          <Info className="size-4 text-[var(--solid-500)]" />
          <span className={cn(siteText.overline, "text-[var(--solid-500)]")}>How to Use</span>
        </div>

        <ol className="grid grid-cols-3 gap-4 max-md:grid-cols-1 max-md:gap-3">
          {HOW_TO_STEPS.map((step, i) => (
            <li key={step.title} className="flex items-start gap-3">
              <span
                className={cn(
                  siteText.labelS,
                  "flex size-6 shrink-0 items-center justify-center rounded-[8px] bg-[var(--solid-900)] text-white",
                )}
              >
                {i + 1}
              </span>
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className={cn(siteText.labelS, "text-[var(--solid-900)]")}>{step.title}</span>
                <span className={cn(siteText.bodyS, "text-[var(--solid-500)] [text-wrap:pretty]")}>
                  {step.detail}
                </span>
              </div>
            </li>
          ))}
        </ol>

        {/* Shortcut tip — icon stays pinned left while the sentence + key pills
            wrap beside it (a single wrapping row would drop the icon onto its
            own line at ~390px). */}
        <div className="flex items-start gap-2 rounded-[10px] border border-[var(--solid-100)] bg-white px-4 py-3 max-md:px-3">
          <Lightbulb className="mt-0.5 size-4 shrink-0 text-[var(--solid-700)]" />
          <p
            className={cn(
              siteText.bodyS,
              "flex flex-wrap items-center gap-x-1.5 gap-y-1.5 text-[var(--solid-700)]",
            )}
          >
            <span>
              <span className="font-semibold text-[var(--solid-900)]">Tip:</span> show the Bookmark Bar
              with
            </span>
            <Kbd>Ctrl</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>B</Kbd>
            <span className="text-[var(--solid-500)]">(Chrome / Edge) or</span>
            <Kbd>Cmd</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>B</Kbd>
            <span className="text-[var(--solid-500)]">(Mac)</span>
          </p>
        </div>
      </div>

      {/* 2 — Back to the full library. A plain, left-aligned button (no banner,
          no "Viewing …" copy) — the single card below already says which one. */}
      {openedScript && (
        <div>
          <LightGhostAction
            onClick={closeDetail}
            icon={<ArrowLeft className="size-3.5" />}
            label="All scripts"
            className="bg-white text-[var(--solid-700)] shadow-[inset_0_0_0_1px_var(--solid-100)]"
          />
        </div>
      )}

      {/* 3 — Category chips. Hidden in detail mode, and skipped entirely
          while the library has a single category (every chip would return the
          same grid). Re-appears on its own once a second category is in use. */}
      {!openedScript && categories.length > 1 && (
        <div className="flex flex-wrap gap-2">
          <CategoryChip
            label="All"
            icon={<LayoutGrid className="size-3.5" />}
            active={category === "all"}
            onClick={() => setCategory("all")}
          />
          {categories.map((c) => (
            <CategoryChip
              key={c.id}
              label={c.label}
              active={category === c.id}
              onClick={() => setCategory(c.id)}
            />
          ))}
        </div>
      )}

      {/* 4 — Grid. Cards link to their own detail view; the card already ON that
          view gets no link (it would navigate to the URL you are on). */}
      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1 max-md:gap-3 xl:grid-cols-3">
        {visible.map((script) => (
          <BookmarkCard
            key={script.slug}
            script={script}
            href={openedScript ? undefined : detailHref(script.slug)}
            onOpen={() => navigate(detailHref(script.slug))}
          />
        ))}
      </div>
    </>
  )
}

// Keyboard key pill — mono chip on white, sized to sit inline with bodyS text.
function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd
      className={cn(
        siteText.bodyXs,
        "rounded-[6px] bg-[var(--solid-25)] px-1.5 py-0.5 font-mono font-medium leading-4 text-[var(--solid-900)]",
        "shadow-[inset_0_0_0_1px_var(--solid-100)]",
      )}
    >
      {children}
    </kbd>
  )
}

// Filter chip — dark fill when active, white + ring when idle.
function CategoryChip({
  label,
  icon,
  active,
  onClick,
}: {
  label: string
  icon?: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        siteText.labelS,
        "flex cursor-pointer items-center gap-2 rounded-[10px] px-3 py-2",
        "transition-colors duration-200",
        active
          ? "bg-background text-foreground"
          : "bg-white text-[var(--solid-500)] shadow-[inset_0_0_0_1px_var(--solid-50)] hover:bg-[var(--solid-25)] hover:text-[var(--solid-900)]",
      )}
    >
      {icon}
      {label}
    </button>
  )
}
