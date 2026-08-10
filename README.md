# Brand System Template

**A design system that lives in Git, so an AI can build on-brand collateral by referencing your
real files instead of regenerating them.**

Clone it, swap in your assets, and Claude (or any model with repo access) produces work that is
on-brand because it is *structurally unable* to be otherwise, not because you reminded it.

It ships with a **fictional sample brand called Northlight** so everything runs immediately.
Open `qa/specimen.html` and you will see real fonts, real logos, real textures. Then replace them
with yours.

```bash
git clone https://github.com/oliverkoast/brand-system-template.git my-brand
cd my-brand
open qa/specimen.html
```

---

## Why a repo instead of a PDF brand guide

**Every value has one home.** `#F6F3EE` is `--brand-paper`, defined once. In a PDF that hex lives
in a picture of a swatch, and in practice it lives re-typed in forty files.

**The rules sit next to the files they govern.** `DESIGN.md` is read on every run, so the
guardrails apply without anyone remembering to restate them.

**Disagreements get logged instead of guessed.** When your type sheet and your shipped artwork
disagree, that becomes a finding with measurements, not a silent decision. This is the part that
actually protects a brand.

**You can diff a brand.** Every change to a token, a rule, or an asset has an author, a date, and
a reason.

**It runs.** The specimen renders. The templates render. The animation exports to video. A PDF
does none of that.

---

## The core principle

Canonical files are **referenced, never regenerated.**

A logo is a real file with a clear name, placed as-is. There is no `variant` knob to compute and
no colour prop. You name the format and the file is selected. That is what makes the
wrong-asset and hardcoded-colour bugs *structurally impossible* rather than merely discouraged.

The same rule runs all the way through:

- **Textures are files, not CSS gradients.** A CSS gradient has no grain and no optical break.
- **Fonts are real files**, self-hosted, with their licences. Nothing loads from a third-party CDN.
- **The animation composites the real logo over the real texture.** Nothing is traced, which is
  why it cannot drift.
- **Numbers in a template should be measured from your approved reference**, not eyeballed.

---

## What's in here

```
DESIGN.md              The brand contract. Authoritative, read on every run.
CLAUDE.md              Working rules: what to do when making a piece.
VOICE.md               How the brand writes.
SKILL.md               Makes the system invocable as a skill.
brand.json             Format menu: canvas + lockup + margins per piece.
assets/assets.json     Approved asset manifest with a usage map.
styles.css             Tokens, type, helpers.
tokens/                design-tokens.json
fonts/                 Real self-hosted variable fonts (+ OFL licences)
assets/logos/          Real logo files, one per approved variant
assets/textures/       The texture set
templates/             Remixable, on-brand starting points
animation/             A deterministic logo sting on a shared motion runtime
qa/specimen.html       Every asset on light and dark. Look at it.
qa/FINDINGS.md         Open defects and unresolved conflicts
kit/                   Export scripts and the playbook
.github/workflows/     A brand regression check that runs on every push
```

---

## The three ideas worth stealing

### 1. Selection, not generation

`brand.json` and `assets/assets.json` are menus. You name a format; the correct canvas, lockup,
and margins are selected. There is no computed variant, so "wrong logo colour" stops being a
class of mistake.

The `usage` map goes further and encodes art direction as data: a given slot may only draw from
a listed set. **A file that is not in the manifest is not selectable**, and that is intentional.

### 2. Empty slots that refuse

`brand.json` lists `banner-3x1` with `template: null`. Ask for one and the system should say *no
approved reference exists, here is what I need* rather than improvising.

An improvised layout becomes the de facto standard the moment it ships once. **A slot that
refuses is worth more than a plausible guess.**

### 3. A findings log

`qa/FINDINGS.md` is where conflicts go to stay visible. Two sources disagree, an asset is
missing, a rule can't be satisfied: write it down with the measurements and leave it open.

Do not average two values. Do not pick one quietly. **A logged conflict is the single most
valuable thing this repo produces**, because it is the one thing a model cannot decide for you.

---

## Make it yours

1. **`kit/RENAME.md`** — find-and-replace Northlight for your brand.
2. **`kit/NEW-BRAND.md`** — the full playbook, including the export SOP that is where the time
   actually goes.
3. Drop your approved artwork into `reference/`, then **measure the templates against it.**
   That step is the one people skip, and it is the difference between "looks about right" and a
   system you can trust.

---

## Requirements

Nothing to install for the docs and templates. For rendering and export:

- **Chrome** (or set `CHROME=/path/to/chrome`)
- **ffmpeg**, only for the video step: `brew install ffmpeg`
- **Python 3 with Pillow**, only for the transparent export: `pip3 install --user Pillow`

```bash
kit/render.sh templates/card-16x9.html out/card.png 1920 1080
kit/export-frames.sh                 # frames + mp4
BG=none kit/export-frames.sh         # true alpha, for an editor
```

---

## Licence

**MIT** for the code, docs, and sample assets. Do what you like.

The two typefaces in `fonts/` are third-party, licensed separately under the **SIL Open Font
License**, and their licences ship alongside them.

Northlight is fictional. Any resemblance to a real brand is coincidental, and you should replace
it anyway.
