# Design Decisions

All decisions reference `docs/design-guidelines.md` as canonical source.

## 1. Color Scheme — Same as Marketing

**Decision**: Use existing GoAds oklch token palette. No separate admin palette.

**Rationale**:
- Brand consistency across marketing + dashboard
- CSS variables already handle light/dark — zero extra work
- Dashboard Shell 9 uses semantic tokens (`bg-card`, `text-foreground`) — fully compatible
- Status badges use standard Tailwind color utilities (yellow, blue, green, red) — these are the only non-token colors allowed

## 2. Typography — Same Geist + JetBrains Mono

**Decision**: Keep `--font-sans: Geist` and `--font-mono: JetBrains Mono`.

**Rationale**:
- Geist is optimized for data-heavy UIs (designed by Vercel for dashboards)
- JetBrains Mono for BM IDs, invite links, technical data
- Type scale from design-guidelines.md applies directly

| Context | Classes |
|---------|---------|
| Page title | `text-2xl font-semibold` |
| Card title | `text-lg font-semibold` |
| Table headers | `text-sm font-medium` |
| Table cells | `text-sm` |
| Stats number | `text-2xl font-bold` |
| BM ID / codes | `font-mono text-sm` |

## 3. Language — Vietnamese Labels

**Decision**: Vietnamese for user-facing text. English for technical terms.

| Vietnamese | English (keep as-is) |
|-----------|---------------------|
| Đơn hàng | Dashboard (nav label) |
| Khách hàng | Status: Active/Inactive |
| Sản phẩm | BM ID, Business Manager |
| Tài chính | Admin, Editor, Subscriber |
| Cài đặt | — |

**Rationale**: 100% Vietnamese customer base. Technical terms (BM, Agency Account) stay English — customers already use them.

## 4. Density — Compact Tables, Relaxed Cards

**Decision**: Hybrid approach.

| Context | Density | Spacing |
|---------|---------|---------|
| Data tables | Compact | `py-2` row height, `text-sm` |
| Stats cards | Relaxed | `p-6`, spacious numbers |
| Forms | Standard | Default shadcn spacing |
| Portal order cards | Relaxed | `p-4 sm:p-6`, comfortable reading |

**Rationale**: Admin needs to scan lots of rows. Portal needs comfortable UX for non-technical users.

## 5. Admin Mobile — Desktop-Only with Warning

**Decision**: Show warning banner on `< 768px`. Don't block access, just warn.

```tsx
// mobile-warning.tsx
<div className="fixed inset-x-0 bottom-0 z-50 border-t bg-yellow-50 p-3 text-center text-sm md:hidden">
  Sử dụng máy tính để có trải nghiệm tốt nhất
</div>
```

**Rationale**: Admin users are staff — always at desks. No ROI in optimizing complex tables/forms for mobile.

## 6. Customer Portal Mobile — Fully Responsive

**Decision**: Mobile-first responsive design.

| Breakpoint | Sidebar | Content |
|-----------|---------|---------|
| `< 768px` | Hidden → Sheet overlay | Full-width, stacked |
| `768px+` | Visible, collapsible | Fluid, max-w-7xl |

- Order cards stack vertically
- Timeline becomes vertical on mobile
- Copy buttons remain accessible (tap target ≥ 44px)

**Rationale**: Customers check order status on phones. Must work perfectly on mobile.
