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
| One team GitHub repository with source | Remote configured at `https://github.com/eternalbluesky1/FUV-F26-ProductDev-Apero-Submission-Group6` | Repository exists; no app commit yet |
| Independently runnable core journey | Home, interests or skip, deck, save or skip, summary, Pocket, detail | Not started |
| Mobile-first and desktop support | Browser checks at 390x844, 320 px reflow, 1440x900 | Not started |
| README with pitch, problem, users, features, launch path, revenue or acquisition hypothesis, setup, AI workflow, team, demo link | `README.md` at app root | Not started |
| Tracking plan | `TRACKING-PLAN.md` or README section with event, trigger, properties, purpose, consent, limits | Not started |
| Implemented analytics | Consent-gated PostHog events; at least one observed consented event if access permits | Not started |
| Real Ask Mon path | Server-side non-Claude model with one read-only `search_deals` tool; labeled deterministic fallback | Not started |
| Supabase catalog and click logging | Migrations, RLS, seed, outbound POST, 303 navigation | Not started; Docker unavailable locally |
| Tests | Unit, Playwright journey, accessibility, two visual baselines | Not started |
| Demo video | 2-3 minute recording of the real flow with mode disclosed | Not started |
| Canvas submission | Repository, README, video submitted once per team | Not started |
| AI-native process evidence | Actual tools, tasks, outcomes, failures, dates, contributors | This wiki and status ledger are the starting record |

Course assessment context from `notes-brief` pages 1-2 and 4-5: Apero's gate is 70 percent of the grade, and instructor assessment is 30 percent. The source does not disclose the detailed gate. A non-passing product may receive partial credit up to 50 percent based on feedback. Do not claim a pass.

## Open questions

- The exact Apero gate and subweights are not in the source. Do not invent them.
- The course brief names Claude for AI use, but the user's decision is to use a different subscription and a non-Claude model for Ask Mon. Document the actual tools used.
- Team member names, roles, and contributions are still TBD.
- Hosted Supabase, PostHog, Vercel, and Canvas access must be verified separately. A local fixture run does not prove hosted integration.

## Sources

- `notes-brief`: assignment, assessment, repository, README, tracking, video, and submission requirements.
- `guide`: current checklist, evidence rules, and P0 acceptance.
- `prd`: product and technical requirements.
- `onboarding`: autonomous execution and submission expectations.
