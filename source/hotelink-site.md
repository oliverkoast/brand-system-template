# Source capture: hotelink.ai

Captured 2026-10-30 from https://hotelink.ai/ as extracted text. This is the evidence the voice
guide and partner list are built from. It is **not** a visual spec: no CSS, font files, or logo
files could be retrieved (see `qa/FINDINGS.md` H-01).

## Page metadata

- Title: "The data platform for independent hotels."
- OG / title tag: "Your hotel. Connected."
- `theme-color`: `#f6f2eb` (the only colour value exposed in metadata)
- Social image: `https://hotelink.ai/og-hotelink-v2.jpg` (1200x630)
- Header: wordmark "hotelink", with "Built with Proper Hospitality"

## Section order

1. Hero: "Every system your hotel runs, finally in one place."
2. Interactive dashboard preview, labelled "Sample data"
3. Connected systems logo strip (`#partners`)
4. Use-case questions: reviews, sales, PMS, revenue, POS, CRM
5. "Shaped inside Proper Hospitality."
6. "Careful by default." trust points
7. Common questions
8. Contact: "See your own hotel's data in hotelink." · sales@hotelink.ai

## Connected systems (`#partners`), as listed

| System | Logo file on site |
|---|---|
| Infor HMS | /logos/infor.svg |
| Aven Hospitality (SynXis) | /logos/synxis.png |
| Toast | /logos/toast.svg |
| OpenTable | /logos/opentable.svg |
| Tripleseat | /logos/tripleseat.svg |
| Amadeus Delphi, Demand360 | /logos/amadeus.svg |
| Salesforce | /logos/salesforce.svg |
| Duetto | /logos/duetto.svg |
| Lighthouse | /logos/lighthouse.svg |
| STR | /logos/str.png |
| Revinate | /logos/revinate.png |
| Tripadvisor | /logos/tripadvisor.svg |
| ALICE | /logos/alice.png |
| UKG | /logos/ukg.svg |
| Coyle Hospitality | /logos/coyle.png |
| Forbes Travel Guide | /logos/forbes.svg |
| Slack | /logos/slack.svg |

Third-party logos are **not** Hotelink brand assets. They belong in a separate `partners`
manifest with a rights note each, and are used only as the site uses them (a neutral logo strip).

## CTAs

"Book a walkthrough" (#contact) · "Sign in" (app.hotelink.ai)
