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
            <svg viewBox="20 20 220 200" xmlns="http://www.w3.org/2000/svg" aria-label="GOADS">
              <circle cx="132.08" cy="117.68" r="51.45" fill="currentColor"/>
              <path fill="#fff" d="M160.57,116.22c0-.22.17-.39.39-.39l20.09-.09,20.36.09c.22,0,.39.18.39.39v67.73c0,.13-.06.26-.17.33-19.07,13.59-45.14,20.85-69.1,20.85-52.54,0-90.95-35.58-90.95-85.77s38.41-85.77,91.89-85.77c30.71,0,52.07,13.97,68.33,33.34,0,0-10.89,10.09-11.05,10.23l-14.58,13.19c-.16.14-.41.13-.55-.03-11.25-12.29-24.13-18.09-39.79-18.09-29.29,0-48.47,19.98-47.05,50.25,1.16,24.75,21.81,44.01,46.59,44,8.63,0,16.8-1.62,24.96-5.31.14-.06.23-.21.23-.36v-44.59Z"/>
              <path fill="currentColor" d="M94.19,139.84c.01.19-.12.37-.3.41-10.77,2.57-17.76-8.85-16.71-17.08.89-6.97,5.9-13.53,14.37-15.24.23-.05.45.13.47.36l2.17,31.54Z"/>
              <path fill="currentColor" d="M113.91,77.99c-.2.03-.39-.09-.44-.28-2.26-8.41,7.59-14.88,14.74-14.69,6.07.16,11.81,3.64,13.41,10.27.05.22-.1.44-.33.48l-27.38,4.22Z"/>
              <ellipse fill="#fff" cx="134.78" cy="115.01" rx="7.07" ry="3.47" transform="translate(-38.17 153.51) rotate(-53.03)"/>
              <ellipse fill="#fff" cx="113.13" cy="121.16" rx="13.67" ry="10.11" transform="translate(-51.81 137.67) rotate(-52.68)"/>
              <ellipse fill="#fff" cx="134.03" cy="93.75" rx="13.67" ry="10.11" transform="translate(-21.79 143.5) rotate(-52.68)"/>
              <path fill="#fff" d="M111.12,109.97l4.11-2.31c2.73-1.53,4.77-4.04,5.71-7.03l1.55-4.9c.08-.25.38-.35.59-.21l13.01,8.86c.21.14.23.44.05.61l-2.39,2.21c-3.12,2.88-5.66,6.33-7.47,10.18l-2.97,6.3c-.12.26-.46.3-.65.09l-11.64-13.21c-.17-.19-.12-.48.1-.6Z"/>
              <path fill="currentColor" d="M132.18,88.76l1.51,2.48c.29.48.95.55,1.33.15l.46-.48c.44-.46,1.22-.29,1.41.32l.99,3.01c.29.89-.87,1.52-1.46.79h0c-.32-.4-.92-.42-1.27-.05l-.75.79c-.35.37-.94.34-1.26-.05l-3.72-4.53c-.27-.33-.25-.81.04-1.12l1.39-1.46c.38-.4,1.04-.33,1.33.15Z"/>
              <path fill="currentColor" d="M159.82,137.07c4.71-.18,10.65,3.47,11.41,8.54.57,3.78-.74,7.65-3.38,10.4-2.11,2.2-6.32,4.76-9.33,5.95-.25.1-.53-.07-.54-.34-.14-3.25-.88-20.25-1.05-24.05-.01-.26.22-.45.47-.4.65.14,1.74.04,2.01.04.08,0,.32-.15.4-.15Z"/>
            </svg>
          </span>
          GOADS Tools
        </div>
        <div class="goads-header-sub">goadsagency.com · Facebook BM &amp; Cookie tools</div>
        <button class="goads-close" id="goads-btnClose">✕</button>
      </div>

      <!-- Home: feature picker -->
      <div id="goads-homeSection">
        <div class="goads-home">
          <button class="goads-feature-btn" id="goads-featInvite">
            <span class="goads-feature-emoji">🔗</span>
            <span class="goads-feature-text"><b>BM Invite</b><small>Invite users to your Business Manager via email</small></span>
          </button>
          <button class="goads-feature-btn" id="goads-featCookie">
            <span class="goads-feature-emoji">🍪</span>
            <span class="goads-feature-text"><b>Cookie Login</b><small>Import / get cookies to log in to Facebook</small></span>
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
          <button class="goads-back" id="goads-backInvite">← Back</button>
          <div class="goads-guide">⚠️ Open <b>business.facebook.com</b> and select a Business Manager first. The tool auto-fetches the token and detects the BM.</div>
        </div>
        <div class="goads-main">
          <div class="goads-form-col">
            <div>
              <label><span class="goads-icon">📧</span> Email</label>
              <div class="goads-email-row">
                <input type="email" id="goads-email" placeholder="user@example.com">
                <button class="goads-icon-btn" id="goads-btnGenEmail" title="Generate random email">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
                </button>
                <button class="goads-icon-btn" id="goads-btnOpenMail" title="Open mailbox">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </button>
              </div>
            </div>
            <div>
              <label><span class="goads-icon">👤</span> Role</label>
              <select id="goads-role">
                <option value="ADMIN">Admin</option>
                <option value="EMPLOYEE">Employee</option>
              </select>
            </div>
            <div style="display:flex;gap:10px;margin-top:6px">
              <button class="goads-btn goads-btn-outline" id="goads-btnCancel" style="flex:1">Cancel</button>
              <button class="goads-btn goads-btn-primary" id="goads-btnInvite" style="flex:1.6" disabled>Send Invite</button>
            </div>
            <div id="goads-result" class="goads-alert"></div>
          </div>
          <div class="goads-sidebar-col">
            <div class="goads-sidebar-card">
              <div class="goads-sidebar-card-title">📊 Status</div>
              <div class="goads-pill goads-pill-green" id="goads-pillToken">Token: Valid</div>
              <div class="goads-pill goads-pill-green" id="goads-pillBM">BM: —</div>
            </div>
            <div class="goads-sidebar-card">
              <div class="goads-sidebar-card-title">📝 Notes</div>
              <ul class="goads-sidebar-notes">
                <li>Open a Business Manager page first</li>
                <li>Use a valid email you can access</li>
                <li>Invite will be "Pending" until accepted</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Cookie Login -->
      <div id="goads-cookieSection" class="goads-hidden">
        <div class="goads-feature-head">
          <button class="goads-back" id="goads-backCookie">← Back</button>
          <div class="goads-guide">Paste a cookie to <b>log in to Facebook without a password</b> (the page will reload). Get the current account's cookie below.</div>
        </div>
        <div class="goads-cookie">
          <div class="goads-cookie-account">Current account: <b id="goads-ckAccount">—</b></div>

          <!-- PRIMARY: paste cookie → login Facebook (no password) -->
          <label class="goads-cookie-label">🔑 Log in with cookie</label>
          <textarea id="goads-ckImportIn" class="goads-cookie-ta" placeholder="Paste cookie: c_user=...;xs=...;... (optional |TOKEN)"></textarea>
          <button class="goads-btn goads-btn-primary" id="goads-ckImport" style="width:100%">Import &amp; Login</button>
          <div id="goads-ckResult" class="goads-alert"></div>

          <!-- SECONDARY: get current account cookie -->
          <div style="border-top:1px solid var(--card-border); margin:16px 0 14px"></div>
          <label class="goads-cookie-label">Get current account cookie <span style="font-weight:400;opacity:.7">(optional)</span></label>
          <textarea id="goads-ckGetOut" class="goads-cookie-ta" readonly placeholder="Click 'Get' to copy this account's cookie|token..."></textarea>
          <div class="goads-cookie-row">
            <button class="goads-btn goads-btn-outline" id="goads-ckGet">Get Cookie + Token</button>
            <button class="goads-btn goads-btn-outline" id="goads-ckCopy">Copy</button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="goads-footer">
        <span>GOADS · <a href="https://goadsagency.com" target="_blank">goadsagency.com</a></span>
        <div class="goads-footer-right">
          <a href="https://t.me/goads_official" target="_blank">Telegram</a>
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
    $("goads-email").addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !$("goads-btnInvite").disabled) handleInvite();
    });
    $("goads-btnGenEmail").addEventListener("click", generateEmail);
    $("goads-btnOpenMail").addEventListener("click", openMailbox);

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

  async function init() {
    showScreen("loading");
    setProgress(0);

    // Step 1: Check cookies
    setStep("goads-stepCookie", "active");
    const ck = await msg("initCookie");
    if (!ck.ok) {
      setStep("goads-stepCookie", "fail");
      setProgress(25);
      showError("Not logged in to Facebook. Please log in first.");
      return;
    }
    setStep("goads-stepCookie", "done");
    setProgress(25);

    // Step 2 + 4 (FAST PATH): one inject into the open business.facebook.com tab
    // reads token + bmId at once from the already-loaded page — no page re-downloads.
    setStep("goads-stepToken", "active");
    setStep("goads-stepDetect", "active");
    const fast = await msg("initFromBMTab");
    if (fast.ok) {
      if (fast.token) token = fast.token;
      if (fast.bmId) bmId = fast.bmId;
    }

    // Token fallback: scrape pages only if the fast inject didn't yield a token.
    if (!token) {
      const [eg, eb] = await Promise.all([msg("initEaag"), msg("initEaab")]);
      if (eg.ok) eaag = eg.token;
      if (eb.ok) token = eb.token;
      if (!token) token = eaag;
    }

    if (!token) {
      setStep("goads-stepToken", "fail");
      setProgress(50);
      showError("Could not fetch access token. Try refreshing Facebook.");
      return;
    }
    setStep("goads-stepToken", "done");
    setProgress(50);

    // Step 3: Verify user
    setStep("goads-stepVerify", "active");
    const vr = await msg("initVerify", { token });
    if (vr.ok) userName = vr.name || "Facebook User";
    setStep("goads-stepVerify", vr.ok ? "done" : "fail");
    setProgress(75);

    // Step 4: BM detect — already have it from the fast inject; else fall back.
    if (!bmId) {
      const detect = await msg("detectCurrentBM");
      if (detect.ok && detect.bmId) bmId = detect.bmId;
    }

    updateTokenPill(true);
    if (bmId) {
      updateBmPill(bmId, true);
      setStep("goads-stepDetect", "done");
    } else {
      updateBmPill("Not detected", false);
      setStep("goads-stepDetect", "fail");
    }
    setProgress(100);

    showScreen("main");
    updateInviteBtn();
  }

  // ══════════════════════════════════════
  // ── Status Pills ──
  // ══════════════════════════════════════

  function updateTokenPill(valid) {
    const pill = $("goads-pillToken");
    pill.textContent = valid ? "Token: Valid" : "Token: Invalid";
    pill.className = "goads-pill " + (valid ? "goads-pill-green" : "goads-pill-red");
  }

  function updateBmPill(value, valid) {
    const pill = $("goads-pillBM");
    pill.textContent = "BM: " + value;
    pill.className = "goads-pill " + (valid ? "goads-pill-green" : "goads-pill-yellow");
  }

  // ══════════════════════════════════════
  // ── Form Actions ──
  // ══════════════════════════════════════

  function updateInviteBtn() {
    $("goads-btnInvite").disabled = !$("goads-email").value.trim() || !bmId || !token;
  }

  function clearForm() {
    $("goads-email").value = "";
    $("goads-result").className = "goads-alert";
    updateInviteBtn();
  }

  function generateEmail() {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let name = "";
    for (let i = 0; i < 10; i++) {
      name += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    $("goads-email").value = name + "@cvlmail.net";
    updateInviteBtn();
    // Visual feedback
    const btn = $("goads-btnGenEmail");
    btn.style.borderColor = "#22c55e";
    btn.style.color = "#22c55e";
    setTimeout(() => { btn.style.borderColor = ""; btn.style.color = ""; }, 600);
  }

  function openMailbox() {
    const email = $("goads-email").value.trim();
    if (email && email.endsWith("@cvlmail.net")) {
      const user = email.split("@")[0];
      window.open("https://cvlmail.net/#/" + user, "_blank");
    } else {
      window.open("https://cvlmail.net", "_blank");
    }
  }

  // ══════════════════════════════════════
  // ── Send Invite ──
  // ══════════════════════════════════════

  async function handleInvite() {
    const email = $("goads-email").value.trim();
    if (!email || !bmId || !token) return;

    const role = $("goads-role").value;
    const btn = $("goads-btnInvite");
    btn.disabled = true;
    btn.innerHTML = '<span class="goads-spinner"></span> Sending...';

    const roles = role === "ADMIN"
      ? '["ADMIN","MANAGE","DEVELOPER","EMPLOYEE","ASSET_MANAGE","ASSET_VIEW","PEOPLE_MANAGE","PEOPLE_VIEW","PARTNERS_VIEW","PARTNERS_MANAGE","PROFILE_MANAGE"]'
      : '["EMPLOYEE","ASSET_VIEW","PEOPLE_VIEW"]';

    const result = await new Promise((resolve) => {
      chrome.runtime.sendMessage(
        { action: "inviteBM", data: { bmId, token, email, roles } },
        (r) => {
          if (chrome.runtime.lastError) resolve({ success: false, error: chrome.runtime.lastError.message });
          else resolve(r || { success: false, error: "No response" });
        }
      );
    });

    const el = $("goads-result");
    if (result.success) {
      el.className = "goads-alert goads-alert-success";
      if (email.endsWith("@cvlmail.net")) {
        const user = email.split("@")[0];
        el.innerHTML = '<span>Invitation sent to ' + email + '</span><a class="goads-alert-link" id="goads-alertOpenMail">Open Mail ↗</a>';
        $("goads-alertOpenMail").addEventListener("click", () => {
          window.open("https://cvlmail.net/#/" + user, "_blank");
        });
      } else {
        el.textContent = "Invitation sent to " + email;
      }
      $("goads-email").value = "";
    } else {
      el.className = "goads-alert goads-alert-error";
      el.textContent = result.error || "Unknown error";
    }

    btn.disabled = false;
    btn.textContent = "Send Invite";
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
    btn.innerHTML = '<span class="goads-spinner"></span> Getting...';
    const res = await msg("getCookieToken");
    if (res.ok) {
      $("goads-ckGetOut").value = res.combined || res.cookieStr || "";
      if (res.cUser) $("goads-ckAccount").textContent = res.cUser;
    } else {
      $("goads-ckGetOut").value = "";
      const el = $("goads-ckResult");
      el.className = "goads-alert goads-alert-error";
      el.textContent = res.error || "Failed to get cookies";
    }
    btn.disabled = false;
    btn.textContent = "Get Cookie + Token";
  }

  function handleCopyCookie() {
    const ta = $("goads-ckGetOut");
    if (!ta.value) return;
    ta.select();
    navigator.clipboard.writeText(ta.value).catch(() => { try { document.execCommand("copy"); } catch (e) {} });
    const btn = $("goads-ckCopy");
    btn.textContent = "Copied!";
    setTimeout(() => { btn.textContent = "Copy"; }, 1200);
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
    btn.disabled = true;
    btn.innerHTML = '<span class="goads-spinner"></span> Importing...';
    el.className = "goads-alert";

    // 1) Write the cookies (also validates required fields like c_user/xs).
    const res = await msg("setCookies", { payload: val });
    if (!res.ok) {
      el.className = "goads-alert goads-alert-error";
      el.textContent = res.error || "Import failed";
      btn.disabled = false;
      btn.textContent = "Import & Login";
      return;
    }

    // 2) Verify the session is actually valid before reloading — avoids the
    //    "silent freeze" when cookies are expired/incomplete.
    btn.innerHTML = '<span class="goads-spinner"></span> Verifying login...';
    const ver = await msg("verifyLogin");
    if (ver.ok) {
      el.className = "goads-alert goads-alert-success";
      el.textContent = "Login successful! Reloading Facebook...";
      setTimeout(() => { window.location.href = "https://www.facebook.com"; }, 800);
    } else {
      el.className = "goads-alert goads-alert-error";
      el.textContent = ver.error || "These cookies could not log in (expired or incomplete). Please get a fresh cookie and try again.";
      btn.disabled = false;
      btn.textContent = "Import & Login";
    }
  }

  // ── Launch ──
  createOverlay();
})();
