## Phase 05: FAQ Section

**Priority:** P2 | **Status:** pending | **Effort:** 30m

### Overview
Install a FAQ block variant (from 19 available) with GoAds' 7 frequently asked questions.

### Context Links
- [Homepage Content - Section 17](../../migration-docs/02-homepage-content.md)

### Content to Apply

**Section ID:** `faq` (for anchor link from header nav)
**Title:** "Frequently Asked Questions"
**Description:** "Find answers to common questions about GoAds products and services. Can't find what you're looking for? Contact our support team."

| # | Question | Answer |
|---|----------|--------|
| 1 | What is an agency ad account? | Agency accounts are pre-established advertising accounts with higher trust scores. They have fewer restrictions, faster approvals, and better stability than personal accounts. |
| 2 | What happens if my asset gets banned? | 7-day warranty with 1:1 replacement. If something goes wrong within warranty (not due to your policy violation), we replace it free. |
| 3 | How is GoAds different from other providers? | We operate as a professional agency, not MMO-style vendor. Structured processes, clear communication, real support, accountability. |
| 4 | What payment methods do you accept? | Stripe, PayPal, bank transfer (Wise, IBAN), and cryptocurrency (Bitcoin, USDT). |
| 5 | How fast is delivery? | Most orders within 24 hours. Complex setups up to 48 hours. |
| 6 | What support after purchase? | Fast response via Telegram, WhatsApp, or Discord. Real humans who know your order. |
| 7 | Why are BM5 accounts more expensive? | BM5 accounts have run campaigns successfully = higher trust with Meta. More trust = more stability = higher price. |

### Implementation Steps

1. User picks FAQ block variant (accordion preferred)
2. Install: `npx shadcn@latest add @ss-blocks/{faq-block-name}`
3. Replace content with 7 Q&As above
4. Add `id="faq"` to section for anchor linking
5. Strip block container, use goads `container`
6. Background: white

### Related Code Files
- Create: `src/components/shadcn-studio/blocks/{faq-block}/`
- Modify: `src/app/page.tsx`

### Todo
- [ ] User picks FAQ block variant
- [ ] Install block
- [ ] Replace content with 7 GoAds FAQs
- [ ] Add section id="faq"
- [ ] Adapt layout to goads container

### Success Criteria
- 7 FAQ items visible in accordion/list format
- Answers expand/collapse correctly
- Section anchor works from header nav
