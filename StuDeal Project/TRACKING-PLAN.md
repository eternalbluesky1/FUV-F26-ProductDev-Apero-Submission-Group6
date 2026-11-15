# StuDeal Tracking Plan

StuDeal measures whether students can find, understand, and keep offers. Analytics are on by default, with an explicit opt-out in Settings. No raw search text, chat text, email, student ID, or other sensitive data is sent to PostHog.

## Analytics choice

- PostHog initializes by default on the first page load.
- A stored `studeal:analytics-consent=denied` value disables capture. A stored `granted` value, or no stored value, keeps analytics enabled.
- Settings exposes `Bật phân tích` and `Tắt phân tích`; no fixed consent banner is shown.
- Analytics can be disabled without blocking the product.
- Autocapture, automatic pageviews, pageleaves, session recording, surveys, feature flags, and remote extras are disabled.
- If the PostHog key is missing, the app keeps working with a no-op adapter.
- Product-owner decision: the PRD author directed default-on telemetry on 2026-11-14. This supersedes the earlier consent-gated requirement in `guide.md`.

## Events

| Event | Trigger | Properties | Purpose | Status |
|---|---|---|---|---|
| `landing_viewed` | First page load in a browser session when analytics are enabled | safe referrer category or hostname | Entry point | Implemented, live observed |
| `interests_saved` | User continues with at least 3 categories | category slugs, elapsed seconds | Onboarding completion | Implemented |
| `interests_skipped` | User chooses Skip | none | Onboarding abandonment | Implemented |
| `deck_card_action` | Save or skip on a deck card | deal_id, action, position | Relevance and progress | Implemented, live observed |
| `deal_saved` | Unique save | deal_id, source_surface | Save intent | Implemented, live observed |
| `deck_completed` | Last deck card is handled | cards_seen, unique_saved_count | Completion and aha moment | Implemented, live observed |
| `offers_summary_shown` | Summary page renders | cards_seen, unique_saved_count | Completion | Implemented |
| `search_performed` | Discover search submit | query_length, result_count | Discoverability | Implemented, live observed |
| `ai_query_submitted` | Ask Mon send | query_length, history_length | Assistant use | Implemented, live observed |
| `ai_answer_shown` | Ask Mon response | result_count, latency_ms, mode, error_code | Assistant quality and fallback rate | Implemented, live observed |
| `deal_detail_viewed` | Detail page view | deal_id, source_surface | Detail discovery | Implemented |
| `outbound_offer_clicked` | Native outbound form submit | deal_id, source_surface | Best-effort click intent | Implemented |

## Boundaries

- A save is not a redemption.
- A click is not a purchase.
- The server-side `deal_clicks` row is operational data, separate from PostHog.
- No monetary savings total is computed.
- Funnel reporting uses analytics-enabled visitors only.
- The deck save event occurs before summary, so a funnel must not place the first save after summary.

## Verification

- PostHog project `735307` is connected.
- Default-on production visit on 2026-11-14 produced `landing_viewed` with no `$opt_in` event, confirming the new default-on path.
- Observed events on 2026-11-14: `deck_card_action` 30, `deal_saved` 13, `deck_completed` 3, `landing_viewed` 4 or more, `search_performed` 2, `ai_query_submitted` 1, `ai_answer_shown` 1.
- Three historical `$opt_in` events remain from the earlier consent-gated build. They are not part of the current flow.
- Mocked SDK behavior is not live evidence.
