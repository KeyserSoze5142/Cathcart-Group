#!/usr/bin/env bash
# ============================================================================
# localize-assets.sh — download all images/videos from the live
# cathcartgroup.com site into ./assets/ and rewrite every HTML page to use
# the local copies instead of hotlinking.
#
# Run this ONCE from the repository root, on your own machine
# (requires: bash, curl, sed):
#
#     bash tools/localize-assets.sh
#
# Why this exists: the site currently references images/videos directly from
# the live cathcartgroup.com server so the preview works immediately. Before
# replacing the production site (or if the old site ever goes offline), run
# this script so the new site owns its own copies of every asset.
# ============================================================================
set -euo pipefail
cd "$(dirname "$0")/.."

MANIFEST="tools/assets-manifest.txt"
PREFIX="https://www.cathcartgroup.com/wp-content/uploads/"
DEST="assets"

echo "Downloading $(wc -l < "$MANIFEST") assets into ./$DEST/ ..."
fail=0
while IFS= read -r url; do
  [ -z "$url" ] && continue
  rel="${url#"$PREFIX"}"
  out="$DEST/$rel"
  mkdir -p "$(dirname "$out")"
  if [ ! -s "$out" ]; then
    if curl -fsSL --retry 2 -o "$out" "$url"; then
      echo "  ok  $rel"
    else
      echo "  FAILED  $url" >&2
      rm -f "$out"
      fail=$((fail+1))
    fi
  fi
done < "$MANIFEST"

if [ "$fail" -gt 0 ]; then
  echo
  echo "$fail downloads failed — HTML was NOT rewritten. Re-run this script to retry;"
  echo "once every asset downloads cleanly, the rewrite step will run."
  exit 1
fi

echo "Rewriting HTML to use local assets ..."
for f in *.html; do
  # macOS/BSD sed needs -i '' ; GNU sed needs -i
  if sed --version >/dev/null 2>&1; then
    sed -i "s|https://www\.cathcartgroup\.com/wp-content/uploads/|assets/|g" "$f"
  else
    sed -i '' "s|https://www\.cathcartgroup\.com/wp-content/uploads/|assets/|g" "$f"
  fi
done

echo
echo "Done. All assets are now local under ./$DEST/ — commit and push."
