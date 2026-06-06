// GOADS BM Invite — Content Script (overlay injected into FB page)
(() => {
  // Prevent double injection
  if (document.getElementById("goads-bm-overlay")) {
    toggleVisibility();
    return;
  }

  let token = null;
  let eaag = null;
  let bmId = null;
  let userName = null;

  // Listen for toggle message from background
  chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.action === "toggleUI") {
      toggleVisibility();
      sendResponse({ ok: true });
    }
  });

  // ── Message helper to background ──
  function msg(action, data) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ action, ...(data || {}) }, (resp) => {
        if (chrome.runtime.lastError) resolve({ ok: false, error: chrome.runtime.lastError.message });
        else resolve(resp || { ok: false });
      });
    });
  }

  // ── DOM ref helper (scoped to overlay) ──
  const $ = (id) => document.getElementById(id);

  // ── Escape user-provided text before inserting via innerHTML ──
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ── Centralized inline SVG icon set (stroke-based, inherits currentColor) ──
  // Every button/label references one of these so icons stay consistent and
  // each one visually matches its action. Sized via CSS (svg { width/height }).
  const I = {
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7M19 12H5"/></svg>',
    invite: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></svg>',
    cookie: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01M16 15.5v.01M12 12v.01M11 17v.01M7 14v.01"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    role: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>',
    dice: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 8h.01M16 8h.01M8 16h.01M16 16h.01M12 12h.01"/></svg>',
    external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>',
    key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.6 17.4A2 2 0 0 0 2 18.8V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.2a2 2 0 0 0 1.4-.6l.8-.8a6.5 6.5 0 1 0-4-4z"/><circle cx="16.5" cy="7.5" r=".6" fill="currentColor"/></svg>',
    status: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>',
    notes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 12H3m8 6H3m18-12H3"/><path d="m15 16 2 2 4-4"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.3 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.3a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
    sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4l1.6 4.1L18 9.7l-4.4 1.6L12 15.4l-1.6-4.1L6 9.7l4.4-1.6z"/><path d="M19 13l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/></svg>',
    inbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
  };

  // Official GOADS logo (white G + panda on black) — packaged asset, resolved at
  // runtime so it works on any injected page (declared in web_accessible_resources).
  const LOGO_URL = chrome.runtime.getURL("goads-logo.png");

  // Bundle Inter (the goadsagency.com site font) so the tool matches the website
  // typography instead of falling back to the host page's system font.
  const FONT_URL = chrome.runtime.getURL("inter-var.woff2");
  function injectFont() {
    if (document.getElementById("goads-font-face")) return;
    const s = document.createElement("style");
    s.id = "goads-font-face";
    s.textContent =
      "@font-face{font-family:'GoadsInter';" +
      "src:url('" + FONT_URL + "') format('woff2');" +
      "font-weight:100 900;font-style:normal;font-display:swap;}";
    (document.head || document.documentElement).appendChild(s);
  }

  // ══════════════════════════════════════
  // ── Build overlay HTML ──
  // ══════════════════════════════════════

  function createOverlay() {
    // Backdrop
    const backdrop = document.createElement("div");
    backdrop.id = "goads-bm-backdrop";
    backdrop.addEventListener("click", hideOverlay);
    document.body.appendChild(backdrop);

    // Overlay
    const overlay = document.createElement("div");
    overlay.id = "goads-bm-overlay";
    overlay.innerHTML = `
      <!-- Header -->
      <div class="goads-header">
        <div class="goads-header-title">
          <span class="goads-brand-mark">
            <img src="${LOGO_URL}" alt="GOADS" />
          </span>
          GOADS Tools
        </div>
        <button class="goads-close" id="goads-btnClose" title="Close">${I.close}</button>
      </div>

      <!-- Home: feature picker -->
      <div id="goads-homeSection">
        <div class="goads-home">
          <button class="goads-feature-btn" id="goads-featInvite">
            <span class="goads-feature-icon fi-invite">${I.invite}</span>
            <span class="goads-feature-text">
              <b>Business Manager Invite</b>
              <small>Add team members to your Business Manager by email.</small>
              <span class="goads-feature-note"><span class="goads-note-tick">✓</span> First open your Business Manager at business.facebook.com, then launch this tool.</span>
            </span>
            <span class="goads-feature-arrow">${I.back}</span>
          </button>
          <button class="goads-feature-btn" id="goads-featCookie">
            <span class="goads-feature-icon fi-cookie">${I.cookie}</span>
            <span class="goads-feature-text">
              <b>Cookie Login</b>
              <small>Sign in to Facebook with a session cookie, no password needed.</small>
              <span class="goads-feature-note"><span class="goads-note-tick">✓</span> First open facebook.com, then use this tool to sign in.</span>
            </span>
            <span class="goads-feature-arrow">${I.back}</span>
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div id="goads-loadingSection" class="goads-hidden goads-loading">
        <div class="goads-loading-header">
          <div class="goads-loading-title">Initializing</div>
          <div class="goads-loading-pct" id="goads-loadingPct">0%</div>
        </div>
        <div class="goads-progress-bar"><div class="goads-progress-fill" id="goads-progressBar" style="width:0%"></div></div>
        <div class="goads-step-list">
          <div class="goads-step" id="goads-stepCookie"><div class="goads-step-icon"><div class="goads-step-dot"></div></div><span>Checking Facebook session</span></div>
          <div class="goads-step" id="goads-stepToken"><div class="goads-step-icon"><div class="goads-step-dot"></div></div><span>Fetching access tokens</span></div>
          <div class="goads-step" id="goads-stepVerify"><div class="goads-step-icon"><div class="goads-step-dot"></div></div><span>Verifying account</span></div>
          <div class="goads-step" id="goads-stepDetect"><div class="goads-step-icon"><div class="goads-step-dot"></div></div><span>Detecting Business Manager</span></div>
        </div>
      </div>

      <!-- Error -->
      <div id="goads-errorSection" class="goads-hidden goads-error-screen">
        <div class="goads-alert goads-alert-error" id="goads-errorMsg" style="display:block"></div>
        <button class="goads-btn goads-btn-outline" id="goads-btnRetry" style="width:100%">Retry</button>
      </div>

      <!-- Main -->
      <div id="goads-mainSection" class="goads-hidden">
        <div class="goads-feature-head">
          <button class="goads-back" id="goads-backInvite"><span class="goads-bicon">${I.back}</span> Back</button>
          <div class="goads-feature-title">Invite to Business Manager</div>
        </div>
        <div class="goads-main">
          <div class="goads-form-col">
            <!-- Scrollable region: inputs + results. Clear/Send is pinned below
                 so it never shifts when the results panel appears. -->
            <div class="goads-form-scroll">
              <div class="goads-block-head">
                <label><span class="goads-icon">${I.mail}</span> Recipients</label>
                <div class="goads-field-actions">
                  <select id="goads-role" class="goads-role-select" title="Access level" aria-label="Access level">
                    <option value="ADMIN">Admin (Full access)</option>
                    <option value="EMPLOYEE">Employee (Partial access)</option>
                  </select>
                  <button class="goads-mini-btn" id="goads-btnGenEmail" title="Generate a free GOADS email">Generate email</button>
                  <button class="goads-mini-btn" id="goads-btnOpenMail" title="Open the GOADS Tempmail inbox"><span class="goads-bicon">${I.inbox}</span> Open inbox</button>
                </div>
              </div>
              <textarea id="goads-email" class="goads-email-ta" placeholder="Enter one email address per line"></textarea>
              <div class="goads-field-foot">
                <span class="goads-email-count" id="goads-emailCount">No recipients yet</span>
              </div>
              <div id="goads-resultList" class="goads-result-list"></div>
            </div>
            <!-- Pinned action bar (always at the bottom of the form) -->
            <div class="goads-action-row">
              <button class="goads-btn goads-btn-outline" id="goads-btnCancel">Clear</button>
              <button class="goads-btn goads-btn-primary" id="goads-btnInvite" disabled><span class="goads-bicon">${I.send}</span><span id="goads-inviteLabel">Send Invite</span></button>
            </div>
          </div>
          <div class="goads-sidebar-col">
            <div class="goads-sidebar-card">
              <div class="goads-sidebar-card-title">Status</div>
              <div id="goads-inviteStatus" class="goads-banner pending" title="Click to re-check">
                <span id="goads-inviteStatusText">Checking…</span>
              </div>
              <div class="goads-stat-row"><span class="goads-stat-key">Token</span><span class="goads-pill goads-pill-green" id="goads-pillToken">Valid</span></div>
              <div class="goads-stat-row"><span class="goads-stat-key">Business Manager ID</span><span class="goads-pill goads-pill-green" id="goads-pillBM">—</span></div>
            </div>
            <div class="goads-sidebar-card">
              <div class="goads-sidebar-card-title">How it works</div>
              <ol class="goads-steps">
                <li>Check that Status shows "Ready to invite".</li>
                <li>Enter recipient emails and pick an access level.</li>
                <li>Send, then review each delivery result.</li>
                <li>Recipients accept the email invite to join.</li>
              </ol>
              <div class="goads-steps-note">
                <div class="goads-note-label">Note</div>
                <p>Some Business Managers may require additional verification or admin approval before invitation emails are delivered.</p>
                <p>If no email is received and no action is pending, try resending the invitation one or two more times.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cookie Login -->
      <div id="goads-cookieSection" class="goads-hidden">
        <div class="goads-feature-head">
          <button class="goads-back" id="goads-backCookie"><span class="goads-bicon">${I.back}</span> Back</button>
          <div class="goads-feature-title">Cookie Login</div>
        </div>
        <div class="goads-cookie">
          <div class="goads-cookie-account"><span class="goads-bicon gc-indigo">${I.user}</span> Current account: <b id="goads-ckAccount">—</b></div>
          <div class="goads-cookie-grid">
            <!-- PRIMARY: paste cookie → login Facebook (no password) -->
            <div class="goads-cookie-block">
              <label class="goads-cookie-label"><span class="goads-bicon gc-amber">${I.key}</span> Sign in with cookie</label>
              <p class="goads-cookie-hint">Paste a session cookie to sign in, no password needed.</p>
              <textarea id="goads-ckImportIn" class="goads-cookie-ta" placeholder="c_user=...; xs=...;  (optional |TOKEN)"></textarea>
              <button class="goads-btn goads-btn-primary" id="goads-ckImport" style="width:100%"><span class="goads-bicon">${I.key}</span> Sign in</button>
              <div id="goads-ckResult" class="goads-alert"></div>
            </div>

            <!-- SECONDARY: get current account cookie -->
            <div class="goads-cookie-block">
              <label class="goads-cookie-label"><span class="goads-bicon gc-green">${I.download}</span> Export current cookie</label>
              <p class="goads-cookie-hint">Read this account's cookie and token to reuse elsewhere.</p>
              <textarea id="goads-ckGetOut" class="goads-cookie-ta" readonly placeholder="Your cookie and token will appear here."></textarea>
              <div class="goads-cookie-row">
                <button class="goads-btn goads-btn-outline" id="goads-ckGet"><span class="goads-bicon">${I.download}</span> Get cookie</button>
                <button class="goads-btn goads-btn-outline" id="goads-ckCopy"><span class="goads-bicon">${I.copy}</span> Copy</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="goads-footer">
        <span>GOADS · <a href="https://goadsagency.com" target="_blank">goadsagency.com</a></span>
        <div class="goads-footer-right">
          <a href="https://t.me/goads_official" target="_blank" class="goads-tg"><span class="goads-tg-ic">${I.telegram}</span> Support</a>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    // Wire up buttons
    $("goads-btnClose").addEventListener("click", hideOverlay);
    $("goads-btnRetry").addEventListener("click", init);
    $("goads-btnCancel").addEventListener("click", clearForm);
    $("goads-btnInvite").addEventListener("click", handleInvite);
    $("goads-email").addEventListener("input", updateInviteBtn);
    // Ctrl/Cmd+Enter submits (plain Enter inserts a newline — it's a textarea now).
    $("goads-email").addEventListener("keydown", (e) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && !$("goads-btnInvite").disabled) handleInvite();
    });
    $("goads-btnGenEmail").addEventListener("click", generateEmail);
    $("goads-btnOpenMail").addEventListener("click", openMailbox);

    // Tap the Status banner to re-run the check (e.g. after opening a BM).
    $("goads-inviteStatus").addEventListener("click", () => init());

    // Feature navigation (home ↔ features)
    $("goads-featInvite").addEventListener("click", () => { init(); });
    $("goads-featCookie").addEventListener("click", openCookieFeature);
    $("goads-backInvite").addEventListener("click", () => showScreen("home"));
    $("goads-backCookie").addEventListener("click", () => showScreen("home"));

    // Cookie Login actions
    $("goads-ckGet").addEventListener("click", handleGetCookie);
    $("goads-ckCopy").addEventListener("click", handleCopyCookie);
    $("goads-ckImport").addEventListener("click", handleImportCookie);

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") hideOverlay();
    });

    // No sign-in — show the feature picker (home).
    showScreen("home");
  }

  // ══════════════════════════════════════
  // ── Show / Hide / Toggle ──
  // ══════════════════════════════════════

  function toggleVisibility() {
    const overlay = $("goads-bm-overlay");
    const backdrop = $("goads-bm-backdrop");
    if (!overlay) return;
    if (overlay.style.display === "none") {
      overlay.style.display = "";
      backdrop.style.display = "";
    } else {
      overlay.style.display = "none";
      backdrop.style.display = "none";
    }
  }

  function hideOverlay() {
    const overlay = $("goads-bm-overlay");
    const backdrop = $("goads-bm-backdrop");
    if (overlay) overlay.style.display = "none";
    if (backdrop) backdrop.style.display = "none";
  }

  // ══════════════════════════════════════
  // ── Screen Management ──
  // ══════════════════════════════════════

  function showScreen(name) {
    ["goads-homeSection", "goads-loadingSection", "goads-errorSection", "goads-mainSection", "goads-cookieSection"].forEach((id) => {
      $(id).classList.add("goads-hidden");
    });
    $("goads-" + name + "Section").classList.remove("goads-hidden");
  }

  function showError(message) {
    showScreen("error");
    $("goads-errorMsg").textContent = message;
  }

  // ══════════════════════════════════════
  // ── Loading Steps ──
  // ══════════════════════════════════════

  function setStep(id, state) {
    const el = $(id);
    el.className = "goads-step " + state;
    const icon = el.querySelector(".goads-step-icon");
    if (state === "active") {
      icon.innerHTML = '<div class="goads-step-spinner"></div>';
    } else if (state === "done") {
      icon.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>';
    } else if (state === "fail") {
      icon.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>';
    }
  }

  function setProgress(pct) {
    $("goads-progressBar").style.width = pct + "%";
    $("goads-loadingPct").textContent = pct + "%";
  }

  // ══════════════════════════════════════
  // ── Init Flow ──
  // ══════════════════════════════════════

  // Show a "checking" state on both Status pills while detection runs.
  function setPillChecking() {
    const t = $("goads-pillToken");
    t.textContent = "Checking…"; t.className = "goads-pill goads-pill-yellow";
    const b = $("goads-pillBM");
    b.textContent = "Checking…"; b.className = "goads-pill goads-pill-yellow";
  }

  let checking = false;

  // Open the invite tool IMMEDIATELY (no blocking loading screen), then verify
  // the session + detect the Business Manager in the background, reflecting
  // progress in the Status panel. Re-runnable (e.g. tap Status to re-check).
  async function init() {
    if (checking) return;
    checking = true;

    showScreen("main");
    bmId = null; token = null; eaag = null;
    setPillChecking();
    setInviteStatus("pending", "Checking your account…");
    updateInviteBtn();

    try {
      // 1) Facebook session
      const ck = await msg("initCookie");
      if (!ck.ok) {
        updateTokenPill(false); updateBmPill("Not detected", false);
        setInviteStatus("error", "Not logged in to Facebook — log in first");
        return;
      }

      // 2) Access token + BM — FAST PATH: one inject into the open
      //    business.facebook.com tab reads token + bmId at once from the
      //    already-loaded page (no multi-MB HTML re-downloads).
      const fast = await msg("initFromBMTab");
      if (fast.ok) {
        if (fast.token) token = fast.token;
        if (fast.bmId) bmId = fast.bmId;
      }

      // Token fallback: scrape pages only if the fast inject missed.
      if (!token) {
        const [eg, eb] = await Promise.all([msg("initEaag"), msg("initEaab")]);
        if (eg.ok) eaag = eg.token;
        if (eb.ok) token = eb.token;
        if (!token) token = eaag;
      }
      if (!token) {
        updateTokenPill(false); updateBmPill("Not detected", false);
        setInviteStatus("error", "Couldn't read access token — refresh Facebook");
        return;
      }
      updateTokenPill(true);

      // 3) Verify account (best effort, non-blocking for readiness)
      const vr = await msg("initVerify", { token });
      if (vr.ok) userName = vr.name || "Facebook User";

      // 4) Detect current Business Manager — only if the fast path didn't get it.
      if (bmId) {
        updateBmPill(bmId, true);
      } else {
        const detect = await msg("detectCurrentBM");
        if (detect.ok && detect.bmId) { bmId = detect.bmId; updateBmPill(bmId, true); }
        else { updateBmPill("Not detected", false); }
      }

      updateInviteStatus();
    } finally {
      checking = false;
      updateInviteBtn();
    }
  }

  // ══════════════════════════════════════
  // ── Status Pills ──
  // ══════════════════════════════════════

  function updateTokenPill(valid) {
    const pill = $("goads-pillToken");
    pill.textContent = valid ? "Valid" : "Invalid";
    pill.className = "goads-pill " + (valid ? "goads-pill-green" : "goads-pill-red");
  }

  function updateBmPill(value, valid) {
    const pill = $("goads-pillBM");
    pill.textContent = value;
    pill.className = "goads-pill " + (valid ? "goads-pill-green" : "goads-pill-yellow");
  }

  // Readiness banner above the form — tells the customer, in one line, whether
  // they can invite now (ready), need to pick a BM first (pending), or hit an
  // error (error). Derived from the same token/bmId the Send button uses.
  function setInviteStatus(state, text) {
    const el = $("goads-inviteStatus");
    if (!el) return;
    el.className = "goads-banner " + state;
    $("goads-inviteStatusText").textContent = text;
  }

  function updateInviteStatus() {
    if (!token) {
      setInviteStatus("error", "Not connected — reopen the tool");
    } else if (!bmId) {
      setInviteStatus("pending", "Waiting for a Business Manager");
    } else {
      setInviteStatus("ready", "Ready to invite");
    }
  }

  // ══════════════════════════════════════
  // ── Form Actions ──
  // ══════════════════════════════════════

  // GOADS tempmail — receiving domain + inbox viewer base URL.
  const GOADS_MAIL_DOMAIN = "goadsagency.com";
  const GOADS_TEMPMAIL_URL = "https://goadsagency.com/tempmail";

  // Parse the email textarea into a clean, de-duplicated list of valid emails.
  // Accepts separators: newline, comma, semicolon, or whitespace.
  function parseEmails(raw) {
    const seen = new Set();
    const out = [];
    String(raw || "").split(/[\s,;]+/).forEach((part) => {
      const email = part.trim();
      const key = email.toLowerCase();
      if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) && !seen.has(key)) {
        seen.add(key);
        out.push(email);
      }
    });
    return out;
  }

  function updateInviteBtn() {
    const emails = parseEmails($("goads-email").value);
    const n = emails.length;

    // Live count badge under the textarea.
    const count = $("goads-emailCount");
    count.textContent = n ? n + (n > 1 ? " recipients" : " recipient") : "No recipients yet";
    count.className = "goads-email-count" + (n ? " ok" : "");

    // Button label reflects how many will be sent.
    const label = $("goads-inviteLabel");
    if (label) label.textContent = n > 1 ? "Send " + n + " Invites" : "Send Invite";

    $("goads-btnInvite").disabled = !n || !bmId || !token;
  }

  function clearForm() {
    $("goads-email").value = "";
    $("goads-resultList").innerHTML = "";   // empty → placeholder shows again
    updateInviteBtn();
  }

  // Append a fresh random @goadsagency.com email (one per line) so customers can
  // quickly add throwaway recipients that land in GOADS Tempmail.
  function generateEmail() {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let name = "";
    for (let i = 0; i < 10; i++) name += chars.charAt(Math.floor(Math.random() * chars.length));
    if (!/[a-z]/.test(name[0])) name = "a" + name.slice(1); // ensure leading letter
    const email = name + "@" + GOADS_MAIL_DOMAIN;

    const ta = $("goads-email");
    const cur = ta.value.trim();
    ta.value = cur ? cur + "\n" + email : email;
    updateInviteBtn();
  }

  // Open GOADS Tempmail. If a @goadsagency.com email is present, deep-link to its
  // inbox via the #mailbox=<localpart> fragment (supported by the tempmail viewer).
  function openMailbox() {
    const goads = parseEmails($("goads-email").value).find((e) => e.toLowerCase().endsWith("@" + GOADS_MAIL_DOMAIN));
    if (goads) {
      const local = goads.split("@")[0];
      window.open(GOADS_TEMPMAIL_URL + "#mailbox=" + encodeURIComponent(local), "_blank");
    } else {
      window.open(GOADS_TEMPMAIL_URL, "_blank");
    }
  }

  // ══════════════════════════════════════
  // ── Send Invite ──
  // ══════════════════════════════════════

  // Send one invite via background. Returns { success, error? }.
  function sendOneInvite(email, roles) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        { action: "inviteBM", data: { bmId, token, email, roles } },
        (r) => {
          if (chrome.runtime.lastError) resolve({ success: false, error: chrome.runtime.lastError.message });
          else resolve(r || { success: false, error: "No response" });
        }
      );
    });
  }

  async function handleInvite() {
    const emails = parseEmails($("goads-email").value);
    if (!emails.length || !bmId || !token) return;

    const role = $("goads-role").value;
    const roles = role === "ADMIN"
      ? '["ADMIN","MANAGE","DEVELOPER","EMPLOYEE","ASSET_MANAGE","ASSET_VIEW","PEOPLE_MANAGE","PEOPLE_VIEW","PARTNERS_VIEW","PARTNERS_MANAGE","PROFILE_MANAGE"]'
      : '["EMPLOYEE","ASSET_VIEW","PEOPLE_VIEW"]';

    const btn = $("goads-btnInvite");
    const label = $("goads-inviteLabel");
    const bicon = btn.querySelector(".goads-bicon");
    btn.disabled = true;
    $("goads-btnCancel").disabled = true;
    setInviteStatus("pending", "Sending invitations...");

    // Reset the (always-visible) results list.
    const list = $("goads-resultList");
    list.innerHTML = "";

    let ok = 0;
    let fail = 0;
    for (let i = 0; i < emails.length; i++) {
      const email = emails[i];
      if (label) label.textContent = "Sending " + (i + 1) + "/" + emails.length + "...";
      bicon.innerHTML = '<span class="goads-spinner"></span>';

      // Row starts in "pending" state, then resolves to ok/fail.
      const row = document.createElement("div");
      row.className = "goads-result-row pending";
      row.innerHTML =
        '<span class="goads-rr-email">' + esc(email) + '</span>' +
        '<span class="goads-rr-status"><span class="goads-spinner-sm"></span> Sending</span>';
      list.appendChild(row);

      const result = await sendOneInvite(email, roles);
      const status = row.querySelector(".goads-rr-status");
      if (result.success) {
        ok++;
        row.className = "goads-result-row ok";
        status.innerHTML = '<span class="goads-rr-ic">' + I.check + "</span> Sent";
      } else {
        fail++;
        row.className = "goads-result-row fail";
        status.textContent = result.error || "Failed";
        status.title = result.error || "Failed";
      }
    }

    // Restore button + readiness banner. Per-row Sent/Failed is the result;
    // no aggregate "N sent of N" summary.
    bicon.innerHTML = I.send;
    btn.disabled = false;
    $("goads-btnCancel").disabled = false;
    updateInviteStatus();
    updateInviteBtn();
  }

  // ══════════════════════════════════════
  // ── Cookie Login Feature ──
  // ══════════════════════════════════════

  async function openCookieFeature() {
    showScreen("cookie");
    $("goads-ckResult").className = "goads-alert";
    $("goads-ckAccount").textContent = "Loading...";
    const res = await msg("currentAccount");
    $("goads-ckAccount").textContent = res.ok
      ? res.cUser + (res.name ? " - " + res.name : "")
      : "Not logged in";
  }

  async function handleGetCookie() {
    const btn = $("goads-ckGet");
    btn.disabled = true;
    btn.innerHTML = '<span class="goads-spinner-sm"></span> Reading...';
    const res = await msg("getCookieToken");
    if (res.ok) {
      $("goads-ckGetOut").value = res.combined || res.cookieStr || "";
      if (res.cUser) $("goads-ckAccount").textContent = res.cUser;
    } else {
      $("goads-ckGetOut").value = "";
      const el = $("goads-ckResult");
      el.className = "goads-alert goads-alert-error";
      el.textContent = res.error || "Failed to read cookies";
    }
    btn.disabled = false;
    btn.innerHTML = '<span class="goads-bicon">' + I.download + '</span> Get cookie';
  }

  function handleCopyCookie() {
    const ta = $("goads-ckGetOut");
    if (!ta.value) return;
    ta.select();
    navigator.clipboard.writeText(ta.value).catch(() => { try { document.execCommand("copy"); } catch (e) {} });
    const btn = $("goads-ckCopy");
    btn.innerHTML = '<span class="goads-bicon">' + I.check + '</span> Copied';
    setTimeout(() => { btn.innerHTML = '<span class="goads-bicon">' + I.copy + '</span> Copy'; }, 1200);
  }

  async function handleImportCookie() {
    const val = $("goads-ckImportIn").value.trim();
    const el = $("goads-ckResult");
    if (!val) {
      el.className = "goads-alert goads-alert-error";
      el.textContent = "Paste a cookie string first.";
      return;
    }
    const btn = $("goads-ckImport");
    const restore = '<span class="goads-bicon">' + I.key + '</span> Sign in';
    btn.disabled = true;
    btn.innerHTML = '<span class="goads-spinner"></span> Signing in...';
    el.className = "goads-alert";

    // 1) Write the cookies (also validates required fields like c_user/xs).
    const res = await msg("setCookies", { payload: val });
    if (!res.ok) {
      el.className = "goads-alert goads-alert-error";
      el.textContent = res.error || "Sign in failed";
      btn.disabled = false;
      btn.innerHTML = restore;
      return;
    }

    // 2) Verify the session is actually valid before reloading — avoids the
    //    "silent freeze" when cookies are expired/incomplete.
    btn.innerHTML = '<span class="goads-spinner"></span> Verifying...';
    const ver = await msg("verifyLogin");
    if (ver.ok) {
      el.className = "goads-alert goads-alert-success";
      el.textContent = "Signed in. Reloading Facebook...";
      setTimeout(() => { window.location.href = "https://www.facebook.com"; }, 800);
    } else {
      el.className = "goads-alert goads-alert-error";
      el.textContent = ver.error || "These cookies could not sign in (expired or incomplete). Get a fresh cookie and try again.";
      btn.disabled = false;
      btn.innerHTML = restore;
    }
  }

  // ── Launch ──
  injectFont();
  createOverlay();
})();
