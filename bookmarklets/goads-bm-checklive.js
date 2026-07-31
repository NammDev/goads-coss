/*
 * GOADS Check Live BM — bookmarklet source (readable; built into a one-line
 * `javascript:` payload by build-bookmarklets.mjs).
 *
 * Paste a list of Business Manager ids, get back live / disabled / error for
 * each one. Liveness is Facebook's own signal: a BM node still exposes
 * `allow_page_management_in_www` while it is usable, and reports it false once
 * the BM is shut down. One Graph GET per id, run with the user's own session
 * (credentials:"include") — nothing is sent anywhere but Facebook.
 *
 * Rebuilt first-party from the partner tool. Two bugs from that version are
 * fixed here rather than reproduced:
 *   - the `fields` param was double-encoded as `["a,b"]` and asked Graph for one
 *     bogus field name; it is now a plain `fields=allow_page_management_in_www,name`
 *   - the endpoint was pinned to the long-deprecated v11.0; it is now unversioned,
 *     which Facebook routes to the oldest version it still supports
 */
import {
  $,
  copyText,
  downloadText,
  esc,
  openShell,
  stateEmpty,
  timeoutSignal,
  toast,
} from "./shared/goads-shell.js"
import { readAccessToken } from "./shared/goads-fb-session.js"
import {
  ICON_CHECK_CIRCLE,
  ICON_COPY,
  ICON_DOWNLOAD,
  ICON_SEARCH,
  ICON_X_CIRCLE,
} from "./shared/goads-icons.js"

;(function () {
  "use strict"

  var GRAPH = "https://graph.facebook.com"
  var REQUEST_TIMEOUT_MS = 20000

  var shell = null
  var state = {
    token: null,
    rows: [], // { id, note, status: "live"|"disabled"|"error", name, error }
    running: false,
    stop: false,
    done: 0,
    total: 0,
  }

  // ── Graph ──────────────────────────────────────────────────────────────────

  /**
   * One BM id → its liveness. Never throws: a failure is a row with
   * status "error" so a bad id can't abort the rest of the batch.
   */
  async function checkOne(bmId, token) {
    try {
      var url =
        GRAPH + "/" + encodeURIComponent(bmId) +
        "?access_token=" + encodeURIComponent(token) +
        "&fields=allow_page_management_in_www,name"
      var res = await fetch(url, { credentials: "include", signal: timeoutSignal(REQUEST_TIMEOUT_MS) })
      var data = await res.json()
      if (data && !data.error && "allow_page_management_in_www" in data) {
        return {
          status: data.allow_page_management_in_www ? "live" : "disabled",
          name: data.name || "Unknown",
        }
      }
      return { status: "error", error: (data && data.error && data.error.message) || "Unknown error" }
    } catch (e) {
      return { status: "error", error: e && e.name === "AbortError" ? "Timed out" : (e && e.message) || "Network error" }
    }
  }

  // ── Input parsing ──────────────────────────────────────────────────────────

  /**
   * One id per line, with an optional `|note` the user carries through to the
   * exported lists. Ids are de-duped, first line wins.
   */
  function parseInput(raw) {
    var seen = {}
    var out = []
    raw.split(/\r?\n/).forEach(function (line) {
      var t = line.trim()
      if (!t) return
      var parts = t.split("|")
      var id = parts[0].trim()
      if (!/^\d{5,}$/.test(id) || seen[id]) return
      seen[id] = true
      out.push({ id: id, note: parts.slice(1).join("|").trim() })
    })
    return out
  }

  // ── Rendering ──────────────────────────────────────────────────────────────

  function counts() {
    var c = { live: 0, disabled: 0, error: 0 }
    state.rows.forEach(function (r) {
      if (r.status && c[r.status] !== undefined) c[r.status]++
    })
    return c
  }

  function badge(status) {
    if (status === "live") return '<span class="gbk-badge ok">Live</span>'
    if (status === "disabled") return '<span class="gbk-badge danger">Disabled</span>'
    if (status === "error") return '<span class="gbk-badge warn">Error</span>'
    return '<span class="gbk-badge mute">Queued</span>'
  }

  /**
   * In-flight chunks must not write to a dead DOM. Checking our own root — not
   * an element id — is what makes this correct: every tool uses the same ids, so
   * after the user launches a different tool over this one, `$("gbk-tablewrap")`
   * would happily resolve to *that* tool's node.
   */
  function alive() {
    return !!shell && shell.alive()
  }

  function renderTiles() {
    if (!alive()) return
    var c = counts()
    $("gbk-t-total").textContent = String(state.total)
    $("gbk-t-live").textContent = String(c.live)
    $("gbk-t-disabled").textContent = String(c.disabled)
    $("gbk-t-error").textContent = String(c.error)
  }

  function renderTable() {
    if (!alive()) return
    var wrap = $("gbk-tablewrap")
    if (!wrap) return
    if (!state.rows.length) {
      wrap.innerHTML = stateEmpty("Paste your Business Manager IDs above, then press Check.")
      return
    }
    var html =
      "<table><thead><tr>" +
      "<th style=\"width:44px\">#</th><th>Business Manager</th><th>BM ID</th>" +
      "<th>Status</th><th>Detail</th><th>Note</th>" +
      "</tr></thead><tbody>"
    state.rows.forEach(function (r, i) {
      html +=
        "<tr>" +
        '<td class="gbk-soft">' + (i + 1) + "</td>" +
        '<td class="gbk-name">' + esc(r.name || "—") + "</td>" +
        '<td class="gbk-id">' + esc(r.id) + "</td>" +
        "<td>" + badge(r.status) + "</td>" +
        '<td class="gbk-soft">' + esc(r.error || "") + "</td>" +
        '<td class="gbk-soft">' + esc(r.note || "") + "</td>" +
        "</tr>"
    })
    wrap.innerHTML = html + "</tbody></table>"
  }

  function renderProgress() {
    if (!alive()) return
    var pct = state.total ? Math.round((state.done / state.total) * 100) : 0
    $("gbk-bar").firstElementChild.style.width = pct + "%"
    $("gbk-count").innerHTML = state.running
      ? "Checking <b>" + state.done + "</b> / " + state.total
      : state.total
        ? "Checked <b>" + state.done + "</b> / " + state.total
        : "&mdash;"
  }

  function setRunning(on) {
    state.running = on
    if (!alive()) return
    $("gbk-input").disabled = on
    $("gbk-threads").disabled = on
    $("gbk-start").style.display = on ? "none" : "inline-flex"
    $("gbk-stop").style.display = on ? "inline-flex" : "none"
    $("gbk-stop").disabled = false
    $("gbk-stop").textContent = "Stop"
  }

  // ── Export ─────────────────────────────────────────────────────────────────

  // Line formats are kept byte-compatible with the partner tool — people paste
  // these lists straight into their own sheets and scripts.
  function linesFor(status) {
    return state.rows
      .filter(function (r) {
        return r.status === status
      })
      .map(function (r) {
        var base =
          status === "error"
            ? r.id + "|ERROR|" + (r.error || "Unknown error")
            : status === "disabled"
              ? r.id + "|" + (r.name || "Unknown") + "|DISABLED"
              : r.id + "|" + (r.name || "Unknown")
        return r.note ? base + "|" + r.note : base
      })
      .join("\n")
  }

  function copyBucket(status, label) {
    var text = linesFor(status)
    if (!text) {
      toast("No " + label + " results yet", "err")
      return
    }
    copyText(text, text.split("\n").length + " " + label + " row(s) copied")
  }

  // ── Run ────────────────────────────────────────────────────────────────────

  async function run() {
    var items = parseInput($("gbk-input").value)
    if (!items.length) {
      toast("Enter at least one Business Manager ID", "err")
      return
    }
    var threads = Math.min(50, Math.max(1, parseInt($("gbk-threads").value, 10) || 8))

    state.rows = items.map(function (it) {
      return { id: it.id, note: it.note, status: null, name: "", error: "" }
    })
    state.total = state.rows.length
    state.done = 0
    state.stop = false
    setRunning(true)
    renderTiles()
    renderTable()
    renderProgress()

    // Chunked concurrency: `threads` requests in flight, next chunk only after
    // the current one settles. The stop flag is checked between chunks — in-flight
    // requests are left to finish rather than aborted mid-write.
    for (var i = 0; i < state.rows.length; i += threads) {
      if (state.stop) break
      var chunk = state.rows.slice(i, i + threads)
      await Promise.all(
        chunk.map(async function (row) {
          var r = await checkOne(row.id, state.token)
          row.status = r.status
          row.name = r.name || ""
          row.error = r.error || ""
          state.done++
        }),
      )
      renderTiles()
      renderTable()
      renderProgress()
    }

    setRunning(false)
    renderProgress()
    var c = counts()
    toast(
      (state.stop ? "Stopped — " : "Done — ") + c.live + " live, " + c.disabled + " disabled, " + c.error + " error",
      c.disabled || c.error ? undefined : "ok",
    )
  }

  // ── Boot ───────────────────────────────────────────────────────────────────

  var STAGE =
    '<div class="gbk-toolbar" style="flex-direction:column;align-items:stretch;gap:10px">' +
    '<textarea id="gbk-input" rows="4" spellcheck="false" placeholder="One Business Manager ID per line. Add |note after an ID to carry a label through to the exports.&#10;922860723825395&#10;123456789012345|client A" ' +
    'style="width:100%;resize:vertical;padding:10px 12px;border:1px solid var(--card-border);border-radius:10px;font:13px/1.5 \'SF Mono\',Consolas,monospace;color:var(--ink-strong);outline:none"></textarea>' +
    '<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">' +
    '<label class="gbk-count" style="display:flex;align-items:center;gap:8px">Concurrency' +
    '<select class="gbk-select" id="gbk-threads"><option>4</option><option selected>8</option><option>16</option><option>32</option><option>50</option></select>' +
    "</label>" +
    '<span class="gbk-count gbk-soft">Higher is faster, but Facebook rate-limits aggressive bursts.</span>' +
    '<span class="gbk-grow"></span>' +
    '<button type="button" class="gbk-btn gbk-btn-primary" id="gbk-start">' + ICON_SEARCH + " Check</button>" +
    '<button type="button" class="gbk-btn gbk-btn-danger" id="gbk-stop" style="display:none">Stop</button>' +
    "</div></div>" +
    '<div class="gbk-tiles">' +
    '<div class="gbk-tile"><div class="gbk-tile-k">Total</div><div class="gbk-tile-v" id="gbk-t-total">0</div></div>' +
    '<div class="gbk-tile ok"><div class="gbk-tile-k">Live</div><div class="gbk-tile-v" id="gbk-t-live">0</div></div>' +
    '<div class="gbk-tile danger"><div class="gbk-tile-k">Disabled</div><div class="gbk-tile-v" id="gbk-t-disabled">0</div></div>' +
    '<div class="gbk-tile warn"><div class="gbk-tile-k">Error</div><div class="gbk-tile-v" id="gbk-t-error">0</div></div>' +
    "</div>" +
    '<div class="gbk-tablewrap" id="gbk-tablewrap"></div>' +
    '<div class="gbk-footer">' +
    '<span class="gbk-count" id="gbk-count">&mdash;</span>' +
    '<div class="gbk-bar" id="gbk-bar"><i></i></div>' +
    '<button type="button" class="gbk-btn gbk-btn-sm gbk-btn-ghost" id="gbk-copy-live">' + ICON_CHECK_CIRCLE + " Copy live</button>" +
    '<button type="button" class="gbk-btn gbk-btn-sm gbk-btn-ghost" id="gbk-copy-disabled">' + ICON_X_CIRCLE + " Copy disabled</button>" +
    '<button type="button" class="gbk-btn gbk-btn-sm gbk-btn-ghost" id="gbk-copy-error">' + ICON_COPY + " Copy errors</button>" +
    '<button type="button" class="gbk-btn gbk-btn-sm gbk-btn-ghost" id="gbk-csv">' + ICON_DOWNLOAD + " CSV</button>" +
    "</div>"

  state.token = readAccessToken()

  shell = openShell({
    title: "GOADS Check Live BM",
    subtitle: state.token
      ? 'Session <span class="gbk-mono">detected</span>'
      : 'Session <span class="gbk-mono">not detected</span>',
    stage: STAGE,
    onClose: function () {
      if (!state.running) return true
      return confirm("A check is still running. Close anyway?")
    },
  })

  renderTable()

  $("gbk-start").addEventListener("click", run)
  $("gbk-stop").addEventListener("click", function () {
    state.stop = true
    $("gbk-stop").disabled = true
    $("gbk-stop").textContent = "Stopping…"
  })
  $("gbk-copy-live").addEventListener("click", function () {
    copyBucket("live", "live")
  })
  $("gbk-copy-disabled").addEventListener("click", function () {
    copyBucket("disabled", "disabled")
  })
  $("gbk-copy-error").addEventListener("click", function () {
    copyBucket("error", "error")
  })
  $("gbk-csv").addEventListener("click", function () {
    if (!state.rows.length) {
      toast("Nothing to export yet", "err")
      return
    }
    // A BM display name is attacker-chosen text. Excel and Sheets treat a cell
    // starting with = + - @ as a formula, so neutralise it with a leading quote.
    function cell(v) {
      var s = String(v == null ? "" : v)
      if (/^[=+\-@]/.test(s)) s = "'" + s
      return '"' + s.replace(/"/g, '""') + '"'
    }
    var csv = "bm_id,name,status,detail,note\n"
    state.rows.forEach(function (r) {
      csv += [r.id, r.name || "", r.status || "queued", r.error || "", r.note || ""].map(cell).join(",") + "\n"
    })
    downloadText("goads-check-live-bm.csv", csv)
    toast("CSV downloaded", "ok")
  })

  if (!state.token) {
    $("gbk-tablewrap").innerHTML =
      '<div class="gbk-state"><div class="gbk-err">Couldn\'t read your Facebook access token from this page. ' +
      "Open Business Manager (business.facebook.com) while logged in, then run this tool there.</div></div>"
    $("gbk-start").disabled = true
  }
})()
