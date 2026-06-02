// Shared nav menu data (groups + icons) for the mobile dropdown expansion.
// Mirrors the desktop Resources/Tools/Product menus so mobile renders the same
// content. (Desktop menus still carry their own copies — migrate to this module
// later for full DRY; kept separate now to avoid touching working desktop code.)

import type { ReactElement } from "react"

export type NavMenuItem = { label: string; desc: string; href: string; icon?: () => ReactElement; img?: string }
export type NavMenuGroup = { overline: string; items: NavMenuItem[] }

// ── Resources (foreplay nav-resources-menu — LEARN / COMPANY) ──
export const RESOURCES_GROUPS: NavMenuGroup[] = [
  { overline: "Learn", items: [
    { label: "Blog", desc: "Tips & guides for media buyers", href: "/blog", icon: IconUniversity },
    { label: "Docs", desc: "Setup docs & API references", href: "/docs", icon: IconEvents },
    { label: "Community", desc: "Join discussions", href: "/community", icon: IconBook },
    { label: "Help Center", desc: "FAQs & support guides", href: "/help", icon: IconExpert },
    { label: "Payment Methods", desc: "Accepted payment options", href: "/payment", icon: IconBlog },
  ]},
  { overline: "Company", items: [
    { label: "About Us", desc: "5+ yrs in ad infrastructure", href: "/about", icon: IconAffiliate },
    { label: "Partners", desc: "Exclusive deals from our partners", href: "/partners", icon: IconDirectory },
    { label: "Contact", desc: "Real people, fast answers, 24/7", href: "/contact", icon: IconContact },
  ]},
]

// ── Tools (foreplay nav tools — Popular Tools / More) ──
export const TOOLS_GROUPS: NavMenuGroup[] = [
  { overline: "Popular Tools", items: [
    { label: "2FA Generator", desc: "Generate TOTP codes", href: "/tools/2fa", icon: IconShield },
    { label: "Check Live UID", desc: "Check Facebook UIDs live/dead", href: "/tools/check-uid", icon: IconCopy },
    { label: "Split Data Profile", desc: "Split text by delimiter", href: "/tools/split-data", icon: IconScissors },
    { label: "IP Checker", desc: "Public IP & location info", href: "/tools/check-ip", icon: IconGlobe },
    { label: "GOADS Extension", desc: "Free Chrome extension", href: "/tools/goads-extension", icon: IconCookie },
  ]},
  { overline: "More", items: [
    { label: "Temp Mail", desc: "Disposable inbox, instant", href: "/tempmail", icon: IconNotepad },
  ]},
]

// ── Product (foreplay nav-product-menu — Products / Services) — uses img icons ──
export const PRODUCT_GROUPS: NavMenuGroup[] = [
  { overline: "Products", items: [
    { label: "Business Manager", desc: "BM1–BM10, verified & aged tiers.", href: "/bm", img: "/assets/BM.svg" },
    { label: "Facebook Profile", desc: "Aged profiles, ready to run.", href: "/profiles", img: "/assets/PROFILES.svg" },
    { label: "Facebook Pages", desc: "Verified fan pages with real reach.", href: "/pages", img: "/navbar/pages.svg" },
    { label: "Agency Ad Account", desc: "Verified Meta accounts, higher caps.", href: "/agency-ad-account", img: "/assets/META.svg" },
    { label: "TikTok Assets", desc: "Shop, Channel, Business Center.", href: "/tiktok-accounts", img: "/navbar/tiktok.svg" },
  ]},
  { overline: "Services", items: [
    { label: "Unban Service", desc: "Recover disabled BMs, profiles & pages.", href: "/unban", icon: IconChrome },
    { label: "Blue Verification", desc: "Verified badge for Pages & Instagram.", href: "/blue-verification", icon: IconMobile },
  ]},
]

// ── icon-20 stroke icons (white, 20×20) ──
function IconUniversity() { return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M18.25 7.75 10 11.5 1.75 7.75 10 4l8.25 3.75ZM18.25 7.75V13M4.75 9.25v3.23c0 .55.3 1.06.79 1.32L9.29 15.8c.44.24.97.24 1.42 0l3.75-2.01c.49-.26.79-.77.79-1.32V9.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>) }
function IconEvents() { return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="4" y="4" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M7 13h6M7 8.5V7h1.5v1.5H7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>) }
function IconBook() { return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6.25 4h7.5a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V4.75A.75.75 0 0 1 6.25 4Z" stroke="currentColor" strokeWidth="1.5" /><path d="M7.75 6.25h4.5M7.75 9.25H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>) }
function IconExpert() { return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12.25 14.88 13.75 16 16 12.25M12.25 11.19A6 6 0 0 0 10 10.75c-2.54 0-4.47 1.51-5.26 3.65-.31.83.4 1.6 1.28 1.6h3.23M12.63 5.88a2.63 2.63 0 1 1-5.26 0 2.63 2.63 0 0 1 5.26 0Z" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" /></svg>) }
function IconBlog() { return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8.5 16.75H6.25a1.5 1.5 0 0 1-1.5-1.5V4.75a1.5 1.5 0 0 1 1.5-1.5h7.5a1.5 1.5 0 0 1 1.5 1.5v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M11.5 16.75V15l2.63-2.63a1.24 1.24 0 0 1 1.75 1.75L13.25 16.75H11.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" /></svg>) }
function IconAffiliate() { return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 16.75a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M10 6.63v-.75m0 7.5v.74m1.5-6.37c-.75-1.5-3.38-1.09-3.38.58 0 2.18 3.76 1.15 3.76 3.28 0 1.68-3 2.14-3.76.64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>) }
function IconDirectory() { return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M16 10v4.5c0 .83-.67 1.5-1.5 1.5h-9A1.5 1.5 0 0 1 4 14.5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><rect x="4" y="5" width="12" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" /></svg>) }
function IconContact() { return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3.25" y="5" width="13.5" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="m4 6 6 4.5L16 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>) }
function IconShield() { return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2.5 3.75 5v4.5c0 3.5 2.5 6.8 6.25 8 3.75-1.2 6.25-4.5 6.25-8V5L10 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="m7.5 10 2 2 3-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>) }
function IconCopy() { return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="6" y="6" width="10" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><path d="M13 3.5H5A1.5 1.5 0 0 0 3.5 5v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>) }
function IconScissors() { return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="5.5" cy="5.5" r="2" stroke="currentColor" strokeWidth="1.5" /><circle cx="5.5" cy="14.5" r="2" stroke="currentColor" strokeWidth="1.5" /><path d="m17 3-10 7.5M17 17 7 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>) }
function IconGlobe() { return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" /><path d="M2.5 10h15M10 2.5c2 2.3 3 5 3 7.5s-1 5.2-3 7.5c-2-2.3-3-5-3-7.5s1-5.2 3-7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>) }
function IconCookie() { return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M17.5 10a7.5 7.5 0 1 1-7.58-7.5c-.2.75-.05 1.58.47 2.19.52.62 1.34.91 2.13.77a2.15 2.15 0 0 0 2.6 2.56c-.16.96.3 1.9 1.17 2.35.86.45 1.93.31 2.66-.35.34.62.55 1.3.55 1.98Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><circle cx="7.5" cy="10" r=".75" fill="currentColor" /><circle cx="11" cy="13" r=".75" fill="currentColor" /></svg>) }
function IconNotepad() { return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="4.5" y="3" width="11" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>) }
function IconChrome() { return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" /><path d="M12 9h8M5 7l4 7M14 21l3-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>) }
function IconMobile() { return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="6" y="3" width="8" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><path d="M9 14.5h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>) }
