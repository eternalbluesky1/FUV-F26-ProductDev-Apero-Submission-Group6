"use client";

import { capture } from "@/lib/analytics";

export function OutboundForm({ dealId }: { dealId: string }) {
  return (
    <form
      action={`/api/deals/${dealId}/outbound`}
      method="post"
      className="mt-6"
      onSubmit={() => {
        capture("outbound_offer_clicked", { deal_id: dealId, source_surface: "detail" });
      }}
    >
      <input type="hidden" name="source_surface" value="detail" />
      <button
        type="submit"
        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-brand-purple px-5 font-semibold text-white transition hover:bg-brand-purple-hover sm:w-auto"
      >
        Mở nguồn chính thức
      </button>
    </form>
  );
}
