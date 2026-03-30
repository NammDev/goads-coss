# Foreplay Redesign — Changelog

> Ghi lại tất cả thay đổi đã làm. Dùng khi merge sang production để không thiếu sót.

## Files Changed

### New Files Created
- `docs/foreplay/design-reference.md` — Design spec (colors, fonts, layout, components)
- `docs/foreplay/phase-1-build-new-website.md` — Phase 1 overview + 10 code quality rules
- `docs/foreplay/phase-2-merge-go-live.md` — Phase 2 merge plan + rollback
- `docs/foreplay/changelog.md` — File này
- `~/.claude/skills/clone-foreplay/SKILL.md` — Skill clone UI từ screenshot
- `~/.claude/projects/.../memory/foreplay-redesign-rules.md` — Memory rules
- `~/.claude/projects/.../memory/feedback-no-messy-clone-code.md` — Memory feedback

### Modified Files
| File | What Changed |
|------|-------------|
| `app/src/fonts/index.ts` | Added `fontInter` export (Inter via next/font/google) |
| `app/src/app/globals.css` | Added `.foreplay` CSS scope with dark theme tokens; Added `--font-display` to `@theme inline` |
| `app/src/app/(foreplay)/layout.tsx` | Updated: apply `.foreplay` class + `fontInter.variable` + `bg-background text-foreground` |
| `app/next.config.ts` | Fixed Turbopack panic: `turbopack.root` → `import.meta.dirname` |

### Route Changes
| Before | After | Why |
|--------|-------|-----|
| `app/src/app/foreplay/` | `app/src/app/(foreplay)/` | Changed to route group — no `/foreplay` URL prefix |

### Plan Files Created
```
plans/260329-1810-foreplay-ui-redesign/
├── plan.md
├── phase-01-foundation.md
├── phase-02-home-page.md
├── phase-03-core-pages.md
├── phase-04-content-pages.md
├── phase-05-legal-utility-pages.md
└── phase-06-migration.md
```

## CSS Token Mapping (.foreplay scope)

Foreplay overrides these shadcn tokens inside `.foreplay` wrapper:

| Token | GoAds Current | Foreplay Override |
|-------|--------------|-------------------|
| `--background` | `#ffffff` | `#000000` |
| `--foreground` | `#0f1419` | `#ffffff` |
| `--primary` | `#1e9df1` | `#ffffff` |
| `--primary-foreground` | `#ffffff` | `#000000` |
| `--secondary` | `#0f1419` | `#27272a` |
| `--secondary-foreground` | `#ffffff` | `#ffffff` |
| `--muted` | `#E5E5E6` | `#18181b` |
| `--muted-foreground` | `#536471` | `#a1a1aa` |
| `--accent` | `#E3ECF6` | `#27272a` |
| `--accent-foreground` | `#1e9df1` | `#ffffff` |
| `--card` | `#f7f8f8` | `#18181b` |
| `--border` | `#cfd9de` | `#3f3f46` |
| `--input` | `#cfd9de` | `#3f3f46` |
| `--ring` | `#1da1f2` | `#ffffff` |
| `--font-sans` | Geist | Inter |
| `--font-display` | (none) | Inter |

## Font Changes

| Before | After |
|--------|-------|
| Geist Sans (headings + body) | Inter (headings + body) |
| JetBrains Mono (code) | JetBrains Mono (code) — unchanged |

Font loaded via `next/font/google` in `fonts/index.ts`, applied via CSS variable `--font-inter` in foreplay layout.

## Merge Checklist (Phase 2)

When ready to merge, these steps MUST be done:

- [ ] Rename `(foreplay)` → `(marketing)`
- [ ] Rename `(marketing)` → `(marketing-legacy)` (backup)
- [ ] Promote `.foreplay` CSS tokens to `:root` in globals.css
- [ ] Remove `.foreplay` scope wrapper
- [ ] Update root `layout.tsx` to use Inter instead of Geist for marketing
- [ ] Keep Geist for admin/portal routes
- [ ] Verify all marketing URLs still work
- [ ] Verify Clerk auth still works
- [ ] Verify admin/portal pages unaffected
- [ ] Delete `(marketing-legacy)` after 1 sprint
- [ ] Update docs: design-guidelines.md, component-catalog.md, color-system.md
- [ ] Clean up unused old marketing components from `components/shadcn-studio/blocks/`
