"use client";

import { useEffect } from "react";
import { capture } from "@/lib/analytics";

export function DealTracker({ dealId }: { dealId: string }) {
  useEffect(() => {
    capture("deal_detail_viewed", { deal_id: dealId, source_surface: "detail" });
  }, [dealId]);
  return null;
}
