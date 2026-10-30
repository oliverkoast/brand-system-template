---
name: hotelink-brand
description: Use this skill to make on-brand hotelink collateral (social posts, title cards, logo sting, connected-systems strips). Contains the brand contract, tokens from the live site, self-hosted Literata and IBM Plex Sans, the real mark files, the 17 connected-system logos, coded templates, and an exportable logo sting.
user-invocable: true
---

Read `README.md` first, then `DESIGN.md` (the non-negotiable brand contract), then `brand.json`
(the format menu) and `assets/assets.json` (the approved asset manifest with its usage map).
Check `qa/FINDINGS.md` before shipping anything.

## Non-negotiable rules (from DESIGN.md)

- **ONE system, many formats.** Colour and type are identical everywhere. Only the canvas, the
  lockup, and the margins change per piece.
- **Reference real asset files. Never redraw, regenerate, or recolour a logo in code.**
- **Pick the mark by ground, not by preference:** `-green` on paper/white/sunken and inside the
  paper tile, `-cream` on accent-strong/rail and inside the green tile. Separate real files.
- **Flat grounds only.** Hotelink has no texture set; never add a gradient.
- **The wordmark is type:** lowercase "hotelink", Georgia 700, -4.67%. See H-02.
- **Partner logos** only in a "Connected systems" strip, never recoloured (H-08).
- **Use only defined tokens.** Never invent a hex, weight, or size.
- **Never place reverse type on paper.** Reverse belongs on accent-strong or rail only.
- **Never invent a name, date, figure, quote, or claim.** If it is missing, ask.
- If any value or asset is missing or flagged `$verify` / PENDING, **stop and flag it.**

## How to work

**If the format has a template**, remix the file in `templates/`. Do not rebuild the layout.

**If it has a reference but no template**, reproduce the reference using the real tokens, fonts,
and logos.

**If it has neither** (`brand.json` → `template: null`), say no approved reference exists and ask
for one. Do not improvise a layout: an improvised layout becomes the de facto standard the moment
it ships once.

**Log conflicts rather than resolving them.** Two sources disagreeing is a finding for
`qa/FINDINGS.md` with the measurements, not a decision for you.

**To render:** `kit/render.sh templates/card-16x9.html out/card.png 1920 1080`
**To export motion:** `kit/export-frames.sh` (add `BG=none` for true alpha)
