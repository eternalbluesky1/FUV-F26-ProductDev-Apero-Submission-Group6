# Implementation Status

Last updated: 2026-11-15
Repository: `Product Dev Project`
App root: `StuDeal Project/`
Branch: `main`
Data mode: `fixture` locally, `supabase` in Vercel production
Deployment: https://fuv-f26-productdev-apero-submission.vercel.app

## Milestones

| Milestone | State | Evidence |
|---|---|---|
| Step 0: source inventory and wiki ingest | PASS | `../../llm-wiki/wiki/sources.md`, `../../llm-wiki/log.md` |
| Next.js scaffold and dependencies | PASS | `package.json`, `pnpm-lock.yaml`, `pnpm install` |
| Design system extraction | PASS | `assets/`, local fonts, `public/brand/` |
| Core routes and journey | PASS | `app/`, `components/`, `lib/` |
| Expanded fixture catalog | PASS | `lib/catalog-data.ts`, 37 deals, 27 brands, 6 categories |
| Supabase migration and seed | PASS | project `ebtmlzewcesrensozyxm`; `0002_deal_enrichment.sql`; 37 public rows |
| Supabase production mode | PASS | Vercel `NEXT_PUBLIC_STUDEAL_DATA_MODE=supabase`; public REST returns 37 rows |
| Supabase click logging | PASS | production outbound POST returned 303 and inserted one `deal_clicks` row; test row deleted |
| Ask Mon live provider | PASS | `hello` and cinema queries returned `mode=ai`; cinema returned catalog-backed recommendations |
| Ask Mon model selector and allowlist | PASS | `lib/ask-mon-models.ts`, `/api/ask-mon/models`, selector in `app/ask-mon/page.tsx` |
| Ask Mon fallback handling | PASS | plain-text greetings no longer become fallback; fallback reserved for provider failures |
| Persistent navigation | PASS | `components/site-nav.tsx`, `components/mobile-tab-bar.tsx`; Ask Mon reachable from home, header, and mobile bar |
| Brand logos on cards and detail pages | PASS | `public/brand/logos/`, `manifest.json`, `lib/brand-assets.ts`, `docs/ASSET-SOURCES.md` |
| Source recheck cron | PASS | `app/api/cron/recheck-sources/route.ts`, `vercel.json` daily 03:00 UTC, `CRON_SECRET` set in Vercel |
| Outbound route | PASS | 400 invalid surface, 303 valid redirect |
| PostHog default-on analytics | PASS | production visit produced `landing_viewed` with no `$opt_in` |
| Unit tests | PASS | 61 tests |
| E2E tests | PASS | 24 tests, mobile and desktop |
| Accessibility scans | PASS | 16 scans, no serious or critical violations |
| Visual regression | PASS | 8 reviewed baselines, viewport-shot on mobile to avoid fixed-bar artifacts |
| Production build | PASS | `pnpm build`, 16 routes |
| UI redesign pass | PASS | home, header, local fonts, glass offer cards, brand logos, prominent categories, mobile swipe deck |
| Visual audit fixes | PASS | humanized source/status labels; Ask Mon chat first on mobile |
| Fixture data notice | PASS | `components/fixture-notice.tsx` shows a Vietnamese demo-data label in fixture mode and after a hosted-read fallback |
| Public rubric tracker | PASS | `docs/RUBRIC-TRACKER.md` maps the assignment brief criteria to evidence |
| AI workflow phases | PASS | `../README.md` § AI-native workflow and `docs/AI-WORKFLOW.md` § 1 and 2.0 record the meeting, GPT-6 Luna drafting, GPT-6.1 Terra proofing, then development |
| README and tracking plan | PASS | `../README.md`, `TRACKING-PLAN.md` |
| Hosted deployment | PASS | Vercel production alias updated |
| Demo video | NOT RUN | deferred by product owner |
| Canvas submission | NOT RUN | not prepared |

## Environment

- Node `v24.11.1`
- pnpm `10.33.0`
- Docker unavailable: `dockerDesktopLinuxEngine` pipe not found
- Supabase CLI authenticated; hosted project `ebtmlzewcesrensozyxm` linked
- Vercel CLI authenticated; project `prj_f662lp5BHDlI7TuOdxSmMcFPTJkH`
- PostHog project `735307` connected; live default-on events observed
- OpenRouter model `baidu/ernie-5.5-flash-preview:free` configured for Ask Mon; Ling and Nemotron are selectable alternatives
- The previous invalid `SUPABASE_SECRET_KEY` was replaced locally and in Vercel; admin reads and click inserts now work

## Verification commands

| Command | Result |
|---|---|
| `pnpm typecheck` | PASS |
| `pnpm lint` | PASS, no warnings or errors |
| `pnpm test:unit` | PASS, 61 tests |
| `pnpm build` | PASS, 16 routes |
| `pnpm test:e2e` | PASS, 24 tests |
| `pnpm test:a11y` | PASS, 16 scans |
| `pnpm test:visual` | PASS, 8 tests |
| Hosted Supabase migration | PASS |
| Hosted seed | PASS, 37 deals |
| Production outbound click | PASS, one row inserted and cleaned up |
| Live Ask Mon | PASS, `mode=ai`, catalog-backed cinema recommendations |
| Live PostHog event | PASS, default-on `landing_viewed` |
| Vercel deployment | PASS, production alias |

## Analytics decision

The product owner wrote the PRD and explicitly directed analytics to be on by default on 2026-11-14. The fixed consent banner was removed. Settings still provides an opt-out, and Privacy discloses the behavior. This overrides the earlier consent-gated rule in `guide.md`.

## Blockers and limits

- Local Supabase stack cannot run because Docker is unavailable. Hosted Supabase is the working path.
- The asset archive lacks `assets/studeal-theme.css` and `assets/SEED-IMPORT.md`. CSS is derived from `assets/design-tokens.json`; seed data is derived from `assets/verified-offer-snapshot.csv`.
- Client pages (`start`, `deck`, `summary`, `discover`, `pocket`) now read the hosted catalog through `lib/supabase-public.ts` and the `useCatalog` hook, with the bundled snapshot as the first paint and the offline fallback. Supabase is the single source of truth in production; editing a hosted row no longer needs a redeploy.
- The offer snapshot is dated. Each offer must be rechecked before a public release; the cron records source HTTP status and last-check time but does not auto-expire offers. On 2026-11-15 it checked 37 sources, 7 of which answered 401/403/429 (bot protection) and are reported as `blocked`, not as dead links.
- An unknown deal slug renders the correct 404 UI with recovery links, but the HTTP status is 200 because the dynamic route streams before `notFound()` resolves. Fixing the status code needs a non-streaming guard (middleware or static params) and was left out of this pass.
- Team names and roles are recorded in the README. The video link and Canvas submission receipt are not supplied.

## Next action

Record the 2-3 minute demo video, add its link to the README, verify reviewer access to the repository and Vercel URL, then prepare the Canvas submission. Do not claim a video or submission without evidence.
