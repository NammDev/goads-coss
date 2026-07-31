/*
 * GOADS Remove BM Admins — bookmarklet source (readable; built into a one-line
 * `javascript:` payload by build-bookmarklets.mjs).
 *
 * First-party GOADS rebuild. The *design* (dark shell + white B/W cards, inline
 * logo) matches bookmarklets/goads-bm-invite.js. The *network layer* reproduces
 * Facebook's own internal Business-settings GraphQL calls — persisted-query
 * doc_ids + variable blobs are facts of FB's API, not third-party IP:
 *   - list admins:  BizKitSettingsPeopleTableListPaginationQuery  doc_id 9371006629693295
 *   - remove user:  BizKitSettingsRemoveBusinessUserMutation      doc_id 24401670346098526
 *   - remove pending: BizKitSettingsRemovePendingUserMutation     doc_id 6587364614658388
 *   - remove self:  BizKitSettingsRemoveBusinessUserMutation      doc_id 23932916982960697
 * All are GET with credentials:"include", so they run with the user's own FB
 * session. Session (businessID + token) is read from the page's require()
 * modules, with a DOM/cookie fallback (same as the invite tool).
 *
 * Logo is inline SVG (not <img>): facebook.com's CSP img-src can't block markup.
 */
(function () {
  "use strict";

  var BRAND_HOST = "goadsagency.com";
  var TELEGRAM_URL = "https://t.me/goadsagency";
  var WEBSITE_URL = "https://goadsagency.com";
  var GRAPH = "https://graph.facebook.com";

  var ROOT_ID = "goads-bmr";
  var BACKDROP_ID = "goads-bmr-backdrop";
  var STYLE_ID = "goads-bmr-style";

  // Sweep every GOADS modal, not just this tool's own: the library shares one
  // screen and a second modal stacked on the first is never what the user wants.
  [ROOT_ID, BACKDROP_ID, "goads-bk", "goads-bk-backdrop", "goads-bmi", "goads-bmi-backdrop", "goads-bmr", "goads-bmr-backdrop"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.remove();
  });

  var state = { token: null, bmId: null, viewerId: null, admins: [], busy: false };

  // ── Icons (currentColor) ───────────────────────────────────────────────────
  var I = {
    close:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    users:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    search:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    trash:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 11v6M14 11v6"/></svg>',
    refresh:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/></svg>',
    telegram:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>',
    alert:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.3 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.3a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>',
  };

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

  // ── Styles — shared token vocabulary with goads-bm-invite.js ───────────────
  var CSS =
    "#" + BACKDROP_ID + "{position:fixed;inset:0;background:rgba(2,3,8,.55);z-index:2147483646;animation:gbmrFade .15s ease}" +
    "#" + ROOT_ID + "{--bg:#020308;--fg:#fff;--chrome-sub:#ffffffb3;--chrome-muted:#ffffff70;--chrome-border:#ffffff29;--chrome-surface:#ffffff14;" +
    "--card:#fff;--card-border:#e6e7ec;--ink-strong:#171920;--ink:#343642;--ink-soft:#4c505f;" +
    "--btn:#020308;--btn-hover:#24262e;--ok:#16a34a;--ok-bg:#f0fdf4;--ok-border:#bbf7d0;" +
    "--warn:#b45309;--warn-bg:#fffbeb;--warn-border:#fde68a;--danger:#dc2626;--danger-hover:#b91c1c;--err-bg:#fef2f2;--err-border:#fecaca;--err-fg:#b91c1c;" +
    "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:2147483647;" +
    "width:1000px;max-width:calc(100vw - 32px);max-height:92vh;display:flex;flex-direction:column;overflow:hidden;" +
    "font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:1.5;color:var(--fg);background:var(--bg);" +
    "border:1px solid var(--chrome-border);border-radius:16px;box-shadow:0 24px 60px -16px rgba(0,0,0,.65);animation:gbmrFade .2s ease;-webkit-font-smoothing:antialiased;box-sizing:border-box}" +
    "@keyframes gbmrFade{from{opacity:0}to{opacity:1}}@keyframes gbmrSpin{to{transform:rotate(360deg)}}" +
    "#" + ROOT_ID + " *{box-sizing:border-box}" +
    // header
    "#" + ROOT_ID + " .gbmr-header{display:flex;align-items:center;gap:13px;padding:16px 20px;border-bottom:1px solid var(--chrome-border);position:relative;flex-shrink:0}" +
    "#" + ROOT_ID + " .gbmr-mark{width:46px;height:46px;flex-shrink:0;border-radius:12px;overflow:hidden;background:#000;border:1px solid var(--chrome-border);display:inline-flex;align-items:center;justify-content:center}" +
    "#" + ROOT_ID + " .gbmr-mark svg{width:100%;height:100%;display:block}" +
    "#" + ROOT_ID + " .gbmr-htxt{min-width:0}" +
    // Facebook styles bare tags on its own pages, and a direct rule beats an
    // inherited value — without an explicit colour here the title rendered in
    // FB's near-black instead of ours.
    "#" + ROOT_ID + " h1,#" + ROOT_ID + " h2,#" + ROOT_ID + " h3,#" + ROOT_ID + " p,#" + ROOT_ID + " span,#" +
    ROOT_ID + " div,#" + ROOT_ID + " label,#" + ROOT_ID + " li,#" + ROOT_ID + " a{color:inherit}" +
    "#" + ROOT_ID + " .gbmr-title{margin:0;font-size:19px;font-weight:550;line-height:24px;letter-spacing:-.0144em;color:var(--fg)}" +
    "#" + ROOT_ID + " .gbmr-sub{margin:3px 0 0;font-size:13px;color:var(--chrome-sub);letter-spacing:-.006em}" +
    "#" + ROOT_ID + " .gbmr-bmid{font-family:'SF Mono','Fira Code',Consolas,monospace}" +
    "#" + ROOT_ID + " .gbmr-close{position:absolute;right:14px;top:14px;width:28px;height:28px;border:0;border-radius:50%;background:var(--chrome-surface);color:var(--fg);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s}" +
    "#" + ROOT_ID + " .gbmr-close:hover{background:rgba(255,255,255,.2)}#" + ROOT_ID + " .gbmr-close svg{width:15px;height:15px}" +
    // white card stage
    "#" + ROOT_ID + " .gbmr-stage{margin:14px;background:var(--card);border:1px solid var(--card-border);border-radius:14px;overflow:hidden;color:var(--ink);display:flex;flex-direction:column;min-height:0;flex:1}" +
    // toolbar
    "#" + ROOT_ID + " .gbmr-toolbar{display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding:14px 16px;border-bottom:1px solid var(--card-border)}" +
    "#" + ROOT_ID + " .gbmr-field{display:flex;align-items:center;gap:8px;flex:1;min-width:200px;padding:9px 12px;background:#fff;border:1px solid var(--card-border);border-radius:10px}" +
    "#" + ROOT_ID + " .gbmr-field:focus-within{border-color:#18181b}#" + ROOT_ID + " .gbmr-field svg{width:16px;height:16px;color:var(--ink-soft);flex-shrink:0}" +
    "#" + ROOT_ID + " .gbmr-field input{flex:1;min-width:0;border:0;outline:0;font:inherit;font-size:14px;color:var(--ink-strong);background:transparent}" +
    "#" + ROOT_ID + " .gbmr-select{padding:9px 12px;font:inherit;font-size:14px;color:var(--ink-strong);background:#fff;border:1px solid var(--card-border);border-radius:10px;cursor:pointer;outline:none}" +
    "#" + ROOT_ID + " .gbmr-select:focus{border-color:#18181b}" +
    "#" + ROOT_ID + " .gbmr-icon-btn{width:40px;height:40px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:#fff;border:1px solid var(--card-border);border-radius:10px;color:var(--ink-strong);cursor:pointer;transition:border-color .15s}" +
    "#" + ROOT_ID + " .gbmr-icon-btn:hover{border-color:#18181b}#" + ROOT_ID + " .gbmr-icon-btn svg{width:17px;height:17px}" +
    // table
    "#" + ROOT_ID + " .gbmr-tablewrap{overflow:auto;flex:1;min-height:120px}" +
    "#" + ROOT_ID + " table{width:100%;border-collapse:collapse;font-size:13.5px}" +
    "#" + ROOT_ID + " thead th{position:sticky;top:0;background:#fafafa;color:var(--ink-soft);text-align:left;font-weight:600;font-size:12px;text-transform:uppercase;letter-spacing:.04em;padding:11px 12px;border-bottom:1px solid var(--card-border);white-space:nowrap;z-index:1}" +
    "#" + ROOT_ID + " tbody td{padding:11px 12px;border-bottom:1px solid var(--card-border);color:var(--ink-strong);vertical-align:middle}" +
    "#" + ROOT_ID + " tbody tr:hover{background:#fafafa}" +
    "#" + ROOT_ID + " tbody tr.gone{opacity:.45}" +
    "#" + ROOT_ID + " .gbmr-name{font-weight:550;color:var(--ink-strong)}#" + ROOT_ID + " .gbmr-you{color:var(--ok);font-weight:700}" +
    "#" + ROOT_ID + " .gbmr-email{color:var(--ink-soft)}#" + ROOT_ID + " .gbmr-uid{font-family:'SF Mono',Consolas,monospace;color:var(--ink-soft);font-size:12.5px}" +
    "#" + ROOT_ID + " .gbmr-badge{display:inline-block;padding:2px 8px;border-radius:6px;font-size:12px;font-weight:600;border:1px solid transparent}" +
    "#" + ROOT_ID + " .gbmr-badge.confirmed{background:var(--ok-bg);border-color:var(--ok-border);color:var(--ok)}" +
    "#" + ROOT_ID + " .gbmr-badge.pending{background:var(--warn-bg);border-color:var(--warn-border);color:var(--warn)}" +
    "#" + ROOT_ID + " .gbmr-act{font-weight:600}#" + ROOT_ID + " .gbmr-act.ok{color:var(--ok)}#" + ROOT_ID + " .gbmr-act.err{color:var(--danger)}#" + ROOT_ID + " .gbmr-act.pend{color:var(--warn)}" +
    "#" + ROOT_ID + " .gbmr-cb{width:17px;height:17px;cursor:pointer;accent-color:#18181b}#" + ROOT_ID + " .gbmr-cb:disabled{opacity:.4;cursor:not-allowed}" +
    // state screens
    "#" + ROOT_ID + " .gbmr-state{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:48px 24px;color:var(--ink-soft);text-align:center}" +
    "#" + ROOT_ID + " .gbmr-spin{width:34px;height:34px;border:3px solid #e5e5e5;border-top-color:#18181b;border-radius:50%;animation:gbmrSpin .8s linear infinite}" +
    "#" + ROOT_ID + " .gbmr-err{max-width:460px;background:var(--err-bg);border:1px solid var(--err-border);color:var(--err-fg);padding:14px 16px;border-radius:10px;font-size:13.5px}" +
    // footer
    "#" + ROOT_ID + " .gbmr-footer{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:12px 16px;border-top:1px solid var(--card-border);flex-shrink:0}" +
    "#" + ROOT_ID + " .gbmr-count{font-size:13px;color:var(--ink-soft)}#" + ROOT_ID + " .gbmr-count b{color:var(--ink-strong)}" +
    "#" + ROOT_ID + " .gbmr-grow{flex:1}" +
    "#" + ROOT_ID + " .gbmr-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 16px;font:inherit;font-size:14px;font-weight:600;border-radius:10px;cursor:pointer;border:1px solid transparent;transition:background .15s,border-color .15s}" +
    "#" + ROOT_ID + " .gbmr-btn svg{width:16px;height:16px}#" + ROOT_ID + " .gbmr-btn:disabled{opacity:.45;cursor:not-allowed}" +
    "#" + ROOT_ID + " .gbmr-btn-ghost{background:#fff;color:var(--ink-strong);border-color:var(--card-border)}#" + ROOT_ID + " .gbmr-btn-ghost:hover:not(:disabled){border-color:#18181b}" +
    "#" + ROOT_ID + " .gbmr-btn-danger{background:var(--danger);color:#fff}#" + ROOT_ID + " .gbmr-btn-danger:hover:not(:disabled){background:var(--danger-hover)}" +
    // brand strip
    "#" + ROOT_ID + " .gbmr-brand{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:11px 20px;border-top:1px solid var(--chrome-border);font-size:13px;color:var(--chrome-muted);flex-shrink:0}" +
    "#" + ROOT_ID + " .gbmr-brand a{color:var(--chrome-sub);text-decoration:none;display:inline-flex;align-items:center;gap:6px}#" + ROOT_ID + " .gbmr-brand a:hover{color:#fff;text-decoration:underline}#" + ROOT_ID + " .gbmr-brand svg{width:15px;height:15px}" +
    // toast
    ".gbmr-toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);z-index:2147483647;padding:11px 20px;border-radius:10px;font:500 14px Inter,system-ui,sans-serif;color:#fff;background:#18181b;box-shadow:0 8px 24px rgba(0,0,0,.3);opacity:0;transition:opacity .25s}" +
    ".gbmr-toast.show{opacity:1}.gbmr-toast.ok{background:#16a34a}.gbmr-toast.err{background:#dc2626}";

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
  function $(id) { return document.getElementById(id); }

  function toast(text, kind) {
    var prev = document.querySelector(".gbmr-toast");
    if (prev) prev.remove();
    var t = document.createElement("div");
    t.className = "gbmr-toast " + (kind || "");
    t.textContent = text;
    document.body.appendChild(t);
    setTimeout(function () { t.classList.add("show"); }, 10);
    setTimeout(function () { t.classList.remove("show"); setTimeout(function () { t.remove(); }, 300); }, 2600);
  }

  function timeoutSignal(ms) {
    if (typeof AbortSignal !== "undefined" && typeof AbortSignal.timeout === "function") return AbortSignal.timeout(ms);
    var c = new AbortController();
    setTimeout(function () { c.abort(); }, ms);
    return c.signal;
  }

  // ── Session (require modules first, DOM/cookie fallback) ───────────────────
  function readSession() {
    var out = { bmId: null, token: null };
    try { out.bmId = window.require("BusinessUnifiedNavigationContext").businessID || null; } catch (e) {}
    try { out.token = window.require("WebApiApplication").getAccessToken() || null; } catch (e) {}
    if (!out.bmId) {
      var pm = window.location.pathname.match(/\/(\d{10,})(?:\/|$)/);
      if (pm) out.bmId = pm[1];
      if (!out.bmId) {
        var qp = new URLSearchParams(window.location.search).get("business_id");
        if (qp) out.bmId = qp;
      }
    }
    if (!out.token) {
      var html = document.documentElement.innerHTML;
      var tm = html.match(/EAAG[A-Za-z0-9]+/g) || html.match(/EAAB[A-Za-z0-9]+/g);
      if (tm) { tm.sort(function (a, b) { return b.length - a.length; }); out.token = tm[0]; }
    }
    return out;
  }

  function relTime(sec) {
    if (!sec) return "N/A";
    var d = Math.floor(Date.now() / 1000 - sec);
    if (d < 60) return d + "s ago";
    if (d < 3600) return Math.floor(d / 60) + "m ago";
    if (d < 86400) return Math.floor(d / 3600) + "h ago";
    if (d < 2592000) return Math.floor(d / 86400) + "d ago";
    return Math.floor(d / 2592000) + "mo ago";
  }

  // ── List admins (paginated GraphQL) ────────────────────────────────────────
  async function fetchAdmins(businessID, token, first, maxPages) {
    first = first || 25;
    maxPages = maxPages || 4;
    var all = [];
    var cursor = null;
    var page = 0;
    while (page < maxPages) {
      try {
        var cur = cursor
          ? "%2C%22cursor%22%3A%22" + encodeURIComponent(cursor) + "%22"
          : "%2C%22cursor%22%3Anull";
        var url =
          GRAPH +
          "/graphql?method=post&locale=en_US&pretty=false&format=json&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=BizKitSettingsPeopleTableListPaginationQuery&variables=%7B%22asset_types%22%3Anull%2C%22businessAccessType%22%3A%5B%5D%2C%22businessAccountTypes%22%3A%5B%5D" +
          cur +
          "%2C%22first%22%3A" + first +
          "%2C%22isBulkUserRemovalEnabled%22%3Atrue%2C%22isUnifiedSettings%22%3Atrue%2C%22orderBy%22%3A%22MOST_RECENTLY_CREATED%22%2C%22permissions%22%3A%5B%5D%2C%22searchTerm%22%3Anull%2C%22id%22%3A%22" +
          businessID +
          "%22%7D&server_timestamps=true&doc_id=9371006629693295&access_token=" +
          token;
        var resp = await fetch(url, { method: "GET", credentials: "include", signal: timeoutSignal(10000) });
        var json = await resp.json();
        if (json.error) break;
        var node = json && json.data && json.data.node;
        var edges = node && node.business_users_and_invitations && node.business_users_and_invitations.edges;
        if (!edges || edges.length === 0) break;
        var viewerId = node && node.business_user_for_viewer && node.business_user_for_viewer.id;
        if (viewerId) state.viewerId = viewerId;
        edges.forEach(function (e) {
          var info = e && e.userInfoForSelection;
          var last = e && e.statusColumn && e.statusColumn.last_active_time;
          var access =
            e && e.roleColumn && e.roleColumn.permitted_business_account_tasks_summary &&
            e.roleColumn.permitted_business_account_tasks_summary.standalone &&
            e.roleColumn.permitted_business_account_tasks_summary.standalone.primary_access_summary;
          var isPending = e && e.node && e.node.__typename === "BusinessRoleRequest";
          all.push({
            id: info && info.id,
            name: (info && info.name) || "—",
            email: (info && info.email) || (e && e.nameColumn && e.nameColumn.invited_email) || "—",
            status: isPending ? "PENDING" : "CONFIRMED",
            lastActive: last ? relTime(last) : "N/A",
            role: access === "Full control" ? "Full control" : "Partial access",
            userType: (e && e.nameColumn && e.nameColumn.backed_user_type) || "N/A",
            isYou: !!(viewerId && info && info.id === viewerId),
          });
        });
        var pi = node.business_users_and_invitations.page_info;
        if (!pi || !pi.has_next_page) break;
        cursor = pi.end_cursor;
        page++;
      } catch (err) {
        await new Promise(function (r) { setTimeout(r, 1000); });
        break;
      }
    }
    return all;
  }

  // ── Remove one admin (dispatch by status) ─────────────────────────────────
  async function removeConfirmed(businessID, token, userId) {
    var vars = JSON.stringify({ businessID: businessID, businessUserID: userId });
    var url =
      GRAPH +
      "/graphql?method=post&locale=en_US&pretty=false&format=json&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=BizKitSettingsRemoveBusinessUserMutation&variables=" +
      encodeURIComponent(vars) +
      "&server_timestamps=true&doc_id=24401670346098526&access_token=" + token;
    try {
      var r = await fetch(url, { method: "GET", credentials: "include" });
      var j = await r.json();
      return (
        j && j.data && j.data.business_settings_remove_business_user &&
        j.data.business_settings_remove_business_user.removed_business_user_id === userId
      );
    } catch (e) { return false; }
  }

  async function removePending(token, roleRequestId) {
    var url =
      GRAPH +
      "/graphql?method=post&locale=en_US&pretty=false&format=json&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=BizKitSettingsRemovePendingUserMutation&variables=%7B%22businessRoleRequestID%22%3A%22" +
      roleRequestId +
      "%22%7D&server_timestamps=true&doc_id=6587364614658388&access_token=" + token;
    try {
      var r = await fetch(url, { method: "GET", credentials: "include" });
      var j = await r.json();
      return (
        j && j.data && j.data.business_settings_remove_pending_user &&
        j.data.business_settings_remove_pending_user.removed_business_role_request_id === roleRequestId
      );
    } catch (e) { return false; }
  }

  function removeOne(admin) {
    return admin.status === "PENDING"
      ? removePending(state.token, admin.id)
      : removeConfirmed(state.bmId, state.token, admin.id);
  }

  // ── UI shell ───────────────────────────────────────────────────────────────
  injectStyle();
  var backdrop = document.createElement("div");
  backdrop.id = BACKDROP_ID;
  var root = document.createElement("div");
  root.id = ROOT_ID;
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-modal", "true");
  root.innerHTML =
    '<div class="gbmr-header">' +
    '<span class="gbmr-mark">' + LOGO_SVG + "</span>" +
    '<div class="gbmr-htxt">' +
    '<h2 class="gbmr-title">GOADS Remove BM Admins</h2>' +
    '<p class="gbmr-sub">' + BRAND_HOST + ' &nbsp;|&nbsp; Business Manager <span class="gbmr-bmid" id="gbmr-bmid">…</span></p>' +
    "</div>" +
    '<button type="button" class="gbmr-close" id="gbmr-close" title="Close">' + I.close + "</button>" +
    "</div>" +
    '<div class="gbmr-stage">' +
    '<div class="gbmr-toolbar">' +
    '<label class="gbmr-field">' + I.search +
    '<input type="text" id="gbmr-search" placeholder="Search by name, email or ID…" autocomplete="off" spellcheck="false"></label>' +
    '<select class="gbmr-select" id="gbmr-role"><option value="">All roles</option><option value="Full control">Full control</option><option value="Partial access">Partial access</option></select>' +
    '<select class="gbmr-select" id="gbmr-status"><option value="">All status</option><option value="CONFIRMED">Confirmed</option><option value="PENDING">Pending</option></select>' +
    '<button type="button" class="gbmr-icon-btn" id="gbmr-refresh" title="Reload">' + I.refresh + "</button>" +
    "</div>" +
    '<div class="gbmr-tablewrap" id="gbmr-tablewrap">' +
    '<div class="gbmr-state"><div class="gbmr-spin"></div><div>Loading Business Manager admins…</div></div>' +
    "</div>" +
    '<div class="gbmr-footer">' +
    '<label style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--ink-soft);cursor:pointer">' +
    '<input type="checkbox" class="gbmr-cb" id="gbmr-all" disabled> Select all</label>' +
    '<span class="gbmr-count" id="gbmr-count">—</span>' +
    '<span class="gbmr-grow"></span>' +
    '<button type="button" class="gbmr-btn gbmr-btn-danger" id="gbmr-remove" disabled>' + I.trash + '<span id="gbmr-removeLabel">Remove selected</span></button>' +
    "</div>" +
    "</div>" +
    '<div class="gbmr-brand">' +
    '<a href="' + TELEGRAM_URL + '" target="_blank" rel="noreferrer">' + I.telegram + " Join Telegram · t.me/goadsagency</a>" +
    '<a href="' + WEBSITE_URL + '" target="_blank" rel="noreferrer">' + BRAND_HOST + "</a>" +
    "</div>";

  document.body.appendChild(backdrop);
  document.body.appendChild(root);

  function close() {
    root.remove();
    backdrop.remove();
    document.removeEventListener("keydown", onKey);
  }
  function onKey(e) { if (e.key === "Escape") close(); }
  document.addEventListener("keydown", onKey);
  $("gbmr-close").addEventListener("click", close);
  backdrop.addEventListener("click", close);

  // ── Rendering ──────────────────────────────────────────────────────────────
  function visibleAdmins() {
    var q = $("gbmr-search").value.trim().toLowerCase();
    var role = $("gbmr-role").value;
    var status = $("gbmr-status").value;
    return state.admins.filter(function (a) {
      if (role && a.role !== role) return false;
      if (status && a.status !== status) return false;
      if (!q) return true;
      return (
        String(a.name).toLowerCase().includes(q) ||
        String(a.email).toLowerCase().includes(q) ||
        String(a.id).toLowerCase().includes(q)
      );
    });
  }

  function renderTable() {
    var wrap = $("gbmr-tablewrap");
    var rows = visibleAdmins();
    if (!state.admins.length) {
      wrap.innerHTML = '<div class="gbmr-state"><div>No admins found for this Business Manager.</div></div>';
      $("gbmr-all").disabled = true;
      updateFooter();
      return;
    }
    var html =
      "<table><thead><tr>" +
      '<th style="width:36px"></th><th>Name</th><th>Email</th><th>ID</th><th>Status</th><th>Role</th><th>Last active</th><th>Action</th>' +
      "</tr></thead><tbody>";
    rows.forEach(function (a, i) {
      var idx = state.admins.indexOf(a);
      html +=
        '<tr data-idx="' + idx + '">' +
        '<td><input type="checkbox" class="gbmr-cb gbmr-pick" data-idx="' + idx + '"' + (a.isYou ? " disabled title=\"That's you — use Facebook to leave a BM\"" : "") + "></td>" +
        '<td><span class="' + (a.isYou ? "gbmr-you" : "gbmr-name") + '">' + esc(a.name) + (a.isYou ? " (You)" : "") + "</span></td>" +
        '<td class="gbmr-email">' + esc(a.email) + "</td>" +
        '<td class="gbmr-uid">' + esc(a.id) + "</td>" +
        '<td><span class="gbmr-badge ' + (a.status === "PENDING" ? "pending" : "confirmed") + '">' + (a.status === "PENDING" ? "Pending" : "Confirmed") + "</span></td>" +
        "<td>" + esc(a.role) + "</td>" +
        "<td>" + esc(a.lastActive) + "</td>" +
        '<td class="gbmr-action" data-idx="' + idx + '">—</td>' +
        "</tr>";
    });
    html += "</tbody></table>";
    if (!rows.length) html = '<div class="gbmr-state"><div>No admins match your filters.</div></div>';
    wrap.innerHTML = html;

    wrap.querySelectorAll(".gbmr-pick").forEach(function (cb) {
      cb.addEventListener("change", updateFooter);
    });
    $("gbmr-all").disabled = false;
    updateFooter();
  }

  function pickedIdx() {
    return Array.prototype.slice
      .call(document.querySelectorAll(".gbmr-pick:checked"))
      .map(function (cb) { return parseInt(cb.getAttribute("data-idx"), 10); });
  }

  function updateFooter() {
    var picked = pickedIdx();
    var total = state.admins.length;
    $("gbmr-count").innerHTML = "<b>" + total + "</b> admin" + (total === 1 ? "" : "s") + " · <b>" + picked.length + "</b> selected";
    $("gbmr-remove").disabled = picked.length === 0 || state.busy;
    var boxes = document.querySelectorAll(".gbmr-pick:not(:disabled)");
    $("gbmr-all").checked = boxes.length > 0 && picked.length === boxes.length;
  }

  $("gbmr-all").addEventListener("change", function () {
    var on = $("gbmr-all").checked;
    document.querySelectorAll(".gbmr-pick:not(:disabled)").forEach(function (cb) { cb.checked = on; });
    updateFooter();
  });
  ["gbmr-search", "gbmr-role", "gbmr-status"].forEach(function (id) {
    $(id).addEventListener("input", renderTable);
    $(id).addEventListener("change", renderTable);
  });
  $("gbmr-refresh").addEventListener("click", load);

  // ── Bulk remove ─────────────────────────────────────────────────────────────
  $("gbmr-remove").addEventListener("click", async function () {
    var idxs = pickedIdx();
    if (!idxs.length || state.busy) return;
    if (!window.confirm("Remove " + idxs.length + " selected admin(s) from this Business Manager? This cannot be undone.")) return;

    state.busy = true;
    $("gbmr-remove").disabled = true;
    $("gbmr-all").disabled = true;
    var label = $("gbmr-removeLabel");
    var done = 0, ok = 0, fail = 0;

    for (var k = 0; k < idxs.length; k++) {
      var idx = idxs[k];
      var admin = state.admins[idx];
      label.textContent = "Removing " + (k + 1) + "/" + idxs.length + "…";
      var cell = document.querySelector('.gbmr-action[data-idx="' + idx + '"]');
      var row = document.querySelector('tr[data-idx="' + idx + '"]');
      if (cell) { cell.className = "gbmr-action gbmr-act pend"; cell.textContent = "Removing…"; }

      var success = await removeOne(admin);
      done++;
      if (success) {
        ok++;
        admin.removed = true;
        if (cell) { cell.className = "gbmr-action gbmr-act ok"; cell.textContent = "Removed"; }
        if (row) row.classList.add("gone");
        var pick = document.querySelector('.gbmr-pick[data-idx="' + idx + '"]');
        if (pick) { pick.checked = false; pick.disabled = true; }
      } else {
        fail++;
        if (cell) { cell.className = "gbmr-action gbmr-act err"; cell.textContent = "Failed"; }
      }
    }

    // Drop removed admins from state so the count reflects reality.
    state.admins = state.admins.filter(function (a) { return !a.removed; });
    state.busy = false;
    $("gbmr-all").disabled = false;
    label.textContent = "Remove selected";
    updateFooter();
    toast(ok + " removed" + (fail ? ", " + fail + " failed" : ""), fail ? "err" : "ok");
    // Re-render after a beat so the greyed rows settle, then refresh the list.
    setTimeout(renderTable, 900);
  });

  // ── Boot / load ──────────────────────────────────────────────────────────────
  function showError(msg) {
    $("gbmr-tablewrap").innerHTML =
      '<div class="gbmr-state"><div class="gbmr-err">' + esc(msg) + "</div></div>";
    $("gbmr-all").disabled = true;
    $("gbmr-remove").disabled = true;
    $("gbmr-count").textContent = "—";
  }

  async function load() {
    var s = readSession();
    state.token = s.token;
    state.bmId = s.bmId;
    $("gbmr-bmid").textContent = s.bmId || "not detected";

    if (!s.bmId || !s.token) {
      showError(
        "Couldn't read your Business Manager ID or access token. Open your Business Manager at business.facebook.com (the People / Settings page), then run this tool there."
      );
      return;
    }

    $("gbmr-tablewrap").innerHTML =
      '<div class="gbmr-state"><div class="gbmr-spin"></div><div>Loading Business Manager admins…</div></div>';
    $("gbmr-count").textContent = "Loading…";

    var admins = await fetchAdmins(s.bmId, s.token);
    if (!admins.length) {
      showError("No admin data found. Make sure you're on your Business Manager People/Settings page, then reload.");
      return;
    }
    state.admins = admins;
    renderTable();
  }

  load();
})();
