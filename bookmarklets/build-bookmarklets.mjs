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
]

for (const job of JOBS) {
  // Minify the IIFE. --format=iife keeps it a single self-invoking expression.
  const minified = execFileSync(
    process.execPath,
    [esbuildBin, job.src, "--minify", "--format=iife", "--target=es2017", "--charset=utf8"],
    { encoding: "utf8" },
  ).trim()

  // A bookmarklet is a URL: the whole script must be one `javascript:` line with
  // no raw newlines. Minified esbuild output already has none, but guard anyway.
  const oneLine = minified.replace(/\n/g, "")
  const payload = "javascript:" + oneLine

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
