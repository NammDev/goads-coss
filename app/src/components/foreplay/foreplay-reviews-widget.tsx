// Foreplay reviews widget — Senja.io embed placeholder
// SOURCE: <script src="https://widget.senja.io/widget/{id}/platform.js">
//         <div class="senja-embed" data-id="{id}" data-mode="shadow" data-lazyload="false">
// GoAds will replace with own review widget (Senja/Google/G2/custom)

"use client"

import Script from "next/script"

const SENJA_WIDGET_ID = "0fd75b98-8d7f-4eac-b286-b4ffd2590796"

export function ForeplayReviewsWidget() {
  return (
    <>
      <Script
        src={`https://widget.senja.io/widget/${SENJA_WIDGET_ID}/platform.js`}
        strategy="lazyOnload"
      />
      <div
        className="senja-embed block w-full"
        data-id={SENJA_WIDGET_ID}
        data-mode="shadow"
        data-lazyload="false"
      />
    </>
  )
}
