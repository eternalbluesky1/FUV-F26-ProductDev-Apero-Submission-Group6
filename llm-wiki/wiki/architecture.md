---
title: Architecture
type: architecture
status: active
updated: 2026-11-14
sources: [prd, guide, offers-snapshot]
confidence: high
---

The implementation is a Next.js App Router application with strict TypeScript, Tailwind v4, Supabase Postgres, consent-gated PostHog, and a server-side OpenRouter call for Ask Mon. Fixture mode is an explicit local or demo mode, never a silent fallback presented as live data.

## What it is

Browser routes: `/`, `/start`, `/deck`, `/summary`, `/discover`, `/ask-mon`, `/pocket`, `/deal/[slug]`, `/settings`, `/privacy`, `/terms`. Server routes: `POST /api/ask-mon` and `POST /api/deals/[id]/outbound`.

The public catalog is a Supabase `deals` table with a shared `PublicDeal` type. The public read predicate is: `content_status = 'current_snapshot'`, `source_checked_at is not null`, `review_by > now()`, `starts_at is null or starts_at <= now()`, and `expires_at is null or expires_at > now()`. The browser gets only SELECT on that predicate. Click logging uses a server-only privileged client and writes to `deal_clicks`.

Ask Mon accepts a query, bounded recent history, optional category slugs, a limit of 1-3, and up to three recent deal IDs. It validates input with Zod, runs one read-only `search_deals` tool through OpenRouter, and returns `{ mode, reply_markdown, recommendations }`. Modes are `ai`, `matching`, and `fallback`. Offer cards come from current catalog rows, not model output.

## Why it matters

The main failure modes are trust failures: fixtures shown as real offers, a model inventing prices, a click counted as a purchase, a public table exposing reviewer data, or analytics firing before consent. The architecture isolates each of those boundaries.

## Current state

- App not initialized yet.
- No package manager files, routes, migrations, or tests exist.
- Docker is unavailable, so `supabase start` and local pgTAP cannot run. The hosted Supabase project is the intended integration path. Database tests are BLOCKED until a local runtime or hosted test path is available.
- Vercel and Supabase projects exist from the prior session. No app has been linked or deployed.
- PostHog MCP is connected to project `735307`, but no app event has been observed.
- The PRD's temporary OpenRouter key is on page 43. It must be placed only in an ignored `.env.local` and never printed or committed.

## Open questions

- Can the hosted Supabase keys be retrieved and used without exposing them? The CLI is authenticated.
- How should fixture mode be selected on Vercel Preview without allowing it in production? Use `NEXT_PUBLIC_STUDEAL_DATA_MODE=fixture` only in explicit preview environments and reject it when `VERCEL_ENV=production`.
- Which OpenRouter model is available and non-Claude? Verify after reading the key without printing it.
- Will the PostHog project API key be available? If not, the consent UI and no-op adapter can ship, but live tracking remains BLOCKED.
- The offer snapshot has no category column. Categories must be curated explicitly in the seed.

## Sources

- `prd`: routes, data model, RLS predicate, Ask Mon contract, event contract.
- `guide`: stack, environment, test, and recovery rules.
- `offers-snapshot`: seed rows and source URLs.
