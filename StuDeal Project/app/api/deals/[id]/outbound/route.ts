import { NextResponse } from "next/server";
import { CATALOG } from "@/lib/catalog-data";
import { getDealByIdServer, isAllowedDestination, logDealClick } from "@/lib/supabase";

const SOURCE_SURFACES = new Set([
  "detail",
  "deck",
  "summary",
  "discover",
  "ask_mon",
  "ask-mon",
  "pocket"
]);

const DEAL_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Yêu cầu không hợp lệ" }, { status: 400 });
  }

  const surface = form.get("source_surface");
  if (typeof surface !== "string" || !SOURCE_SURFACES.has(surface)) {
    return NextResponse.json({ error: "Yêu cầu không hợp lệ" }, { status: 400 });
  }

  const { id } = await context.params;
  if (!DEAL_ID_PATTERN.test(id)) {
    return NextResponse.json({ error: "Yêu cầu không hợp lệ" }, { status: 400 });
  }

  let deal;
  try {
    deal = await getDealByIdServer(id);
  } catch {
    return NextResponse.json(
      { error: "Danh mục tạm thời không khả dụng" },
      { status: 503 }
    );
  }

  if (!deal) {
    return NextResponse.json({ error: "Không tìm thấy ưu đãi" }, { status: 404 });
  }

  const approved = CATALOG.find((candidate) => candidate.id === deal.id);
  if (
    !approved ||
    approved.slug !== deal.slug ||
    !isAllowedDestination(approved, deal.destination_url)
  ) {
    return NextResponse.json({ error: "Liên kết không hợp lệ" }, { status: 400 });
  }

  await logDealClick({
    dealId: deal.id,
    sourceSurface: surface,
    destinationDomain: new URL(deal.destination_url).hostname
  });

  return NextResponse.redirect(deal.destination_url, 303);
}
