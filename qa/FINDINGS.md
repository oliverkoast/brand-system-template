# QA Findings

Open defects and unresolved conflicts. Everything here is a **question for a human**, not a gap
for Claude to fill. Nothing below has been silently resolved.

Status key: **OPEN** needs a decision or a re-export. **NOTED** understood, no action needed.
**RESOLVED** decided, with the decision and its consequences recorded.

Hotelink entries are H-xx. F-04 to F-06 are carried over from the template and still apply.

---

## H-01 · No brand book: the live site is the spec · OPEN

Every token comes from hotelink.ai's production CSS (`:root` and `.v-c`), captured 2026-10-30.
That is real, shipped data, not a sample off a screenshot, but it is not a palette sheet either:
a site can carry one-off values a designer never approved.

**Action:** ask Hotelink for the palette and type sheet, then diff. Until then the token file
carries `$verify` at the top.

---

## H-02 · Wordmark face is Georgia, a system font with no file · OPEN

The site sets "hotelink" as live text in `--font-wordmark: Georgia, "Times New Roman", serif`,
700, -0.0467em. Georgia is a Microsoft font: it is installed on macOS and Windows but **not**
on most Linux machines, and its licence does not cover redistributing the file in this repo.

Consequence: every render on a machine without Georgia (CI, a Linux export box) draws the
wordmark in a fallback serif. The renders in this branch were made on Linux and show exactly
that.

**Decision needed:** (a) license Georgia for embedding, (b) get the wordmark as an SVG outline
from whoever drew it, or (c) choose an OFL face. (b) is the usual answer. Do not quietly
substitute Literata, which is a different face.

---

## H-03 · Name casing: "hotelink" vs "Hotelink" · OPEN

The site's wordmark, title tags, and running copy all use lowercase **hotelink**. Internal docs
and this project use "Hotelink". The wordmark is unambiguous (lowercase). Running copy is not.

**Decision needed:** is lowercase the name in sentences too, or only in the wordmark?

---

## H-04 · Which theme leads: light or dark · OPEN

Two sources disagree.

- Light: `:root` palette, `meta theme-color #f6f2eb`, the social card's left half, the ad's
  paper grounds.
- Dark: the live page renders with `<body class="v-c">`, the dark theme, so visitors today see
  a `#1E2723` ground. The ad's end card is a deep green ground.

Handled by: light is the default role set; dark ships verbatim as `.hl-theme-dark`. Nothing was
averaged.

**Decision needed:** which one is the brand's default ground for collateral?

---

## H-05 · Two mark colours live outside the palette · NOTED

`#CDB68A` (the link-shaped crossbar) and `#F3EAD9` (cream bars) appear only inside the logo
files and as hardcoded hex in the site CSS (`.brand-mark`, `.demo-brand-mark`), not in `:root`.
They are recorded as `logo-color` tokens, explicitly not for layout. `#CDB68A` is also close to,
but not the same as, the `gold` token `#9A7B45`. Do not merge them.

---

## H-06 · Dark-header mark has no file · OPEN

On the dark theme the site's header tile is paper `#F6F2EB` with bars drawn in currentColor
`#1E2723` (rail). The nearest file is `hotelink-mark-green.svg`, whose bars are `#1F3A30`.
The two greens differ by one step per channel; visually identical, technically not the same
asset.

Handled by: `.hl-lockup--on-dark` uses the green file. **Action:** confirm that is acceptable,
or supply a rail-bar file. Do not set a `fill` in code.

---

## H-07 · Social-card diagram has no source file · OPEN

The right half of `reference/og-1200x630.jpg` (system boxes PMS, POS, Sales, Revenue,
Operations; gold connector lines; concentric rings; central tile) exists only inside that JPEG.
It is why `og-1200x630` has a reference but `template: null`.

**Action:** get the source (Figma frame or SVG). Do not trace it from the JPEG.

---

## H-08 · Third-party logos: rights and "partner" wording · OPEN

The 17 logos in `assets/partners/` are other companies' trademarks, taken from the site's
"Connected systems" strip. The site's nav calls that area "Partners", but the strip label says
"Connected systems" and the section under `#partners` is about Proper Hospitality, not these
vendors.

Handled by: manifested with a rights note each, usage limited to a "Connected systems" strip.
**Decision needed:** does Hotelink have formal partnerships with any of them, and permission to
show each mark outside its own site (decks, ads)? Until confirmed, use them nowhere but a
strip that mirrors the site.

---

## H-09 · Five partner logos are raster · NOTED

PNG with native sizes: ALICE 471x119, Coyle 200x200, Revinate 600x94, STR 1181x1181,
SynXis 308x140. Each native width is a hard ceiling. At strip height (28 to 40px) all are fine;
at deck or print size Coyle and SynXis will go soft first. If they are needed large, get SVGs
from the vendors' press kits.

---

## H-10 · Headline tracking and wordmark weight: CSS vs social card · OPEN

Measured against `reference/og-1200x630.jpg`:

- **Headline tracking.** The site CSS sets `h1` with no `letter-spacing`. "Your hotel.
  Connected." in the social card is visibly tighter than untracked Literata 500 at the same
  size (compare section 4 of the specimen with section 6).
- **Wordmark weight.** The CSS sets the wordmark at **700**. In the social card it reads as a
  regular weight.

Handled by: tokens and templates follow the CSS (no tracking, 700). Neither value was guessed
toward the image.

**Decision needed:** was the social card set by hand in a design tool, or is the CSS stale?
Measure from the card's source file once H-07 supplies it.

---

## H-11 · Ad green vs site green · OPEN

The 1:48 ad's end card green was sampled from video stills at roughly `#2A5446` to `#21493B`
(a gradient). That is a compression-affected sample, not a spec, and it matches neither
`accent` `#2F5C4A` nor `accent-strong` `#1F3A30`.

**Decision needed:** is the ad's green an intentional gradient between the two tokens, or
drift? Do not add a token for it.

---

## F-04 · CSS `mask-image` renders nothing in headless Chrome · NOTED, worked around

Compositing a texture into a logo's alpha with CSS `mask-image` renders correctly in a normal
browser window and produces **completely empty frames** in headless Chrome, which is what the
frame exporter uses.

Worked around by compositing on `<canvas>` with `globalCompositeOperation = 'destination-in'`,
which renders identically on screen and headless. See `animation/ds-motion.js`.

**Do not "simplify" the animation back to a CSS mask.** It will look fine in the browser and
export blank video.

---

## F-05 · Chrome `--screenshot` does not preserve alpha · NOTED, worked around

`--default-background-color=00000000` has no effect on the saved PNG on macOS, in either headless
mode. Output is always opaque.

Worked around in `kit/export-frames.sh`: with `BG=none`, each frame is rendered over black and
over white and `kit/unmatte.py` solves for alpha exactly (`a = 1 - (Cw - Ck)`, `F = Ck / a`).
Exact arithmetic, not an approximation. Costs two renders per frame, which is the right trade
against shipping an export that silently produces opaque frames.

---

## F-06 · Only one approved reference · OPEN

`reference/` holds one approved reference: the site's social card. There is none for 16:9, 1:1, the sting, or the banner.

The card-16x9 and social-1x1 templates borrow the social card's left-half layout, scaled, but
are not measured against a reference of their own. Nothing can be diffed against them yet.

**Action:** get approved 16:9 and 1:1 pieces (a deck title slide, an Instagram post) into
`reference/`, then follow step 4 of `kit/NEW-BRAND.md`.
