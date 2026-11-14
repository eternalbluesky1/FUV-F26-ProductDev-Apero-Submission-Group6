import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { askMon } from "@/lib/ask-mon";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Yêu cầu không hợp lệ" }, { status: 400 });
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
