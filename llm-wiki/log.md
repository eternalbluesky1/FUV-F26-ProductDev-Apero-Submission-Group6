# Log

Append-only record of ingests, decisions, and verified results.

## [2026-11-14] init | New StuDeal wiki

Removed the previous Interactive Black Hole wiki at the user's request. Created a blank LLM-wiki at `llm-wiki/` with a new schema, index, log, and raw-source README. Current project is StuDeal.

## [2026-11-14] ingest | guide, prd, notes, assets

Read `StuDeal Project/guide.md`, PRD pages 1-42, the three meeting-note PDFs, `assets/DESIGN-SYSTEM.md`, `assets/ASSET-GUIDE.md`, `assets/design-tokens.json`, and `assets/verified-offer-snapshot.csv`. The PRD page 43 was not read or copied because it contains a private key. Created Overview, Requirements, Product, Architecture, Status, and Sources pages. Recorded hashes and missing archive files in `wiki/sources.md`.

## [2026-11-14] decision | app root and wiki location

The app will be built in `StuDeal Project/`. The wiki lives in `llm-wiki/` at the project root. Vercel root should point to `StuDeal Project/`. The wiki does not duplicate application files.

## [2026-11-14] plan | implementation start

Next: initialize the Next.js app, seed the fixture catalog from the reviewed CSV subset, build the core journey, then add Supabase, Ask Mon, analytics, tests, and submission artifacts.

## [2026-11-14] build | Next.js app and fixture catalog

Initialized the app in `../StuDeal Project/`. Added the home, start, deck, summary, discover, ask-mon, pocket, detail, settings, privacy, and terms routes. Added the 12-row fixture catalog, shared types, storage, analytics consent adapter, Supabase helpers, Ask Mon route, outbound route, SQL migration, seed, and 40 unit tests. `pnpm install`, `pnpm typecheck`, and `pnpm test:unit` pass. Supabase client mode and browser tests remain incomplete.

## [2026-11-14] verify | live OpenRouter completion

Verified `google/gemini-2.5-flash` with a live OpenRouter completion on 2026-11-14. The key was read from the private PRD final page into an ignored `.env.local` and was not printed or copied into the wiki.

## [2026-11-14] verify | tests, build, Supabase, Ask Mon

`pnpm typecheck`, `pnpm lint`, 41 unit tests, `pnpm build`, 8 E2E tests, 8 accessibility scans, and 4 visual regression tests pass. The Supabase migration applied to project `ebtmlzewcsrensozyxm` and the seed loaded 12 deals. Ask Mon returned three cinema recommendations through the live OpenRouter route. A live PostHog event, Vercel deployment, video, and Canvas submission remain unverified.

## [2026-11-14] deploy | Vercel production and live analytics

Deployed to https://fuv-f26-productdev-apero-submission.vercel.app. The production build uses the server-rendered Supabase home and detail paths. Ask Mon returned three recommendations through the production API. A consented `landing_viewed` event was observed in PostHog project `735307`. The video and Canvas submission remain unverified.
