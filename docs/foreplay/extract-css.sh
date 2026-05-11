#!/bin/bash
# Extract CSS rules for given class names from foreplay source CSS
# Usage: ./extract-css.sh "nav-stack" "navmenu-links" "button-dark"

CSS_FILE="$(dirname "$0")/foreplay-source.css"

if [ ! -f "$CSS_FILE" ]; then
  echo "ERROR: foreplay-source.css not found. Run: curl -sL 'https://cdn.prod.website-files.com/62a4ed18ddad95dde8b8bfa4/css/foreplay-3-0.shared.be2f89f77.min.css' -o $CSS_FILE"
  exit 1
fi

for class in "$@"; do
  echo "=== .$class ==="
  python3 -c "
import sys, re
css = open('$CSS_FILE').read()
matches = re.findall(r'\.$class[^{]*\{[^}]+\}', css)
for m in matches:
    print(m)
    print()
"
  echo ""
done
