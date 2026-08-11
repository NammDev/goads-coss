

chrome.runtime.onInstalled.addListener(async () => {
    const rules = [{
        id: 1,
        action: {
            type: 'modifyHeaders',
            requestHeaders: [{ header: 'Origin', operation: 'set', value: 'https://www.facebook.com' }],
        },
        condition: {
            initiatorDomains: [chrome.runtime.id],
            requestMethods: ['post'],
            resourceTypes: ["main_frame", "sub_frame", "script", "xmlhttprequest"],
        },
    }];
    await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: rules.map(r => r.id),
        addRules: rules,
    });
    
});


// Hàm lấy toàn bộ cookie
async function getFullCookies() {
    const cookies = await chrome.cookies.getAll({ domain: ".facebook.com" });
    if (cookies.length === 0) return "";
    const uniqueCookies = {};
    for (let c of cookies) {
        uniqueCookies[c.name] = c.value;
    }
    const cookieString = Object.entries(uniqueCookies)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');

    return cookieString;
}

async function setCookieHeaderRule(cookieString) {
  const RULE_ID = 1; 

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [RULE_ID], 
    addRules: [
      {
        id: RULE_ID,
        priority: 1,
        action: {
          type: "modifyHeaders",
          requestHeaders: [
            {
              header: "Cookie",
              operation: "set",
              value: cookieString 
            }
          ]
        },
        condition: {
          urlFilter: "b-graph.facebook.com", 
          resourceTypes: ["xmlhttprequest"] // 'fetch' được tính là loại tài nguyên này
        }
      }
    ]
  });

  return RULE_ID;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "call_fb_api") {
    
    (async () => {
        const access_token = request.access_token
        const invitation_token = request.invitation_token
        const actor_id = request.actor_id
        try {
            const response = await fetch('https://b-graph.facebook.com/graphql?locale=en_US', {
            method: 'POST',
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            },
            body: new URLSearchParams({
                    'access_token': access_token,
                    'variables': `{"input":{"first_name":"Xmeta","invitation_token":"${invitation_token}","last_name":"${actor_id}","receive_marketing_messages":false,"user_preferred_business_email":"${actor_id}@facebook.com"}}`,
                    'doc_id': '6857625997606127'
                })
            });

            const data = await response.json();
            sendResponse({ success: true, data: data });
        } catch (error) {
            sendResponse({ success: false, error: error.message });
        }
    })();

    return true; // Bắt buộc phải có 'return true' để giữ kết nối async
  }
  if (request.action == 'set_rule') {
    (async () => {
        const cookieString = await getFullCookies();
        ruleId = await setCookieHeaderRule(cookieString);
        sendResponse({ success: true })
    })();
    return true; 
  }
});


chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: "dashboard.html" });
});