/**
 * Tách biệt các thiết lập và trạng thái toàn cục (State Management)
 */
const AppState = {
    uid: null,
    fbDtsg: null,
    actorId: null,
    access_token: null,
    linksToProcess: []
};

const DOM_ELEMENTS = {
    tbody: document.getElementById('linkTableBody'),
    newImportBtn: document.getElementById('new-import'),
    textareaImport: document.getElementById('textarea-import'),
    selectAllCheckbox: document.getElementById('selectAll'),
    btnStart: document.getElementById('btnStart'),
    emailInput: document.getElementById('EmailInput'),
    passwordInput: document.getElementById('input-password'),
    textareaLinkError: document.getElementById('linkError'),
    btnLoadSheet: document.getElementById('button-get-sheet-data'),
    sheetInput: document.getElementById('input-sheet'),
    uid: document.getElementById('uid'),
    runNoVeri: document.getElementById('runNoVeri')
};


document.addEventListener('DOMContentLoaded', () => {
    getCookiesURL('https://facebook.com')
    .then(cookies=>{
        cookies.forEach((cookie) => {
            if (cookie.name == "c_user") {
                DOM_ELEMENTS.uid.textContent = cookie.value
                AppState.uid = cookie.value
                return
            }
        })
    })
})

/**
 * ==========================================
 * XỬ LÝ SỰ KIỆN GIAO DIỆN (DOM EVENTS)
 * ==========================================
 */


DOM_ELEMENTS.btnLoadSheet.addEventListener('click', () => {
    const link = DOM_ELEMENTS.sheetInput.value
    if (!link) {
        alert('không có link sheet!')
        return
    }
    getDataSheet(link)
})

DOM_ELEMENTS.newImportBtn.addEventListener('click', () => {
    const input = DOM_ELEMENTS.textareaImport.value;
    const items = input.split('\n').filter(l => l.trim() !== '');
    
    DOM_ELEMENTS.tbody.innerHTML = '';
    
    items.forEach((item) => {
        let link
        const parts = item.split('|')
        for (let index = 0; index < parts.length; index++) {
            const part = parts[index];
            if (part.includes('https://business.facebook.com/invitation/')) {
                link = part
                break
            }
        }
        if (!link) return
        const rowCount = DOM_ELEMENTS.tbody.rows.length;        
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td class="text-center"><input type="checkbox" class="form-check-input" checked></td>
            <td class="text-center">${rowCount + 1}</td>
            <td class="text-truncate" title="${link}"> ${link} </td>
            <td class="text-break status-message"></td>
        `;
        tr.setAttribute('data-index', rowCount);
        DOM_ELEMENTS.tbody.appendChild(tr);
    });
});

DOM_ELEMENTS.selectAllCheckbox.addEventListener('click', (e) => {
    const isChecked = e.target.checked;
    DOM_ELEMENTS.tbody.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = isChecked;
    });
});

DOM_ELEMENTS.btnStart.addEventListener('click', () => {
    AppState.linksToProcess = [];
    
    DOM_ELEMENTS.tbody.querySelectorAll('tr').forEach((tr) => {
        const checkbox = tr.querySelector('input[type="checkbox"]');
        if (checkbox && checkbox.checked) {
            const linkCell = tr.querySelector('td[title]');
            if (linkCell) {
                AppState.linksToProcess.push({
                    index: parseInt(tr.getAttribute('data-index'), 10),
                    url: linkCell.getAttribute('title')
                });
            }
        }
    });
    
    processInvitations(AppState.linksToProcess);
});

/**
 * ==========================================
 * LOGIC XỬ LÝ CHÍNH (CORE PROCESS)
 * ==========================================
 */

/**
 * Hàm điều phối luồng xử lý chính cho danh sách link BM
 * @param {Array} links - Mảng chứa các object {index, url}
 */
async function processInvitations(links) {
    if (!links || links.length === 0) return;

    const emailList = DOM_ELEMENTS.emailInput.value.split('\n').filter(l => l.trim() !== '');
    const password = DOM_ELEMENTS.passwordInput.value;

    // 1. Khởi tạo dữ liệu BM ban đầu nếu chưa có
    if (!AppState.fbDtsg) {
        updateRowStatus(links[0].index, "Đang lấy thông tin BM...");
        const bmData = await extractBMData();
        
        if (!bmData || bmData.fb_dtsg === "Không tìm thấy") {
            alert('Lỗi: Không lấy được thông tin BM (Tài khoản có thể bị die)');
            return;
        }
        AppState.fbDtsg = bmData.fb_dtsg;
        AppState.actorId = bmData.actor_id;
        AppState.access_token = bmData.access_token;
    }

    // 2. Re-auth nếu có password
    if (password) {
        updateRowStatus(links[0].index, "Đang Re-auth...");
        await reauthenticate(AppState.fbDtsg, password);
    }

    const isRunNoVeri = DOM_ELEMENTS.runNoVeri.checked
    if (!isRunNoVeri) {
        // 3. Chạy con đầu tiên trước
        isVerificationEmailSuccess = false
        await processSingleInvitation(links[0], emailList);
        if (!isVerificationEmailSuccess) {
            updateRowStatus(links[0].index, "Vr email thất bại");
            return;
        }
    
        
        // 5. Chạy ĐỒNG LOẠT các con còn lại bằng Promise.all
        const remainingLinks = links.slice(1);
        if (remainingLinks.length > 0) {
            const promises = remainingLinks.map(item => processSingleInvitation(item, emailList));
            
            // Đợi tất cả các luồng song song chạy xong
            await Promise.all(promises); 
        }
    }
    else {
        const promises = links.map(item => processSingleInvitationNoVery(item));
        await Promise.all(promises); 
    }
}

/**
 * Logic xử lý độc lập cho 1 link 
 */
async function processSingleInvitation(item, emailList) {

    const originalUrl = item.url;
    const invitationToken = extractTokenFromUrl(originalUrl, 'invitation/?token=');
    
    updateRowStatus(item.index, 'Đang vào link...');
    const finalUrl = await resolveRedirectLink(originalUrl);
    
    if (!finalUrl) {
        updateRowStatus(item.index, 'Lỗi: Không truy cập được link');
        return;
    }

    const nextValue = new URL(finalUrl).searchParams.get('next');
    const decodedUrl = decodeURIComponent(nextValue);
    const joinId = extractTokenFromUrl(decodedUrl, 'invite_join_id=', '&');

    updateRowStatus(item.index, 'Đang kiểm tra đăng nhập/Invite...');
    const inviteData = await fetchInviteData(decodedUrl);

    if (inviteData && inviteData.isShowModal === 'true') {
        const isVerificationSuccess = await handleEmailVerification(item.index, inviteData, emailList);
        if (!isVerificationSuccess) return; 
    }

    updateRowStatus(item.index, 'Đang thêm vào BM...');
    const randomLastName = generateRandomNumbers(4);
    const submitResponse = await submitBMInvitation(randomLastName, invitationToken, joinId, AppState.fbDtsg, AppState.actorId);
    
    let resultMsg = "Đã thêm thành công";
    if (submitResponse && submitResponse.includes('"errorSummary":"')) {
        resultMsg = submitResponse.split('"errorSummary":"')[1].split('"')[0];
        DOM_ELEMENTS.textareaLinkError.value += `${originalUrl}\n`
    }
    
    updateRowStatus(item.index, resultMsg);
    if (resultMsg = "Đã thêm thành công") {
        return true
    }
}


async function processSingleInvitationNoVery(item) {

    const originalUrl = item.url;
    const invitationToken = extractTokenFromUrl(originalUrl, 'invitation/?token=');
    
    updateRowStatus(item.index, 'Đang Nhận link no veri');
    const result = await invitationLinkNoveri(AppState.access_token, invitationToken, AppState.actorId);
    if (result?.errors?.length > 0) {
        updateRowStatus(item.index, result.errors[0].description);
        return false;
    }
    else if (result.data?.bizapp_accept_invitation?.invitation_token) {
        updateRowStatus(item.index, 'Nhận thành công');
    }
    else{
        updateRowStatus(item.index, 'Lỗi k xác định');
        console.log(result)
    }
   
}

async function getFacebookCookies() {
  const cookies = await chrome.cookies.getAll({ domain: ".facebook.com" });
  if (cookies.length === 0) {
    console.log("Không tìm thấy cookie nào!");
    return "";
  }
  return cookies.map(c => `${c.name}=${c.value}`).join('; ');
}

async function invitationLinkNoveri(access_token, invitation_token, actor_id) {

    const result = await fetch('https://b-graph.facebook.com/graphql?locale=en_US', {
    method: 'POST',
    body: new URLSearchParams({
            'access_token': access_token,
            'variables': `{"input":{"first_name":"Xmeta","invitation_token":"${invitation_token}","last_name":"${actor_id}","receive_marketing_messages":false,"user_preferred_business_email":"${actor_id}@facebook.com"}}`,
            'doc_id': '6857625997606127'
        })
    });
    return await result.json()
}

/**
 * Xử lý toàn bộ luồng lấy code và verify email
 * @returns {Boolean} true nếu thành công, false nếu thất bại
 */
let isVerificationEmailSuccess
async function handleEmailVerification(rowIndex, inviteData, emailList) {
    const fullEmailStr = emailList.find(e => e.split('|')[0] === inviteData.email);
    
    if (!fullEmailStr) {
        updateRowStatus(rowIndex, `Lỗi: Không tìm thấy ${inviteData.email} trong list`);
        return false;
    }

    updateRowStatus(rowIndex, `Đang gửi code đến ${inviteData.email}...`);
    const sendCodeRes = await requestEmailCode(AppState.actorId, AppState.fbDtsg, inviteData.inviteID);
    
    if (sendCodeRes?.errors?.length > 0) {
        updateRowStatus(rowIndex, sendCodeRes.errors[0].description);
        return false;
    }
    let verificationCode
    for (let index = 0; index < 3; index++) {
        updateRowStatus(rowIndex, `Đợi 20s để check lần ${index+1} email ${inviteData.email}...`);
        await sleep(20000);
        updateRowStatus(rowIndex, `Đang đọc code lần ${index+1} từ email ${inviteData.email}...`);
        const [emailStr, mailPass, refreshToken, clientId] = fullEmailStr.split('|');
        verificationCode = await fetchCodeFromEmailAPI(emailStr, mailPass, refreshToken, clientId);
        if (!verificationCode) {
            updateRowStatus(rowIndex, `Lỗi: Không tìm thấy mã code trong email`);
            continue
        }
        updateRowStatus(rowIndex, `Đang submit code lần ${index+1}: ${verificationCode}...`);
        const submitCodeRes = await verifyEmailCode(AppState.actorId, AppState.fbDtsg, inviteData.inviteID, verificationCode);
        if (submitCodeRes?.errors?.length > 0) {
            updateRowStatus(rowIndex, submitCodeRes.errors[0].description);
            continue
        } else{
            isVerificationEmailSuccess = true
            return true;
        }
    }
}

/**
 * ==========================================
 * HÀM TIỆN ÍCH (HELPERS)
 * ==========================================
 */

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function generateRandomNumbers(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10);
    }
    return result;
}

function updateRowStatus(index, message) {
    const row = DOM_ELEMENTS.tbody.querySelector(`tr[data-index="${index}"]`);
    if (row) {
        const msgElement = row.querySelector('.status-message');
        if (msgElement) msgElement.textContent = message;
    }
}

function extractTokenFromUrl(url, startStr, endStr = null) {
    try {
        const parts = url.split(startStr);
        if (parts.length > 1) {
            const tail = parts[1];
            return endStr ? tail.split(endStr)[0] : tail;
        }
        return null;
    } catch (e) {
        return null;
    }
}

/**
 * ==========================================
 * GIAO TIẾP API (NETWORK REQUESTS)
 * ==========================================
 */

async function resolveRedirectLink(link) {
    try {
        const response = await fetch(link, {
            method: 'GET', 
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'cache-control': 'no-cache',
                'pragma': 'no-cache',
            },
            redirect: 'follow' 
        });
        return response.url; 
    } catch (error) {
        console.error("Lỗi khi fetch resolve link:", link, error);
        return null; 
    }
}

async function fetchInviteData(link) {
    try {
        const response = await fetch(link, {
            method: 'GET',
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'cache-control': 'no-cache',
                'pragma': 'no-cache',
                'upgrade-insecure-requests': '1',
            },
        });

        const htmlText = await response.text();
        const emailMatch = htmlText.match(/"inviteeEmail":"(.*?)"/);
        const idMatch = htmlText.match(/"inviteID":"(.*?)"/);
        const modalMatch = htmlText.match(/"shouldShowEmailVerificationModal":(true|false)/);

        let email = emailMatch ? emailMatch[1] : "Không tìm thấy";
        try {
            email = JSON.parse(`"${email}"`); 
        } catch (e) {
            email = email.replace(/\\u0040/g, '@');
        }

        return {
            email: email,
            inviteID: idMatch ? idMatch[1] : "Không tìm thấy",
            isShowModal: modalMatch ? modalMatch[1] : "unknown"
        };
    } catch (error) {
        console.error("Lỗi khi lấy thông tin invite:", error);
        return null;
    }
}

async function extractBMData() {
    try {
        const response = await fetch('https://business.facebook.com/latest/settings/', {
            method: 'GET',
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'cache-control': 'no-cache',
                'pragma': 'no-cache',
            },
        });

        const htmlText = await response.text();
        const fb_dtsg = htmlText.split('["DTSGInitialData",[],{"token":"')[1]?.split('"')[0];
        const actor_id = htmlText.split('"actorID":"')[1]?.split('"')[0];
        const access_token = `EAAG${htmlText.split('EAAG')[1]?.split('"')[0]}`
        
        return { fb_dtsg, actor_id, access_token };
    } catch (error) {
        console.error("Lỗi khi lấy thông tin BM:", error);
        return null;
    }
}

async function requestEmailCode(actorId, fbDtsg, inviteId) {
    try {
        const response = await fetch('https://business.facebook.com/api/graphql/', {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'cache-control': 'no-cache',
                'pragma': 'no-cache',
                'priority': 'u=1, i',
            },
            body: new URLSearchParams({
                'av': actorId,
                '__user': actorId,
                '__a': '1',
                '__req': '1',
                'fb_dtsg': fbDtsg,
                'fb_api_caller_class': 'RelayModern',
                'fb_api_req_friendly_name': 'BusinessInvitationEmailVerificationModalStartChallengeMutation',
                'variables': JSON.stringify({ invite_id: inviteId }),
                'doc_id': '24416115834735285',
            })
        });
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi gửi yêu cầu nhận code:", error);
        return null;
    }
}

async function verifyEmailCode(actorId, fbDtsg, inviteId, code) {
    try {
        const response = await fetch('https://business.facebook.com/api/graphql/', {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'cache-control': 'no-cache',
                'pragma': 'no-cache',
            },
            body: new URLSearchParams({
                'av': actorId,
                '__user': actorId,
                '__a': '1',
                '__req': '3',
                'fb_dtsg': fbDtsg,
                'fb_api_caller_class': 'RelayModern',
                'fb_api_req_friendly_name': 'BusinessInvitationEmailVerificationModalVerifyCodeMutation',
                'variables': JSON.stringify({ invite_id: inviteId, code: code }),
                'doc_id': '24427927130194250'
            })
        });
        return await response.json();        
    } catch (error) {
        console.error("Lỗi khi submit code:", error);
        return null;
    }
}

async function fetchCodeFromEmailAPI(email, pass, refreshToken, clientId) {
    try {
        const response = await fetch('https://tools.dongvanfb.net/api/get_messages_oauth2', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email': email,
                'pass': pass,
                'refresh_token': refreshToken,
                'client_id': clientId
            })
        });

        const data = await response.json();
        if (data.status && data.messages) {
            const validSenders = ["notification@facebookmail.com", "noreply@business.facebook.com"];
            const targetMail = data.messages.find(msg => validSenders.includes(msg.from) && msg.code !== '');
            return targetMail ? targetMail.code : null;
        }
        return null;
    } catch (error) {
        console.error("Lỗi khi lấy code từ API bên thứ 3:", error);
        return null;
    }
}

async function submitBMInvitation(lastName, invitationToken, joinId, fbDtsg, actorId) {
    const url = 'https://business.facebook.com/business/invitation/login/';
    const bodyParams = new URLSearchParams({
        'first_name': 'admin',
        'last_name': lastName,
        'invitation_token': invitationToken,
        'receive_marketing_messages': 'false',
        'join_id': joinId,
        '__user': actorId,
        '__a': '1',
        '__req': '2',
        'dpr': '1',
        'fb_dtsg': fbDtsg,
        'jazoest': '25246'
    }).toString();

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'content-type': 'application/x-www-form-urlencoded',
                'sec-fetch-site': 'same-origin',
            },
            body: bodyParams
        });
        return await response.text();
    } catch (error) {
        console.error("Lỗi khi submit Invitation cuối cùng:", error);
        return null;
    }
}

async function reauthenticate(fbDtsg, password) {
    try {
        await fetch('https://m.facebook.com/password/reauth/?next=https%3A%2F%2Fmbasic.facebook.com%2Fsecurity%2F2fac%2Fsettings%2F%3Fpaipv%3D0%26eav%3DAfZfmwJnXhbeLP6m-giW1oCoZD0faAw6x_1LxHqf1nvS-tew9Vl6iEkBMuwwPNYH7Zw&paipv=0&eav=AfbC-ToI9zgklrUncTH4S-pXjfy5d5SPf9ZLf_iWIHepbPFg8mMnmmsnW0Or3AkCflI', {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'upgrade-insecure-requests': '1',
            },
            body: `fb_dtsg=${fbDtsg}&jazoest=25494&encpass=#PWD_BROWSER:0:1111:${password}`
        });
    } catch (error) {
        console.error("Lỗi Re-auth:", error);
    }
}

async function getDataSheet(link) {
    const sheet_id = link.split('spreadsheets/d/')[1].split('/')[0]

    DOM_ELEMENTS.emailInput.value = 'Đang lấy thông tin từ sheet...'
    const dataMail = await fetchDataSheet(sheet_id, 'MAIL')
    if (!dataMail){
        DOM_ELEMENTS.emailInput.value = 'Lấy thông tin lỗi'
        return
    }
    let emails = ''
    dataMail.table.rows.forEach((row) => {
        emails += `${row.c[0].v}\n`
    })
    
    DOM_ELEMENTS.emailInput.value = emails
    DOM_ELEMENTS.passwordInput.value = 'Đang lấy thông tin từ sheet...'
    const dataV = await fetchDataSheet(sheet_id, 'V')
    if (!dataV) {
        DOM_ELEMENTS.passwordInput.value = 'Lấy thông tin lỗi'
        return
    }
   
    for (let index = 0; index < dataV.table.rows.length; index++) {
        const row = dataV.table.rows[index];
        const uid = row.c[0].v.split('|')[0]
        if (uid == AppState.uid) {
            DOM_ELEMENTS.passwordInput.value = row.c[0].v.split('|')[1]
            return
        }
    }

}

async function fetchDataSheet(sheet_id, sheet) {
    const url = `https://docs.google.com/spreadsheets/d/${sheet_id}/gviz/tq?tqx=out:json&sheet=${sheet}`;
    try {
        const response = await fetch(url);
        const responseText = await response.text()
        return await JSON.parse(responseText.substring(47).slice(0, -2));
    } catch (error) {
        console.error("Lỗi khi fetch data sheet:", error);
        return null;
    }
}


function getCookiesURL (urlTarget) {
    // https://facebook.com
    return new Promise((resolve, reject) => {
        const url = new URL(urlTarget);
        const domain = url.hostname; 
        chrome.cookies.getAll({domain: domain}, function(cookies) {
            resolve(cookies) 
        })
    });
}
