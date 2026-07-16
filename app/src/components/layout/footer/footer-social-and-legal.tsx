// Footer bottom bar — .footer-foot (copyright + legal links + social icons)
// .footer-foot: flex, gap-4, items-center. Mobile: flex-col, gap-6
// .footer-foot-1: flex-1, flex, gap-4, items-center. Mobile: flex-col, gap-3
// .footer-social-links-list: flex, gap-1.5 (6px)
// .footer-social-links-item: opacity 0.68, 28x28, transition 0.2s. hover: opacity 1

import Link from "next/link"
import { siteText } from "@/components/atoms/typography"
import { CONTACT } from "@/data/contact-info"

export function FooterSocialAndLegal() {
  return (
    <div className="flex items-center gap-4 max-md:flex-col max-md:gap-6">
      {/* .footer-foot-1 */}
      <div className="flex flex-1 items-center gap-4 max-md:flex-col max-md:gap-3">
        <p className={`${siteText.bodyS} text-[#ffffff68]`}>
          &copy; 2026 GOADS, Inc. All rights reserved.
        </p>
        <Link href="/privacy-policy" className="py-1 text-[var(--alpha-300)] no-underline transition-opacity duration-200 hover:text-[#ffffffeb]">
          <div className={siteText.bodyS}>Privacy Policy</div>
        </Link>
      </div>

      {/* .footer-social-links-list */}
      <ul className="mb-2.5 flex list-none gap-1.5 pl-0">
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
  { label: "x/twitter", href: CONTACT.x, icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M18.74 6.552l-4.164 4.76-3.6-4.76H5.76l6.23 8.147-5.904 6.749h2.528l4.558-5.207 3.983 5.207h5.085L15.746 12.862l5.52-6.31h-2.527Zm-.887 13.384L8.712 7.985h1.503l9.038 11.95h-1.4Z" fill="white"/></svg> },
  { label: "youtube", href: CONTACT.youtube, icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14.203 7.334c.445.002 1.559.013 2.742.06l.42.019c1.19.056 2.381.153 2.97.317a2.63 2.63 0 0 1 1.616 1.685c.333 1.3.375 3.835.38 4.449v.136c-.005.614-.047 3.15-.38 4.449a2.63 2.63 0 0 1-1.615 1.685c-.59.164-1.781.261-2.972.317l-.42.018c-1.183.048-2.296.059-2.741.061h-.408c-.94-.005-4.879-.047-6.132-.396a2.63 2.63 0 0 1-1.615-1.685c-.333-1.3-.375-3.835-.38-4.449v-.264c.005-.614.047-3.15.38-4.449a2.63 2.63 0 0 1 1.616-1.685c1.252-.349 5.191-.391 6.131-.396h.408Zm-1.87 3.749v5.833L17.333 14l-5-2.917Z" fill="white"/></svg> },
  { label: "telegram", href: CONTACT.telegram.channel, icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><g transform="translate(6.5 6.5) scale(0.625)" fill="white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.5.5 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.009-1.252-.242-1.865-.442-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></g></svg> },
  { label: "discord", href: CONTACT.discord, icon: <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><g transform="translate(6.5 6.5) scale(0.625)" fill="white"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z"/></g></svg> },
]
