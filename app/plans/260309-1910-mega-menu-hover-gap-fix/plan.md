---
title: "Fix mega menu hover gap dead zone"
description: "Definitive fix for dropdown closing when mouse crosses the 8px gap between header and NavigationMenu viewport"
status: pending
priority: P1
effort: 1.5h
branch: feat/search-cart
tags: [bugfix, navigation, radix, ux]
created: 2026-03-09
---

# Mega Menu Hover Gap Fix

## Phases

| # | Phase | Status | Est |
|---|-------|--------|-----|
| 1 | [Controlled mode + pointer interception](#phase-1) | pending | 1h |
| 2 | [Fallback: CSS-only pseudo-element bridge](#fallback) | pending | 30m |

## Root Cause Analysis

See [phase-01-controlled-hover-fix.md](./phase-01-controlled-hover-fix.md) for full analysis with Radix source evidence.

**TL;DR:** Radix NavigationMenu uses a 150ms timer-based close mechanism (NOT safe-triangle). When pointer leaves trigger, `startCloseTimer()` fires. If pointer enters Content/Viewport within 150ms, timer is cancelled. The bridge div is a **non-Radix element** -- entering it does NOT cancel the close timer. Timer expires mid-gap, menu closes.

## Recommended Fix

**Controlled mode** (`value`/`onValueChange`) + `::before` pseudo-element bridge (defense-in-depth). We take ownership of open/close state, intercept pointer events on the viewport wrapper, and manage our own close delay.

## Files to Modify

- `src/components/ui/navigation-menu.tsx` -- Add wrapper pointer event props + `::before` pseudo
- `src/components/nav-mega-menu.tsx` -- Switch to controlled mode with custom close timer

## Dependencies

- `radix-ui` NavigationMenu (already installed)
- No new packages needed
