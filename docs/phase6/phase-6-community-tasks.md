---
status: in-progress
created: 2026-03-18
branch: feature/community
---

# Phase 6 — Community Tasks

> Goal: Community features for customer engagement + CMS + email notifications.

---

## Tasks

| # | Task | Priority | Status | Notes |
|---|------|----------|--------|-------|
| 1 | Discussion board — DB schema | High | ✅ | 7 tables + 2 enums + 8 seeded categories. See `task-01-community-db-schema.md` |
| 2 | Discussion board — API layer | High | ✅ | 9 queries + 12 actions + notification integration. See `task-02-community-api-layer.md` |
| 3 | Discussion board — UI pages | High | ✅ | 3 pages + 14 components. See `task-03-community-ui-pages.md` |
| 4 | Discussion board — Portal integration | High | ✅ | Nav item added to `portal-nav.ts`, all pages auth-gated via `requireRole()` |
| 5 | Public user profiles — schema + queries | Medium | ✅ | Added username/bio/avatarUrl to users table + migration + profile queries + update action |
| 6 | Public user profiles — UI | Medium | ✅ | `/portal/community/user/[username]` profile page with stats + post history + author links in PostCard |
| 7 | Moderation tools — admin | Medium | ✅ | `/admin/community` — tabs (Reports queue + Posts management), pin/hide/status actions |
| 8 | Moderation tools — report system | Medium | ✅ | Report dialog with reason select, admin review (approve/hide/dismiss), expanded row actions |
| 9 | CMS for blog/docs | High | 🔜 | Deferred — staff manages blog posts + KB articles without code deploy |
| 10 | Email notifications — transactional | High | 🔜 | Deferred — order confirmed, delivered, warranty expiring (Resend/SES) |
| 11 | Email notifications — community | Medium | 🔜 | Deferred — new reply to your post, mention, weekly digest |
| 12 | Customer segmentation | Medium | ✅ | Auto-computed segments (whale/regular/casual/new) from order data, filterable in admin |
| 13 | Cal.com embed `/talk-to-sales` | Low | ✅ | Inline Cal.com embed with theme sync + CSP headers updated |

---

## Dependencies

- Requires: Clerk auth (Phase 2 ✅), DB + Drizzle (Phase 2 ✅)
- Discussion board (1-4) can start immediately — no blockers
- CMS (9) independent — can parallel with discussion board
- Email (10-11) needs email provider setup (Resend recommended)
- Segmentation (12) needs customer data patterns from Phase 4 analytics

## Suggested Execution Order

```
Parallel Track A: Discussion Board (1 → 2 → 3 → 4)
Parallel Track B: CMS (9)
Sequential: Email (10 → 11)
After Board: Profiles (5 → 6) → Moderation (7 → 8)
Last: Segmentation (12)
```
