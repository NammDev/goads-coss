// Gradient header: logo + avatar stack, then large title.
// Close button lives in the panel (it is position:fixed, must not scroll).

import { SW_GRADIENT } from "@/components/support-widget/support-widget.tokens"
import { SW_CONFIG } from "@/components/support-widget/support-widget.config"
import { SupportWidgetAvatarStack } from "@/components/support-widget/support-widget-avatar-stack"

export function SupportWidgetHeader() {
  return (
    // [SRC] gradient full-bleed. Content inset = 40px = 20px (parent
    // .intercom-qohjs1 `padding:0 20px`) + 20px (.intercom-1z5idy own
    // `padding:32px 20px 60px`). Cards only get the 20px (see panel) → logo
    // sits 20px deeper than the cards. Vertical = 32 top / 60 bottom.
    <div
      className="px-10 pt-8 pb-[60px]"
      style={{ background: SW_GRADIENT, color: "rgb(20,22,26)", opacity: 0.992647 }}
    >
      <div className="flex items-center justify-between pr-9">
        {/* JPG has a solid white bg (no alpha) — `multiply` drops the white so
            the dark foreplay mark shows on the light area of the gradient.
            For an exact WHITE logo like the original, supply a transparent
            PNG/SVG and switch to filter:brightness(0) invert(1). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SW_CONFIG.logoSrc}
          alt="foreplay"
          className="h-7 w-auto"
          style={{ mixBlendMode: "multiply" }}
        />
        <SupportWidgetAvatarStack avatars={SW_CONFIG.avatars} />
      </div>
      {/* [SRC] .intercom-1w0b59e/.intercom-18irs8j: 28px/34px, weight 600,
          color #FAFAFA, soft white text-shadow */}
      <h1
        className="mt-12 text-[28px] font-semibold leading-[34px] break-words"
        style={{ color: "rgb(250,250,250)", textShadow: "0 0 30px rgba(255,255,255,0.3)" }}
      >
        {SW_CONFIG.title}
      </h1>
    </div>
  )
}
