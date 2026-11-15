---
title: Architecture
type: architecture
status: active
updated: 2026-11-14
sources: [prd, guide, offers-snapshot]
confidence: high
---

The implementation is a Next.js App Router application with strict TypeScript, Tailwind v4, Supabase Postgres, default-on PostHog analytics with an opt-out, and a server-side OpenRouter call for Ask Mon. Fixture mode is an explicit local or demo mode, never a silent fallback presented as live data.

## What it is

Browser routes: `/`, `/start`, `/deck`, `/summary`, `/discover`, `/ask-mon`, `/pocket`, `/deal/[slug]`, `/settings`, `/privacy`, `/terms`. Server routes: `POST /api/ask-mon` and `POST /api/deals/[id]/outbound`.

The public catalog is a Supabase `deals` table with a shared `PublicDeal` type. The public read predicate is: `content_status = 'current_snapshot'`, `source_checked_at is not null`, `review_by > now()`, `starts_at is null or starts_at <= now()`, and `expires_at is null or expires_at > now()`. The browser gets only SELECT on that predicate. Click logging uses a server-only privileged client and writes to `deal_clicks`.

Ask Mon accepts a query, bounded recent history, optional category slugs, a limit of 1-3, and up to three recent deal IDs. It validates input with Zod, runs one read-only `search_deals` tool through OpenRouter, and returns `{ mode, reply_markdown, recommendations }`. Modes are `ai`, `matching`, and `fallback`. Offer cards come from current catalog rows, not model output.

## Why it matters

The main failure modes are trust failures: fixtures shown as real offers, a model inventing prices, a click counted as a purchase, a public table exposing reviewer data, or analytics firing after an explicit opt-out. The architecture isolates each of those boundaries.

## Current state

- The app is built with 15 routes including App Router icons, a 12-row fixture catalog, Supabase helpers, Ask Mon, and analytics.
- Local development uses `NEXT_PUBLIC_STUDEAL_DATA_MODE=fixture`. Vercel production uses `supabase`.
- The hosted Supabase project `ebtmlzewcesrensozyxm` has the migration applied and 12 public rows. Admin reads and click inserts use a valid `sb_secret_` key.
- A production outbound POST returned 303 and inserted one `deal_clicks` row. The row was removed after verification.
- PostHog project `735307` receives default-on events. A production visit produced `landing_viewed` without `$opt_in`.
- Docker is unavailable, so `supabase start` and local pgTAP cannot run. The hosted path is the working integration.
- The PRD's temporary OpenRouter key is stored only in ignored environment files and was not printed or committed.
- The offer snapshot has no category column. Categories are curated in the seed.

## Open questions

- Client pages (`start`, `deck`, `summary`, `discover`, `pocket`, `ask-mon`) still read the fixture catalog directly. A shared Supabase-backed client loader is not implemented.
- Which offers will be rechecked and presented as current for the final public release?
- Do reviewers have access to the GitHub repository, the Vercel URL, and Canvas?

## Sources

- `prd`: routes, data model, RLS predicate, Ask Mon contract, event contract.
- `guide`: stack, environment, test, and recovery rules.
- `offers-snapshot`: seed rows and source URLs.
