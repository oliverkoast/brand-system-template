# QA Findings

Open defects and unresolved conflicts. Everything here is a **question for a human**, not a gap
for Claude to fill. Nothing below has been silently resolved.

Status key: **OPEN** needs a decision or a re-export. **NOTED** understood, no action needed.
**RESOLVED** decided, with the decision and its consequences recorded.

> Template note: F-01 to F-03 are **worked examples**, kept to show the format and the standard
> of evidence. Delete them and write your own. F-04 and F-05 are real and apply to any repo built
> from this template.

---

## F-01 — EXAMPLE: two sources disagree on a value · OPEN

*This is what a conflict looks like written down properly.*

The type sheet specifies a headline line height of **90%**. The approved artwork measures
**84%** (202px of leading on a 240px type size).

Handled by: the token carries the declared 90%; the template reproduces the measured 84% so it
still matches the acceptance target; the conflict is named in a comment at the point of override.

**Decision needed:** is 84% the real house setting and the sheet is stale, or did the artwork
drift? Do not average them.

*How it was measured: the bottom line is 847px wide in the reference and 848px in the template
render, so the type size matches to within 0.2%. Isolating leading from that gave 202px.*

**Why this entry matters more than it looks.** A model that wants to be helpful picks one and
moves on, and the brand drifts silently. Writing both numbers down costs one message.

---

## F-02 — EXAMPLE: raster logos with no vector source · OPEN

*The most common real-world version of this finding.*

If your logos exist only as PNG, every one has a hard maximum placement size, and going above it
is visibly soft and **cannot be fixed in code**. It also means any format needing a large master
(cover art, print, large-format) is impossible, and the animation cannot do path-level motion.

**Action:** export SVG. Until then, record each file's native width and treat it as a ceiling.

*This template ships SVG logos precisely so the problem does not exist. If yours are raster, this
finding is real and belongs here with your actual numbers.*

---

## F-03 — EXAMPLE: a defect in a supplied asset · OPEN

*What to do when the asset itself is wrong.*

A supplied background has a visible compositing seam about 79% across, present in the original
file rather than introduced by re-encoding.

**Action:** re-export from source. **Do not retouch it in this repo.** The fix belongs upstream,
or it will be lost the next time the asset is re-supplied.

---

## F-04 — CSS `mask-image` renders nothing in headless Chrome · NOTED, worked around

Compositing a texture into a logo's alpha with CSS `mask-image` renders correctly in a normal
browser window and produces **completely empty frames** in headless Chrome, which is what the
frame exporter uses.

Worked around by compositing on `<canvas>` with `globalCompositeOperation = 'destination-in'`,
which renders identically on screen and headless. See `animation/ds-motion.js`.

**Do not "simplify" the animation back to a CSS mask.** It will look fine in the browser and
export blank video.

---

## F-05 — Chrome `--screenshot` does not preserve alpha · NOTED, worked around

`--default-background-color=00000000` has no effect on the saved PNG on macOS, in either headless
mode. Output is always opaque.

Worked around in `kit/export-frames.sh`: with `BG=none`, each frame is rendered over black and
over white and `kit/unmatte.py` solves for alpha exactly (`a = 1 - (Cw - Ck)`, `F = Ck / a`).
Exact arithmetic, not an approximation. Costs two renders per frame, which is the right trade
against shipping an export that silently produces opaque frames.

---

## F-06 — No approved references in this template · OPEN

`reference/` does not exist, because a reference has to be *your* approved artwork.

Until you add yours, the numbers in `templates/` are sensible defaults rather than measured
values, and nothing can be diffed against anything.

**Action:** add your approved designs to `reference/`, then follow step 4 of `kit/NEW-BRAND.md`
to measure the templates against them and record the numbers. This is the step people skip.
