import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getCatalog } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const TIMEOUT_MS = 15000;
const USER_AGENT =
  "StuDeal-Source-Check/1.0 (+https://fuv-f26-productdev-apero-submission.vercel.app)";

function authorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const header = request.headers.get("authorization");
  return header === `Bearer ${secret}`;
}

async function checkSource(url: string): Promise<number> {
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: { "User-Agent": USER_AGENT, Accept: "text/html,text/plain,*/*" },
      signal: AbortSignal.timeout(TIMEOUT_MS)
    });
    return response.status;
  } catch {
    return 0;
  }
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const deals = await getCatalog().catch(() => []);
  const checkedAt = new Date().toISOString();

  const results = await Promise.all(
    deals.map(async (deal) => {
      const status = await checkSource(deal.source_url);
      return { slug: deal.slug, status };
    })
  );

  const blocked = results.filter(
    (result) => result.status === 401 || result.status === 403 || result.status === 429
  );
  const failures = results.filter(
    (result) =>
      result.status === 0 ||
      (result.status >= 400 && ![401, 403, 429].includes(result.status))
  );

  for (const result of results) {
    await supabase
      .from("deals")
      .update({
        source_last_status: result.status,
        source_last_checked_at: checkedAt
      })
      .eq("slug", result.slug);
  }

  return NextResponse.json({
    checked_at: checkedAt,
    checked: results.length,
    failing: failures.length,
    blocked: blocked.length,
    failures: failures.map((failure) => ({ slug: failure.slug, status: failure.status })),
    blocked_sources: blocked.map((result) => ({ slug: result.slug, status: result.status }))
  });
}
