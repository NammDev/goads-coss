#!/bin/bash
# Extract CSS rules for given class names from foreplay source CSS
# Usage: ./extract-css.sh "nav-stack" "navmenu-links" "button-dark"

CSS_FILE="$(dirname "$0")/foreplay-source.css"

# Pick an interpreter that actually runs. On Windows `python3` is usually the
# Microsoft Store stub, which prints an install advert and exits 9009 instead of
# running anything — so probe for a real one rather than assuming python3.
PY=""
for candidate in python3 python py; do
  if command -v "$candidate" >/dev/null 2>&1 && "$candidate" -c "" >/dev/null 2>&1; then
    PY="$candidate"
    break
  fi
done

if [ -z "$PY" ]; then
  echo "ERROR: no working Python interpreter found (tried python3, python, py)"
  exit 1
fi

if [ ! -f "$CSS_FILE" ]; then
  echo "ERROR: foreplay-source.css not found. Run: curl -sL 'https://cdn.prod.website-files.com/62a4ed18ddad95dde8b8bfa4/css/foreplay-3-0.shared.be2f89f77.min.css' -o $CSS_FILE"
  exit 1
fi

for class in "$@"; do
  echo "=== .$class ==="
  "$PY" -c "
import sys, re
# Explicit utf-8: Python on Windows defaults to cp1252, which blows up on the
# non-ASCII bytes in the minified bundle.
css = open('$CSS_FILE', encoding='utf-8', errors='replace').read()
matches = re.findall(r'\.$class[^{]*\{[^}]+\}', css)
for m in matches:
    print(m)
    print()
"
  echo ""
done
