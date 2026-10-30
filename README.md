# hotelink brand system

**hotelink's design system in Git.** An AI with repo access builds on-brand collateral by
referencing the real files here instead of regenerating them.

Built from [Oliver's brand-system template](https://github.com/oliverkoast/brand-system-template)
and **hotelink.ai as shipped on 2026-10-30**: its production CSS, font files, favicon marks,
social card, and connected-systems logos. Hotelink has not supplied a brand book, so the shipped
site is the spec until one arrives (`qa/FINDINGS.md` H-01).

```bash
open qa/specimen.html
```

## What's in here

```
DESIGN.md              The brand contract. Authoritative, read on every run.
CLAUDE.md              Working rules for making a piece.
VOICE.md               How hotelink writes, from the site's own copy.
SKILL.md               Makes the system invocable as a skill.
brand.json             Format menu: canvas + lockup + margins per piece.
assets/assets.json     Approved asset manifest with a usage map.
styles.css             Tokens (light + dark theme), type, lockup.
tokens/                design-tokens.json
fonts/                 Literata + IBM Plex Sans, self-hosted woff2 (+ OFL licences)
assets/logos/          hotelink-mark-green.svg, hotelink-mark-cream.svg
assets/partners/       17 connected-system logos (third-party, see DESIGN.md)
reference/             og-1200x630.jpg, the one approved reference
source/                What was captured from hotelink.ai, and when
templates/             card-16x9, social-1x1
animation/             Logo sting on a deterministic motion runtime
qa/specimen.html       Every asset on light and dark. Look at it.
qa/FINDINGS.md         Open questions for Hotelink. Read before shipping.
kit/                   Render and export scripts, and the template playbook
```

## The brand in four lines

- **Mark:** an H whose crossbar is a gold chain link, usually in a deep-green rounded tile.
- **Wordmark:** lowercase "hotelink", Georgia Bold, tight (-4.67%).
- **Type:** Literata 500 headlines, IBM Plex Sans body. Two-beat headlines, second beat in green.
- **Colour:** warm paper `#F6F2EB`, warm ink `#2A2520`, greens `#2F5C4A` / `#1F3A30`, flat grounds.

## Rendering

- **Chrome** (or set `CHROME=/path/to/chrome`); **ffmpeg** for video; **Python 3 + Pillow** for
  transparent export.

```bash
kit/render.sh templates/card-16x9.html out/card.png 1920 1080
kit/export-frames.sh                 # frames + mp4
BG=none kit/export-frames.sh         # true alpha, for an editor
```

Render on a Mac: the wordmark face (Georgia) is not installed on most Linux machines (H-02).

## Licence

MIT for code and docs. Fonts are SIL OFL. The hotelink marks belong to Hotelink; the partner
logos belong to their owners. See `LICENSE`.
