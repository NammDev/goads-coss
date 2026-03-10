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

## Performance Targets

| Metric | Target | Tool |
|--------|--------|------|
| LCP | < 2.5s | Vercel Speed Insights |
| FID | < 100ms | Vercel Speed Insights |
| CLS | < 0.1 | Vercel Speed Insights |
| Lighthouse Performance | > 90 | Chrome DevTools |
| Lighthouse Accessibility | > 90 | Chrome DevTools |
| Lighthouse SEO | > 90 | Chrome DevTools |
