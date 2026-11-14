---
title: Sources
type: source
status: verified
updated: 2026-11-14
sources: [guide, prd, notes-brief, notes-product, notes-ux, design-system, asset-guide, tokens, offers-snapshot, onboarding]
confidence: high
---

The source ledger for the StuDeal wiki. Every key used in a page frontmatter appears here. Keys are stable. Paths are relative to the project root.

## What it is

A table of the project sources used for requirements, product decisions, design, catalog data, and implementation. Locators point to the original file and page or section. The PRD is cited only through page 42 because page 43 contains a private credential.

## Why it matters

A page without a ledger row is an opinion. The ledger lets a later session check a claim without re-reading every document. It also separates the original course brief from the current product decisions and from generated visual references.

## Current state

| Key | Source | Locator | Supports | Confidence |
|---|---|---|---|---|
| `guide` | StuDeal project guidance for coding agents | `StuDeal Project/guide.md`, 657 lines, revision 14 Nov 2026 | Scope, step 0, P0 acceptance, architecture, tests, recovery, submission checklist | high |
| `prd` | StuDeal Product Requirements Document | `StuDeal Project/StuDeal-Product-Requirements-Document.pdf`, pages 1-42, 14 Nov 2026 | Product definition, screens, routes, data model, Ask Mon contract, analytics, risks | high |
| `notes-brief` | Product Dev Meeting Notes | `Original Docs/Product Dev Meeting Notes.pdf`, 16 pages | Course assignment, Apero assessment, submission requirements, team notes | high |
| `notes-product` | Product Dev Meeting Notes (1) | `Original Docs/Product Dev Meeting Notes (1).pdf`, 9 pages | Original UniMon concept, target student, value proposition, feature ideas | medium |
| `notes-ux` | Product Dev Meeting Notes (2) | `Original Docs/Product Dev Meeting Notes (2).pdf`, 11 pages | Original UI and technical spec, screen states, data fields, analytics ideas | medium |
| `design-system` | StuDeal design system package | `StuDeal Project/assets/DESIGN-SYSTEM.md`, version 1.0, 13 Nov 2026 | Brand, typography, layout, components, accessibility, content rules | high |
| `asset-guide` | StuDeal UI and mascot assets | `StuDeal Project/assets/ASSET-GUIDE.md`, 13 Nov 2026 | Asset inventory, screen and mascot usage, offer accuracy caveats | high |
| `tokens` | Design tokens | `StuDeal Project/assets/design-tokens.json` | Colors, type scale, spacing, radius, shadows, breakpoints, control sizes | high |
| `offers-snapshot` | Verified offer snapshot | `StuDeal Project/assets/verified-offer-snapshot.csv`, checked 13 Nov 2026 | 12 offer rows, conditions, source URLs, source-check dates | medium |
| `onboarding` | User-provided coding-agent onboarding prompt | This session, 14 Nov 2026 | Step 0, autonomous execution, Ask Mon tool contract, testing and submission expectations | high |

Source hashes recorded on 2026-11-14:

| Key | SHA-256 |
|---|---|
| `guide` | `3BBE8EDBB04A82997EBCA92E8E16EB86AEE1530260D37399F9E51DAA89B61689` |
| `prd` | `64740A1E60C0D8A98FDC6CDE5DEA222323D004E3A2D10D43899B5CDB4DE76CE3` |
| `notes-brief` | `6A157E13ED0C094974EED0814A09AC974ED4921BF24EEBBC8158D675CCFF34FE` |
| `notes-product` | `F8A306F48B77A268CA613EB75ACC3291E6E05C10396961BAFA359913D48DD9E3` |
| `notes-ux` | `AE8CC7B7702470BC7E052239BC0FC544B880FD4F005193ABF82E8C4F7E864B03` |
| `design-system` | `A54CED9A45DF6AAFF5A1A9EBEAB3FD107311553B5E8DAA4167F76028C50A10EE` |
| `asset-guide` | `CE140FB19B2A2B16382685CBA7B75CC9690688F160F56300DDA376015E4E635F` |
| `tokens` | `96CB5482FFD190B593EA3CB5E44525D01E5370C5B2941FF062E285E718DB7C90` |
| `offers-snapshot` | `ADC05510BD57C1025D404E3347B8A1B8FA7083D30E78CB47B8D123DF238C7992` |

## Open questions

- The asset archive does not contain `assets/studeal-theme.css` or `assets/SEED-IMPORT.md`, although the guide names both. The implementation must derive CSS variables from `design-tokens.json` and use `verified-offer-snapshot.csv` as the seed source.
- The PRD page 43 contains a private OpenRouter key. It is intentionally not summarized, copied, or linked.
- The offer snapshot is dated 13 Nov 2026. Each public offer still needs a source recheck before release.

## Sources

- `guide`: current implementation guidance and acceptance rules.
- `prd`: product requirements and technical contract.
- `notes-brief`: course brief and assessment context.
- `notes-product`: original product concept and feature ambitions.
- `notes-ux`: original UI and technical spec.
- `design-system`: visual and accessibility rules.
- `asset-guide`: asset inventory and usage caveats.
- `tokens`: exact design values.
- `offers-snapshot`: historical offer rows for seeding and review.
- `onboarding`: user instructions for autonomous execution.
