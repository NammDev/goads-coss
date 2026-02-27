/**
 * Section divider with horizontal border line and diamond dots
 * at the intersection of vertical grid frame lines.
 * Matches the corner-dot style from layout.tsx header.
 */
export function SectionDivider() {
  return (
    <div aria-hidden="true" className="relative">
      {/* Full-width horizontal line */}
      <div className="border-b border-border/60" />
      {/* Diamond dots positioned at container-edge grid lines */}
      <div className="container relative">
        <div className="absolute -left-[11.5px] -ml-1 top-0 -translate-y-1/2 z-50 size-2 rounded-[2px] border border-border bg-background shadow-xs" />
        <div className="absolute -right-[11.5px] -mr-1 top-0 -translate-y-1/2 z-50 size-2 rounded-[2px] border border-border bg-background shadow-xs" />
      </div>
    </div>
  );
}
