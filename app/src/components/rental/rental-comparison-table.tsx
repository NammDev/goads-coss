// GOADS rental vs a typical agency account.
//
// The GOADS column is lifted by painting its own cells and giving them
// LEFT/RIGHT inset borders only — the vertical edges then run unbroken down the
// table while the horizontal row dividers stop at the panel, so it reads as one
// continuous highlighted column.
//
// An earlier attempt used a single rectangle placed at `grid-row: 1 / -1` behind
// the cells. Don't: an explicitly-placed grid item makes auto-placement skip the
// track it occupies, so every following cell shifted one column and the table
// rendered scrambled.
//
// The column header is the GOADS logo rather than the words "GOADS rental" —
// the shared `FooterLogoSvg` the navbar and footer use, unmodified. Its
// currentColor parts must be set to `--background`; see the note at the usage.
//
// Cross marks are a dimmed dash, not a red X. A red X down the competitor column
// reads as attacking them; "not offered" is the actual claim and ages better.
//
// Mobile: a three-column table is unusable at 390px, so each row becomes a block
// with the two values side by side under its label. Side by side is kept —
// collapsing to one column would lose the comparison, which is the whole point.

import { Fragment } from "react"

import { cn } from "@/lib/utils"
import { siteText } from "@/components/atoms/typography"
import { FooterLogoSvg } from "@/components/layout/footer/logo-svg"
import { RENTAL_COMPARISON_ROWS, type RentalComparisonRow } from "@/data/rental-page-data"

const OTHER_COL = "Typical agency account"

export function RentalComparisonTable() {
  return (
    <>
      <DesktopTable />
      <MobileTable />
    </>
  )
}

// ── Desktop ─────────────────────────────────────────────────────────────────

// ── GOADS panel paint ───────────────────────────────────────────────────────
// Navy built from `--meta-ink` (#1c2b33, Meta's own dark) rather than
// `--meta-blue-deep` (#0064e0). The vivid blue read as neon at this size: a
// saturated hue behind text, edged with saturated 1px lines, is exactly the
// recipe for a glow. The ink is the same family but desaturated, so the panel
// still reads navy and still belongs to the brand, without lighting up.
//
// Edges and dividers are NEUTRAL white-alpha, matching every other border in the
// table. Coloured hairlines were the bigger half of the problem: a bright 1px
// line on a dark ground reads as emitted light, not as a border.
//
// Written as complete literal strings, never composed from template literals:
// Tailwind scans source text for whole class names, so an interpolated
// `shadow-[...${EDGE}...]` would never be generated.

const PANEL_FILL = "bg-[color-mix(in_oklab,var(--meta-ink)_62%,var(--background))]"

/** Vertical edges only, drawn per cell so they join into one unbroken line. */
const PANEL_SIDES =
  "bg-[color-mix(in_oklab,var(--meta-ink)_62%,var(--background))] shadow-[inset_1px_0_0_var(--alpha-700),inset_-1px_0_0_var(--alpha-700)]"

/** Sides + top edge — first cell of the panel. */
const PANEL_TOP =
  "shadow-[inset_1px_0_0_var(--alpha-700),inset_-1px_0_0_var(--alpha-700),inset_0_1px_0_var(--alpha-700)]"

/** Sides + bottom edge — last cell of the panel. */
const PANEL_BOTTOM =
  "shadow-[inset_1px_0_0_var(--alpha-700),inset_-1px_0_0_var(--alpha-700),inset_0_-1px_0_var(--alpha-700)]"

/** Row divider inside the panel — one step fainter than the outer borders so the
 *  column reads as continuous rather than as ten stacked boxes. */
const PANEL_DIVIDER = "border-b border-[var(--alpha-800)]"

function DesktopTable() {
  const lastIndex = RENTAL_COMPARISON_ROWS.length - 1

  return (
    <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)] rounded-[20px] border border-[var(--alpha-700)] px-2 pb-2 max-md:hidden">
      {/* ── Header ── */}
      <div className="py-6" />
      <div
        className={cn(
          "flex items-center justify-center rounded-t-[16px] px-5 py-6",
          PANEL_SIDES,
          PANEL_TOP,
        )}
      >
        {/* Official logo, rendered exactly as the navbar and footer do.
            In the mark the panda body, ears, eye and the G's inner curve are
            `fill="currentColor"`; in the official dark-background artwork those
            parts are the near-black ground. So the wrapper must be set to
            `--background` — NOT `transparent`, which lets them pick up whatever
            surface is behind and, on this navy panel, turned the panda navy.
            h-10 matches the navbar's rendering size. */}
        <span className="text-[var(--background)]">
          <FooterLogoSvg className="block h-10 w-auto" />
        </span>
      </div>
      <div
        className={cn(
          siteText.labelM,
          "flex items-center justify-center px-5 py-6 text-center text-[var(--alpha-200)]",
        )}
      >
        {OTHER_COL}
      </div>

      {/* ── Rows ── */}
      {RENTAL_COMPARISON_ROWS.map((row, i) => (
        <Fragment key={row.label}>
          <div
            className={cn(
              siteText.bodyM,
              "flex items-center py-4 pr-4 pl-5 text-[var(--alpha-50)]",
              i !== lastIndex && "border-b border-[var(--alpha-800)]",
            )}
          >
            {row.label}
          </div>
          <Cell value={row.goads} emphasis last={i === lastIndex} />
          <Cell value={row.other} last={i === lastIndex} />
        </Fragment>
      ))}
    </div>
  )
}

function Cell({
  value,
  emphasis = false,
  last = false,
}: {
  value: boolean | string
  emphasis?: boolean
  last?: boolean
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center px-5 py-4 text-center",
        emphasis
          ? cn(PANEL_SIDES, last ? cn("rounded-b-[16px]", PANEL_BOTTOM) : PANEL_DIVIDER)
          : !last && "border-b border-[var(--alpha-800)]",
      )}
    >
      <Value value={value} emphasis={emphasis} />
    </div>
  )
}

// A row is one thought: label and value must sit on the SAME step of the scale
// or the row reads as two different sizes fighting each other. Desktop runs the
// whole row at 16px (label bodyM · GOADS value labelM · other value bodyM), and
// mobile drops the entire row to 14px rather than shrinking only the values.
function Value({
  value,
  emphasis,
  size = "md",
}: {
  value: boolean | string
  emphasis: boolean
  size?: "sm" | "md"
}) {
  if (typeof value !== "string") return value ? <TickIcon /> : <CrossIcon />

  const small = size === "sm"
  return (
    <span
      className={cn(
        emphasis
          ? cn(small ? siteText.labelS : siteText.labelM, "text-foreground")
          : cn(small ? siteText.bodyS : siteText.bodyM, "text-[var(--alpha-200)]"),
        "[text-wrap:balance]",
      )}
    >
      {value}
    </span>
  )
}

// ── Mobile ──────────────────────────────────────────────────────────────────

function MobileTable() {
  return (
    <div className="flex flex-col gap-2.5 md:hidden">
      {RENTAL_COMPARISON_ROWS.map((row) => (
        <MobileRow key={row.label} row={row} />
      ))}
    </div>
  )
}

function MobileRow({ row }: { row: RentalComparisonRow }) {
  return (
    <div className="overflow-hidden rounded-[16px] border border-[var(--alpha-700)]">
      <div className={cn(siteText.bodyS, "px-4 py-3 text-[var(--alpha-50)]")}>{row.label}</div>
      <div className="grid grid-cols-2 border-t border-[var(--alpha-800)]">
        <div className={cn("flex flex-col items-center gap-1.5 px-3 py-3.5 text-center", PANEL_FILL)}>
          <span className="text-[var(--background)]">
            <FooterLogoSvg className="block h-6 w-auto" />
          </span>
          <Value value={row.goads} emphasis size="sm" />
        </div>
        <div className="flex flex-col items-center gap-1.5 px-3 py-3.5 text-center">
          <span className={cn(siteText.bodyXs, "text-[var(--alpha-300)]")}>Typical</span>
          <Value value={row.other} emphasis={false} size="sm" />
        </div>
      </div>
    </div>
  )
}

// ── Marks ───────────────────────────────────────────────────────────────────

function TickIcon() {
  return (
    <span className="flex size-6 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--lime-green),transparent_82%)] text-[var(--lime-green)]">
      <svg viewBox="0 0 20 20" width="13" height="13" aria-label="Included" role="img">
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M5.5 10.5 8.5 13.5l6-7"
        />
      </svg>
    </span>
  )
}

function CrossIcon() {
  return (
    <span className="flex size-6 items-center justify-center text-[var(--alpha-400)]">
      <svg viewBox="0 0 20 20" width="13" height="13" aria-label="Not offered" role="img">
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" d="M5.5 10h9" />
      </svg>
    </span>
  )
}
