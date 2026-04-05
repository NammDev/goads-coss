// GoAds BM Invite Client — Content Script (overlay injected into FB page)
// No GoAds authentication required — goes straight to Facebook cookie detection
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          UPROAS BM INVITE
        </div>
        <div class="goads-header-sub">Invite users to Business Manager via email</div>
        <button class="goads-close" id="goads-btnClose">✕</button>
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

      <!-- Footer -->
      <div class="goads-footer">
        <span>2026 Uproas · Made with care by GoAds</span>
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

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") hideOverlay();
    });

    // Start init flow directly — no auth check needed
    init();
  }

  // ══════════════════════════════════════
  // ── Show / Hide / Toggle ──
  // ══════════════════════════════════════

  function toggleVisibility() {
    const overlay = document.getElementById("goads-bm-overlay");
    const backdrop = document.getElementById("goads-bm-backdrop");
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
    const overlay = document.getElementById("goads-bm-overlay");
    const backdrop = document.getElementById("goads-bm-backdrop");
    if (overlay) overlay.style.display = "none";
    if (backdrop) backdrop.style.display = "none";
  }

  // ══════════════════════════════════════
  // ── Screen Management ──
  // ══════════════════════════════════════

  function showScreen(name) {
    ["goads-loadingSection", "goads-errorSection", "goads-mainSection"].forEach((id) => {
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

    // Step 2: Fetch tokens
    setStep("goads-stepToken", "active");
    const [eg, eb] = await Promise.all([msg("initEaag"), msg("initEaab")]);
    if (eg.ok) eaag = eg.token;
    if (eb.ok) token = eb.token;
    if (!token) token = eaag;

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

    // Step 4: Detect BM
    setStep("goads-stepDetect", "active");
    const detect = await msg("detectCurrentBM");

    updateTokenPill(true);
    if (detect.ok && detect.bmId) {
      bmId = detect.bmId;
      updateBmPill(bmId, true);
      setStep("goads-stepDetect", "done");
    } else {
      updateBmPill("Not detected", false);
      setStep("goads-stepDetect", "fail");
    }
    setProgress(100);

    await new Promise((r) => setTimeout(r, 300));
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

  // ── Launch ──
  createOverlay();
})();
