# Deployment Guide

> Build, deploy, and configure the GoAds website on Vercel.

---

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm or pnpm
- Vercel account (for production deployment)
- shadcn-studio license (for block registry access)

## Local Development

```bash
cd app
npm install
npm run dev          # http://localhost:3000
```

## Build

```bash
cd app
npm run build        # Static export to .next/
npm run start        # Serve production build locally
```

### Build Checks

- `npm run lint` — ESLint with Next.js config
- `npm run build` — Type checking + static generation
- Lighthouse audit: target > 90 on all metrics

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `SHADCN_STUDIO_EMAIL` | Build | shadcn-studio registry auth |
| `SHADCN_STUDIO_LICENSE_KEY` | Build | shadcn-studio registry auth |

No runtime environment variables in Phase 1 (fully static site).

### Setting Variables

**Local development**: Create `app/.env.local`
```bash
SHADCN_STUDIO_EMAIL=your@email.com
SHADCN_STUDIO_LICENSE_KEY=your-key
```

**Vercel**: Settings → Environment Variables → add both keys for Production + Preview.

## Vercel Deployment

### Setup

1. Connect GitHub repository to Vercel
2. Set root directory to `app`
3. Framework preset: Next.js (auto-detected)
4. Add environment variables (see above)

### Build Settings

| Setting | Value |
|---------|-------|
| Root Directory | `app` |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Install Command | `npm install` |
| Node.js Version | 18.x |

### Deployment Triggers

- Push to `main` → Production deployment
- Push to other branches → Preview deployment
- No CI/CD pipeline configured (Vercel handles builds)

## Domain Configuration

- Production: `goads.shop` (and `www.goads.shop`)
- Metadata base URL: `https://www.goads.shop`
- Sitemap: `https://www.goads.shop/sitemap.xml`

## Image Domains

Configured in `next.config.ts` — remote patterns allowed:

| Domain | Purpose |
|--------|---------|
| `shadcnstudio.com` | Block preview images |
| `randomuser.me` | Avatar placeholders |
| `simpleicons.org` | Brand icons |

Add new domains to `images.remotePatterns` in `next.config.ts` before using.

## Post-Deployment Checks

- [ ] All pages render (spot-check 5+ routes)
- [ ] Dark mode toggle works
- [ ] Mobile responsive (test 375px viewport)
- [ ] OG meta tags visible (use og-image debugger)
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] Vercel Analytics receiving data
- [ ] Speed Insights recording metrics
- [ ] No console errors in production

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails with shadcn-studio error | Check `SHADCN_STUDIO_EMAIL` and `SHADCN_STUDIO_LICENSE_KEY` env vars |
| Images not loading | Add domain to `next.config.ts` remotePatterns |
| Font not rendering | Verify `geist` package installed, check `src/fonts/index.ts` |
| CSS not applying | Check `globals.css` import in `layout.tsx` |
| Dark mode broken | Verify `next-themes` ThemeProvider with `attribute="class"` |

## Chrome Extension (GoAds BM Invite v2)

### Architecture

Extension v2 uses **Clerk session cookie auth** (replaces v1 token-based auth):
- Reads `__session` cookie from `goads.shop` domain (set by Clerk after login)
- Verifies via `POST /api/extension/verify` on the backend
- Periodic re-verify every 30 min via `chrome.alarms`
- Offline fallback: cached user in `chrome.storage.local`

### Extension Files

| File | Purpose |
|------|---------|
| `extension/manifest.json` | Manifest V3, permissions: activeTab, storage, scripting, tabs, cookies, alarms |
| `extension/background.js` | Service worker — auth, BM detection, invite logic |
| `extension/content.js` | Overlay UI injected into Facebook tabs |
| `extension/content.css` | Overlay styles |
| `extension/config.js` | Dev config (localhost:3000) |
| `extension/config.prod.js` | Prod config (goads.shop) |
| `extension/build-zip.sh` | Build script for distribution zip |

### API Endpoint

`POST /api/extension/verify` — verifies Clerk session JWT:
- Source: `app/src/app/api/extension/verify/route.ts`
- Input: `Authorization: Bearer <session_token>`
- Output: `{ valid, user: { id, name, email, role } }`
- Uses `@clerk/nextjs/server` `createClerkClient().verifyToken()`

### Building Extension Zip

```bash
# Development build (localhost)
cd extension
./build-zip.sh

# Production build (goads.shop)
./build-zip.sh --prod
```

Output: `app/public/downloads/goads-bm-invite-v2.zip`

The `--prod` flag swaps `config.js` → `config.prod.js` (changes API_URL and SITE_URL to production).

### Portal Integration

- Extension management page: `/portal/tools/extensions`
- Token card (`extension-token-card.tsx`) updated: removed token generation/copy UI, shows "Sign in with GoAds" flow instructions
- Docs guide: `app/src/content/docs/bm-invite-extension-guide/` (Markdoc)

### Extension Auth Flow

1. User clicks extension icon on Facebook
2. Extension reads `__session` cookie from goads.shop
3. If no cookie → shows "Sign in with GoAds" button → opens `/sign-in` tab
4. User signs in → returns to Facebook tab → `visibilitychange` event triggers re-check
5. Extension verifies session via `/api/extension/verify` → caches user info

## Performance Targets

| Metric | Target | Tool |
|--------|--------|------|
| LCP | < 2.5s | Vercel Speed Insights |
| FID | < 100ms | Vercel Speed Insights |
| CLS | < 0.1 | Vercel Speed Insights |
| Lighthouse Performance | > 90 | Chrome DevTools |
| Lighthouse Accessibility | > 90 | Chrome DevTools |
| Lighthouse SEO | > 90 | Chrome DevTools |
