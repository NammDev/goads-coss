// Footer bottom bar — .footer-foot (copyright + legal links + social icons)
// .footer-foot: flex, gap-4, items-center. Mobile: flex-col, gap-6
// .footer-foot-1: flex-1, flex, gap-4, items-center. Mobile: flex-col, gap-3
// .footer-social-links-list: flex, gap-1.5 (6px)
// .footer-social-links-item: opacity 0.68, 28x28, transition 0.2s. hover: opacity 1

import Link from "next/link"
import { fpText } from "@/components/foreplay/foreplay-typography"

export function ForeplayFooterSocialAndLegal() {
  return (
    <div className="flex items-center gap-4 max-md:flex-col max-md:gap-6">
      {/* .footer-foot-1 */}
      <div className="flex flex-1 items-center gap-4 max-md:flex-col max-md:gap-3">
        <p className={`${fpText.bodyS} text-[#ffffff68]`}>
          &copy; 2025 GoAds, Inc. All rights reserved.
        </p>
        <Link href="/privacy" className="py-1 text-[var(--fp-neutral-300)] no-underline transition-opacity duration-200 hover:text-[#ffffffeb]">
          <div className={fpText.bodyS}>Privacy Policy</div>
        </Link>
        <Link href="/terms" className="py-1 text-[var(--fp-neutral-300)] no-underline transition-opacity duration-200 hover:text-[#ffffffeb]">
          <div className={fpText.bodyS}>Terms &amp; Conditions</div>
        </Link>
      </div>

      {/* .footer-social-links-list */}
      <ul className="flex list-none gap-1.5 pl-0">
        {socialLinks.map(s => (
          <li key={s.label} className="size-7 opacity-[0.68] transition-all duration-200 hover:opacity-100">
            <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="inline-block max-w-full">
              <div className="size-7">{s.icon}</div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

const socialLinks = [
  { label: "facebook", href: "#", icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14 5.667C9.398 5.667 5.667 9.397 5.667 14c0 4.16 3.048 7.607 7.032 8.232V16.41h-2.116V14h2.116v-1.836c0-2.088 1.244-3.242 3.148-3.242.912 0 1.865.164 1.865.164v2.051h-1.05c-1.036 0-1.358.643-1.358 1.302V14h2.311l-.37 2.409h-1.94v5.823c3.983-.625 7.031-4.072 7.031-8.232 0-4.602-3.731-8.333-8.333-8.333Z" fill="white"/></svg> },
  { label: "instagram", href: "#", icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14.857 5.668c.937.001 1.413.006 1.823.019l.162.005c.187.006.371.015.594.025.886.041 1.49.181 2.022.387a4.08 4.08 0 0 1 1.476.96c.463.464.749.929.961 1.477.206.531.346 1.136.388 2.023.01.222.019.406.025.593l.005.162c.013.41.018.886.019 1.824l.001.621v.236l-.001.621c-.001.938-.006 1.413-.019 1.824l-.005.162c-.006.187-.015.371-.025.593-.04.887-.181 1.491-.388 2.023a4.08 4.08 0 0 1-.96 1.476 4.08 4.08 0 0 1-1.477.961c-.531.206-1.137.346-2.023.388-.222.01-.406.018-.593.025l-.162.005c-.41.012-.886.018-1.824.019l-.621.001h-.236l-.621-.001c-.938-.001-1.413-.007-1.824-.019l-.162-.005a17.4 17.4 0 0 1-.593-.025c-.887-.041-1.491-.182-2.023-.388a4.08 4.08 0 0 1-1.476-.96 4.08 4.08 0 0 1-.961-1.477c-.206-.531-.346-1.136-.388-2.023a17.4 17.4 0 0 1-.025-.593l-.005-.162c-.012-.41-.018-.886-.019-1.824v-1.713c.002-.938.006-1.413.019-1.824l.005-.162c.007-.187.015-.371.025-.593.041-.887.182-1.491.388-2.023a4.08 4.08 0 0 1 .96-1.476 4.08 4.08 0 0 1 1.477-.961c.531-.206 1.137-.346 2.023-.388.222-.01.407-.018.593-.025l.162-.005c.411-.012.886-.018 1.824-.019h1.713ZM14 9.834a4.167 4.167 0 1 0 0 8.333 4.167 4.167 0 0 0 0-8.333Zm0 1.667a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm4.375-2.917a1.042 1.042 0 1 0 0 2.083 1.042 1.042 0 0 0 0-2.083Z" fill="white"/></svg> },
  { label: "linkedin", href: "#", icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M19.28 19.283h-2.221v-3.482c0-.83-.017-1.898-1.157-1.898-1.158 0-1.335.905-1.335 1.838v3.542h-2.222V12.125h2.134v1.006h.029c.298-.563 1.023-1.156 2.106-1.156 2.251 0 2.667 1.481 2.667 3.41v3.898ZM9.836 11.146a1.29 1.29 0 1 1 0-2.58 1.29 1.29 0 0 1 0 2.58Zm1.114 8.137H8.723V12.125H10.95v7.158ZM20.391 6.5H7.608A1.1 1.1 0 0 0 6.5 7.58v12.84c0 .597.495 1.08 1.108 1.08h12.782c.612 0 1.111-.483 1.111-1.08V7.58c0-.597-.499-1.08-1.111-1.08Z" fill="white"/></svg> },
  { label: "tiktok", href: "#", icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M17.333 10.871v6.046A5.417 5.417 0 1 1 13.167 11.645v2.635a2.917 2.917 0 1 0 1.666 2.637V5.667h2.5A4.167 4.167 0 0 0 21.5 9.833v2.5a6.63 6.63 0 0 1-4.167-1.462Z" fill="white"/></svg> },
  { label: "x/twitter", href: "#", icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M18.74 6.552l-4.164 4.76-3.6-4.76H5.76l6.23 8.147-5.904 6.749h2.528l4.558-5.207 3.983 5.207h5.085L15.746 12.862l5.52-6.31h-2.527Zm-.887 13.384L8.712 7.985h1.503l9.038 11.95h-1.4Z" fill="white"/></svg> },
  { label: "youtube", href: "#", icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14.203 7.334c.445.002 1.559.013 2.742.06l.42.019c1.19.056 2.381.153 2.97.317a2.63 2.63 0 0 1 1.616 1.685c.333 1.3.375 3.835.38 4.449v.136c-.005.614-.047 3.15-.38 4.449a2.63 2.63 0 0 1-1.615 1.685c-.59.164-1.781.261-2.972.317l-.42.018c-1.183.048-2.296.059-2.741.061h-.408c-.94-.005-4.879-.047-6.132-.396a2.63 2.63 0 0 1-1.615-1.685c-.333-1.3-.375-3.835-.38-4.449v-.264c.005-.614.047-3.15.38-4.449a2.63 2.63 0 0 1 1.616-1.685c1.252-.349 5.191-.391 6.131-.396h.408Zm-1.87 3.749v5.833L17.333 14l-5-2.917Z" fill="white"/></svg> },
]
