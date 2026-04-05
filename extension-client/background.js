// Background service worker — GoAds BM Invite Client — No authentication required
// Click extension icon → inject overlay UI into current tab

// Load config
importScripts("config.js");

chrome.action.onClicked.addListener(async (tab) => {
  // Only inject on Facebook domains
  if (!tab.url || !tab.url.match(/https:\/\/(business|www|adsmanager|m)\.facebook\.com/)) {
    return;
  }
  try {
    // Check if content script already injected by sending toggle message
    await chrome.tabs.sendMessage(tab.id, { action: "toggleUI" });
  } catch (e) {
    // Not injected yet — inject CSS then JS
    await chrome.scripting.insertCSS({ target: { tabId: tab.id }, files: ["content.css"] });
    await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["content.js"] });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const handlers = {
    initCookie: () => initCookie(),
    initEaag: () => initEaag(),
    initEaab: () => initEaab(),
    initVerify: () => initVerify(request.token),
    listBMs: () => listBMs(request.token, request.after, request.limit),
    enrichBMs: () => enrichBMs(request.token, request.bmIds),
    getAdAccountLimits: () => getAdAccountLimits(request.bmIds),
    detectCurrentBM: () => detectCurrentBM(),
    inviteBM: () => inviteBM(request.data),
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
