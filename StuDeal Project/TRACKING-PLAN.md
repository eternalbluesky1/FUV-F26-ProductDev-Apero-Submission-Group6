# StuDeal Tracking Plan

StuDeal measures whether students can find, understand, and keep offers. Analytics are optional and consent-gated. No raw search text, chat text, email, student ID, or other sensitive data is sent to PostHog.

## Consent

- Consent starts as pending. PostHog is not loaded or initialized before affirmative consent.
- Declining does not block the product.
- Consent can be changed in Settings.
- Autocapture, automatic pageviews, pageleaves, session recording, surveys, feature flags, and remote extras are disabled.
- If the PostHog key is missing, the app keeps working with a no-op adapter and live tracking stays BLOCKED.

## Events

| Event | Trigger | Properties | Purpose | Status |
|---|---|---|---|---|
| `landing_viewed` | Consent granted on the landing page | referrer category only | Consented entry point | Implemented, live not observed |
| `interests_saved` | User continues with at least 3 categories | category slugs, elapsed seconds | Onboarding completion | Implemented |
| `interests_skipped` | User chooses Skip | none | Onboarding abandonment | Implemented |
| `deck_card_action` | Save or skip on a deck card | deal_id, action, position | Relevance and progress | Implemented |
| `deal_saved` | Unique save | deal_id, source_surface | Save intent | Implemented |
| `deck_completed` | Last deck card is handled | cards_seen, unique_saved_count | Completion and aha moment | Implemented |
| `offers_summary_shown` | Summary page renders | cards_seen, unique_saved_count | Completion | Implemented |
| `search_performed` | Discover search submit | query_length, result_count | Discoverability | Implemented |
| `ai_query_submitted` | Ask Mon send | query_length, history_length | Assistant use | Implemented |
| `ai_answer_shown` | Ask Mon response | result_count, latency_ms, mode, error_code | Assistant quality and fallback rate | Implemented |
| `deal_detail_viewed` | Detail page view | deal_id, source_surface | Detail discovery | Implemented |
| `outbound_offer_clicked` | Native outbound form submit | deal_id, source_surface | Best-effort click intent | Implemented |

## Boundaries

- A save is not a redemption.
- A click is not a purchase.
- The server-side `deal_clicks` row is operational data, separate from PostHog.
- No monetary savings total is computed.
- Funnel reporting uses consenting visitors only.
- The deck save event occurs before summary, so a funnel must not place the first save after summary.

## Verification

- Local consent UI: implemented.
- Live PostHog event in project `735307`: OBSERVED on 2026-11-14. A consented `landing_viewed` event reached the project after clicking Allow on the production URL.
- Mocked SDK behavior is not live evidence.
