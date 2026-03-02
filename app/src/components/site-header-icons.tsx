export function SsLogo() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 328 329" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-8.5">
      <rect y="0.5" width="328" height="328" rx="164" fill="black" className="dark:fill-white" />
      <path d="M165.018 72.3008V132.771C165.018 152.653 148.9 168.771 129.018 168.771H70.2288" stroke="white" strokeWidth="20" className="dark:stroke-black" />
      <path d="M166.627 265.241L166.627 204.771C166.627 184.889 182.744 168.771 202.627 168.771L261.416 168.771" stroke="white" strokeWidth="20" className="dark:stroke-black" />
      <line x1="238.136" y1="98.8184" x2="196.76" y2="139.707" stroke="white" strokeWidth="20" className="dark:stroke-black" />
      <line x1="135.688" y1="200.957" x2="94.3128" y2="241.845" stroke="white" strokeWidth="20" className="dark:stroke-black" />
      <line x1="133.689" y1="137.524" x2="92.5566" y2="96.3914" stroke="white" strokeWidth="20" className="dark:stroke-black" />
      <line x1="237.679" y1="241.803" x2="196.547" y2="200.671" stroke="white" strokeWidth="20" className="dark:stroke-black" />
    </svg>
  )
}

export function SsCtaIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-6">
      <path d="M63.6734 24.8486V49.3899C63.6734 57.4589 57.1322 64.0001 49.0632 64.0001H25.2041" stroke="currentColor" strokeWidth="8.11681" />
      <path d="M64.3266 103.152L64.3266 78.6106C64.3266 70.5416 70.8678 64.0003 78.9368 64.0003L102.796 64.0004" stroke="currentColor" strokeWidth="8.11681" />
      <line x1="93.3468" y1="35.6108" x2="76.555" y2="52.205" stroke="currentColor" strokeWidth="8.11681" />
      <line x1="51.7697" y1="77.0624" x2="34.9778" y2="93.6567" stroke="currentColor" strokeWidth="8.11681" />
      <line x1="50.9584" y1="51.3189" x2="34.2651" y2="34.6256" stroke="currentColor" strokeWidth="8.11681" />
      <line x1="93.1625" y1="93.6397" x2="76.4692" y2="76.9464" stroke="currentColor" strokeWidth="8.11681" />
    </svg>
  )
}

export function GithubIcon({ className = 'size-5' }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

export function XIcon({ className = 'size-5' }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className={className}>
      <path fill="currentColor" d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z" />
    </svg>
  )
}

export function DiscordIcon({ className = 'size-5' }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" className={className}>
      <circle cx="9" cy="12" r="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="15" cy="12" r="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 7.5C11 6.5 13 6.5 16.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 16.5C10.5 17.5 13.5 17.5 17 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.5 17C15.5 18 17 20 17.5 20C19 20 20.333 18.333 21 17C21.667 15.333 21.5 11.167 19.5 5.5C18.043 4.485 16.5 4.16 15 4L14 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.50011 17C8.50011 18 7.14411 20 6.66811 20C5.23911 20 3.97011 18.333 3.33511 17C2.70011 15.333 2.85911 11.167 4.76311 5.5C6.15111 4.485 7.54511 4.16 9.00011 4L10.0001 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
