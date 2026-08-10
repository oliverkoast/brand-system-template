# Making it yours

Northlight is fictional. Ten minutes of find-and-replace and it is your brand.

## 1 · Rename the token prefix

`--brand-` is deliberately generic. Change it to something short and specific to you, so a
stray token from another system is obvious on sight.

```bash
# macOS
grep -rl -- '--brand-' . --exclude-dir=.git --exclude-dir=out \
  | xargs sed -i '' 's/--brand-/--acme-/g'
```

## 2 · Rename the brand

```bash
grep -rl -i 'northlight' . --exclude-dir=.git --exclude-dir=out \
  | xargs sed -i '' 's/Northlight/Acme/g; s/northlight/acme/g; s/NORTHLIGHT/ACME/g'

git mv assets/logos/northlight-mark-ink.svg  assets/logos/acme-mark-ink.svg
git mv assets/logos/northlight-mark-white.svg assets/logos/acme-mark-white.svg
```

## 3 · Replace the assets

- `assets/logos/` — your real files, one per approved variant. **SVG if you possibly can.**
- `assets/textures/` — your real texture set, or delete the folder and the rules about it if
  your brand does not have one.
- `fonts/` — your real font files, and update `fonts/fonts.css` to match. If they are licensed,
  **confirm the licence covers web and email embedding before anything ships.**

## 4 · Replace the values

- `tokens/design-tokens.json` and `styles.css` — your palette and type, from your source
  document. Not sampled off a screenshot.
- `DESIGN.md` — your rules. The structure transfers; the specifics do not.
- `VOICE.md` — how you actually write.
- `brand.json` — your real formats.

## 5 · Clear the examples

`qa/FINDINGS.md` ships with worked examples marked EXAMPLE. Delete them and write your own.
Keep F-04 and F-05, which are real and apply to any repo built from this.

## 6 · Check it

```bash
open qa/specimen.html
```

Every asset on light and dark, both fonts real, nothing blank or wrong-variant. If something
looks wrong there it is a defect to fix or flag, not to patch in whatever layout surfaced it.
