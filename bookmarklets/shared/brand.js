// Build-time brand for the GOADS bookmarklet payloads (white-label).
//
// build-bookmarklets.mjs builds every tool once per brand, injecting the brand
// key with esbuild `--define:__BM_BRAND__="<key>"`. Unset → "goads", so a plain
// build produces the existing GOADS payloads unchanged.
//
// IMPORTANT — why the selection is a compile-time ternary, not `BRANDS[KEY]`:
// `__BM_BRAND__` is inlined as a string literal, so esbuild folds the ternary at
// build time and DROPS the other brand's object entirely. That is what keeps a
// neutral payload free of the GOADS host/link strings. The GOADS logo is handled
// the same way at each mark site (see `monogram()` users) so it tree-shakes out
// of neutral payloads too.

// Branch directly on the `__BM_BRAND__` define (not via an intermediate var) —
// esbuild only constant-folds the ternary, and thus drops the other brand's
// object, when the condition is the inlined literal itself.
// eslint-disable-next-line no-undef -- replaced by esbuild --define at build time
export var BRAND =
  typeof __BM_BRAND__ !== "undefined" && __BM_BRAND__ === "adstoolkit"
    ? {
        key: "adstoolkit",
        name: "ToolFB",
        host: "toolfb.media",
        website: "https://toolfb.media",
        telegram: "", // neutral brand has no Telegram channel
        tempmail: "https://toolfb.media/tempmail",
        mailDomain: "toolfb.media",
      }
    : {
        key: "goads",
        name: "GOADS",
        host: "goadsagency.com",
        website: "https://goadsagency.com",
        telegram: "https://t.me/goadsagency",
        tempmail: "https://goadsagency.com/tempmail",
        mailDomain: "goadsagency.com",
      }

/** Telegram label without the scheme (e.g. "t.me/goadsagency"); "" when none. */
export var TELEGRAM_LABEL = BRAND.telegram ? BRAND.telegram.replace(/^https?:\/\//, "") : ""

/**
 * Neutral header mark: a white monogram (brand initial) on the shell's black
 * mark tile. Used instead of the GOADS logo by brands without one. Callers guard
 * this against `__BM_BRAND__` so the GOADS logo tree-shakes out of neutral builds:
 *   __BM_BRAND__ === "adstoolkit" ? monogram() : LOGO_SVG
 */
export function monogram() {
  var initial = (BRAND.name || "A").charAt(0).toUpperCase()
  return (
    '<span style="font:700 20px/1 Inter,-apple-system,BlinkMacSystemFont,\'Segoe UI\',sans-serif;color:#fff">' +
    initial +
    "</span>"
  )
}
