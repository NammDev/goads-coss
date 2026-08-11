/*
 * GOADS BM Invite — bookmarklet source (readable; built into a one-line
 * `javascript:` payload by build-bookmarklets.mjs).
 *
 * Transport layer mirrors the easyme.pro BM invite tool (GOADS is a partner) —
 * see docs/bookmark/BM-invite.md. Everything below that is GOADS-owned:
 *   - token probe, bmId lookup, both invite methods + their fallback order,
 *     role sets, success/error detection → easyme.pro, matched request-for-request
 *   - extra bmId/token fallbacks (URL, path, CurrentBusinessAccountID, EAAG/EAAB
 *     scrape) → this repo's extension/background.js `initFromBMTab`, kept as a
 *     last resort AFTER easyme's chain so we are a superset, never a downgrade
 *   - mail domain, tempmail deep-link → extension/content.js
 *   - visual language (dark shell + white cards, B/W) → extension/content.css
 *   - logo → app/src/components/layout/footer/logo-svg.tsx, inlined as SVG
 *
 * Why the logo is inline SVG and not an <img>: facebook.com ships a strict CSP.
 * An external or data: image can be blocked by `img-src`; inline SVG is markup,
 * not a resource load, so it always renders.
 *
 * Layout intentionally mirrors the tool this replaces (header → 2 columns:
 * email + role + actions on the left, status + notes on the right, links in the
 * footer) so it stays familiar; only the paint and the brand changed.
 */
(function () {
  "use strict";

  // ── Brand / endpoints ──────────────────────────────────────────────────────
  var BRAND_HOST = "goadsagency.com";
  var MAIL_DOMAIN = "goadsagency.com";
  var TEMPMAIL_URL = "https://goadsagency.com/tempmail";
  var TELEGRAM_URL = "https://t.me/goadsagency";
  var WEBSITE_URL = "https://goadsagency.com";
  var VERSION = "1.0";

  var ROOT_ID = "goads-bmi";
  var BACKDROP_ID = "goads-bmi-backdrop";
  var STYLE_ID = "goads-bmi-style";

  // Re-running the bookmarklet should reopen a clean tool, not stack overlays.
  // Sweep every GOADS modal, not just this tool's own: the library shares one
  // screen and a second modal stacked on the first is never what the user wants.
  [ROOT_ID, BACKDROP_ID, "goads-bk", "goads-bk-backdrop", "goads-bmi", "goads-bmi-backdrop", "goads-bmr", "goads-bmr-backdrop"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.remove();
  });

  var state = { token: null, bmId: null, uid: null, dtsg: null, busy: false };

  // ── Icons (stroke = currentColor so they inherit the B/W scheme) ───────────
  var I = {
    close:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    mail:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    role:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>',
    dice:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 8h.01M16 8h.01M8 16h.01M16 16h.01M12 12h.01"/></svg>',
    inbox:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
    send:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>',
    status:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>',
    notes:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 12H3m8 6H3m18-12H3"/><path d="m15 16 2 2 4-4"/></svg>',
    telegram:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>',
    check:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M20 6 9 17l-5-5"/></svg>',
    alert:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.3 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.3a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>',
  };

  // GOADS mark (G + panda), cropped from the full horizontal logo. The panda
  // silhouette is #000 so it reads as punch-through against the black chip,
  // exactly like the official mark.
  var LOGO_SVG =
    '<svg viewBox="26 28 182 182" role="img" aria-label="GOADS">' +
    '<circle cx="132.08" cy="117.68" r="51.45" fill="#000"/>' +
    '<path fill="#fff" d="M160.57,116.22c0-.22.17-.39.39-.39l20.09-.09,20.36.09c.22,0,.39.18.39.39v67.73c0,.13-.06.26-.17.33-19.07,13.59-45.14,20.85-69.1,20.85-52.54,0-90.95-35.58-90.95-85.77s38.41-85.77,91.89-85.77c30.71,0,52.07,13.97,68.33,33.34,0,0-10.89,10.09-11.05,10.23l-14.58,13.19c-.16.14-.41.13-.55-.03-11.25-12.29-24.13-18.09-39.79-18.09-29.29,0-48.47,19.98-47.05,50.25,1.16,24.75,21.81,44.01,46.59,44,8.63,0,16.8-1.62,24.96-5.31.14-.06.23-.21.23-.36v-44.59Z"/>' +
    '<path fill="#000" d="M94.19,139.84c.01.19-.12.37-.3.41-10.77,2.57-17.76-8.85-16.71-17.08.89-6.97,5.9-13.53,14.37-15.24.23-.05.45.13.47.36l2.17,31.54Z"/>' +
    '<path fill="#000" d="M113.91,77.99c-.2.03-.39-.09-.44-.28-2.26-8.41,7.59-14.88,14.74-14.69,6.07.16,11.81,3.64,13.41,10.27.05.22-.1.44-.33.48l-27.38,4.22Z"/>' +
    '<ellipse fill="#fff" cx="134.78" cy="115.01" rx="7.07" ry="3.47" transform="translate(-38.17 153.51) rotate(-53.03)"/>' +
    '<ellipse fill="#fff" cx="113.13" cy="121.16" rx="13.67" ry="10.11" transform="translate(-51.81 137.67) rotate(-52.68)"/>' +
    '<ellipse fill="#fff" cx="134.03" cy="93.75" rx="13.67" ry="10.11" transform="translate(-21.79 143.5) rotate(-52.68)"/>' +
    '<path fill="#fff" d="M111.12,109.97l4.11-2.31c2.73-1.53,4.77-4.04,5.71-7.03l1.55-4.9c.08-.25.38-.35.59-.21l13.01,8.86c.21.14.23.44.05.61l-2.39,2.21c-3.12,2.88-5.66,6.33-7.47,10.18l-2.97,6.3c-.12.26-.46.3-.65.09l-11.64-13.21c-.17-.19-.12-.48.1-.6Z"/>' +
    '<path fill="#000" d="M132.18,88.76l1.51,2.48c.29.48.95.55,1.33.15l.46-.48c.44-.46,1.22-.29,1.41.32l.99,3.01c.29.89-.87,1.52-1.46.79h0c-.32-.4-.92-.42-1.27-.05l-.75.79c-.35.37-.94.34-1.26-.05l-3.72-4.53c-.27-.33-.25-.81.04-1.12l1.39-1.46c.38-.4,1.04-.33,1.33.15Z"/>' +
    '<path fill="#000" d="M159.82,137.07c4.71-.18,10.65,3.47,11.41,8.54.57,3.78-.74,7.65-3.38,10.4-2.11,2.2-6.32,4.76-9.33,5.95-.25.1-.53-.07-.54-.34-.14-3.25-.88-20.25-1.05-24.05-.01-.26.22-.45.47-.4.65.14,1.74.04,2.01.04.08,0,.32-.15.4-.15Z"/>' +
    "</svg>";

  // ── Styles — tokens lifted from extension/content.css ─────────────────────
  var CSS =
    "#" +
    BACKDROP_ID +
    "{position:fixed;inset:0;background:rgba(2,3,8,.55);z-index:2147483646;animation:gbmiFade .15s ease}" +
    "#" +
    ROOT_ID +
    "{--bg:#020308;--fg:#fff;--chrome-sub:#ffffffb3;--chrome-muted:#ffffff70;--chrome-border:#ffffff29;--chrome-surface:#ffffff14;" +
    "--card:#fff;--card-border:#e6e7ec;--ink-strong:#171920;--ink:#343642;--ink-soft:#4c505f;" +
    "--btn:#020308;--btn-hover:#24262e;--err-bg:#fef2f2;--err-border:#fecaca;--err-fg:#b91c1c;" +
    "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:2147483647;" +
    "width:860px;max-width:calc(100vw - 32px);max-height:92vh;overflow-y:auto;overflow-x:hidden;" +
    "font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;" +
    "font-size:15px;line-height:1.5;color:var(--fg);background:var(--bg);" +
    "border:1px solid var(--chrome-border);border-radius:16px;box-shadow:0 24px 60px -16px rgba(0,0,0,.65);" +
    "animation:gbmiFade .2s ease;-webkit-font-smoothing:antialiased;box-sizing:border-box}" +
    "@keyframes gbmiFade{from{opacity:0}to{opacity:1}}" +
    "@keyframes gbmiSpin{to{transform:rotate(360deg)}}" +
    "#" +
    ROOT_ID +
    " *{box-sizing:border-box}" +
    // Facebook styles bare tags on its own pages, and a direct rule beats an
    // inherited value, so anything of ours that only inherited its colour picked
    // up FB's instead. Force these back to inheriting; our class rules are more
    // specific and still win where they apply.
    "#" + ROOT_ID + " h1,#" + ROOT_ID + " h2,#" + ROOT_ID + " h3,#" + ROOT_ID + " p,#" + ROOT_ID + " span,#" +
    ROOT_ID + " div,#" + ROOT_ID + " label,#" + ROOT_ID + " li,#" + ROOT_ID + " a{color:inherit}" +
    // header
    "#" +
    ROOT_ID +
    " .gbmi-header{display:flex;align-items:center;gap:13px;padding:16px 20px;border-bottom:1px solid var(--chrome-border);position:relative}" +
    "#" +
    ROOT_ID +
    " .gbmi-mark{width:46px;height:46px;flex-shrink:0;border-radius:12px;overflow:hidden;background:#000;border:1px solid var(--chrome-border);display:inline-flex;align-items:center;justify-content:center}" +
    "#" +
    ROOT_ID +
    " .gbmi-mark svg{width:100%;height:100%;display:block}" +
    "#" +
    ROOT_ID +
    " .gbmi-htxt{min-width:0}" +
    "#" +
    ROOT_ID +
    " .gbmi-title{margin:0;font-size:19px;font-weight:550;line-height:24px;letter-spacing:-.0144em;color:var(--fg)}" +
    "#" +
    ROOT_ID +
    " .gbmi-sub{margin:3px 0 0;font-size:13px;color:var(--chrome-sub);letter-spacing:-.006em}" +
    "#" +
    ROOT_ID +
    " .gbmi-close{position:absolute;right:14px;top:14px;width:28px;height:28px;border:0;border-radius:50%;background:var(--chrome-surface);color:var(--fg);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s}" +
    "#" +
    ROOT_ID +
    " .gbmi-close:hover{background:rgba(255,255,255,.2)}" +
    "#" +
    ROOT_ID +
    " .gbmi-close svg{width:15px;height:15px}" +
    // body / cards
    "#" +
    ROOT_ID +
    " .gbmi-body{display:grid;grid-template-columns:1fr 300px;gap:14px;padding:14px}" +
    "@media(max-width:760px){#" +
    ROOT_ID +
    " .gbmi-body{grid-template-columns:1fr}}" +
    "#" +
    ROOT_ID +
    " .gbmi-card{background:var(--card);border:1px solid var(--card-border);border-radius:14px;padding:18px;color:var(--ink)}" +
    "#" +
    ROOT_ID +
    " .gbmi-side{display:flex;flex-direction:column;gap:14px}" +
    "#" +
    ROOT_ID +
    " .gbmi-label{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:550;color:var(--ink-strong);margin-bottom:8px}" +
    "#" +
    ROOT_ID +
    " .gbmi-label svg{width:17px;height:17px;flex-shrink:0}" +
    "#" +
    ROOT_ID +
    " .gbmi-group{margin-bottom:16px}" +
    "#" +
    ROOT_ID +
    " .gbmi-row{display:flex;gap:8px;align-items:stretch}" +
    "#" +
    ROOT_ID +
    " .gbmi-input,#" +
    ROOT_ID +
    " .gbmi-select{flex:1;min-width:0;width:100%;padding:11px 13px;font:inherit;font-size:14px;color:var(--ink-strong);background:#fff;border:1px solid var(--card-border);border-radius:10px;outline:none;transition:border-color .15s}" +
    "#" +
    ROOT_ID +
    " .gbmi-input:focus,#" +
    ROOT_ID +
    " .gbmi-select:focus{border-color:#18181b}" +
    "#" +
    ROOT_ID +
    " .gbmi-input::placeholder{color:var(--ink-soft)}" +
    "#" +
    ROOT_ID +
    " .gbmi-iconbtn{width:42px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:#fff;border:1px solid var(--card-border);border-radius:10px;color:var(--ink-strong);cursor:pointer;transition:background .15s,border-color .15s}" +
    "#" +
    ROOT_ID +
    " .gbmi-iconbtn:hover{border-color:#18181b}" +
    "#" +
    ROOT_ID +
    " .gbmi-iconbtn svg{width:18px;height:18px}" +
    // buttons
    "#" +
    ROOT_ID +
    " .gbmi-actions{display:flex;gap:8px;margin-top:4px}" +
    "#" +
    ROOT_ID +
    " .gbmi-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:11px 16px;font:inherit;font-size:15px;font-weight:550;border-radius:10px;cursor:pointer;transition:background .15s,border-color .15s;border:1px solid transparent}" +
    "#" +
    ROOT_ID +
    " .gbmi-btn svg{width:17px;height:17px}" +
    "#" +
    ROOT_ID +
    " .gbmi-btn-primary{flex:1;background:var(--btn);color:#fff}" +
    "#" +
    ROOT_ID +
    " .gbmi-btn-primary:hover:not(:disabled){background:var(--btn-hover)}" +
    "#" +
    ROOT_ID +
    " .gbmi-btn-ghost{background:#fff;color:var(--ink-strong);border-color:var(--card-border)}" +
    "#" +
    ROOT_ID +
    " .gbmi-btn-ghost:hover{border-color:#18181b}" +
    "#" +
    ROOT_ID +
    " .gbmi-btn:disabled{opacity:.4;cursor:not-allowed}" +
    "#" +
    ROOT_ID +
    " .gbmi-spin{width:15px;height:15px;border:2px solid rgba(255,255,255,.35);border-top-color:#fff;border-radius:50%;animation:gbmiSpin .7s linear infinite}" +
    // status pills + result
    "#" +
    ROOT_ID +
    " .gbmi-stat{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 0;border-top:1px solid var(--card-border);font-size:13px}" +
    "#" +
    ROOT_ID +
    " .gbmi-stat:first-of-type{border-top:0}" +
    "#" +
    ROOT_ID +
    " .gbmi-key{color:var(--ink-soft)}" +
    "#" +
    ROOT_ID +
    " .gbmi-pill{max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:3px 9px;border-radius:6px;font-size:12px;font-weight:550;background:#fff;border:1px solid var(--card-border);color:#18181b}" +
    "#" +
    ROOT_ID +
    " .gbmi-pill.bad{background:var(--err-bg);border-color:var(--err-border);color:var(--err-fg)}" +
    "#" +
    ROOT_ID +
    " .gbmi-pill.ok{background:#f0fdf4;border-color:#bbf7d0;color:#16a34a}" +
    "#" +
    ROOT_ID +
    " .gbmi-note{font-size:13px;color:var(--ink-soft);line-height:1.55;margin:0;padding-left:16px}" +
    "#" +
    ROOT_ID +
    " .gbmi-note li{margin:3px 0}" +
    "#" +
    ROOT_ID +
    " .gbmi-result{margin-top:14px;display:none;align-items:flex-start;gap:9px;padding:12px 14px;border-radius:10px;font-size:13px;line-height:1.5;border:1px solid var(--card-border);background:#fff;color:var(--ink-strong)}" +
    "#" +
    ROOT_ID +
    " .gbmi-result.show{display:flex}" +
    "#" +
    ROOT_ID +
    " .gbmi-result.err{background:var(--err-bg);border-color:var(--err-border);color:var(--err-fg)}" +
    "#" +
    ROOT_ID +
    " .gbmi-result svg{width:16px;height:16px;flex-shrink:0;margin-top:1px}" +
    "#" +
    ROOT_ID +
    " .gbmi-result b{word-break:break-all}" +
    // "What happens next" list inside the success card.
    "#" +
    ROOT_ID +
    " .gbmi-next{margin:7px 0 0;padding-left:16px;color:var(--ink-soft);font-size:12.5px;line-height:1.5}" +
    "#" +
    ROOT_ID +
    " .gbmi-next ul{margin:4px 0 0;padding-left:16px}" +
    "#" +
    ROOT_ID +
    " .gbmi-next li{margin:3px 0}" +
    "#" +
    ROOT_ID +
    " .gbmi-next b{font-weight:550;color:var(--ink-strong);word-break:normal}" +
    "#" +
    ROOT_ID +
    " .gbmi-next a{color:var(--ink-strong);font-weight:550;text-decoration:underline;white-space:nowrap}" +
    // footer
    "#" +
    ROOT_ID +
    " .gbmi-footer{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:13px 20px;border-top:1px solid var(--chrome-border);font-size:13px;color:var(--chrome-muted)}" +
    "#" +
    ROOT_ID +
    " .gbmi-footer a{color:var(--chrome-sub);text-decoration:none;display:inline-flex;align-items:center;gap:6px}" +
    "#" +
    ROOT_ID +
    " .gbmi-footer a:hover{color:#fff;text-decoration:underline}" +
    "#" +
    ROOT_ID +
    " .gbmi-footer svg{width:15px;height:15px}";

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement("style");
    s.id = STYLE_ID;
    s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }

  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(id) {
    return document.getElementById(id);
  }

  // ── Session extraction ─────────────────────────────────────────────────────
  // Synchronous half: uid, dtsg, bmId. Reads only what the page already holds —
  // cookie, require() modules, loaded DOM. No network call.
  //
  // bmId order matches easyme.pro first (BusinessUnifiedNavigationContext), then
  // falls through to this repo's extension lookups. easyme reads the nav context
  // only, which is null on BM pages that never mounted it (asset-scoped URLs);
  // the extra steps recover those instead of dead-ending.
  function readSession() {
    var out = { bmId: null, dtsg: null, uid: null };

    var uidM = document.cookie.match(/c_user=(\d+)/);
    out.uid = uidM ? uidM[1] : null;

    try {
      out.dtsg = window.require("DTSG").getToken();
    } catch (e) {}
    if (!out.dtsg) {
      try {
        out.dtsg = window.require("DTSGInitData").token;
      } catch (e) {}
    }
    if (!out.dtsg) {
      var dm = document.documentElement.innerHTML.match(/"token":"(NAf[^"]+)"/);
      out.dtsg = dm ? dm[1] : null;
    }

    try {
      var nav = window.require("BusinessUnifiedNavigationContext");
      if (nav && nav.businessID) out.bmId = String(nav.businessID);
    } catch (e) {}
    if (!out.bmId) {
      var params = new URLSearchParams(window.location.search);
      out.bmId = params.get("business_id");
    }
    if (!out.bmId) {
      var pm = window.location.pathname.match(/^\/(\d{10,})(?:\/|$)/);
      if (pm) out.bmId = pm[1];
    }
    if (!out.bmId) {
      try {
        var ctx = window.require("CurrentBusinessAccountID");
        if (ctx) out.bmId = String(ctx);
      } catch (e) {}
    }

    return out;
  }

  // Asynchronous half: the access token. easyme.pro pulls an EAAI token out of
  // the bootloader endpoint rather than scraping the DOM — that token is the one
  // its invite calls are authorised against, so we fetch it the same way and in
  // the same order. The DOM scrape stays as a third fallback only.
  function probeBootloaderToken() {
    return fetch(
      "https://business.facebook.com/ajax/bootloader-endpoint/?modules=AdsCanvasComposerDialog.react&__a=1",
      { credentials: "include" }
    )
      .then(function (resp) {
        return resp.text();
      })
      .then(function (text) {
        var m = text.match(/"access_token":"(EAAI[^"]+)"/);
        return (m && m[1]) || "";
      })
      .catch(function () {
        return "";
      });
  }

  function scrapeTokenFromDom() {
    var html = document.documentElement.innerHTML;
    var tm = html.match(/EAAG[A-Za-z0-9]+/g) || html.match(/EAAB[A-Za-z0-9]+/g);
    if (!tm) return null;
    var uniq = [];
    for (var j = 0; j < tm.length; j++) if (uniq.indexOf(tm[j]) === -1) uniq.push(tm[j]);
    uniq.sort(function (a, b) {
      return b.length - a.length;
    });
    return uniq[0];
  }

  function getAccessToken() {
    return probeBootloaderToken().then(function (token) {
      if (token) return token;
      try {
        var viaModule = window.require("WebApiApplication").getAccessToken();
        if (viaModule) return viaModule;
      } catch (e) {}
      return scrapeTokenFromDom() || null;
    });
  }

  // ── Invite ─────────────────────────────────────────────────────────────────
  // Both methods below are matched to easyme.pro request-for-request: same Graph
  // version, same URLs, same header set, same body layout, same role strings.
  // The role strings stay PRE-ENCODED exactly as easyme sends them — re-encoding
  // them ourselves would produce different bytes on the wire.
  //
  // Note on `%` in these literals: a `javascript:` URL is percent-decoded before
  // it runs, so build-bookmarklets.mjs escapes every `%` to `%25` and asserts the
  // payload round-trips. That keeps these strings intact in the built payload.

  // Method 1 — direct Graph edge. easyme's primary path.
  var ROLES_M1_ADMIN =
    "%5B%22DEFAULT%22%2C%22MANAGE%22%2C%22DEVELOPER%22%2C%22EMPLOYEE%22%2C%22ASSET_MANAGE%22%2C%22ASSET_VIEW%22%2C%22PEOPLE_MANAGE%22%2C%22PEOPLE_VIEW%22%2C%22PARTNERS_VIEW%22%2C%22PARTNERS_MANAGE%22%2C%22PROFILE_MANAGE%22%5D";
  var ROLES_M1_EMPLOYEE = "%5B%22EMPLOYEE%22%5D";

  // Method 2 — batch fallback. The role fragment carries its own leading `=` and
  // the closing `"}]` of the batch JSON, exactly as easyme concatenates it.
  var ROLES_M2_ADMIN =
    "%3D%5B%5C%22DEFAULT%5C%22%2C%5C%22MANAGE%5C%22%2C%5C%22DEVELOPER%5C%22%2C%5C%22EMPLOYEE%5C%22%2C%5C%22ASSET_MANAGE%5C%22%2C%5C%22ASSET_VIEW%5C%22%2C%5C%22PEOPLE_MANAGE%5C%22%2C%5C%22PEOPLE_VIEW%5C%22%2C%5C%22PARTNERS_VIEW%5C%22%2C%5C%22PARTNERS_MANAGE%5C%22%2C%5C%22PROFILE_MANAGE%5C%22%5D%22%7D%5D";
  var ROLES_M2_EMPLOYEE = "%3D%5B%5C%22EMPLOYEE%5C%22%5D%22%7D%5D";

  function inviteViaGraphEdge(token, bmId, email, isAdmin) {
    var roles = isAdmin ? ROLES_M1_ADMIN : ROLES_M1_EMPLOYEE;
    return fetch(
      // `locale=en_US` matches Method 2 — without it Graph answers in the
      // account's own language and the error line comes back half-Vietnamese.
      "https://graph.facebook.com/v19.0/" +
        bmId +
        "/business_users?access_token=" +
        token +
        "&locale=en_US",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body:
          "brandId=" +
          bmId +
          "&email=" +
          encodeURIComponent(email) +
          "&invite_origin=BM_INVITE_USER_FLOW&method=post&roles=" +
          roles +
          "&suppress_http_code=1",
        credentials: "include",
      }
    ).then(function (resp) {
      return resp.json();
    });
  }

  function inviteViaBatch(token, bmId, email, isAdmin) {
    var roles = isAdmin ? ROLES_M2_ADMIN : ROLES_M2_EMPLOYEE;
    return fetch(
      "https://graph.facebook.com/v19.0?access_token=" + token + "&suppress_http_code=1&locale=en_US",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body:
          "batch=%5B%7B%22method%22%3A%22POST%22%2C%22relative_url%22%3A%22%2Fv3.0%2F" +
          bmId +
          "%2Fbusiness_users%22%2C%22body%22%3A%22brandId%3D" +
          bmId +
          "%26email%3D" +
          encodeURIComponent(email) +
          "%26roles" +
          roles +
          "&method=post&suppress_http_code=1",
        credentials: "include",
      }
    )
      .then(function (resp) {
        return resp.json();
      })
      .then(function (data) {
        // Batch replies wrap the real payload in [{ body: "<json string>" }].
        if (Array.isArray(data) && data[0] && data[0].body) {
          return typeof data[0].body === "string" ? JSON.parse(data[0].body) : data[0].body;
        }
        return data;
      });
  }

  // easyme's verdict: any `error`/`errors` key is a failure, otherwise the invite
  // counts as sent once the reply mentions PENDING or carries an id.
  function isInviteSuccess(data) {
    if (!data) return false;
    if (data.error || data.errors) return false;
    return JSON.stringify(data).indexOf("PENDING") !== -1 || !!data.id;
  }

  // A sent invite is not always immediately usable. Depending on the BM's own
  // settings Facebook holds it behind one of two gates: a second admin has to
  // approve the request, or the invitee has to open a confirmation Facebook mails
  // them. "Pending until accepted" is wrong for both, so read the reply and say
  // which gate it is — the status strings Facebook uses name themselves.
  //
  // Returns "approval" | "email" | "unknown". Unknown is the common case: the
  // Graph edge often answers with nothing but `{"id":…}`. That is not a reason to
  // guess — the caller lists both gates instead.
  function classifyPending(data) {
    var raw = "";
    try {
      raw = JSON.stringify(data) || "";
    } catch (e) {}

    var approval = /SECOND[_\s-]?ADMIN|ADMIN[_\s-]?APPROVAL|APPROVAL[_\s-]?REQUIRED|PENDING[_\s-]?APPROVAL|REQUIRES?[_\s-]?APPROVAL|APPROVER/i.test(raw);
    var emailGate = /EMAIL[_\s-]?VERIF|VERIFY[_\s-]?EMAIL|EMAIL[_\s-]?CONFIRM|CONFIRMATION[_\s-]?CODE|PENDING[_\s-]?EMAIL/i.test(raw);

    if (approval && !emailGate) return "approval";
    if (emailGate && !approval) return "email";
    return "unknown";
  }

  // The two gates as customer-facing steps. The inbox link is only offered for
  // GOADS addresses, since that is the only mailbox we can actually open for them.
  function nextStepsHtml(kind, email) {
    var inboxLink = "";
    if (String(email).toLowerCase().indexOf("@" + MAIL_DOMAIN) !== -1) {
      inboxLink =
        ' <a href="' +
        TEMPMAIL_URL +
        "#mailbox=" +
        encodeURIComponent(String(email).split("@")[0]) +
        '" target="_blank" rel="noreferrer">Open inbox</a>';
    }

    var approvalStep =
      "<li><b>A second admin must approve it.</b> Ask another admin of this Business Manager to open " +
      "Business Settings → People → Pending and approve the request.</li>";
    var emailStep =
      "<li><b>The invite must be confirmed by email.</b> Open the inbox for <b>" +
      esc(email) +
      "</b> and finish the confirmation Facebook just sent." +
      inboxLink +
      "</li>";

    if (kind === "approval") return '<ul class="gbmi-next">' + approvalStep + "</ul>";
    if (kind === "email") return '<ul class="gbmi-next">' + emailStep + "</ul>";

    return (
      '<ul class="gbmi-next"><li>It stays “Pending” until the user accepts.</li>' +
      "<li>Some Business Managers add one more gate before that — if it does not go through, it is one of these:" +
      "<ul>" +
      approvalStep +
      emailStep +
      "</ul></li></ul>"
    );
  }

  // The tool is English-only, but Facebook still localises some replies to the
  // account's language no matter what `locale` we ask for. Anything carrying
  // non-ASCII text is therefore not English and gets swapped for the English
  // wording of the case it almost always is — a BM that refused the address.
  function englishOnly(msg) {
    var text = String(msg == null ? "" : msg);
    if (!text) return "";
    return /[^\x00-\x7F]/.test(text) ? "The user cannot be added to this business." : text;
  }

  function extractErrorMessage(data) {
    if (!data) return "No response";
    return englishOnly(
      (data.error && (data.error.error_user_msg || data.error.message)) ||
        JSON.stringify(data).slice(0, 200)
    );
  }

  // Graph edge first, batch second — the same order and the same "try both before
  // reporting" contract easyme uses. Resolves with the winning method so the
  // result line can say which one landed.
  function sendInvite(bmId, token, email, isAdmin) {
    var err1 = null;
    var err2 = null;

    return inviteViaGraphEdge(token, bmId, email, isAdmin)
      .then(function (data) {
        if (isInviteSuccess(data)) return { success: true, data: data, method: 1 };
        err1 = extractErrorMessage(data);
        return null;
      })
      .catch(function (e) {
        err1 = englishOnly(e.message) || "Method 1 exception";
        return null;
      })
      .then(function (won) {
        if (won) return won;
        return inviteViaBatch(token, bmId, email, isAdmin)
          .then(function (data) {
            if (isInviteSuccess(data)) return { success: true, data: data, method: 2 };
            err2 = extractErrorMessage(data);
            return null;
          })
          .catch(function (e) {
            err2 = englishOnly(e.message) || "Method 2 exception";
            return null;
          });
      })
      .then(function (won) {
        if (won) return won;
        // Both methods usually fail for the same reason; printing that reason
        // twice behind "Method 1: … | Method 2: …" just makes it look broken.
        return {
          success: false,
          error: err1 === err2 ? String(err1) : "Method 1: " + err1 + " | Method 2: " + err2,
          method1Error: err1,
          method2Error: err2,
        };
      });
  }

  // Facebook answers a blocked account with a reauth/checkpoint payload whose raw
  // JSON is useless to a customer. Swap those two cases for something actionable;
  // every other error is passed through as Facebook worded it.
  function friendlyError(raw) {
    var text = String(raw || "");
    if (/\breauth\b/i.test(text)) {
      return "Facebook needs you to re-verify this account before inviting. Open business.facebook.com, finish the security check, then try again.";
    }
    if (/checkpoint/i.test(text)) {
      return "This account hit a Facebook checkpoint. Resolve it on facebook.com, then retry.";
    }
    return englishOnly(text) || "Invite failed.";
  }

  // ── UI ─────────────────────────────────────────────────────────────────────
  injectStyle();

  var backdrop = document.createElement("div");
  backdrop.id = BACKDROP_ID;

  var root = document.createElement("div");
  root.id = ROOT_ID;
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-modal", "true");
  root.innerHTML =
    '<div class="gbmi-header">' +
    '<span class="gbmi-mark">' +
    LOGO_SVG +
    "</span>" +
    '<div class="gbmi-htxt">' +
    '<h2 class="gbmi-title">GOADS BM Invite Tool</h2>' +
    '<p class="gbmi-sub">' +
    BRAND_HOST +
    " &nbsp;|&nbsp; Invite users to Business Manager via email</p>" +
    "</div>" +
    '<button type="button" class="gbmi-close" id="gbmi-close" title="Close">' +
    I.close +
    "</button>" +
    "</div>" +
    '<div class="gbmi-body">' +
    '<div class="gbmi-card">' +
    '<div class="gbmi-group">' +
    '<div class="gbmi-label">' +
    I.mail +
    " Email</div>" +
    '<div class="gbmi-row">' +
    '<input type="email" class="gbmi-input" id="gbmi-email" placeholder="name@' +
    MAIL_DOMAIN +
    '" autocomplete="off" spellcheck="false">' +
    '<button type="button" class="gbmi-iconbtn" id="gbmi-gen" title="Generate a free GOADS email">' +
    I.dice +
    "</button>" +
    '<button type="button" class="gbmi-iconbtn" id="gbmi-inbox" title="Open GOADS Tempmail inbox">' +
    I.inbox +
    "</button>" +
    "</div>" +
    "</div>" +
    '<div class="gbmi-group">' +
    '<div class="gbmi-label">' +
    I.role +
    " Role</div>" +
    '<select class="gbmi-select" id="gbmi-role">' +
    '<option value="ADMIN">Admin (Full access)</option>' +
    '<option value="EMPLOYEE">Employee (Partial access)</option>' +
    "</select>" +
    "</div>" +
    '<div class="gbmi-actions">' +
    '<button type="button" class="gbmi-btn gbmi-btn-ghost" id="gbmi-cancel">Cancel</button>' +
    '<button type="button" class="gbmi-btn gbmi-btn-primary" id="gbmi-send" disabled>' +
    '<span id="gbmi-sendIcon">' +
    I.send +
    "</span><span id=\"gbmi-sendLabel\">Send Invite</span></button>" +
    "</div>" +
    '<div class="gbmi-result" id="gbmi-result"></div>' +
    "</div>" +
    '<div class="gbmi-side">' +
    '<div class="gbmi-card">' +
    '<div class="gbmi-label">' +
    I.status +
    " Status</div>" +
    '<div class="gbmi-stat"><span class="gbmi-key">Token</span><span class="gbmi-pill" id="gbmi-pillToken">Checking…</span></div>' +
    '<div class="gbmi-stat"><span class="gbmi-key">Business Manager</span><span class="gbmi-pill" id="gbmi-pillBM">Checking…</span></div>' +
    "</div>" +
    '<div class="gbmi-card">' +
    '<div class="gbmi-label">' +
    I.notes +
    " Notes</div>" +
    '<ul class="gbmi-note">' +
    "<li>Run this on your Business Manager page.</li>" +
    "<li>Use an email you can actually open.</li>" +
    "<li>Some Business Managers also need a second admin to approve, or an email confirmation.</li>" +
    "</ul>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div class="gbmi-footer">' +
    '<a href="' +
    TELEGRAM_URL +
    '" target="_blank" rel="noreferrer">' +
    I.telegram +
    " Join Telegram · t.me/goadsagency</a>" +
    '<a href="' +
    WEBSITE_URL +
    '" target="_blank" rel="noreferrer">' +
    BRAND_HOST +
    "</a>" +
    "</div>";

  document.body.appendChild(backdrop);
  document.body.appendChild(root);

  // ── Wiring ────────────────────────────────────────────────────────────────
  function close() {
    root.remove();
    backdrop.remove();
    document.removeEventListener("keydown", onKey);
  }
  function onKey(e) {
    if (e.key === "Escape") close();
  }
  document.addEventListener("keydown", onKey);
  $("gbmi-close").addEventListener("click", close);
  backdrop.addEventListener("click", close);

  function showResult(kind, html) {
    var el = $("gbmi-result");
    el.className = "gbmi-result show" + (kind === "error" ? " err" : "");
    el.innerHTML = (kind === "error" ? I.alert : I.check) + "<div>" + html + "</div>";
  }

  function refreshSendBtn() {
    var email = $("gbmi-email").value.trim();
    var valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    $("gbmi-send").disabled = !(valid && state.token && state.bmId) || state.busy;
  }

  $("gbmi-email").addEventListener("input", refreshSendBtn);
  $("gbmi-email").addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !$("gbmi-send").disabled) doSend();
  });

  $("gbmi-cancel").addEventListener("click", function () {
    $("gbmi-email").value = "";
    $("gbmi-result").className = "gbmi-result";
    refreshSendBtn();
  });

  // Random local part + the GOADS receiving domain, so the invite lands in a
  // mailbox the customer can open at /tempmail. Shared by the dice button and
  // the initial boot (so the field is pre-filled, no click needed).
  function fillRandomEmail(focus) {
    var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    var name = "";
    for (var i = 0; i < 10; i++) name += charset.charAt(Math.floor(Math.random() * charset.length));
    $("gbmi-email").value = name + "@" + MAIL_DOMAIN;
    if (focus) $("gbmi-email").focus();
    refreshSendBtn();
  }
  $("gbmi-gen").addEventListener("click", function () {
    fillRandomEmail(true);
  });

  // Deep-link straight to that address's inbox when it is a GOADS one.
  $("gbmi-inbox").addEventListener("click", function () {
    var email = $("gbmi-email").value.trim().toLowerCase();
    if (email && email.endsWith("@" + MAIL_DOMAIN)) {
      window.open(TEMPMAIL_URL + "#mailbox=" + encodeURIComponent(email.split("@")[0]), "_blank");
    } else {
      window.open(TEMPMAIL_URL, "_blank");
    }
  });

  function doSend() {
    var email = $("gbmi-email").value.trim();
    if (!email || !state.token || !state.bmId || state.busy) return;

    var isAdmin = $("gbmi-role").value === "ADMIN";

    state.busy = true;
    $("gbmi-send").disabled = true;
    $("gbmi-cancel").disabled = true;
    $("gbmi-sendIcon").innerHTML = '<span class="gbmi-spin"></span>';
    $("gbmi-sendLabel").textContent = "Sending…";
    $("gbmi-result").className = "gbmi-result";

    sendInvite(state.bmId, state.token, email, isAdmin).then(function (res) {
      state.busy = false;
      $("gbmi-cancel").disabled = false;
      $("gbmi-sendIcon").innerHTML = I.send;
      $("gbmi-sendLabel").textContent = "Send Invite";
      refreshSendBtn();

      if (res.success) {
        showResult(
          "ok",
          "Invite sent to <b>" +
            esc(email) +
            "</b> as " +
            (isAdmin ? "Admin" : "Employee") +
            nextStepsHtml(classifyPending(res.data), email)
        );
      } else {
        showResult("error", esc(friendlyError(res.error)));
      }
    });
  }
  $("gbmi-send").addEventListener("click", doSend);

  // ── Boot: read the session and reflect it in the Status card ──────────────
  // uid/dtsg/bmId are readable synchronously; the token now costs a fetch, so the
  // Token pill stays on "Checking…" until that settles rather than flashing a
  // wrong "Not found" first.
  var s = readSession();
  state.bmId = s.bmId;
  state.uid = s.uid;
  state.dtsg = s.dtsg;

  var bmPill = $("gbmi-pillBM");
  if (state.bmId) {
    bmPill.textContent = state.bmId;
    bmPill.title = state.bmId;
    bmPill.className = "gbmi-pill ok";
  } else {
    bmPill.textContent = "Not detected";
    bmPill.className = "gbmi-pill bad";
  }

  getAccessToken().then(function (token) {
    state.token = token;

    var tokenPill = $("gbmi-pillToken");
    if (state.token) {
      tokenPill.textContent = "Valid";
      tokenPill.className = "gbmi-pill ok";
    } else {
      tokenPill.textContent = "Not found";
      tokenPill.className = "gbmi-pill bad";
    }

    if (!state.uid) {
      showResult("error", "You are not logged in to Facebook. Log in, then run the tool again.");
    } else if (!state.token) {
      showResult(
        "error",
        "Couldn’t read an access token from this page. Refresh Business Manager and retry."
      );
    } else if (!state.bmId) {
      showResult(
        "error",
        "No Business Manager detected. Open your Business Manager at business.facebook.com, then run the tool there."
      );
    }

    refreshSendBtn();
  });

  // Pre-fill a ready-to-use GOADS email so the customer can send immediately —
  // they can still overwrite it or roll a new one with the dice button.
  fillRandomEmail(false);

  refreshSendBtn();
  $("gbmi-email").focus();
})();
