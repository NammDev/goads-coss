// Foreplay Chrome Extension banner — .home-extension
// DOM: .home-extension > .home-extension-logo (absolute) + .home-extension-content + .home-extension-cta
// .home-extension: flex, gap-10 (40px), border ring solid-700, rounded-[32px], p-10, relative, overflow-hidden
// .home-extension-logo: absolute, inset 0% auto 0% -4%, w-[128px], opacity-50
// .home-extension-content: flex col, gap-5 (20px), flex-1, pl-20 (80px)
// .home-extension-title: flex col, gap-2 (8px), max-w-[480px]
// .home-extension-details: flex, gap-9 (36px), items-center
// .home-extension-cta: flex, justify-end, items-end

import { fpText } from "@/components/foreplay/foreplay-typography"
import { ForeplayCtaButton } from "@/components/foreplay/foreplay-cta-button"
import { ForeplaySectionContainer } from "@/components/foreplay/foreplay-section-container"

export function ForeplayHomeChromeExtension() {
  return (
    <ForeplaySectionContainer>
      <div className="relative flex gap-10 overflow-hidden rounded-[32px] p-10 shadow-[0_0_0_1px_var(--fp-solid-700)]">
        {/* .home-extension-logo: absolute, left -4%, opacity 50% */}
        <figure className="absolute inset-y-0 left-[-4%] flex w-[128px] items-center justify-start opacity-50">
          <ChromeLogo />
        </figure>

        {/* .home-extension-content */}
        <div className="flex flex-1 flex-col gap-5 pl-20">
          {/* .home-extension-title */}
          <div className="flex max-w-[480px] flex-col gap-2">
            <div className="text-[var(--fp-alpha-50)]">
              <div className={fpText.overline}>
                Free Chrome Extension
              </div>
            </div>
            <div className="text-foreground">
              <div className="[text-wrap:balance]">
                <h3 className={fpText.displayH4}>
                  Save ads from Meta, TikTok &amp; LinkedIn Ad Libraries.
                </h3>
              </div>
            </div>
          </div>

          {/* .home-extension-details */}
          <div className="flex items-center gap-9">
            <div className="flex items-center gap-2">
              <div className="text-[var(--fp-alpha-100)]">
                <div className="flex size-6 items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.385 12.956c2.47-.601 5.286 1.006 5.917 4.822.08.476-.306.889-.79.889h-3.27M10.406 7.833a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm7.5 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM12.012 18.667H3.8c-.483 0-.869-.415-.79-.892C4.103 11.186 11.71 11.186 12.802 17.775c.08.477-.306.892-.79.892Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="text-[var(--fp-alpha-50)]">
                <div className={fpText.labelM}>30,000 Users</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-[var(--fp-alpha-100)]">
                <div className="flex size-6 items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.727 3.786a.2.2 0 0 1 .38 0l2.235 4.66a.2.2 0 0 0 .163.117l5.145.675a.2.2 0 0 1 .118.36l-3.765 3.554a.2.2 0 0 0-.059.19l.945 5.077a.2.2 0 0 1-.308.222l-4.562-2.463a.2.2 0 0 0-.2 0l-4.562 2.463a.2.2 0 0 1-.308-.222l.945-5.077a.2.2 0 0 0-.062-.19L4.066 9.598a.2.2 0 0 1 .117-.36l5.146-.675a.2.2 0 0 0 .163-.117l2.235-4.66Z" stroke="currentColor" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="text-[var(--fp-alpha-50)]">
                <div className={fpText.labelM}>4.8/5 Stars</div>
              </div>
            </div>
          </div>
        </div>

        {/* .home-extension-cta */}
        <div className="flex items-end justify-end">
          <ForeplayCtaButton href="#" variant="hero">
            Install Free
          </ForeplayCtaButton>
        </div>
      </div>
    </ForeplaySectionContainer>
  )
}

function ChromeLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 128 128">
      <path fill="currentColor" d="M64 99.6a35.61 35.61 0 1 0 0-71.21 35.61 35.61 0 0 0 0 71.22Z" />
      <path fill="url(#p0)" d="M17.95 46.5c-2.66-4.6-5.78-9.43-9.37-14.49a63.98 63.98 0 0 0 55.43 96c5.89-8.27 9.89-14.23 12-17.88 4.04-7.01 9.28-17.06 15.7-30.12V80a32 32 0 0 1-55.42 0 1448.85 1448.85 0 0 0-18.34-33.5Z" />
      <path fill="url(#p1)" d="M64 128a63.98 63.98 0 0 0 55.42-96c-12.13-1.2-21.07-1.8-26.84-1.8-6.55 0-16.07.6-28.58 1.8A32 32 0 0 1 91.7 80l-27.7 48Z" />
      <path fill="#fff" d="M64 89.34a25.33 25.33 0 1 0 0-50.67 25.33 25.33 0 0 0 0 50.67Z" />
      <path fill="url(#p2)" d="M64 32h55.42A64 64 0 0 0 8.58 32l27.7 48h.02A32 32 0 0 1 64 32Z" />
      <defs>
        <linearGradient id="p0" x1="79.5" x2="13" y1="105" y2="85.5" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
        <linearGradient id="p1" x1="96" x2="96" y1="30.21" y2="128" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
        <linearGradient id="p2" x1="23.5" x2="119" y1="31.5" y2="27" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
      </defs>
    </svg>
  )
}
