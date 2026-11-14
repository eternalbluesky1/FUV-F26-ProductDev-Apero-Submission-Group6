export type Category = "cinema" | "food" | "software" | "learning";

export type EligibilityKind =
  | "student_only"
  | "age_based"
  | "member"
  | "referral"
  | "general"
  | "student_verified_education";

export interface PublicDeal {
  id: string;
  slug: string;
  brand_name: string;
  title: string;
  category: Category;
  offer_type: string;
  benefit_label: string;
  eligibility_kind: EligibilityKind;
  eligibility_text: string;
  source_url: string;
  destination_url: string;
  source_type: string;
  source_checked_at: string;
  review_by: string;
  content_status: "current_snapshot" | "needs_review" | "expired" | "demo_fixture";
  relationship_label: string;
  redemption_steps: string | null;
  cities: string[] | null;
  starts_at: string | null;
  expires_at: string | null;
}

export interface Recommendation {
  deal: PublicDeal;
  reason: string;
}

export type AskMonMode = "ai" | "matching" | "fallback";

export interface AskMonResponse {
  mode: AskMonMode;
  reply_markdown: string;
  recommendations: Recommendation[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface GuestState {
  version: 1;
  selectedInterests: Category[];
  onboarding: "pending" | "done" | "skipped";
  deckIds: string[];
  seenIds: string[];
  savedIds: string[];
}
