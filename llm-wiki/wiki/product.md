---
title: Product
type: product
status: active
updated: 2026-11-14
sources: [prd, design-system, asset-guide, offers-snapshot, notes-product]
confidence: high
---

StuDeal helps Vietnamese university students find offers they can actually use, understand the conditions, and keep the useful ones in one place. The product is a responsive web app, designed phone first, with no account wall and no claim that a saved offer is a redemption.

## What it is

The core journey is: home, interests or Skip, offer deck, save or skip, summary, Pocket, offer detail, and the official source. Discover and Ask Mon provide alternate paths. The UI is Vietnamese. The mascot is Mon, a purple drawstring pouch.

The offer card contract is structured, not generated prose. It shows the brand text, exact benefit, eligibility and material conditions, source, source-check date, and official destination. A save is local state. A click is an outbound intent, not a purchase. A brand is not a partner unless a real agreement exists.

## Why it matters

Students do not need another list of vague discounts. They need to know whether an offer applies to them, what proof is required, where the official terms live, and when the source was checked. The product's trust value comes from showing those conditions plainly and refusing to invent prices, eligibility, expiry, or partnerships.

## Current state

- Product definition and screens are specified in `prd` pages 4-22.
- The visual system is defined in `design-system` and `tokens`: grape purple `#5B3DF5`, yellow `#FFD23F`, pink `#FF6FA8`, mint `#22C79A`, Baloo 2 for display, Be Vietnam Pro for body.
- The archive contains 11 desktop concept screens and 10 Mon poses. The screens are references, not live UI.
- The offer snapshot contains 12 rows across cinema, coffee, software, cloud, and learning benefits. Several are age-based or referral offers, not student-only.
- No application screen has been implemented yet.
- The first build should use five reviewed offers. The deck still supports up to ten.
- The offer snapshot is dated 13 November 2026. Each selected offer needs a source recheck before release.

## Open questions

- Which five offers can be rechecked quickly enough for the first submission? Cinema and software offers have the clearest official pages.
- Should the first release show all 12 snapshot rows or only the reviewed subset? The PRD says 3-5 genuine current offers for the first submission.
- The archive is missing `studeal-theme.css` and `SEED-IMPORT.md`. The implementation will use the tokens JSON and the CSV directly.
- The screen concepts use approximate brand marks. The build must use plain text brand names unless approved logo assets exist.
- The team has not supplied real names or contributions. The README must leave them TBD.

## Sources

- `prd`: product definition, screens, routes, and acceptance criteria.
- `design-system`: brand, layout, components, accessibility, and content rules.
- `asset-guide`: asset inventory and offer accuracy caveats.
- `offers-snapshot`: historical offer rows and conditions.
- `notes-product`: original UniMon concept and feature ambitions.
