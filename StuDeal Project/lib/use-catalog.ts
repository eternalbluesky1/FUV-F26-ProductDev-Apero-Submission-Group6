"use client";

import { useEffect, useState } from "react";
import { getPublicDeals } from "./catalog";
import { fetchPublicDeals, getDataMode, hasPublicSupabaseConfig } from "./supabase-public";
import type { PublicDeal } from "./types";

export function useCatalog(): PublicDeal[] {
  const [deals, setDeals] = useState<PublicDeal[]>(() => getPublicDeals());

  useEffect(() => {
    if (getDataMode() === "fixture" || !hasPublicSupabaseConfig()) return;
    let active = true;
    fetchPublicDeals()
      .then((remote) => {
        if (active && remote.length > 0) setDeals(remote);
      })
      .catch(() => {
        if (active) window.dispatchEvent(new Event("studeal:fixture-fallback"));
      });
    return () => {
      active = false;
    };
  }, []);

  return deals;
}
