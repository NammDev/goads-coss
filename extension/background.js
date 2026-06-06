// Background service worker — GOADS BM Invite
// No sign-in: click extension icon → inject overlay UI into the current FB tab.

chrome.action.onClicked.addListener(async (tab) => {
  // Open the overlay on ANY page (activeTab grants temporary host access on click).
  // Feature 1 (BM Invite) still needs a business.facebook.com tab — handled in its own flow.
  // Skip only restricted schemes where script injection is impossible.
  if (!tab.url || /^(chrome|edge|about|brave|devtools):|^https:\/\/chromewebstore\.google\.com|^https:\/\/chrome\.google\.com\/webstore/.test(tab.url)) {
    return;
  }
  try {
    // Check if content script already injected by sending toggle message
    await chrome.tabs.sendMessage(tab.id, { action: "toggleUI" });
  } catch (e) {
    // Not injected yet — inject CSS then JS (best-effort; ignore pages that block injection)
    try {
      await chrome.scripting.insertCSS({ target: { tabId: tab.id }, files: ["content.css"] });
      await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["content.js"] });
    } catch (err) {
      console.warn("GOADS: cannot inject overlay on this page —", err.message);
    }
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const handlers = {
    initCookie: () => initCookie(),
    initEaag: () => initEaag(),
    initEaab: () => initEaab(),
    initVerify: () => initVerify(request.token),
    initFromBMTab: () => initFromBMTab(),
    listBMs: () => listBMs(request.token, request.after, request.limit),
    enrichBMs: () => enrichBMs(request.token, request.bmIds),
    getAdAccountLimits: () => getAdAccountLimits(request.bmIds),
    detectCurrentBM: () => detectCurrentBM(),
    inviteBM: () => inviteBM(request.data),
    // Cookie Login feature
    getCookieToken: () => getCookieToken(),
    setCookies: () => setCookies(request.payload),
    verifyLogin: () => verifyLogin(),
    currentAccount: () => currentAccount(),
  };
  if (handlers[request.action]) {
    handlers[request.action]().then(r => sendResponse(r)).catch(e => sendResponse({ error: e.message }));
    return true;
  }
});

// ===== STEP-BY-STEP INIT =====
async function initCookie() {
  try {
    const cUser = await getCookie("c_user");
    const xs = await getCookie("xs");
    if (cUser && xs) return { ok: true, userId: cUser };
  } catch (e) {}
  return { ok: false };
}

async function initEaag() {
  const urls = [
    "https://business.facebook.com/billing_hub/payment_settings/?asset_id=",
    "https://business.facebook.com/latest/settings/",
    "https://business.facebook.com/settings/",
    "https://business.facebook.com/home/"
  ];
  // Race all URLs in parallel — first one with EAAG wins
  try {
    const result = await Promise.any(urls.map(url =>
      fetch(url, { credentials: "include" })
        .then(r => r.text())
        .then(text => {
          const m = text.match(/EAAG[A-Za-z0-9]+/g);
          if (m) {
            const unique = [...new Set(m)].sort((a, b) => b.length - a.length);
            return { ok: true, token: unique[0] };
          }
          return Promise.reject("no token");
        })
    ));
    return result;
  } catch (e) {}
  return { ok: false };
}

async function initEaab() {
  const urls = [
    "https://www.facebook.com/adsmanager/manage/campaigns",
    "https://adsmanager.facebook.com/adsmanager/manage/campaigns"
  ];
  try {
    const result = await Promise.any(urls.map(url =>
      fetch(url, { credentials: "include" })
        .then(r => r.text())
        .then(text => {
          const m = text.match(/EAAB[A-Za-z0-9]+/g);
          if (m) {
            const unique = [...new Set(m)].sort((a, b) => b.length - a.length);
            return { ok: true, token: unique[0] };
          }
          return Promise.reject("no token");
        })
    ));
    return result;
  } catch (e) {}
  return { ok: false };
}

async function initVerify(token) {
  try {
    const resp = await fetch("https://graph.facebook.com/v21.0/me?access_token=" + token + "&fields=id,name");
    const data = await resp.json();
    if (!data.error) return { ok: true, name: data.name, id: data.id };
  } catch (e) {}
  return { ok: false };
}

function getCookie(name) {
  return new Promise((resolve) => {
    chrome.cookies.get({ url: "https://www.facebook.com", name }, (cookie) => {
      resolve(cookie ? cookie.value : null);
    });
  });
}

// ===== FAST INIT: single inject into the open business.facebook.com tab =====
// Reads token + dtsg + bmId + uid in ONE round-trip from the page that is
// ALREADY loaded in the user's tab — no multi-MB HTML re-downloads (the slow
// path of initEaag/initEaab). Falls back to those scrapers only if this misses.
async function initFromBMTab() {
  let tabs;
  try {
    tabs = await chrome.tabs.query({ url: "https://business.facebook.com/*" });
  } catch (e) {
    return { ok: false, error: "no-bm-tab" };
  }
  if (!tabs || !tabs.length) return { ok: false, error: "no-bm-tab" };

  for (let i = 0; i < tabs.length; i++) {
    try {
      const r = await chrome.scripting.executeScript({
        target: { tabId: tabs[i].id },
        func: function () {
          var out = { bmId: null, dtsg: null, uid: null, token: null };

          // uid — from cookie on the page
          var uidM = document.cookie.match(/c_user=(\d+)/);
          out.uid = uidM ? uidM[1] : null;

          // dtsg — page CSRF token (already in memory)
          try { out.dtsg = require("DTSG").getToken(); } catch (e) {}
          if (!out.dtsg) { try { out.dtsg = require("DTSGInitData").token; } catch (e) {} }
          if (!out.dtsg) {
            var dm = document.documentElement.innerHTML.match(/"token":"(NAf[^"]+)"/);
            out.dtsg = dm ? dm[1] : null;
          }

          // bmId — URL param → path → require context
          var params = new URLSearchParams(window.location.search);
          out.bmId = params.get("business_id");
          if (!out.bmId) {
            var pm = window.location.pathname.match(/^\/(\d{10,})(?:\/|$)/);
            if (pm) out.bmId = pm[1];
          }
          if (!out.bmId) {
            try { var ctx = require("CurrentBusinessAccountID"); if (ctx) out.bmId = String(ctx); } catch (e) {}
          }

          // token — regex the ALREADY-loaded DOM (no network). Prefer EAAG, then EAAB.
          var html = document.documentElement.innerHTML;
          var tm = html.match(/EAAG[A-Za-z0-9]+/g) || html.match(/EAAB[A-Za-z0-9]+/g);
          if (tm) {
            var uniq = [];
            for (var j = 0; j < tm.length; j++) if (uniq.indexOf(tm[j]) === -1) uniq.push(tm[j]);
            uniq.sort(function (a, b) { return b.length - a.length; });
            out.token = uniq[0];
          }

          return out;
        },
        world: "MAIN"
      });
      const res = r && r[0] && r[0].result;
      // Accept the result as soon as we have at least a usable token or bmId.
      if (res && (res.token || res.bmId)) {
        return { ok: true, token: res.token, dtsg: res.dtsg, bmId: res.bmId, uid: res.uid };
      }
    } catch (e) {}
  }
  return { ok: false, error: "inject-failed" };
}

// ===== LIST BMs (with pagination) =====
async function listBMs(token, after, limit) {
  try {
    let lim = limit || 5;
    if (lim > 200) lim = 200;
    let url = "https://graph.facebook.com/v23.0/me/businesses?fields=id,name,permitted_roles&limit=" + lim + "&access_token=" + token;
    if (after) url += "&after=" + after;
    const resp = await fetch(url);
    const data = await resp.json();
    if (data.error) return { error: data.error.message };
    return {
      businesses: data.data || [],
      paging: data.paging || null,
      hasNext: !!(data.paging && data.paging.next),
      hasPrev: !!after
    };
  } catch (e) {
    return { error: e.message };
  }
}

// ===== ENRICH BMs (Graph API detail) =====
async function enrichBMs(token, bmIds) {
  const results = {};
  for (let i = 0; i < bmIds.length; i++) {
    try {
      const resp = await fetch(
        "https://graph.facebook.com/v23.0/" + bmIds[i] +
        "?fields=verification_status,owned_ad_accounts.limit(0).summary(true),can_create_ad_account&access_token=" + token
      );
      const data = await resp.json();
      if (!data.error) {
        let ownedCount = 0;
        if (data.owned_ad_accounts && data.owned_ad_accounts.summary) {
          ownedCount = data.owned_ad_accounts.summary.total_count || 0;
        }
        results[bmIds[i]] = {
          verified: data.verification_status === "verified",
          ownedCount: ownedCount,
          canCreate: data.can_create_ad_account || false
        };
      }
    } catch (e) {}
  }
  return { details: results };
}

// ===== GET AD ACCOUNT LIMITS =====
async function getAdAccountLimits(bmIds) {
  let tabs;
  try {
    tabs = await chrome.tabs.query({ url: "https://business.facebook.com/*" });
  } catch (e) {
    return { limits: {} };
  }
  if (!tabs || !tabs.length) return { limits: {} };

  // Step 1: get dtsg + uid (sync, no async in injected func)
  let info;
  try {
    const r = await chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: function() {
        var dtsg = null;
        try { dtsg = require("DTSG").getToken(); } catch(e) {}
        if (!dtsg) try { dtsg = require("DTSGInitData").token; } catch(e) {}
        if (!dtsg) {
          var m = document.documentElement.innerHTML.match(/"token":"(NAf[^"]+)"/);
          dtsg = m ? m[1] : null;
        }
        var uidM = document.cookie.match(/c_user=(\d+)/);
        return { dtsg: dtsg, uid: uidM ? uidM[1] : null };
      },
      world: "MAIN"
    });
    info = r[0].result;
  } catch (e) {
    return { limits: {} };
  }

  if (!info || !info.dtsg || !info.uid) return { limits: {} };

  // Step 2: fetch each limit (sync XHR in injected func)
  const limits = {};
  for (let i = 0; i < bmIds.length; i++) {
    try {
      const r = await chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: function(bmId, dtsg, uid) {
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "https://business.facebook.com/business/adaccount/limits/?business_id=" + bmId + "&_callFlowletID=0&_triggerFlowletID=2405&qpl_active_e2e_trace_ids=", false);
          xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
          xhr.setRequestHeader("x-asbd-id", "359341");
          xhr.withCredentials = true;
          xhr.send("__aaid=0&__bid=" + bmId + "&__user=" + uid + "&__a=1&__req=13&__hs=20263.BP%3Abrands_pkg.2.0...0&dpr=1&__ccg=EXCELLENT&__rev=1024126592&fb_dtsg=" + encodeURIComponent(dtsg) + "&jazoest=25401&lsd=x&__spin_r=1024126592&__spin_b=trunk&__spin_t=1750754791&__jssesw=1");
          var text = xhr.responseText || "";
          if (text.indexOf("adAccountLimit") !== -1) {
            try {
              var json = JSON.parse(text.substring(text.indexOf('{')));
              return (json.payload && json.payload.adAccountLimit) ? json.payload.adAccountLimit : null;
            } catch(e) { return null; }
          }
          return null;
        },
        args: [bmIds[i], info.dtsg, info.uid],
        world: "MAIN"
      });
      if (r[0].result) limits[bmIds[i]] = r[0].result;
    } catch (e) {}
  }

  return { limits: limits };
}

// ===== DETECT CURRENT BM =====
async function detectCurrentBM() {
  // Try business.facebook.com tabs first
  const tabs = await chrome.tabs.query({ url: "https://business.facebook.com/*" });
  for (let i = 0; i < tabs.length; i++) {
    const tab = tabs[i];
    // Try URL param first
    try {
      const url = new URL(tab.url);
      const bid = url.searchParams.get("business_id");
      if (bid && /^\d+$/.test(bid)) return { ok: true, bmId: bid, source: "url" };
    } catch (e) {}
    // Try injecting to get BM context
    try {
      const r = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: function() {
          // Method 1: URL param
          var params = new URLSearchParams(window.location.search);
          var bid = params.get("business_id");
          if (bid) return bid;
          // Method 2: path pattern /ID/
          var m = window.location.pathname.match(/^\/(\d{10,})(?:\/|$)/);
          if (m) return m[1];
          // Method 3: require modules
          try {
            var ctx = require("CurrentBusinessAccountID");
            if (ctx) return String(ctx);
          } catch(e) {}
          try {
            var nav = require("BusinessUnifiedNavigationContext");
            if (nav && nav.businessID) return nav.businessID;
          } catch(e) {}
          // Method 4: meta tag or global
          try {
            var el = document.querySelector('meta[name="business_id"]');
            if (el) return el.content;
          } catch(e) {}
          return null;
        },
        world: "MAIN"
      });
      if (r && r[0] && r[0].result) return { ok: true, bmId: r[0].result, source: "inject" };
    } catch (e) {}
  }
  return { ok: false, error: "No BM detected. Open business.facebook.com with a BM first." };
}

// ===== COOKIE LOGIN =====
const FB_COOKIE_URL = "https://www.facebook.com";

/** Read all facebook.com cookies → "name=value;..." string + c_user. */
function getCookies() {
  return new Promise((resolve) => {
    chrome.cookies.getAll({ domain: "facebook.com" }, (cookies) => {
      if (!cookies || !cookies.length) {
        return resolve({ ok: false, error: "No Facebook cookies found. Log in to Facebook first." });
      }
      const cookieStr = cookies.map((c) => c.name + "=" + c.value).join(";");
      const cu = cookies.find((c) => c.name === "c_user");
      resolve({ ok: true, cookieStr, cUser: cu ? cu.value : null });
    });
  });
}

/** Cookies + an access token → "cookieStr|TOKEN" (token optional). */
async function getCookieToken() {
  const ck = await getCookies();
  if (!ck.ok) return ck;
  let token = null;
  const eg = await initEaag();
  if (eg.ok) token = eg.token;
  if (!token) {
    const eb = await initEaab();
    if (eb.ok) token = eb.token;
  }
  const combined = ck.cookieStr + (token ? "|" + token : "");
  return { ok: true, cookieStr: ck.cookieStr, cUser: ck.cUser, token, combined };
}

/** Set facebook cookies from "name=value;..." (everything left of an optional |TOKEN). */
async function setCookies(payload) {
  try {
    const raw = String(payload || "").split("|")[0].trim();
    if (!raw) return { ok: false, error: "Empty cookie string." };
    const pairs = raw.split(";").map((s) => s.trim()).filter(Boolean);
    const names = new Set();
    let count = 0;
    for (const pair of pairs) {
      const idx = pair.indexOf("=");
      if (idx < 1) continue;
      const name = pair.slice(0, idx).trim();
      const value = pair.slice(idx + 1).trim();
      if (!name) continue;
      await new Promise((resolve) => {
        chrome.cookies.set(
          { url: FB_COOKIE_URL, domain: ".facebook.com", path: "/", secure: true, name, value },
          () => resolve()
        );
      });
      names.add(name);
      count++;
    }
    if (!count) return { ok: false, error: "No valid cookies found in the pasted text." };
    // Required cookies for a Facebook session — without these, login is impossible.
    const missing = ["c_user", "xs"].filter((n) => !names.has(n));
    if (missing.length) {
      return { ok: false, error: "Invalid cookie: missing required field(s) " + missing.join(", ") + ". Please copy the full cookie string." };
    }
    return { ok: true, count };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

/** Verify the just-set cookies actually authenticate a Facebook session.
 *  Hits an authenticated endpoint and inspects the final URL after redirects:
 *  logged-in → profile page; logged-out/expired → /login or /checkpoint. */
async function verifyLogin() {
  try {
    const resp = await fetch("https://www.facebook.com/me", {
      credentials: "include",
      redirect: "follow",
      cache: "no-store"
    });
    const finalUrl = (resp.url || "").toLowerCase();
    if (!finalUrl) return { ok: false, error: "Could not reach Facebook to verify login." };
    if (/\/login|\/checkpoint|\/recover|loginnow|\/two_step/.test(finalUrl)) {
      return { ok: false, error: "These cookies are expired or invalid — Facebook did not accept the login." };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: "Login verification failed: " + e.message };
  }
}

/** Current FB account: c_user from cookie + name via an access token (best-effort). */
async function currentAccount() {
  const cUser = await getCookie("c_user");
  if (!cUser) return { ok: false, error: "Not logged in to Facebook." };
  let name = null;
  let token = null;
  const eg = await initEaag();
  if (eg.ok) token = eg.token;
  if (!token) {
    const eb = await initEaab();
    if (eb.ok) token = eb.token;
  }
  if (token) {
    const v = await initVerify(token);
    if (v.ok) name = v.name;
  }
  return { ok: true, cUser, name };
}

// ===== INVITE BM =====
async function inviteBM({ bmId, token, email, roles }) {
  // Use custom roles if provided, otherwise default to full admin roles
  const roleStr = roles || '["DEFAULT","MANAGE","DEVELOPER","EMPLOYEE","ASSET_MANAGE","ASSET_VIEW","PEOPLE_MANAGE","PEOPLE_VIEW","PARTNERS_VIEW","PARTNERS_MANAGE","PROFILE_MANAGE"]';
  const batch = JSON.stringify([{
    method: "POST",
    relative_url: "/v3.0/" + bmId + "/business_users",
    body: "brandId=" + bmId + "&email=" + encodeURIComponent(email) + "&roles=" + encodeURIComponent(roleStr)
  }]);
  try {
    const resp = await fetch(
      "https://graph.facebook.com/v24.0?access_token=" + encodeURIComponent(token) + "&format=json&pretty=0&suppress_http_code=1&transport=cors&locale=en_US",
      {
        method: "POST",
        headers: { "accept": "*/*", "content-type": "application/x-www-form-urlencoded" },
        referrer: "https://www.facebook.com",
        body: "batch=" + encodeURIComponent(batch) + "&method=post&pretty=0&suppress_http_code=1",
        credentials: "include"
      }
    );
    const text = await resp.text();
    let data;
    try { data = JSON.parse(text); } catch (e) { return { success: false, error: text.substring(0, 150) }; }

    if (Array.isArray(data) && data.length > 0) {
      const item = data[0];
      let body;
      try { body = typeof item.body === "string" ? JSON.parse(item.body) : item.body; } catch (e) { body = {}; }
      if (item.code === 200 && !body?.error) return { success: true, id: body?.id };
      if (body?.error) return { success: false, error: body.error.error_user_msg || body.error.message };
    }
    if (data?.error) return { success: false, error: data.error.message };
    return { success: false, error: "Unexpected response" };
  } catch (e) {
    return { success: false, error: e.message };
  }
}
