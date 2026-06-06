# Extension — 2 features: BM Invite + Cookie Login

**Branch:** nammdev-53 · No sign-in (auth already removed).

## Goal
One injected overlay, a **home screen** to pick a feature, each feature on its own
screen with a **back button + guidance banner**.

## Screens (content.js)
- `home` — 2 buttons: 🔗 BM Invite · 🍪 Cookie Login.
- BM Invite path: `loading` (4-step init) → `invite` (existing form) / `error`. Back→home.
- `cookie` — Cookie Login. Back→home.

## Guidance banners
- BM Invite: "Mở business.facebook.com + chọn 1 BM trước khi dùng."
- Cookie Login: "Lấy cookie/token của FB đang đăng nhập, hoặc dán cookie để đăng nhập tài khoản khác (trang reload)."

## Cookie Login layout
1. Current account: `c_user` (+ name nếu lấy được token).
2. **Get Cookie + Token** → textarea (string `name=value;...` + optional `|TOKEN`) + Copy.
3. **Import** textarea → Import & Login → set cookies → reload facebook.com.

## Cookie format
`c_user=...;xs=...;fr=...;datr=...;` optionally `…|EAAA…token`. Split on `|`: left = cookies, right = token (optional).

## Background handlers (new)
- `getCookies()` → chrome.cookies.getAll(facebook) → `name=value;` string + cUser.
- `getCookieToken()` → getCookies + reuse initEaag/initEaab → `cookies|token`.
- `setCookies(str)` → parse left of `|` → chrome.cookies.set each on `.facebook.com`.
- `currentAccount()` → c_user from cookie + name via token (reuse initVerify).

## Files
- `content.js` — restructure screens + cookie UI + wiring.
- `content.css` — home buttons, tab/back, cookie screen, guidance banner.
- `background.js` — add cookie handlers + router entries.
- `manifest.json` — `cookies` + facebook host already present (no change needed).

## Out of scope
- User-agent spoofing (reference had a checkbox) — skip for now (YAGNI).
- Dead legacy popup.html/js.

## Verify
- node --check on JS; manual: load unpacked → home → each feature.
