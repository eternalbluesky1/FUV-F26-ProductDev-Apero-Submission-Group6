# StuDeal design system package

Version 1.0 • checked with the generated web concepts on 13 November 2026

This package turns the screen concepts into implementation rules. The canonical design target is a responsive browser SPA at a 1440 × 900 desktop viewport. Mobile web remains supported. These files define design intent, not official partner branding. Use plain text for third-party brands until approved logo assets are available.

## Files

- `design-tokens.json`: machine-readable colors, type, spacing, radius, shadows, breakpoints and control sizes.
- `DESIGN-SYSTEM.md`: this implementation guide, including layouts, components, states and accessibility.
- `tailwind-theme-example.ts`: mapping from the tokens to Tailwind theme extensions and CSS variables.

## Brand and visual principles

- Product wordmark: `studeal`; keep the UI name exactly StuDeal if title case is used. One d in “deal”. Tagline: “Deal hay, đúng lúc.”
- Mon remains the friendly purple drawstring pouch. Use it as a guide, not as the only carrier of meaning.
- Primary color is grape purple `#5B3DF5`; yellow `#FFD23F` is an accent and should not carry small white text. Pink and mint are secondary status accents.
- Keep layouts airy, rounded and card-led. Use a soft lilac page backdrop only behind focused hero or state surfaces; keep reading areas white.
- Real offer cards must distinguish student eligibility from age-based, membership, referral and general benefits. Show source, check date, and material conditions near the offer value.
- A screenshot is a visual reference. Rebuild the page with semantic HTML/CSS components; never place a complete screenshot as the page UI.

## Typography

| Role | Family | Size / line height | Weight | Use |
|---|---|---:|---:|---|
| Display | Baloo 2 | 48 / 56 px | 700 | Home hero only; reduce to 36 / 44 on narrow desktop |
| H1 | Baloo 2 | 36 / 44 px | 700 | Page title |
| H2 | Baloo 2 | 28 / 36 px | 700 | Major section headings |
| H3 | Be Vietnam Pro | 22 / 30 px | 600 | Card and subsection headings |
| Body large | Be Vietnam Pro | 18 / 28 px | 400 | Hero/supporting copy |
| Body | Be Vietnam Pro | 16 / 24 px | 400 | Default text and controls |
| Small | Be Vietnam Pro | 14 / 20 px | 400 | Conditions and secondary detail |
| Caption | Be Vietnam Pro | 12 / 16 px | 500 | Metadata, date labels, helper copy |

Load fonts locally or from an approved source; keep `Arial, sans-serif` as fallback. Check Vietnamese glyph coverage and line wrapping. Do not use caption size for eligibility text that changes a purchase decision.

## Layout and responsive behavior

| Viewport | Page frame | Navigation | Main content |
|---|---|---|---|
| ≥1440 px | Max content width 1280 px; 232 px left rail; 72 px header; 32 px outer gutter | Persistent desktop header + sidebar | 12-column grid, 24 px gaps; landing offer cards use 4 columns |
| 1024–1439 px | Fluid width, 24 px gutter; optional 208 px rail when content allows | Desktop header; collapse sidebar below 1180 px | 8–12 columns; offer cards 3 columns at ≥1200 px, otherwise 2 |
| 768–1023 px | 24 px gutter | Compact header, sidebar becomes collapsible drawer | 8-column grid; offer cards 2 columns |
| ≤767 px | 16 px gutter; 56 px header | Compact web header; category strip scrolls horizontally; browser-safe bottom actions | 4-column grid; cards stack to 1 column; no horizontal page overflow |

Use a 4 px base spacing scale. Standard spacing values: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64 and 80 px. Use 24 px card padding on desktop, 16 px on mobile. Use 16 px between cards and 24 px between sections. The layout is a website at every breakpoint; mobile web can use a compact in-page navigation but must not depend on native app behavior.

## Core components

| Component | Structure and rules | Key states / responsive rule |
|---|---|---|
| `SiteHeader` | StuDeal mark, Home, Discover, Ask Mon, Pocket, guest/profile menu; optional global search | Default, scrolled, compact; wraps or collapses at tablet/mobile |
| `DesktopSidebar` | Primary routes and selected category/location | Expanded desktop, collapsed/drawer tablet, hidden on small screens |
| `SearchBar` | Search icon, text input, clear action, submit button | Idle, focused, filled, loading, no results; 48 px height; label is accessible |
| `CategoryChip` | Icon + concise label + selected marker | Default, hover, selected, focus, disabled; selected uses fill and check, not color only |
| `OfferCard` | Brand text, benefit label, eligibility summary, source/freshness metadata, save action | Default, saved, stale, expired, unavailable; 4/3/2/1 column grid by width |
| `EligibilityBadge` | Explicit class: Student, Age-based, Member, Referral, General | Color plus text/icon; never infer student-only from category |
| `SourceStamp` | “Official source” label and `DD/MM/YYYY` check date linking to the exact official page | Current snapshot, needs recheck, unavailable; never imply partner validation |
| `OfferDeckCard` | One offer at a time, progress `n/10`, terms, source, Skip / Details / Save buttons | Loading, ready, saved, skipped, end-of-deck; visible buttons always available |
| `PocketRow` | Offer title, current saved state, short condition, source link, remove control | Populated, empty, stale item, local-storage unavailable |
| `SavedSummary` | Cards viewed, unique offers saved, Pocket action | Zero saved, one or more saved; no combined money amount by default |
| `AskMonMessage` | Prompt, concise response, source-backed offer references, fallback notice | Waiting, answer, fallback, timeout, error; provide retry and normal discovery path |
| `EligibilityNotice` | Short warning text + icon; includes condition that changes actual eligibility | Default and urgent/expiry warning; never rely on color alone |
| `EmptyState` | Mon pose optional, direct explanation, one primary recovery action | Search empty, Pocket empty, no matching category |
| `ErrorPanel` | Plain-language failure, retry action, preserve saved state | Network, database, AI unavailable; distinguish each cause |
| `MascotSpot` | Transparent Mon PNG, decorative alt text policy | Use `alt=""` if decorative; meaningful alt only when it conveys unique information |

### Offer card content contract

Offer cards receive structured data, not generated prose. Required fields: `brandName`, `title`, `benefitLabel`, `eligibilityKind`, `eligibilityText`, `sourceUrl`, `sourceCheckedAt`, `contentStatus`, `destinationUrl`, `relationshipLabel`. Optional: `locationScope`, `startsAt`, `expiresAt`, `reviewBy`, `redemptionSteps`. Render “from” prices literally. Do not hide location or age limitations in a tooltip.

Order of information: (1) brand and offer, (2) value/benefit, (3) who qualifies and the most important caveat, (4) source + checked date, (5) Save / View conditions. On mobile web, preserve this order in a single column.

## Buttons and controls

- Primary: purple fill, white text, 48 px high for major actions; 44 px minimum for standard buttons; 8–12 px corner radius.
- Secondary: white/lilac fill with purple border/text. Tertiary: text button with visible hover/focus.
- Destructive/removal actions use danger red and require clear text or an accessible name.
- Disabled: muted surface and text plus disabled semantics; do not communicate disabled state by opacity alone.
- Focus: 3 px purple ring with 2 px offset. Hover and pressed states must remain distinguishable at keyboard focus.
- Save icon buttons require `aria-label` that reflects current state (for example “Save offer” / “Remove saved offer”).

## Interaction and motion

- Use 150 ms for hover feedback, 220 ms for standard state changes and up to 300 ms for short entrance transitions. Ease: `cubic-bezier(0.2, 0, 0, 1)`.
- Card drag can be enabled on touch/pointer, but Save and Skip buttons remain first-class. Keyboard: left/right may move cards when focus is within deck; Enter activates the focused action; do not hijack global arrows while an input is focused.
- After save, announce “Saved to Pocket” through a polite live region. Keep a visible undo/remove path.
- Preserve user input and local Pocket if fetch, AI or analytics fails.
- Under `prefers-reduced-motion: reduce`, remove parallax, coin movement, confetti and nonessential transforms. Do not autoplay animation.

## Accessibility baseline

- Use semantic landmarks, heading order, real links for navigation and buttons for actions.
- All controls keyboard operable with visible focus; minimum target 44 × 44 px.
- Text contrast target: WCAG 2.2 AA. Do not put white text on the yellow accent.
- Eligibility, freshness, save state and error status always have text labels and an icon; color is supplementary.
- Search has a persistent label, visible error/help association and Escape clear behavior.
- Dialogs trap focus and return it to the launcher; do not use modal confirmation for ordinary saves.
- Screen reader status messages announce loading completion, save/unsave, result count and retry outcome.

## Route-specific compositions

| Route | Desktop composition | Small-screen adaptation |
|---|---|---|
| Home | Header + category rail + wide hero/search + four offer cards | Hero stacks, category chips scroll, one-column offers |
| Onboarding | Progress + 3×2 interest tiles + Mon guidance + sticky action row | 2-column tiles, action row within page, no overflow |
| Deck | Context rail + centered offer card + Mon help rail + progress/actions | One offer card; controls below card; no gesture-only requirement |
| Discover | Search/filter row + result count + source-qualified offer list | Filters in drawer; cards stack; preserve result context |
| Summary | Mon illustration + cards-viewed count + saved list + Pocket CTA | Illustration shrinks; single-column saved list |
| Ask Mon | Chat conversation and sourced offer cards + persistent prompt bar | Single column; prompt remains visible above browser-safe bottom area |
| Pocket | Saved-offer list + local-storage explanation | Cards stack; remove action remains accessible |
| Offer detail | Main content + source/eligibility panel + official-source CTA | Single column; conditions before CTA |
| System states | Four distinct loading/empty/offline/AI panels | Each panel reflows to one column |

## Content and offer truth rules

- Label the check date as a source review date, not verification of a user’s eligibility.
- Separate student-only, age-based U22, member referral and general subscription benefits.
- Never show a guaranteed savings total across different benefit types. A save is not a redemption; a click is not a purchase.
- Add a non-affiliation message where source-brand marks appear. Sponsorship/affiliate relationships require explicit catalog state and disclosure.
- Hide offers with unknown, stale or expired status; do not fabricate expiry dates.

## Tailwind usage

Use `design-tokens.json` as the source of truth and mirror its values in the Tailwind theme. Avoid one-off hex values in components. Component classes should be semantic (`bg-brand-purple`, `text-ink`, `rounded-card`, `shadow-card`) rather than route-specific colors.
