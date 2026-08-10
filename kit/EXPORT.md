# Exporting

Everything renders in a browser, so exporting is a screenshot at a known viewport rather than a
design-tool export dialog. The same command produces the same pixels every time, and it runs in
CI.

All scripts need Chrome. Override with `CHROME=/path/to/chrome`.

## Stills

```bash
kit/render.sh <html> <out.png> [width] [height] [scale]

kit/render.sh templates/card-16x9.html  out/card.png   1920 1080
kit/render.sh templates/social-1x1.html out/social.png 1080 1080
kit/render.sh templates/card-16x9.html  out/card@2x.png 1920 1080 2
```

**About the scale factor.** Author at a comfortable size, then render at 2x to hit a larger
delivery spec. **Never resize an exported PNG afterwards** — re-render at the right scale, or
the type goes soft for no reason.

## Motion

```bash
kit/export-frames.sh [fps] [outdir]

kit/export-frames.sh                              # frames + mp4
BG=none kit/export-frames.sh 30 out/sting-alpha   # true alpha + ProRes 4444
kit/export-frames.sh 4 out/smoke                  # quick check
```

Needs `ffmpeg` for the video step. Without it you still get the frame sequence.

**Transparency takes two renders per frame, for a real reason.** Chrome's `--screenshot` does
not preserve alpha on macOS in either headless mode. Rather than ship an export that silently
produces opaque frames, `BG=none` renders each frame over black and over white and solves for
alpha exactly (`kit/unmatte.py`). See `qa/FINDINGS.md` F-05.

## Why the frame exporter works

`animation/logo-sting.html` is a pure function of one variable, `t` in seconds. `?t=1.25` renders
that instant and holds. The exporter walks `t` in `1/fps` steps and screenshots each one.

No screen recording, no dropped frames, no timing drift, and the hundredth render is identical to
the first. You can also re-export at any frame rate without re-authoring anything, which matters
more than it sounds: **hand an editor a 30fps asset for a 23.976 timeline and it will either drop
a frame or get silently retimed.**

## Handing motion to an editor

- **ProRes 4444 .mov**, straight alpha, **at their timeline's frame rate** — the master
- **An opaque H.264** of the same thing, for anyone who just wants to drop it on a track
- **The PNG sequence**, as the lossless archive

Ask the frame rate before you render. It is the most common handoff failure.
