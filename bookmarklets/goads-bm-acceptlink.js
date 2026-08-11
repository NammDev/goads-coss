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
 * Ported first-party from this repo's "Nhận link" extension
 * (docs/acceptlinkwithoutcode/). Only the code-free path is reproduced — it is
 * the one that needs nothing but the user's own session:
 *   - accept mutation (b-graph business-app graphql, doc_id 6857625997606127,
 *     first_name "Xmeta", last_name = actor id) → extension dashboard_re.js
 *     `invitationLinkNoveri`, matched request-for-request
 *   - token extraction from `invitation/?token=` links → extension
 *     `extractTokenFromUrl`
 *   - access token + actor id read from the page → shared/goads-fb-session.js
 *   - shell + brand → the rest of the GOADS bookmarklet library
 *
 * Runs on facebook.com or business.facebook.com while logged in — the session
 * readers work on either. Everything uses the user's own cookies
 * (credentials:"include") and nothing is ever sent anywhere but Facebook.
 */
import { $, esc, openShell, timeoutSignal, toast } from "./shared/goads-shell.js"
import { readAccessToken, readUserId } from "./shared/goads-fb-session.js"
import { ICON_CHECK, ICON_CHECK_CIRCLE, ICON_TICKET, ICON_X_CIRCLE } from "./shared/goads-icons.js"

;(function () {
  "use strict"

  // b-graph is Facebook's business-app Graph host; the accept mutation lives
  // there, not on the www graph. locale=en_US keeps error text in English.
  var GRAPH = "https://b-graph.facebook.com/graphql?locale=en_US"
  var ACCEPT_DOC_ID = "6857625997606127"
  var REQUEST_TIMEOUT_MS = 25000

  var shell = null
  var state = { token: null, actorId: null, busy: false }

  function alive() {
    return !!shell && shell.alive()
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
              first_name: "Xmeta",
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

  // ── Result panel ─────────────────────────────────────────────────────────────

  function showResult(kind, html) {
    var el = $("gbk-result")
    if (!el) return
    var ok = kind === "ok"
    el.style.cssText =
      "margin-top:14px;padding:12px 14px;border-radius:10px;font-size:13.5px;line-height:1.5;display:flex;gap:9px;align-items:flex-start;" +
      "background:" + (ok ? "var(--ok-bg)" : "var(--err-bg)") + ";" +
      "border:1px solid " + (ok ? "var(--ok-border)" : "var(--err-border)") + ";" +
      "color:" + (ok ? "var(--ok)" : "var(--err-fg)") + ";"
    el.innerHTML = (ok ? ICON_CHECK_CIRCLE : ICON_X_CIRCLE) + "<div>" + html + "</div>"
  }

  function clearResult() {
    var el = $("gbk-result")
    if (el) {
      el.style.cssText = "display:none"
      el.innerHTML = ""
    }
  }

  function setBusy(on) {
    state.busy = on
    if (!alive()) return
    var btn = $("gbk-accept")
    var input = $("gbk-link")
    btn.disabled = on
    input.disabled = on
    btn.innerHTML = on ? '<span class="gbk-btn-spin"></span> Accepting…' : ICON_CHECK + " Accept"
  }

  // ── Run ──────────────────────────────────────────────────────────────────────

  async function doAccept() {
    if (state.busy) return
    var link = $("gbk-link").value.trim()
    if (!link) {
      toast("Paste an invitation link", "err")
      return
    }
    if (!state.token || !state.actorId) {
      showResult(
        "error",
        "Couldn't read your Facebook session. Open Business Manager or facebook.com while logged in, then run this tool.",
      )
      return
    }
    var token = tokenFromLink(link)
    if (!token) {
      showResult(
        "error",
        "That doesn't look like a Business Manager invitation link — it should contain " +
          '<span class="gbk-mono">/invitation/?token=</span>.',
      )
      return
    }

    clearResult()
    setBusy(true)
    var r = await acceptOne(token)
    if (!alive()) return
    setBusy(false)

    if (r.status === "ok") {
      showResult("ok", "Invitation accepted — this Business Manager has been added to your account.")
    } else {
      showResult("error", esc(r.error))
    }
  }

  // ── Boot ─────────────────────────────────────────────────────────────────────

  var STAGE =
    "<style>#goads-bk .gbk-btn-spin{width:14px;height:14px;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;display:inline-block;animation:gbkSpin .7s linear infinite}</style>" +
    '<div style="padding:18px">' +
    '<div style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:var(--ink-strong);margin-bottom:8px">' +
    ICON_TICKET +
    " Invitation link</div>" +
    '<div style="display:flex;gap:8px;align-items:stretch">' +
    '<div class="gbk-field" style="flex:1">' +
    ICON_TICKET +
    '<input id="gbk-link" type="text" spellcheck="false" autocomplete="off" placeholder="https://business.facebook.com/invitation/?token=…"></div>' +
    '<button type="button" class="gbk-btn gbk-btn-primary" id="gbk-accept">' +
    ICON_CHECK +
    " Accept</button>" +
    "</div>" +
    '<div id="gbk-result" style="display:none"></div>' +
    '<ul class="gbk-soft" style="margin:16px 0 0;padding-left:18px;font-size:13px;line-height:1.7">' +
    "<li>Open Business Manager or facebook.com while logged in, then run this tool.</li>" +
    "<li>Paste one invitation link — the kind that contains " +
    '<span class="gbk-mono">/invitation/?token=</span>.</li>' +
    "<li>It's accepted with the account you're signed in as — no verification code needed.</li>" +
    "</ul>" +
    "</div>"

  state.token = readAccessToken()
  state.actorId = readUserId()

  shell = openShell({
    title: "GOADS Accept BM Link",
    subtitle:
      state.token && state.actorId
        ? 'Session <span class="gbk-mono">detected</span>'
        : 'Session <span class="gbk-mono">not detected</span>',
    stage: STAGE,
    width: "560px",
  })

  $("gbk-accept").addEventListener("click", doAccept)
  $("gbk-link").addEventListener("keydown", function (e) {
    if (e.key === "Enter") doAccept()
  })
  $("gbk-link").focus()

  if (!state.token || !state.actorId) {
    showResult(
      "error",
      "Couldn't read your Facebook session from this page. Open Business Manager (business.facebook.com) " +
        "or facebook.com while logged in, then run this tool there.",
    )
  }
})()
