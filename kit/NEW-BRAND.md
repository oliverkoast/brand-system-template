# Standing this up for a real brand

The slow part is never the assembly, which is minutes. It is (1) getting real assets exported
correctly and (2) resolving ambiguity. This doc kills both.

## The three inputs you need before starting

1. **Real asset files** from the brand's design source. **SVG for anything vector.** PNG only
   when the asset genuinely is a raster.
2. **Real font files**, not a lookalike. If licensed, confirm the licence covers web and email
   embedding before anything ships.
3. **The colour and type spec** as the source of truth: a palette sheet and a type sheet.

If any of the three is missing, stop and get it. **Do not estimate.** A hex sampled off a JPEG is
not a brand colour, it is a JPEG artifact.

## Export SOP, where the time actually goes

- Select only **artwork**: logos, marks, motifs, custom icons. Not cards, buttons, footers, or
  the type page. Those are values and components you rebuild in code.
- Export vector as **SVG**. Raster logos give every file a hard maximum placement size, kill any
  large-format output, and make path-level animation impossible.
- **Grab every colour variant in one pass.** A system with only a white lockup has no legal way
  to put a logo on a light ground, and you will not discover that until you need it.
- **Check dimensions match the asset.** A wordmark and an emblem are different sizes. A file the
  wrong size for what you meant is the wrong component.
- **Inspect large rasters at 100%** for seams and baked effects.
- If a "logo" is really just set text, it is **type, not a file.** Note the exact face. Shipping
  a raster of set type guarantees it goes soft the first time someone scales it.

## Naming

Deterministic, so the wrong file cannot be picked:

```
{brand}-{lockup}-{colour}.svg    acme-mark-ink.svg
texture-{tone}-{NN}.png          texture-dawn-01.png
```

One canonical file per variant. The favicon is not the logo.

## Image sizes

**Every committed image under 5 MB.** Some design tools silently drop larger files on sync, and a
silently missing asset is the worst failure mode there is.

For opaque photographic assets, **keep full resolution and re-encode as JPEG q=96 4:4:4** rather
than downscaling. Downscaling throws away pixels to solve a file-size problem that re-encoding
solves for free. Anything with transparency stays PNG.

## The one-shot assembly prompt

> You are assembling a code-owned design system repo for **{BRAND}**. Inputs: `{EXPORT_FOLDER}`
> (real logo files), `{FONT_FILES}` (real fonts), and `{SPEC}` (palette sheet + type sheet).
>
> Rules, non-negotiable:
> - Reference real asset files. Never regenerate, redraw, or recolour a logo in code.
> - Use only values from the spec. Never invent or estimate a hex or a size. If sources disagree
>   or a value is missing, STOP and flag it. Do not average and do not guess.
> - Name every asset deterministically, one canonical file per variant.
> - Every `@font-face` src must point at a file that actually exists in the repo.
> - Every committed image under 5 MB.
>
> Steps:
> 1. Rename the export into `assets/` per the convention. Flag any file whose contents do not
>    match its intended name or size.
> 2. Build `tokens/design-tokens.json` + `styles.css` from the spec. Mark every unconfirmed value
>    `$verify`.
> 3. Write `DESIGN.md`, `brand.json`, and `assets/assets.json` with a usage map.
> 4. **Measure the approved references.** For every template, take the real numbers off the
>    reference image instead of eyeballing them. Render headless and diff. Where measurement and
>    spec disagree, encode the spec in the token, reproduce the measurement in the template, and
>    log the conflict in `qa/FINDINGS.md`.
> 5. Build `qa/specimen.html` rendering EVERY asset on light AND dark. Render it and LOOK.
> 6. Output a status: verified vs pending. Do not claim done if anything is invented,
>    placeholdered, or unverified.

## Step 4 is the one people skip

"Looks about right" is not a standard. Render the template, measure the same landmarks in both
it and the reference, and write the numbers into `reference/README.md`:

| Measurement | Reference | Template |
|---|---|---|
| Headline ink top | y = 80 | y = 80 |
| Block height | 577px | 578px |

Now a later change can be diffed against something. Without it, drift is invisible until someone
notices the brand looks off and cannot say why.

## Definition of done

Every token traces to a real spec value. Every asset renders correctly on light and dark. Every
template renders with real fonts and the right variant, and **measurably** matches its reference.
Every open conflict is written down rather than quietly resolved.

Nothing is invented, placeholdered, or half-working. If any of that is not true, it is not done.
