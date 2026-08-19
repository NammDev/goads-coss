/*
 * GOADS Accept BM Link — bookmarklet source (readable; built into a one-line
 * `javascript:` payload by build-bookmarklets.mjs).
 *
 * Paste Business Manager invitation links (one per line) and accept them with
 * the account you are signed in as — no verification code, no email round trip.
 * This is the "accept link without code" flow: the tool pulls the invitation
 * token out of each URL and calls Facebook's business-app accept mutation
 * directly with your own Graph access token.
 *
 * Links run STRICTLY one at a time (sequential, with a short gap) — Facebook
 * rate-limits bursts on this mutation, and a queue is also what makes the
 * "which business did this link add?" resolution below reliable.
 *
 * Layout: a links textarea + Accept/Stop, count tiles, and one table row per
 * link whose Message column carries the live step and final result. Each
 * accepted row gets a Business info button that opens that BM's settings page.
 *
 * Ported first-party from this repo's "Nhận link" extension
 * (docs/acceptlinkwithoutcode/). Only the code-free path is reproduced — it needs
 * nothing but the user's own session:
 *   - accept mutation (b-graph business-app graphql, doc_id 6857625997606127,
 *     last_name = actor id) → extension dashboard_re.js `invitationLinkNoveri`,
 *     matched request-for-request
 *   - token extraction from `invitation/?token=` links → `extractTokenFromUrl`
 *   - session bootstrap (access token + actor id) → `extractBMData`
 *   - shell + brand → the rest of the GOADS bookmarklet library
 *
 * Everything uses the user's own cookies (credentials:"include") and nothing is
 * ever sent anywhere but Facebook.
 */
import { $, BRAND, esc, openShell, stateEmpty, timeoutSignal, toast } from "./shared/goads-shell.js"
import { readAccessToken, readUserId } from "./shared/goads-fb-session.js"
import { ICON_CHECK, ICON_EXTERNAL, ICON_TICKET } from "./shared/goads-icons.js"

;(function () {
  "use strict"

  var GRAPH = "https://b-graph.facebook.com/graphql?locale=en_US"
  var GRAPH_REST = "https://graph.facebook.com"
  var ACCEPT_DOC_ID = "6857625997606127"
  var REQUEST_TIMEOUT_MS = 25000
  // Gap between two accepts. Sequential + a small pause is what keeps a batch
  // of links from tripping Facebook's rate limiting on this mutation.
  var GAP_MS = 700
  // The admin name the accepted account shows up as inside the target Business
  // Manager. Facebook builds it from first_name + last_name; we keep the uid as
  // the last name, so the member reads as "Hi <uid>" — deliberately neutral, no
  // agency branding inside someone else's BM. (The extension used "Xmeta".)
  var ADMIN_FIRST_NAME = "Hi"
  // Where the Business info button points — and where it lands when the BM id
  // couldn't be resolved (Facebook's own business picker).
  var BIZ_INFO_URL = "https://business.facebook.com/latest/settings/business_info?business_id="
  var BIZ_PICKER_URL = "https://business.facebook.com/select/"

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
    running: false,
    stop: false,
    // { link, token, bizName, bizId, bizLabel, status:"ok"|"error"|null, step, error }
    rows: [],
    done: 0,
    total: 0,
    // id → name of every business this account already had. Snapshotted before
    // the run, then refreshed after each accept so the newcomer is identifiable.
    // null = we couldn't read the list (name matching still works).
    bizIds: null,
    // Which fetchBusinesses() source last worked, and why the others didn't —
    // surfaced on the Business info button so a failure is diagnosable.
    bizSource: "",
    bizError: "",
  }

  function alive() {
    return !!shell && shell.alive()
  }

  function sleep(ms) {
    return new Promise(function (r) {
      setTimeout(r, ms)
    })
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
        // Cheapest possible source for the Business info button: the mutation's
        // own payload sometimes carries the business it just joined us to.
        return { status: "ok", bizId: bizIdFromPayload(data) }
      }
      return { status: "error", error: "Unexpected response from Facebook" }
    } catch (e) {
      return {
        status: "error",
        error: e && e.name === "AbortError" ? "Timed out" : (e && e.message) || "Network error",
      }
    }
  }

  // ── Business resolution (for the Business info button) ───────────────────────

  /** Any `business{id}` / `business_id` hiding anywhere in a Graph payload. */
  function bizIdFromPayload(data) {
    try {
      var s = JSON.stringify(data)
      var m =
        s.match(/"business"\s*:\s*\{\s*"id"\s*:\s*"(\d{6,})"/) ||
        s.match(/"business_id"\s*:\s*"(\d{6,})"/) ||
        s.match(/"business_id"\s*:\s*(\d{6,})/)
      return m ? m[1] : ""
    } catch (e) {
      return ""
    }
  }

  async function getJson(url) {
    var res = await fetch(url, { credentials: "include", signal: timeoutSignal(REQUEST_TIMEOUT_MS) })
    return await res.json()
  }

  /**
   * Every Business Manager this account can see → [{ id, name }] (null on failure).
   *
   * Three sources, because the page token's scopes differ by surface and a single
   * endpoint can't be relied on: the `me/businesses` edge, the same data nested on
   * `me`, and — when the token is refused outright — the BM settings HTML, which
   * is same-origin on business.facebook.com and only needs the user's cookies.
   * The source that works is remembered so later links don't retry the dead ones.
   */
  async function fetchBusinesses() {
    var tok = encodeURIComponent(state.token || "")
    var sources = [
      {
        key: "me/businesses",
        run: async function () {
          var d = await getJson(GRAPH_REST + "/me/businesses?fields=id,name&limit=200&access_token=" + tok)
          if (d && d.error) throw new Error(d.error.message || "Graph error")
          return d && d.data
        },
      },
      {
        key: "me?businesses",
        run: async function () {
          var d = await getJson(GRAPH_REST + "/me?fields=businesses.limit(200){id,name}&access_token=" + tok)
          if (d && d.error) throw new Error(d.error.message || "Graph error")
          return d && d.businesses && d.businesses.data
        },
      },
      {
        key: "settings html",
        run: async function () {
          var res = await fetch("https://business.facebook.com/latest/settings/", {
            credentials: "include",
            signal: timeoutSignal(REQUEST_TIMEOUT_MS),
          })
          var html = await res.text()
          // The BM switcher ships as inline JSON; pull every {id,name} pair out of it.
          var out = []
          var seen = {}
          var re = /"id"\s*:\s*"(\d{8,})"\s*,\s*"name"\s*:\s*"((?:[^"\\]|\\.){1,120})"/g
          var m
          while ((m = re.exec(html))) {
            if (seen[m[1]]) continue
            seen[m[1]] = true
            var name = m[2]
            try {
              name = JSON.parse('"' + m[2] + '"')
            } catch (e) {}
            out.push({ id: m[1], name: name })
          }
          return out
        },
      },
    ]

    // Retry the remembered winner first, then the rest.
    if (state.bizSource) {
      sources.sort(function (a, b) {
        return (b.key === state.bizSource) - (a.key === state.bizSource)
      })
    }

    for (var i = 0; i < sources.length; i++) {
      try {
        var list = await sources[i].run()
        if (list && list.length) {
          state.bizSource = sources[i].key
          state.bizError = ""
          return list
        }
        state.bizError = sources[i].key + ": empty"
      } catch (e) {
        state.bizError = sources[i].key + ": " + ((e && e.message) || "failed")
      }
    }
    return null
  }

  function normName(v) {
    return String(v || "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim()
  }

  /**
   * Which business did this link just add us to? Two signals, strongest first:
   * the invite link's own `invite_business_name`, and the id that wasn't in the
   * pre-accept snapshot. Best-effort — a miss only costs the Info button.
   */
  async function resolveBusiness(row) {
    var list = await fetchBusinesses()
    if (!list) return null

    var before = state.bizIds
    var fresh = before
      ? list.filter(function (b) {
          return !before[b.id]
        })
      : []

    var pick = null
    if (row.bizName) {
      var want = normName(row.bizName)
      var byName = function (pool) {
        return pool.filter(function (b) {
          return normName(b.name) === want
        })[0]
      }
      pick = byName(fresh) || byName(list) || null
    }
    // Sequential accepts mean at most one business appears per link, so a single
    // newcomer is unambiguous. More than one → don't guess.
    if (!pick && fresh.length === 1) pick = fresh[0]

    // Roll the snapshot forward for the next link in the queue.
    var next = before || {}
    list.forEach(function (b) {
      next[b.id] = b.name || ""
    })
    state.bizIds = next

    return pick
  }

  // ── Input parsing ────────────────────────────────────────────────────────────

  /**
   * Pull the invitation token out of a `…/invitation/?token=…` URL.
   *
   * Facebook often hands out the invitation wrapped in a login redirect, where
   * the real link sits percent-encoded inside `next=`:
   *   business.facebook.com/business/loginpage/?next=https%3A%2F%2F…%2Finvitation%2F%3Ftoken%3D…%26…
   * so the literal `invitation/?token=` never appears. Decode progressively
   * (a nested `next=` can be encoded more than once) and match each layer.
   */
  function decodeLayers(link) {
    var layers = []
    var s = String(link).trim()
    for (var i = 0; i < 4 && s; i++) {
      layers.push(s)
      var d
      try {
        d = decodeURIComponent(s)
      } catch (e) {
        break
      }
      if (d === s) break
      s = d
    }
    return layers
  }

  function tokenFromLink(link) {
    var layers = decodeLayers(link)
    // Prefer a real invitation URL; only then fall back to a bare `token=` param
    // (which could belong to some other query string on the same link).
    var j
    for (j = 0; j < layers.length; j++) {
      var m = layers[j].match(/invitation\/\?token=([^&\s|#]+)/)
      if (m) return m[1]
    }
    for (j = 0; j < layers.length; j++) {
      var n = layers[j].match(/[?&]token=([^&\s|#]+)/)
      if (n) return n[1]
    }
    return null
  }

  /**
   * The BM name Facebook stamps on the login-wrapped invite
   * (`&invite_business_name=Some+Business`). Shown before the accept and used to
   * match the business afterwards.
   */
  function bizNameFromLink(link) {
    var layers = decodeLayers(link)
    for (var i = 0; i < layers.length; i++) {
      var m = layers[i].match(/[?&]invite_business_name=([^&\s|#]+)/)
      if (m) {
        try {
          return decodeURIComponent(m[1].replace(/\+/g, " "))
        } catch (e) {
          return m[1].replace(/\+/g, " ")
        }
      }
    }
    return ""
  }

  /** One link per line. Blank lines dropped, duplicate tokens dropped. */
  function parseLinks(raw) {
    var seen = {}
    var out = []
    raw.split(/\r?\n/).forEach(function (line) {
      var link = line.trim()
      if (!link) return
      var token = tokenFromLink(link)
      // Bad lines are kept as rows (with an error) rather than silently dropped —
      // otherwise a typo just disappears and the count looks wrong.
      if (token) {
        if (seen[token]) return
        seen[token] = true
      }
      out.push({
        idx: out.length,
        link: link,
        token: token,
        bizName: bizNameFromLink(link),
        bizId: "",
        bizLabel: "",
        status: token ? null : "error",
        step: "",
        error: token ? "" : "Not a Business Manager invitation link (needs /invitation/?token=)",
      })
    })
    return out
  }

  // ── Rendering ────────────────────────────────────────────────────────────────

  function counts() {
    var c = { ok: 0, error: 0 }
    state.rows.forEach(function (r) {
      if (r.status === "ok") c.ok++
      else if (r.status === "error") c.error++
    })
    return c
  }

  function messageCell(r) {
    if (r.status === "ok") return '<span class="gbk-act ok">Accepted — added to your account</span>'
    if (r.status === "error") return '<span class="gbk-act err">' + esc(r.error || "Error") + "</span>"
    if (r.step) return '<span class="gbk-act pend">' + esc(r.step) + "</span>"
    return '<span class="gbk-soft">Queued</span>'
  }

  /**
   * Accepted rows ALWAYS get the button, id resolved or not: with an id it opens
   * that BM's info page straight away, without one it resolves on click (and, if
   * that still fails, drops the user on Facebook's business picker) — so the
   * shortcut is never simply missing.
   */
  function businessCell(r) {
    var label = r.bizLabel || r.bizName
    var head = label
      ? '<div class="gbk-name">' + esc(label) + "</div>"
      : '<div class="gbk-soft">' + (r.bizId ? esc(r.bizId) : "—") + "</div>"
    if (r.status !== "ok") return head
    return (
      head +
      '<button type="button" class="gbk-btn gbk-btn-sm gbk-btn-ghost gbk-info" data-row="' + r.idx + '" ' +
      'data-bid="' + esc(r.bizId || "") + '" style="margin-top:6px">' +
      ICON_EXTERNAL + " Business info</button>"
    )
  }

  function renderTiles() {
    if (!alive()) return
    var c = counts()
    $("gbk-t-total").textContent = String(state.total)
    $("gbk-t-ok").textContent = String(c.ok)
    $("gbk-t-error").textContent = String(c.error)
  }

  function renderTable() {
    if (!alive()) return
    var wrap = $("gbk-tablewrap")
    if (!wrap) return
    if (!state.rows.length) {
      wrap.innerHTML = stateEmpty("Paste invitation links above — one per line — then press Accept.")
      return
    }
    var html =
      "<table><thead><tr>" +
      '<th style="width:44px">#</th><th>Link</th><th style="width:26%">Business</th><th style="width:32%">Message</th>' +
      "</tr></thead><tbody>"
    state.rows.forEach(function (r, i) {
      html +=
        "<tr>" +
        '<td class="gbk-soft">' + (i + 1) + "</td>" +
        '<td class="gbk-name" style="max-width:260px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="' + esc(r.link) + '">' + esc(r.link) + "</td>" +
        "<td>" + businessCell(r) + "</td>" +
        "<td>" + messageCell(r) + "</td>" +
        "</tr>"
    })
    wrap.innerHTML = html + "</tbody></table>"
  }

  function renderProgress() {
    if (!alive()) return
    var pct = state.total ? Math.round((state.done / state.total) * 100) : 0
    $("gbk-bar").firstElementChild.style.width = pct + "%"
    // A failed BM lookup is stated, not hidden — the accepts still succeeded, and
    // the reason is what tells us which Graph source the session refused.
    var unresolved = state.rows.filter(function (r) {
      return r.status === "ok" && !r.bizId
    }).length
    var note = !state.running && unresolved && state.bizError ? ' <span class="gbk-soft">· BM id lookup failed (' + esc(state.bizError) + ")</span>" : ""
    $("gbk-count").innerHTML = state.running
      ? "Accepting <b>" + state.done + "</b> / " + state.total
      : state.total
        ? "Done <b>" + state.done + "</b> / " + state.total + note
        : "&mdash;"
  }

  function setRunning(on) {
    state.running = on
    if (!alive()) return
    $("gbk-input").disabled = on
    $("gbk-accept").style.display = on ? "none" : "inline-flex"
    $("gbk-stop").style.display = on ? "inline-flex" : "none"
    $("gbk-stop").disabled = false
    $("gbk-stop").textContent = "Stop"
  }

  // ── Run ──────────────────────────────────────────────────────────────────────

  async function run() {
    if (state.running) return
    var rows = parseLinks($("gbk-input").value)
    if (!rows.length) {
      toast("Paste at least one invitation link", "err")
      return
    }

    state.rows = rows
    state.total = rows.length
    state.done = 0
    state.stop = false
    setRunning(true)
    renderTiles()
    renderTable()
    renderProgress()

    // Session first — one read for the whole batch.
    if (!state.token || !state.actorId) {
      $("gbk-count").textContent = "Reading session…"
      var s = await bootstrapSession()
      if (!alive()) return
      state.token = s.token
      state.actorId = s.actorId
    }
    if (!state.token || !state.actorId) {
      var why = onBusinessSurface()
        ? "Couldn't read your session — refresh this page and retry"
        : "Open Ads Manager (button above) and run this bookmarklet there"
      state.rows.forEach(function (r) {
        if (r.status) return
        r.status = "error"
        r.error = why
      })
      setRunning(false)
      renderTiles()
      renderTable()
      renderProgress()
      toast("Couldn't read your session", "err")
      return
    }

    // Snapshot the businesses we already have, so a newcomer is identifiable.
    var snapshot = await fetchBusinesses()
    if (!alive()) return
    if (snapshot) {
      state.bizIds = {}
      snapshot.forEach(function (b) {
        state.bizIds[b.id] = b.name || ""
      })
    }

    // One link at a time, in order.
    for (var i = 0; i < state.rows.length; i++) {
      if (state.stop) break
      var row = state.rows[i]
      if (row.status === "error") {
        state.done++
        renderProgress()
        continue
      }

      row.step = "Accepting…"
      renderTable()
      renderProgress()

      var r = await acceptOne(row.token)
      if (!alive()) return
      row.step = ""
      row.status = r.status
      row.error = r.error || ""

      if (r.status === "ok") {
        // The mutation payload is free; only go looking through the business list
        // when it didn't carry the id.
        if (r.bizId) {
          row.bizId = r.bizId
        } else {
          row.step = "Finding business…"
          renderTable()
          var biz = await resolveBusiness(row)
          if (!alive()) return
          row.step = ""
          if (biz) {
            row.bizId = biz.id
            row.bizLabel = biz.name || ""
          }
        }
      }

      state.done++
      renderTiles()
      renderTable()
      renderProgress()

      if (i < state.rows.length - 1 && !state.stop) await sleep(GAP_MS)
      if (!alive()) return
    }

    setRunning(false)
    renderProgress()
    var c = counts()
    toast(
      (state.stop ? "Stopped — " : "Done — ") + c.ok + " accepted, " + c.error + " failed",
      c.error ? "err" : "ok",
    )
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
    // Toolbar: links textarea + Accept / Stop.
    '<div class="gbk-toolbar" style="flex-direction:column;align-items:stretch;gap:10px">' +
    jumpBanner +
    '<div class="gbk-field" style="align-items:flex-start;padding-top:10px">' +
    ICON_TICKET +
    '<textarea id="gbk-input" rows="4" spellcheck="false" ' +
    'placeholder="One invitation link per line — login-wrapped links work too.&#10;https://business.facebook.com/invitation/?token=…&#10;https://business.facebook.com/business/loginpage/?next=…invitation…" ' +
    'style="flex:1;width:100%;resize:vertical;border:0;background:transparent;outline:none;font:13px/1.5 \'SF Mono\',Consolas,monospace;color:var(--ink-strong)"></textarea>' +
    "</div>" +
    '<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">' +
    '<span class="gbk-count gbk-soft">Accepts each link with the account you\'re signed in as — no verification code, one link at a time. Run it on Ads Manager or Business Manager.</span>' +
    '<span class="gbk-grow"></span>' +
    '<button type="button" class="gbk-btn gbk-btn-primary" id="gbk-accept">' + ICON_CHECK + " Accept</button>" +
    '<button type="button" class="gbk-btn gbk-btn-danger" id="gbk-stop" style="display:none">Stop</button>' +
    "</div></div>" +
    // Counts.
    '<div class="gbk-tiles">' +
    '<div class="gbk-tile"><div class="gbk-tile-k">Links</div><div class="gbk-tile-v" id="gbk-t-total">0</div></div>' +
    '<div class="gbk-tile ok"><div class="gbk-tile-k">Accepted</div><div class="gbk-tile-v" id="gbk-t-ok">0</div></div>' +
    '<div class="gbk-tile danger"><div class="gbk-tile-k">Failed</div><div class="gbk-tile-v" id="gbk-t-error">0</div></div>' +
    "</div>" +
    // One row per link + its Business / Message.
    '<div class="gbk-tablewrap" id="gbk-tablewrap"></div>' +
    '<div class="gbk-footer">' +
    '<span class="gbk-count" id="gbk-count">&mdash;</span>' +
    '<div class="gbk-bar" id="gbk-bar"><i></i></div>' +
    "</div>"

  // Fast local read first; a miss here is not fatal — run() fetches the session
  // when Accept is pressed.
  state.token = readAccessToken()
  state.actorId = readUserId()

  shell = openShell({
    title: BRAND.name + " Accept BM Link",
    subtitle:
      state.token && state.actorId
        ? 'Session <span class="gbk-mono">detected</span>'
        : 'Session <span class="gbk-mono">resolved on Accept</span>',
    stage: STAGE,
    width: "760px",
  })

  renderTiles()
  renderTable()
  renderProgress()

  $("gbk-accept").addEventListener("click", run)
  $("gbk-stop").addEventListener("click", function () {
    state.stop = true
    $("gbk-stop").disabled = true
    $("gbk-stop").textContent = "Stopping…"
  })
  // Delegated: the table is re-rendered on every step, so per-button listeners
  // would be lost. Opens the BM's own settings page in a new tab.
  $("gbk-tablewrap").addEventListener("click", async function (e) {
    var btn = e.target && e.target.closest ? e.target.closest(".gbk-info") : null
    if (!btn) return
    var id = btn.getAttribute("data-bid")
    if (id) {
      window.open(BIZ_INFO_URL + encodeURIComponent(id), "_blank", "noopener")
      return
    }
    // No id yet: open the tab NOW (a window.open after an await is what popup
    // blockers kill), resolve the BM, then point the tab at it.
    var tab = window.open("about:blank", "_blank")
    var row = state.rows[parseInt(btn.getAttribute("data-row"), 10)]
    btn.disabled = true
    var biz = row ? await resolveBusiness(row) : null
    if (biz) {
      row.bizId = biz.id
      row.bizLabel = biz.name || ""
      renderTable()
    } else {
      toast("Couldn't find the BM id" + (state.bizError ? " (" + state.bizError + ")" : "") + " — pick it here", "err")
    }
    var url = biz ? BIZ_INFO_URL + encodeURIComponent(biz.id) : BIZ_PICKER_URL
    if (tab) tab.location.replace(url)
    else window.open(url, "_blank", "noopener")
    if (btn) btn.disabled = false
  })
  var gotoBtn = $("gbk-goto")
  if (gotoBtn) {
    gotoBtn.addEventListener("click", function () {
      location.href = RUN_SURFACE
    })
  }

  if (onBiz) {
    $("gbk-input").focus()
  } else {
    // Off a business surface the accept can't work, so lock the field + button
    // (greyed out) and let the banner's "Open Ads Manager" be the only next step.
    var input = $("gbk-input")
    var accept = $("gbk-accept")
    input.disabled = true
    accept.disabled = true
    input.parentNode.style.opacity = ".55"
    accept.title = "Open Ads Manager first"
  }
})()
