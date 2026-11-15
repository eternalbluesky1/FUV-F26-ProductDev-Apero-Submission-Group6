import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { askMon } from "@/lib/ask-mon";
import { isAllowedModel } from "@/lib/ask-mon-models";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Yêu cầu không hợp lệ" }, { status: 400 });
  }

  const requestedModel =
    body && typeof body === "object" && "model" in body
      ? (body as { model?: unknown }).model
      : undefined;

  if (requestedModel !== undefined && !isAllowedModel(requestedModel as string)) {
    return NextResponse.json({ error: "Mô hình không được hỗ trợ" }, { status: 400 });
  }

  try {
    const result = await askMon(body);
    return NextResponse.json(result, {
      headers: { "Cache-Control": "no-store" }
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Yêu cầu không hợp lệ" }, { status: 400 });
    }
    return NextResponse.json({ error: "Danh mục tạm thời không khả dụng" }, { status: 503 });
  }
}
