# Northlight — Design System Rules

> **This is a template.** Northlight is a fictional brand. Replace the specifics with yours and
> keep the structure. The rules below are the transferable part; the colours and file names are
> not. See `kit/NEW-BRAND.md`.

This file is the brand contract. Claude reads it on every run. Follow it exactly.

## One system, many formats

There is **one** design system. Colour, type, and the logo family are **shared and identical**
across every piece.

**The only things that change per piece are the canvas, the lockup, and the safe margins.** To
make a piece, name the format and select its canvas and lockup from `brand.json`. Never invent a
format, never restyle the system per piece.

## Non-negotiable rules

1. **Reference real asset files. Never redraw them.** Logos live in `assets/logos/` as real
   files. Place them with an `<img>` or a `background-image`. Never inline a logo as vector
   paths in a component, never regenerate it, never recolour it in code.
2. **Pick the file by name, not by a knob.** The correct asset comes from `brand.json` and the
   ground rule below. There is no `variant` prop to compute. If a needed file is marked PENDING,
   **stop and say so.** Do not substitute a different one.
3. **Use only defined tokens.** Colour, type, and spacing come from `tokens/design-tokens.json`
   and `styles.css`. Never introduce a hex, font, or size that is not declared there.
4. **Never invent or estimate a value.** If a token, name, date, or asset is missing or marked
   `$verify` / PENDING, **stop and flag it** in plain language. Do not sample a hex off a
   screenshot and call it the brand colour. A missing value is a question for a human.
5. **Never apply filters or one-off patches** to force something to look right (no `filter:`,
   no hardcoded hex, no `!important`). A wrong-looking asset is a **bug to report**, not to
   paper over.
6. **One change at a time on shared structure.** Keep content edits separate from structural
   edits.

## The logo family

| File | What it is | Use |
|---|---|---|
| `northlight-mark-ink.svg` | The mark, dark | On paper, white, or any light ground |
| `northlight-mark-white.svg` | The mark, reversed | On texture, ink, or harbour |

**The wordmark is TYPE, not a file.** It is set in the display face at the tracking in
`styles.css`. This is a real and common pattern, and worth being explicit about: shipping a
wordmark as a raster when it is really just set type guarantees it goes soft the first time
someone scales it.

### Choosing the variant (deterministic)

| Ground | File |
|---|---|
| Paper, white, sand | `-ink` |
| Texture, ink, harbour, or a dark photo | `-white` |

Approved colour variants are **separate real files**, not runtime recolouring. If a variant does
not exist as a file, it is not approved. Stop and flag it. Do not create it by setting a `fill`.

### Why these are SVG

Vector means no maximum placement size, clean scaling to any format, and path-level animation.
**If your logos only exist as raster, that is a real constraint and it should be written down as
a finding rather than discovered at the worst moment.** See `qa/FINDINGS.md` F-02 for how that
gets recorded.

### Clear space

Minimum clear space on all sides is **0.5x the mark's height**. This one is a genuine rule, not
a placeholder, because a clear-space rule that is never stated gets invented differently by
every person who touches the brand.

## Textures

The texture set is the brand's visual language. Files come **only** from `assets/assets.json`.

Never generate, invent, or substitute a stock gradient, and **never build one in CSS**. A CSS
gradient has no grain and no optical break, and it reads as generic instantly. If you need a
gradient, place a texture file.

Which texture goes where is not a free choice. Use the `usage` map.

## Type

| Role | Face | Weight | Tracking | Line height |
|---|---|---|---|---|
| Headline | Space Grotesk | Bold (700) | -4% | 95% |
| Body, labels | Sora | Regular (400) | -1% | 150% |

**Do not use a third family.** Do not bump a weight for emphasis. Emphasis comes from size and
contrast, never from an undeclared weight.

Fonts are real files in `fonts/`. Never reference a font file that is not present. Both here are
open-source; **if yours are licensed, confirm the licence covers web and email embedding before
anything ships.**

## Colour

Consume the roles, never raw hex.

| Token | Hex | Role |
|---|---|---|
| paper | `#F6F3EE` | **Default ground** |
| white | `#FFFFFF` | Alternate ground, reversed type |
| sand | `#E3D9CB` | Warm neutral surface |
| beam | `#E8A13C` | Primary accent |
| harbour | `#3B5A72` | Cool accent |
| slate | `#2E3742` | Secondary type |
| ink | `#1B2430` | **Default type**, dark surfaces |

**Never place white type on paper.** White belongs on texture, ink, or harbour only. Contrast
rules are not stylistic preferences; they are the difference between legible and not.

## Output quality

- **Never invent a fact.** No names, dates, figures, quotes, prices, or claims unless the person
  supplies them. If content is missing, ask.
- **No em-dashes in copy.** Use commas, colons, or parentheses.
- **Never overlap, collide, clip, or run text off the canvas.**
- Write in the brand's voice. See `VOICE.md`.

## Reference layouts

`reference/` holds real approved designs, one per format. Each is both the target to aim at and
the pass/fail check.

**Selecting the reference is not a free choice. Use the one whose name matches the piece.** If a
coded template exists in `templates/`, remix that. If no reference matches what was asked for,
**say so and ask**, rather than picking the closest one and letting it become the standard by
accident.

> This template ships without a `reference/` folder, because a reference has to be *your*
> approved artwork. Add yours, then measure the templates against it rather than eyeballing.
> `kit/NEW-BRAND.md` explains the measuring step, which is the part most people skip.

## When in doubt

Stop and ask. A flagged question costs one message. A hallucinated design decision costs a
non-designer hours of confused iteration and can ship off-brand.
