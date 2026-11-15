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
- PostHog analytics on by default, with an explicit opt-out in Settings and a no-op adapter when the key is missing.
- Supabase mode with a public-read RLS predicate and server-side click logging.
- Bundled Baloo 2 and Be Vietnam Pro fonts, glassmorphism offer cards, local brand marks, and a mobile swipe deck.
- Persistent top navigation and a mobile tab bar, so Ask Mon is one tap from every surface.
- Ask Mon model selector, server-side model allowlist, and a daily source-recheck cron.

The catalog holds 37 deals across 27 brands in six categories, with source-check dates and enrichment fields. Local development uses fixture mode; Vercel production uses Supabase mode. A save is not a redemption. A click is not a purchase. A brand is not a partner.

## Launch channel and path to users or revenue

The proposed launch channel is the public web link shared through willing university clubs and student-community administrators. The first hypothesis is organic sharing and return visits. A later revenue hypothesis is affiliate commission or clearly labeled sponsorship, only if real agreements are obtained. No partnership or revenue is claimed.

## Access and setup

Live URL: https://fuv-f26-productdev-apero-submission.vercel.app

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

See [`StuDeal Project/TRACKING-PLAN.md`](StuDeal%20Project/TRACKING-PLAN.md). PostHog analytics are on by default and can be turned off in Settings. Autocapture, automatic pageviews, pageleaves, session recording, surveys, and remote feature flags are disabled. No raw search text or chat text is sent. Default-on and consented events were observed in PostHog project `735307`.

## AI-native workflow

The work ran in five phases. This is the actual sequence, not a tool list.

**Phase 0, team meeting.** The five of us met first and agreed the rough structure: the problem, the target student, the swipe to save loop, the surfaces that would exist, and what to cut. Nothing was generated before that agreement.

**Phase 1, PRD and first assets (GPT-6 Luna at max reasoning effort).** We used ChatGPT with GPT-6 Luna to draft the PRD from the meeting output: the problem statement, the beachhead segment, the feature list, the offer-card copy, the empty and error states, and prompts for the first visual references. It is a high-volume drafting model, which suited a long document with many small sections. The team then edited the draft by hand, cut features that had no evidence behind them, and reconciled the visual references with the supplied asset archive.

**Phase 2, proofing (GPT-6.1 Terra at max reasoning effort).** A second pass with GPT-6.1 Terra, chosen for document and visual review, ran the PRD against the assignment brief and the meeting notes. It flagged unsupported claims, contradictions between sections, missing states, and places where the spec promised behavior the team had not decided to build. The output was a correction list, not new scope. The team applied the corrections and froze the spec.

**Phase 3, development.** Only after the spec was frozen did implementation start, in vertical slices: the guest journey, the catalog and search, the Supabase integration, the Ask Mon route, then tests and deployment. Each slice ended with a command result rather than a claim.

**Phase 4, the working knowledge base.** `../llm-wiki/` held the ingested sources, an index, a sources ledger, and an append-only log. Every session started by reading it and every milestone ended by appending to it with the command that proved the claim. That is how a claim like "37 offers are live" stayed attached to the check that produced it, and how the work survived context loss across long sessions.

**What did not work.** The useful pattern was asking the assistant to attack the build instead of extend it. That is how we found a free model inventing an offer that was not in the catalog, an unknown deal slug returning HTTP 200, Ask Mon's composer sitting below the fold on a phone, and raw database enums leaking into Vietnamese copy. Each one was fixed and then guarded by a test or a doc line. Separately: Docker is unavailable, so the local Supabase stack and pgTAP tests are blocked; the asset archive is missing two files it was supposed to contain; one model probe had to be deleted because automated tests must never call a live provider.

The detailed activity record, including model evaluation, failures and corrections, is in [`StuDeal Project/docs/AI-WORKFLOW.md`](StuDeal%20Project/docs/AI-WORKFLOW.md). Live integration results are in [`StuDeal Project/docs/IMPLEMENTATION-STATUS.md`](StuDeal%20Project/docs/IMPLEMENTATION-STATUS.md).

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

Verified evidence:

- `pnpm typecheck`, `pnpm lint`, `pnpm test:unit` (61 tests), `pnpm build` (16 routes), `pnpm test:e2e` (24 tests), `pnpm test:a11y` (16 scans), and `pnpm test:visual` (8 baselines) pass.
- The hosted Supabase migration applied and the seed loaded 37 public rows across 27 brands and 6 categories.
- Production runs in Supabase mode. A production outbound POST returned 303 and inserted one `deal_clicks` row, which was removed after verification.
- The production deployment is live at the URL above.
- Ask Mon returned three cinema recommendations through the live OpenRouter route, and a greeting returned a live `ai` answer instead of fallback.
- A default-on `landing_viewed` event was observed in PostHog project `735307` without a new `$opt_in` event.

Known limitations:

- Local Supabase is blocked because Docker is unavailable.
- Every route reads the hosted catalog in production: server components through `getCatalog()`, client pages through the `useCatalog` hook. The bundled fixture is only the first paint and the offline fallback.
- The daily cron checks source URLs for deals already in the catalog. It does not discover new brands or parse new promotions.
- The offer snapshot is dated. Each offer must be rechecked before a public release.
- Brand marks are used for identification only. StuDeal claims no partnership or endorsement. Sources and licenses are recorded in [`StuDeal Project/docs/ASSET-SOURCES.md`](StuDeal%20Project/docs/ASSET-SOURCES.md).
- Team member names and contributions are recorded below.
- The demo video and Canvas submission are not yet produced.

## Team and contributions

| Member | Role | Actual contribution |
|---|---|---|
| Ngô Võ Minh Thư | UI/UX, User Analytics | UI/UX and user analytics |
| Trần Tiến Lợi | UI/UX, User Analytics | UI/UX and user analytics |
| Lê Thanh Nghi | Problem-Solution brainstorming, Customer Journey Construction, UI/UX, Video filming | Problem-solution brainstorming, customer journey construction and UI/UX; demo video filming |
| Võ Anh Thư | Problem-Solution brainstorming, Customer Journey Construction, UI/UX | Problem-solution brainstorming, customer journey construction and UI/UX |
| Bùi Trí Anh Phát | End-to-end implementation | End-to-end implementation of the application |

## Demo video

A 2 to 3 minute recording of the core flow was filmed by Lê Thanh Nghi and submitted together with the Google Drive folder that accompanies this repository. That folder also holds a Google Doc with the repository link and this README. The shot list is in [`StuDeal Project/docs/VIDEO-SCRIPT.md`](StuDeal%20Project/docs/VIDEO-SCRIPT.md) and the pre-flight checklist in [`StuDeal Project/docs/VIDEO-HANDOFF.md`](StuDeal%20Project/docs/VIDEO-HANDOFF.md).

## Repository layout

- `StuDeal Project/`: Next.js application, assets, tests, and project docs. Rubric mapping: [`StuDeal Project/docs/RUBRIC-TRACKER.md`](StuDeal%20Project/docs/RUBRIC-TRACKER.md).
- `llm-wiki/`: persistent working wiki for decisions and evidence.
- `Original Docs/`: course and team source PDFs. Kept local and untracked.
