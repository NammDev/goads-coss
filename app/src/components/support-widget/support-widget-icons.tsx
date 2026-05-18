// Icon glyphs for support-widget. Path data extracted from the user-provided
// intercom.html (functional SVG geometry). currentColor + sizable.

interface IconProps {
  className?: string
  size?: number
}

function Svg({ size = 16, viewBox, className, children }: IconProps & { viewBox: string; children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {children}
    </svg>
  )
}

export function CloseIcon(p: IconProps) {
  return (
    <Svg {...p} viewBox="0 0 16 16">
      <path d="M13.25 3.95L12.05 2.75L8 6.8L3.95 2.75L2.75 3.95L6.8 8L2.75 12.05L3.95 13.25L8 9.2L12.05 13.25L13.25 12.05L9.2 8L13.25 3.95Z" fill="currentColor" />
    </Svg>
  )
}

export function SendIcon(p: IconProps) {
  return (
    <Svg {...p} viewBox="0 0 17 16">
      <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="m4.563 14.605 9.356-5.402c1-.577 1-2.02 0-2.598L4.563 1.203a1.5 1.5 0 0 0-2.25 1.3v10.803a1.5 1.5 0 0 0 2.25 1.3M6.51 8.387 2.313 9.512V6.297L6.51 7.42c.494.133.494.834 0 .966" />
    </Svg>
  )
}

export function ExternalIcon(p: IconProps) {
  return (
    <Svg {...p} viewBox="0 0 16 16">
      <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M3 3.7h4V2H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2h-1.7v2a.3.3 0 0 1-.3.3H3a.3.3 0 0 1-.3-.3V4a.3.3 0 0 1 .3-.3M9.218 3c0 .47.38.85.85.85h1.88L8.296 7.502a.85.85 0 0 0 1.202 1.202l3.652-3.652v1.88a.85.85 0 0 0 1.7 0V3a.85.85 0 0 0-.85-.85h-3.932a.85.85 0 0 0-.85.85" />
    </Svg>
  )
}

export function HomeIcon(p: IconProps) {
  return (
    <Svg {...p} size={p.size ?? 24} viewBox="0 0 24 24">
      <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M10.5 2.335 3 7.51c-.625.437-1 1.116-1 1.84V19.7C2 20.965 3.125 22 4.5 22h15c1.375 0 2.5-1.035 2.5-2.3V9.35c0-.724-.375-1.403-1-1.84l-7.5-5.175a2.69 2.69 0 0 0-3 0M7.316 14.366a.85.85 0 1 0-1.132 1.268A8.7 8.7 0 0 0 12 17.852a8.7 8.7 0 0 0 5.816-2.218.85.85 0 1 0-1.132-1.268A7 7 0 0 1 12 16.152c-1.8 0-3.44-.675-4.684-1.786" />
    </Svg>
  )
}

export function MessagesIcon(p: IconProps) {
  return (
    <Svg {...p} size={p.size ?? 24} viewBox="0 0 24 24">
      <path fill="none" stroke="currentColor" strokeWidth="1.7" d="M19 2.85a2.15 2.15 0 0 1 2.15 2.15v15.806c0 .455-.55.683-.872.362L15.91 17.15H5A2.15 2.15 0 0 1 2.85 15V5A2.15 2.15 0 0 1 5 2.85z" />
      <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M17 7a.85.85 0 0 1 0 1.7H7A.85.85 0 1 1 7 7zm-5 4a.85.85 0 0 1 0 1.7H7A.85.85 0 0 1 7 11z" />
    </Svg>
  )
}

export function ChevronDownIcon(p: IconProps) {
  return (
    <Svg {...p} size={p.size ?? 20} viewBox="0 0 20 20">
      <path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M6 8l4 4 4-4" />
    </Svg>
  )
}

export function ChatIcon(p: IconProps) {
  return (
    <Svg {...p} size={p.size ?? 24} viewBox="0 0 24 24">
      <path fill="currentColor" d="M5 3h14a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5l-4.6 3.45A1 1 0 0 1 8 19.6V17H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3" />
    </Svg>
  )
}
