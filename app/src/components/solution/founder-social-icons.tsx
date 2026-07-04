// Founder social icons (Telegram + LinkedIn) — rendered in the About testimonial card bio.
// Same 28×28 glyphs as the footer social list; only links with a real href (not "#") render.

export interface FounderSocials {
  telegram?: string
  linkedin?: string
}

const TelegramIcon = (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <g transform="translate(6.5 6.5) scale(0.625)" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.5.5 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.009-1.252-.242-1.865-.442-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </g>
  </svg>
)

const LinkedinIcon = (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M19.28 19.283h-2.221v-3.482c0-.83-.017-1.898-1.157-1.898-1.158 0-1.335.905-1.335 1.838v3.542h-2.222V12.125h2.134v1.006h.029c.298-.563 1.023-1.156 2.106-1.156 2.251 0 2.667 1.481 2.667 3.41v3.898ZM9.836 11.146a1.29 1.29 0 1 1 0-2.58 1.29 1.29 0 0 1 0 2.58Zm1.114 8.137H8.723V12.125H10.95v7.158ZM20.391 6.5H7.608A1.1 1.1 0 0 0 6.5 7.58v12.84c0 .597.495 1.08 1.108 1.08h12.782c.612 0 1.111-.483 1.111-1.08V7.58c0-.597-.499-1.08-1.111-1.08Z" fill="currentColor" />
  </svg>
)

export function FounderSocialIcons({ socials }: { socials?: FounderSocials }) {
  if (!socials) return null

  const links = [
    { label: "Telegram", href: socials.telegram, icon: TelegramIcon },
    { label: "LinkedIn", href: socials.linkedin, icon: LinkedinIcon },
  ].filter(l => l.href && l.href !== "#")

  if (links.length === 0) return null

  return (
    <div className="mt-1 flex items-center gap-2.5">
      {links.map(l => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${l.label} profile`}
          className="flex size-11 items-center justify-center rounded-full border border-[#ffffff1a] text-foreground opacity-70 transition-all duration-200 hover:border-[#ffffff33] hover:opacity-100"
        >
          {l.icon}
        </a>
      ))}
    </div>
  )
}
