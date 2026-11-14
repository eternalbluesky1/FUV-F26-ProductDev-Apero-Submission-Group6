import { z } from "zod";
import { getCatalog } from "./supabase";
import { searchDeals } from "./catalog";
import type { AskMonResponse, PublicDeal, Recommendation } from "./types";

const requestSchema = z.object({
  query: z.string().trim().min(1).max(500),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000)
      })
    )
    .max(6)
    .optional(),
  categories: z.array(z.string()).max(4).optional(),
  limit: z.number().int().min(1).max(3).optional(),
  recent_deal_ids: z.array(z.string()).max(3).optional()
});

export type AskMonRequest = z.infer<typeof requestSchema>;

const finalSchema = z.object({
  reply_markdown: z.string().min(1).max(4000),
  recommendations: z
    .array(
      z.object({
        deal_id: z.string(),
        reason: z.string().min(1).max(300)
      })
    )
    .max(3)
});

const searchTool = {
  type: "function",
  function: {
    name: "search_deals",
    description:
      "Tìm ưu đãi hiện hành trong danh mục StuDeal. Chỉ dùng dữ liệu trả về, không tự tạo ưu đãi.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Từ khóa ngắn, có thể có dấu tiếng Việt." },
        category: {
          type: "string",
          enum: ["cinema", "food", "software", "learning"],
          description: "Danh mục tùy chọn."
        },
        limit: { type: "integer", minimum: 1, maximum: 3 }
      },
      required: ["query"]
    }
  }
};

interface OpenRouterMessage {
  role: "system" | "user" | "assistant" | "tool";
  content?: string | null;
  tool_calls?: Array<{
    id: string;
    type: "function";
    function: { name: string; arguments: string };
  }>;
  tool_call_id?: string;
}

interface OpenRouterResponse {
  choices?: Array<{
    message?: OpenRouterMessage;
    finish_reason?: string;
  }>;
  error?: { message?: string };
}

function systemPrompt(): string {
  return [
    "Bạn là Mon, trợ lý tìm ưu đãi cho sinh viên Việt Nam trong ứng dụng StuDeal.",
    "Trả lời ngắn gọn bằng tiếng Việt, thân thiện, không dùng emoji.",
    "Khi người dùng hỏi về ưu đãi, phải gọi công cụ search_deals trước khi trả lời.",
    "Chỉ được nhắc đến ưu đãi có trong kết quả công cụ. Không tự bịa giá, điều kiện, hạn dùng, liên kết hoặc quan hệ đối tác.",
    "Nếu không có kết quả, nói rõ là chưa tìm thấy và gợi ý từ khóa khác.",
    "Sau khi có kết quả, trả về JSON đúng dạng: {",
    '  "reply_markdown": "câu trả lời ngắn",',
    '  "recommendations": [{"deal_id": "id trong kết quả", "reason": "lý do ngắn"}]',
    "}",
    "Tối đa 3 recommendations. Lời chào hoặc câu hỏi chung có thể có mảng rỗng."
  ].join("\n");
}

async function callOpenRouter(messages: OpenRouterMessage[]): Promise<OpenRouterResponse> {
  const key = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL;
  if (!key || !model) throw new Error("OpenRouter is not configured");
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://studeal.local",
      "X-Title": "StuDeal"
    },
    body: JSON.stringify({
      model,
      messages,
      tools: [searchTool],
      tool_choice: "auto",
      temperature: 0.2,
      max_tokens: 700
    }),
    signal: AbortSignal.timeout(20000)
  });
  if (!response.ok) throw new Error(`OpenRouter ${response.status}`);
  return (await response.json()) as OpenRouterResponse;
}

function parseJsonContent(content: string): unknown {
  const cleaned = content.replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON object in model response");
    return JSON.parse(match[0]);
  }
}

function executeTool(name: string, rawArgs: string, catalog: PublicDeal[]): PublicDeal[] {
  if (name !== "search_deals") throw new Error("Unknown tool");
  const parsed = z
    .object({
      query: z.string().max(200),
      category: z.enum(["cinema", "food", "software", "learning"]).optional(),
      limit: z.number().int().min(1).max(3).optional()
    })
    .parse(JSON.parse(rawArgs));
  return searchDeals(parsed.query, parsed.category, parsed.limit ?? 3, catalog);
}

function toRecommendations(ids: Array<{ deal_id: string; reason: string }>, catalog: PublicDeal[]): Recommendation[] {
  const seen = new Set<string>();
  const output: Recommendation[] = [];
  for (const item of ids) {
    if (seen.has(item.deal_id)) continue;
    const deal = catalog.find((candidate) => candidate.id === item.deal_id);
    if (!deal) continue;
    seen.add(item.deal_id);
    output.push({ deal, reason: item.reason });
    if (output.length === 3) break;
  }
  return output;
}

function deterministic(query: string, catalog: PublicDeal[], mode: "matching" | "fallback"): AskMonResponse {
  const deals = searchDeals(query, undefined, 3, catalog);
  const greeting = /^(hi|hello|chào|chao|xin chào|xin chao|hey)\b/i.test(query.trim());
  if (greeting && deals.length === 0) {
    return {
      mode,
      reply_markdown: "Chào bạn, mình là Mon. Bạn muốn tìm ưu đãi phim, ăn uống, phần mềm hay học tập?",
      recommendations: []
    };
  }
  if (deals.length === 0) {
    return {
      mode,
      reply_markdown:
        "Mình chưa tìm thấy ưu đãi phù hợp trong danh mục hiện tại. Bạn thử từ khóa khác hoặc xem trang Khám phá nhé.",
      recommendations: []
    };
  }
  return {
    mode,
    reply_markdown: "Mình tìm được vài ưu đãi phù hợp trong danh mục hiện tại:",
    recommendations: deals.map((deal) => ({
      deal,
      reason: `Phù hợp với từ khóa "${query.trim()}".`
    }))
  };
}

export async function askMon(input: unknown): Promise<AskMonResponse> {
  const request = requestSchema.parse(input);
  const catalog = await getCatalog();
  const key = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL;
  if (!key || !model) return deterministic(request.query, catalog, "matching");

  const messages: OpenRouterMessage[] = [
    { role: "system", content: systemPrompt() },
    ...(request.history ?? []).map((message) => ({
      role: message.role,
      content: message.content
    })),
    { role: "user", content: request.query }
  ];

  try {
    const toolDeals = new Map<string, PublicDeal>();
    for (let round = 0; round < 3; round += 1) {
      const response = await callOpenRouter(messages);
      const message = response.choices?.[0]?.message;
      if (!message) throw new Error("OpenRouter returned no message");
      if (message.tool_calls?.length) {
        if (round === 2) break;
        messages.push(message);
        for (const call of message.tool_calls.slice(0, 3)) {
          const results = executeTool(call.function.name, call.function.arguments, catalog);
          for (const deal of results) toolDeals.set(deal.id, deal);
          messages.push({
            role: "tool",
            tool_call_id: call.id,
            content: JSON.stringify(
              results.map((deal) => ({
                id: deal.id,
                slug: deal.slug,
                brand_name: deal.brand_name,
                title: deal.title,
                category: deal.category,
                benefit_label: deal.benefit_label,
                eligibility_kind: deal.eligibility_kind,
                eligibility_text: deal.eligibility_text,
                source_url: deal.source_url,
                source_checked_at: deal.source_checked_at
              }))
            )
          });
        }
        continue;
      }
      const parsed = finalSchema.safeParse(parseJsonContent(message.content ?? ""));
      if (!parsed.success) throw new Error("Invalid final JSON");
      const recommendations = toRecommendations(parsed.data.recommendations, catalog);
      if (recommendations.length === 0 && toolDeals.size > 0) {
        return {
          mode: "ai",
          reply_markdown: parsed.data.reply_markdown,
          recommendations: [...toolDeals.values()].slice(0, 3).map((deal) => ({
            deal,
            reason: "Kết quả từ danh mục hiện tại."
          }))
        };
      }
      return { mode: "ai", reply_markdown: parsed.data.reply_markdown, recommendations };
    }
    throw new Error("Tool loop ended without final answer");
  } catch {
    return deterministic(request.query, catalog, "fallback");
  }
}

export { requestSchema };
