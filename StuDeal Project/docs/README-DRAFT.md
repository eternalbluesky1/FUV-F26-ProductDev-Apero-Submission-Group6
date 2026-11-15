# StuDeal

> Draft source. The canonical submission README is `../README.md`, and current evidence lives in `IMPLEMENTATION-STATUS.md`. Numbers in this draft are from the 14 November snapshot and were superseded on 15 November (37 deals, 61 unit tests, 24 e2e, 16 a11y scans, 8 visual baselines, 16 build routes, ERNIE default model).

## 1. One-paragraph pitch

StuDeal is a Vietnamese, mobile-first web app that helps university students find offers they can actually use, understand the conditions, and keep the useful ones in one place. A guest chooses interests or skips, moves through a short offer deck, saves offers to Pocket, searches and filters in Discover, and can ask Mon for a recommendation grounded in the same catalog. Every offer shows its official source and the date the source was checked. There is no account wall, no invented offer, and no claim that a save or a click is a purchase.

## 2. Problem, users, and product

Vietnamese students see discounts scattered across cinema chains, coffee memberships, software education plans, student packs, shopping vouchers, and transport fares. Finding a logo is easy. Knowing whether the offer applies, what proof is required, where the official terms live, and when the source was last checked is the hard part.

StuDeal is for students in Ho Chi Minh City, especially years 2 to 4, who want a fast answer without creating an account or submitting student identity documents. The product keeps the core journey guest-only: interests, deck, summary, Pocket, Discover, offer detail, and Ask Mon all work in the browser.

The assignment slice deliberately excludes sign-in, student verification, reminders, watch orders, QR passes, XP, and payments. Those are roadmap items, not hidden features.

## 3. Features

Implemented surfaces:

| Surface | What works |
|---|---|
| Home | Vietnamese value proposition, category entry points, featured offers, and a start action without login |
| Interests (`/start`) | Six categories, a three-category minimum to continue, and a Skip path that records no interests |
| Deck (`/deck`) | Up to 10 offers, Save, Skip, Details, progress, keyboard and button controls, and pointer swipe on mobile |
| Summary (`/summary`) | Unique saved count, free versus discount split, and an explicit statement that the number is not money |
| Pocket (`/pocket`) | Guest saved list, remove, unavailable-offer state, and persistence across reload in the same browser |
| Discover (`/discover`) | Accent-insensitive search, including `đ`/`Đ`, category filters, and current-only results |
| Ask Mon (`/ask-mon`) | Multi-turn Vietnamese chat, bounded history, safe Markdown, a read-only `search_deals` tool, up to three catalog-backed cards, and a labeled fallback |
| Offer detail (`/deal/[slug]`) | Eligibility, important conditions, redemption steps, official source, source-check date, next review date, and relationship label |
| Outbound | Native form POST to `/api/deals/[id]/outbound`, server validation, one Supabase `deal_clicks` row on accepted intent, then 303 to the official destination |
| Settings (`/settings`) | Clear local data and turn anonymous analytics on or off |
| Privacy and Terms | Plain-language pages describing local storage, analytics, outbound logging, offer limits, and non-affiliation |
| Analytics | Twelve canonical PostHog events, enabled by default with an opt-out, and a no-op adapter when the key is absent |
| Supabase | Public-read catalog through RLS, server-only click insert, migrations, and seed |

Catalog state: `lib/catalog-data.ts` and `supabase/seeds/seed.sql` currently contain 33 offers across cinema, food, software, learning, shopping, and transport. Every fixture row records `source_checked_at = 2026-11-14` and `relationship_label = "Không có quan hệ đối tác"`.

The first pass used a 12-row reviewed snapshot from `assets/verified-offer-snapshot.csv`, checked on 13 November 2026. The implementation ledger still records 12 public rows from that earlier pass. The catalog has since grown, so the hosted row count must be re-verified before submission. Do not quote a count you have not checked.

A save is not a redemption. A click is not a purchase. A brand is not a partner.

## 4. Launch channel and path to users or revenue

Proposal only, not an existing agreement.

- Launch channel: a public web link shared through willing university clubs and student-community administrators.
- First hypothesis: organic sharing and return visits from students who already look for deals in group chats and Facebook groups.
- Later revenue hypothesis: affiliate commission or clearly labeled sponsorship, and only if real agreements are obtained.
- No outreach has been sent. No partnership, sponsorship, commission, or revenue is claimed.

The product is a web app, so the launch channel is the open web. No app-store review is required for this slice.

## 5. Access and setup

Live URL: https://fuv-f26-productdev-apero-submission.vercel.app

App root: `StuDeal Project/`

Prerequisites: Node 24, pnpm 10, and a current browser.

```bash
cd "StuDeal Project"
pnpm install
pnpm dev
```

Open `http://localhost:3000`. Production build:

```bash
cd "StuDeal Project"
pnpm build
pnpm start
```

Environment variable names are listed in `.env.example`. Values are never committed.

```text
NEXT_PUBLIC_STUDEAL_DATA_MODE
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
SUPABASE_SECRET_KEY
NEXT_PUBLIC_POSTHOG_KEY
NEXT_PUBLIC_POSTHOG_HOST
OPENROUTER_API_KEY
OPENROUTER_MODEL
```

`SUPABASE_SECRET_KEY` and `OPENROUTER_API_KEY` are server-only. They must never carry a `NEXT_PUBLIC_` prefix or appear in a browser bundle.

Data modes:

- `NEXT_PUBLIC_STUDEAL_DATA_MODE=fixture`: local snapshot from `lib/catalog-data.ts`. No hosted database. This is the local default.
- `NEXT_PUBLIC_STUDEAL_DATA_MODE=supabase`: hosted catalog and server-side click logging. Requires the Supabase variables and an applied migration.

Production is configured with `supabase`. The mode is an environment setting, not a code-level production guard, so check the deployed value before recording a demo. If Supabase or PostHog configuration is absent, the app must stay usable and the missing integration must be reported as blocked, not faked.

<!-- TODO(team): confirm the live Vercel deployment still uses NEXT_PUBLIC_STUDEAL_DATA_MODE=supabase after the final code changes. -->

## 6. Tracking plan

Full plan: [`TRACKING-PLAN.md`](../TRACKING-PLAN.md).

Analytics are on by default, with an explicit opt-out in Settings. The product owner directed this on 2026-11-14, replacing the earlier consent-gated rule in `guide.md`. Disabling analytics does not block the product. Autocapture, automatic pageviews, pageleaves, session recording, surveys, and remote feature flags are disabled. No raw search text, chat text, email, student ID, or other sensitive data is sent.

Canonical events implemented in code:

| Event | What it measures |
|---|---|
| `landing_viewed` | Entry into the product |
| `interests_saved` | Onboarding completed with at least three categories |
| `interests_skipped` | Explicit skip path |
| `deck_card_action` | Save or skip decision, with deal ID and position |
| `deal_saved` | First time an offer becomes saved |
| `deck_completed` | Deck exhausted, with cards seen and unique saved count |
| `offers_summary_shown` | Summary rendered |
| `search_performed` | Discover search submitted, with query length and result count |
| `ai_query_submitted` | Ask Mon request started |
| `ai_answer_shown` | Ask Mon response rendered, with mode, latency, and safe error code |
| `deal_detail_viewed` | Offer detail view, with source surface |
| `outbound_offer_clicked` | Best-effort click intent from the native outbound form |

The private Supabase `deal_clicks` row is a separate operational record. It is written server-side before the redirect and exists even when a browser blocks analytics. It records an outbound attempt, not a redemption. The two records must not be joined into a guaranteed funnel.

PostHog events were observed in project `735307` on 2026-11-14. Recorded counts are in `TRACKING-PLAN.md`; they are a snapshot, not a live dashboard.

## 7. AI-native workflow

Full report: [`docs/AI-WORKFLOW.md`](docs/AI-WORKFLOW.md).

In short: an OpenCode coding agent handled repository inspection, planning, implementation, refactoring, and verification. Parallel background subagents covered independent UI workstreams: home and header, offer cards and brand assets, Discover and Summary, swipe deck, Ask Mon, and analytics. A web-research agent used Exa search and page fetch to locate current official offer pages. A model-probing script measured tool-calling reliability across candidate OpenRouter models before the live route was fixed to `google/gemini-2.5-flash`.

Three decisions came from observed failures rather than preference: Ask Mon keeps a labeled deterministic fallback because a plain-text greeting was once misclassified as a provider failure; the click path was fixed after an invalid Supabase secret key and a production fixture-mode setting silently prevented click records; analytics moved to default-on with an opt-out by explicit product-owner instruction.

Docker is unavailable in this environment, so the local Supabase stack and pgTAP did not run. Hosted Supabase is the working path.

## 8. Testing and known limitations

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

Current pass state, recorded in [`docs/IMPLEMENTATION-STATUS.md`](docs/IMPLEMENTATION-STATUS.md) on 2026-11-14 and not re-run for this draft:

- `pnpm lint`: pass, no warnings or errors.
- `pnpm typecheck`: pass.
- `pnpm test:unit`: pass, 46 tests.
- `pnpm build`: pass, 15 routes.
- `pnpm test:e2e`: pass, 8 tests across mobile and desktop.
- `pnpm test:a11y`: pass, 8 scans, no serious or critical violations.
- `pnpm test:visual`: pass, 4 reviewed baselines across mobile and desktop.
- Hosted Supabase migration and seed: applied; the ledger records 12 public rows, while the current seed contains 33 rows. Re-verify the hosted count.
- Production outbound POST: returned 303 and inserted one `deal_clicks` row; the test row was deleted after verification.
- Live Ask Mon: `mode=ai`, three cinema recommendations.
- Live PostHog: default-on `landing_viewed` observed without `$opt_in`.

Known limitations:

- Docker is unavailable, so the local Supabase stack and pgTAP path are blocked. Hosted Supabase is the tested path.
- Client pages (`start`, `deck`, `summary`, `discover`, `pocket`, `ask-mon`) read the fixture catalog directly. Server-rendered home and detail paths use Supabase. This split must be fixed before claiming a fully hosted catalog.
- The catalog is a dated snapshot. `source_checked_at` is 2026-11-14. Every offer must be rechecked before a public release.
- The hosted row count is inconsistent with the 12-row ledger entry; the current seed has 33 rows.
- A persistent on-screen fixture badge is not implemented in the current UI. Terms describes demo-data labeling, but a local recording must disclose fixture mode in the narration.
- Brand marks are used for identification only. StuDeal claims no partnership or endorsement. Sources and licenses are in [`docs/ASSET-SOURCES.md`](docs/ASSET-SOURCES.md).
- There is no human user study, no completed Apero gate review, and no confirmed Canvas submission.
- Team member names, contributions, and the demo video remain TBD.

<!-- TODO(team): re-run the full command list above after the final code changes and update the pass state with the actual result. -->

## 9. Team and contributions

| Member | Role | Actual contribution |
|---|---|---|
| TBD | Product and coordination | TBD |
| TBD | Design and frontend | TBD |
| TBD | Data and integrations | TBD |
| TBD | Testing, video, and submission | TBD |

Unknown entries must stay visibly TBD. Do not invent a name, a role, or a contribution.

<!-- TODO(team): replace each TBD with a real member name and the work that person actually did. Keep TBD where the fact is unknown. -->

## 10. Demo video

TBD. No video link exists yet. A real 2 to 3 minute recording of the running core flow is required, and the link must be added here only after the recording exists and reviewer access has been tested.

The shot-by-shot plan is in [`docs/VIDEO-SCRIPT.md`](docs/VIDEO-SCRIPT.md).

<!-- TODO(team): paste the real video URL here and confirm that the instructor and Apero reviewer can open it. -->

## 11. Repository layout

- `README.md`: this submission README.
- `StuDeal Project/`: Next.js App Router application.
- `StuDeal Project/app/`: routes, layouts, and API handlers.
- `StuDeal Project/components/`: shared UI, offer cards, swipe deck, brand marks, outbound form.
- `StuDeal Project/lib/`: catalog, types, storage, analytics, Ask Mon, Supabase helpers.
- `StuDeal Project/assets/`: design tokens, offer snapshot, and reference material.
- `StuDeal Project/public/`: local fonts, mascot, and cached brand marks.
- `StuDeal Project/supabase/`: migrations, seed, and local CLI config.
- `StuDeal Project/tests/`: unit, end-to-end, accessibility, and visual tests.
- `StuDeal Project/docs/`: implementation ledger, AI workflow, video script, asset sources, demo outline.
- `StuDeal Project/TRACKING-PLAN.md`: event contract and analytics boundaries.
- `llm-wiki/`: internal working wiki for decisions and evidence. Not a product feature.
- `Original Docs/`: course and team source PDFs. Kept local and untracked.

<!-- TODO(team): add the Canvas submission date and receipt evidence here or in a linked submission note, once the submission actually happens. -->
