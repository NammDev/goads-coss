#!/bin/bash
# Build the extension zip for the website download button.
# Usage: ./build-zip.sh
# Output: app/public/downloads/GOADS-Extension.zip
#   FLAT archive — files sit at the zip root (manifest.json at top level), NOT in
#   a wrapper folder. When the user runs "Extract All" (Windows) or double-clicks
#   (macOS), the OS auto-creates a single GOADS-Extension/ folder with the files
#   directly inside — ready for chrome://extensions → Load unpacked, no nesting.
# The extension is env-agnostic (no sign-in / no config / no API base URL).

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUT_DIR="$SCRIPT_DIR/../app/public/downloads"

mkdir -p "$OUT_DIR"

# Zip every file the manifest references (scripts, styles, icons, logo, font),
# flat at the archive root.
cd "$SCRIPT_DIR"
rm -f "$OUT_DIR/GOADS-Extension.zip"
zip -j "$OUT_DIR/GOADS-Extension.zip" \
  background.js content.js content.css manifest.json \
  icon16.png icon32.png icon48.png icon128.png \
  goads-logo.png inter-var.woff2

echo "Built: $OUT_DIR/GOADS-Extension.zip"
