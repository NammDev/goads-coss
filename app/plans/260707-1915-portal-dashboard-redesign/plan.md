# Portal (Customer) Dashboard — Full Redesign (Foreplay style + dense tables)

**Created:** 2026-07-07 · **Updated:** 2026-07-07 (scope upgraded to full redesign)
**Branch:** nammdev-77
**Skill:** `/clone-foreplay` (Foreplay design language)

## Goal
Redesign mạnh toàn bộ **portal khách hàng** theo **ngôn ngữ Foreplay** + tổ chức dữ liệu **clean dense** (kiểu bảng gọn/dày). Gọn còn 5 tab: **Orders, Wallet, BM, Profile, Page**.

## Scope (user-confirmed)
- ✅ Chỉ **portal khách hàng** (`/portal`). Admin giữ nguyên (plan riêng sau).
- ✅ **Chỉ redesign 5 route:** Orders, Wallet, BM, Profile, Page (+ shell).
- ✅ **BỎ HẲN route cũ:** Shop (`/portal` catalog), Products index, Community, Tools/*. Không có nhóm "More". Xoá khỏi nav + xoá code route.
- ✅ Theme **light + dark toggle** (content); sidebar luôn dark.
- ✅ Bảng **clean dense** (Foreplay-styled, không gridline kiểu Excel).
- ✅ Redesign luôn **shell** (sidebar + header) theo Foreplay.
- ✅ Primary button = **xanh lá** như admin Foreplay (`#009f6d`).
- ✅ Giữ **Warranty + Copy-credentials** trên bảng khách (BM/Profile/Page).

## ⭐ Reference: Foreplay ADMIN dashboard (không phải marketing)
Nguồn: `docs/foreplay/admin/` (admin.html + admin1-5.css + screenshot). **Admin compact hơn marketing** (radius 6–10px, font 14px, KHÔNG dùng Inter Display headings). Portal theo token **admin** này.

## ⭐ Crux: theme strategy = Dark sidebar (fixed) + Light/Dark content
Chữ ký Foreplay admin = **sidebar TỐI cố định + content SÁNG** → giải quyết mâu thuẫn light/dark:
- **Sidebar/shell: LUÔN dark** (token admin: bg `#23242c`/base `#060710`, text inactive `#c1c7d0`, active trắng, hover `rgba(255,255,255,.12)`, divider `rgba(255,255,255,.08)`, width 288/76px collapse).
- **Content: themeable** light/dark (dùng `:root`/`.dark` có sẵn), style theo tỷ lệ admin.

### Token map (admin → portal)
| Nhóm | Light (content) | Dark (content) | Ghi chú |
|---|---|---|---|
| Page bg | `#f6f8fa` | dùng `.dark` `--background` | — |
| Card | `#fff` border `#eceff3` radius 10px pad 16px | `.dark` `--card` | — |
| Text | primary `#06070f` · secondary `#303546` · muted `#5e6678` | `.dark` tokens | — |
| Primary btn | green `#009f6d` border `#1f8e6b` | giữ green | CTA chính |
| Secondary btn | white + ring `0 0 0 1px rgba(0,56,108,.08)` text `#303546` | — | radius 6px |
| Accent | blue `#006bff` (tiết chế), red `#ff002f` | — | — |
| Font | Inter 14px / line 20px | — | KHÔNG Inter Display |

**Tái dùng:** `typography.ts` (chỉ phần Inter body/label — color-agnostic). **KHÔNG** bê atom `.site` (dark-fixed, nút trắng). Build primitive portal semantic-token với tỷ lệ admin.

## Data model impact
- **KHÔNG đổi schema DB, không migration.** `note`/`checkLive` lưu trong `credentials` JSON (cột có sẵn).
- Chỉ sửa **query layer** (đọc/JOIN/decrypt), không đụng bảng.

## Phases
| # | Phase | Depends | File |
|---|-------|---------|------|
| 1 | ✅ Portal design foundation (`.portal` token scope, reuse-first) | — | [phase-01](phase-01-portal-design-foundation.md) |
| 2 | ✅ Shell & nav redesign (5 tab, xoá route cũ, /portal→Orders; community giữ route) | 1 | [phase-02](phase-02-shell-and-nav.md) |
| 3 | ✅ Data layer (PortalDeliveredRow + PortalOrderRow queries) | — | [phase-03](phase-03-data-layer.md) |
| 4 | ✅ Dense DataTable (`dense` prop on AdminDataTable, reuse) | 1 | [phase-04](phase-04-dense-table-primitive.md) |
| 5 | ✅ Orders tab (5 cột spec, row click → detail) | 3,4 | [phase-05](phase-05-orders-tab.md) |
| 6 | ✅ BM / Profile / Page tabs (spec cols + note/checkLive + real data) | 3,4 | [phase-06](phase-06-product-tabs.md) |
| 7 | ✅ Wallet + polish + changelog (next build PASS) | 4 | [phase-07](phase-07-wallet-and-polish.md) |

**🎉 ALL PHASES COMPLETE (2026-07-07).** Production `next build` passes.

## Column specs (target)
**Orders:** Order Time · Order (list `Nx <name>`) · Revenue · Status · Delivered Time
**Profile:** Delivery Time · Name Product · Check Live · Note · UID · Password · 2FA
**BM:** Time Delivery · Name Product · Noted · Business Name · ID BM
**Page:** Delivery Time · Name Product · Note · Page Name · Page ID · Link

## Suggested execution order
1 → (2 ‖ 3) → 4 → (5 ‖ 6) → 7. Phase 1 là nền, làm trước. Phase 3 (data) chạy song song được.

## Resolved decisions
- Primary button = xanh lá `#009f6d`.
- Route cũ (Shop/Products-index/Community/Tools) → **xoá hẳn** (nav + code).
- Check Live = **field text thủ công** (Live/Die), admin nhập.
- Warranty + Copy → **giữ trên bảng khách**.

## Out of scope
- Delivery Grid (paste-from-sheet cho admin) — plan riêng.
- Admin redesign.
- Live-checker tự động (Check Live chỉ là text).

## Open questions
- (none — tất cả đã chốt. `/portal/products/[type]/[id]` → **bỏ luôn**.)
