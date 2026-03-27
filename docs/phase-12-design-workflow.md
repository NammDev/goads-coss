# Phase 12: Design Workflow Foundation

> Preparation notes for Phase 12 — design-to-code pipeline using Figma MCP + Claude Code.

## Related Context

- [GoAds Business Context](./goads-business-context.md) — portable business/brand reference for design work
- [Branding Kit Screenshots](./design/) — visual brand guidelines (logo, colors, typography, patterns)

## Design Workflow

```
Nam + Claude Code → code pixel-perfect component (foreplay reference)
        ↓
Figma MCP (generate_figma_design) → push HTML to Figma canvas as editable layers
        ↓
Trang → fine-tune layout/spacing + create illustrations/visual assets
        ↓
Figma MCP (get_design_context) → Claude Code reads back if sync needed
```

### Role Split

| Who | Responsibility |
|-----|---------------|
| **Nam + Claude Code** | Structure, layout, interactions, code components — pixel-perfect from foreplay |
| **Trang** | Visual assets, illustrations, brand polish, fine-tuning on Figma canvas |
| **Claude Code** | Engine: generate components + bridge code ↔ Figma via MCP |

## Figma MCP Server (Official)

- URL: `https://mcp.figma.com/mcp` (HTTP transport)
- **Read + Write** canvas — free during beta (will become usage-based paid)
- Key tools:
  - `generate_figma_design` — HTML/website → Figma layers
  - `use_figma` — create/edit design on canvas using design system
  - `get_design_context` — extract design info for code generation

### Figma Skills (Markdown-based agent instructions)

| Skill | Purpose |
|-------|---------|
| `/figma-use` | Foundation — teaches agent how Figma works |
| `/figma-generate-library` | Create components from codebase |
| `/figma-generate-design` | Create designs from components + variables |
| `/edit-figma-design` | Orchestrate design edit workflows |
| `/apply-design-system` | Connect designs to system components |
| `/sync-figma-token` | Sync design tokens between code ↔ Figma variables |

## Branding Kit vs Codebase Conflicts (Must Resolve in Phase 12)

| Item | Branding Kit (target) | Codebase (current) |
|------|----------------------|-------------------|
| Primary color | `#0f1419` (Light Black) | `#1e9df1` (Sky Blue) |
| Blue role | Accent | Primary |
| Font heading | Sono | Geist |
| Font body | Inter | Geist |

## Source References

- Figma blog: "Agents, meet the Figma canvas" (2026-03-24)
- Claude Design Assistant plugin: alternative for Trang (needs API credits, ~$5-10)
- Figma MCP registry: https://publicmcpregistry.com/mcp/figma-mcp-server-g16w9u
