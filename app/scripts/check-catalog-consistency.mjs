// Catalog consistency check.
//
// Two data files both say, in their own headers, that builder prices MUST
// mirror src/data/product-catalog-table-data.ts — and nothing enforced it.
// That is a silent failure mode: retire a catalog row and forget the builder,
// and "Build your own setup" keeps quoting and totalling a product that can no
// longer be delivered. Nobody finds out until a customer orders it.
//
// Checks:
//   1. every BUILDABLE_ITEMS.catalogName resolves to a catalog row
//   2. every BUILDABLE_ITEMS.unitPrice equals that row's price
//   3. every SETUP_TEMPLATES slot references an item that still exists
//   4. every productDetails key resolves to a catalog row (orphaned drawer
//      entries silently fall back to generic copy, so they look fine)
//
// Deliberately regex over the source rather than importing it: these are TS
// modules with path aliases and JSX-adjacent imports, and a check that needs a
// build step is a check that stops being run.
//
// Usage: npm run check:catalog   (exit 1 on any mismatch)

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const DATA = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data')
const read = (f) => readFileSync(join(DATA, f), 'utf8')

const catalog = read('product-catalog-table-data.ts')
const builder = read('custom-setup-data.ts')
const details = read('product-details-data.ts')

// ── Catalog rows: name -> price (null for contact-only rows) ───────────────
const catalogPrices = new Map()
for (const m of catalog.matchAll(/\{\s*name:\s*"([^"]+)",\s*basic:\s*(?:"\$([0-9,]+)"|false)/g)) {
  catalogPrices.set(m[1], m[2] ? Number(m[2].replace(/,/g, '')) : null)
}

const problems = []

if (catalogPrices.size === 0) {
  problems.push('parsed 0 catalog rows — the row format changed, fix this script')
}

// Exported id consts, so `id: AD_ACCOUNT_ID` resolves like a literal would.
const idConsts = new Map()
for (const m of builder.matchAll(/export const ([A-Z_]+_ID)\s*=\s*"([^"]+)"/g)) {
  idConsts.set(m[1], m[2])
}

// ── 1 + 2. Builder items ──────────────────────────────────────────────────
const builderItems = new Map()
for (const m of builder.matchAll(/\{\s*id:\s*(?:"([^"]+)"|([A-Z_]+_ID))[^}]*?unitPrice:\s*(\d+),\s*catalogName:\s*"([^"]+)"/g)) {
  const [, literalId, constId, unitPrice, catalogName] = m
  const id = literalId ?? idConsts.get(constId)
  if (!id) {
    problems.push(`builder item uses id const ${constId}, which is not exported`)
    continue
  }
  builderItems.set(id, { unitPrice: Number(unitPrice), catalogName })

  if (!catalogPrices.has(catalogName)) {
    problems.push(`builder item "${id}" names "${catalogName}", which is not a catalog row`)
    continue
  }
  const listed = catalogPrices.get(catalogName)
  if (listed !== null && listed !== Number(unitPrice)) {
    problems.push(`builder item "${id}" is $${unitPrice} but the catalog lists "${catalogName}" at $${listed}`)
  }
}

// ── 3. Template slots ─────────────────────────────────────────────────────
// Asset keys are quoted ids; bmId is quoted too. Computed keys like
// [AD_ACCOUNT_ID] resolve through idConsts, built above.
const templatesStart = builder.indexOf('export const SETUP_TEMPLATES')
if (templatesStart === -1) {
  problems.push('SETUP_TEMPLATES not found — the builder file changed shape')
} else {
  const templates = builder.slice(templatesStart)
  const referenced = new Set()
  for (const m of templates.matchAll(/bmId:\s*"([^"]+)"/g)) referenced.add(m[1])
  for (const m of templates.matchAll(/"([a-z0-9-]+)":\s*\d+/g)) referenced.add(m[1])
  for (const m of templates.matchAll(/\[([A-Z_]+_ID)\]:\s*\d+/g)) {
    const resolved = idConsts.get(m[1])
    if (resolved) referenced.add(resolved)
    else problems.push(`template references [${m[1]}], which is not an exported id const`)
  }
  for (const id of referenced) {
    if (!builderItems.has(id)) {
      problems.push(`setup template references item "${id}", which is not in BUILDABLE_ITEMS`)
    }
  }
}

// ── 4. Product detail keys ────────────────────────────────────────────────
for (const m of details.matchAll(/^ {2}"([^"]+)":\s*\{/gm)) {
  if (!catalogPrices.has(m[1])) {
    problems.push(`product detail "${m[1]}" has no catalog row — the drawer will fall back to generic copy`)
  }
}

// ── Report ────────────────────────────────────────────────────────────────
if (problems.length > 0) {
  console.error(`\ncatalog consistency: ${problems.length} problem(s)\n`)
  for (const p of problems) console.error(`  - ${p}`)
  console.error('')
  process.exit(1)
}

console.log(
  `catalog consistency: ok (${catalogPrices.size} rows, ${builderItems.size} builder items)`,
)
