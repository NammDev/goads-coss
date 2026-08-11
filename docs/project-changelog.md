# Project Changelog

> Record of significant changes, features, and fixes.

---

## [2026-08-12] — New bookmarklet: Accept BM Link (no code)

Ported the "accept link without code" flow from this repo's `Nhận link` extension
(`docs/acceptlinkwithoutcode/`) into a GOADS bookmarklet. Sixth tool in the library.

**What it does.** Paste ONE Business Manager invitation link
(`business.facebook.com/invitation/?token=…`) and accept it with the account you're signed in as —
no verification code, no email round trip. Single-link form (link field + Accept + result panel),
compact 560px shell. Runs on facebook.com or the BM page.

**Tech (matched to the extension's code-free path):**
- Accept mutation → `b-graph.facebook.com/graphql` `doc_id 6857625997606127`,
  `first_name:"Xmeta"`, `last_name` = actor id, `user_preferred_business_email` = `<actor>@facebook.com`
  — request-for-request from `dashboard_re.js` `invitationLinkNoveri`.
- Token extraction from `invitation/?token=` links → the extension's `extractTokenFromUrl`.
- `access_token` + actor id read from the page via `shared/goads-fb-session.js`
  (`readAccessToken`, `readUserId`); everything runs on the user's own session
  (`credentials:"include"`), nothing is sent anywhere but Facebook.
- Only the code-free path is reproduced — the extension's email-verification path (third-party mailbox
  API) is left out, since the goal was the flow that needs nothing but the user's session.
- UI = the shared `gbk-` shell (header, brand strip, field + button + result), so it matches the rest
  of the library.

**Files.** `bookmarklets/goads-bm-acceptlink.js` (source), `ICON_TICKET` added to
`shared/goads-icons.js`, build job + `bm-acceptlink-payload.ts` generated, registry entry
(`slug: bm-acceptlink`, v1.0) in `app/src/data/bookmarklets/index.ts`.

**Verification.** Build round-trips the payload through URL-decode (23.1 KB, valid JS via `new Function`,
`b-graph` + `doc_id` present). `tsc --noEmit` clean. Token regex unit-checked on raw / query-suffixed /
pipe-delimited / non-link inputs.

---

## [2026-08-11] — BM Invite: tell the customer which gate a "sent" invite is behind

"It will show as Pending until accepted" was wrong whenever the BM holds the invite behind a gate —
a second admin having to approve it, or Facebook mailing the invitee a confirmation first.

`classifyPending(data)` reads the success reply and returns `approval` / `email` / `unknown`:
- **approval** → "A second admin must approve it. Ask another admin … Business Settings → People → Pending."
- **email** → "The invite must be confirmed by email", plus an **Open inbox** deep-link into `/tempmail`
  when the address is a GOADS one.
- **unknown** → both gates listed. This is the common case: the Graph edge often answers with nothing
  but `{"id":…}`, and a guess there would be worse than a short checklist.

Detection is signal-scan only (`PENDING_ADMIN_APPROVAL`, `PENDING_EMAIL_VERIFICATION`, `APPROVER`,
`CONFIRMATION_CODE`, …) over the stringified reply — no extra request, and a reply naming *both* gates
falls back to `unknown` rather than picking one. Sidebar note updated to match.

**Verification.** Ran the built payload in jsdom against a stubbed Facebook across 5 replies
(`{id}` / `status:PENDING` / email gate / approval gate / localised failure): each rendered the right
card, the tempmail link resolved to `#mailbox=abc123`, and the failure path stayed English.
Classifier unit-checked on 11 payload shapes including the both-signals and `null` cases.

---

## [2026-08-11] — BM Invite: failure messages are English-only

**Bug.** A failed invite printed half Vietnamese: `Method 1: Không thể thêm người dùng vào doanh nghiệp
này. | Method 2: The user cannot be added to the business.`

**Cause.** Method 2's URL carries `locale=en_US`; Method 1's did not, so Graph answered it in the
account's own language.

**Fix** (`bookmarklets/goads-bm-invite.js`):
- `locale=en_US` added to the Method 1 Graph edge URL — same as Method 2.
- `englishOnly()` guard: any message still containing non-ASCII (Facebook localises some replies
  regardless of `locale`) is swapped for "The user cannot be added to this business." Applied to
  `extractErrorMessage`, both fetch-exception paths, and `friendlyError`.
- Identical Method 1 / Method 2 errors now print once instead of being repeated behind two labels.

Requests are otherwise unchanged (`locale` is a display param), so the easyme.pro transport parity holds.
`bm-invite-payload.ts` regenerated; the other four payloads are byte-identical.

---

## [2026-08-10] — BM Invite bookmarklet: transport matched to easyme.pro

GOADS is an easyme.pro partner, so the invite tool should hit Facebook exactly the way theirs does.
The UI, logo and colours stay GOADS; only the wire layer changed.

### What the tool did before
Single request: batch endpoint on Graph **v24.0**, token scraped out of the page HTML (`EAAG…`/`EAAB…`),
`business_id` read from the URL. Roles were `["ADMIN", …]` for admin and
`["EMPLOYEE","ASSET_VIEW","PEOPLE_VIEW"]` for employee. One shot — if the batch call failed, that was it.

### What it does now (matched to `docs/bookmark/BM-invite.md`)
- **Token** — probes `business.facebook.com/ajax/bootloader-endpoint/?modules=AdsCanvasComposerDialog.react&__a=1`
  and takes the `EAAI…` token out of the response, then `require("WebApiApplication").getAccessToken()`.
  This is the token easyme's calls are authorised against; the old DOM scrape is now only a third fallback.
- **BM id** — `require("BusinessUnifiedNavigationContext").businessID` first.
- **Two methods with fallback**, in easyme's order:
  1. direct Graph edge `POST /v19.0/{bmId}/business_users` with `invite_origin=BM_INVITE_USER_FLOW`
  2. batch `POST /v19.0` wrapping `/v3.0/{bmId}/business_users`, unwrapping `data[0].body`
- **Role sets** are easyme's byte-for-byte, kept pre-encoded: admin leads with `DEFAULT` (not `ADMIN`),
  employee is `["EMPLOYEE"]` alone.
- **Verdict** — any `error`/`errors` key fails; otherwise success when the reply mentions `PENDING` or
  carries an `id`. Errors read `error_user_msg → message → first 200 chars of the raw JSON`.

### Kept deliberately different
- GOADS keeps its extra bmId/token fallbacks *after* easyme's chain, so the tool is a superset — it can
  still resolve a BM on asset-scoped URLs where the nav context never mounted.
- reauth/checkpoint replies are reworded into an actionable sentence. This is presentation only; the
  requests are unchanged.

### Verification
Deobfuscated the reference payload, then diffed both implementations' `(url, method, headers, body,
credentials)` tuples under a stub `fetch`: **byte-identical across admin/employee × method 1/2**.
Fallback order and success/error verdicts matched on 6 scripted reply scenarios.

### Notes
- Boot is now asynchronous (the token costs a fetch), so the Token pill holds "Checking…" until it
  resolves instead of flashing "Not found".
- The pre-encoded role strings contain `%`, which a `javascript:` URL would decode. `build-bookmarklets.mjs`
  already escapes `%`→`%25` and asserts the payload round-trips, so they survive the build intact.

---

## [2026-08-10] — /rental switched from a configurator to fixed plan tiers

Client reworked the commercial model after the first build: rentals are no longer
self-assembled bundles priced per ad account. They are now **two tracks × three tiers**,
each an all-in monthly plan with the whole stack (ad accounts, BM, profiles, pages)
already inside and unlimited same-day replacement on every asset.

### Plans (transcribed verbatim from the client's two spec tables)

Public track labels are **Standard** and **High-risk verticals** (client's call, replacing
the internal "Whitehat" / "BH + GH"). Internal ids match: `standard` / `high-risk`.

**Replacement is identical on both tracks** — unlimited, same-day, every asset. The spend
fee is the only thing the risk profile changes. Copy in the data file, the FAQ and the
track taglines all say this explicitly so the cheaper track never reads as less covered;
`REPLACEMENT_SPEC` is a single shared constant so no tier can drift.

**Standard** — flat 1% spend fee on every tier

| | Launch | Build | Scale |
|---|---|---|---|
| Monthly | $299 | $599 | $999 |
| Spend fee | 1% | 1% | 1% |
| Spend cap | $15k/mo | $50k/mo | $100k/mo |
| BM (ships) | BM3 Verified | BM5 Verified ($250) | BM5 Verified NLM |
| Ad accounts | 1 | 2 | 4 |
| Profiles | 2 | 3 | 4 |
| Pages | 1 | 2 | 3 |
| Support | 24/7 Telegram | 24/7 Telegram | Priority 24/7 |

**High-risk verticals** — ad accounts provisioned on demand, spend fee falls as you scale

| | Starter | Growth | Elite |
|---|---|---|---|
| Monthly | $349 | $749 | $1,199 |
| Spend fee | 6% | 5% | 4% |
| Spend cap | $15k/mo | $45k/mo | Unlimited |
| BM (ships) | BM3 Verified | BM5 Verified NLM | BM5 Verified NLM |
| Ad accounts | On demand | On demand | On demand |
| Profiles (2–7 yrs) | 2 | 4 | 6 |
| Aged reinstated pages | 2 | 4 | 6 |
| Support | 24/7 Telegram | Priority 24/7 | Priority + account manager |

### Files
| File | Role |
|------|------|
| `data/rental-page-data.ts` | Rewritten: tracks + plans + `comparisonRows` / `buildPlanEnquiry`, FAQ, benefits |
| `components/rental/rental-plans.tsx` | Client component — owns track state; heading + switcher + cards + shared-terms strip, all on one white block |
| `components/rental/rental-track-switcher.tsx` | Two-segment radiogroup (arrow-key navigable), light scope |
| `components/rental/rental-plan-card.tsx` | Plan card; middle tier inverts to a dark card |
| `components/rental/rental-hero.tsx` | Copy updated for the new model |

**Deleted** (configurator model retired): `rental-builder.tsx`, `rental-stepper.tsx`,
`rental-tier-ladder.tsx`, `rental-addon-row.tsx`, `rental-summary.tsx`,
`rental-summary-message.ts`.

### Notes
- **`RentalPlanCard` does not reuse `PricingCard`.** That component parses its price into
  a number and adds it to the cart — right for a one-time setup, wrong for a subscription
  (the cart has no billing term, so a $299/mo line yields a wrong checkout total). The
  rental CTA hands the plan to sales on Telegram with the tier pre-filled.
- Spec rows are declared once per plan and drive both the card list and the comparison
  table; the table takes its row labels from the first plan in the track.
- Verified in-browser that the switcher re-renders cards *and* the white-block table
  (Launch/Build/Scale ⇄ Starter/Growth/Elite), plus mobile at a real 390px viewport.
- Switcher goes full-width with equal halves below `sm` — "Standard" and "High-risk
  verticals" are very different lengths, so the longer label would otherwise size the pill
  or wrap mid-word on a phone.

### Second pass — one white block instead of dark cards + white table
The first layout printed the six numbers twice: dark plan cards, then a white comparison
table below them. Two surfaces, same data, and the split read as two unrelated sections.

- **Everything now lives on a single white block**: heading → track pills → three plan
  cards → a strip of terms that hold on every plan. `rental-spec-table.tsx` deleted — the
  cards already carry every spec row, so the table was pure duplication.
- **The recommended tier inverts to a near-black card** while its siblings stay
  `--solid-25`. The highlight is a value jump on a white surface rather than a coloured
  border, which is how the rest of the site marks a primary action on white. It lifts out
  of the row on desktop (`lg:-my-5 lg:py-12`) and carries a Meta-gradient "Most popular" pill.
- **CTA hierarchy follows the card**: light tiers use `light-stroke` (white + ring), the
  dark tier uses `hero` (white pill) so it stays the strongest button on screen.
- Switcher repainted for the light surface — active segment is the near-black fill.
- Universal terms (unlimited same-day replacement, delivered linked, switch any cycle, no
  setup fee) moved out of the per-card lists into one row under the grid.

Verified both tracks at 1440px and the stacked layout at a real 390px viewport.

### Third pass — BM tiers described by capability, not by name (2026-08-11)
Client does not want BM3 / BM5 / NLM exposed to customers. The Business Manager row now
states what the BM *does* instead of which tier it is, which also keeps the tiers
distinguishable — naming them all "verified BM" would have flattened the row to identical
text across every plan:

| Plan | Shown on the page | Actually ships |
|---|---|---|
| Launch · Starter | Verified, high quality | BM3 Verified |
| Build | Verified, higher daily spend | BM5 Verified ($250 DSL) |
| Scale · Growth · Elite | Verified, unlimited daily spend | BM5 Verified NLM |

The real tier is kept in a code comment on each row so sales and delivery still have it.
"Unlimited daily spend" matches the wording already used elsewhere on the site for the
same capability, so this also retires the open question about how to render "NLM".

**Quantity correction:** the client's original table gave Elite 2× BM. They corrected this
on 2026-08-11 — every plan on both tracks ships exactly one BM — so the `1×` / `2×`
prefixes are gone from the High-risk track.

### Fourth pass — own card / cashback as the top spec row (2026-08-11)
Client flagged a differentiator missing from the page: on every plan the customer attaches
**their own payment card** to the rented ad accounts, so card rewards and cashback on ad
spend stay with them. Providers that require top-ups through the provider collect that
themselves.

- Added as `OWN_CARD_SPEC` — a shared constant like `REPLACEMENT_SPEC` — and placed **first
  in the spec list**, above Business Manager, on all six plans: `Add your own card ·
  Keep the cashback`.

A longer "Every plan includes" feature band (hero tile + six tiles) was built first and then
removed at the client's request — it added reading time without adding a decision. The
cashback point survives as one row instead of a paragraph.

### Fifth pass — hero cut to headline + one line + CTAs (2026-08-11)
The hero carried a badge ("Monthly rental · Unlimited replacement") and a three-fact stat
strip (From $299 / Same-day / 2 tracks). All of it restated things the cards below say
properly, with the numbers attached, so it only delayed the customer reaching the section
that answers their question. Removed — hero is now headline, one sentence, two CTAs.

The remaining sentence leads on the differentiator: full stack for one fee → same-day
replacement → your own card, cashback stays yours.

The plans section description was then dropped entirely. The hero covers the offer and the
track tagline under the switcher explains the choice in the selected track's own wording —
a line between them could only repeat both. `SectionHead` now renders there with just the
overline and title.

### Sixth pass — top tier moved to the centre slot (2026-08-11)
Client wants the most expensive plan in the highlighted middle position.

- `highlight` moved from the middle tier to the **top** tier on both tracks (Scale $999,
  Elite $1,199).
- New `orderForDisplay()` puts the highlighted plan in the centre and keeps the other two
  in their relative order: **Launch · Scale · Build** and **Starter · Elite · Growth**.
  Done at render rather than by reordering `plans`, so the arrays stay in the client's own
  ascending-price order — the shape their spec tables have, and what anyone checking the
  numbers will expect. The visible price sequence is therefore non-monotonic by design
  ($299 · $999 · $599); the function comment says so, so it doesn't read as a sort bug.
- Badge changed **"Most popular" → "Recommended"**. The centre card is now the most
  expensive tier, and we have no basis for claiming it is the most popular one. A
  recommendation is ours to make; a popularity claim is a statement about customers.

### Seventh pass — ad accounts on demand everywhere, conversion copy, Foreplay rhythm (2026-08-11)

**Ad accounts are provisioned on demand on BOTH tracks.** Client confirmed the per-tier
counts in the original Standard table (1 / 2 / 4) are not a limit they enforce. Extracted to
`AD_ACCOUNT_SPEC`, a shared constant beside `REPLACEMENT_SPEC` and `OWN_CARD_SPEC`.

This made three pieces of copy false, all corrected — they had been selling on-demand
allocation as a High-risk differentiator, which now reads as "Standard is rationed":
- Standard tagline: "a fixed set of assets you keep for the term" → "a flat 1% spend fee on
  every tier, the lowest rate we run".
- High-risk tagline: dropped the ad-account claim; the differentiator is the spend fee.
- FAQ "difference between the two tracks": now spend fee + asset depth, with on-demand ad
  accounts listed among the things that are *identical*.

**"Why rent" rewritten for conversion.** Each card now names the cost the advertiser already
pays, then the term that removes it: a ban costs the day's spend and the learning phase → we
replace same-day; your card, your cashback; weeks of sourcing and warming → arrives
assembled; capital tied up in assets → one monthly line. Section title changed to "Your
budget belongs in ads, not in assets", and the section now ends on a `#plans` CTA instead of
leaving the reader to scroll back up. Claims stay inside what the plans guarantee — still no
invented performance numbers.

**Section rhythm aligned to the Foreplay scale** (`py-[108px] max-md:py-24 max-sm:py-20` =
`--py-section` / `-md` / `-sm`), matching /bm, /pages, /profiles and /agency-ad-account. Hero
keeps the pricing-page `pt-[72px]` opening.

Caught while aligning: wrapping the FAQ in that rhythm **doubled its spacing** —
`ProductPageFaqAccordion` already carries Foreplay's own `.faq` padding (`py-[140px]`
/ `max-md:py-20`) internally, which is why every other product page mounts it bare. Wrapper
removed.

### Eighth pass — "Not every rented account is the same" comparison table (2026-08-11)
New section between "why rent" and the FAQ — that order matches how a buyer works through
it: rent vs own, then us vs anyone else. `rental-comparison-table.tsx` +
`RENTAL_COMPARISON_ROWS`.

**The comparison column is "typical agency account", not "regular account".** On a regular
self-serve account the advertiser already uses their own card and already keeps their own
cashback, so three of the rows would be comparing against nothing. Against other rental /
agency providers — who fund accounts from their own balance — every row is a real
difference. Rows: daily spend limit · ad accounts · timezone & currency · state at handover ·
own payment card · top-up wait · cashback · replacement · support · how you pay us.

New client-supplied claims added: ad accounts **matched to the customer's timezone and
currency** and **warmed up before handover**; own card, **no top-up wait**, cashback stays
with the customer.

**Three rows from the reference table were not carried over**: a branded account-quality
score, "687% higher ad approval rate", and "5 minutes average ad approval time". Ad review is
Meta's process on Meta's timeline, and we have no data behind an approval-rate multiplier —
publishing those would put numbers on a commercial page that nobody here can defend. The
payment row uses what GOADS actually accepts (crypto USDT / bank transfer via Wise, per
`payment-page-content.ts`) rather than the reference's list.

Cross marks render as a dimmed dash, not a red X: a red X down the competitor column reads as
an attack, while "not offered" is the actual claim. Mobile keeps both values side by side
under the row label — collapsing to one column would lose the comparison itself.

**Placement + polish (same day):** moved to sit **directly after the plan cards** — the
customer has just seen the price, and the next question is what that price buys versus
renting anywhere else. "Why rent" now follows it.

The column header is the **GOADS logo** (`FooterLogoSvg`) instead of the words "GOADS
rental". The mark's panda body is `fill="currentColor"`, so the wrapper sets
`text-transparent` and the body punches through to the panel behind it — the navbar does the
same thing by setting the wrapper to `var(--nav-bg)`, but transparent works on any surface
without having to know its colour.

The GOADS column is highlighted as one continuous panel: cells carry the fill plus
**left/right inset borders only**, so the vertical edges run unbroken while row dividers stop
at the panel, with rounded caps on the first and last cell.

Bug caught in review: the first attempt drew that panel as a single rectangle placed at
`grid-row: 1 / -1` behind the cells. An explicitly-placed grid item makes auto-placement skip
the track it occupies, so every following cell shifted one column and the table rendered
scrambled — labels in column 2, values wrapping into the next row. Noted in the component so
it isn't reattempted.

### Ninth pass — typography audit against the Foreplay scale (2026-08-11)
Font *family* was already consistent — measured computed styles across the page: every leaf
text node in the sections resolves to Inter, and all four `h2`s render at 44px/600, the `h1`
at 60px/600. (`--font-display` resolves to the Inter variable font, whose `opsz` axis plus
`font-optical-sizing: auto` is what "Inter Display" means here — correct, not a fallback.)

What was off was the *scale*. Three fixes:
- **Track switcher** took `siteText.labelM` and then overrode only `font-size` on mobile
  (`max-sm:text-[0.875rem]`). Each step of the scale pairs a size with its own leading and
  tracking, so changing one in isolation lands between two steps. Replaced with the explicit
  labelS → labelM responsive pair, exact values from the scale.
- **"Recommended" badge** used `bodyXs` + Tailwind's default `tracking-wide` (0.025em) for
  uppercase text. `overline` is the one step of the scale that owns uppercase, at 0.1667em —
  every other uppercase label on the page uses it. Switched.
- **Comparison table rows** mixed sizes within a single row: label at `bodyM` (16px) against
  values at `labelS`/`bodyS` (14px). A row is one thought and should sit on one step —
  desktop now runs the whole row at 16px, mobile drops the whole row to 14px rather than
  shrinking only the values. `Value` gained a `size` prop so both breakpoints stay paired.

Zero off-scale text classes remain in `components/rental/` (the two arbitrary values left are
the switcher's exact labelS/labelM figures).

### Tenth pass — GOADS column repainted dark navy (2026-08-11)
The panel was a translucent white tint (`--alpha-800`), which on a near-black page just read
as "slightly lighter". Now it is dark navy, mixed as `--meta-blue-deep` at **14% over
`--background`** rather than a flat navy of its own — so it stays a tint of the page instead
of a foreign block, and it ties to the same Meta blue the rest of the page uses. Edges and
the in-panel row divider are blue-tinted to match (`--meta-blue` at 74% / 84% transparent).

Kept deliberately light on the mix: the brief was emphasis, not a second surface competing
with the plan cards above it.

Implementation note in the component: the paint constants are **complete literal class
strings**, never composed with template literals. Tailwind scans source text for whole class
names, so an interpolated `shadow-[...${EDGE}...]` would never be generated — the styles
would silently vanish at build time even though the code looks correct.

**Track switcher icons (2026-08-11).** White-hat / black-hat fedora marks on the two pills,
at the client's request. I first shipped a shield-check / flame pair instead, on the grounds
that a fedora puts the "BH + GH" shorthand — deliberately removed from the public labels —
straight back on the page as a picture; the client reaffirmed the hats, so hats it is. The
written labels stay "Standard" and "High-risk verticals".

New `assets/svg/hat-icons.tsx`. Drawn rather than pulled from an icon set: generic hat icons
carry brim detail, a band and a pinched crown that collapse into a smudge at 16px. The two
states differ by **weight, not colour** — white hat is the outline, black hat is the same
path filled — and both paint from `currentColor`, so each inherits its pill (white on the
active black pill, muted grey when inactive) with no per-state colour.

First draft used a true semicircle crown on a narrow brim and read as a bowler, closer to a
bell than a fedora. Final geometry is an 8-unit crown against an 18-unit brim (~2.25 ratio)
with a tapered, softly flat top. Rendered at `size-5`: the hat is wider than tall, so it
needs more box than a square glyph to carry the same visual weight as the label beside it.

**Foreplay alignment pass (2026-08-11).** Audited spacing, radii and container widths against
the spec and the existing pages.
- **Radii normalized to the Foreplay scale** (36 / 20 / 16 / 14 / 10 / 8 / 6). The page had
  introduced **24px and 18px**, which appear nowhere else in the codebase. Plan card and
  comparison-table frame → `rounded-[20px]` (PricingCard's value, same role); comparison panel
  caps and the replacement strip → `rounded-[16px]`.
- **Plan card padding** `p-7` (28px) → `p-6 max-sm:p-5`, matching PricingCard exactly. 28px is
  not a value the site uses anywhere.
- **Hero container** `wide` (1440px) → `section` (1216px), the width /pricing uses for its
  hero. `wide` is for full-bleed white-block tables, not a centred headline.
- Checked for the skill's banned patterns: no hardcoded hex in JSX, no inline colour styles,
  no arbitrary `p-[Npx]` / `gap-[Npx]` where a scale step exists. Clean.

**Copy pass (2026-08-11).** Full review of every user-facing string on the page.
- **Dashes removed from all copy.** Rendered page now measures zero `—`/`–`. Recast as
  colons, commas or separate sentences rather than swapped for hyphens. Numeric ranges follow
  the house pattern already used on /bm ("BM1 to BM2500"), so `Profiles (2–7 yrs)` became
  `Profiles (2 to 7 years)`.
- **Spelling aligned to the site's American convention** (`monetization`, `optimize` elsewhere
  in `data/`): "catalogue" → "catalog".
- **Tightened phrasing** in the four benefit cards and four FAQ answers: fewer subordinate
  clauses, no sentence carrying three ideas at once. The comparison section description
  ("What you get from us against what a rented account usually looks like") was ambiguous and
  is now "How our rentals compare with a typical agency account".
- The replacement strip listed asset types as a bare appositive after "disabled", which read
  as a broken sentence. Reordered to "If an ad account, Business Manager, profile or page in
  your setup is disabled, we replace it the same day."

**Logo rendering fix.** The header uses the shared `FooterLogoSvg` (the navbar/footer logo,
unmodified) at `h-10`, matching the navbar's size. It was wrapped in `text-transparent`,
which was wrong: in that mark the panda body, ears, eye and the G's inner curve are
`fill="currentColor"`, and in the official dark-background artwork (`extension/goads-logo.png`)
those parts are the near-black ground. Transparent let them take whatever surface sat behind,
so on the navy panel the panda rendered navy — a lookalike, not the logo. Wrapper is now
`text-[var(--background)]`, the same approach the navbar takes with `--nav-bg`, so the mark
is identical to every other placement on the site.

**No invented performance numbers were used.** The reference competitor quotes "8× higher ad
approval rates" and "up to 50% lower CPAs"; we have no data behind claims like that. Two
stats were researched and rejected: the widely-reported "Meta removed 10M accounts in H1
2025" figure is about **impersonator profiles, not ad accounts**, and the "78% of ad accounts
get restricted" number traces only to a vendor's own blog. Neither would survive a customer
checking the source.

`tsc` clean · lint clean.

---

## [2026-08-10] — Meta Asset Rental page at /rental (superseded, same day)

New monthly-rental product with a self-serve configurator, modelled on the "Build your
own setup" builder from /pricing but as a full page rather than a dialog — renting is a
quantity decision, and the volume ladder only pays off if the customer can watch the rate
move as they change the count.

### Commercial model (`data/rental-page-data.ts`)
- **Ad accounts are the required base**, minimum **2** per bundle. BM / profile / page are
  optional monthly add-ons.
- **Volume brackets, FLAT not marginal** — the bracket you land in prices every account:

  | Accounts | Rate |
  |---|---|
  | 2–5 | $280 / account / month |
  | 6–10 | $250 / account / month |
  | 11+ | $200 / account / month |

- **Unlimited replacement** on every rented asset for the life of the subscription.
- Add-on rates ($60 BM / $25 profile / $20 page per month) are **provisional** — flagged in
  the data file, client still tuning the optional combos.

### Files
| File | Role |
|------|------|
| `data/rental-page-data.ts` | Tiers, add-on catalogue, `unitPriceFor` / `computeMonthlyTotal` / `computeVolumeSaving`, validation, FAQ + benefit copy |
| `components/rental/rental-builder.tsx` | Two-step configurator + sticky summary column |
| `components/rental/rental-stepper.tsx` | Shared − / value / + control, `sm` + `lg` sizes |
| `components/rental/rental-tier-ladder.tsx` | Live bracket ladder + "add N more accounts" hint |
| `components/rental/rental-addon-row.tsx` | One optional asset row |
| `components/rental/rental-summary.tsx` | Line breakdown, monthly total, volume saving, CTAs |
| `components/rental/rental-summary-message.ts` | Config → plain-text summary, shared by the Telegram link and "Copy summary" |
| `components/rental/rental-benefits.tsx` | "Why rent" cards on the white block |
| `app/(marketing)/rental/page.tsx` | Hero + facts + builder → why-rent → FAQ → CTA |

### Notes
- **Not wired to the cart.** The cart is built for one-time purchases (flat subtotal, no
  billing term), so a $/month line would produce a wrong checkout total. The CTA hands the
  exact configuration to sales via a pre-filled Telegram message instead, with "Copy summary"
  as the offline fallback.
- **Stepper reports a delta, not the next value.** Reporting `value + 1` closed over the
  value from the drawing render, so a burst of fast clicks (React batches them into one
  render) collapsed into a single step — caught in-browser at 4 clicks → +1. Owners now apply
  the delta against previous state.
- Nav: added to the Product mega-menu "Services" group (desktop + mobile), footer Product
  column, and the search index.

`tsc` clean · lint clean (one pre-existing unused-icon warning) · brackets verified live in
the browser at 2 → $670, 6 → $1610, 11 → $2310, 50 → $10110.

### Redesign, same day — configurator moved onto the white block
First pass put everything on the dark background, which read as cluttered: four bordered
boxes in the hero plus a bordered frame around every control in the builder.

- **New `rental-hero.tsx`** — badge ("Monthly rental · Unlimited replacement") → gradient
  headline → subtitle → two CTAs ("Build your bundle" jumps to `#build`, "Talk to sales"),
  closing on a hairline-divided stat strip. The three headline terms were three separate
  cards before; one segmented strip states the same facts with one frame instead of three.
  Section gains `DotBg`.
- **Builder moved into `SectionWhiteBlock`** and repainted from dark `--alpha-*` to the
  light tool-language `--solid-*` palette, with `--meta-*` blue as the accent (active
  bracket, selected add-on rows, required badge, step-1 numeral). Page rhythm is now
  dark hero → white configurator → dark why-rent → FAQ → CTA; `RentalBenefits` flipped to
  dark so two white blocks don't sit back to back.
- **Framing thinned throughout** — one soft `--solid-25` field per step instead of a border
  per element; the tier ladder is a single segmented strip (hairline gaps, shared radius)
  rather than three free-standing cards. The dark summary card is now the only strong
  surface, which is where the eye should land.
- **`self-start` on the summary** — as a grid item it was stretching to the row height and
  growing a dead black tail below the last line.

Verified at 1440px and at a real 390px viewport. Note: the chrome-devtools skill's
`screenshot.js` silently ignores `--width`, so responsive checks need their own launcher
(`page.setViewport`) — the earlier "mobile" captures were desktop renders.

---

## [2026-08-10] — /tools/bookmark accent switched to Meta's official blues

Follow-up to the monochrome pass below: fully greyscale read flat, so the accent
came back — but as **Meta's own palette**, not the site's `--accent`. Every script
in the library runs on facebook.com, so the product's colour is the honest one.

### New tokens (`globals.css`, `.site` scope)
Four official hexes; every tint is `color-mix`-derived from them, nothing eyeballed.

| Token | Hex | Source |
|-------|-----|--------|
| `--meta-blue` | `#0866ff` | Facebook core blue (2023 refresh) |
| `--meta-blue-deep` | `#0064e0` | Meta blue, "Science Blue" |
| `--meta-blue-light` | `#0082fb` | Meta light blue — top stop of the infinity gradient |
| `--meta-ink` | `#1c2b33` | Meta dark |
| `--meta-tint` / `--meta-tint-strong` / `--meta-ring` | derived | `--meta-blue` at 7% / 14% / 24% over white |

### Applied
- **Cards** — well `--meta-tint` + `--meta-tint-strong` glow; icon tile now carries the
  Meta infinity gradient (`--meta-blue-light` → `--meta-blue-deep`) with a white glyph;
  category + version pills `--meta-blue-deep` on `--meta-ring`; hover border `--meta-ring`
  + blue shadow; focus ring and "link copied" check `--meta-blue`.
- **Drag anchor** (`atoms/bookmarklet-drag-anchor.tsx`) — keeps `light-primary` geometry,
  fill repainted Facebook blue → `--meta-blue-deep` on hover. Atom is used only by this
  page, so the shared `CTA_VARIANT_STYLES` is untouched.
- **How to Use strip** — "How to Use" label + Info icon `--meta-blue-deep`; numbered
  badges and the tip's lightbulb tile use the same infinity gradient; `Kbd` pills
  `--meta-tint` / `--meta-ring`. Step 1 copy "dark button" → "blue button".
- **Category chips** — active chip `--meta-blue` fill + white text (was near-black);
  idle chip hovers to `--meta-tint`.

Structure stays monochrome (`--solid-*` surfaces, borders, headings, body). Blue is
spent on focal points only, and the tokens are scoped to Facebook-facing tools — the
greyscale tools (2FA, IP, UID, Split Data) are untouched. `tsc` clean.

---

## [2026-08-10] — /tools/bookmark repainted to the site's monochrome palette

The bookmarklet library was the only tool page carrying colour: blue-tinted card
wells (`--accent` / `--accent-soft`) plus a mint-green shortcut-tip strip built
from eight flat hexes. Next to the greyscale 2FA / IP / UID / Split-Data tools it
read as a second theme.

### Changes
- **`components/tools/bookmark-card.tsx`** — contrast now comes from value, not hue:
  preview well `--solid-25` + `--solid-50` radial glow, icon tile flipped to a
  near-black `--solid-900` chip with a white icon (same value as the drag anchor
  below it), category pill `white/85` + `--solid-100` ring, version pill
  `--solid-25` / `--solid-400`, hover border `--solid-200`, focus ring and the
  "link copied" check `--solid-900`.
- **`components/tools/bookmark.tsx`** — shortcut tip separated by surface instead
  of colour: a white card on the `--solid-25` "How to Use" strip with the same
  `--solid-900` icon tile as the numbered step badges. `Kbd` pills repainted
  `--solid-25` / `--solid-700` with a `--solid-100` ring.
- **`docs/foreplay/tool-design-language.md`** — "Accent, not grey" section replaced
  with "Contrast by value, not hue" + the new treatment table.

Zero hex and zero `--accent` left in either component; the whole tool surface is
`--solid-*`. `tsc` clean (only pre-existing stale `.next/types` route errors).

---

## [2026-07-31] — Fix: bookmarklet header title rendered near-black on Facebook

### Symptom
On every tool except BM Invite, the modal's header title ("GOADS Remove BM Admins", …) came out
dark grey on the dark chrome — effectively invisible. The subtitle underneath was fine.

### Root cause
The title is an `<h2>`, and its rule only set typography — the colour came from inheriting
`color:var(--fg)` off the root. Facebook's own stylesheet has a rule for bare `h2`, and **a direct
rule always beats an inherited value**, so FB's near-black won on every one of our headings. BM Invite
escaped it purely because its `.gbmi-title` happened to carry an explicit `color:var(--fg)`.

### Fix
- Explicit `color:var(--fg)` on the title in the shared stylesheet and in Remove BM Admins.
- Plus a defensive `color:inherit` reset for `h1 h2 h3 p span div label li a` scoped under each tool's
  root, so nothing else of ours can be repainted by a bare-tag rule on the host page. Our class rules
  are more specific and still win where they apply.
- Applied to all five tools, including BM Invite, so the whole library is protected by the same rule.

### Also fixed while in here
- **Two GOADS modals could stack.** The older tools use their own root ids, so opening a new tool over
  one of them left both on screen. Every tool now sweeps all known GOADS roots on launch.
- **The Escape-handler retirement didn't work across tools.** The previous fix tracked the live handler
  in a module variable — but each payload bundles its own copy of the shared module, so Check Live's
  variable and Approve's were different variables and the stale handler survived a tool switch anyway.
  The handle now lives on `window`, which is the only thing two separately-bundled payloads share.
  (The regression test for this was timing-dependent and had been passing by luck; its stub delay was
  raised so the switch always happens mid-run.)

### Verified
- New check: each tool mounted on a page carrying Facebook-style bare-tag CSS, then the header title's
  **computed** colour read back — all 5 now resolve to our own declaration instead of FB's `#1c1e21`.
- Behaviour harness 52/52, fix regressions 5/5, old-tool regression, `tsc` clean, `next build` OK.

---

## [2026-07-31] — Three new GOADS bookmarklets + a shared shell for the library

Adds **Approve BM Requests**, **Check Live BM** and **Enable 2FA** to `/tools/bookmark`,
taking the library from 2 tools to 5. Sources supplied as partner-built obfuscated payloads
(`docs/bookmark/BM-approve.md`, `BM-checklive.md`, `BM-2fa.md`); all three were reverse-engineered
to a spec (`plans/reports/analysis-260731-1823-*.md`) and **rewritten as first-party readable code**
on a shared GOADS shell. No obfuscated third-party payload ships.

### Why a rewrite rather than a re-brand
Two of the three payloads carry a tamper kill-switch — `if (BRAND !== atob('ZWFzeW1lLnBybw==')) return`
— so patching the brand string would have made the tool **silently do nothing**. Rewriting was the
only way to get GOADS UI at all.

### Added — shared library (`bookmarklets/shared/`)
- `goads-shell.js` — the dark modal + white card stage, header/logo/close/brand strip, plus
  `esc` / `$` / `toast` / `copyText` / `downloadText` / `timeoutSignal` / `relTime` and the
  loading / error / empty screens. One shared root id, so launching a second tool replaces the first.
- `goads-shell-css.js` — the whole stylesheet, scoped under the root id, class prefix `gbk-`.
  Lifted from the design language of the first two tools and extended (tiles, progress bar,
  info/mute badges, small buttons).
- `goads-icons.js` — GOADS mark + line icons, exported one const each so a tool only carries what it imports.
- `goads-fb-session.js` — token / uid / businessId / fb_dtsg / lsd readers, `window.require` first with
  DOM + cookie fallbacks.
- `goads-totp.js` — RFC 4226/6238 TOTP (base32 → WebCrypto HMAC-SHA1 → dynamic truncation).
- `build-bookmarklets.mjs` now runs esbuild with `--bundle` so tools can import the shared modules
  while each payload stays standalone.

### Added — tools
- **Approve BM Requests** (`bm-approve`, v1.0, Business Manager) — lists PENDING requests the BM has
  RECEIVED, search + select-all, sequential bulk approve with a 500 ms gap, per-row Pending/Approving/
  Approved/Failed state. Queries: `BusinessCometBizSuiteSettingsBusinessRequestsViewContainerQuery`
  (doc_id 24355280274092427) first page, `BizKitSettingsBusinessUnifiedRequestListPaginationQuery`
  (24388768410825768) for paging, `BizKitSettingsSensitiveActionReviewDetailPanelApproveModalMutation`
  (30932400626405115) to approve.
- **Check Live BM** (`bm-checklive`, v1.0, Business Manager) — paste BM IDs (optional `|note`), chunked
  concurrent Graph checks, Live/Disabled/Error tiles, result table, copy-per-bucket in the original
  line formats, CSV export, Stop button.
- **Enable 2FA** (`bm-2fa`, v1.0, Utility) — authenticator 2FA for the signed-in account via Account
  Center. `useFXSettingsTwoFactorGenerateTOTPKeyMutation` (9837172312995248) then
  `useFXSettingsTwoFactorEnableTOTPMutation` (29164158613231327); code computed locally, one clock-resync
  retry off the `Date` header. Shows the secret with copy / save-to-file and a live code preview.

### Fixed while porting (bugs in the source payloads, not reproduced)
- Approve shipped a **hardcoded `cursor:"19"`**, so its list was an arbitrary slice, not the first page;
  `has_next_page` was computed then ignored. Now: no cursor on page 1, real `end_cursor` paging (10 pages max).
- Approve had a second, cleaner list query that was dead code (duplicate function name shadowing).
- Check Live sent `fields=%5B%22allow_page_management_in_www,name%22%5D` — a double-encoded array wrapping
  one bogus field name — and pinned the long-deprecated `v11.0`. Now a clean `fields=` list, unversioned endpoint.
- Both list/approve paths now check HTTP status and surface Facebook's real error text instead of a generic string.

### Changed deliberately
- Bulk approve and 2FA-enable now **ask for confirmation first** — both grant real, irreversible access.
  The originals fired on the first click.
- 2FA warns that the secret key is the only copy before it is generated.
- All UI in English, GOADS branding only (Telegram + goadsagency.com), matching the existing two tools.
- `require(...)` → `window.require(...)` in the two existing tools, so `--bundle` doesn't try to resolve
  Facebook's internal module names. No behaviour change.

### Verified
- `tsc --noEmit` clean · `next build` OK, `/tools/bookmark` prerendered static.
- All 5 payloads survive URL decoding and parse as JS; zero `easyme` references.
- TOTP matches all 6 RFC 6238 test vectors, including the >32-bit counter case.
- jsdom behaviour harness, 52 assertions, stubbed `fetch`/`require`, no real Facebook call:
  request de-duplication, correct `fields` param, tile counts, table rows, exact copy line formats;
  approve pagination with the real cursor, mutation payloads, approved rows dropping out and a
  rejected one staying Failed; 2FA doc_ids/variables/6-digit code/secret display; and guard rails —
  no request before the user clicks, declining the confirm fires nothing, wrong host and missing
  session produce the right screens.
- Regression: both pre-existing tools still mount cleanly after the `--bundle` switch.

### Found in code review, fixed before shipping
- **Cross-tool DOM bleed (the serious one).** All five tools share element ids by design — only one
  modal is ever mounted. But an *async continuation* from tool A could still land after the user
  launched tool B: `$("gbk-tablewrap")` then happily resolved to **tool B's** node, so an in-flight
  Check Live run would scribble its rows into the Approve tool's UI (or crash on an id tool B lacks).
  `openShell()` now returns an `alive()` based on `root.isConnected`, and every tool guards its
  renders with it — checking our own root, not an id, is what makes it correct. The same guard covers
  the user force-closing mid-run.
- **Stale Escape handler.** `openShell()` removed the previous modal's DOM but never its `keydown`
  listener, so handlers accumulated across tool switches and a later Escape could pop an orphaned
  "still running, close anyway?" confirm from a tool that was no longer on screen. The live handler is
  now tracked and retired on both mount and close.
- **CSV formula injection.** Check Live's export wrote FB-controlled BM names straight into cells, so a
  BM named `=HYPERLINK(...)` would execute on open in Excel/Sheets. Cells starting with `= + - @` are
  now prefixed with `'`.
- Reviewed clean: no XSS (every FB-derived value reaches `innerHTML` through `esc()`), no stale-closure
  or index-capture races in the chunked/sequential loops, no double-click re-entrancy, both destructive
  actions properly confirm-gated.

Each fix has its own regression test (orphaned-confirm count after a tool switch, CSV cell contents
captured via a Blob stub, force-close mid-run with no write into a dead DOM).

### Known risks
- The five `doc_id`s are Facebook persisted-query ids and will rot when FB rotates them; the failure
  shows up as "couldn't load" / "wouldn't turn 2FA on". Re-capture from a live session when that happens.
- Check Live at high concurrency can trip Facebook rate limits; throttled responses land in the Error bucket.
- None of the three has been run against a live Facebook session yet — only the stubbed harness.

---

## [2026-07-31] — Fix: Remove BM Admins bookmarklet did nothing when clicked

### Symptom
Dragging `Remove BM Admins` to the bookmarks bar and clicking it on a Business
Manager page opened no UI at all — no modal, no error. BM Invite worked fine.

### Root cause
The browser percent-**decodes** a `javascript:` URL before executing it. The
remove-admins source embeds Facebook's GraphQL variables pre-encoded
(`variables=%7B%22asset_types%22%3Anull…`, 68 valid `%XX` sequences). On click
those decoded back into raw `{`, `"`, `:`, `,` **inside the string literals**,
producing `SyntaxError: Unexpected identifier 'cursor'` — the script died before
its first statement, so nothing rendered. BM Invite escaped this only by luck:
its 9 `%` chars (CSS `100%`) are never followed by two hex digits.

### Fix
- `build-bookmarklets.mjs` now escapes `%` → `%25` in the payload, so decoding
  returns the script byte-for-byte, plus a build-time assertion
  (`decodeURIComponent(payload) === minified`) that fails the build for any
  future tool with the same hazard. Other URL-sensitive chars (`#`, `&`, `?`,
  spaces, quotes) survive decoding untouched and are left alone.
- Both payloads regenerated: invite 19.0 KB, remove-admins 22.4 KB.

### Verified
- Emulated the browser's lenient decode on the pre-fix payload → reproduced
  `SyntaxError: Unexpected identifier 'cursor'`; same emulation on the new
  payload parses clean. Both payloads: decode → `new Function(src)` OK.
- `tsc --noEmit` clean.

---

## [2026-07-30] — Remove BM Admins rebuilt as GOADS-owned code

### Why
Same as the BM Invite rebuild: the shipped `bm-remove-admins` payload was the
third-party obfuscated `easyme.pro` tool. Replaced with a first-party build so
the whole GOADS Bookmark library is GOADS-owned.

### Added
- **`bookmarklets/goads-bm-remove-admins.js`** — readable, first-party tool matching the invite tool's design language (dark shell + white B/W card, inline GOADS logo, green/amber status badges, red destructive action). Lists BM admins in a searchable/filterable table with per-row checkboxes and bulk removal.
- Registered a second build job in `build-bookmarklets.mjs`; `bm-remove-admins-payload.ts` regenerated from the GOADS source. Registry entry → **v1.0**, GOADS description.

### Network layer (faithfully reproduced from Facebook's own internal GraphQL)
Persisted-query `doc_id`s + variable blobs are facts of FB's Business-settings API, not third-party IP. All GET with `credentials:"include"` (runs on the user's own session); session read via `require("BusinessUnifiedNavigationContext").businessID` + `require("WebApiApplication").getAccessToken()`, DOM/cookie fallback.
- list: `BizKitSettingsPeopleTableListPaginationQuery` doc_id 9371006629693295 (paginated, 25/page ×4)
- remove confirmed user: `BizKitSettingsRemoveBusinessUserMutation` doc_id 24401670346098526
- remove pending invite: `BizKitSettingsRemovePendingUserMutation` doc_id 6587364614658388
- Dispatch by status: PENDING → pending mutation (businessRoleRequestID); CONFIRMED → user mutation (businessID + businessUserID). The current viewer's row is detected and its checkbox disabled (can't accidentally remove yourself).

### Verified
- `tsc` clean · `next build` OK, `/tools/bookmark` prerendered static · payload has zero `easyme` references.
- Behaviour harness (stubbed `fetch`/`require`, faked FB page — no real Facebook call): session detect, table renders 3 seeded admins (you + confirmed + pending) with correct green/amber badges, viewer row checkbox disabled, Select-all skips the disabled row (picks 2), bulk Remove dispatches user-222 via RemoveBusinessUser and req-333 via RemovePendingUser, count updates 3 → 1, 0 console errors.
- Live `/tools/bookmark`: both drag anchors now carry GOADS payloads (goadsagency.com + t.me/goadsagency, no easyme).

---

## [2026-07-30] — BM Invite bookmarklet rebuilt as GOADS-owned code

### Why
The shipped `bm-invite` payload was a third-party obfuscated tool (`easyme.pro`)
with a hard brand-lock (`if (CONFIG.BRAND !== atob("ZWFzeW1lLnBybw==")) return`)
where `CONFIG.BRAND` doubled as the temp-mail domain — so rebranding it to GOADS
meant defeating the author's tamper check. Replaced it wholesale with a
first-party build instead.

### Added
- **`bookmarklets/goads-bm-invite.js`** — readable, first-party BM Invite tool. Logic ported verbatim from **this repo's own extension**: session/token/bmId extraction from `extension/background.js` `initFromBMTab` (its `world:"MAIN"` injected fn — a bookmarklet already runs in that world), invite request + Facebook response handling (reauth / checkpoint / batch-error) from `inviteBM`, role sets + mail domain + tempmail deep-link from `content.js`. UI reuses the extension's design language (dark shell `#020308` + white B/W cards) from `content.css`.
- **`bookmarklets/build-bookmarklets.mjs`** — minifies the readable source into the one-line `javascript:` payload via the app's existing esbuild (invoked as `node esbuild/bin/esbuild`, not the `.cmd` shim which can't spawn without a shell on Windows). Source 27.4 KB → payload 18.8 KB.
- **GOADS logo as inline SVG** inside the tool — cropped G+panda mark from `footer/logo-svg.tsx`. Inline (not `<img>`) so facebook.com's CSP `img-src` can't block it.

### Changed
- `bm-invite-payload.ts` regenerated from the GOADS source (was the easyme payload). `bm-invite` registry entry → **v1.0**, GOADS-owned description.
- Brand throughout the tool: email `@goadsagency.com`, inbox button → `https://goadsagency.com/tempmail` (deep-links `#mailbox=<localpart>` for GOADS addresses), Telegram → `https://t.me/goadsagency`, website `goadsagency.com`. Confirmed live: the tempmail worker returns `"domains":["goadsagency.com"]`, so generated addresses actually receive mail.

### Verified
- `tsc` clean · `next build` OK, `/tools/bookmark` prerendered static · payload contains zero `easyme` references.
- Behaviour harness (stubbed `fetch`, faked FB page — no real Facebook call): session detection (token Valid, bmId shown), Generate email → `<10 rand>@goadsagency.com`, role default Admin, Send → single POST to `graph.facebook.com/v24.0` with `access_token`, bmId in body, `credentials:"include"`; success banner renders; 0 console errors.
- Live `/tools/bookmark`: BM Invite drag anchor carries the 19 KB GOADS `javascript:` payload (goadsagency.com + t.me/goadsagency, no easyme); Remove BM Admins left untouched per scope.

### Not done (out of scope, by request)
- **Remove BM Admins** still runs the original easyme payload — user asked to do BM Invite first.

---

## [2026-07-30] — GOADS Bookmark (bookmarklet library) at /tools/bookmark

### Added
- **New tool page `/tools/bookmark`** — bookmarklet script library. Sections: "How to Use" (3 steps + Bookmark-Bar shortcut tip) → category chips → card grid. Reuses `ToolShell`/`ToolHeader`/`ToolBody`, `siteText.*`, `--solid-*` tokens. Statically prerendered. — `app/(marketing)/tools/(panel)/bookmark/page.tsx`, `components/tools/bookmark.tsx`, `components/tools/bookmark-card.tsx`
- **Card accent treatment** — the flat `--solid-25` well with a muted `--solid-400` icon read as washed out, so focal points use the brand accent `--accent` (#1c9cf0) / `--accent-soft` (12%) that `globals.css` reserves for this purpose: accent-wash preview well + radial glow, white icon tile (lifts + scales on hover), accent category and version pills, accent hover border with a soft blue shadow. Body copy, borders and the primary button stay monochrome.
- **Category chips auto-hide** while only one category is in use — with a single category every chip returns the same grid, so the row is skipped and reappears on its own once a second category exists.
- **Bookmarklet registry** (`data/bookmarklets/index.ts`) — metadata (slug, title, version, description, icon, category) + payload wiring. Adding a script = 1 payload module + 1 array entry; search, chips and share links derive from it. Ships with **BM Invite TOOL v2.7** and **Remove BM Admins v1.1**.
- **Payload modules** — `bm-invite-payload.ts` (32,663 chars) / `bm-remove-admins-payload.ts` (37,753 chars), generated verbatim from `docs/BM-invite.md` / `docs/BM-remove.md`. One module per script so payloads stay independent of the registry metadata; the combined 92 KB chunk is loaded **only** by `/tools/bookmark`.
- **`BookmarkletDragAnchor` atom** — drag-to-Bookmark-Bar anchor. React 19 **blocks `javascript:` URLs in `href`**, so the attribute is set imperatively in an effect; clicks are swallowed (a `javascript:` href fired on our own origin would run the payload against goads.* instead of Facebook) and replaced with an inline "drag me instead" hint. Paint reuses `CTA_VARIANT_STYLES["light-primary"]`. — `components/atoms/bookmarklet-drag-anchor.tsx`
- **Per-card actions** — drag anchor + Copy share link (`?script={slug}`), both sitting above the card's overlay link.
- **Card → detail view** — the whole card is clickable (`cursor-pointer`) and opens `?script={slug}`. Implemented as an **overlay `<a>`** covering the card at `z-10`, a *sibling* of the drag anchor (nested `<a>` is invalid HTML), with the actions row raised to `z-20` so the drag anchor and share button stay usable. Plain left-click is intercepted for a client-side open; Cmd/Ctrl/Shift/middle-click fall through to native new-tab behaviour, and the overlay is Tab-focusable with an accent focus ring.
- **Deep links** — `?script={slug}` renders a "Viewing {title}" banner with a single card and an "All scripts" back action. The URL is the **single source of truth** (no mirrored local state): read via `useSyncExternalStore` (not `useSearchParams`, which would force the whole tool behind a Suspense boundary and lose static prerendering), with the `null` server snapshot keeping first client render identical to server HTML. Because `pushState` fires no native event, `navigate()` dispatches a `goads:bookmark-nav` event that the store also subscribes to alongside `popstate`. The card already on its own detail view gets no link.
- **Registered in the tools sidebar** under **Utilities** (last item, after GOADS Extension). Also added to the `/tools` landing grid, header Tools mega-menu ("More" row) and footer Tools column.

### Changed
- `CtaButton` — `variantStyles` exported as `CTA_VARIANT_STYLES` so non-`<Link>` anchors can reuse variant paint instead of duplicating it. No behaviour change.
- `LightGhostAction` — additive `hideLabel` prop for icon-only square buttons (label kept as `aria-label` + `sr-only`). Used by the card's Copy/Share actions.

### Verified
- `tsc --noEmit` clean · eslint clean on all new/changed files · `next build` OK, `/tools/bookmark` prerendered static.
- Browser: both anchors carry full `javascript:` hrefs (32,663 / 37,753 chars, `draggable=true`); search filter, no-match empty state, clear button, category chips, copy-code (payload verified), copy-share-link, and "View all scripts" (param stripped from URL) all exercised end-to-end.
- Zero console errors and **no hydration warnings** on `/tools/bookmark` and `?script=bm-invite`.
- Viewports 390/768/1024/1440 — no horizontal body overflow; cards 1-up at 390, 2-up ≥768, 3-up at `xl`.

### Known (pre-existing, out of scope)
- Site **footer product strip** (`footer-product-nav.tsx`) overflows its container at 768–1024px (last 2 items extend past the viewport edge). Present on every page, unrelated to this change; body itself does not scroll sideways.

---

## [2026-06-01] — Responsive audit (Foreplay parity)

### Fixed
- **Navbar dead zone (P0)**: 768–1023px showed no navigation (hamburger `<768`, desktop nav `≥1024`). Unified switch at **992px** (`min-[992px]`), matching Foreplay's `@media (max-width:991px)`. — `header.tsx`, `header-mobile-menu.tsx`
- **Mobile drawer light-leak**: Radix Sheet portals outside `.site` dark scope → rendered white. Added `site` class to SheetContent so dark tokens resolve. — `header-mobile-menu.tsx`
- **Drawer parity**: added missing Tools accordion, z-[120] over sticky header, built-in X close, prominent Start-free-trial CTA, KPI trust strip. — `header-mobile-menu.tsx`
- **Section padding**: fixed `px-10` → responsive `px-6 md:px-8 min-[992px]:px-10` (24→32→40), matching Foreplay `.container` cascade. — `section-container.tsx`
- **Cart tab mobile**: hide closed pill `max-[991px]` when cart empty (no longer overlaps hero). — `cart-popover.tsx`
- **Support card overflow**: width `min(360px,100vw-2.5rem)` so it fits at 375px. — `action-plan-card.tsx`
- **Display headings not responsive (D6)**: h1/h2 were hardcoded desktop sizes (oversized on mobile — wrapped, so probes didn't flag). Added Foreplay's per-breakpoint cascade — H1: 38/52/60px (≤479/≤767/≥768), H2: 36/40/44px (≤479/≤991/≥992). Site-wide via `typography.ts` (used by all `SectionHeader`s + page heroes). — `typography.ts`, `home/hero-content.tsx`

### Verified
- 28 routes × {375,768} = 56 overflow probes → **0 horizontal overflow, all 200**.
- Home, 7 product, 9 conversion/info, blog (2), legal (3), tools (6) — responsive-clean, no code changes needed.

### Docs
- `design-guidelines.md` §12 Navigation → breakpoint corrected to 992 (was stale 1440).

### Deferred
- `/free-action-plan` — unfinished page (404/placeholder), build issue not responsive; owner: user.

---

## [2026-03-19] — Phase 6 Community Foundation (DB + API)

### Added
- **Community DB schema** — 7 new tables: `community_category`, `community_post`, `community_reply`, `community_upvote`, `community_report`, `community_view`, `community_subscription`
- **2 new enums**: `community_post_status` (8 values: open/solved/closed/in_review/planned/in_progress/completed/rejected), `community_report_reason` (spam/inappropriate/offtopic/other)
- **Extended `notification_type`** with `community_reply` + `community_solution`
- **9 query functions** (`community-queries.ts`): getCategories, getPosts (paginated), getPostBySlug, getPostsByAuthor, getMostHelpful (leaderboard), getPostStats, getReports, searchPosts
- **12 server actions** (`community-actions.ts` + `community-admin-actions.ts`): createPost, updatePost, deletePost, createReply, markSolution, toggleUpvote, toggleSubscription, recordView, reportContent, reviewReport, togglePin, updatePostStatus
- **8 default categories seeded**: Announcements, Q&A, Tips & Strategies, Showcase, Feedback, Troubleshooting, General, Introductions
- **Auto-subscribe**: post authors + repliers auto-subscribed for notifications
- **Notification integration**: subscribers notified on new replies, reply authors notified on solution mark

### Design Decisions
- Foreplay FeatureBase style: upvote-only (no downvotes), status badges, post card with vote count
- Vercel Community style: flat replies (no nesting), open/solved/closed lifecycle, minimal layout
- Denormalized counts (upvotesCount, repliesCount, viewsCount) for performance
- Separate admin actions file to keep files under 200 LOC

---

## [2026-03-11] — WT2 Dark Mode + Lighthouse Audit Complete

### Completed
- **WT2 Dark Mode Audit** (`phase-1a/dark` branch)
  - All hardcoded colors replaced with CSS variable tokens
  - Canvas components (particles, ripple) made theme-aware
  - External SVG images fixed with `unoptimized` prop in Next.js Image
  - CTA section dark mode text visibility corrected
  - 18 files modified across 5 implementation phases

- **Lighthouse Audit**
  - Accessibility: 100
  - Best Practices: 96-100
  - SEO: 100

- **ARIA Accessibility Fixes**
  - Rating component accessibility improved
  - Skip-to-content navigation added
  - Logo aria-label added
  - `prefers-reduced-motion` media query support added

---

## [Unreleased] — Phase 1 MVP Complete

### Added
- Landing page with hero, bento grids, stats, pricing, testimonials, FAQ, CTA
- 9 product pages (BM, profiles, pages, TikTok, Google, blue verification, unban, agency accounts)
- Pricing page with catalog grid + FAQ
- Blog system with 5 posts, category sidebar, TOC
- 20+ utility tools (2FA, cookie parser, IP checker, data filter, watermark, etc.)
- Docs section with Fumadocs-style shell (UI only)
- About page with team section
- Resources pages: reviews, partners, milestones, help, payment, talk-to-sales
- Legal pages: Terms of Service, Privacy Policy, Refund Policy
- Dark mode with neutral grayscale palette (oklch, 0 chroma)
- 4-tier button hierarchy (CraftButton CTA, secondary, tertiary, tertiary-sweep)
- Grid frame layout system (vertical borders + corner dots)
- SectionHeader + SectionDivider + PageHero shared components
- MotionPreset animation system (Framer Motion v12 wrapper)
- Global search modal (cmd+K) with cmdk
- Cart system (React Context, UI only — no payment integration)
- Floating contact button (Telegram)
- ScrollToTop component
- SEO: robots.ts, sitemap.ts, OG metadata
- Vercel Analytics + Speed Insights integration
- React Compiler enabled for auto-memoization

### Refactored
- Split 3 large components into sub-modules (Plan 10)
- Added accessibility aria-labels and prefers-reduced-motion support (Plan 9)
- Replaced hardcoded colors with semantic CSS tokens (Plan 8)
- DRY marketing pages — CTA to layout + product page template (Plan 7)
- Removed unnecessary `use client` directives + fixed simpleicons remotePattern (Plan 6)

### Architecture Decisions
- Tailwind CSS v4 with oklch color tokens (over v3 hex)
- shadcn/ui + shadcn-studio blocks (over custom components)
- Static generation (over SSR) — no runtime server needed
- Single `globals.css` for all tokens (over component-scoped CSS)
- Data layer in `src/data/*.ts` (over CMS or API) for Phase 1

---

## Versioning

This project does not use semantic versioning yet. Changes tracked by development phase and plan number. Will adopt semver when Phase 2 (customer portal) begins.
