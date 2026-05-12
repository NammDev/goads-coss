// Founder section — empty placeholder, preserves original layout dimensions.
// Background provided by parent <ForeplaySectionWhiteBlock />.
// Outer py-20 + max-w-[960px] grid + aspect-[3/4] left cell match the original portrait+quote layout
// so the white section keeps the same height for future content swap.

export function ForeplayHomeWinning() {
  return (
    <div className="py-20">
      <div className="mx-auto grid w-full max-w-[960px] grid-cols-1 gap-8 md:grid-cols-[2fr_3fr] md:gap-12">
        {/* Placeholder for portrait — preserves aspect-3/4 height so section doesn't collapse */}
        <div className="aspect-[3/4] w-full" aria-hidden="true" />
        {/* Right column reserved for future content */}
        <div aria-hidden="true" />
      </div>
    </div>
  )
}
