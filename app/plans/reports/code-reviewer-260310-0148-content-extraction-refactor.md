# Code Review: Content Extraction Refactor

**Date**: 2026-03-10
**Reviewer**: code-reviewer
**Build**: TypeScript compiles clean (`tsc --noEmit` passes)
**Net impact**: +210 / -902 lines (net -692 lines)

---

## Scope

- **New data files**: 11 files in `src/data/` (contact-info, company-info, about, help, partners, reviews, payment, pricing-plans, coming-soon, milestones, talk-to-sales)
- **Modified pages**: 17 marketing pages
- **Modified components**: 6 (site-header, floating-contact-button, cta-section-05, faq-component-08, info-card, product-catalog-grid, tools-hub-content, navigation-menu)
- **Focus**: Correctness, consistency, completeness, code quality

---

## Scores

| Criteria | Score | Notes |
|---|---|---|
| Correctness | 9/10 | All imports resolve, TypeScript compiles, no broken references |
| Consistency | 6/10 | `contact-info.ts` only adopted in 4 files; ~15 files still hardcode URLs |
| Completeness | 7/10 | `company-info.ts` created but unused; contact centralization incomplete |
| Code Quality | 8/10 | Clean extraction, good file sizes, proper typing |

---

## Critical Issues

None.

---

## High Priority

### H1. `contact-info.ts` adoption is incomplete

`CONTACT` from `contact-info.ts` is imported in only **4 files**:
- `site-header.tsx`
- `floating-contact-button.tsx`
- `cta-section-05.tsx`
- `talk-to-sales/page.tsx`

**15+ files still hardcode contact URLs:**

Pages (5):
- `profiles/page.tsx:28` -- `https://t.me/GoAdsSupport`
- `pages/page.tsx:27` -- same
- `tiktok-accounts/page.tsx:27` -- same
- `blue-verification/page.tsx:27` -- same
- `unban/page.tsx:27` -- same

Components (5):
- `coming-soon-hero.tsx:108,114` -- hardcoded twice
- `cart-popover.tsx:109` -- `const TELEGRAM_URL = 'https://t.me/GoAdsSupport'`
- `shopping-cart-02.tsx:20` -- `const TELEGRAM_USERNAME = 'goads_official'`
- `footer-component-02.tsx:26,35` -- telegram + whatsapp URLs
- `testimonials-component-22.tsx:109` -- telegram URL

Data files (2):
- `help-page-data.tsx:8-9` -- hardcoded telegram + whatsapp URLs instead of using `CONTACT`
- `landing-faq.ts:55,127` -- telegram handle in answer text (acceptable in prose)

**Fix**: Import `CONTACT` and replace hardcoded URLs in all files above. The `help-page-data.tsx` is especially ironic since it's a new file created in this refactor.

### H2. `company-info.ts` is dead code

`company-info.ts` defines `COMPANY` with name, tagline, experience, clients, etc. but **zero files import it**. Business stats ("500+", "5+ years", "7-day", "<2h") remain duplicated across 10+ data files.

**Fix**: Either wire `COMPANY` constants into data files that reference these values, or delete `company-info.ts` until it's actually needed (YAGNI).

---

## Medium Priority

### M1. `as const` features require spread workaround

`coming-soon-data.tsx` uses `as const` making `features` a readonly tuple. Pages pass `features={[...data.features]}` to create mutable copies. Works but is a pattern smell.

**Fix**: Either type `ComingSoonHero.features` as `readonly string[]`, or remove `as const` from the data file.

---

## Low Priority

None worth flagging.

---

## Positive Observations

1. **Massive reduction** -- 692 net lines removed. Pages are now thin composition layers.
2. **All marketing pages under 200 lines** -- largest is `help/page.tsx` at 119 lines.
3. **Good typing** -- `reviews-page-data.ts` imports and applies `TestimonialItem[]` type, `milestones-page-data.tsx` uses `Release[]`.
4. **Clean data file organization** -- naming is descriptive and consistent (`*-page-data.ts/tsx`).
5. **Proper separation** -- JSX-containing data files use `.tsx`, pure data uses `.ts`.
6. **`contact-info.ts` design is solid** -- well-structured with `as const`, grouped by platform, includes URL variants (with/without message).

---

## Recommended Actions (Priority Order)

1. **[HIGH]** Replace all hardcoded contact URLs with `CONTACT` imports (15+ locations listed above)
2. **[HIGH]** Fix `help-page-data.tsx` lines 8-9 to use `CONTACT.telegram.official` and `CONTACT.whatsapp.main`
3. **[HIGH]** Either use `COMPANY` constants in data files or delete `company-info.ts`
4. **[MEDIUM]** Accept `readonly string[]` in `ComingSoonHero` props to avoid spread workaround

---

## Unresolved Questions

1. Should `landing-faq.ts` prose answers (lines 55, 127) that mention "@GoAdsSupport" and "+84865717497" also be centralized via template strings, or is inline text acceptable for natural-language content?
2. `legal-content.tsx` references "@goads_official" in legal text -- should legal documents use `CONTACT` constants or remain static for compliance reasons?
