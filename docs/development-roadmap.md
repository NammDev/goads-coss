# GoAds Development Roadmap

> 4 phases: MVP (done) → Auth + Dashboard → Extension + Community → Growth & AI

---

## Phase 1 — MVP Release ✅

Goal: Marketing site with order flow, replacing goads.shop.

**Status: DONE**

| Area | Status | Highlights |
|------|--------|------------|
| Products + Cart | Done | All product pages, cart → `/payment` (bank/crypto) |
| Search (cmd+K) | Done | Index-based, cross-category |
| Tools | Done | 19 free tools |
| Knowledge Base | Done | 3-tier hierarchy, custom routing |
| Resources | Done | About, milestones, reviews, partners, help |
| Blog | Done | 5 posts, category sidebar, TOC |
| SEO | Done | sitemap, robots, OG meta, Twitter cards |
| Legal | Done | ToS, Privacy, Refund — shared layout |
| Analytics | Done | Vercel Analytics + Speed Insights |
| Contact | Done | Floating button (Telegram + WhatsApp), `/talk-to-sales` |

---

## Phase 1A — Polish & Audits

Goal: Quality audit before Phase 2.

**Status: Not started**

| Task | Priority |
|------|----------|
| Mobile responsive audit (375/768/1024/1440px) | High |
| Dark mode audit (all pages + blocks) | High |
| Lighthouse audit (target > 90) | High |
| Cart mobile UI fix | High |
| Cal.com embed on `/talk-to-sales` | Medium |

---

## Phase 2 — Auth + Dashboard

Goal: Auth system + admin panel + customer portal. Foundation for everything else.

**Status: Not started**

### Operational Flow

```
Customer → Cart form → Telegram bot → Admin tư vấn
→ Admin tạo account cho khách (nếu mới)
→ Khách chuyển tiền → Admin confirm thủ công
→ Admin ship hàng trong web (gắn BM ID, invite link, etc.)
→ Khách login → xem đơn hàng + sản phẩm đã nhận
```

### RBAC

| Role | Who | Access |
|------|-----|--------|
| Super Admin | nammdev, justin | Full: finance, staff, settings, all CRUD |
| Staff | ~3 employees | Orders, customers, ship. No finance/staff/settings |
| Customer | buyers | Own orders, delivered products, tools, profile |

### 2A — Infrastructure (do first)

| Feature | Priority | Notes |
|---------|----------|-------|
| PostgreSQL setup | Critical | Users, orders, products, delivered items |
| Auth (Better Auth) | Critical | Email/password. Admin creates customer accounts |
| RBAC middleware | Critical | 3 roles with route protection |
| Telegram bot | Critical | Receive cart forms, auto-notify on status change |
| Data encryption | Critical | Sensitive fields (BM ID, invite links) encrypted at rest |

### 2B — Admin Panel

| Feature | Priority | Notes |
|---------|----------|-------|
| Dashboard overview | Critical | New orders, pending ships, revenue (super_admin only) |
| Order management | Critical | CRUD, status flow: Pending → Paid → Processing → Shipped → Completed |
| Order ship flow | Critical | Confirm payment, set dates, attach product info |
| Customer management | Critical | Create accounts, purchase history, notes, total spend |
| Product management | High | CRUD products, inventory tracking |
| Telegram notifications | Medium | Auto-notify customer on order status change |

### 2C — Customer Portal

| Feature | Priority | Notes |
|---------|----------|-------|
| Order history | Critical | Status timeline: Ordered → Paid → Processing → Shipped → Done |
| Delivered products | Critical | BM ID, name, invite link (copy), status (active/inactive) |
| Profile page | High | Personal info, order summary, settings |

### Data Security

- Sensitive fields encrypted at rest in PostgreSQL
- Google Sheets: internal admin only (1-way DB → Sheet sync), never exposed to customers
- Customer data visible only after authentication

---

## Phase 3 — Extension + Community + Search

Goal: Extension platform, community forum, advanced search. All depend on Phase 2 auth.

**Status: Not started**

### 3A — BM Invite Extension (Chrome)

| Feature | Priority | Notes |
|---------|----------|-------|
| Extension API endpoints | Critical | JWT auth, BM invite link CRUD |
| Chrome extension | Critical | Login via portal → JWT → fetch BM invites → inject to browser |
| Extension access control | High | Admin toggles access per customer (qualifying purchases) |
| Extension infrastructure | High | Designed for future tool extensions |

```
Portal login → JWT stored → Extension reads token → GoAds API → BM invite links
```

Distribution: Chrome Web Store or manual .crx from portal.

### 3B — Community

| Feature | Priority | Notes |
|---------|----------|-------|
| Discussion board | Medium | Requires auth from Phase 2 |
| Public user profiles | Medium | Activity, reputation |
| Moderation tools | Medium | Admin/staff moderation |

### 3C — Search & Docs Enhancement

| Feature | Priority | Notes |
|---------|----------|-------|
| Doc search (Pagefind / Algolia) | Medium | Full-text across knowledge base |
| AI Ask (RAG) | Medium | Chat with docs, answer customer questions |
| Cross-content search | Low | Search across community + docs + blog |

---

## Phase 4 — Growth & Intelligence

Goal: Automation, payments, analytics, scaling.

**Status: Not started**

| Feature | Priority | Notes |
|---------|----------|-------|
| Payment integration | High | SePay (VietQR) VN + Stripe international |
| Auto-delivery pipeline | High | Payment confirmed → assign → push to portal |
| CMS for blog/docs | High | Staff manages content without code |
| Admin analytics | High | Revenue, MRR, ARPU, LTV |
| Warranty tracking | High | 7-day countdown, 1-click claim |
| Email notifications | High | Order confirmed, delivered, warranty expiring |
| Live product monitoring | Medium | Auto-check BMs/profiles, ban alerts |
| Referral/Affiliate | Medium | Invite link + commission tracking |
| Customer segmentation | Medium | Whale vs casual, targeted marketing |
| Tool tiers (free/pro) | Medium | Gate advanced tools behind login |
| Bulk order API | Low | Enterprise integration |

---

## Summary

```
Phase 1  ✅  Marketing site + cart + tools + blog + docs + SEO
Phase 1A ⏳  Polish & audits
Phase 2  ⏳  Auth → Admin Panel → Customer Portal (FOUNDATION)
Phase 3  ⏳  Extension Platform + Community + Search (needs Phase 2)
Phase 4  ⏳  Payments + Automation + Analytics + Growth
```

```
Dependency:  Phase 2 (Auth) ──► Phase 3A (Extension)
                             ──► Phase 3B (Community)
                             ──► Phase 3C (Search/AI)
                             ──► Phase 4  (all)
```
