# StuDeal

## One-paragraph pitch

StuDeal is a Vietnamese, mobile-first web app that helps university students find offers they can actually use, understand the conditions, and keep the useful ones in one place. A guest chooses interests or skips, moves through a short offer deck, saves offers to Pocket, and can ask Mon for a catalog-backed recommendation. There is no account wall, no invented offer, and no claim that a save or click is a purchase.

## Problem, users and product

Vietnamese students see discounts spread across cinema chains, coffee memberships, software education plans, and student packs. The hard part is not finding a logo. It is knowing whether the offer applies, what proof is required, where the official terms live, and when the source was checked. StuDeal is for students who want a fast answer without creating an account.

Implemented and planned product surfaces:

- Home with a Vietnamese value proposition and category entry points.
- Interest onboarding with a 3-category minimum and a Skip path.
- Offer deck with Save, Skip, and Details controls.
- Summary and guest Pocket with unique saved counts.
- Discover with search and category filtering.
- Offer detail with eligibility, source, source-check date, and an official-source action.
- Ask Mon with bounded recent history and a read-only `search_deals` tool.
- Settings, Privacy, and Terms.
- Consent-gated PostHog analytics with a no-op fallback when the key is missing.
- Optional Supabase mode with a public-read RLS predicate and server-side click logging.

The first release uses a reviewed snapshot of 12 offers from `assets/verified-offer-snapshot.csv`, checked on 13 November 2026. In fixture mode the UI shows a visible Vietnamese data-mode warning. A save is not a redemption. A click is not a purchase. A brand is not a partner.

## Launch channel and path to users or revenue

The proposed launch channel is the public web link shared through willing university clubs and student-community administrators. The first hypothesis is organic sharing and return visits. A later revenue hypothesis is affiliate commission or clearly labeled sponsorship, only if real agreements are obtained. No partnership or revenue is claimed.

## Access and setup

App root: `StuDeal Project/`

Prerequisites: Node 24, pnpm 10, and a browser.

```bash
cd "StuDeal Project"
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

Environment names are listed in `.env.example`. Never commit real values. Local development currently uses fixture mode. Supabase mode requires the public URL, publishable key, and server-only secret key. PostHog requires the public project key and host. Ask Mon requires a server-only OpenRouter key and model.

Data modes:

- `NEXT_PUBLIC_STUDEAL_DATA_MODE=fixture`: local snapshot, visible warning, no hosted database. This is the current local mode.
- `NEXT_PUBLIC_STUDEAL_DATA_MODE=supabase`: hosted catalog and click logging. Requires the Supabase variables and applied migration.

If the Supabase or PostHog configuration is absent, the app must stay usable and the relevant integration must be reported as BLOCKED, not faked.

## Tracking plan

See [`StuDeal Project/TRACKING-PLAN.md`](StuDeal%20Project/TRACKING-PLAN.md). PostHog is consent-gated. Autocapture, automatic pageviews, pageleaves, session recording, surveys, and remote feature flags are disabled. No raw search text or chat text is sent. A live event in PostHog project `735307` is not yet observed.

## AI-native workflow

Actual tools used in this build:

- OpenCode coding agent for repository inspection, planning, implementation, and verification.
- The agent separated source ingestion, UI implementation, API and database work, and documentation into bounded workstreams.
- OpenRouter model `google/gemini-2.5-flash` is configured for Ask Mon and was verified with a live completion on 14 November 2026. The app still has a labeled deterministic matching fallback.
- Generated screen concepts and mascot assets came from the supplied asset archive. The screens are references, not live screenshots.

What worked: the source set was complete enough to define the core journey, the design tokens were machine-readable, and the OpenRouter key/model worked. What did not: Docker is unavailable, so the local Supabase stack and pgTAP path cannot run; the archive is missing `studeal-theme.css` and `SEED-IMPORT.md`; the PRD's last page is private and must not be committed.

This section describes the actual build process, not a claim that every integration is live.

## Testing and known limitations

Commands:

```bash
cd "StuDeal Project"
pnpm lint
pnpm typecheck
pnpm test:unit
pnpm build
pnpm test:e2e
pnpm test:a11y
pnpm test:visual
```

Current evidence is recorded in [`StuDeal Project/docs/IMPLEMENTATION-STATUS.md`](StuDeal%20Project/docs/IMPLEMENTATION-STATUS.md). A command is not marked PASS until it has been run.

Known limitations:

- Local Supabase is blocked because Docker is unavailable.
- Hosted Supabase migration, deployment, live PostHog events, video, and Canvas submission are not yet verified.
- The offer snapshot is dated. Each offer must be rechecked before a public release.
- The brand marks in the generated concepts are not approved artwork. The UI uses text brand names.
- Team member names and contributions are TBD.

## Team and contributions

| Member | Role | Actual contribution |
|---|---|---|
| TBD | Product and coordination | TBD |
| TBD | Design and frontend | TBD |
| TBD | Data and integrations | TBD |
| TBD | Testing and submission | TBD |

The team must fill these rows with real names and contributions. Unknown entries must stay visibly TBD.

## Demo video

TBD. A real 2-3 minute recording of the running core flow is required. No video link exists yet.

## Repository layout

- `StuDeal Project/`: Next.js application, assets, tests, and project docs.
- `llm-wiki/`: persistent working wiki for decisions and evidence.
- `Original Docs/`: course and team source PDFs. Kept local and untracked.
