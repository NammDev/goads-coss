# Phase 1: Navigation & Layout Data

## Context Links
- [plan.md](./plan.md)
- Source: `src/components/nav-mega-menu-data.tsx` (287 lines - exceeds 200 limit)
- Source: `src/components/nav-mobile-drawer.tsx` (lines 38-68)
- Source: `src/components/site-header.tsx` (lines 10-13)
- Source: `src/components/shadcn-studio/blocks/footer-component-02/footer-component-02.tsx`

## Overview
- **Priority:** P1 (blocks Phase 2 - footer/header share social links)
- **Status:** pending
- Split `nav-mega-menu-data.tsx` (287 lines) into 3 files under `src/data/`
- Extract nav links from `nav-mobile-drawer.tsx` and social links from `site-header.tsx`
- Extract footer links/social data from `footer-component-02.tsx`

## New Data Files

### 1. `src/data/nav-mega-menu-products.ts` (~90 lines)

Extract from `src/components/nav-mega-menu-data.tsx`:
- `AGENCY_ACCOUNTS` array (lines 14-51)
- `META_ASSETS` array (lines 53-82)
- `TIKTOK_ASSETS` array (lines 84-109)
- `SETUP_SERVICES` array (lines 111-144)

Types to export:
```ts
export interface NavMenuItem {
  icon: ComponentType
  title: string
  description: string
  href: string
}
```

### 2. `src/data/nav-mega-menu-resources.ts` (~80 lines)

Extract from `src/components/nav-mega-menu-data.tsx`:
- `RESOURCES_COMPANY` array (lines 148-175)
- `RESOURCES_LEARN` array (lines 177-204)
- `RESOURCES_SUPPORT` array (lines 206-237)

Uses same `NavMenuItem` type - import from `nav-mega-menu-products.ts`.

### 3. `src/data/nav-mega-menu-tools.ts` (~70 lines)

Extract from `src/components/nav-mega-menu-data.tsx`:
- `TOOLS_EXTENSIONS` array (lines 241-264)
- `TOOLS_UTILITIES` array (lines 266-281)
- `TOOLS_PARTNERS` array (lines 283-287 - partial, verify exact lines)

Uses same `NavMenuItem` type - import from `nav-mega-menu-products.ts`.

### 4. `src/data/nav-links.ts` (~80 lines)

Extract from `src/components/nav-mobile-drawer.tsx` (lines 38-68):
```ts
export interface NavLink { label: string; href: string }
export interface ProductLink { icon: ComponentType; title: string; href: string }
export interface ResourceLink { icon: ComponentType; label: string; href: string; external?: boolean }

export const NAV_LINKS: NavLink[]
export const PRODUCTS_BY_PLATFORM: ProductLink[]
export const PRODUCTS_BY_NEED: ProductLink[]
export const RESOURCES: ResourceLink[]
```

Extract from `src/components/site-header.tsx` (lines 10-13):
```ts
export interface SocialLink { href: string; icon: ComponentType; label: string }
export const SOCIAL_LINKS: SocialLink[]
```

### 5. `src/data/landing-footer.ts` (~60 lines)

Extract from `src/components/shadcn-studio/blocks/footer-component-02/footer-component-02.tsx`:
```ts
export interface FooterLink { label: string; href: string }
export interface FooterSection { title: string; links: FooterLink[] }
export interface FooterSocialLink { href: string; icon: ComponentType; label: string }

export const FOOTER_SECTIONS: FooterSection[]  // Company + Support sections
export const FOOTER_SOCIAL_LINKS: FooterSocialLink[]  // Telegram, Twitter, YouTube, Discord
export const FOOTER_NEWSLETTER_TEXT: string
```

## Component Files to Modify

| File | Action |
|------|--------|
| `src/components/nav-mega-menu-data.tsx` | DELETE after migration |
| `src/components/nav-mega-menu.tsx` | Update imports to `@/data/nav-mega-menu-*` |
| `src/components/nav-mobile-drawer.tsx` | Remove lines 38-68, import from `@/data/nav-links` |
| `src/components/site-header.tsx` | Remove lines 10-13, import `SOCIAL_LINKS` from `@/data/nav-links` |
| `src/components/shadcn-studio/blocks/footer-component-02/footer-component-02.tsx` | Remove inline link data, import from `@/data/landing-footer`, map over arrays |

## Implementation Steps

1. Create `src/data/nav-mega-menu-products.ts` with `NavMenuItem` type + 4 product arrays
2. Create `src/data/nav-mega-menu-resources.ts` importing `NavMenuItem`, add 3 resource arrays
3. Create `src/data/nav-mega-menu-tools.ts` importing `NavMenuItem`, add 3 tool arrays
4. Update `src/components/nav-mega-menu.tsx` imports from `@/data/nav-mega-menu-*`
5. Delete `src/components/nav-mega-menu-data.tsx`
6. Create `src/data/nav-links.ts` with nav links + social links
7. Update `src/components/nav-mobile-drawer.tsx` - remove inline data, import from `@/data/nav-links`
8. Update `src/components/site-header.tsx` - remove `SOCIAL_LINKS`, import from `@/data/nav-links`
9. Create `src/data/landing-footer.ts` with footer sections + social links
10. Update `footer-component-02.tsx` - remove inline links, import from `@/data/landing-footer`, refactor JSX to map over data

## Todo List

- [ ] Create `nav-mega-menu-products.ts`
- [ ] Create `nav-mega-menu-resources.ts`
- [ ] Create `nav-mega-menu-tools.ts`
- [ ] Update `nav-mega-menu.tsx` imports
- [ ] Delete `nav-mega-menu-data.tsx`
- [ ] Create `nav-links.ts`
- [ ] Update `nav-mobile-drawer.tsx`
- [ ] Update `site-header.tsx`
- [ ] Create `landing-footer.ts`
- [ ] Update `footer-component-02.tsx`
- [ ] Compile check

## Success Criteria
- All 5 new data files created, each <200 lines
- `nav-mega-menu-data.tsx` deleted
- All nav/footer components render identically
- No TypeScript compile errors

## Risk Assessment
- `nav-mega-menu.tsx` imports may use barrel re-exports - verify import paths match
- Footer social links may overlap with `SOCIAL_LINKS` in site-header - consider sharing from one source (`nav-links.ts`) or keeping separate if different icons/URLs
