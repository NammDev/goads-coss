// Single bookmarklet card for /tools/bookmark.
// Structure follows the reference layout (preview block → title + version →
// description → actions) painted with GOADS tool tokens.
//
// Colour: Meta's own blues (--meta-* in globals.css), not the site accent. Every
// script here runs on facebook.com, so Facebook core blue reads as "this belongs
// to that product" rather than as a stray hue — and it keeps a fully greyscale
// grid from looking dead. Structure stays monochrome: card surface, borders,
// title and body copy are all --solid-*; blue is spent only on the preview well,
// the icon tile (Meta infinity gradient), the two pills and the drag anchor.

"use client"

import { useState } from "react"
import { Bookmark, Check, Share2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"
import { LightGhostAction } from "@/components/atoms/light-ghost-action"
import { BookmarkletDragAnchor } from "@/components/atoms/bookmarklet-drag-anchor"
import {
  getBookmarkletCategoryLabel,
  type Bookmarklet,
} from "@/data/bookmarklets"

interface BookmarkCardProps {
  script: Bookmarklet
  /** Detail URL. Omit to render a non-clickable card (i.e. on its own detail view). */
  href?: string
  /** Client-side open, used instead of a full navigation on a plain left-click. */
  onOpen?: () => void
}

export function BookmarkCard({ script, href, onOpen }: BookmarkCardProps) {
  const [linkCopied, setLinkCopied] = useState(false)
  const Icon = script.icon

  // Share URL is built at click time so it works on any host (localhost,
  // preview deploys, production) without a hardcoded origin.
  const copyShareLink = async () => {
    const url = new URL(window.location.href)
    url.search = ""
    url.searchParams.set("script", script.slug)
    await navigator.clipboard.writeText(url.toString())
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 1400)
  }

  return (
    <article
      className={cn(
        "group/card relative flex flex-col overflow-hidden rounded-[16px] border border-[var(--solid-50)] bg-white",
        "transition-all duration-[500ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
        href && "cursor-pointer",
        // Meta-blue edge + soft blue lift on hover
        "hover:border-[var(--meta-ring)]",
        "hover:shadow-[0_10px_30px_-14px_color-mix(in_oklab,var(--meta-blue),transparent_58%)]",
      )}
    >
      {/* Preview well — pale Meta wash + gradient icon tile for depth */}
      <div
        className={cn(
          "relative flex h-[132px] items-center justify-center overflow-hidden border-b border-[var(--solid-50)] max-md:h-[112px]",
          "bg-[var(--meta-tint)]",
        )}
      >
        {/* Corner glow — deeper blue behind the tile, fading out; pure CSS, no asset */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_115%,var(--meta-tint-strong),transparent_70%)]"
        />

        {/* Icon tile — Meta infinity gradient (light blue → Meta blue), lifts on hover */}
        <span
          className={cn(
            "relative flex size-14 items-center justify-center rounded-[14px] text-white",
            "bg-[linear-gradient(160deg,var(--meta-blue-light),var(--meta-blue-deep))]",
            "shadow-[0_8px_18px_-8px_color-mix(in_oklab,var(--meta-blue-deep),transparent_40%)]",
            "transition-transform duration-[500ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
            "group-hover/card:-translate-y-0.5 group-hover/card:scale-[1.04]",
          )}
        >
          <Icon className="size-7" strokeWidth={1.75} />
        </span>

        {/* Category pill — white cap with a blue ring, top-right */}
        <span
          className={cn(
            siteText.bodyXs,
            "absolute right-3 top-3 rounded-[6px] bg-white/85 px-2 py-0.5 font-medium text-[var(--meta-blue-deep)] backdrop-blur-sm",
            "shadow-[inset_0_0_0_1px_var(--meta-ring)]",
          )}
        >
          {getBookmarkletCategoryLabel(script.category)}
        </span>
      </div>

      {/* Meta + actions */}
      <div className="flex flex-1 flex-col gap-3 p-5 max-md:p-4">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className={cn(siteText.labelL, "text-[var(--solid-900)]")}>{script.title}</h3>
          <span
            className={cn(
              siteText.bodyXs,
              "rounded-[6px] bg-[var(--meta-tint)] px-2 py-0.5 font-mono text-[var(--meta-blue-deep)]",
              "shadow-[inset_0_0_0_1px_var(--meta-ring)]",
            )}
          >
            {script.version}
          </span>
        </div>

        <p className={cn(siteText.bodyS, "flex-1 text-[var(--solid-500)] [text-wrap:pretty]")}>
          {script.description}
        </p>

        {/* z-20 keeps the drag anchor + share button ABOVE the overlay link */}
        <div className="relative z-20 flex items-end gap-1 pt-1">
          <BookmarkletDragAnchor
            payload={script.payload}
            title={script.title}
            icon={<Bookmark className="size-4" />}
            className="min-w-0 flex-1"
          >
            {script.title}
          </BookmarkletDragAnchor>

          <LightGhostAction
            onClick={copyShareLink}
            hideLabel
            icon={
              linkCopied ? (
                <Check className="size-4 text-[var(--meta-blue)]" />
              ) : (
                <Share2 className="size-4" />
              )
            }
            label={linkCopied ? "Link copied" : "Copy share link"}
            className="shrink-0 shadow-[inset_0_0_0_1px_var(--solid-50)]"
          />
        </div>
      </div>

      {/* Whole-card link — a real <a> so middle-click / Cmd-click / "open in new
          tab" / crawlers all behave, but a plain left-click is intercepted and
          handled client-side (no full reload). Sits at z-10: above the static
          content so clicking the well or the copy opens the card, below the
          z-20 actions row so the drag anchor and share button stay usable.
          A sibling of the drag anchor, never a parent — nested <a> is invalid. */}
      {href && (
        <a
          href={href}
          aria-label={`View ${script.title}`}
          onClick={(e) => {
            // Let the browser handle new-tab/new-window intents natively.
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
            e.preventDefault()
            onOpen?.()
          }}
          className={cn(
            "absolute inset-0 z-10 rounded-[16px]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--meta-blue)] focus-visible:ring-offset-2",
          )}
        />
      )}
    </article>
  )
}
