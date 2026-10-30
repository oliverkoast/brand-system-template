# Hotelink — Design System Rules

This file is the brand contract. Claude reads it on every run. Follow it exactly.

> **Source.** Built from hotelink.ai as shipped on 2026-10-30: its production CSS, its font
> files, its favicon marks, and its social card. Hotelink has not supplied a brand book, so the
> shipped site is the spec until one arrives. Everything that came from inference rather than
> a file is marked, and every conflict is in `qa/FINDINGS.md`.

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
   ground rule below. If a needed file is marked PENDING, **stop and say so.**
3. **Use only defined tokens.** Colour, type, and spacing come from `tokens/design-tokens.json`
   and `styles.css`. Never introduce a hex, font, or size that is not declared there.
4. **Never invent or estimate a value.** If a token, name, date, or asset is missing or marked
   `$verify` / PENDING, **stop and flag it.** A hex sampled off the ad or a screenshot is not a
   brand colour.
5. **Never apply filters or one-off patches** to force something to look right (no `filter:`,
   no hardcoded hex, no `!important`). A wrong-looking asset is a **bug to report**.
6. **One change at a time on shared structure.**

## The logo family

The mark is an **H** whose crossbar is a chain link: two bars plus a gold link. It is the "link"
in hotelink, so never simplify the crossbar to a plain bar.

| File | What it is | Use |
|---|---|---|
| `hotelink-mark-green.svg` | Mark, deep green bars `#1F3A30`, gold link | On paper, white, sunken, or any light ground, **and inside the paper tile** |
| `hotelink-mark-cream.svg` | Mark, cream bars `#F3EAD9`, gold link | On accent-strong, rail, or any dark ground, **and inside the green tile** |

Both are the site's own favicon files, unmodified. Their viewBox is cropped to the mark
(`12 12 40 40`), so the file's edge is the mark's edge.

### The tile lockup

The primary lockup is **the cream mark inside a rounded deep-green tile, followed by the
wordmark**. That is the site header and the social card. It is built from parts: the tile is a
token (`accent-strong` ground, radius = 10/34 of its size), the mark is the real cream file, the
wordmark is type. Use `.hl-lockup` in `styles.css`; never approximate it.

**On dark grounds the tile inverts**: a `paper` tile with the **green** mark file inside
(`.hl-lockup--on-dark`). That is the social card's right panel and the site's dark header. The
site draws those bars in rail `#1E2723` rather than the file's `#1F3A30`; the difference is
logged, not patched (H-06).

### The wordmark is TYPE, not a file

"hotelink", **always lowercase**, set in **Georgia Bold (700)** at **-4.67% tracking**. The site
sets it as live text in both header and footer; there is no wordmark file. Georgia is a system
font and is **not** in `fonts/` (H-02).

### Choosing the mark (deterministic)

| Ground | File |
|---|---|
| paper, white, sunken, soft, accent-tint, inside the paper tile | `-green` |
| accent-strong, rail, dark theme, inside the green tile | `-cream` |

If a variant does not exist as a file, it is not approved. Do not create it by setting a `fill`.

### Clear space

Minimum clear space on all sides is **0.5x the mark's height** (template rule, not stated by
Hotelink: `$verify`). For the tile lockup, measure from the tile edge.

## Grounds, not textures

Hotelink has **no texture set**. Grounds are flat colour: paper by default, sunken for bands,
accent-strong for the contact band and buttons, rail for the darkest panels. Hairlines
(`line`, `line-strong`) separate. Thin concentric rings and gold connector lines appear in the
social card diagram; they are illustration, not a texture, and have no approved file (H-07).

Never build a gradient to add "depth". The flatness is the look.

## Type

| Role | Face | Weight | Tracking | Line height | Source |
|---|---|---|---|---|---|
| Headline (h1-h3) | Literata | 500 | 0 | 1.02 hero, 1.1 section | site CSS |
| Body | IBM Plex Sans | 400 | 0 | 1.6 (1.65 for large body) | site CSS |
| Eyebrow, labels | IBM Plex Sans | 600, uppercase | +12% | 1 | site CSS |
| Button | IBM Plex Sans | 500 | 0 | 1 | site CSS |
| Wordmark | Georgia | 700 | -4.67% | 1 | site CSS |

**Approved weights are 400, 500, 600** for Literata and Plex (the range the site loads), and
700 for the wordmark only. Do not bump a weight for emphasis.

**The two-beat headline.** "Your hotel. / Connected." sets the first beat in `ink` and the
second in `accent` green, on separate lines. Use `.hl-beat` for the second beat. One per piece.

Both families are SIL OFL and self-hosted from the exact files the site serves.

## Colour

Consume the roles, never raw hex.

| Token | Hex | Role |
|---|---|---|
| paper | `#F6F2EB` | **Default ground** |
| white | `#FFFDF9` | Raised cards. Warm, never pure `#FFF` |
| sunken | `#F1ECE4` | Recessed bands |
| soft | `#ECE6DC` | Quiet fills |
| ink | `#2A2520` | **Default type** |
| muted | `#756A5E` | Secondary type |
| faint | `#9A8F82` | Tertiary type |
| accent | `#2F5C4A` | Brand green: eyebrows, second beat |
| accent-strong | `#1F3A30` | Deep green: buttons, tile, dark band |
| accent-tint | `#E6EDE6` | Green wash |
| gold | `#9A7B45` | Warm accent (sparingly) |
| rail | `#1E2723` | Darkest ground, dark theme paper |

Logo-only colours (`#CDB68A` link gold, `#F3EAD9` cream) live in the logo files and are **not
for layout use**.

**Never place paper/cream type on paper.** Reverse type belongs on accent-strong or rail only.

### Dark theme

The site ships a full dark theme (`.v-c`), and **that is what hotelink.ai shows today**. It is
encoded verbatim as `.hl-theme-dark`. Which theme leads in collateral is an open question
(H-04). Default to light, which matches the social card and the `theme-color`.

## Output quality

- **Never invent a fact.** No names, dates, figures, quotes, prices, or claims unless the person
  supplies them. If content is missing, ask.
- **No em-dashes in copy.** Use commas, colons, or full stops.
- **Never overlap, collide, clip, or run text off the canvas.**
- Write in the brand's voice. See `VOICE.md`.

## Connected-system logos

The 17 third-party logos in `assets/partners/` are **not Hotelink brand assets.** They are other
companies' trademarks, downloaded from the site's strip. Use them only the way the site does: a
neutral strip of systems Hotelink connects to, labelled "Connected systems", each logo at its
own colours, at the heights in `assets/assets.json`. Never recolour, crop, or pair one with a
claim of partnership or endorsement (VOICE.md, H-08).

## Reference layouts

`reference/` holds real approved designs. Today it has one: `og-1200x630.jpg`, the site's own
social card. If a coded template exists in `templates/`, remix that. If no reference matches
what was asked for, **say so and ask**.

## When in doubt

Stop and ask. A flagged question costs one message. A hallucinated design decision costs hours.
