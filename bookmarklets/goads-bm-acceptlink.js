/*
 * GOADS Accept BM Link — bookmarklet source (readable; built into a one-line
 * `javascript:` payload by build-bookmarklets.mjs).
 *
 * Paste ONE Business Manager invitation link and accept it with the account you
 * are signed in as — no verification code, no email round trip. This is the
 * "accept link without code" flow: the tool pulls the invitation token out of
 * the URL and calls Facebook's business-app accept mutation directly with your
 * own Graph access token.
 *
 * Layout: a single link field + Accept, and the link shows as one row in a table
 * whose Message column carries the live step and final result — a taller,
 * list-style card (not a compact box). One link at a time by design.
 *
 * Ported first-party from this repo's "Nhận link" extension
 * (docs/acceptlinkwithoutcode/). Only the code-free path is reproduced — it needs
 * nothing but the user's own session:
 *   - accept mutation (b-graph business-app graphql, doc_id 6857625997606127,
 *     first_name "Xmeta", last_name = actor id) → extension dashboard_re.js
 *     `invitationLinkNoveri`, matched request-for-request
 *   - token extraction from `invitation/?token=` links → `extractTokenFromUrl`
 *   - session bootstrap (access token + actor id) → `extractBMData`
 *   - shell + brand → the rest of the GOADS bookmarklet library
 *
 * Everything uses the user's own cookies (credentials:"include") and nothing is
 * ever sent anywhere but Facebook.
 */
import { $, BRAND, esc, openShell, stateEmpty, timeoutSignal, toast } from "./shared/goads-shell.js"
import { readAccessToken, readUserId } from "./shared/goads-fb-session.js"
import { ICON_CHECK, ICON_TICKET } from "./shared/goads-icons.js"

;(function () {
  "use strict"

  var GRAPH = "https://b-graph.facebook.com/graphql?locale=en_US"
  var ACCEPT_DOC_ID = "6857625997606127"
  var REQUEST_TIMEOUT_MS = 25000
  // The admin name the accepted account shows up as, inside the target Business
  // Manager. Facebook builds it from first_name + last_name; we brand the first
  // name and keep the uid as the last name → "<Brand> Agency <uid>" (e.g.
  // "GOADS Agency <uid>"). (The extension this was ported from used "Xmeta".)
  var ADMIN_FIRST_NAME = BRAND.name + " Agency"

  // Where the accept call actually works. On plain facebook.com the page only
  // holds a www token, and the cross-origin fetch to business.facebook.com is
  // CORS-blocked — so the business token can't be reached from there.
  var RUN_SURFACE = "https://adsmanager.facebook.com/"
  function onBusinessSurface() {
    var h = location.hostname
    return /(^|\.)business\.facebook\.com$/.test(h) || h === "adsmanager.facebook.com"
  }

  var shell = null
  var state = {
    token: null,
    actorId: null,
    busy: false,
    row: null, // { link, token, status:"ok"|"error"|null, step, error }
    phase: 0, // 0 idle · 1 read session · 2 accepting · 3 done
  }

  function alive() {
    return !!shell && shell.alive()
  }

  // ── Session bootstrap ────────────────────────────────────────────────────────

  /**
   * Resolve { token, actorId } for the accept call. Tries the fast local read,
   * then falls back to the extension's approach: GET
   * business.facebook.com/latest/settings/ and scrape the token + actor id (works
   * same-origin on a business surface; carries the shared .facebook.com cookies).
   */
  async function bootstrapSession() {
    var token = readAccessToken()
    var actorId = readUserId()
    if (token && actorId) return { token: token, actorId: actorId }

    try {
      var res = await fetch("https://business.facebook.com/latest/settings/", {
        credentials: "include",
        signal: timeoutSignal(REQUEST_TIMEOUT_MS),
      })
      var html = await res.text()
      if (!token) {
        var after = html.split("EAAG")[1]
        if (after) {
          var t = "EAAG" + after.split('"')[0]
          if (t.length > 20) token = t
        }
      }
      if (!actorId) {
        var am = html.match(/"actorID":"(\d+)"/) || html.match(/"USER_ID":"(\d+)"/)
        if (am) actorId = am[1]
      }
    } catch (e) {}

    return { token: token, actorId: actorId }
  }

  // ── Accept ───────────────────────────────────────────────────────────────────

  /** One invitation token → { status:"ok" } or { status:"error", error }. */
  async function acceptOne(invitationToken) {
    try {
      var res = await fetch(GRAPH, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          access_token: state.token,
          variables: JSON.stringify({
            input: {
              first_name: ADMIN_FIRST_NAME,
              invitation_token: invitationToken,
              last_name: state.actorId,
              receive_marketing_messages: false,
              user_preferred_business_email: state.actorId + "@facebook.com",
            },
          }),
          doc_id: ACCEPT_DOC_ID,
        }),
        credentials: "include",
        signal: timeoutSignal(REQUEST_TIMEOUT_MS),
      })
      var data = await res.json()
      if (data && data.errors && data.errors.length) {
        return { status: "error", error: data.errors[0].description || data.errors[0].message || "Rejected" }
      }
      if (
        data &&
        data.data &&
        data.data.bizapp_accept_invitation &&
        data.data.bizapp_accept_invitation.invitation_token
      ) {
        return { status: "ok" }
      }
      return { status: "error", error: "Unexpected response from Facebook" }
    } catch (e) {
      return {
        status: "error",
        error: e && e.name === "AbortError" ? "Timed out" : (e && e.message) || "Network error",
      }
    }
  }

  /** Pull the invitation token out of a `…/invitation/?token=…` URL. */
  function tokenFromLink(link) {
    var m = link.match(/invitation\/\?token=([^&\s|]+)/)
    if (m) return m[1]
    m = link.match(/[?&]token=([^&\s|]+)/)
    return m ? m[1] : null
  }

  // ── Rendering ────────────────────────────────────────────────────────────────

  function messageCell(r) {
    if (r.status === "ok") return '<span class="gbk-act ok">Accepted — added to your account</span>'
    if (r.status === "error") return '<span class="gbk-act err">' + esc(r.error || "Error") + "</span>"
    if (r.step) return '<span class="gbk-act pend">' + esc(r.step) + "</span>"
    return '<span class="gbk-soft">Ready</span>'
  }

  function renderStepper() {
    if (!alive()) return
    var el = $("gbk-steps")
    if (!el) return
    var steps = ["Read session", "Accept", "Done"]
    el.innerHTML = steps
      .map(function (label, i) {
        var n = i + 1
        var cls = state.phase > n ? "done" : state.phase === n ? "active" : ""
        var mark = state.phase > n ? ICON_CHECK : String(n)
        return (
          '<span class="gbk-step ' + cls + '"><span class="gbk-step-n">' + mark + "</span>" + esc(label) + "</span>" +
          (n < steps.length ? '<span class="gbk-step-sep"></span>' : "")
        )
      })
      .join("")
  }

  function renderTable() {
    if (!alive()) return
    var wrap = $("gbk-tablewrap")
    if (!wrap) return
    if (!state.row) {
      wrap.innerHTML = stateEmpty("Paste an invitation link above, then press Accept.")
      return
    }
    var r = state.row
    wrap.innerHTML =
      "<table><thead><tr>" +
      '<th style="width:52px">#</th><th>Link</th><th style="width:44%">Message</th>' +
      "</tr></thead><tbody><tr>" +
      '<td class="gbk-soft">1</td>' +
      '<td class="gbk-name" style="max-width:340px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="' + esc(r.link) + '">' + esc(r.link) + "</td>" +
      "<td>" + messageCell(r) + "</td>" +
      "</tr></tbody></table>"
  }

  // `label` names the current step so the button reports progress too.
  function setBusy(on, label) {
    state.busy = on
    if (!alive()) return
    var btn = $("gbk-accept")
    var input = $("gbk-link")
    btn.disabled = on
    input.disabled = on
    btn.innerHTML = on ? '<span class="gbk-btn-spin"></span> ' + esc(label || "Working…") : ICON_CHECK + " Accept"
  }

  // ── Run ──────────────────────────────────────────────────────────────────────

  async function doAccept() {
    if (state.busy) return
    var link = $("gbk-link").value.trim()
    if (!link) {
      toast("Paste an invitation link", "err")
      return
    }
    var token = tokenFromLink(link)

    // Show the link as a row straight away (this is the "shows the link" feel).
    state.row = { link: link, token: token, status: null, step: "", error: "" }
    state.phase = 0
    renderStepper()
    renderTable()

    if (!token) {
      state.row.status = "error"
      state.row.error = "Not a Business Manager invitation link (needs /invitation/?token=)"
      renderTable()
      return
    }

    // Step 1 — session. If the page didn't hand us a token, fetch it. Shown both on
    // the button and in the row's Message so the wait isn't silent.
    if (!state.token || !state.actorId) {
      state.phase = 1
      renderStepper()
      state.row.step = "Reading session…"
      renderTable()
      setBusy(true, "Reading session…")
      var s = await bootstrapSession()
      if (!alive()) return
      state.token = s.token
      state.actorId = s.actorId
    }
    if (!state.token || !state.actorId) {
      setBusy(false)
      state.phase = 0
      renderStepper()
      state.row.status = "error"
      state.row.step = ""
      state.row.error = onBusinessSurface()
        ? "Couldn't read your session — refresh this page and retry"
        : "Open Ads Manager (button above) and run this bookmarklet there"
      renderTable()
      return
    }

    // Step 2 — accept.
    state.phase = 2
    renderStepper()
    state.row.step = "Accepting…"
    renderTable()
    setBusy(true, "Accepting…")
    var r = await acceptOne(token)
    if (!alive()) return
    setBusy(false)

    state.row.step = ""
    state.row.status = r.status
    state.row.error = r.error || ""
    state.phase = 3
    renderStepper()
    renderTable()
    toast(r.status === "ok" ? "Invitation accepted" : "Accept failed", r.status === "ok" ? "ok" : "err")
  }

  // ── Boot ─────────────────────────────────────────────────────────────────────

  var onBiz = onBusinessSurface()

  // Shown only when opened somewhere the accept can't run (e.g. plain
  // facebook.com). The field + Accept are disabled here (see boot), so this banner
  // is the only action — and it spells out that the bookmarklet must be RE-RUN on
  // Ads Manager, because a bookmarklet doesn't survive the page navigation.
  var jumpBanner = onBiz
    ? ""
    : '<div style="margin:0 0 12px;padding:12px 14px;border-radius:10px;font-size:13px;line-height:1.5;background:var(--warn-bg);border:1px solid var(--warn-border);color:var(--warn)">' +
      "<div style=\"font-weight:700;margin-bottom:4px\">This tool can't accept links from facebook.com</div>" +
      "<div>Open <b>Ads Manager</b>, then <b>run this bookmarklet again there</b> — clicking below just navigates the tab, it does not carry the tool over.</div>" +
      '<button type="button" class="gbk-btn gbk-btn-sm gbk-btn-primary" id="gbk-goto" style="margin-top:10px">Open Ads Manager</button>' +
      "</div>"

  var STAGE =
    "<style>" +
    "#goads-bk .gbk-btn-spin{width:14px;height:14px;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;display:inline-block;animation:gbkSpin .7s linear infinite}" +
    "#goads-bk .gbk-steprail{display:flex;align-items:center;gap:8px;padding:12px 16px;border-bottom:1px solid var(--card-border);flex-wrap:wrap}" +
    "#goads-bk .gbk-step{display:inline-flex;align-items:center;gap:7px;font-size:12.5px;font-weight:600;color:var(--ink-soft)}" +
    "#goads-bk .gbk-step-n{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:var(--mute-bg);color:var(--ink-soft);font-size:11px;border:1px solid var(--card-border)}" +
    "#goads-bk .gbk-step-n svg{width:12px;height:12px}" +
    "#goads-bk .gbk-step.active{color:var(--ink-strong)}" +
    "#goads-bk .gbk-step.active .gbk-step-n{background:var(--btn);color:#fff;border-color:var(--btn)}" +
    "#goads-bk .gbk-step.done{color:var(--ok)}" +
    "#goads-bk .gbk-step.done .gbk-step-n{background:var(--ok-bg);color:var(--ok);border-color:var(--ok-border)}" +
    "#goads-bk .gbk-step-sep{flex:1;min-width:16px;height:1px;background:var(--card-border)}" +
    "</style>" +
    // Toolbar: single link field + Accept.
    '<div class="gbk-toolbar" style="flex-direction:column;align-items:stretch;gap:10px">' +
    jumpBanner +
    '<div style="display:flex;gap:8px;align-items:stretch">' +
    '<div class="gbk-field" style="flex:1">' +
    ICON_TICKET +
    '<input id="gbk-link" type="text" spellcheck="false" autocomplete="off" placeholder="https://business.facebook.com/invitation/?token=…"></div>' +
    '<button type="button" class="gbk-btn gbk-btn-primary" id="gbk-accept">' + ICON_CHECK + " Accept</button>" +
    "</div>" +
    '<span class="gbk-count gbk-soft">Accepts one invitation link with the account you\'re signed in as — no verification code. Run it on Ads Manager or Business Manager.</span>' +
    "</div>" +
    // Step rail.
    '<div class="gbk-steprail" id="gbk-steps"></div>' +
    // The link row + its Message.
    '<div class="gbk-tablewrap" id="gbk-tablewrap"></div>'

  // Fast local read first; a miss here is not fatal — doAccept() fetches the
  // session on click.
  state.token = readAccessToken()
  state.actorId = readUserId()

  shell = openShell({
    title: BRAND.name + " Accept BM Link",
    subtitle:
      state.token && state.actorId
        ? 'Session <span class="gbk-mono">detected</span>'
        : 'Session <span class="gbk-mono">resolved on Accept</span>',
    stage: STAGE,
    width: "640px",
  })

  renderStepper()
  renderTable()

  $("gbk-accept").addEventListener("click", doAccept)
  $("gbk-link").addEventListener("keydown", function (e) {
    if (e.key === "Enter") doAccept()
  })
  var gotoBtn = $("gbk-goto")
  if (gotoBtn) {
    gotoBtn.addEventListener("click", function () {
      location.href = RUN_SURFACE
    })
  }

  if (onBiz) {
    $("gbk-link").focus()
  } else {
    // Off a business surface the accept can't work, so lock the input + button
    // (greyed out) and let the banner's "Open Ads Manager" be the only next step.
    var input = $("gbk-link")
    var accept = $("gbk-accept")
    input.disabled = true
    accept.disabled = true
    input.parentNode.style.opacity = ".55"
    accept.title = "Open Ads Manager first"
  }
})()
