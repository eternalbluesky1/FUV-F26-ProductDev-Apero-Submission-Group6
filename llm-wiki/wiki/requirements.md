---
title: Requirements
type: requirements
status: active
updated: 2026-11-14
sources: [notes-brief, guide, prd, onboarding]
confidence: high
---

The assignment requires a real product, a team repository, a README, a tracking plan, evidence of AI-assisted work, a demo video, and a Canvas submission. The course brief also describes an Apero assessment gate that is not fully disclosed in the source notes.

## What it is

A working checklist that separates course requirements from the current StuDeal scope. It is not evidence that an item is complete. Each item needs a file, command result, service observation, or submission receipt before it can be marked PASS.

## Why it matters

The product can be usable and still fail the assignment if the repository, README, tracking evidence, demo, or submission is missing. The build must protect those areas alongside the UI.

## Current state

| Requirement | Evidence needed | State |
|---|---|---|
| One team GitHub repository with source | Remote configured at `https://github.com/eternalbluesky1/FUV-F26-ProductDev-Apero-Submission-Group6` | Repository exists; implementation commits pushed |
| Independently runnable core journey | Home, interests or skip, deck, save or skip, summary, Pocket, detail | PASS; 8 E2E tests |
| Mobile-first and desktop support | Browser checks at 390x844 and 1280x900 | PASS; 4 reviewed visual baselines |
| README with pitch, problem, users, features, launch path, revenue or acquisition hypothesis, setup, AI workflow, team, demo link | `README.md` at app root | PASS except team names and demo link, which remain TBD |
| Tracking plan | `TRACKING-PLAN.md` with event, trigger, properties, purpose, analytics choice, limits | PASS |
| Implemented analytics | Default-on PostHog with opt-out; observed live events | PASS; production `landing_viewed` observed without `$opt_in` |
| Real Ask Mon path | Server-side non-Claude model with one read-only `search_deals` tool; labeled failure fallback | PASS; live `mode=ai` verified |
| Supabase catalog and click logging | Migrations, RLS, seed, outbound POST, 303 navigation | PASS on hosted Supabase; local stack blocked by Docker |
| Tests | Unit, Playwright journey, accessibility, visual baselines | PASS; 46 unit, 8 E2E, 8 a11y, 4 visual |
| Demo video | 2-3 minute recording of the real flow with mode disclosed | NOT RUN |
| Canvas submission | Repository, README, video submitted once per team | NOT RUN |
| AI-native process evidence | Actual tools, tasks, outcomes, failures, dates, contributors | This wiki and status ledger record the process |

Course assessment context from `notes-brief` pages 1-2 and 4-5: Apero's gate is 70 percent of the grade, and instructor assessment is 30 percent. The source does not disclose the detailed gate. A non-passing product may receive partial credit up to 50 percent based on feedback. Do not claim a pass.

## Open questions

- The exact Apero gate and subweights are not in the source. Do not invent them.
- The course brief names Claude for AI use, but the user's decision is to use a different subscription and a non-Claude model for Ask Mon. Document the actual tools used.
- Team member names, roles, and contributions are still TBD.
- The demo video and Canvas submission are not produced.
- Client pages still use the fixture catalog while server pages use Supabase.

## Sources

- `notes-brief`: assignment, assessment, repository, README, tracking, video, and submission requirements.
- `guide`: current checklist, evidence rules, and P0 acceptance.
- `prd`: product and technical requirements.
- `onboarding`: autonomous execution and submission expectations.
