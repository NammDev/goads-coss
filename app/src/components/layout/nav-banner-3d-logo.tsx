// Foreplay nav-dropdown banner — shared 3D spinning GoAds logo + label.
// Reused by Product / Tools / Resources mega-menus (DRY: single source).
//
// Renders the `.nav-banner-content` title + a real CSS-3D extruded spin of
// the ORIGINAL GoAds mark (no AI redraw): GOADS_EXTRUDE_LAYERS copies of the
// exact SVG stacked along Z give solid thickness. Brightness is SYMMETRIC —
// front AND back face render full white, only the mid core darkens — so the
// mark stays bright through the whole spin while still reading as a 3D mass.
// Container keeps Foreplay banner proportions (max-w-240, rounded-10, h-150).

import { siteText } from "@/components/atoms/typography"
import { cn } from "@/lib/utils"

// More layers = smoother solid edge; 22 ≈ ~25px thickness at 1.15px step.
const GOADS_EXTRUDE_LAYERS = 22

interface NavBanner3dLogoProps {
  /** Title shown above the spinning logo. */
  label?: string
  /** Optional override for the outer column wrapper. */
  className?: string
}

export function NavBanner3dLogo({
  label = "GOADS Agency",
  className,
}: NavBanner3dLogoProps) {
  return (
    <div className={cn("flex w-full flex-col items-center justify-center gap-5", className)}>
      {/* .nav-banner-content — z-2, flex-col, items-center, max-w-200, text-center */}
      <div className="relative z-[2] flex max-w-[200px] flex-col items-center justify-start gap-1 text-center text-[var(--alpha-100)]">
        {/* .text-white */}
        <div className="flex-1 text-foreground">
          {/* .u-nav-banner-title — play icon removed (spinning logo, not a video) */}
          <div className="flex items-center justify-center whitespace-nowrap">
            <div className={siteText.labelS}>{label}</div>
          </div>
        </div>
      </div>

      {/* Banner plaque — Foreplay proportions (max-w-240, rounded-10, h-150).
            Dark bg so the panda negative-space (#020308) blends → exact B&W mark. */}
      <div className="relative w-full max-w-[240px] overflow-hidden rounded-[10px]">
        <div className="relative z-[3] flex h-[150px] w-full items-center justify-center bg-background [perspective:1100px]">
          {/* Logo ~30% larger (156px); SVG's own padding keeps the glyph inside the frame. */}
          <div className="relative size-[156px] [transform-style:preserve-3d] [animation:goads-spin-y_11s_linear_infinite] motion-reduce:[animation:none]">
            {Array.from({ length: GOADS_EXTRUDE_LAYERS }).map((_, i) => {
              const t = i / (GOADS_EXTRUDE_LAYERS - 1) // 0 = front face, 1 = back face
              const z = (t - 0.5) * GOADS_EXTRUDE_LAYERS * 1.15
              // V-curve: 1.0 at both faces, ~0.5 at the core (3D depth)
              const brightness = 0.5 + Math.abs(t - 0.5) * 2 * 0.5
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src="/assets/cta/verified-panda.svg"
                  alt={i === 0 ? "GoAds" : ""}
                  aria-hidden={i !== 0}
                  className="absolute inset-0 size-full object-contain"
                  style={{ transform: `translateZ(${z}px)`, filter: `brightness(${brightness})` }}
                />
              )
            })}
          </div>
        </div>
        {/* Y-axis spin keyframes (scoped; browser dedupes identical <style>) */}
        <style>{`@keyframes goads-spin-y{from{transform:rotateY(0deg)}to{transform:rotateY(360deg)}}`}</style>
      </div>
    </div>
  )
}
