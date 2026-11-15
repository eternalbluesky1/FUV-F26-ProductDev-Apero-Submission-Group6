import { createClient } from "@supabase/supabase-js";
import { getPublicDeals } from "./catalog";
import { fetchPublicDeals, getDataMode } from "./supabase-public";
import type { PublicDeal } from "./types";

export type { DataMode } from "./supabase-public";
export { getDataMode, hasPublicSupabaseConfig } from "./supabase-public";

function secretClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error("Supabase server configuration is missing");
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function getCatalog(): Promise<PublicDeal[]> {
  return fetchPublicDeals();
}

export async function getDealByIdServer(id: string): Promise<PublicDeal | undefined> {
  if (getDataMode() === "fixture") {
    return getPublicDeals().find((deal) => deal.id === id);
  }
  const deals = await getCatalog();
  return deals.find((deal) => deal.id === id);
}

export async function logDealClick(input: {
  dealId: string;
  sourceSurface: string;
  destinationDomain: string;
}): Promise<boolean> {
  if (getDataMode() === "fixture") return false;
  try {
    const supabase = secretClient();
    const { error } = await supabase.from("deal_clicks").insert({
      deal_id: input.dealId,
      source_surface: input.sourceSurface,
      destination_domain: input.destinationDomain
    });
    return !error;
  } catch {
    return false;
  }
}

export function isAllowedDestination(deal: PublicDeal, candidate: string): boolean {
  if (!deal.destination_url) return false;
  try {
    const allowed = new URL(deal.destination_url);
    const target = new URL(candidate);
    return allowed.href === target.href && target.protocol === "https:";
  } catch {
    return false;
  }
}

export function fixtureCatalogSize(): number {
  return getPublicDeals().length;
}
