#!/bin/bash
# Build the extension zip for the website download button.
# Usage: ./build-zip.sh
# Output: app/public/downloads/goads-extension.zip
#   The archive contains a top-level goads-extension/ folder so users unzip to a
#   clean folder ready for chrome://extensions → Load unpacked.
# The extension is env-agnostic (no sign-in / no config / no API base URL).

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUT_DIR="$SCRIPT_DIR/../app/public/downloads"
TMP_DIR=$(mktemp -d)
STAGE="$TMP_DIR/goads-extension"

mkdir -p "$OUT_DIR" "$STAGE"

# Ship only the files the manifest loads.
cp "$SCRIPT_DIR"/{background.js,content.js,content.css,manifest.json,icon48.png,icon128.png} "$STAGE/"

# Zip with the goads-extension/ folder as the archive root.
cd "$TMP_DIR"
rm -f "$OUT_DIR/goads-extension.zip"
zip -r "$OUT_DIR/goads-extension.zip" goads-extension

rm -rf "$TMP_DIR"
echo "Built: $OUT_DIR/goads-extension.zip"
