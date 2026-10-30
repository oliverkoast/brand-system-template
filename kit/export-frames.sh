#!/usr/bin/env bash
#
# Render animation/logo-sting.html to a numbered PNG frame sequence, then
# (optionally) to an MP4 and a transparent MOV.
#
# This works because the animation is a pure function of t: pass ?t=1.25 and it
# renders that exact instant and holds. No screen recording, no dropped frames,
# no timing drift. Same input, same pixels, every time.
#
# Usage:
#   kit/export-frames.sh                       # 4s at 30fps, rail ground
#   kit/export-frames.sh 60 out/sting-60        # 60fps into a chosen folder
#   BG=none kit/export-frames.sh                # transparent, for compositing
#
set -euo pipefail

FPS="${1:-30}"
OUTDIR="${2:-out/sting}"
BG="${BG:-rail}"
DURATION=4.0                                   # must match DURATION in the html

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PAGE="file://$REPO/animation/logo-sting.html"

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
if [[ ! -x "$CHROME" ]]; then
  echo "Chrome not found at: $CHROME" >&2
  echo "Set CHROME=/path/to/chrome and re-run." >&2
  exit 1
fi

mkdir -p "$REPO/$OUTDIR"
TOTAL=$(python3 -c "print(int($DURATION * $FPS))")

shoot () {   # shoot <t> <bg> <outfile>
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --force-device-scale-factor=1 --window-size=1920,1080 \
    --virtual-time-budget=3000 \
    --screenshot="$3" \
    "$PAGE?t=$1&bg=$2" 2>/dev/null
}

if [[ "$BG" == "none" ]]; then
  # Chrome's --screenshot does not preserve alpha on macOS, in either headless
  # mode, with or without --default-background-color=00000000. So render each
  # frame over black and over white and solve for true alpha exactly.
  # See kit/unmatte.py for the arithmetic.
  MATTE="$REPO/$OUTDIR/.matte"
  mkdir -p "$MATTE"
  echo "Rendering $TOTAL frames at ${FPS}fps (transparent, two passes) into $OUTDIR"
else
  echo "Rendering $TOTAL frames at ${FPS}fps (bg=$BG) into $OUTDIR"
fi

for ((i=0; i<TOTAL; i++)); do
  T=$(python3 -c "print(f'{$i / $FPS:.5f}')")
  N=$(printf "%04d" "$i")
  if [[ "$BG" == "none" ]]; then
    shoot "$T" black "$MATTE/k_$N.png"
    shoot "$T" white "$MATTE/w_$N.png"
    python3 "$REPO/kit/unmatte.py" "$MATTE/k_$N.png" "$MATTE/w_$N.png" \
      "$REPO/$OUTDIR/frame_$N.png"
  else
    shoot "$T" "$BG" "$REPO/$OUTDIR/frame_$N.png"
  fi
  printf "\r  frame %s/%s" "$((i+1))" "$TOTAL"
done
echo ""
[[ "$BG" == "none" ]] && rm -rf "$MATTE"

if command -v ffmpeg >/dev/null 2>&1; then
  echo "Encoding video"
  # H.264 for YouTube, Slack, and slides.
  ffmpeg -y -loglevel error -framerate "$FPS" \
    -i "$REPO/$OUTDIR/frame_%04d.png" \
    -c:v libx264 -pix_fmt yuv420p -crf 16 \
    "$REPO/$OUTDIR/sting.mp4"
  echo "  $OUTDIR/sting.mp4"

  # Transparent ProRes 4444 for editors, only meaningful when BG=none.
  if [[ "$BG" == "none" ]]; then
    ffmpeg -y -loglevel error -framerate "$FPS" \
      -i "$REPO/$OUTDIR/frame_%04d.png" \
      -c:v prores_ks -profile:v 4444 -pix_fmt yuva444p10le \
      "$REPO/$OUTDIR/sting-alpha.mov"
    echo "  $OUTDIR/sting-alpha.mov (alpha preserved)"
  fi
else
  echo "ffmpeg not found, frames only. Install it with: brew install ffmpeg"
fi

echo "Done."
