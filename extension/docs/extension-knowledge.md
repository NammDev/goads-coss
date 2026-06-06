# GoAds Extension — Knowledge / Handoff

> Đọc file này để nắm toàn bộ extension trong 1 lần. Cập nhật khi đổi lớn.

## Mục đích
Chrome extension (MV3) **"GoAds BM Invite"** — bộ công cụ Facebook cho GoAds, **KHÔNG cần đăng nhập** (đã gỡ auth). Click icon = inject 1 overlay vào **trang hiện tại bất kỳ** (không còn giới hạn facebook.com — dùng quyền `activeTab`). Brand: **goadsagency.com** (đã đổi từ goads.shop). Theme: **Foreplay/GoAds dark** (port token từ `app/src/app/globals.css` `.site`).

## 2 tính năng (chọn từ màn Home)
1. **🔗 BM Invite** — mời user vào Facebook Business Manager qua email. Đặc thù: **phải mở `business.facebook.com` + chọn 1 BM trước** (tool tự lấy token + detect BM qua tab BM đang mở — không phụ thuộc tab hiện tại). Flow: init 4 bước (cookie→token→verify→detect) → form email + role (Admin/Employee) → Send Invite (Graph API batch `POST /{bmId}/business_users`).
2. **🍪 Cookie Login** — nhập / lấy cookie để đăng nhập Facebook. **Tính năng chính = Import** (UI ưu tiên lên trên).
   - **Import & Login** (chính): dán `cookies` (hoặc `cookies|token`) → set cookie `.facebook.com` → reload `facebook.com` → đăng nhập **không cần uid/pass**. Chạy từ trang bất kỳ (tab hiện tại tự nhảy sang FB).
   - **Get Cookie + Token** (phụ): đọc cookie `.facebook.com` → string `name=value;...` (+ `|TOKEN` EAAG/EAAB) → Copy.

Mỗi feature có **banner hướng dẫn** + nút **← Back** về Home.

## Files (root `extension/`)
| File | Vai trò |
|------|---------|
| `manifest.json` | MV3, v2.1.0. perms: `activeTab, scripting, tabs, cookies`. host: `*.facebook.com`, `graph.facebook.com`, **`<all_urls>`** (để inject overlay mọi website, không phụ thuộc timing activeTab). **Không** `default_popup` (click icon = inject overlay). |
| `background.js` (~440 dòng) | Service worker. Message router + handlers FB + cookie. `onClicked`: inject overlay **mọi trang** (chỉ chặn scheme đặc biệt: `chrome://`, `edge://`, `about:`, web store). |
| `content.js` (~550 dòng) | Overlay UI (IIFE inject vào FB). Home + BM Invite + Cookie Login screens. |
| `content.css` (~520 dòng) | Style overlay — Foreplay dark theme (vars ở `:root` của `#goads-bm-overlay`). |
| `build-zip.sh` | Đóng gói → `app/public/downloads/goads-extension.zip` (archive root = `goads-extension/` folder) (env-agnostic, không còn config swap). |
| `icon48.png` / `icon128.png` | Icon extension. |
| **Đã xoá** | `config.js`, `config.prod.js` (auth cũ); `popup.html`, `popup.js` (legacy V1 dead code). |

## background.js — message handlers
Router: `chrome.runtime.onMessage` → `handlers[request.action]()`.
- **FB init:** `initCookie` (check c_user+xs), `initFromBMTab` (**fast path** — inject 1 lần `world:MAIN` vào tab `business.facebook.com` đang mở, đọc 1 lượt `token+dtsg+bmId+uid` **từ DOM đã load sẵn**, không tải lại trang), `initEaag`/`initEaab` (**fallback** — regex `EAAG…`/`EAAB…` bằng cách *tải nguyên trang* HTML; chỉ chạy khi fast path không ra token), `initVerify` (graph /me → name).
- **BM:** `detectCurrentBM` (business_id từ URL/path/require MAIN-world), `listBMs`, `enrichBMs`, `getAdAccountLimits` (inject MAIN-world XHR với fb_dtsg+uid) — *các hàm BM list/enrich/limits hiện UI chưa gọi, để dành.*
- **Invite:** `inviteBM({bmId,token,email,roles})` → Graph batch.
- **Cookie (mới):** `getCookieToken` (getAll facebook → `cookieStr|token`); `setCookies(payload)` (parse `name=value;` trái của `|` → `chrome.cookies.set` trên `.facebook.com`; **bắt buộc có `c_user`+`xs`**, thiếu → trả lỗi); `verifyLogin` (fetch `www.facebook.com/me` redirect-follow → URL cuối dính `/login|/checkpoint` = cookie hỏng → báo lỗi); `currentAccount` (c_user + name).
- `getCookie(name)` helper qua `chrome.cookies.get`.

## content.js — cấu trúc UI
- IIFE; chống double-inject (toggle nếu overlay đã có).
- `createOverlay()` build innerHTML: **header** (logo gấu + "GOADS Tools" + close) → **homeSection** (2 nút feature) → loadingSection → errorSection → **mainSection** (BM invite: guide+back, form-col + sidebar-col) → **cookieSection** (guide+back, account, **Import & Login** [chính], divider, Get/Copy [phụ]) → footer.
- `showScreen(name)`: ẩn `[home,loading,error,main,cookie]Section`, hiện 1.
- Mở overlay → `showScreen("home")`.
- BM Invite: click `featInvite` → `init()` (4 bước, progress) → `main`/`error`. **Tối ưu tốc độ:** bước 2 (token) + bước 4 (detect BM) gộp vào 1 lần gọi `initFromBMTab` (inject đọc DOM trang đã mở); `initEaag/initEaab` scrape trang chỉ còn là fallback khi không có token; **đã bỏ delay giả 300ms** cuối flow.
- Cookie: click `featCookie` → `openCookieFeature()` → `currentAccount` → các nút `handleGetCookie / handleCopyCookie / handleImportCookie`. **Import flow:** `setCookies` → `verifyLogin` → ok mới reload, hỏng thì hiện lỗi rõ (không còn "đơ" im lặng).
- **Ngôn ngữ UI: English** toàn bộ. Brand hiển thị: **GOADS** (header, footer, aria-label, name/description manifest).
- Email gen: random `@cvlmail.net` + open mailbox `cvlmail.net/#/<user>`.
- ID convention: tất cả prefix `goads-` (vd `goads-ckGet`, `goads-featCookie`, `goads-btnInvite`).

## Design system (content.css) — Foreplay tools-page (B/W mix)
**Concept:** dark chrome shell + **white content cards** (giống trang tool `Check Live UID` của site), KHÔNG còn all-dark. Tokens trong `#goads-bm-overlay { --… }` chia 2 nhóm:
- **Dark chrome** (shell/header/footer/home bg): `--bg:#020308 · --fg:#fff · --chrome-sub:#ffffffb3 · --chrome-muted:#ffffff70 · --chrome-border:#ffffff29 · --chrome-surface:#ffffff14`.
- **White card** (solid palette, port từ app `--solid-*`): `--card:#fff · --card-soft:#f9f9fa (solid-25) · --card-border:#e9eaef (solid-50) · --card-border-strong:#4c505f (solid-400)`. Ink (chữ trên trắng): `--ink-strong:#171920 (solid-700) · --ink:#343642 (solid-500) · --ink-soft:#4c505f (solid-400) · --ink-faint:#b2b4c5 (solid-300)`.
- **Primary button** = nút TỐI trên thẻ trắng (site `light-primary-button`): `--btn:#020308 · --btn-fg:#fff · --btn-hover:#24262e`. Outline = nền trắng + viền solid-50, hover solid-25.
- **Status** tuned cho nền trắng: ok `#ecfdf5/#a7f3d0/#047857`, err `#fef2f2/#fecaca/#b91c1c`.
- Radius: `--radius:10px` (nút/input) · `--radius-card:14px` (thẻ).
- **Type scale** (Foreplay typography.ts): base 14px (bodyS); header-title 18px/600 (headingL); section title 15px/600; label 14px/500 (labelS, tracking -0.006em); input/body 14px/400 (-0.011em); button 14px/550; caption/pill/footer 11–12px; card-title overline 11px/550 uppercase 0.14em.
- **Áp dụng:** Home feature buttons + loadingSection/errorSection/mainSection/cookieSection = **thẻ trắng** (margin 14px trong shell tối). Header (brand badge trắng + panda tối) & footer = tối. Sidebar BM-invite = nền `--card-soft`.
- `.goads-brand-mark` = chip tròn **trắng** chứa **GOADS panda SVG** (panda body `currentColor=--bg` → mark tối trên chip trắng). SVG nguồn: `app/src/components/layout/goads-mark.tsx`.
- ⚠️ Font Inter chưa bundle → fallback system sans (xem TODO).

## Build & test
- **Test:** `chrome://extensions` → Load unpacked → thư mục `extension/` → mở **web bất kỳ** (vd google.com) → click icon (trang nội bộ `chrome://`/web store thì Chrome chặn, không hiện).
- **Zip:** `./build-zip.sh` → `app/public/downloads/goads-extension.zip` (archive root = `goads-extension/` folder) (website cho tải).

## Lịch sử thay đổi gần đây
1. Gỡ **toàn bộ sign-in** (Clerk/verify/alarm/legacy token) — extension dùng ngay.
2. Thêm **Cookie Login** feature + màn **Home** chọn tính năng + banner hướng dẫn + back.
3. **Redesign** sang Foreplay dark theme; dọn CSS auth chết.
4. Đổi `goads.shop` → **goadsagency.com**; thêm **logo gấu** vào header.
5. **Bỏ giới hạn domain khi mở overlay** — trước chỉ inject trên facebook.com; giờ mở mọi website (thêm `<all_urls>` host_permission + bỏ guard domain). Chỉ chặn scheme nội bộ `chrome://`/`edge://`/`about:`/web store (Chrome cấm, không vượt được). BM Invite vẫn cần tab `business.facebook.com` (không đổi).
6. **Đảo UI Cookie Login**: **Import & Login** lên trên (tính năng chính, nút primary), **Get Cookie** xuống dưới (phụ, có divider). Guide nhấn mạnh "đăng nhập không cần mật khẩu".
7. **Fix "đơ" khi import cookie hỏng**: `setCookies` validate bắt buộc `c_user`+`xs`; thêm `verifyLogin` check session thật trên server; import sai → báo lỗi rõ, **không reload**.
8. **Toàn bộ UI → English**; mọi text brand `GoAds`/`goads` → **GOADS**; **xoá** popup.html/js legacy.
9. **Redesign theo Foreplay tools-page (B/W mix)**: bỏ all-dark; thêm **thẻ trắng** cho content (home cards + tool screens) trên shell tối; port `--solid-*` palette + type scale Foreplay (sửa lỗi font 13px đồng loạt). Verify bằng headless-Chrome screenshot.
10. **Tối ưu tốc độ fetch BM** (fix "init chậm"): thêm `initFromBMTab` — gộp lấy token + detect BM vào **1 inject** đọc thẳng DOM trang `business.facebook.com` đang mở (thay vì `initEaag`/`initEaab` tải 6 trang HTML nặng vài MB để regex token). Scrape trang giữ làm fallback. Bỏ delay 300ms. Kỳ vọng nhanh hơn nhiều lần khi đã mở sẵn tab BM.

## TODO / lưu ý chưa xong
- **Font Inter chưa bundle** — fallback system sans. Muốn chuẩn cần thêm `Inter.woff2` + `@font-face` qua `web_accessible_resources`.
- `listBMs/enrichBMs/getAdAccountLimits` định nghĩa nhưng UI v2 chưa dùng.
- Cookie set không httpOnly (vẫn login được — kỹ thuật chuẩn cookie-login).
- **Chưa commit** các thay đổi extension (user tự commit).
- Versioning lệch nhẹ: manifest 2.1.0, footer content.js không còn ghi version.

## Unresolved questions
- Có cần bundle font Inter không? Có xoá popup legacy không? Có làm UI cho listBMs/limits không?
