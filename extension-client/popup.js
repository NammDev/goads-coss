// GoAds BM Invite — V1 Simple (detect BM from current tab)
let token = null;
let eaag = null;
let bmId = null;
let userName = null;
let lastGeneratedEmail = null;

// ── DOM ref helper ──
const $ = (id) => document.getElementById(id);

// ── Init on load ──
document.addEventListener("DOMContentLoaded", () => {
  setupTheme();
  setupButtons();
  init();
});

// ══════════════════════════════════════
// ── Theme (dark mode) ──
// ══════════════════════════════════════

function setupTheme() {
  const saved = localStorage.getItem("goads-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved ? saved === "dark" : prefersDark);

  $("btnTheme").addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("goads-theme", isDark ? "dark" : "light");
    updateThemeIcon(isDark);
  });
}

function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
  $("iconSun").classList.toggle("hidden", isDark);
  $("iconMoon").classList.toggle("hidden", !isDark);
}

// ══════════════════════════════════════
// ── Button Setup ──
// ══════════════════════════════════════

function setupButtons() {
  $("btnRetry").addEventListener("click", init);
  $("btnCancel").addEventListener("click", clearForm);
  $("btnInvite").addEventListener("click", handleInvite);
  $("email").addEventListener("input", updateInviteBtn);
  $("email").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !$("btnInvite").disabled) handleInvite();
  });
  $("btnGenEmail").addEventListener("click", generateEmail);
  $("btnOpenMail").addEventListener("click", openMailbox);
}

function updateInviteBtn() {
  $("btnInvite").disabled = !$("email").value.trim() || !bmId || !token;
}

function clearForm() {
  $("email").value = "";
  $("result").className = "alert";
  updateInviteBtn();
}

// ══════════════════════════════════════
// ── Email Generation (@cvlmail.net) ──
// ══════════════════════════════════════

function generateEmail() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let name = "";
  for (let i = 0; i < 10; i++) {
    name += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const email = name + "@cvlmail.net";
  $("email").value = email;
  lastGeneratedEmail = email;
  updateInviteBtn();
  // Brief visual feedback
  const btn = $("btnGenEmail");
  btn.style.borderColor = "var(--success)";
  btn.style.color = "var(--success)";
  setTimeout(() => { btn.style.borderColor = ""; btn.style.color = ""; }, 600);
}

function openMailbox() {
  const email = $("email").value.trim();
  if (email && email.endsWith("@cvlmail.net")) {
    // Open cvlmail.net with the specific inbox
    const user = email.split("@")[0];
    chrome.tabs.create({ url: "https://cvlmail.net/#/" + user });
  } else {
    // Open cvlmail.net homepage
    chrome.tabs.create({ url: "https://cvlmail.net" });
  }
}

// ══════════════════════════════════════
// ── Helpers ──
// ══════════════════════════════════════

function msg(action, data) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action, ...(data || {}) }, (resp) => {
      if (chrome.runtime.lastError) resolve({ ok: false, error: chrome.runtime.lastError.message });
      else resolve(resp || { ok: false });
    });
  });
}

function showScreen(name) {
  ["loadingSection", "errorSection", "mainSection"].forEach((id) => {
    $(id).classList.add("hidden");
  });
  $(name + "Section").classList.remove("hidden");
}

function showError(message) {
  showScreen("error");
  $("errorMsg").textContent = message;
}

// ── Loading step helpers ──
function setStep(id, state) {
  const el = $(id);
  el.className = "step " + state;
  const icon = el.querySelector(".step-icon");
  if (state === "active") {
    icon.innerHTML = '<div class="step-spinner"></div>';
  } else if (state === "done") {
    icon.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>';
  } else if (state === "fail") {
    icon.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>';
  }
}

function setProgress(pct) {
  $("progressBar").style.width = pct + "%";
  $("loadingPct").textContent = pct + "%";
}

// ══════════════════════════════════════
// ── Init Flow (with step-by-step UI) ──
// ══════════════════════════════════════

async function init() {
  showScreen("loading");
  setProgress(0);

  // Step 1: Check cookies
  setStep("stepCookie", "active");
  const ck = await msg("initCookie");
  if (!ck.ok) {
    setStep("stepCookie", "fail");
    setProgress(25);
    showError("Not logged in to Facebook. Please log in first.");
    return;
  }
  setStep("stepCookie", "done");
  setProgress(25);

  // Step 2: Fetch tokens (parallel for speed)
  setStep("stepToken", "active");
  const [eg, eb] = await Promise.all([msg("initEaag"), msg("initEaab")]);
  if (eg.ok) eaag = eg.token;
  if (eb.ok) token = eb.token;
  if (!token) token = eaag;

  if (!token) {
    setStep("stepToken", "fail");
    setProgress(50);
    showError("Could not fetch access token. Try refreshing Facebook.");
    return;
  }
  setStep("stepToken", "done");
  setProgress(50);

  // Step 3: Verify user
  setStep("stepVerify", "active");
  const vr = await msg("initVerify", { token });
  if (vr.ok) userName = vr.name || "Facebook User";
  setStep("stepVerify", vr.ok ? "done" : "fail");
  setProgress(75);

  // Step 4: Detect BM from current tab
  setStep("stepDetect", "active");
  const detect = await msg("detectCurrentBM");

  updateTokenPill(true);

  if (detect.ok && detect.bmId) {
    bmId = detect.bmId;
    updateBmPill(bmId, true);
    setStep("stepDetect", "done");
  } else {
    updateBmPill("Not detected", false);
    setStep("stepDetect", "fail");
  }
  setProgress(100);

  // Brief pause so user sees 100%
  await new Promise((r) => setTimeout(r, 300));

  // Show main UI
  showScreen("main");
  updateInviteBtn();
}

// ══════════════════════════════════════
// ── Status Pills ──
// ══════════════════════════════════════

function updateTokenPill(valid) {
  const pill = $("pillToken");
  pill.textContent = valid ? "Token: Valid" : "Token: Invalid";
  pill.className = "pill " + (valid ? "pill-green" : "pill-red");
}

function updateBmPill(value, valid) {
  const pill = $("pillBM");
  pill.textContent = "BM: " + value;
  pill.className = "pill " + (valid ? "pill-green" : "pill-yellow");
}

// ══════════════════════════════════════
// ── Send Invite ──
// ══════════════════════════════════════

async function handleInvite() {
  const email = $("email").value.trim();
  if (!email || !bmId || !token) return;

  const role = $("role").value;
  const btn = $("btnInvite");
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner spinner-light" style="width:14px;height:14px"></span> Sending...';

  // Build role array based on selection
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

  const el = $("result");
  if (result.success) {
    el.className = "alert alert-success";
    // If it's a cvlmail.net email, show "Open Mail" link
    if (email.endsWith("@cvlmail.net")) {
      const user = email.split("@")[0];
      el.innerHTML = '<span>Invitation sent to ' + email + '</span><a class="alert-link" id="alertOpenMail">Open Mail ↗</a>';
      $("alertOpenMail").addEventListener("click", () => {
        chrome.tabs.create({ url: "https://cvlmail.net/#/" + user });
      });
    } else {
      el.textContent = "Invitation sent to " + email;
    }
    $("email").value = "";
  } else {
    el.className = "alert alert-error";
    el.textContent = result.error || "Unknown error";
  }

  btn.disabled = false;
  btn.textContent = "Send Invite";
  updateInviteBtn();
}
