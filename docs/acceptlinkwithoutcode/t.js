

const user_id = require('CurrentUserInitialData').USER_ID
const _fb_dtsg = window.fb_dtsg
const bm_id = require('CurrentBusinessUser').business_id
const partner_business_id = '1215672488927258'
const bm_name = 'Aisha+Afolabi'
const host = window.location.host
fetch(`https://${host}/api/graphql/`, {
  method: 'POST',
  headers: {
    'accept': '*/*',
    'accept-language': 'vi,en-US;q=0.9,en;q=0.8',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'sec-ch-prefers-color-scheme': 'dark',
    'sec-ch-ua': '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
    'sec-ch-ua-full-version-list': '"Chromium";v="146.0.7680.178", "Not-A.Brand";v="24.0.0.0", "Google Chrome";v="146.0.7680.178"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-model': '""',
    'sec-ch-ua-platform': '"Windows"',
    'sec-ch-ua-platform-version': '"19.0.0"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
  },
  body: new URLSearchParams({
    'av': user_id,
    '__aaid': '0',
    '__user': user_id,
    '__a': '1',
    'dpr': '1',
    'locale': 'en_US',
    'fb_dtsg': _fb_dtsg,
    'qpl_active_flow_ids': '606156028',
    'fb_api_caller_class': 'RelayModern',
    'fb_api_req_friendly_name': 'useCreateRequestedUnifiedOnboardingAssetsMutation',
    'server_timestamps': 'true',
    'variables': `{"businessID":"${bm_id}","loggingContext":{"developer_app_id":"799369954601524","developer_business_id":"1215672488927258","es_version":"V2","features":["MARKETING_MESSAGES_LITE","CLOUD_API"],"tp_config_id":null,"user_business_id":"${bm_id}","surface_type":"UNIFIED_ONBOARDING"},"businessRequest":null,"pageRequest":null,"adAccountRequest":null,"wabaRequest":{"app_id":"799369954601524","creation_source":"EMBEDDED_SIGNUP","friendly_name":"${bm_name}","timezone_id":66,"product":"EMBEDDED_SIGNUP","log_session_id":"019d56fa-33d3-7176-83b2-278f1b13b04c","partner_business_id":1215672488927258,"disable_automatic_sharing":true,"will_be_partner_certified":false},"catalogRequest":null,"shouldIncludeCheckForBPS":true,"logSessionID":"019d56fa-33d3-7176-83b2-278f1b13b04c"}`,
    'doc_id': '24938544532432941',
    'fb_api_analytics_tags': '["qpl_active_flow_ids=606156028"]'
  })
});


const user_id = require('CurrentUserInitialData').USER_ID
const _fb_dtsg = window.fb_dtsg
const bm_id = require('CurrentBusinessUser').business_id
const partner_business_id = '1215672488927258'
const bm_name = 'Aisha+Afolabi'
const host = window.location.host
fetch(`https://${host}/api/graphql/`, {
  method: 'POST',
  headers: {
    'accept': '*/*',
    'accept-language': 'vi,en-US;q=0.9,en;q=0.8',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'sec-ch-prefers-color-scheme': 'dark',
    'sec-ch-ua': '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
    'sec-ch-ua-full-version-list': '"Chromium";v="146.0.7680.178", "Not-A.Brand";v="24.0.0.0", "Google Chrome";v="146.0.7680.178"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-model': '""',
    'sec-ch-ua-platform': '"Windows"',
    'sec-ch-ua-platform-version': '"19.0.0"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',  
    },
  body: new URLSearchParams({
    'av': user_id,
    '__aaid': '0',
    '__user': user_id,
    '__a': '1',
    'dpr': '1',
    'locale': 'en_US',
    'fb_dtsg': _fb_dtsg,
    'jazoest': '25333',
    'lsd': '4C5RVSvudhSLeBLOBbgQJB',
    '__spin_r': '1036667337',
    '__spin_b': 'trunk',
    '__spin_t': '1775280731',
    'qpl_active_flow_ids': '606156028',
    'fb_api_caller_class': 'RelayModern',
    'fb_api_req_friendly_name': 'useSignWhatsAppBusinessToSesMutation',
    'server_timestamps': 'true',
    'variables': `{"input":{"actor_id":"${user_id}","client_mutation_id":"7","business_id":"${bm_id}","tos_to_sign":["CLOUD_API","OPTIMIZED_DELIVERY"],"app_id":"799369954601524","logging_context":null,"log_session_id":"019d56fa-33d3-7176-83b2-278f1b13b04c"}}`,
    'doc_id': '9667161560045707',
    'fb_api_analytics_tags': '["qpl_active_flow_ids=606156028"]'
  })
});




fetch('https://www.facebook.com/api/graphql/', {
  method: 'POST',
  headers: {
    'accept': '*/*',
    'accept-language': 'vi,en-US;q=0.9,en;q=0.8',
    'cache-control': 'no-cache',
    'origin': 'https://www.facebook.com/api/graphql',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://www.facebook.com/v14.0/dialog/oauth?app_id=799369954601524&cbt=1774691054198&channel_url=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df0bd572459d0991a5%26domain%3Dwaba.aisensy.com%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fwaba.aisensy.com%252Ff41035e25a9254b4c%26relation%3Dopener&client_id=799369954601524&config_id=1269952934120839&display=popup&domain=waba.aisensy.com&e2e=%7B%7D&extras=%7B%22sessionInfoVersion%22%3A%223%22%2C%22feature%22%3A%22whatsapp_embedded_signup%22%2C%22features%22%3A[%7B%22name%22%3A%22marketing_messages_lite%22%7D]%2C%22setup%22%3A%7B%22business%22%3A%7B%22name%22%3A%22Mai%20Tu%22%2C%22email%22%3A%22dgj6uitjgri7ityh%40fviainboxes.com%22%2C%22phone%22%3A%7B%22code%22%3A91%2C%22number%22%3A%22%2B19888988444%22%7D%2C%22website%22%3A%22%22%2C%22address%22%3A%7B%22streetAddress1%22%3A%22%22%2C%22city%22%3A%22%22%2C%22state%22%3A%22%22%2C%22zipPostal%22%3A%22%22%2C%22country%22%3A%22%22%7D%2C%22timezone%22%3A%22UTC%2B05%3A30%22%7D%2C%22phone%22%3A%7B%22displayName%22%3A%22Mai%20Tu%22%2C%22category%22%3A%22%22%2C%22description%22%3A%22%22%7D%7D%7D&fallback_redirect_uri=https%3A%2F%2Fwaba.aisensy.com%2Fregister-waba%2F7f7fa318a6cb85531f317a9550d44024177bf827621479ea742582d03f3fa656533155487c47553d9a6ca2f5853ff80de75891f10ea1c866cd9eb05378c81318ebc4ae46a4a21a5aa700244f23d4f7e46bae61bf0f21e37838df8122c21dda1b946318aea3795690e4bfa4b66a03d6d330eed4e3221c93307da78a5f190d2fed&locale=en_US&logger_id=f0fc1693b13b4334f&origin=1&override_default_response_type=true&redirect_uri=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Dff766e974ced90652%26domain%3Dwaba.aisensy.com%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fwaba.aisensy.com%252Ff41035e25a9254b4c%26relation%3Dopener%26frame%3Dfc8975e0b9744d0ab&response_type=code&return_scopes=true&sdk=joey&version=v14.0',
    'sec-ch-prefers-color-scheme': 'dark',
    'sec-ch-ua': '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
    'sec-ch-ua-full-version-list': '"Chromium";v="146.0.7680.178", "Not-A.Brand";v="24.0.0.0", "Google Chrome";v="146.0.7680.178"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-model': '""',
    'sec-ch-ua-platform': '"Windows"',
    'sec-ch-ua-platform-version': '"19.0.0"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36',
    'x-asbd-id': '359341',
    'x-fb-friendly-name': 'useCreateRequestedUnifiedOnboardingAssetsMutation',
    'x-fb-lsd': '4C5RVSvudhSLeBLOBbgQJB',
    'cookie': 'datr=oBj7Z07NNaCfAewomwMhYXD7; sb=oBj7Z2rvkE9_CEFSAPq7h41O; wd=929x925; locale=en_US; ps_l=1; ps_n=1; c_user=100081024756491; xs=29%3AkGMs6G_U-LQy3Q%3A2%3A1775105026%3A-1%3A-1%3A%3AAcypgoShWn79sIj0Q3Q1BdNAKPgVS3BhioJLclfF5g; presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1775280241090%2C%22v%22%3A1%7D; fr=13rZZk4YrmjrkhGLt.AWcljT7E9dr8b5gNOMwNwwt3mBkVsTn0e86uNQgStSxACGozJm8.Bp0KBt..AAA.0.0.Bp0KGM.AWf1g-Fyug35VJlNDm74p21TjGM; c_user=100081024756491; wd=1248x929; sb=kaLQaSgf27sJZ_7r6MyG9y8w; presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1775280872682%2C%22v%22%3A1%7D; xs=29%3AkGMs6G_U-LQy3Q%3A2%3A1775105026%3A-1%3A-1%3A%3AAcw6MhYQOgxYPAxkaeJSV8GrR9Z_L-l__rwWd0ZONw; fr=13rZZk4YrmjrkhGLt.AWcz4Iv40yB_uFBKm6G5u9K3kTvU3Jmdh4le_9Ub0ZcvXP-TgKU.Bp0KBt..AAA.0.0.Bp0KPW.AWefwCM_IIkTFrdyOrFWiDcKOTs'
  },
  body: new URLSearchParams({
    'av': '100081024756491',
    '__aaid': '0',
    '__user': '100081024756491',
    '__a': '1',
    '__req': '1w',
    '__hs': '20547.BP:DEFAULT.2.0...0',
    'dpr': '1',
    '__ccg': 'EXCELLENT',
    '__rev': '1036667337',
    '__s': ':yand76:zoqxia',
    '__hsi': '7624772682257806243',
    '__dyn': '7xeUmxa3-Unwn8K2Wmh0MBw8W5U4e1Fx-ewSAxa68uxa1twKzobotwo82CwUx609vCyU4a2-8xN0Cg18Ub87C2m3K2y1pzo1eE4a4oaEd86a1_wLwBgao2vwEwiUmw9O3Si5E5afK2W1Qxe3C16wlo5a1qxa1Xxu16Dyo2txiaBw48yUc84qazo8U3ywbS1Lwqp8aE726Uco9UfoV1W3G2V0ywPwrU4G3qEb87u0G84i7ocEbEuxa1Qw79wfy',
    '__hsdp': 'gQMNagyJ1FBhhy6GAOefhoLjhSOibqBO3Prho23xq4k7ebF1-uu4bxym5QHh42BG9gG1-UN0BzVQiA7C2u0xnDwt8dU3ax-qbh9WKvU1WUf814pC2S9wEy8374R48jkQ9l56wOzE69PmNdiHsw0sQw',
    '__hblp': '0Pwby0XE5m0hS0aPwa91u0JE986O0nW0wE0LOfwPw5xway2K0Vo0GG0hi06HE0J60Oo1WE7mewhE5i0q6u0b9w7NwhE7m0IU3vg1989836o8E2dw4Fwlo5e15wn8S0iSq0cww-wWAkwKAm3G8CF0qE88sw5TwvA5E1480EK0N80xa9wto2Aw-wce783GwtE',
    'locale': 'en_US',
    'fb_dtsg': 'NAfuGyfP-zzZ0F_woNgHNqy10E9LIUkMe4EMmRM4Y7ueK_3JME2k3cg:29:1775105026',
    'jazoest': '25333',
    'lsd': '4C5RVSvudhSLeBLOBbgQJB',
    '__spin_r': '1036667337',
    '__spin_b': 'trunk',
    '__spin_t': '1775280731',
    'qpl_active_flow_ids': '606156028',
    'fb_api_caller_class': 'RelayModern',
    'fb_api_req_friendly_name': 'useCreateRequestedUnifiedOnboardingAssetsMutation',
    'server_timestamps': 'true',
    'variables': '{"businessID":"26123594833986315","loggingContext":{"developer_app_id":"799369954601524","developer_business_id":"1215672488927258","es_version":"V2","features":["MARKETING_MESSAGES_LITE","CLOUD_API"],"tp_config_id":null,"user_business_id":"26123594833986315","surface_type":"UNIFIED_ONBOARDING"},"businessRequest":null,"pageRequest":null,"adAccountRequest":null,"wabaRequest":{"app_id":"799369954601524","creation_source":"EMBEDDED_SIGNUP","friendly_name":"Aisha+Afolabi","timezone_id":66,"product":"EMBEDDED_SIGNUP","log_session_id":"019d56fa-33d3-7176-83b2-278f1b13b04c","partner_business_id":1215672488927258,"disable_automatic_sharing":true,"will_be_partner_certified":false},"catalogRequest":null,"shouldIncludeCheckForBPS":true,"logSessionID":"019d56fa-33d3-7176-83b2-278f1b13b04c"}',
    'doc_id': '24938544532432941',
    'fb_api_analytics_tags': '["qpl_active_flow_ids=606156028"]'
  })
});




https://www.facebook.com/v14.0/dialog/oauth?app_id=799369954601524&cbt=1774691054198&channel_url=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df0bd572459d0991a5%26domain%3Dwaba.aisensy.com%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fwaba.aisensy.com%252Ff41035e25a9254b4c%26relation%3Dopener&client_id=799369954601524&config_id=1269952934120839&display=popup&domain=waba.aisensy.com&e2e=%7B%7D&extras=%7B%22sessionInfoVersion%22%3A%223%22%2C%22feature%22%3A%22whatsapp_embedded_signup%22%2C%22features%22%3A[%7B%22name%22%3A%22marketing_messages_lite%22%7D]%2C%22setup%22%3A%7B%22business%22%3A%7B%22name%22%3A%22Mai%20Tu%22%2C%22email%22%3A%22dgj6uitjgri7ityh%40fviainboxes.com%22%2C%22phone%22%3A%7B%22code%22%3A91%2C%22number%22%3A%22%2B19888988444%22%7D%2C%22website%22%3A%22%22%2C%22address%22%3A%7B%22streetAddress1%22%3A%22%22%2C%22city%22%3A%22%22%2C%22state%22%3A%22%22%2C%22zipPostal%22%3A%22%22%2C%22country%22%3A%22%22%7D%2C%22timezone%22%3A%22UTC%2B05%3A30%22%7D%2C%22phone%22%3A%7B%22displayName%22%3A%22Mai%20Tu%22%2C%22category%22%3A%22%22%2C%22description%22%3A%22%22%7D%7D%7D&fallback_redirect_uri=https%3A%2F%2Fwaba.aisensy.com%2Fregister-waba%2F7f7fa318a6cb85531f317a9550d44024177bf827621479ea742582d03f3fa656533155487c47553d9a6ca2f5853ff80de75891f10ea1c866cd9eb05378c81318ebc4ae46a4a21a5aa700244f23d4f7e46bae61bf0f21e37838df8122c21dda1b946318aea3795690e4bfa4b66a03d6d330eed4e3221c93307da78a5f190d2fed&locale=en_US&logger_id=f0fc1693b13b4334f&origin=1&override_default_response_type=true&redirect_uri=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Dff766e974ced90652%26domain%3Dwaba.aisensy.com%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fwaba.aisensy.com%252Ff41035e25a9254b4c%26relation%3Dopener%26frame%3Dfc8975e0b9744d0ab&response_type=code&return_scopes=true&sdk=joey&version=v14.0


const channelUrl = "https://staticxx.facebook.com/x/connect/xd_arbiter/?version=46#cb=f0bd572459d0991a5&domain=waba.aisensy.com&is_canvas=false&origin=https://waba.aisensy.com/f41035e25a9254b4c&relation=opener";
const redirectUri = "https://staticxx.facebook.com/x/connect/xd_arbiter/?version=46#cb=ff766e974ced90652&domain=waba.aisensy.com&is_canvas=false&origin=https://waba.aisensy.com/f41035e25a9254b4c&relation=opener&frame=fc8975e0b9744d0ab";
const fallbackRedirectUri = "https://waba.aisensy.com/register-waba/7f7fa318a6cb85531f317a9550d44024177bf827621479ea742582d03f3fa656533155487c47553d9a6ca2f5853ff80de75891f10ea1c866cd9eb05378c81318ebc4ae46a4a21a5aa700244f23d4f7e46bae61bf0f21e37838df8122c21dda1b946318aea3795690e4bfa4b66a03d6d330eed4e3221c93307da78a5f190d2fed";

// 2. CẤU HÌNH BIẾN EXTRAS (Dạng Object để dễ chỉnh sửa)
const extrasData = {
    sessionInfoVersion: "3",
    feature: "whatsapp_embedded_signup",
    features: [
        { name: "marketing_messages_lite" }
    ],
    setup: {
        business: {
            name: "Mai Tu",
            email: "dgj6uitjgri7ityh@fviainboxes.com",
            // Lưu ý: Dấu "+" trong URL cũ của bạn bị biến thành khoảng trắng. Khai báo lại là dấu "+" cho chuẩn
            phone: { code: 91, number: "+19888988444" },
            website: "",
            address: {
                streetAddress1: "",
                city: "",
                state: "",
                zipPostal: "",
                country: ""
            },
            timezone: "UTC+05:30" // Sửa lại "UTC 05:30" thành "UTC+05:30"
        },
        phone: {
            displayName: "Mai Tu",
            category: "",
            description: ""
        }
    }
};

// 3. TẠO URL HOÀN CHỈNH
const newParams = new URLSearchParams({
    app_id: appId,
    cbt: Date.now().toString(), // Tự động lấy timestamp hiện tại thay vì hardcode "1774691054198"
    channel_url: channelUrl,
    client_id: appId,
    config_id: configId,
    display: "popup",
    domain: domain,
    e2e: "{}",
    // Chuyển Object extras thành chuỗi JSON
    extras: JSON.stringify(extrasData),
    fallback_redirect_uri: fallbackRedirectUri,
    locale: "en_US",
    logger_id: "f0fc1693b13b4334f", // Bạn có thể dùng hàm tạo chuỗi random nếu cần
    origin: "1",
    override_default_response_type: "true",
    redirect_uri: redirectUri,
    response_type: "code",
    return_scopes: "true",
    sdk: "joey",
    version: "v14.0"
});

// Nối Base URL với các tham số đã được encode
const finalOAuthUrl = `${baseUrl}?${newParams.toString()}`;

// In ra kết quả kiểm tra
console.log(finalOAuthUrl);


const user_id = require('CurrentUserInitialData').USER_ID
const _fb_dtsg = window.fb_dtsg
const bm_id = require('CurrentBusinessUser').business_id
const partner_business_id = '1215672488927258'
const bm_name = 'FGH2321'
const host = window.location.host
fetch(`https://${host}/api/graphql/`, {
  method: 'POST',
  headers: {
    'accept': '*/*',
    'accept-language': 'vi,en-US;q=0.9,en;q=0.8',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'sec-ch-prefers-color-scheme': 'dark',
    'sec-ch-ua': '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
    'sec-ch-ua-full-version-list': '"Chromium";v="146.0.7680.178", "Not-A.Brand";v="24.0.0.0", "Google Chrome";v="146.0.7680.178"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-model': '""',
    'sec-ch-ua-platform': '"Windows"',
    'sec-ch-ua-platform-version': '"19.0.0"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
  },
  body: new URLSearchParams({
    'av': user_id,
    '__aaid': '0',
    '__user': user_id,
    '__a': '1',
    '__req': '2i',
    '__hs': '20547.BP:DEFAULT.2.0...0',
    'dpr': '1',
    '__ccg': 'EXCELLENT',
    'fb_dtsg': _fb_dtsg,
    'jazoest': '25901',
    'qpl_active_flow_ids': '606156028',
    'fb_api_caller_class': 'RelayModern',
    'fb_api_req_friendly_name': 'useCreateWhatsAppBusinessAPIAccountMutation_CreateWhatsAppBusinessAPIAccountMutation',
    'server_timestamps': 'true',
    'variables': `{"input":{"actor_id":"${user_id}","client_mutation_id":"16","app_id":"799369954601524","log_session_id":"019d56df-22e2-74dd-9344-a8a1e5269036","business_id":"${bm_id}","api_account_type":"EMBEDDED_SIGNUP","creation_source":"EMBEDDED_SIGNUP","friendly_name":"${bm_name}","timezone_id":66,"primary_funding_source":null,"on_behalf_of_business_id":null,"partner_business_id":${partner_business_id},"page_id":null,"product":"EMBEDDED_SIGNUP","disable_automatic_sharing":true,"obo_onboarding_info_input":null,"will_be_partner_certified":false,"wa_biz_role":"PAID_MSG_ACCOUNT_AND_BIZ_PRESENCE"}}`,
    'doc_id': '29701466519469036',
    'fb_api_analytics_tags': '["qpl_active_flow_ids=606156028"]'
  })
})
.then(e=>e.json())
.then(data=>data)


fetch('https://b-graph.facebook.com/graphql?locale=en_US', {
  method: 'POST',
  body: new URLSearchParams({
    'access_token': 'EAAGNO4a7r2wBRAATWj6VzLff4d3jJT7gSWseLf0TJr5qHTOxiFGsmuIU7ZC6nxQ15ebqkizHcf1qtj5TAf3K3gSdFtSakzMf9xAd7tdnIYM9uonFUfzmZBj3vlKW9tHb7AgxcFJfYU29C10QD2sEUv41AdeyOlov5uiikmNPYMmGLqQPnrEahIU66U6HImSQZDZD',
    'variables': '{"input":{"first_name":"Xmeta","invitation_token":"Afm3-ytEnskORLXx_5-XocaxhH90pHYomI1RZkQpsFQGOrgD9ztoct3WQxUEQERnx-oANLWnvAtOT4W5Nk_hSAd4iu2zcWhZ4EE1t2REn0iohyuVGoqpX7q4Xuk25h_pKUonwkkESpMKT5n4CJcDUww3YDYr8z6cIDaZUHRyDJvp_Gv_UEVef8AYbVrGxZF5Xu6ZSufQNlHM29CqnLLv4I1JCmddI8cOi8bzk06P-mPYL1LjguNHVDeFG5K5o-UvkrQDRr_mgrvdObAx1ItbkIE2_s-te-rDSpIDiOqZYbkw6v3U7Vk","last_name":"61572075513733","receive_marketing_messages":false,"user_preferred_business_email":"61572075513733@facebook.com"}}',
    'doc_id': '6857625997606127'
  })
});