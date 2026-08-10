---
name: brand-design-system
description: Use this skill to generate on-brand collateral from a code-owned design system, for production or for throwaway mocks. Contains the brand contract, real tokens, real self-hosted fonts, real logo files, an approved texture set, coded templates, and an exportable logo animation. ONE system for every format; only the canvas, lockup, and margins change.
user-invocable: true
---

Read `README.md` first, then `DESIGN.md` (the non-negotiable brand contract), then `brand.json`
(the format menu) and `assets/assets.json` (the approved asset manifest with its usage map).
Check `qa/FINDINGS.md` before shipping anything.

## Non-negotiable rules (from DESIGN.md)

- **ONE system, many formats.** Colour and type are identical everywhere. Only the canvas, the
  lockup, and the margins change per piece.
- **Reference real asset files. Never redraw, regenerate, or recolour a logo in code.**
- **Pick the logo variant by ground, not by preference:** `-ink` on paper/white/sand, `-white`
  on texture/ink/harbour. Approved variants are separate real files.
- **Textures are files, not CSS gradients.** Place a real file from `assets/textures/`.
- **Use only defined tokens.** Never invent a hex, weight, or size.
- **Never place white type on paper.** White belongs on texture, ink, or harbour only.
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
