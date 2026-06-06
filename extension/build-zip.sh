#!/bin/bash
# Build extension zip for distribution
# Usage: ./build-zip.sh
# Output: app/public/downloads/goads-bm-invite-v2.zip
# No sign-in: extension is env-agnostic (no config / API base URL).

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUT_DIR="$SCRIPT_DIR/../app/public/downloads"
TMP_DIR=$(mktemp -d)

mkdir -p "$OUT_DIR"

# Copy all extension files to temp dir
cp "$SCRIPT_DIR"/{background.js,content.js,content.css,manifest.json,popup.html,popup.js,icon48.png,icon128.png} "$TMP_DIR/"

# Build zip
cd "$TMP_DIR"
zip -r "$OUT_DIR/goads-bm-invite-v2.zip" .

# Cleanup
rm -rf "$TMP_DIR"

echo "Built: $OUT_DIR/goads-bm-invite-v2.zip"
