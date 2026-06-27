import type { ReactNode } from "react"

/* Colored brand glyphs for the docs Support Channels block. Each icon is an
   inline SVG so it carries its own brand color (no external asset/network
   request) and renders crisply on the dark docs background. */

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 shrink-0">
      <circle cx="12" cy="12" r="12" fill="#229ED9" />
      <path
        fill="#fff"
        d="M5.5 11.8l11-4.24c.51-.18.96.12.79.9l-1.87 8.82c-.13.6-.5.74-1 .46l-2.76-2.04-1.33 1.28c-.15.15-.27.27-.55.27l.2-2.8 5.1-4.6c.22-.2-.05-.31-.34-.12l-6.3 3.97-2.71-.85c-.59-.18-.6-.59.13-.87z"
      />
    </svg>
  )
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 shrink-0">
      <rect width="24" height="24" rx="6" fill="#5865F2" />
      <path
        fill="#fff"
        d="M17.2 7.3a11 11 0 0 0-2.74-.85l-.18.36c.93.22 1.7.55 2.43 1a8.5 8.5 0 0 0-7.42 0c.73-.45 1.5-.78 2.43-1l-.18-.36c-.96.17-1.88.46-2.74.85-1.6 2.36-2.04 4.66-1.82 6.93a11 11 0 0 0 3.36 1.69l.43-.7c-.4-.15-.78-.34-1.14-.56l.28-.2a6.07 6.07 0 0 0 5.2 0l.28.2c-.36.22-.74.41-1.14.56l.43.7a11 11 0 0 0 3.36-1.69c.27-2.63-.46-4.91-1.82-6.93zM9.95 13.1c-.53 0-.97-.49-.97-1.09s.43-1.09.97-1.09.98.49.97 1.09c0 .6-.43 1.09-.97 1.09zm4.1 0c-.53 0-.97-.49-.97-1.09s.43-1.09.97-1.09.98.49.97 1.09c0 .6-.43 1.09-.97 1.09z"
      />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 shrink-0">
      <rect width="24" height="24" rx="6" fill="#000" />
      <path
        fill="#fff"
        d="M13.9 10.6 18.4 5.5h-1.6l-3.6 4.1-2.9-4.1H6l4.7 6.7L6 18.5h1.6l3.8-4.4 3.1 4.4H18l-4.1-7.9zm-1.3 1.5-.4-.6L8 6.7h1.4l2.8 4 .4.6 3.7 5.3h-1.4l-3-4.5z"
      />
    </svg>
  )
}

function WebsiteIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 shrink-0">
      <circle cx="12" cy="12" r="12" fill="#10B981" />
      <path
        fill="none"
        stroke="#fff"
        strokeWidth="1.3"
        d="M12 4.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15zm0 0c2 1.7 3 4.2 3 7.5s-1 5.8-3 7.5c-2-1.7-3-4.2-3-7.5s1-5.8 3-7.5zM4.7 12h14.6"
      />
    </svg>
  )
}

type Channel = {
  icon: ReactNode
  label: string
  handle: string
  href: string
}

const channels: Channel[] = [
  {
    icon: <TelegramIcon />,
    label: "Telegram Support",
    handle: "@goads_official",
    href: "https://t.me/goads_official",
  },
  {
    icon: <TelegramIcon />,
    label: "Telegram Channel",
    handle: "t.me/goadsagency",
    href: "https://t.me/goadsagency",
  },
  {
    icon: <WebsiteIcon />,
    label: "Website Live Chat",
    handle: "goadsagency.com",
    href: "https://goadsagency.com",
  },
  {
    icon: <DiscordIcon />,
    label: "Discord",
    handle: "discord.gg/hhY5enS3zk",
    href: "https://discord.gg/hhY5enS3zk",
  },
  {
    icon: <XIcon />,
    label: "X (Twitter)",
    handle: "@goads_official",
    href: "https://x.com/goads_official",
  },
]

export function DocsSupportChannels() {
  return (
    <div className="not-prose my-6 flex flex-col gap-1 rounded-lg border border-border/70 p-1.5">
      {channels.map((c) => (
        <a
          key={`${c.label}-${c.handle}`}
          href={c.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-lg p-3 transition-colors duration-200 ease-in-out hover:bg-accent/[7%] !decoration-transparent hover:!decoration-transparent"
        >
          {c.icon}
          <span className="flex flex-1 flex-col">
            <span className="text-sm font-medium text-foreground">{c.label}</span>
            <span className="text-[13px] text-foreground/70">{c.handle}</span>
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="size-5 text-foreground/30 transition-colors group-hover:text-accent"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      ))}
    </div>
  )
}
