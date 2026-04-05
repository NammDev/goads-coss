#!/bin/bash
# Build extension zip for distribution
# Usage: ./build-zip.sh [--prod]
# Output: app/public/downloads/goads-bm-invite-v2.zip

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUT_DIR="$SCRIPT_DIR/../app/public/downloads"
TMP_DIR=$(mktemp -d)

mkdir -p "$OUT_DIR"

# Copy all extension files to temp dir
cp "$SCRIPT_DIR"/{background.js,content.js,content.css,manifest.json,popup.html,popup.js,icon48.png,icon128.png} "$TMP_DIR/"

# Swap config based on environment
if [ "$1" = "--prod" ]; then
  cp "$SCRIPT_DIR/config.prod.js" "$TMP_DIR/config.js"
  echo "Using PRODUCTION config (goads.shop)"
else
  cp "$SCRIPT_DIR/config.js" "$TMP_DIR/config.js"
  echo "Using DEV config (localhost:3000)"
fi

# Build zip
cd "$TMP_DIR"
zip -r "$OUT_DIR/goads-bm-invite-v2.zip" .

# Cleanup
rm -rf "$TMP_DIR"

echo "Built: $OUT_DIR/goads-bm-invite-v2.zip"
