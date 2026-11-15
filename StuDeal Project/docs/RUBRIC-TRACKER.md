# Rubric tracker against the public assignment brief

Source: `Original Docs/Product Dev Meeting Notes.pdf`, "Team Assignment: AI-Native App Build with Apero", dated 12 November 2026. Deadline Sunday 15 November 2026, 23:59 Vietnam time. The brief states that 70% of the grade is Apero's gate and that its detailed criteria are not published. This tracker maps only the criteria the brief does state. It does not predict a gate result.

Status values: PASS (evidence exists), PARTIAL (criterion met with a disclosed limit), BLOCKED (dependency missing), NOT RUN (not attempted), DEFERRED (excluded on purpose).

## Build criteria

| Brief criterion | Evidence | Status | Limit |
|---|---|---|---|
| Valuable to a real market, real problem for a defined group, and can explain how it gets users or makes money | Problem and target users in `../README.md`; beachhead segment and brand-side pain in `Original Docs/Product Dev Meeting Notes (1).pdf`; acquisition and revenue hypothesis in `../README.md` § Launch channel and path to users or revenue | PARTIAL | Users and revenue are labeled hypotheses. No agreements, no traffic data, no revenue. |
| A real, working product whose core use case runs end to end | Deployed app, 24 Playwright journeys, 65 unit tests, core flow home to outbound verified | PASS | Core flow works. Ingestion of new offers is manual, not automated. |
| Built AI-native across ideation, specs, code, testing, iteration | `AI-WORKFLOW.md`; `../README.md` § AI-native workflow; `git log --oneline` | PASS | The process and the tools used are recorded in `AI-WORKFLOW.md`. |
| Ready to launch: stable, usable, policy-compliant for its channel | Open-web channel; Supabase schema with RLS; PostHog analytics; Privacy and Terms pages; 37 source-checked offers; daily source-health cron | PARTIAL | No legal review. Unknown deal slugs return HTTP 200 with 404 content. Cron monitors links, not promotions. |
| Instrumented with event tracking for the key user actions | `../TRACKING-PLAN.md`; `landing_viewed` and consent-path events observed in PostHog project `735307` | PASS | Analytics default-on by product-owner decision; Settings opt-out exists. |

## Deliverables

| Deliverable | Path or evidence | Status |
|---|---|---|
| One GitHub repository with full source, shared with instructor and Apero | `https://github.com/eternalbluesky1/FUV-F26-ProductDev-Apero-Submission-Group6`, responds 200 without authentication | PASS |
| README: product name and one-paragraph pitch | `../README.md` § One-paragraph pitch | PASS |
| README: problem, target users, core features, launch channel, users or revenue | `../README.md` § Problem, users and product; § Launch channel and path to users or revenue | PASS |
| README: how to build, run or access | `../README.md` § Access and setup; `.env.example` | PASS |
| README: AI-native workflow, what worked and what did not | `../README.md` § AI-native workflow; `AI-WORKFLOW.md` | PASS |
| README: team members with roles and contributions | `../README.md` § Team and contributions | PASS |
| Tracking plan: events, what each measures, why it matters | `../TRACKING-PLAN.md` | PASS |
| 2 to 3 minute demo video linked from the README | `../README.md` § Demo video | PASS. Recorded by Lê Thanh Nghi and submitted in the team Drive folder. The README names the folder rather than linking it directly. |
| Submit repository link, README and video on Canvas, one per team | None | NOT RUN |

## Disclosed deviations

| Deviation | Reason | Recorded where |
|---|---|---|
| Analytics on by default | Product owner directed it on 2026-11-14 | `../TRACKING-PLAN.md`; `IMPLEMENTATION-STATUS.md` § Analytics decision |
| Real brand logos used | Product owner required logos; brief does not forbid them | `../README.md` § Testing and known limitations; `ASSET-SOURCES.md` |
| No automated offer ingestion | Brief does not require it; verification requires human review | `../README.md` § Testing and known limitations; `IMPLEMENTATION-STATUS.md` |

## Other incomplete evidence

| Item | Status | Next action |
|---|---|---|
| Local Supabase stack and pgTAP RLS tests | BLOCKED | Docker unavailable. Hosted Supabase is the working path. |
| Blind unbriefed browser review | NOT RUN | Run one mobile agent and one desktop agent against the deployed URL with no brief. |
| Human user research or interviews | NOT RUN | Out of scope for this submission. Do not claim it. |
