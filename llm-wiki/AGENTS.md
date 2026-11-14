# LLM Wiki Schema

This folder is the persistent working context for StuDeal. It follows the LLM Wiki pattern: raw sources stay immutable, the wiki is a structured synthesis, and this schema defines how the agent maintains both.

## Three layers

| Layer | Location | Owner | Rule |
|---|---|---|---|
| Raw | `raw/` plus the original files it points to | Nobody after first write | Immutable. Read only. Add a new dated copy instead of editing an original. |
| Wiki | `wiki/` | The agent | Structured, cited, cross-linked pages. Every page follows the page format and stays under 180 lines. |
| Schema | `AGENTS.md`, `index.md`, `log.md` | Human plus agent | Changed deliberately. Keep one source of truth. |

The application code and submission files live in `../StuDeal Project/`. The wiki links to them. It does not duplicate them.

## Page format

Every file under `wiki/` starts with YAML frontmatter, then one plain-language paragraph, then these sections in order:

1. `## What it is`
2. `## Why it matters`
3. `## Current state`
4. `## Open questions`
5. `## Sources`

```yaml
---
title: Product
type: product
status: active
updated: 2026-11-14
sources: [prd, design-system, offers-snapshot]
confidence: medium
---
```

| Field | Allowed values | Rule |
|---|---|---|
| `title` | Title Case | Must match the link text used in `index.md`. |
| `type` | `overview`, `requirements`, `product`, `architecture`, `status`, `source` | One value. |
| `status` | `draft`, `active`, `verified`, `stale`, `blocked` | `verified` requires a file read, command result, or observed service state. |
| `updated` | `YYYY-MM-DD` | Date of the last content change. |
| `sources` | Keys from `wiki/sources.md` | At least one key for a factual claim. Never invent a key. |
| `confidence` | `high`, `medium`, `low` | High only for direct source reads or observed results. |

`## Sources` lists the same keys as the frontmatter, with one line each on what the source supports.

## Naming and links

- File names are lower-case kebab-case with a `.md` suffix.
- Links are relative markdown. Use the target page title as the link text.
- No absolute paths, no `file://` links.
- Every page is linked from `index.md`, and every page links to at least one other page.
- External URLs appear only in `wiki/sources.md` or a page's `## Sources` section.
- Anchor links must point to an existing heading.

## Evidence labels

Use these inline at the end of the sentence they qualify:

- **Verified**: read from a source or reproduced by a command, test, or service check.
- **Observed**: seen in a generated image, secondary source, or tool output, not independently checked.
- **Inferred**: reasoned from facts already stated.
- **Proposed**: a design choice or hypothesis with no evidence yet.
- **Blocked**: cannot be settled without access or a missing dependency.

Do not promote an Inferred claim to Verified because it sounds right. Do not claim a test passed without the command output.

## Operations

### Ingest

1. Read the source. If it is a file, record its path and hash in `raw/README.md` or `wiki/sources.md`.
2. Add or update the source key in `wiki/sources.md`.
3. Create or update the smallest page that owns the claim.
4. Update `index.md`.
5. Append one entry to `log.md` in the format `## [YYYY-MM-DD] ingest | <source key>`.
6. Run the lint checks.

### Query

1. Read `index.md`.
2. Open the relevant pages.
3. Answer with page links and source keys.
4. Mark reasoned claims as **Inferred**.
5. Do not edit during a query unless the user asks.

### Lint

Run these checks before calling a batch done:

1. Frontmatter has all six fields and valid values.
2. The five section headings exist, in order.
3. The page is under 180 lines.
4. Every relative link resolves.
5. Every `sources` key exists in `wiki/sources.md`.
6. Every ledger key is used at least once.
7. Every page is reachable from `index.md`.
8. No page is an orphan.
9. No secrets, API keys, or personal data appear in the wiki.
10. The index summary still matches the page.

## Project rules

- The application UI and user-facing messages are Vietnamese.
- The product name is StuDeal. The mascot is Mon.
- A save is not a redemption. A click is not a purchase. An unverified brand is not a partner.
- Offers shown as current must come from reviewed catalog rows with a source URL and source-check date.
- Do not expose the OpenRouter key from the PRD. The PRD's final page is private and must not be copied into the wiki or repository.
- Do not claim a hosted integration, live analytics event, video, or Canvas submission without evidence.
- Update `../StuDeal Project/docs/IMPLEMENTATION-STATUS.md` at each milestone.
