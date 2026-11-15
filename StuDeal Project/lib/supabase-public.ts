import { getPublicDeals, isCurrentlyPublic } from "./catalog";
import type { PublicDeal } from "./types";

export type DataMode = "fixture" | "supabase";

export function getDataMode(): DataMode {
  return process.env.NEXT_PUBLIC_STUDEAL_DATA_MODE === "fixture" ? "fixture" : "supabase";
}

export function hasPublicSupabaseConfig(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
}

export async function fetchPublicDeals(): Promise<PublicDeal[]> {
  if (getDataMode() === "fixture" || !hasPublicSupabaseConfig()) return getPublicDeals();
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string;
  const query = new URLSearchParams({
    select: "*",
    content_status: "eq.current_snapshot",
    source_checked_at: "not.is.null",
    review_by: `gt.${new Date().toISOString()}`,
    order: "slug.asc"
  });
  const response = await fetch(`${base}/rest/v1/deals?${query.toString()}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}`, Accept: "application/json" },
    cache: "no-store"
  });
  if (!response.ok) throw new Error(`Catalog request failed with ${response.status}`);
  const data = (await response.json()) as PublicDeal[];
  return data.filter((deal) => isCurrentlyPublic(deal));
}
