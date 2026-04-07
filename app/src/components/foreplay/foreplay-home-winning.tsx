// Foreplay home winning organism — .home-winning (Before/After section)
// DOM: .home-winning > .section-head + .home-winning-grid > (.home-winning-card + .home-winning-card.is-dark)
// .home-winning: flex col, gap-[72px] (grid-row-gap), items-center, py-20 (80px)
// .home-winning-grid: grid, 2 cols, gap-5 (20px), max-w-[960px], w-full

import { ForeplaySectionHead } from "@/components/foreplay/foreplay-section-head"
import { ForeplayWinningCard } from "@/components/foreplay/foreplay-winning-card"

export function ForeplayHomeWinning() {
  return (
    <div className="flex flex-col items-center gap-[72px] py-20">
      {/* .section-head (reusable) */}
      <ForeplaySectionHead
        title="Built to last, made to scale"
        description="Stop rebuilding from scratch. Every ban means starting over. New BM, new profile, new warmup, lost momentum. We built GoAds so you never have to do that again."
        variant="dark"
      />

      {/* .home-winning-grid: 2 cols, gap-5, max-w-960 */}
      <div className="grid w-full max-w-[960px] auto-cols-fr grid-cols-2 gap-5">
        {/* Before card (light) */}
        <ForeplayWinningCard
          label="Before ..."
          description="Group chats, expired links and fragmented reports."
        >
          {/* .home-before-animation-image-wrapper — placeholder for before image */}
          <div className="flex flex-1 items-end justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/placeholder-before.webp"
              alt=""
              className="h-auto w-full object-contain"
              loading="lazy"
            />
          </div>
        </ForeplayWinningCard>

        {/* After card (dark) */}
        <ForeplayWinningCard
          label="After Foreplay"
          description="End-to-end feedback loop for winning ad creative."
          isDark
        >
          {/* .home-winning-card-loader-video: -m-6, flex center, h-auto */}
          <div className="-m-6 flex h-auto items-center justify-center">
            {/* .home-winning-card-video: z-2, 400x400 */}
            <div className="relative z-[2] size-[400px] max-h-full max-w-full">
              <div className="flex size-full items-center justify-center">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/foreplay/62a4ed18ddad95dde8b8bfa4_683351909f621123bbf25f44_home-loader-main-poster-00001.jpg"
                  className="size-full object-cover"
                >
                  <source
                    src="/video/62a4ed18ddad95dde8b8bfa4_683351909f621123bbf25f44_home-loader-main-transcode.webm"
                    type="video/webm"
                  />
                </video>
              </div>
            </div>
          </div>
        </ForeplayWinningCard>
      </div>
    </div>
  )
}
