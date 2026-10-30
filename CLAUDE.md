# CLAUDE.md — read this first

This repo is a **code-owned design system**. Before making any change, read and follow
`DESIGN.md` (the brand contract). It is authoritative. The notes below are the parts people ask
for most, so you apply them without being told each time.

> This is the **hotelink** system, built from Oliver's brand-system template and hotelink.ai as
> shipped on 2026-10-30. Open questions live in `qa/FINDINGS.md`; read the H-entries before
> making anything external.

## Making a piece

1. Name the format. Look it up in `brand.json` for the canvas, lockup, and margins.
2. If a coded template exists in `templates/`, **remix that**. Otherwise reproduce the matching
   `reference/` image using the real tokens, fonts, and logos.
3. **Fill in only the content the person provides.** Never invent a name, date, figure, or
   claim. If it is missing, ask.
4. **If no reference matches** the requested piece, say so and ask which to use, rather than
   picking the closest one.

## Adding images

- **Compress each to under 5 MB.** Some design tools silently drop larger files on sync, and a
  silently missing asset is the worst failure mode there is. For opaque photographic assets,
  **keep full resolution and re-encode as JPEG q=96 4:4:4** rather than downscaling. Anything
  with transparency stays PNG.
- **Name them deterministically**: `hotelink-{lockup}-{colour}`, `partner-{vendor}`.
- **Add each to `assets/assets.json`** with `alt`, `kind`, and its slot in the `usage` map.
  A file that is not in the manifest is not selectable, and that is intentional.

## No textures, no gradients

Hotelink grounds are flat token colours. There is no texture set. Never add a gradient or a
generated texture for "depth".

## Partner logos are not ours

`assets/partners/` holds other companies' trademarks. Use them only in a "Connected systems"
strip, never recoloured, never next to a partnership claim (DESIGN.md, H-08).

## Every change

- **Real files referenced, never regenerated** (logos, fonts, partner logos).
- **Only defined tokens; never invent a hex, weight, or value.** If something is missing or
  looks wrong, stop and flag it rather than guessing or patching.
- **When writing or editing copy, follow `VOICE.md`.**
- **No em-dashes. No overlapping text. Every committed image under 5 MB.**
- Stage files by name; never `git add -A`.

## Log conflicts, do not resolve them

When two sources disagree, or something is missing, **write it into `qa/FINDINGS.md` with the
measurements and leave it open.** Do not average two values, do not pick one quietly, and do not
fill a gap with something plausible. A logged conflict is the single most valuable thing this
repo produces.
