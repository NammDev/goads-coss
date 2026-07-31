// Shared GOADS bookmarklet shell — the dark modal + white card stage that every
// tool in bookmarklets/ renders into, plus the small DOM/format helpers they all
// need. A tool supplies its title, subtitle and stage markup; everything around
// it (logo header, close affordances, brand strip, toast, styles) comes from here
// so the whole library is one visual product.
//
// Only one tool can be open at a time by design: they share a root id, so
// launching a second tool replaces the first.

import { LOGO_SVG, ICON_CLOSE, ICON_TELEGRAM } from "./goads-icons.js"
import { shellCss } from "./goads-shell-css.js"

export var BRAND_HOST = "goadsagency.com"
export var TELEGRAM_URL = "https://t.me/goadsagency"
export var WEBSITE_URL = "https://goadsagency.com"

var ROOT_ID = "goads-bk"
var BACKDROP_ID = "goads-bk-backdrop"
var STYLE_ID = "goads-bk-style"

/** Escape untrusted text (names, emails, FB error messages) before it hits innerHTML. */
export function esc(v) {
  return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  })
}

/** getElementById, scoped by convention to ids the tool itself rendered. */
export function $(id) {
  return document.getElementById(id)
}

/** Bottom-centred toast. kind: "ok" | "err" | undefined. */
export function toast(text, kind) {
  var t = document.createElement("div")
  t.className = "gbk-toast" + (kind ? " " + kind : "")
  t.textContent = text
  document.body.appendChild(t)
  setTimeout(function () {
    t.classList.add("show")
  }, 10)
  setTimeout(function () {
    t.classList.remove("show")
    setTimeout(function () {
      t.remove()
    }, 300)
  }, 2600)
}

/** AbortSignal that fires after ms — no request should hang the UI forever. */
export function timeoutSignal(ms) {
  var c = new AbortController()
  setTimeout(function () {
    c.abort()
  }, ms)
  return c.signal
}

/** "3d ago" style relative time from a unix-seconds timestamp. */
export function relTime(sec) {
  if (!sec) return "—"
  var d = Math.floor(Date.now() / 1000) - Number(sec)
  if (d < 60) return "just now"
  if (d < 3600) return Math.floor(d / 60) + "m ago"
  if (d < 86400) return Math.floor(d / 3600) + "h ago"
  if (d < 2592000) return Math.floor(d / 86400) + "d ago"
  return new Date(Number(sec) * 1000).toLocaleDateString()
}

/** Copy to clipboard, with a toast either way. */
export function copyText(text, okMsg) {
  try {
    navigator.clipboard.writeText(text).then(
      function () {
        toast(okMsg || "Copied to clipboard", "ok")
      },
      function () {
        toast("Clipboard blocked by the browser", "err")
      },
    )
  } catch (e) {
    toast("Clipboard blocked by the browser", "err")
  }
}

/** Trigger a client-side text download (no upload, no network). */
export function downloadText(filename, text) {
  var blob = new Blob([text], { type: "text/plain;charset=utf-8" })
  var url = URL.createObjectURL(blob)
  var a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(function () {
    URL.revokeObjectURL(url)
  }, 1000)
}

// Launching a tool while another one is still open replaces its DOM, but the
// replaced tool's Escape handler lives on `document` and would survive — firing
// its onClose guard (and an orphaned confirm) from a modal that is already gone.
//
// The handle has to live on `window`, not in a module variable: every payload
// bundles its own copy of this module, so Check Live's `activeEscHandler` and
// Approve's are different variables. A single well-known global is the only
// thing two separately-bundled GOADS tools both can see.
var ESC_SLOT = "__goadsBookmarkletEsc"

function retireEscHandler() {
  try {
    if (window[ESC_SLOT]) {
      document.removeEventListener("keydown", window[ESC_SLOT])
      window[ESC_SLOT] = null
    }
  } catch (e) {}
}

function injectStyle() {
  var old = document.getElementById(STYLE_ID)
  if (old) old.remove()
  var s = document.createElement("style")
  s.id = STYLE_ID
  s.textContent = shellCss(ROOT_ID, BACKDROP_ID)
  document.head.appendChild(s)
}

/**
 * Mount the GOADS modal.
 *
 * opts.title      — header title, e.g. "GOADS Check Live BM"
 * opts.subtitle   — header sub-line HTML (already escaped by the caller)
 * opts.stage      — HTML for the white card
 * opts.width      — CSS width of the shell (default 1000px)
 * opts.onClose    — optional guard; return false to keep the modal open
 *
 * Returns { root, close, alive } — the tool wires its own listeners inside
 * `stage`. `alive()` is false once this modal has been closed OR replaced by
 * another tool: all tools share the same element ids, so an async continuation
 * from tool A must never write into tool B's freshly-mounted DOM.
 */
export function openShell(opts) {
  // Sweep every GOADS modal, not just this shell's. The two older tools predate
  // the shared shell and still carry their own root ids, so without this a tool
  // launched over one of them would just stack on top of it.
  ;[ROOT_ID, BACKDROP_ID, "goads-bmi", "goads-bmi-backdrop", "goads-bmr", "goads-bmr-backdrop"].forEach(
    function (id) {
      var el = document.getElementById(id)
      if (el) el.remove()
    },
  )
  retireEscHandler()
  injectStyle()

  var backdrop = document.createElement("div")
  backdrop.id = BACKDROP_ID

  var root = document.createElement("div")
  root.id = ROOT_ID
  root.setAttribute("role", "dialog")
  root.setAttribute("aria-modal", "true")
  if (opts.width) root.style.setProperty("--w", opts.width)
  root.innerHTML =
    '<div class="gbk-header">' +
    '<span class="gbk-mark">' + LOGO_SVG + "</span>" +
    '<div class="gbk-htxt">' +
    '<h2 class="gbk-title">' + esc(opts.title) + "</h2>" +
    '<p class="gbk-sub">' + BRAND_HOST + " &nbsp;|&nbsp; " + (opts.subtitle || "") + "</p>" +
    "</div>" +
    '<button type="button" class="gbk-close" id="gbk-close" title="Close">' + ICON_CLOSE + "</button>" +
    "</div>" +
    '<div class="gbk-stage">' + (opts.stage || "") + "</div>" +
    '<div class="gbk-brand">' +
    '<a href="' + TELEGRAM_URL + '" target="_blank" rel="noreferrer">' + ICON_TELEGRAM + " Join Telegram · t.me/goadsagency</a>" +
    '<a href="' + WEBSITE_URL + '" target="_blank" rel="noreferrer">' + BRAND_HOST + "</a>" +
    "</div>"

  document.body.appendChild(backdrop)
  document.body.appendChild(root)

  function close() {
    if (opts.onClose && opts.onClose() === false) return
    root.remove()
    backdrop.remove()
    document.removeEventListener("keydown", onKey)
    try {
      if (window[ESC_SLOT] === onKey) window[ESC_SLOT] = null
    } catch (e) {}
  }
  function onKey(e) {
    if (e.key === "Escape") close()
  }
  try {
    window[ESC_SLOT] = onKey
  } catch (e) {}
  document.addEventListener("keydown", onKey)
  $("gbk-close").addEventListener("click", close)
  backdrop.addEventListener("click", close)

  return {
    root: root,
    close: close,
    alive: function () {
      return root.isConnected
    },
  }
}

/** Loading / error / empty screens for the card body. */
export function stateLoading(text) {
  return '<div class="gbk-state"><div class="gbk-spin"></div><div>' + esc(text) + "</div></div>"
}
export function stateError(msg) {
  return '<div class="gbk-state"><div class="gbk-err">' + esc(msg) + "</div></div>"
}
export function stateEmpty(text) {
  return '<div class="gbk-state"><div>' + esc(text) + "</div></div>"
}
