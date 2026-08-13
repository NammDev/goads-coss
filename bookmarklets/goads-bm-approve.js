/*
 * GOADS Approve BM Requests — bookmarklet source (readable; built into a
 * one-line `javascript:` payload by build-bookmarklets.mjs).
 *
 * Lists the PENDING access requests your Business Manager has RECEIVED — other
 * people or businesses asking for access to your assets — and approves the ones
 * you pick. Reproduces Facebook's own Business-settings GraphQL calls
 * (persisted-query doc_ids are facts of FB's API), all GET with
 * credentials:"include", so everything runs on the user's own session.
 *
 * Rebuilt first-party from the partner tool, with its two list bugs fixed:
 *   - it shipped a hardcoded `cursor:"19"`, so the list it showed was an
 *     arbitrary slice rather than the real first page. First page now sends no
 *     cursor, and paging uses the real `page_info.end_cursor`.
 *   - `has_next_page` was computed and then ignored; pages are now actually followed.
 * Approving grants real access and cannot be undone from here, so unlike the
 * original this asks for confirmation before it fires the mutations.
 */
import {
  $,
  esc,
  openShell,
  relTime,
  stateEmpty,
  stateError,
  stateLoading,
  timeoutSignal,
  toast,
  BRAND,
} from "./shared/goads-shell.js"
import { readAccessToken, readBusinessId } from "./shared/goads-fb-session.js"
import { ICON_CHECK, ICON_REFRESH, ICON_SEARCH } from "./shared/goads-icons.js"

;(function () {
  "use strict"

  var GRAPH = "https://graph.facebook.com"
  var REQUEST_TIMEOUT_MS = 25000
  var PAGE_SIZE = 20
  var MAX_PAGES = 10
  var DELAY_BETWEEN_APPROVALS_MS = 500

  // Facebook's persisted queries. These rot whenever FB rotates its doc_ids —
  // when the list stops loading, this is the first thing to re-capture.
  var Q_LIST_FIRST = {
    name: "BusinessCometBizSuiteSettingsBusinessRequestsViewContainerQuery",
    docId: "24355280274092427",
  }
  var Q_LIST_PAGE = {
    name: "BizKitSettingsBusinessUnifiedRequestListPaginationQuery",
    docId: "24388768410825768",
  }
  var Q_APPROVE = {
    name: "BizKitSettingsSensitiveActionReviewDetailPanelApproveModalMutation",
    docId: "30932400626405115",
  }

  var shell = null
  var state = { token: null, bmId: null, requests: [], picked: {}, busy: false }

  /**
   * False once this modal is closed or replaced by another tool. Every tool
   * shares the same element ids, so an approval landing after the user switched
   * tools would otherwise write into the other tool's DOM.
   */
  function alive() {
    return !!shell && shell.alive()
  }

  // ── GraphQL ────────────────────────────────────────────────────────────────

  function graphqlUrl(query, variables, token) {
    return (
      GRAPH + "/graphql?method=post&locale=en_US&pretty=false&format=json" +
      "&fb_api_caller_class=RelayModern" +
      "&fb_api_req_friendly_name=" + query.name +
      "&variables=" + encodeURIComponent(JSON.stringify(variables)) +
      "&server_timestamps=true&doc_id=" + query.docId +
      "&access_token=" + encodeURIComponent(token)
    )
  }

  async function graphql(query, variables, token) {
    var res = await fetch(graphqlUrl(query, variables, token), {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
      signal: timeoutSignal(REQUEST_TIMEOUT_MS),
    })
    if (!res.ok) throw new Error("HTTP " + res.status + " " + res.statusText)
    var json = await res.json()
    if (json && json.errors && json.errors.length) {
      var e = json.errors[0]
      throw new Error(e.summary || e.message || "GraphQL error")
    }
    return json
  }

  /** One request edge → the flat row the table renders. */
  function toRow(node) {
    var obj = (node && node.bm_request_object) || {}
    return {
      id: node.request_id,
      requester: (obj.business_user_requestor && obj.business_user_requestor.name) || "Unknown",
      fromBusiness: (obj.business && obj.business.name) || "Unknown Business",
      toBusiness: (obj.reviewed_business && obj.reviewed_business.name) || "Unknown",
      adAccountName: (obj.ad_account && obj.ad_account.name) || "",
      adAccountId: (obj.ad_account && obj.ad_account.id) || "",
      type: String(node.request_type || "Unknown").replace(/^UNIFIED_BUSINESS_/, ""),
      created: node.creation_time,
      status: "pending", // client-side only: pending | processing | approved | failed
      detail: "",
    }
  }

  function readEdges(json) {
    var mbs =
      json && json.data && json.data.business && json.data.business.unified_business_requests_mbs
    if (!mbs) return { rows: [], cursor: null, more: false }
    var info = mbs.page_info || {}
    return {
      rows: (mbs.edges || []).filter(function (e) { return e && e.node }).map(function (e) { return toRow(e.node) }),
      cursor: info.end_cursor || null,
      more: !!info.has_next_page,
    }
  }

  /** First page uses the plain view query; later pages use the paginated one. */
  async function fetchRequests(bmId, token) {
    var out = []
    var first = await graphql(
      Q_LIST_FIRST,
      {
        businessID: bmId,
        hasRequestID: false,
        requestID: "",
        statusFilters: ["PENDING"],
        orderBy: "CREATION_DATE_DESC",
        directionFilter: "RECEIVED",
        __relay_internal__pv__UnifiedSettingsRequestMigrationrelayprovider: true,
      },
      token,
    )
    var page = readEdges(first)
    out = out.concat(page.rows)

    for (var i = 1; i < MAX_PAGES && page.more && page.cursor; i++) {
      var next = await graphql(
        Q_LIST_PAGE,
        {
          businessID: bmId,
          count: PAGE_SIZE,
          cursor: page.cursor,
          directionFilter: "RECEIVED",
          orderBy: "CREATION_DATE_DESC",
          statusFilters: ["PENDING"],
          id: bmId,
        },
        token,
      )
      page = readEdges(next)
      out = out.concat(page.rows)
    }
    return out
  }

  async function approveOne(requestId, bmId, token) {
    var json = await graphql(Q_APPROVE, { reviewID: requestId, businessID: bmId }, token)
    var r = json && json.data && json.data.approve_business_request
    if (r && r.status === "APPROVED") return { ok: true }
    return { ok: false, error: (r && (r.error_message || r.status)) || "Approval was not accepted" }
  }

  // ── Rendering ──────────────────────────────────────────────────────────────

  function visibleRows() {
    var q = $("gbk-search").value.trim().toLowerCase()
    if (!q) return state.requests
    return state.requests.filter(function (r) {
      return (
        r.requester.toLowerCase().indexOf(q) >= 0 ||
        r.fromBusiness.toLowerCase().indexOf(q) >= 0 ||
        r.adAccountName.toLowerCase().indexOf(q) >= 0 ||
        String(r.adAccountId).indexOf(q) >= 0 ||
        r.type.toLowerCase().indexOf(q) >= 0
      )
    })
  }

  function statusBadge(r) {
    if (r.status === "approved") return '<span class="gbk-badge ok">Approved</span>'
    if (r.status === "failed")
      return '<span class="gbk-badge danger" title="' + esc(r.detail) + '">Failed</span>'
    if (r.status === "processing") return '<span class="gbk-badge info">Approving…</span>'
    return '<span class="gbk-badge mute">Pending</span>'
  }

  function renderTable() {
    // The user can force-close (or launch another tool) while approvals are
    // still running; the loop must not write into a DOM that isn't ours.
    if (!alive()) return
    var wrap = $("gbk-tablewrap")
    if (!wrap) return
    var rows = visibleRows()
    if (!rows.length) {
      wrap.innerHTML = stateEmpty(
        state.requests.length ? "No request matches that search." : "No pending requests for this Business Manager.",
      )
      updateFooter()
      return
    }
    var html =
      "<table><thead><tr>" +
      '<th style="width:40px"></th><th>Requester</th><th>Access flow</th><th>Ad account</th>' +
      "<th>Type</th><th>Created</th><th>Status</th>" +
      "</tr></thead><tbody>"
    rows.forEach(function (r) {
      var done = r.status === "approved"
      html +=
        '<tr class="' + (done ? "gone" : "") + '">' +
        '<td><input type="checkbox" class="gbk-cb gbk-pick" data-id="' + esc(r.id) + '"' +
        (state.picked[r.id] ? " checked" : "") + (done || state.busy ? " disabled" : "") + "></td>" +
        '<td><div class="gbk-name">' + esc(r.requester) + "</div>" +
        '<div class="gbk-id">' + esc(String(r.id).slice(0, 18)) + "…</div></td>" +
        '<td><div class="gbk-soft">' + esc(r.fromBusiness) + "</div>" +
        '<div class="gbk-name">→ ' + esc(r.toBusiness) + "</div></td>" +
        "<td>" + (r.adAccountName ? '<div class="gbk-name">' + esc(r.adAccountName) + "</div>" : "") +
        (r.adAccountId ? '<div class="gbk-id">act_' + esc(r.adAccountId) + "</div>" : '<span class="gbk-soft">—</span>') +
        "</td>" +
        '<td><span class="gbk-badge mute">' + esc(r.type) + "</span></td>" +
        '<td class="gbk-soft">' + esc(relTime(r.created)) + "</td>" +
        "<td>" + statusBadge(r) + "</td>" +
        "</tr>"
    })
    wrap.innerHTML = html + "</tbody></table>"
    wrap.querySelectorAll(".gbk-pick").forEach(function (cb) {
      cb.addEventListener("change", function () {
        state.picked[cb.getAttribute("data-id")] = cb.checked
        updateFooter()
      })
    })
    updateFooter()
  }

  function pickedIds() {
    return state.requests
      .filter(function (r) {
        return state.picked[r.id] && r.status !== "approved"
      })
      .map(function (r) {
        return r.id
      })
  }

  function updateFooter() {
    if (!alive() || !$("gbk-count")) return
    var n = pickedIds().length
    var approved = state.requests.filter(function (r) {
      return r.status === "approved"
    }).length
    $("gbk-count").innerHTML =
      "<b>" + state.requests.length + "</b> pending &nbsp;·&nbsp; <b>" + n + "</b> selected" +
      (approved ? " &nbsp;·&nbsp; <b>" + approved + "</b> approved" : "")
    $("gbk-approve").disabled = !n || state.busy
    $("gbk-all").disabled = state.busy || !state.requests.length
  }

  // ── Actions ────────────────────────────────────────────────────────────────

  async function approveSelected() {
    var ids = pickedIds()
    if (!ids.length) return
    if (
      !confirm(
        "Approve " + ids.length + " request(s)?\n\n" +
          "This grants the requesters real access to your Business Manager assets. " +
          "It cannot be undone from this tool.",
      )
    )
      return

    state.busy = true
    updateFooter()
    renderTable()

    var ok = 0
    var failed = 0
    for (var i = 0; i < ids.length; i++) {
      var row = state.requests.filter(function (r) {
        return r.id === ids[i]
      })[0]
      if (!row) continue
      row.status = "processing"
      renderTable()
      try {
        var res = await approveOne(row.id, state.bmId, state.token)
        if (res.ok) {
          row.status = "approved"
          row.detail = ""
          ok++
        } else {
          row.status = "failed"
          row.detail = res.error
          failed++
        }
      } catch (e) {
        row.status = "failed"
        row.detail = (e && e.message) || "Request failed"
        failed++
      }
      state.picked[row.id] = false
      renderTable()
      // Space the mutations out — a tight loop against this endpoint gets throttled.
      if (i < ids.length - 1) await new Promise(function (r) { setTimeout(r, DELAY_BETWEEN_APPROVALS_MS) })
    }

    state.busy = false
    state.requests = state.requests.filter(function (r) {
      return r.status !== "approved"
    })
    renderTable()
    toast(
      "Approved " + ok + (failed ? ", " + failed + " failed" : ""),
      failed ? "err" : "ok",
    )
  }

  async function load() {
    if (!alive()) return
    $("gbk-tablewrap").innerHTML = stateLoading("Loading pending requests…")
    $("gbk-count").textContent = "Loading…"
    try {
      state.requests = await fetchRequests(state.bmId, state.token)
      if (!alive()) return
      state.picked = {}
      $("gbk-all").checked = false
      renderTable()
    } catch (e) {
      if (!alive()) return
      $("gbk-tablewrap").innerHTML = stateError(
        "Couldn't load requests: " + ((e && e.message) || "unknown error") +
          ". Make sure you're on your Business Manager's Requests page and reload.",
      )
      $("gbk-count").innerHTML = "&mdash;"
      $("gbk-approve").disabled = true
    }
  }

  // ── Boot ───────────────────────────────────────────────────────────────────

  var STAGE =
    '<div class="gbk-toolbar">' +
    '<label class="gbk-field">' + ICON_SEARCH +
    '<input type="text" id="gbk-search" placeholder="Search requester, business, ad account or type…" autocomplete="off" spellcheck="false"></label>' +
    '<button type="button" class="gbk-icon-btn" id="gbk-refresh" title="Reload">' + ICON_REFRESH + "</button>" +
    "</div>" +
    '<div class="gbk-tablewrap" id="gbk-tablewrap"></div>' +
    '<div class="gbk-footer">' +
    '<label style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--ink-soft);cursor:pointer">' +
    '<input type="checkbox" class="gbk-cb" id="gbk-all" disabled> Select all</label>' +
    '<span class="gbk-count" id="gbk-count">&mdash;</span>' +
    '<span class="gbk-grow"></span>' +
    '<button type="button" class="gbk-btn gbk-btn-ok" id="gbk-approve" disabled>' + ICON_CHECK + " Approve selected</button>" +
    "</div>"

  state.token = readAccessToken()
  state.bmId = readBusinessId()

  shell = openShell({
    title: BRAND.name + " Approve BM Requests",
    subtitle: 'Business Manager <span class="gbk-mono">' + esc(state.bmId || "not detected") + "</span>",
    stage: STAGE,
    onClose: function () {
      if (!state.busy) return true
      return confirm("Approvals are still running. Close anyway?")
    },
  })

  $("gbk-refresh").addEventListener("click", function () {
    if (!state.busy) load()
  })
  $("gbk-search").addEventListener("input", renderTable)
  $("gbk-all").addEventListener("change", function () {
    var on = $("gbk-all").checked
    visibleRows().forEach(function (r) {
      if (r.status !== "approved") state.picked[r.id] = on
    })
    renderTable()
  })
  $("gbk-approve").addEventListener("click", approveSelected)

  if (!state.token || !state.bmId) {
    $("gbk-tablewrap").innerHTML = stateError(
      "Couldn't read your Business Manager ID or access token. Open your Business Manager at " +
        "business.facebook.com (the Requests page), then run this tool there.",
    )
  } else {
    load()
  }
})()
