// Marketing route transition. A template re-mounts on every navigation
// within the (marketing) group, so wrapping children here gives each route
// a quick fade-in instead of an abrupt swap.
//
// Opacity-ONLY (no transform): a transformed ancestor would become the
// containing block for any `position: fixed` descendant and shift it during
// the animation. fade-in via tailwindcss-animate touches only opacity.

export default function MarketingTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="animate-in fade-in duration-300 ease-out">{children}</div>
  )
}
