/*
 * GOADS Enable 2FA — bookmarklet source (readable; built into a one-line
 * `javascript:` payload by build-bookmarklets.mjs).
 *
 * Turns on authenticator-app two-factor authentication for the Facebook account
 * you are logged into, and hands you the secret key to store. It reproduces
 * Account Center's own GraphQL mutations (persisted-query doc_ids are facts of
 * FB's API), POSTed with credentials:"include" — the whole exchange is between
 * the user's browser and Facebook.
 *
 * Facebook will not switch 2FA on until it is given a valid code derived from
 * the secret it just issued, so the code is computed locally in shared/goads-totp.js
 * (RFC 6238, verified against the spec's test vectors).
 *
 * Rebuilt first-party from the partner tool, with two changes: it asks for
 * confirmation first (the original enabled 2FA on the very first click), and it
 * checks HTTP status instead of only reading the JSON body.
 */
import {
  $,
  copyText,
  downloadText,
  esc,
  openShell,
  toast,
} from "./shared/goads-shell.js"
import { readDtsg, readLsd, readUserId } from "./shared/goads-fb-session.js"
import { secondsLeft, totpCode } from "./shared/goads-totp.js"
import { ICON_ALERT, ICON_COPY, ICON_DOWNLOAD, ICON_EXTERNAL, ICON_SHIELD } from "./shared/goads-icons.js"

;(function () {
  "use strict"

  var API_URL = "https://accountscenter.facebook.com/api/graphql/"
  var HOST = "accountscenter.facebook.com"
  var SETTINGS_URL = "https://accountscenter.facebook.com/password_and_security/two_factor"

  var Q_GENERATE = {
    name: "useFXSettingsTwoFactorGenerateTOTPKeyMutation",
    docId: "9837172312995248",
  }
  var Q_ENABLE = {
    name: "useFXSettingsTwoFactorEnableTOTPMutation",
    docId: "29164158613231327",
  }

  var shell = null
  var state = { uid: null, dtsg: null, lsd: null, secret: null, busy: false, ticker: null }

  /**
   * False once this modal is closed or replaced by another tool. All tools share
   * element ids, so a mutation resolving after a tool switch must not paint into
   * whatever is on screen now.
   */
  function alive() {
    return !!shell && shell.alive()
  }

  function uuid() {
    try {
      if (crypto && crypto.randomUUID) return crypto.randomUUID()
    } catch (e) {}
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16)
    })
  }

  // ── Account Center GraphQL ─────────────────────────────────────────────────

  function baseInput() {
    return {
      client_mutation_id: uuid(),
      actor_id: state.uid,
      account_id: state.uid,
      account_type: "FACEBOOK",
      // Account Center accepts this placeholder in place of a real device id.
      device_id: "device_id_fetch_datr",
      fdid: "device_id_fetch_datr",
    }
  }

  function body(query, input) {
    var p = new URLSearchParams()
    p.set("av", state.uid)
    p.set("__user", state.uid)
    p.set("__a", "1")
    p.set("fb_dtsg", state.dtsg)
    if (state.lsd) p.set("lsd", state.lsd)
    p.set("fb_api_caller_class", "RelayModern")
    p.set("fb_api_req_friendly_name", query.name)
    p.set("variables", JSON.stringify({ input: input }))
    p.set("doc_id", query.docId)
    return p
  }

  async function post(query, input) {
    var res = await fetch(API_URL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body(query, input).toString(),
    })
    if (!res.ok) throw new Error("Facebook returned HTTP " + res.status + " " + res.statusText)
    var serverDate = res.headers.get("Date")
    var json = await res.json()
    return { json: json, serverTime: serverDate ? new Date(serverDate).getTime() : null }
  }

  /**
   * Turn a GraphQL error envelope into either a challenge signal (Facebook wants
   * the user to re-authenticate first) or a plain Error.
   */
  function readError(json) {
    if (!json || !json.errors || !json.errors.length) return null
    var e = json.errors[0]
    var msg = e.summary || e.message || "Unknown error"
    if (e.description) {
      try {
        var d = JSON.parse(e.description)
        if (d.challenge_type === "password" || d.challenge_type === "reauth") {
          return { challenge: d.challenge_type }
        }
        if (d.challenge_type) msg += " (challenge_type: " + d.challenge_type + ")"
      } catch (parseErr) {
        if (e.description !== e.summary) msg += " — " + e.description
      }
    }
    return { message: msg }
  }

  /** Re-read Facebook's clock so a code rejected for drift can be retried. */
  async function serverNow() {
    try {
      var res = await fetch(API_URL, { method: "HEAD", credentials: "include" })
      var d = res.headers.get("Date")
      if (d) return new Date(d).getTime()
    } catch (e) {}
    return Date.now()
  }

  // ── Screens ────────────────────────────────────────────────────────────────

  function show(id) {
    if (!alive()) return
    ;["gbk-intro", "gbk-working", "gbk-done", "gbk-fail", "gbk-challenge"].forEach(function (s) {
      var el = $(s)
      if (el) el.style.display = s === id ? "block" : "none"
    })
  }

  // Every screen switch tolerates a closed modal: the user can force-close while
  // the generate/enable exchange is still in flight.
  function working(text) {
    show("gbk-working")
    if (!$("gbk-working-text")) return
    $("gbk-working-text").textContent = text
  }

  function fail(msg) {
    show("gbk-fail")
    state.busy = false
    if (!$("gbk-fail-text")) return
    $("gbk-fail-text").textContent = msg
  }

  function challenge(kind) {
    show("gbk-challenge")
    state.busy = false
    if (!$("gbk-challenge-title")) return
    $("gbk-challenge-title").textContent =
      kind === "password" ? "Password confirmation required" : "Confirm it's you"
    $("gbk-challenge-text").textContent =
      kind === "password"
        ? "Facebook wants your password before it will change 2FA settings. Open the two-factor settings page, confirm your password, then run this tool again."
        : "Facebook wants to verify your identity before it will change 2FA settings. Finish the verification, then run this tool again."
  }

  function succeeded(secret) {
    state.secret = secret
    state.busy = false
    show("gbk-done")
    if (!$("gbk-secret")) return
    $("gbk-secret").textContent = secret

    // Show the code an authenticator app should be showing right now, so the
    // user can confirm the key they just saved actually works.
    async function tick() {
      try {
        if (!alive() || !$("gbk-code")) {
          clearInterval(state.ticker)
          return
        }
        var now = Date.now()
        $("gbk-code").textContent = await totpCode(secret, now)
        $("gbk-code-left").textContent = secondsLeft(now) + "s"
      } catch (e) {}
    }
    tick()
    state.ticker = setInterval(tick, 1000)
  }

  // ── Main action ────────────────────────────────────────────────────────────

  async function enable2fa() {
    if (state.busy) return
    if (
      !confirm(
        "Turn on two-factor authentication for account " + state.uid + "?\n\n" +
          "You must save the secret key this gives you. Without it — and without another " +
          "recovery method — you can be locked out of the account.",
      )
    )
      return

    state.busy = true
    try {
      working("Generating your 2FA key…")
      var gen = await post(Q_GENERATE, baseInput())
      var genErr = readError(gen.json)
      if (genErr && genErr.challenge) return challenge(genErr.challenge)
      if (genErr) throw new Error(genErr.message)

      var payload = gen.json && gen.json.data && gen.json.data.xfb_two_factor_generate_totp_key
      if (!payload || !payload.success) {
        throw new Error((payload && payload.error_message) || "Facebook wouldn't issue a 2FA key")
      }
      var secret = String((payload.totp_key && payload.totp_key.key_text) || "").replace(/\s+/g, "")
      if (!secret) throw new Error("Facebook returned an empty 2FA key")

      working("Computing your verification code…")
      var code = await totpCode(secret, gen.serverTime || Date.now())

      working("Turning on 2FA…")
      var input = baseInput()
      input.verification_code = code
      var enabled = await post(Q_ENABLE, input)
      var enErr = readError(enabled.json)
      if (enErr && enErr.challenge) return challenge(enErr.challenge)

      var ok = enabled.json && enabled.json.data && enabled.json.data.xfb_two_factor_enable_totp
      if (ok && ok.success) return succeeded(secret)

      // A code can be rejected purely because our clock drifted past the window.
      // Resync against Facebook's own Date header and try the fresh code once.
      working("Code expired — retrying with a fresh one…")
      var retryInput = baseInput()
      retryInput.verification_code = await totpCode(secret, await serverNow())
      var retry = await post(Q_ENABLE, retryInput)
      var retryErr = readError(retry.json)
      if (retryErr && retryErr.challenge) return challenge(retryErr.challenge)
      var ok2 = retry.json && retry.json.data && retry.json.data.xfb_two_factor_enable_totp
      if (ok2 && ok2.success) return succeeded(secret)

      throw new Error(
        (ok2 && ok2.error_message) || (retryErr && retryErr.message) ||
          (enErr && enErr.message) || "Facebook wouldn't turn 2FA on",
      )
    } catch (e) {
      fail((e && e.message) || "Something went wrong")
    }
  }

  // ── Boot ───────────────────────────────────────────────────────────────────

  var PANEL = "padding:20px 22px"

  var STAGE =
    '<div id="gbk-intro" style="' + PANEL + '">' +
    '<div class="gbk-note">Turns on <b>authenticator app</b> two-factor authentication for the account you are ' +
    "signed in as, then shows you the secret key. Save that key — it is the only copy you get.</div>" +
    '<div style="display:flex;align-items:center;gap:10px;margin-top:16px">' +
    '<span class="gbk-count">Account</span><span class="gbk-id" id="gbk-uid">—</span></div>' +
    '<div style="margin-top:18px;display:flex;gap:10px;flex-wrap:wrap">' +
    '<button type="button" class="gbk-btn gbk-btn-primary" id="gbk-go">' + ICON_SHIELD + " Turn on 2FA</button>" +
    "</div></div>" +

    '<div id="gbk-working" style="display:none">' +
    '<div class="gbk-state"><div class="gbk-spin"></div><div id="gbk-working-text">Working…</div></div></div>' +

    '<div id="gbk-done" style="display:none;' + PANEL + '">' +
    '<div style="display:flex;align-items:center;gap:9px;font-weight:600;color:var(--ok);font-size:16px">' +
    ICON_SHIELD + " Two-factor authentication is on</div>" +
    '<div class="gbk-note" style="margin-top:12px">Store this secret key somewhere safe now. Anyone with it can ' +
    "generate your login codes, and without it you may lose access to the account.</div>" +
    '<div style="margin-top:14px">' +
    '<div class="gbk-tile-k">Secret key</div>' +
    '<div class="gbk-id" id="gbk-secret" style="margin-top:6px;font-size:15px;letter-spacing:.08em;word-break:break-all;color:var(--ink-strong)"></div>' +
    "</div>" +
    '<div style="margin-top:14px;display:flex;align-items:center;gap:14px;flex-wrap:wrap">' +
    '<div><div class="gbk-tile-k">Code right now</div>' +
    '<div class="gbk-tile-v gbk-mono" id="gbk-code" style="letter-spacing:.12em">------</div></div>' +
    '<div><div class="gbk-tile-k">Refreshes in</div><div class="gbk-tile-v" id="gbk-code-left">—</div></div>' +
    '<span class="gbk-count gbk-soft" style="flex:1;min-width:180px">Check this matches your authenticator app after you add the key.</span>' +
    "</div>" +
    '<div style="margin-top:18px;display:flex;gap:10px;flex-wrap:wrap">' +
    '<button type="button" class="gbk-btn gbk-btn-primary" id="gbk-copy">' + ICON_COPY + " Copy key</button>" +
    '<button type="button" class="gbk-btn gbk-btn-ghost" id="gbk-save">' + ICON_DOWNLOAD + " Save to file</button>" +
    "</div></div>" +

    '<div id="gbk-fail" style="display:none;' + PANEL + '">' +
    '<div class="gbk-err" id="gbk-fail-text"></div>' +
    '<div style="margin-top:16px"><button type="button" class="gbk-btn gbk-btn-ghost" id="gbk-retry">Try again</button></div>' +
    "</div>" +

    '<div id="gbk-challenge" style="display:none;' + PANEL + '">' +
    '<div style="display:flex;align-items:center;gap:9px;font-weight:600;color:var(--warn);font-size:16px">' +
    ICON_ALERT + ' <span id="gbk-challenge-title"></span></div>' +
    '<p class="gbk-soft" id="gbk-challenge-text" style="margin:10px 0 0;font-size:14px"></p>' +
    '<div style="margin-top:16px"><a class="gbk-btn gbk-btn-primary" id="gbk-open" href="' + SETTINGS_URL + '" ' +
    'style="text-decoration:none">' + ICON_EXTERNAL + " Open 2FA settings</a></div>" +
    "</div>"

  state.uid = readUserId()
  state.dtsg = readDtsg()
  state.lsd = readLsd()

  shell = openShell({
    title: "GOADS Enable 2FA",
    subtitle: 'Account Center <span class="gbk-mono">' + esc(state.uid || "not detected") + "</span>",
    stage: STAGE,
    width: "620px",
    onClose: function () {
      if (state.busy && !confirm("2FA setup is still running. Close anyway?")) return false
      if (state.ticker) clearInterval(state.ticker)
      return true
    },
  })

  $("gbk-uid").textContent = state.uid || "not detected"
  $("gbk-go").addEventListener("click", enable2fa)
  $("gbk-retry").addEventListener("click", function () {
    show("gbk-intro")
  })
  $("gbk-copy").addEventListener("click", function () {
    copyText(state.secret, "Secret key copied")
  })
  $("gbk-save").addEventListener("click", function () {
    downloadText(
      "goads-2fa-" + state.uid + ".txt",
      "Facebook two-factor secret key\n" +
        "==============================\n" +
        "Account ID: " + state.uid + "\n" +
        "Secret key: " + state.secret + "\n" +
        "Saved:      " + new Date().toLocaleString() + "\n" +
        "==============================\n" +
        "Add this key to an authenticator app to generate login codes.\n" +
        "Keep it private — anyone holding it can produce your codes.\n",
    )
    toast("Key saved to your downloads", "ok")
  })

  // Account Center is the only surface where these mutations exist.
  if (location.hostname !== HOST) {
    show("gbk-challenge")
    $("gbk-challenge-title").textContent = "Open Account Center first"
    $("gbk-challenge-text").textContent =
      "This tool only works on accountscenter.facebook.com. Open the two-factor settings page there, then run it again."
    $("gbk-open").innerHTML = ICON_EXTERNAL + " Open Account Center"
  } else if (!state.uid || !state.dtsg) {
    fail(
      "Couldn't read your account session from this page. Reload Account Center while signed in, then run this tool again.",
    )
  }
})()
