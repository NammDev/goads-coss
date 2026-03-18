---
status: in-progress
created: 2026-03-16
branch: main
---

# Phase 3 — Deploy & Go Live

> Goal: Deploy to production, finalize auth config, harden for launch.

---

## Tasks

| # | Task | Priority | Status | Notes |
|---|------|----------|--------|-------|
| 1 | Vercel deploy + Clerk Production | Critical | ⏳ | Custom domain → Clerk Prod instance → env vars → webhook. See `task-01-vercel-deploy.md` |
| 2 | ~~Clerk webhook publicMetadata~~ | Critical | ✅ | Merged into Task 1 Step 6 (webhook setup) |
| 3 | ~~Username+password login~~ | Critical | ✅ | Done — Clerk Dashboard already requires username |
| 4 | ~~Global error boundary~~ | Critical | ✅ | global-error.tsx + error.tsx at root, auth, admin, portal |
| 5 | Rate limiting server actions | High | ⏳ | Prevent abuse on cart/order/wallet actions |
| 6 | ~~Mock data cleanup~~ | High | ✅ | RecentTransactions now uses getRecentOrders() from DB |
| 7 | ~~CSP headers~~ | High | ✅ | CSP + X-Frame-Options + X-XSS + Referrer-Policy + Permissions-Policy in next.config |
| 8 | ~~robots noindex admin/portal~~ | High | ✅ | robots.ts disallow + metadata noindex on admin/portal layouts |
| 9 | Cross-role E2E testing | Medium | ⏳ | Smoke test all roles before going live |
| 10 | Logging/monitoring (Sentry) | Medium | ⏳ | Production error tracking |
