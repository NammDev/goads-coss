# Phase 01 — Foundations (shared diagram + builder data/logic)

Goal: make the topology diagram reusable and add a data/logic module the builder
will drive. No user-visible change yet (blueprint popup must look identical).

## Context

- `src/components/pricing/setup-blueprint-dialog.tsx` currently owns both the
  dialog shell AND the diagram (Pod, AssetChip, BridgeArrow, single/two-pod
  layout, `SetupTopology`/`SetupPod` types).
- Builder needs to render the SAME diagram live, so extract it.

## Files to create

- `src/components/pricing/setup-topology-diagram.tsx`
  - Move `SetupPod`, `SetupTopology` types + Pod/AssetChip/BridgeArrow +
    the single/two-pod layout block here as `SetupTopologyDiagram({ topology })`.
  - Keep the flat black/white theme exactly as-is (borders `#ffffff1a`,
    `bg-[var(--alpha-800)]`, no gradient).
- `src/data/custom-setup-data.ts`
  - `BUILDABLE_ITEMS`: array of `{ id, category: "bm"|"profile"|"page"|"extra",
    label, iconSrc, unitPrice, catalogName }`. `unitPrice`/`catalogName` mirror
    `product-catalog-table-data.ts` (comment linking the two so drift is caught).
  - `SETUP_TEMPLATES`: `Record<"advanced"|"premium"|"elite"|"blank", Record<itemId, qty>>`
    seed quantities matching the existing preset contents.
  - `computeTotal(quantities): number` — sum qty*unitPrice.
  - `applyDiscount(total): number` — identity in v1 (hook for later discount phase).
  - `buildTopology(quantities, pixelBank): SetupTopology` — maps quantities to
    pods. Rules: if BM count >= 2 and pixelBank on → pod[0] = 1 BM + a share of
    profiles ("Pixel Bank"), pod[1] = remaining BMs/profiles + all pages
    ("Scaling") with `bridgeLabel: "pixel sharing"`. Else a single pod.
  - `validate(quantities): { warnings: string[]; canCheckout: boolean }` —
    profiles >= BMs; >= 1 page when any BM present; canCheckout = BM count >= 1.

## Files to modify

- `src/components/pricing/setup-blueprint-dialog.tsx`
  - Import and render `<SetupTopologyDiagram topology={topology} />`; re-export
    `SetupTopology`/`SetupPod` from the new module (or update `card.tsx` import).
  - Remove the moved code. Confirm no other importer breaks.

## Validation

- `npx tsc --noEmit` passes.
- Open a preset blueprint popup: pixel-perfect identical to before (diff the
  rendered classes if unsure).

## Risks / rollback

- `card.tsx` imports `SetupTopology` from `setup-blueprint-dialog`. If types move
  to the diagram module, update that import too. Rollback = revert the extraction
  commit (blueprint dialog keeps working standalone).
