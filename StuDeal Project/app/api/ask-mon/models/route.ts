import { NextResponse } from "next/server";
import { ASK_MON_MODELS, resolveModel } from "@/lib/ask-mon-models";

export function GET() {
  return NextResponse.json(
    {
      models: ASK_MON_MODELS,
      default_model: resolveModel()
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
