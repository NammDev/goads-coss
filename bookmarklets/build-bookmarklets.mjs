// Build readable bookmarklet sources into one-line `javascript:` payload modules
// consumed by the GOADS Bookmark registry.
//
//   bookmarklets/<name>.js  ──esbuild(minify)──►  app/src/data/bookmarklets/<name>-payload.ts
//
// Run:  node bookmarklets/build-bookmarklets.mjs
//
// esbuild is already a dependency of app/, so no new install. We minify (not
// obfuscate) — the point is a compact payload from OUR readable source, editable
// any time by changing the .js and rebuilding.

import { execFileSync } from "node:child_process"
import { readFileSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const here = dirname(fileURLToPath(import.meta.url))
const repo = resolve(here, "..")
// Invoke esbuild's JS entry directly with `node` rather than the .bin shim —
// the Windows .cmd wrapper can't be spawned without a shell (EINVAL).
const esbuildBin = resolve(repo, "app/node_modules/esbuild/bin/esbuild")

// name → { title used in the generated file header, output payload const }
const JOBS = [
  {
    src: resolve(here, "goads-bm-invite.js"),
    out: resolve(repo, "app/src/data/bookmarklets/bm-invite-payload.ts"),
    constName: "BM_INVITE_PAYLOAD",
    title: "BM Invite TOOL",
  },
  {
    src: resolve(here, "goads-bm-remove-admins.js"),
    out: resolve(repo, "app/src/data/bookmarklets/bm-remove-admins-payload.ts"),
    constName: "BM_REMOVE_ADMINS_PAYLOAD",
    title: "Remove BM Admins",
  },
  {
    src: resolve(here, "goads-bm-2fa.js"),
    out: resolve(repo, "app/src/data/bookmarklets/bm-2fa-payload.ts"),
    constName: "BM_2FA_PAYLOAD",
    title: "Enable 2FA",
  },
  {
    src: resolve(here, "goads-bm-approve.js"),
    out: resolve(repo, "app/src/data/bookmarklets/bm-approve-payload.ts"),
    constName: "BM_APPROVE_PAYLOAD",
    title: "Approve BM Requests",
  },
  {
    src: resolve(here, "goads-bm-checklive.js"),
    out: resolve(repo, "app/src/data/bookmarklets/bm-checklive-payload.ts"),
    constName: "BM_CHECKLIVE_PAYLOAD",
    title: "Check Live BM",
  },
  {
    src: resolve(here, "goads-bm-acceptlink.js"),
    out: resolve(repo, "app/src/data/bookmarklets/bm-acceptlink-payload.ts"),
    constName: "BM_ACCEPTLINK_PAYLOAD",
    title: "Accept BM Link",
  },
]

for (const job of JOBS) {
  // Minify the IIFE. --format=iife keeps it a single self-invoking expression;
  // --bundle inlines the shared/ modules (shell, CSS, icons, session readers) so
  // each payload stays standalone while the sources stay DRY. Icons are exported
  // one const each, so a tool only carries the ones it actually imports.
  const minified = execFileSync(
    process.execPath,
    [esbuildBin, job.src, "--bundle", "--minify", "--format=iife", "--target=es2017", "--charset=utf8"],
    { encoding: "utf8" },
  ).trim()

  // A bookmarklet is a URL: the whole script must be one `javascript:` line with
  // no raw newlines. Minified esbuild output already has none, but guard anyway.
  const oneLine = minified.replace(/\n/g, "")

  // The browser percent-DECODES a `javascript:` URL before running it. Any `%`
  // in the script that happens to be followed by two hex digits is therefore
  // eaten: the BM-admins tool embeds pre-encoded GraphQL variables (`%22`,
  // `%7B`, …), which decoded back into raw quotes/braces mid-string-literal →
  // SyntaxError → the bookmarklet silently did nothing. Escaping `%` itself is
  // enough: every other char that matters here (`#`, `&`, `?`, spaces, quotes)
  // survives decoding untouched.
  const urlSafe = oneLine.replace(/%/g, "%25")
  if (decodeURIComponent(urlSafe) !== oneLine) {
    throw new Error("payload does not survive URL decoding: " + job.src)
  }
  const payload = "javascript:" + urlSafe

  const header =
    "// Bookmarklet payload — " +
    job.title +
    ".\n" +
    "// GENERATED from bookmarklets/" +
    job.src.split(/[\\/]/).pop() +
    " by bookmarklets/build-bookmarklets.mjs.\n" +
    "// GOADS-owned source (ported from this repo's extension). DO NOT hand-edit —\n" +
    "// change the .js source and re-run the build.\n\n"

  writeFileSync(job.out, header + "export const " + job.constName + " = " + JSON.stringify(payload) + "\n")
  console.log(
    job.out.replace(repo, "."),
    "←",
    (payload.length / 1024).toFixed(1) + " KB",
    "(source " + (readFileSync(job.src, "utf8").length / 1024).toFixed(1) + " KB)",
  )
}
