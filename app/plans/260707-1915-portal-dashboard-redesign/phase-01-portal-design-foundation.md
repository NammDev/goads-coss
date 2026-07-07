# Phase 01 — Portal Design Foundation (Foreplay ADMIN language)

**Priority:** Highest · **Status:** ✅ DONE (2026-07-07) · Nền cho mọi phase.
**Reference:** `docs/foreplay/admin/` (admin.html + admin1-5.css + screenshot).

## ✅ Approach chốt (reuse-first, không hand-roll primitive)
Thay vì build PortalCard/Button/Badge mới → **remap semantic tokens trong scope `.portal`** ⇒ mọi shadcn component sẵn có (Card/Button/Badge/Sidebar) tự khoác look Foreplay admin. Đúng nguyên tắc reuse, DRY hơn.

## ✅ Đã làm
- `globals.css`: thêm scope `.portal` (content light) + `.dark .portal` (content dark) + sidebar tokens **dark-fixed** (không redeclare ở dark → giữ dark cả 2 theme). Primary = green `#009f6d`, radius 10px, font Inter.
- `portal/layout.tsx`: bọc `<div class="portal {fontInter.variable} font-sans">`.
- Verify: `tsc --noEmit` PASS; sidebar.tsx dùng `bg-sidebar`/`text-sidebar-foreground` (17 chỗ) → dark sidebar tự áp.
- **Chưa cần** primitive riêng; nếu sau này thiếu (vd badge status pastel) sẽ thêm ở phase dùng tới.

## Overview
Dựng design layer theo **Foreplay admin**: dark-sidebar-fixed + light/dark-content. Compact (radius 6–10px, font 14px), KHÔNG Inter Display.

## Exact tokens (từ admin CSS)
**Dark sidebar (fixed, mọi theme):**
- bg `#23242c` / base gradient `#060710`; text inactive `#c1c7d0`, active `#fff`
- hover `rgba(255,255,255,.12)`; divider `rgba(255,255,255,.08)`
- workspace icon-buttons: 48×48 (collapse 44×44), radius 10px, hover `rgba(255,255,255,.06→.12)`

**Content (themeable):**
- page bg `#f6f8fa` (light) / `.dark --background`
- card `#fff`, border `#eceff3`/`#dfe1e7` 1px, radius 10px, pad 16px
- text primary `#06070f`, secondary `#303546`, muted `#5e6678`/`#808899`

**Buttons:**
- Primary (green): bg `#009f6d`, border `#1f8e6b`, text `#fff`, radius 6px, pad 8px10px
- Secondary: bg `#fff`, text `#303546`, ring `0 1px 2px rgba(4,26,75,.13), 0 0 0 1px rgba(0,56,108,.08)`, radius 6px, pad 6px8px
- Destructive: bg `#f4003a`, border `#c80031`, text `#fff`
- Blue accent `#006bff` (tiết chế)

**Badges/pills:** radius 4px (pill 18px), font 10px w500; accepted `#effefa`/`#184e44`, pending `#fff6e0`/`#603a20`, rejected `#f2f4f7`/`#5e6678`
**Input:** radius 6px, font 14px/20px, ring shadow `0 0 0 1px rgba(0,56,108,.08)`, focus bg `#fff`
**Font:** Inter, base 14px, line 20px.

## Related files
- Modify: `src/app/globals.css` — thêm token portal (map trên) vào `:root`/`.dark`; scope `.portal` set Inter + rhythm; scope `.portal-sidebar` = dark fixed
- Reuse: `src/components/atoms/typography.ts` (chỉ Inter body/label/heading — bỏ Inter Display)
- Create primitives (semantic-token, tỷ lệ admin):
  - `src/components/portal/ui/portal-card.tsx`
  - `src/components/portal/ui/portal-button.tsx` (variants: primary-green / secondary / destructive / ghost)
  - `src/components/portal/ui/portal-badge.tsx` (status map)
  - `src/components/portal/ui/portal-section-head.tsx`

## Implementation steps
1. Định nghĩa token trong globals.css: content tokens themeable (light/dark), sidebar tokens dark-fixed (scope riêng để không đổi theo `.dark`).
2. Verify Inter loaded (next/font trong layout). Bỏ phụ thuộc Inter Display cho portal.
3. Build 4 primitive trên, dùng semantic token — zero hex trong JSX.
4. Kiểm tra render light & dark.

## Todo
- [ ] Portal tokens (content themeable + sidebar dark-fixed) trong globals.css
- [ ] `.portal` / `.portal-sidebar` scope
- [ ] PortalCard / PortalButton / PortalBadge / PortalSectionHead
- [ ] Verify Inter; drop Inter Display
- [ ] Compile + xem light/dark

## Success criteria
- Bộ primitive đúng thẩm mỹ admin Foreplay, đẹp cả light & dark content, sidebar luôn dark.
- Zero hex trong JSX (chỉ semantic token) — tuân banned-list skill.
