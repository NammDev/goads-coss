# Portal Tools Integration

> Task #13 from WT-B (portal-catalog-profile)

## Status: Planning

## Overview

Bring all 20 marketing tools into portal dashboard. Reuse existing tool content components via React context to switch between marketing shell (with ToolsSidebar) and portal shell (dashboard sidebar handles nav). Portal sidebar gets "Tools" group with 3 category collapsibles.

## Phases

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Context provider + shell adaptation | ⏳ |
| 2 | Portal tool pages (20 thin wrappers) | ⏳ |
| 3 | Sidebar nav with categories | ⏳ |
| 4 | Extensions page migration | ⏳ |

## Architecture

```
Marketing:  /tools/2fa → ToolPageShell(marketing) → ToolsSidebar + content
Portal:     /portal/tools/2fa → ToolPageShell(portal) → content only (no sidebar)

Context flow:
  portal/tools/layout.tsx
    └─ <ToolContext.Provider value="portal">
         └─ TwoFaContent
              └─ <ToolPageShell>  ← checks context, skips sidebar
                   └─ <ToolsSidebarMobile>  ← checks context, renders nothing
```

## Key Decisions

- **Option A (Context-based shell)**: Minimal changes to existing code, max reuse
- **Sidebar S1 variant**: Tools as NavGroup with 3 category collapsibles (Security, Data Processing, Utilities) + Extensions
- **Existing BM extension page**: Moves to `/portal/tools/extensions`
