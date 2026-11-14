StuDeal project guidance for coding agents

Planning revision: 14 November 2026
Assignment deadline in source brief: Sunday 15 November 2026, 23:59 Vietnam time
Product: StuDeal, spelled with one “d” in “deal”; Mon is the mascot
Platform: Vietnamese, mobile-first responsive web app, with desktop support
Status: implementation plan; no feature, integration, test, deployment, video, or submission is complete until actual evidence says so.

How to use this guide

This file is the persistent project guidance, not a prompt that is automatically loaded by every coding tool. Give the agent the separate StuDeal-Coding-Agent-Onboarding-Prompt.md and make this guide, the PRD, asset ZIP, and three source PDFs available in its workspace. Keep this guide's existing filename when placing it beside the prompt; it may instead live in a clearly named docs/ folder if the prompt is updated accordingly. If the repository already has AGENTS.md, CLAUDE.md, or other agent instructions, read and preserve them. Do not overwrite them to install this guide; add a small pointer only if appropriate.

On every new session: (1) inspect the existing local wiki, its schema and project index, plus repository instructions and Git status, (2) read this guide, the relevant wiki pages and any existing docs/IMPLEMENTATION-STATUS.md, (3) consult the original source, PRD, assets and code for the task at hand, and (4) resume at the first unfinished milestone. If no ledger exists, create a short one. The one-time step 0 below comes before feature implementation. Do not discard existing work. Update the wiki and record the result and next specific action before ending or handing off.

Authority and scope: follow the user's current instructions and applicable repository instructions. The original course brief is authoritative about what it actually requires; record a gap when practical scope falls short. This guide and the current PRD define the chosen implementation. Generated images are visual references, not proof that features, wording, or offers exist. If an important file or permission is missing, work on independent tasks and mark the missing dependency BLOCKED instead of guessing or silently stopping.

Existing local LLM wiki: the project working context

The user already has a local LLM-wiki folder based on Andrej Karpathy's LLM Wiki pattern. Use that existing folder as the project working context throughout planning, building, testing and handoff, following its own schema and instructions. Do not create a second knowledge-base system or replace its conventions. The app code and required README/tracking plan still live in the actual team repository, which may be inside or outside the wiki folder; link to their real locations rather than moving or duplicating them. If the folder is unavailable, ask for its path, mark step 0 BLOCKED and continue only independent inventory or other non-implementation preparation while waiting. Do not report the wiki as updated until it actually has been.

Private PRD: at the user's request, the final page of the PRD contains a temporary OpenRouter API key. Read and synthesize the PRD in step 0, but do not commit the unsanitized PDF or copy it into a tracked/shared wiki. Keep the original in a private local location and omit the key from notes, index, log, screenshots and chat output. If a shared source copy is needed, remove the credential page rather than masking it, and verify that the key is absent from the resulting text, metadata and attachments. Keep the other original sources unchanged.

Orient each session from the wiki. Find its existing schema, index, log, raw-source layout and StuDeal pages; use their actual names and conventions. Read the relevant project overview, current decisions and assignment evidence before choosing the next task. Consult the original source for exact rubric wording and the code or real service for implemented behavior.

Ingest and connect the project materials. Check whether the three meeting-note PDFs are already present; if not, add or reference them according to the existing schema, without altering the originals. Ingest the current PRD, this guide, design-system information and new relevant sources as versioned material. Keep concise, linked source summaries and project pages covering scope, design, architecture, decisions, tests, tracking and submission. Cite source paths/page numbers or URLs and dates; distinguish source requirements, user decisions, assumptions and unverified claims. Do not duplicate already-ingested material or force a fixed number of pages.

Work through the wiki at every stage. Before a planning, coding, design, data, testing or submission task, read the relevant pages and linked artifacts. Do the actual work in the appropriate files or services, then update the affected wiki summaries with the decision or outcome, a link to evidence, and any unresolved issue. Record actual implementation and test results, not intentions presented as facts. Keep the existing index and append-only log current according to their schema; a short entry per meaningful milestone is enough.

Maintain one clear source of truth. The original brief remains the source for course wording; current user decisions and the guide/PRD define the planned scope; real code, service checks and submission artifacts determine what has actually been completed. Link the repository README, tracking plan, implementation-status ledger, screenshots and video from relevant wiki pages rather than maintaining competing copies. Record conflicts and the reasoning for current decisions without rewriting historical sources.

Make handoff reliable. Before pausing or changing agents, update the current state, relevant links, failures or blockers and next concrete action. Do a quick wiki check for stale or contradictory claims, missing links and orphaned StuDeal pages. Keep the status ledger focused on execution and tests; reuse the existing wiki log rather than creating another logging system. Respect the folder's access boundaries and do not copy unrelated personal wiki content into the team repository.

This is the team's project workflow, not an in-app feature: no vector database, wiki UI, retrieval pipeline or extra infrastructure is required for the assignment slice. The course brief mentions keeping team knowledge bases separate but does not specify this particular wiki pattern.

Step 0: ingest the existing project documents before implementation

This is the first milestone and a prerequisite to feature coding. It is a single practical pass, not a demand for a perfect or extensive wiki. If the wiki or a necessary source is inaccessible, identify what is missing and ask for the path or file; inventory and inspect other available sources while waiting. Do not silently skip the import or create a replacement wiki.

Locate and inspect. Open the user's existing wiki, read its schema, index, log and current StuDeal pages, and inspect the repository without changing user work. Follow existing paths and naming conventions; do not assume a particular folder structure.

Inventory all current project materials. Read the three original meeting-note PDFs; the latest StuDeal PRD, this guidance and onboarding prompt; and the supplied asset archive's design system, asset guide, token/theme files, seed-import instructions and historical offer snapshot. Catalog the screen and mascot assets and inspect the relevant visual references. Include other project documents the user provided if present. Record actual paths and versions; distinguish historical source notes from current decisions. If a document is unavailable, say so instead of inventing its contents.

Ingest or update. Preserve original source files, add or link them using the wiki's existing raw-source conventions, and write concise source-linked summaries and cross-references. Check for existing copies or prior ingestion first and process only new or changed material. Link generated images and assets without copying large files unnecessarily. An old offer snapshot remains historical until rechecked.

Make the project navigable. Update the existing StuDeal pages or add the smallest useful set permitted by the schema: overview and scope; assignment/rubric and documentation checklist; product and design; technical architecture/data/analytics; tests, risks and recovery; and implementation/submission status. These can be sections of fewer pages. Link decisions to source locations, distinguish the user's current scope choices from the original brief, and flag contradictions or missing details. Link the current guide, PRD and eventual repository artifacts rather than maintaining competing copies.

Verify and record. Update the existing index and append a brief ingest record to the existing log. Check that links resolve, the main decisions are traceable to sources, and a fresh agent can find the next action. Record the actual changed pages, any missing materials and the step-0 result in the implementation ledger. If the repository or ledger does not yet exist, record this in the existing wiki log or StuDeal status page first and link it from the ledger when created. Only mark step 0 complete once this has actually happened.

After this initial pass, proceed with the first build slice and maintain the wiki during each subsequent milestone. Do not delay implementation for exhaustive source-by-source research, decorative pages, or additional tooling once the completion check passes.

First pass: build the smallest complete submission

Complete the initial source/document ingest into the existing local wiki and record the actual result as described above.

Inspect the repo, asset archive and available tools/access. Start or update a short status ledger that also records rubric and truthful AI-workflow evidence; draft the required README and tracking plan as the work progresses.

Make one runnable web journey: home → interests or Skip → save/skip a few offers → summary → Pocket → offer details. Aim for 3–5 manually reviewed current offers; the deck still supports up to ten. If sources or Supabase are unavailable, use visibly labeled fixtures and record the blocked integration.

Connect Supabase and a simple safe outbound POST when possible; wire consent-gated PostHog and its basic events; make Ask Mon call a live provider if configured and otherwise show labeled deterministic matching. Do not wait on unavailable credentials before finishing independent work.

Cover the other grading areas: finish the product pitch and acquisition or revenue hypothesis, actual AI-workflow evidence, team roles, tracking plan, README and 2–3 minute demo/video preparation. Keep actual hosted access, live tracking, the video and Canvas submission separate as PASS/BLOCKED/NOT RUN.

Run a small core-journey and failure check, a keyboard pass, two reviewed visual baselines, and one fresh unbriefed agent review if tools permit. Fix the most consequential failures; clearly report what remains. Only then consider AI-assisted intake or other stretch features.

1. Mission and decision order

Build a useful student-relevant offer discovery product with a narrow complete path, a reproducible repository, measurement, and a credible route to public launch. The UI is a browser application with SPA-like interactions. Vercel hosts Next.js; Supabase stores the verified catalog and operational clicks; PostHog measures consented product events. Deliver the smallest complete flow before stretching scope.

The course brief states a market-launch readiness requirement. Given limited assignment time, the user treats full maturity as aspirational and wants a well-rounded minimum that gives every major assessment area attention. Protect time for product thinking, a usable core flow, the chosen AI workflow, tracking, basic testing, README/team evidence and a demo video. Aim for working hosted integrations when access and time allow; a deployment blocker must not stop independent implementation or the remaining submission work. A local fixture demo is legitimate progress with its mode and limitations disclosed, but cannot prove hosted database, live analytics, or launch readiness. Do not claim a published product, legal certification, or a pass through Apero's undisclosed gate.

When sources conflict: the user sets practical scope; report the course brief's stated assessment criteria accurately even when time forces a smaller build. For implementation, use this handoff and the current PRD before the asset design system and generated screen images. PNGs are visual concepts, not specifications for wording, invented offers, or functionality. Earlier screenshots show desktop; the current decision is mobile-first responsive web. Do not render a whole screenshot as the live page.

Decisions the team should understand

Live Ask Mon: prioritize a real server-side, non-Claude model call when a usable key, model and budget are available. Always have deterministic catalog matching and label it accurately. The team's original product notes treat an AI assistant as a feature not to cut; a matching-only build is an explicit temporary deviation, not a working live AI claim.

AI build process: the user will use their own AI subscription rather than Claude. Record the actual tools, work and outcomes truthfully. The build assistant and any separate API used by Ask Mon are distinct; a subscription does not establish that API credits or a model key are available.

Deal acquisition: the user requested eventual AI-assisted scheduled intake. Manual, source-checked catalog entries are P0 because time is short. An operator-triggered AI candidate review is the first stretch, followed by scheduled intake with human approval. Neither is already implemented.

Accounts: no sign-in, cross-device sync, student ID collection, or account deletion flow in this slice. Provide Settings to clear this browser's saved data and change analytics consent. Account deletion is not applicable until accounts exist; the original notes' account-deletion priority must be revisited before adding accounts.

A save is not a redemption, a click is not a purchase, and an unverified brand is not a partner. Do not sum unlike offer types into a money-saved total.

2. Assignment documentation and submission checklist

Source of required items: Product Dev Meeting Notes(1).pdf, pages 1–2 and 4–5 (the file is also known as Product Dev Meeting Notes.pdf in the earlier bundle). The other two source PDFs are the team's product and design notes; their feature ambitions are not additional instructor-mandated document filenames. The source brief says Sunday 15 November 2026, 23:59 Vietnam time; verify the live course instructions if they have changed.

AI-tool source note: the brief names Claude; the user's decision is to use their own subscription instead. Document what was actually used, without claiming that a substitution has been approved.

Use this as a working checklist, not a claim that the assignment is already done. Copy it into the project status ledger or maintain this copy in the repository. When first creating the checklist, start every item unchecked; retain verified checks across sessions unless their evidence no longer applies. Check an item only after the artifact or action exists and has been verified; record a date and evidence link/path or command result in docs/IMPLEMENTATION-STATUS.md. Keep incomplete items unchecked and label their actual state NOT RUN, BLOCKED, FAIL, or DEFERRED there, with the next action. A draft, fake URL or planned task is not completion. A real recorded demo can show disclosed fixtures, but does not prove a live integration or launch readiness; record video and integration evidence separately. Do not invent names, contributions, AI activity, video links, tracking results, or a submission.

Course-required repository and README

Put the full product source in one team GitHub repository and ensure the instructor and Apero can access it. Record the repository URL and actual access verification; a team member must handle any access the agent cannot grant.

Include a README.md at the repository root with the product name and a one-paragraph pitch.

Explain the problem and the target users.

Describe the core features that actually work and the intended web launch channel.

Explain a credible way to get users or generate revenue. Label hypotheses, not-yet-agreed partnerships and revenue clearly; the brief does not require both mechanisms to be proven.

Give reproducible instructions to build, run or access the product, reflecting the actual repository, configuration and available environment. Never publish secrets.

Describe the real AI-native workflow: which tools were actually used, how they assisted ideation, specification, coding, testing or iteration, and what worked and did not. Do not attribute work to a tool that was not used.

List every team member, their real role and their actual contributions. Ask the team to fill unknown names and contributions; do not manufacture them.

Link the real 2–3 minute demo video from the README and verify that the intended reviewers can open it.

Course-required tracking plan and product evidence

Include a tracking plan in the repository that states which events are tracked, what each measures and why it matters. A file named TRACKING-PLAN.md or a README section is a practical location; the brief does not prescribe a filename.

Implement event tracking for key user actions in the real product. Record separately whether events were merely specified, locally mocked, or actually observed in the intended PostHog project. A tracking plan alone does not meet the instrumentation requirement.

Build a real end-to-end core use case and document how a reviewer can run or access it. Note when a demo uses fixtures or a service is blocked; those facts do not prove a live integration or launch readiness.

Record the actual AI-assisted development process and team contributions as work happens, including a concise example of the work and its outcome where available.

Check launch-channel policy, stability and usability as far as time and access permit, and record outstanding risks honestly. The brief asks for launch readiness; this practical checklist is not Apero's undisclosed gate and cannot guarantee a pass.

Course-required demo and Canvas submission

Record a 2–3 minute video of the actual product's core flow, with fixture mode or limitations disclosed if applicable. A script or storyboard alone is not the video.

Add its working link to the README and test access with the intended reviewer permissions.

Submit the repository link, README and video on Canvas, once per team, by the course deadline. Confirm the submission receipt or status. If the agent cannot access Canvas or has not been authorized to submit, leave this unchecked and give a team member the exact next step.

Recommended working files; not separately required by the brief

Maintain docs/IMPLEMENTATION-STATUS.md as the single brief ledger for milestone states, test evidence, real AI activity, blockers, team inputs and the next action. A separate AI log, test report or roles matrix is optional.

Maintain TRACKING-PLAN.md if convenient and link it from the README; the required content can instead live in the README. Update it to match actual events, not the original aspirational event list.

Keep a short demo outline and concise privacy/terms drafts that describe the implemented behavior. The exact filenames, a separate PRD, a scripted video, screenshots and four analytics dashboards are not separately mandated deliverables in the course brief.

Include a safe .env.example containing names and nonsecret placeholders only, if configuration is needed. Never commit keys, real user data or raw AI prompts.

Additional project workflow requested by the user

Locate the user's existing LLM-maintained knowledge base and its schema; reuse its current structure. Record its actual location or access limitation in the status ledger without creating a duplicate system.

Complete step 0 in the existing wiki: ingest or link and summarize all available project documents, update the index/log, and verify source links and the next action. Then maintain connected notes, decisions, implementation, testing and submission evidence throughout the project. Verify the actual changed pages before checking this item. The source brief discusses keeping team knowledge bases separate; it does not specifically mandate the linked wiki pattern as a separate submission.

README outline for the implementer

Use this structure as a starting point; replace every bracketed instruction with truthful project-specific content and remove headings that do not apply. It includes the pitch, product, launch path, access, AI workflow, team contributions and demo link; the tracking plan can be in the README or elsewhere in the repository. The extra operational sections help another person run and assess the app. A README filled with unverified placeholders is still incomplete.

# StuDeal

## One-paragraph pitch

[Name the product, student audience, need, core value and what the user can do.]

## Problem, users and product

[Problem; intended users; genuinely implemented features; any known limitations.]

## Launch channel and path to users or revenue

[Web channel; a plausible acquisition or revenue hypothesis; clearly label assumptions and unconfirmed partnerships.]

## Access and setup

[Actual live or preview URL and access requirements, if available; otherwise state local-only or BLOCKED. List prerequisites, exact install/run commands, configuration variable names and how to load safe demo data. No secret values.]

## Tracking plan

[Link to the plan or include the event / what it measures / why it matters table here. State whether collection was implemented and observed; explain consent and any limits.]

## AI-native workflow

[Actual use across ideation, specification, coding, testing and iteration; what worked and did not. Identify the person and evidence where available; state gaps rather than inventing a history.]

## Testing and known limitations

[Commands actually run, results, deployment/data/AI/analytics mode and outstanding blockers.]

## Team and contributions

[Every member's name, role and actual contributions; leave unknowns visibly TBD for the team.]

## Demo video

[Accessible 2–3 minute video link; say BLOCKED/TBD until the real video exists.]

The application UI and user-facing messages are Vietnamese; the README may be written in the team's chosen language. For the tracking plan, reuse the event contract in section 10 as a starting point, then remove or explicitly mark unimplemented events. Never describe a server click as a purchase or redemption.

2a. Assignment evidence tracker

Source: “Product Dev Meeting Notes.pdf,” pages 1–2 and 4–5. Apero's gate accounts for 70% of the grade; the brief says a non-passing product can receive partial credit up to 50%, based on feedback. Instructor assessment accounts for the other 30%, across product thinking, execution, AI-native process, publish readiness, and documentation/teamwork. The source does not provide the detailed Apero gate or subweights; do not invent either or promise a pass.

Maintain this table in the repository as actual work proceeds. Use PASS only with evidence, FAIL for a run that failed, BLOCKED for an unavailable dependency or access, NOT RUN when untested, and DEFERRED for consciously excluded work. Include date, responsible person and a concrete evidence link or command result. Never replace a failure with a green label merely because a fallback works.

Requirement

Evidence the agent/team must produce

Real product and execution

Source code in one team GitHub repository; an independently runnable core browser journey with errors and mobile layout checked. Aim for a deployed build; if unavailable, provide local run instructions and mark hosting BLOCKED separately. Record local, fixture, Supabase and deployed results separately.

Product thinking

README: one-paragraph pitch, problem, target student, core features, web launch channel, and an acquisition or revenue hypothesis. Do not imply an existing affiliate or sponsorship agreement.

AI-native process

A truthful activity log for ideation, specs, code, testing and iteration with date, actual tool/model, task, result, what worked/did not, contributor and evidence. README summarizes the real workflow; a separate log is optional.

Publish readiness and event tracking

At minimum, a tracking plan defining event, trigger, properties, purpose, consent and known limits, plus implemented capture boundaries and reviewed privacy/terms drafts. Aim to observe an actual PostHog test event in the intended project after opt-in. A mocked event is not live evidence; mark live verification BLOCKED when unavailable.

Documentation and teamwork

README has build/run/access steps and actual team names, roles and contributions; unknown names stay visibly TBD for the team to fill in.

Demo and submission

Create a 2–3 minute video of the real flow; put its real link in the README. Submit the repository link, README and video on Canvas and share the repo with instructor/Apero as required. If access or a finished video is unavailable, record BLOCKED; do not fabricate links or submission.

Create or update README.md, TRACKING-PLAN.md, docs/IMPLEMENTATION-STATUS.md, the app, migrations/seed and the small tests. The status ledger can contain the AI activity log and a short demo outline; a separate workflow document is optional. The team must supply missing names, credentials, the video and submission/access actions when the agent cannot perform them.

Describe earlier ideation and specifications using the tools actually used; a later review is not original authorship. Keep evidence entries concise and omit credentials and private data.

Working acquisition hypothesis: share the web link through willing university clubs or student-community administrators and learn from early visitors. A later revenue hypothesis is affiliate commission or clearly labeled sponsorship if actual agreements are obtained. These are proposals, not existing partnerships or revenue; do not send outreach without the team's authorization.

3. P0 product and acceptance

Surface

Required behavior

Home

Vietnamese value proposition, visible start and discovery paths, source/non-affiliation wording; no sign-in wall.

Interests

Let users pick categories. Save/Continue requires at least three selections; Skip is always allowed and records no selected categories. Choices can later be edited.

Deck

N = min(10, all currently valid offers). Selected interests rank matching categories first; other valid offers fill the remaining positions. With Skip, use deterministic catalog order. No invented cards. Visible Save, Skip and Details controls work by keyboard and touch; drag is optional.

Summary

After exhausting N ≥ 1 cards, show the number of unique saved offers from the same state as Pocket. For zero saves, offer a useful next step. For N = 0, show a clear empty-catalog state and Retry; no forced ten-card flow. Do not claim monetary savings.

Discovery and detail

Search and category filtering over current catalog data; show brand text, exact benefit, eligibility and material conditions, source, source-check date and official destination. No real-world brand logos unless approved.

Pocket and settings

Guest saved state survives reload in the same browser where storage works. Remove is available. Show a plain explanation of browser-only storage and a Settings action to clear local data; consent can be changed.

Ask Mon

Vietnamese multi-turn chat with visible message history, safe Markdown, loading/error/retry and clear-chat controls. Return at most three catalog-backed offer cards. Implement a bounded read-only catalog-search tool for a tool-capable model; matching and failure fallback stay usable and explicitly labeled. Offer facts come from trusted catalog rows.

Outbound

An approved offer submits a native POST form to the server route. In Supabase mode, a valid click intent is recorded before a 303 navigation. Invalid, stale and unsafe destinations do not redirect.

Tracking and content

Consent gates PostHog. Provide Privacy and Terms pages/drafts, accessible in the footer, describing actual behavior; the team reviews them before public release. Label source freshness and no affiliation.

States

Loading, no results, no catalog, no saved items, unavailable storage, network/database failure, and AI fallback each explain what happened and offer a sensible next step.

For the first submission, aim to review and publish 3–5 genuine current offers from official sources. Do not invent offers to reach that number. If fewer can be confirmed, reduce N and disclose the limitation; use visibly labeled fixtures only for isolated testing or a clearly identified demonstration.

The desktop concepts and mobile-browser concept guide composition. Build at 390 × 844 first, check 320 CSS-pixel reflow and 200% zoom, then 1440 × 900. Set  and use Vietnamese for interface labels, messages and errors. Use semantic HTML, visible focus, labeled 44 × 44 px targets and reduced-motion behavior. Treat the supplied design tokens as the source of color, spacing, radius and type values unless they conflict with these acceptance rules. Use locally available licensed Vietnamese-capable fonts or a reliable system fallback; do not make the build depend on fetching Google Fonts. Maintain Mon's purple pouch/yellow drawstring identity and use the supplied transparent illustrations as assets.

4. Preflight, checkpoints and recovery

Before changes, inspect the actual repository, its instructions, existing work and running services. Preserve user modifications and the existing package manager/version choices unless a change is necessary and documented. For a new repository use Node 24, pnpm 10, strict TypeScript, a pinned pnpm version and a committed lockfile. Do not overwrite an existing repository or assume an empty one.

For the supplied archive, extract into the repository root: it already contains a top-level assets/ directory. Inspect the archive and existing files first; do not extract into assets/ and accidentally create assets/assets/, or overwrite changed assets without review. Verify assets/DESIGN-SYSTEM.md, assets/design-tokens.json, assets/studeal-theme.css, assets/SEED-IMPORT.md, assets/verified-offer-snapshot.csv, assets/mascot/ and assets/screens/. Keep screen PNGs as references, not deployed page backgrounds. The opaque brand-reference sheet is not a header logo; use text for the wordmark and a transparent mascot pose.

Useful read-only checks, adapted to the environment:

pwd
git status --short
git branch --show-current
git rev-parse --short HEAD
node --version
pnpm --version
docker info
rg --files
unzip -t /path/to/StuDeal-UI-and-Mascot-Assets.zip

If Git, Docker, the archive or a service is unavailable, record it; do not invent output or delete work. Check environment variable names and presence only. Never print, paste into the README, commit, or expose credentials. Copy only usable brand/mascot assets into public/brand/.

At each milestone and before a long pause or context compaction, update docs/IMPLEMENTATION-STATUS.md with: date/time and timezone; repo and branch/HEAD; current mode; changed files; milestone status; exact commands and PASS/FAIL/BLOCKED/NOT RUN result with a safe evidence location; current blocker; next concrete action. Do not put secrets or raw user prompts in the ledger. Resume from this file and inspect Git status before doing more work.

For each distinct failure: inspect the first actual error, form a small hypothesis, make a focused correction, and rerun the smallest relevant check. Allow at most two repair attempts for the same blocker; then record what was tried and continue work that does not depend on it. Do not bypass this by deleting the lockfile, disabling assertions, weakening RLS, suppressing all accessibility rules, fabricating credentials, or claiming a test passed. Do not reset an unfamiliar database, discard user changes, force-push or run a destructive remote migration. Ask for a missing wiki location or step-0 source as soon as needed while continuing source inventory; for other missing access, continue independent work.

If a dependency is missing

Condition

Continue with

Explicit remaining evidence

Supabase credentials, CLI or container runtime unavailable

Explicit fixture mode and local UI, domain logic and independent tests; still write migrations and policy tests.

Supabase integration, real click persistence, RLS tests and hosted data are BLOCKED until run. Never display fixtures as verified live deals.

PostHog key/host unavailable

Consent UI and a no-op analytics adapter; product remains usable.

Actual consented event in the intended PostHog project is BLOCKED. A mock does not satisfy instrumentation evidence.

OpenRouter key/model unavailable

Deterministic matching, labeled as matching, with no provider request.

Live AI assistant is NOT RUN/BLOCKED and remains a deviation from the team MVP notes.

Provider times out or returns invalid IDs/output

Labeled fallback using current catalog data; preserve input.

Record the error class, not the raw prompt; no fabricated AI answer.

Vercel/GitHub/Canvas or team access unavailable

Local build, documentation and deployment/submission instructions.

Hosted preview, sharing, video or submission stays BLOCKED.

No independent browser agents or screen reader

Finish the app and automated checks; record each review NOT RUN.

Do not report an AI-agent review as a human study or as completed.

5. Stack, routes and environment

Use Next.js App Router, React, strict TypeScript, Tailwind v4 and accessible shadcn/ui primitives where helpful; deploy to Vercel when access permits. Use the included assets/studeal-theme.css or copy its contents into the global CSS. Its legacy TypeScript theme example is not automatically loaded by Tailwind v4. Do not use static export: POST route handlers need a server runtime. Use Supabase Postgres with SQL migrations, grants, RLS and reviewed seeds. Use Zod for external request/model validation. Test-only packages: @playwright/test, @axe-core/playwright, vitest and the Supabase CLI. Pin and commit the lockfile; add scripts for lint, typecheck, build and tests. Keep runtime imports and test-only dependencies separate.

Use these browser routes or equivalent navigable app states: /, /start, /deck, /summary, /discover, /ask-mon, /pocket, /deal/[slug], /settings, /privacy and /terms. Server boundaries are POST /api/ask-mon and POST /api/deals/[id]/outbound. No separate native application or payment flow is required.

Document these names in .env.example with blank values only:

NEXT_PUBLIC_STUDEAL_DATA_MODE=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
OPENROUTER_API_KEY=
OPENROUTER_MODEL=

The public data mode is either supabase or fixture; default to supabase and require an explicit fixture choice for local/isolated Preview use. It is not a secret. Show a persistent Vietnamese “dữ liệu minh họa” indicator in fixture mode; never present synthetic fixtures as verified offers, live DB writes, or logged clicks. Reject fixture mode on Vercel when VERCEL_ENV=production; do not use NODE_ENV for this check because Preview builds also use production mode. If a deployed environment cannot be identified, do not enable fixtures there. For any later self-hosted production deployment, explicitly set a deployment environment and reject fixtures there too. Missing Supabase configuration must not cause a module-import crash: validate configuration, construct clients lazily and show a useful state or an explicitly selected fixture mode. In fixture mode, disable real outbound actions or use a clearly labeled test-only destination; never create a fake click record or imply a real merchant offer.

Supabase secret keys and OpenRouter keys are server-only. The Supabase secret key bypasses RLS and is used only by narrowly scoped server operations; never prefix it with NEXT_PUBLIC_, include it in next.config env, log it, or put it in browser bundles. Published keys are safe only with correct RLS. NEXT_PUBLIC_ values are built into the client at build time; set the right environment values before building and redeploy after changing them. Do not point automated tests at a live PostHog project, real AI provider, production Supabase data, or an existing user's local database.

User-provided OpenRouter key: the temporary key is printed on the final page of the PRD. Privately put it in the server-only OPENROUTER_API_KEY variable in an ignored .env.local; set a non-Claude OPENROUTER_MODEL separately after confirming availability and budget. Do not echo the value or put it in a browser bundle, wiki note, Git repository, log, screenshot or .env.example. For a Vercel deployment, configure the server environment variable privately in the appropriate project environment; .env.local is not automatically deployed. If the key has expired, reached its limit or the model is unavailable, use the labeled matching fallback and record the integration status without exposing the key. The key has not been verified by this planning document.

6. Catalog, CSV mapping and exact RLS rule

The CSV in the asset archive was checked on 13 November 2026. It is an incomplete, dated source snapshot. It does not contain complete database rows and does not by itself prove an offer is current on demo day. It has a UTF-8 BOM, and six distinct GitHub Student Developer Pack offers share the same source URL. Parse as UTF-8 with BOM support; deduplicate by the stable offer_id/slug, never by source URL alone.

CSV field

Mapping and safe default

offer_id

Stable unique slug. Retain a stable UUID per slug in the checked-in seed/mapping; do not regenerate IDs on every reset.

brand, offer

brand_name, title and benefit_label as source-supported display text; preserve “from” and variable-price caveats.

benefit_type

offer_type text; not a numeric saving.

eligibility_and_conditions

eligibility_text; preserve every material condition. Do not infer steps or a student-only status.

eligibility_category

Map explicitly to student_only, age_based, member, referral, general or student_verified_education. Preserve age/membership conditions in eligibility_text. Unknown values remain unknown and need review; never silently classify them as general.

official_source_url

source_url; only use it as destination_url after checking that exact HTTPS URL is an acceptable official destination. Different offers may legitimately share it.

checked_date

source_checked_at as a date-only source-check value. Keep the recorded date; do not invent a time or refresh the date without an actual check.

freshness_note, brand_relationship

Carry forward caveats and “no partnership implied”; do not convert a note into a guaranteed expiry or affiliation.

For the supplied snapshot specifically, map “Age-based; student card may be accepted as age proof” and “Age-based / membership” to age_based; “Student-specific with proof” to student_only; “General member / referral” to referral; and “Student/educator verification,” “Verified student,” and “Verified student, age 18+” to student_verified_education. Preserve the full conditions text, including membership and age restrictions. Any unrecognized string stays unknown and needs_review until a person checks it.

The CSV lacks category, cities, redemption steps, start/expiry timestamps and review deadline. Curate category explicitly or use an “other/unknown” draft; unknown location is unknown, not nationwide; unknown redemption steps display “xem nguồn chính thức.” Optional dates stay null unless the source states them. A draft without a real human source review and a deliberate review deadline remains needs_review, not published. Keep an owner/check log outside public catalog fields if it contains personal data.

Use a stable deals ID and unique slug, plus brand_name, title, category, offer_type, benefit_label, eligibility_kind/text, redemption_steps, cities, source_url, destination_url, source_type, source_checked_at, starts_at, expires_at, review_by, content_status and relationship_label. review_by is a timestamptz chosen by the curator for the next review, not an invented merchant expiry. For a published row it is required and must be in the future. Keep sensitive reviewer data and all click/candidate tables private.

Exact anonymous public-read predicate: content_status equals current_snapshot; source_checked_at is not null; review_by is not null and strictly greater than database now(); starts_at is null or less than or equal to now(); and expires_at is null or strictly greater than now(). Grant only public SELECT under that policy; deny browser INSERT/UPDATE/DELETE and private-table reads. Curation additionally requires reviewed official source, destination, eligibility and truthful display copy before assigning current_snapshot. needs_review, expired and demo_fixture rows are not public catalog rows.

In Supabase mode, the guest browser reads the public catalog through the publishable-key client and this RLS policy; trusted server reads may use the same low-privilege access. RLS filters rows, not columns: keep every exposed deals column public-safe; private reviewer data belongs in a separate restricted table. Construct a separate server-only privileged client only for the click insert. Never expose the privileged client to browser code.

Use one shared PublicDeal type for catalog cards and Ask Mon responses. It contains id (UUID string), slug, brand_name, title, category, offer_type, benefit_label, eligibility_kind, eligibility_text, source_url, destination_url, source_type, source_checked_at (YYYY-MM-DD), review_by (ISO timestamp), content_status (current_snapshot) and relationship_label; redemption_steps is a string or null, cities is a string array or null, and starts_at / expires_at are ISO timestamps or null. All other listed fields are strings. Return only these public-safe fields and keep their names/types consistent across UI and API.

For a source that states only a Vietnam calendar expiry date, treat that date as inclusive and convert the start of the next day in Asia/Ho_Chi_Minh to the exclusive UTC expires_at instant. Keep optional unknown starts/expiry null and do not invent dates. Test exact boundary behavior. If offers expire or cannot be rechecked, hide them and reduce N; research more real offers if time permits. The real demo must adapt to its actual N.

7. Guest state and deck

Maintain one versioned, validated local state containing selected interests, onboarding status, current deck IDs/order, seen IDs and unique saved IDs. Use stable catalog IDs. Rank selected categories first, then remaining valid offers; use slug ascending as the deterministic tie-breaker. Freeze the chosen deck IDs for the active session so reload does not reshuffle; recheck validity and drop rows that have since become invalid. Summary and Pocket derive their unique counts from the same saved set.

Skip sets onboarding to skipped and does not require three categories. Save/Continue requires three. Browser storage is not available during server rendering: read only on the client after hydration. Validate parsed data, recover safely from corrupt or old schema, and handle denied/quota-limited localStorage with an in-memory fallback plus a visible notice that state will not survive reload. If a saved row is no longer public, show a truthful unavailable state and allow removal. Clear-data controls remove local guest state; explain that operational anonymous click records are separate.

8. Ask Mon contract

Build a small Vietnamese chatbot, not just a single recommendation form. Show distinct user/Mon messages, a text input, Send, a pending indicator, retryable error, and Clear conversation. Keep chat history in component memory for the current page session; clearing it resets the chat. No account, database chat history or cross-device sync is required. Keep the input accessible on a mobile browser, permit Enter to send and Shift+Enter for a newline, and prevent duplicate sends while a request is pending. Preserve unsent text on errors. Non-streaming replies are the first implementation; streaming is optional if everything else is working.

Render Mon's short response as safe Markdown, supporting paragraphs, bold, lists and links. react-markdown with skipHtml is a reasonable implementation; preserve safe URL handling, disallow remote images and never use untrusted HTML or dangerouslySetInnerHTML. Only show validated official offer links in the trusted deal cards. Keep long URLs and code from breaking the mobile layout.

POST /api/ask-mon takes a JSON object with the existing query string, optional history containing at most six recent {role: 'user' | 'assistant', content: string} messages, optional recognized category slugs, optional limit and up to three recent_deal_ids from prior server-returned cards. Validate with Zod: require a nonempty query of at most 500 characters; bound each history entry and total history size; reject client-supplied system/tool roles; clamp a valid result limit to 1–3. Re-fetch any supplied IDs under the current public predicate before using them for follow-up context; discard stale or unknown IDs. Only the server creates system and tool messages. A bad JSON body or invalid request returns 400 with a short safe error. If no catalog can be read and explicit fixture mode is not available, return 503 with a retryable error; never fabricate deals.

For valid requests return:

{
  "mode": "ai",
  "reply_markdown": "Mình tìm được vài ưu đãi phù hợp:",
  "recommendations": [
    { "deal": { "id": "00000000-0000-4000-8000-000000000001", "slug": "catalog-slug" }, "reason": "short source-grounded reason" }
  ]
}

mode is exactly ai, matching, or fallback. Each deal is the shared PublicDeal DTO; the abbreviated object above illustrates shape only. A no-match query returns 200, a useful Vietnamese reply and an empty array. matching means deterministic matching without a configured provider; fallback means the configured provider or tool loop failed. Label both non-AI modes in the UI. Maintain query, mode and recommendations compatibility with the earlier single-turn contract while adding bounded history and reply_markdown.

Implement one real, read-only model-callable tool: search_deals, accepting a short query, recognized optional category and bounded limit. It searches only current, public catalog rows using the same RLS/current-offer predicate and accent-insensitive normalization as Discover, including đ/Đ to d/D. It returns a small set of public-safe summaries with stable IDs. A read-only get_deal_details helper is optional if useful; do not add arbitrary SQL, shell, URL-fetching, writes, payment or account tools.

For a configured, tool-capable non-Claude model, send recent validated conversation plus the tool schema to OpenRouter. For each returned tool_calls entry, retain the complete assistant message, parse and validate the function name and arguments, execute only the allowlisted server function, append a role: tool result with the matching tool_call_id, and call the model again with the tools still available. Handle no-tool replies, malformed arguments and multiple calls, even if sequential calls are requested. Bound the loop to two tool rounds and three total calls per user turn; do not execute a final tool call if there is no remaining model round to consume it. Set an overall timeout appropriate for the deployment, with an abort and a visible fallback; verify Vercel function duration rather than assuming the older six-second single-call timeout will fit a multi-call loop. No agent framework or streaming infrastructure is required.

Ask the model's final turn for a small JSON object with reply_markdown and recommendations: [{deal_id, reason}]; parse and validate it with Zod, using deterministic fallback for malformed output. A greeting may return an empty recommendations array. For a deal-related request, require a successful catalog lookup before showing specific offers; if the model did not call the tool, perform a deterministic server lookup and use only that result as context. Deal cards and official links must come from current trusted catalog rows, never from invented model fields. Reject unknown or duplicate IDs and join accepted IDs from the actual lookup back to PublicDeal; show at most three. Give the model only bounded public catalog context and ask it to avoid unsupported claims. Generated prose can still be wrong, so do not claim semantic verification; do not show unverified prices, conditions or URLs as facts, and use a deterministic reply if an unsafe answer is detected. If tool calling is unsupported, try a server-side catalog lookup followed by an ordinary model response when available; label the tool capability accurately. If the provider, model or loop fails, use the labeled deterministic fallback. For an empty search, report no matching offers.

Keep the temporary key on the server. Do not log raw prompts or chat histories or send them to PostHog. Tell users not to enter sensitive details and disclose that a live provider receives the entered message and bounded recent history. See https://openrouter.ai/docs/guides/features/tool-calling and https://github.com/remarkjs/react-markdown.

9. Outbound POST and click logging

Use POST /api/deals/[id]/outbound as a native browser form; a 303 response to fetch() alone does not navigate the page. The client submits the deal ID and a validated source_surface, never a destination URL. The server reloads a currently valid offer and compares its stored destination with a code-owned exact reviewed HTTPS URL allowlist keyed by slug. Parse the URL, reject credentials and unreviewed protocol/host/path/query, and require an exact canonical allowed URL. The remote brand may later redirect; the app controls and validates its own first destination only.

In Supabase mode, deal_clicks stores id, deal_id, created_at, source_surface and destination_domain; no raw IP or persistent visitor ID. For one accepted POST, insert one row and then return 303. Disable the submit button while the request is pending. A double submit or retry can still create duplicate rows, especially when the first write's outcome is uncertain; document this limitation and do not claim exactly-once delivery. A failed or uncertain insert returns a useful retry state and does not claim it was logged. Offer a clearly labeled, explicitly chosen untracked official-source link only after its URL has been validated. A unique per-intent token and database constraint can be added later if reliable deduplication becomes necessary.

The Supabase click record is operational, separate from optional PostHog. The privacy page must disclose it even if optional analytics are declined. Do not equate either record with redemption.

10. Consent and event contract

Consent starts pending. Do not load or initialize PostHog or send its requests before affirmative consent. Declining does not prevent the core product. Lazy-load the browser SDK only after opt-in; after the import resolves, check consent again before initialization, because the visitor may have withdrawn it during loading. On withdrawal call opt_out_capturing and queue no new captures; already queued/in-flight events may still be delivered. On later regrant call opt_in_capturing before capture. Test the pending-import race and grant/withdraw/regrant sequence.

With the installed SDK version, explicitly disable autocapture, automatic pageviews and pageleaves, session recording, surveys, feature flags/remote extras and toolbar where supported. In particular autocapture=false alone does not disable automatic pageviews. Capture only the approved custom events and avoid raw prompt/search text, emails, school IDs, sensitive data and secrets; keep search terms out of URLs and review automatic URL/referrer properties. Use a no-op adapter if configuration is absent, but record live tracking as BLOCKED.

Canonical event

Trigger and allowed properties

Why

landing_viewed

Once on landing after consent; minimal referrer category if safe

Consented entry point. If consent is granted while already on home, emit once then; do not reconstruct earlier unconsented behavior.

interests_saved / interests_skipped

Completed selection with category slugs and elapsed time, or explicit skip

Onboarding completion and abandonment context.

deck_card_action

deal_id, save/skip, position

Relevance and progress.

deal_saved

Unique save with deal_id and source_surface

Saves occur during the deck, before summary; also support saves from other surfaces.

deck_completed / offers_summary_shown

cards_seen and unique saved_count

Completion and aha moment; no implied cash savings.

search_performed

query length and result count, no raw query

Discoverability and empty searches.

ai_query_submitted / ai_answer_shown

query length or result count, latency, mode and safe error code

Ask Mon use and fallback rate.

deal_detail_viewed

deal_id and source_surface

Detail discovery.

outbound_offer_clicked

Consent-gated browser form-submit intent, deal_id and source_surface

Best-effort click-intent funnel. It may be lost during navigation and is separate from the server's deal_clicks row.

Funnel reporting uses consenting visitors only. The deck-save event precedes the summary, so a funnel must not place the first deck save after summary. In an opted-in test session, observe canonical events in a non-production PostHog project and record evidence. No server-side PostHog capture without a valid consent design; mocked SDK tests are not proof of a live event.

11. Build milestones and checks

Work in vertical slices and record a checkpoint after each. Start documentation and the real AI-workflow notes immediately; do not wait for every integration before addressing the rubric's other areas. After step 0, a blocked external dependency does not block independent UI, docs, demonstration preparation or tests, but it remains BLOCKED in the rubric tracker. Set aside enough remaining time to record the actual demo video and prepare submission.

Existing-wiki ingest: complete the initial document inventory, synthesis, index/log update and verification in step 0 above. Do this before feature implementation.

Preflight and evidence skeleton: inspect repo, existing wiki, archive, tools, access and existing state; identify missing team inputs; start one status ledger containing real AI-workflow notes, with README/tracking-plan drafts; pin new-project Node 24/pnpm 10, initialize Next and the design tokens.

Runnable core: with explicitly labeled fixture data, build home → interests/skip → ranked deck save/skip → summary → Pocket/detail/search and storage recovery. Verify mobile and desktop in a browser. This is development progress, not proof of real catalog/DB integration.

Balanced rubric baseline: complete the product pitch, target, acquisition/revenue hypothesis, roles, tracking events and consent UI, privacy/terms drafts, demo outline and actual AI-process evidence as work occurs. Do this even if service credentials or deployment are blocked.

Service paths: add Supabase migrations, exact RLS and a seed of 3–5 reviewed offers when available; verify locally when possible. Add Ask Mon matching and live provider when configured, the simple outbound route, and consent-gated PostHog. Record each real integration as PASS, FAIL, BLOCKED or NOT RUN independently; keep synthetic test rows out of production.

Tests and reviews: implement the small suite below, starting with the core journey, trust/privacy boundaries, two visual baselines and a keyboard pass. Compare initial coded screens to tokens/concepts before accepting baselines; expand coverage and run the two-phase blind agent review when possible.

Preview and submission: configure Vercel with non-sensitive preview data and correct environment values and deploy when access is available. Recheck real offer sources, run the desktop/mobile smoke path and observe an actual consented PostHog event if possible. Record a 2–3 minute video of the real available build with any fixture mode disclosed; finish README/team evidence and prepare Canvas submission. Missing hosting or another external dependency remains visible but does not erase completed work.

12. Local setup and test commands

For a new repo pin Node 24 and pnpm 10; for an existing repo honor its versions after checking compatibility. For an existing lockfile start with pnpm install --frozen-lockfile; on initial scaffolding use pnpm install and commit the generated lockfile. If the Supabase CLI is not already present, install it as a project dev dependency. Current Supabase documentation specifies that pnpm 10+ must allow its build script when adding it. A Docker-compatible runtime is required for the standard local Supabase stack.

pnpm add -D supabase --allow-build=supabase
pnpm exec supabase --version
pnpm exec playwright install chromium

# For a new repository only, if supabase/config.toml is absent:

pnpm exec supabase init
pnpm exec supabase start

Before resetting, confirm this is the project's disposable local stack and that its data is safe to erase. Never use --linked or --db-url against a remote database for the demo.

The local CLI status can provide API_URL, PUBLISHABLE_KEY and SECRET_KEY, or legacy ANON_KEY and SERVICE_ROLE_KEY depending on the CLI. Map the API URL, publishable/anon key and secret/service key privately to the three corresponding app variables in an ignored local env file; do not paste or echo its output in logs. Keep existing env values unless intentionally changed. Supply explicit local env values to Playwright's webServer process; do not assume a Next dev server reads .env.test.local. Build separately after changing NEXT_PUBLIC_ values. Start the app with pnpm dev, or configure Playwright webServer to start it on a known free port with the correct local env and fail rather than accidentally reusing an unrelated server.

Add the following scripts, adapted to the existing repository:

pnpm lint           → eslint . or the existing repository's equivalent
pnpm typecheck      → tsc --noEmit
pnpm build          → next build
pnpm test:unit      → vitest run
pnpm test:db        → pnpm exec supabase test db against the local stack
pnpm test:e2e       → playwright test tests/e2e
pnpm test:visual    → playwright test tests/visual
pnpm test:a11y      → playwright test tests/a11y

For browser/database tests, create supabase/seeds/e2e.sql with 3–5 synthetic rows, stable test IDs/slugs, current_snapshot, and review/validity dates relative to the database clock. Keep it outside supabase/tests/ so pgTAP does not treat it as a test; never add it to the normal seed configuration or a hosted deployment. In the disposable local stack, the current CLI can reset with this test seed instead of the reviewed seed:

pnpm exec supabase db reset --sql-paths ./seeds/e2e.sql
pnpm test:db
pnpm lint
pnpm typecheck
pnpm build
pnpm test:unit
pnpm test:e2e
pnpm test:a11y

Confirm the CLI's db reset --help supports --sql-paths and verify the target is the disposable local stack before running it; the path is relative to supabase/. Assert the known test IDs are present before E2E. If the installed CLI lacks that option, use --no-seed and load the SQL through a verified local-only database connection if available; otherwise mark database integration tests BLOCKED and continue independent checks. To restore reviewed local seed data after tests, reset the same disposable local stack normally. Never use --remote, --linked or --db-url to reset a hosted database.

On the first visual run, generate and review baselines using the command in section 13 before running pnpm test. If the browser or container runtime cannot be installed, document the exact failure and run independent checks. A fixture-only browser run may demonstrate UI behavior but is not a passing Supabase/RLS integration test.

13. Small deterministic test suite

Domain/Vitest: current/review dates and Vietnam expiry boundary; stable unique saves and skip; N = 0, 1 and 10 using small synthetic arrays; accent-insensitive search including đ/d; shortlist ID validation and exact approved URLs.

Database/pgTAP: when the local stack is available, use an isolated stack and 3–5 test-only current rows with stable IDs/slugs and timestamps relative to the database clock. Prove the anonymous read predicate and denial of catalog writes/private-table reads. The real production seed is not the test dataset. Browser fake time does not freeze Postgres now().

Playwright journey: use the local app and, when available, isolated local Supabase with real RLS and test rows. Fresh context → start/skip or select → save and skip → complete deck → unique summary → Ask Mon → detail/source → native POST → 303 and one row for that successful request → Pocket and refresh. Start mobile; do a desktop smoke check. In fixture-only mode, test the visible UI path and mark the real outbound/database integration BLOCKED; do not claim the full integration passed. Test zero catalog, invalid/stale destinations and consent as time permits. Seed once before parallel workers; isolate a test's known deal/time window or run the click assertion serially rather than relying on an unscoped global count. For the N=0 UI test, inject an empty catalog response or use an isolated database; do not mutate the shared seeded catalog during parallel tests. Label a mocked empty response as a UI check, not an RLS check. Either intercept a reviewed approved destination in the browser or inject an isolated test-only allowlist; never widen the production allowlist to make tests pass.

Chat and tool calls: no live calls in automated tests. Inject a fake provider at the server boundary; verify a follow-up turn, a real handler invocation with matching tool_call_id, no-tool response, multiple/unknown calls, malformed arguments, cap, timeout, invalid IDs and catalog-empty fallback. In Playwright check message history, clear/retry, safe Markdown and that raw HTML or unsafe links do not execute. Playwright page.route cannot intercept a fetch made by the Next server. If live AI or tool calling is unavailable, report each as NOT RUN or BLOCKED separately; a fake-provider pass is not live evidence. Stub PostHog at its adapter boundary and assert consent race/withdrawal/regrant and safe properties. Do not expose a public test-only provider switch.

Visual regression: use Playwright toHaveScreenshot on the actual coded UI. Start with two reviewed mobile baselines: home and deck. Add Pocket, interests, summary, Ask Mon and desktop screens as time permits. Use fixed visible fixture content, local fonts, stable viewport/device scale factor, disabled animations, and the same pinned browser/OS image. Inspect the first screenshots against the design system and concepts before accepting them: regression tests can preserve an initially bad design. First create/review baselines in that environment using the command below; commit the reviewed baselines, then run pnpm test. Review all future diffs before intentional updates.

pnpm exec playwright test tests/visual --update-snapshots

Accessibility: run @axe-core/playwright on home, deck, detail and Pocket. Manually check keyboard-only completion, names, focus order/return, status announcements, 200% zoom, 320 px reflow and reduced motion. Use NVDA + Chrome or VoiceOver + Safari if available; record NOT RUN if unavailable. An automated scan does not establish complete accessibility.

Final deployed smoke: with consent, manually confirm the Preview uses the intended Supabase/PostHog environments, one actual event appears in the correct PostHog project, source details are accurate as checked, and the outbound click follows the valid route. Record desktop/mobile results; do not run destructive tests against production.

14. Blind UX review: unbriefed agents

“Blind” here means an agent has no product brief. It is distinct from the accessibility check. Run one fresh independent browser-capable agent against a mobile-sized local or isolated non-production Preview URL; run a second desktop reviewer if time and tools permit. Give each a clean browser context and no PRD, screenshots, repository, prior conversation or other reviewer's findings. Use fresh isolated context such as fork_turns=none when the platform supports it. Findings are heuristic feedback, not evidence of human user behavior or a deterministic CI gate. Confirm serious findings in the real app.

Phase 1: URL, device and this prompt only; do not mention deals, offers, saving or the intended workflow.

You are a university student in Ho Chi Minh City visiting an unfamiliar web app. Explore naturally for up to one minute. Without hints, write what you think this app is for, who it is for, and what you would try next. Cite the visible text or controls behind your impression.

Record the first answer before sending phase 2; keep the same browser session.

Phase 2:

Try to find something you would use as a student, understand its important conditions, save it and find it again. Do not ask for hints. Stop if stuck. Report whether you completed the task, what you clicked, where you hesitated, what you expected and the three most important fixes. Cite the visible text/control or screen for each observation and distinguish observation from inference. Do not invent interactions you did not perform.

Record both reports with device, date, build and observed evidence; do not provide one agent's findings to the other. If agent access is unavailable, mark review NOT RUN and continue independent checks.

15. Optional offer-intake stretch

Only after the working core and submission package are addressed, and only if time remains: first offer an operator-triggered flow that sends human-provided approved official source text to an AI extraction endpoint. Validate output with Zod and store candidate fields plus source/evidence in a private pending-review table. Require an authorized reviewer to approve promotion; unknown fields remain unknown, and no AI output auto-publishes, expires or deletes an offer.

Later add an authenticated Supabase Cron → Edge Function schedule for operator-approved sources. Never accept arbitrary URLs; enforce reviewed HTTPS hosts, reject redirects by default, block private/reserved addresses at connection time, set timeout/body-size/rate limits, store secrets in the appropriate server/Vault facilities, and stop automatic fetching if those protections cannot be guaranteed. Log source/run/review status and keep manual reviewed seeding as fallback. Test local fixtures and one manually triggered isolated run before enabling a schedule. Recheck current Free-plan and runtime limits; do not describe scheduled intake as running until it has actually run and been reviewed.

16. References for the implementer

Course and team sources: Product Dev Meeting Notes.pdf pp. 1–2, 4–5; Product Dev Meeting Notes (1).pdf; Product Dev Meeting Notes (2).pdf, especially p. 10 for the team's original AI/settings cutline.

Next.js App Router and environment variables: https://nextjs.org/docs/app and https://nextjs.org/docs/app/guides/environment-variables

Supabase local CLI and RLS: https://supabase.com/docs/guides/local-development ; https://supabase.com/docs/guides/database/postgres/row-level-security ; https://supabase.com/docs/guides/getting-started/api-keys

Supabase local testing: https://supabase.com/docs/guides/local-development/testing/overview ; https://supabase.com/docs/reference/cli/supabase-test

Vercel environment variables: https://vercel.com/docs/environment-variables

PostHog JavaScript, consent and capture options: https://posthog.com/docs/libraries/js ; https://posthog.com/docs/libraries/js/reference ; https://posthog.com/docs/libraries/js/security

OpenRouter API and structured outputs: https://openrouter.ai/docs/api/api-reference/chat/create-a-chat-completion ; https://openrouter.ai/docs/guides/features/structured-outputs

Playwright visual and accessibility testing: https://playwright.dev/docs/test-snapshots ; https://playwright.dev/docs/accessibility-testing ; https://playwright.dev/docs/mock

Vitest and WCAG: https://vitest.dev/guide/ ; https://www.w3.org/TR/WCAG22/
