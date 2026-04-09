# Foreplay Clone — Post-Clone Production Plan

> Các bước cần làm SAU KHI đã clone đầy đủ routes + Thành thêm content + Trang thêm ảnh để hoàn thiện đẩy lên production.

## Priority Order

### P0 — Must-have trước khi launch

1. **Responsive** — tablet + mobile breakpoints (hiện desktop-only)
   - 3 breakpoints từ foreplay source CSS: desktop / `max-md` (≤991px) / `max-sm` (≤767px)
   - Test trên Chrome DevTools device emulation + real device
2. **Refactor tokens** — convert hardcoded hex → oklch CSS vars
   - Xóa `[]` arbitrary Tailwind values
   - Register tokens trong `globals.css` theo `docs/foreplay/design-guideline.md` section "CSS Token Standards"
3. **SEO** — meta tags, Open Graph, Twitter cards, JSON-LD, sitemap.xml, robots.txt, canonical URLs per route
   - Next.js `generateMetadata()` cho từng route
   - `next-sitemap` hoặc manual `sitemap.ts`
4. **Performance** — `next/image` optimization, lazy load, Lighthouse ≥ 90, Core Web Vitals (LCP/CLS/INP)
   - Convert `<img>` → `<Image>` toàn bộ
   - Preload critical fonts, defer non-critical JS
5. **Internal links audit** — check tất cả CTA/nav không broken, đúng anchor
   - Script scan: grep `href="/...` và verify route tồn tại

### P1 — Should-have trước khi launch

6. **Accessibility (a11y)** — alt text, ARIA labels, keyboard nav, color contrast AA
   - axe-core hoặc Pa11y scan
7. **Error pages** — custom 404, 500, error boundaries
   - Next.js `app/not-found.tsx`, `app/error.tsx`
8. **Forms** — validation + captcha cho `/talk-to-sales`, `/unban`, etc.
   - Cloudflare Turnstile hoặc hCaptcha
9. **Analytics** — GA4 / Vercel Analytics / Plausible (chọn 1)
   - Event tracking cho conversion CTAs
10. **Security headers** — CSP, HSTS, X-Frame-Options
    - `next.config.ts` headers() hoặc middleware

### P2 — Nice-to-have, có thể làm sau launch

11. **Monitoring** — Sentry error tracking, uptime monitor (Better Stack / UptimeRobot)
12. **Cookie consent** — GDPR banner nếu có EU traffic
13. **Content review** — proofread, fix typo, consistency tone
14. **Cross-browser test** — Chrome, Safari, Firefox, Edge + iOS Safari
15. **Final QA** — E2E test critical paths via Playwright (signup, checkout, contact form)

---

## Checklist

### Prerequisites (điều kiện tiên quyết)

- [ ] Tất cả routes trong bảng 2 `nested.md` đã ở status ✅ Done
- [ ] Thành đã thêm đầy đủ content (text, copy, CTA labels)
- [ ] Trang đã thêm đầy đủ ảnh (hero, product showcase, testimonials, etc.)

### P0 — Must-have

- [ ] **Responsive**: 3 breakpoints cho tất cả routes
- [ ] **Tokens**: zero hardcoded hex + zero `[]` arbitrary values
- [ ] **SEO**: metadata per route + sitemap + robots.txt + JSON-LD
- [ ] **Performance**: Lighthouse ≥ 90 desktop + ≥ 85 mobile
- [ ] **Internal links**: zero broken links

### P1 — Should-have

- [ ] **a11y**: axe-core zero critical issues
- [ ] **Error pages**: 404 + 500 custom pages
- [ ] **Forms**: validation + captcha live
- [ ] **Analytics**: tracking script + conversion events
- [ ] **Security**: headers configured

### P2 — Nice-to-have

- [ ] **Monitoring**: Sentry + uptime monitor active
- [ ] **Cookie consent**: banner deployed (if needed)
- [ ] **Content**: proofread pass done
- [ ] **Cross-browser**: manual test 5 browsers
- [ ] **E2E tests**: Playwright suite passing

---

## Related Docs

- [Routes tracker](./nested.md) — Marketing + Foreplay route tracker
- [Design guideline](./design-guideline.md) — Token standards, typography, components
- [Changelog](./changelog.md) — Component inventory + phase progress
- [Clone reference](./clone.md) — Page-by-page clone notes

## Notes

- Ưu tiên làm tuần tự từ P0 → P1 → P2
- P0 block launch, P1 block marketing ads push, P2 có thể rollout từng phần sau launch
- Mỗi mục lớn nên có sub-plan riêng khi bắt đầu thực hiện (ví dụ: `plans/{date}-responsive-breakpoints/`)
