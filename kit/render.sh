#!/usr/bin/env bash
#
# Render any template in this repo to a PNG at an exact canvas size.
#
# Usage:
#   kit/render.sh templates/card-16x9.html out/card.png 1920 1080
#   kit/render.sh templates/social-1x1.html out/social.png 1080 1080
#
# The optional 5th argument is a device scale factor, for exporting above the
# authored canvas size. Author at a comfortable size, then render at 2x or 1.6x
# to hit a larger delivery spec. Never resize an exported PNG afterwards.
#
set -euo pipefail

PAGE="${1:?usage: kit/render.sh <html> <out.png> [w] [h] [scale]}"
OUT="${2:?usage: kit/render.sh <html> <out.png> [w] [h] [scale]}"
W="${3:-1920}"
H="${4:-1080}"
SCALE="${5:-1}"

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

if [[ ! -x "$CHROME" ]]; then
  echo "Chrome not found at: $CHROME" >&2
  echo "Set CHROME=/path/to/chrome and re-run." >&2
  exit 1
fi

mkdir -p "$(dirname "$REPO/$OUT")"

"$CHROME" --headless=new --disable-gpu --hide-scrollbars \
  --force-device-scale-factor="$SCALE" \
  --window-size="$W,$H" \
  --virtual-time-budget=4000 \
  --screenshot="$REPO/$OUT" \
  "file://$REPO/$PAGE" 2>/dev/null

PX=$(python3 -c "print(f'{round($W * $SCALE)}x{round($H * $SCALE)}')")
echo "Wrote $OUT — $PX (canvas ${W}x${H} at ${SCALE}x)"
