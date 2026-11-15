---
title: Overview
type: overview
status: active
updated: 2026-11-14
sources: [guide, prd, notes-brief, onboarding]
confidence: high
---

StuDeal is a Vietnamese, mobile-first offer discovery web app for university students. A guest picks interests or skips, moves through a short offer deck, saves useful offers, and reviews them in Pocket. Ask Mon is a bounded catalog assistant. The submission also needs a live or clearly labeled fallback mode, default-on analytics with an opt-out, tests, a README, a tracking plan, and a demo.

## What it is

This wiki is the persistent working context for the StuDeal build. It replaces the previous Interactive Black Hole wiki, which the user removed from scope. The app lives in `../StuDeal Project/`. This wiki records what the source documents require, what the current build actually does, and what remains blocked.

## Why it matters

The course brief, the PRD, the original team notes, and the generated design assets do not all say the same thing. The guide resolves the current scope: the course brief controls what is required, the PRD and guide control the chosen implementation, and real code and service checks control what is complete. Keeping those layers separate prevents a plan from being reported as a shipped feature.

## Current state

- The old wiki was deleted on 2026-11-14. This is a new wiki with a fresh schema, index, and log.
- Step 0 source inventory is complete: the guide, PRD pages 1-42, three meeting-note PDFs, design system, asset guide, tokens, and offer snapshot were read or inspected.
- The asset archive was extracted to `../StuDeal Project/assets/`. It contains screens, mascot PNGs, design tokens, the design-system guide, and the offer snapshot.
- The archive does not contain `studeal-theme.css` or `SEED-IMPORT.md`. The implementation will derive CSS from `design-tokens.json` and seed from `verified-offer-snapshot.csv`.
- The Next.js app is initialized in `../StuDeal Project/` with the core routes, fixture catalog, API routes, SQL migration, unit tests, README, tracking plan, and status ledger.
- `pnpm install`, `pnpm typecheck`, `pnpm lint`, `pnpm test:unit`, `pnpm build`, `pnpm test:e2e`, `pnpm test:a11y`, and `pnpm test:visual` pass. Unit tests: 46. E2E: 8. Accessibility scans: 8. Visual baselines: 4.
- The UI redesign pass replaced the generic fonts with bundled Baloo 2 and Be Vietnam Pro, removed the crossed-out home elements, added local brand marks and glass offer cards, made categories prominent, and added a mobile swipe deck.
- The hosted Supabase migration was applied and the seed loaded 12 deals. Vercel production runs with `NEXT_PUBLIC_STUDEAL_DATA_MODE=supabase`. Server-rendered home and detail pages use Supabase. Client pages still read the fixture catalog directly.
- A production outbound POST returned 303 and inserted one `deal_clicks` row. The test row was removed after verification.
- Docker is unavailable on this machine, so the standard local Supabase stack cannot run. Hosted Supabase is the working path.
- Vercel and Supabase CLI authentication were verified. The projects named `FUV-F26-ProductDev-Apero-Submission-Group6` exist.
- Ask Mon returned three cinema recommendations through the live OpenRouter route. A greeting also returned `mode=ai` rather than fallback.
- Analytics are on by default. A production visit produced `landing_viewed` without `$opt_in` in PostHog project `735307`.
- Production is deployed at https://fuv-f26-productdev-apero-submission.vercel.app.
- No video or Canvas submission has been produced.

## Open questions

- The course deadline is Sunday 15 November 2026, 23:59 Vietnam time. The current date is 14 November 2026, so the implementation window is short.
- The PRD page 43 contains a private OpenRouter key. It is stored only in ignored environment files and was not printed or committed.
- The offer snapshot has 12 rows checked on 13 November 2026. The first release should publish only rows rechecked against official sources. If fewer than five can be confirmed, the deck size and limitation must be disclosed.
- The team names and real contributions are not yet known. The README must leave them visibly TBD rather than inventing them.
- Client pages still read the fixture catalog directly. A shared Supabase-backed client loader is not implemented.
- A demo video and Canvas submission remain unverified until produced.

## Sources

- `guide`: current scope, step 0, P0 acceptance, and submission requirements.
- `prd`: product requirements, routes, data model, and Ask Mon contract.
- `notes-brief`: course assignment and assessment context.
- `onboarding`: user instruction to proceed autonomously after setup.
