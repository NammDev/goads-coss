// Giveaway feature rows — 1:1 clone of Foreplay MCP .lens-gamification (alternating
// left/right rows in a white block). DOM + CSS mapped verbatim from
// docs/foreplay/html/mcp-feature.{html,css}. Reuses SectionWhiteBlock +
// SectionContainer + SectionHead (left-align) + CtaButton (light-stroke).
//
// EXACT CSS (mcp-feature.css):
//   .v-padding-experts        → padding 48px top/bottom            → py-12
//   .div-block-360            → flex col, gap 100px                → flex flex-col gap-25
//   .left-right-section-wrapper → flex col, gap 80px (1 grid/row)  → flex flex-col gap-20
//   .lens-gamification-grid   → 12-col grid, gap 0, place-items-center
//   .lens-gamification-content → grid-area span 5 (col-span-5); flex col, items-start, gap 32px
//   .lens-gamification-illustration → grid-area span 7 (col-span-7)
//   img width 560 (.with-padding → -mb-40 bleed); rendered 560×444
// ASYMMETRIC 5/7 split + place-items-center is the "so le" that balances each row.

import Image from "next/image"
import { SectionContainer } from "@/components/atoms/section-container"
import { SectionHead } from "@/components/atoms/section-head"
import { CtaButton } from "@/components/atoms/cta-button"
import { giveawayFeatureRows } from "@/data/giveaway-page-data"

type FeatureRow = (typeof giveawayFeatureRows)[number]

function GiveawayFeatureRow(row: FeatureRow) {
  // .lens-gamification-content — col-span-5 (narrower side). On mobile it stacks
  // BELOW the image (order-last) so every row reads image-then-text.
  const content = (
    <div className="col-span-5 flex flex-col items-start justify-center gap-8 max-md:order-last max-md:gap-6">
      <SectionHead
        subtitle={row.overline}
        title={row.title}
        titleTag="h2"
        titleSize="h3"
        description={row.description}
        descSize="l"
        variant="dark"
        className="mx-0 max-w-none items-start gap-2 text-left"
      />
      <CtaButton href={row.cta.href} variant="light-stroke">
        {row.cta.label}
      </CtaButton>
    </div>
  )

  // .lens-gamification-illustration — col-span-7 (wider side); img 560×444.
  // On mobile it sits ABOVE the text (order-first) for every row.
  const illustration = (
    <div className="col-span-7 px-4 max-md:order-first max-md:px-0">
      <Image
        src={row.imageSrc}
        alt={row.imageAlt}
        width={560}
        height={444}
        sizes="(max-width: 767px) 100vw, 560px"
        // No negative bleed here: the source .with-padding (-40px) is meant to sink
        // into the 48px section padding, but on this layout it escaped the white
        // block. Image sits fully inside, framed by the py-12 padding.
        className="aspect-[560/444] w-[560px] max-w-full rounded-[20px] object-cover"
      />
    </div>
  )

  return (
    // .left-right-section-wrapper (one grid per row)
    <div className="flex flex-col gap-20">
      {/* .lens-gamification-grid — DOM order flips per row.reverse (so le) */}
      <div className="grid grid-cols-12 place-items-center gap-0 max-fp-lg:flex max-fp-lg:gap-10 max-md:flex-col max-md:items-start max-md:gap-16">
        {row.reverse ? (
          <>
            {illustration}
            {content}
          </>
        ) : (
          <>
            {content}
            {illustration}
          </>
        )}
      </div>
    </div>
  )
}

// White-block wrapper is provided by the page (shared with the claim steps),
// so this renders only the container + rows.
export function GiveawayFeatureRows() {
  return (
    <SectionContainer variant="section">
      {/* .v-padding-experts — padding 48px top/bottom */}
      <div className="py-12">
        {/* .div-block-360 — flex col, gap 100px between rows */}
        <div className="flex flex-col gap-[100px]">
          {giveawayFeatureRows.map((row) => (
            <GiveawayFeatureRow key={row.title} {...row} />
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}
