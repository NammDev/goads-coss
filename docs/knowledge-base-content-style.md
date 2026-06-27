# Knowledge Base Content Style Guide

Conventions for writing GOADS docs articles in `app/src/content/docs/<slug>/index.mdoc`.
Reference article: `welcome/index.mdoc`.

## Frontmatter

```yaml
---
title: <Article title>
navSlug: <tab-slug>/<article-slug>     # must match docs-navigation.ts
description: <one sentence>             # renders as subtitle under the title
lastUpdated: <Month DD, YYYY>          # e.g. June 27, 2026
tab: <tab-slug>                        # getting-started | asset-overview | setup-configuration | security-best-practices | goads-tools
---
```

Always fill `description` and `lastUpdated`. Empty `description` leaves no subtitle.

## Section headings

- Use `###` for every section. Headings auto-generate an anchor and appear in the right-side "On this page" TOC (depth h2/h3 only).
- One idea per heading. Keep opening prose to short paragraphs (1 idea each), not walls of text.

## Lists (the packaged pattern)

Convert dense prose into ordered lists so readers scan top to bottom.

1. **Label lists** (item has a name + explanation) → numbered list with a bold lead-in label:
   ```
   1. **Getting Started:** Learn what GOADS assets are...
   2. **Asset Overview:** Detailed explanations of each asset type...
   ```
2. **Feature / benefit lists** (plain statements) → also numbered:
   ```
   1. Over 6 years of deep expertise in Meta Assets...
   2. Premium aged assets with proven stability...
   ```

Numbered is the default for ordered, sequential, or rankable content. A `-` bullet is an acceptable alternative when order genuinely does not matter. Markers and item spacing are styled in `globals.css` under `.installation-content ul/ol`.

## Callouts

`{% callout variant="info|tip|warning" title="..." %}` ... `{% /callout %}`

- `tip` (green): getting-started nudges, e.g. "New to GOADS?"
- `warning` (red): caveats / limits, e.g. "Important Notes" on warranty exclusions
- `info` (blue): helpful asides, e.g. "Get faster support"

Multiple paragraphs inside a callout are supported (separate with a blank line).

## Support channels

`{% channels /%}` renders the colored brand-icon channel list (Telegram, Website, Discord, X). Data lives in `app/src/components/docs-support-channels.tsx`, so edit channel info there, not in the article.

## Writing rules

- Brand name **GOADS** in uppercase. Keep domains, handles, and code lowercase (goadsagency.com, @goads_official).
- No em-dash (—). Use a comma + space instead.
- Internal links only to slugs that exist in `docs-navigation.ts`.
- Match Foreplay help-center tone: clear, practical, confident.

## Unified theme (apply to every article)

One voice, one structure, so all routes feel like one product.

1. **Voice:** professional, confident, second-person ("you"), benefit-led, concise.
2. **Shape:** short hook intro → `###` sections → numbered lists for steps/items → tables for comparisons → callouts for highlights.
3. **Callouts are the signature element.** Use them consistently:
   - `tip` = recommendation / where to begin / pro tip
   - `info` = helpful aside / cross-reference / "want the full picture"
   - `warning` = caution / what is not covered / risk
4. **Close with connection.** End most articles with a callout that links to 1-2 related routes plus support, so routes cross-reference each other (e.g. a Questions Bank answer links to its Asset Overview page and vice versa).
5. **Icons = brand logos only, no decorative emoji.** Use a real logo (`/assets/icons/*.svg`) only when an entire article or step is about that external product, and apply it consistently within that article (e.g. Hotmail Login uses the Outlook logo on every step; the extension article uses the Chrome logo). Generic process headings stay plain. See [[goads-docs-brand-icons]].
6. **Questions Bank** keeps its distinct FAQ treatment: each question is an `###` heading and gets the auto "Q" badge via the `.qa-content` scope.
