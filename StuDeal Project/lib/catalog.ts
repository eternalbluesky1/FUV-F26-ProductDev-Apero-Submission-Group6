import { CATALOG, CATEGORY_LABELS } from "./catalog-data";
import type { Category, PublicDeal } from "./types";

export function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

export function isCurrentlyPublic(deal: PublicDeal, now = new Date()): boolean {
  if (deal.content_status !== "current_snapshot") return false;
  if (!deal.source_checked_at) return false;
  if (!deal.review_by || new Date(deal.review_by) <= now) return false;
  if (deal.starts_at && new Date(deal.starts_at) > now) return false;
  if (deal.expires_at && new Date(deal.expires_at) <= now) return false;
  return true;
}

export function getPublicDeals(now = new Date()): PublicDeal[] {
  return CATALOG.filter((deal) => isCurrentlyPublic(deal, now));
}

export function getDealBySlug(slug: string): PublicDeal | undefined {
  return getPublicDeals().find((deal) => deal.slug === slug);
}

export function getDealById(id: string): PublicDeal | undefined {
  return getPublicDeals().find((deal) => deal.id === id);
}

const STOP_WORDS = new Set([
  "tim",
  "cho",
  "cua",
  "va",
  "co",
  "khong",
  "la",
  "gi",
  "nhu",
  "the",
  "nao",
  "minh",
  "ban",
  "muon",
  "duoc",
  "nay",
  "do",
  "voi",
  "trong",
  "mot",
  "cac",
  "nhung",
  "toi",
  "can"
]);

function queryTokens(query: string): string[] {
  return normalize(query)
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

export function searchDeals(
  query: string,
  category?: string,
  limit = 3,
  deals = getPublicDeals()
): PublicDeal[] {
  const tokens = queryTokens(query);
  const ranked = deals
    .filter((deal) => !category || deal.category === category)
    .map((deal) => {
      const haystack = normalize(
        [
          deal.brand_name,
          deal.title,
          deal.benefit_label,
          deal.eligibility_text,
          deal.category,
          CATEGORY_LABELS[deal.category] ?? ""
        ].join(" ")
      );
      const score = tokens.length
        ? tokens.reduce((total, token) => total + (haystack.includes(token) ? 1 : 0), 0)
        : 1;
      return { deal, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.deal.slug.localeCompare(b.deal.slug));
  return ranked.slice(0, Math.max(1, Math.min(limit, 3))).map((entry) => entry.deal);
}

export function rankDeck(deals: PublicDeal[], interests: Category[]): PublicDeal[] {
  const selected = new Set(interests);
  return [...deals].sort((a, b) => {
    const aMatch = selected.has(a.category) ? 0 : 1;
    const bMatch = selected.has(b.category) ? 0 : 1;
    if (aMatch !== bMatch) return aMatch - bMatch;
    return a.slug.localeCompare(b.slug);
  });
}

export function featuredDeals(): PublicDeal[] {
  return getPublicDeals().filter((deal) =>
    ["galaxy-u22-2d", "highlands-referral", "github-pro-student", "datacamp-student-pack"].includes(
      deal.slug
    )
  );
}
