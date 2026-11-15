import { CATALOG, CATEGORY_LABELS } from "./catalog-data";
import type { Category, EligibilityKind, PublicDeal } from "./types";

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

const STUDENT_TOKENS = ["sinh vien", "student", "hoc sinh"];

const CATEGORY_PATTERNS: Array<{ category: Category; pattern: RegExp }> = [
  { category: "cinema", pattern: /\b(phim|rap|cinema|u22)\b/ },
  { category: "food", pattern: /\b(phe|coffee|uong|voucher|quan|nha hang|food)\b/ },
  { category: "software", pattern: /\b(phan mem|cong cu|ung dung|software|app|tool|ide)\b/ },
  { category: "learning", pattern: /\b(hoc tap|khoa hoc|course|chung chi|dao tao)\b/ },
  { category: "shopping", pattern: /\b(mua sam|shopping|thiet bi|laptop|dien thoai)\b/ },
  { category: "transport", pattern: /\b(di chuyen|xe buyt|di lai|giao thong|bus)\b/ }
];

function isStudentQuery(tokens: string[]): boolean {
  const joined = tokens.join(" ");
  return STUDENT_TOKENS.some((token) => joined.includes(token));
}

function matchedCategories(text: string): Set<Category> {
  const matched = new Set<Category>();
  for (const entry of CATEGORY_PATTERNS) {
    if (entry.pattern.test(text)) matched.add(entry.category);
  }
  return matched;
}

function studentBoost(kind: EligibilityKind): number {
  if (kind === "student_only" || kind === "student_verified_education") return 4;
  if (kind === "age_based") return 2;
  return 0;
}

export function searchDeals(
  query: string,
  category?: string,
  limit = 3,
  deals = getPublicDeals()
): PublicDeal[] {
  const tokens = queryTokens(query);
  const studentQuery = isStudentQuery(tokens);
  const queryText = normalize(query);
  const wanted = matchedCategories(queryText);
  const ranked = deals
    .filter((deal) => !category || deal.category === category)
    .map((deal) => {
      const headline = normalize(
        [deal.brand_name, deal.title, deal.benefit_label, deal.offer_type].join(" ")
      );
      const detail = normalize(
        [deal.eligibility_text, CATEGORY_LABELS[deal.category] ?? ""].join(" ")
      );
      const score = tokens.length
        ? tokens.reduce((total, token) => {
            if (headline.includes(token)) return total + 3;
            if (detail.includes(token)) return total + 1;
            return total;
          }, 0)
        : 1;
      const boost = studentQuery ? studentBoost(deal.eligibility_kind) : 0;
      const categoryBoost = wanted.has(deal.category) ? 8 : 0;
      return { deal, score: score + boost + categoryBoost };
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
  const featured = [
    "galaxy-u22-2d",
    "highlands-vietcombank-jcb",
    "github-pro-student",
    "figma-education",
    "shopee-sinh-vien",
    "bhd-star-u22"
  ];
  return getPublicDeals().filter((deal) => featured.includes(deal.slug));
}
