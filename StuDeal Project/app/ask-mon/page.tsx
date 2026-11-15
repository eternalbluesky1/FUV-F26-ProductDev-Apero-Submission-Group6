"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import { Mascot } from "@/components/mascot";
import { OfferCard } from "@/components/offer-card";
import { capture } from "@/lib/analytics";
import { isSafeHttpUrl } from "@/lib/utils";
import { ASK_MON_MODELS, isAllowedModel } from "@/lib/ask-mon-models";
import type { AskMonMode, AskMonResponse, ChatMessage, PublicDeal, Recommendation } from "@/lib/types";

const MODE_NOTES: Partial<Record<AskMonMode, string>> = {
  ai: "Trả lời trực tiếp",
  matching: "Danh mục",
  fallback: "Tạm thời"
};

const SUGGESTIONS = [
  "Tìm vé phim cho sinh viên",
  "Ưu đãi phần mềm miễn phí",
  "Quán cà phê có voucher"
];

interface ChatEntry extends ChatMessage {
  id: string;
  mode?: AskMonMode;
  recommendations?: Recommendation[];
}

const markdownComponents: Components = {
  a: ({ href, children }) => {
    if (!href || !isSafeHttpUrl(href)) {
      return <span>{children}</span>;
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer nofollow">
        {children}
      </a>
    );
  },
  img: () => null
};

function isPublicDeal(value: unknown): value is PublicDeal {
  if (!value || typeof value !== "object") return false;
  const deal = value as Record<string, unknown>;
  return (
    typeof deal.id === "string" &&
    typeof deal.slug === "string" &&
    typeof deal.brand_name === "string" &&
    typeof deal.title === "string" &&
    (deal.category === "cinema" ||
      deal.category === "food" ||
      deal.category === "software" ||
      deal.category === "learning") &&
    typeof deal.benefit_label === "string" &&
    typeof deal.eligibility_kind === "string" &&
    typeof deal.eligibility_text === "string" &&
    typeof deal.source_url === "string" &&
    typeof deal.source_checked_at === "string"
  );
}

function parseResponse(value: unknown): AskMonResponse | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const mode = record.mode;
  const reply = record.reply_markdown;
  if (mode !== "ai" && mode !== "matching" && mode !== "fallback") return null;
  if (typeof reply !== "string" || reply.trim().length === 0) return null;
  const recommendations: Recommendation[] = [];
  if (Array.isArray(record.recommendations)) {
    for (const item of record.recommendations) {
      if (!item || typeof item !== "object") continue;
      const entry = item as Record<string, unknown>;
      if (typeof entry.reason !== "string" || !isPublicDeal(entry.deal)) continue;
      recommendations.push({ deal: entry.deal, reason: entry.reason });
      if (recommendations.length === 3) break;
    }
  }
  return { mode, reply_markdown: reply, recommendations };
}

function historyFrom(entries: ChatEntry[]): ChatMessage[] {
  return entries
    .slice(-6)
    .filter((entry) => entry.content.trim().length > 0)
    .map((entry) => ({ role: entry.role, content: entry.content.slice(0, 2000) }));
}

function ModeNote({ mode }: { mode: AskMonMode }) {
  const note = MODE_NOTES[mode];
  if (!note) return null;
  return <span className="text-xs font-medium text-muted">{note}</span>;
}

export default function AskMonPage() {
  const [messages, setMessages] = useState<ChatEntry[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [pendingQuery, setPendingQuery] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [failedQuery, setFailedQuery] = useState<string | null>(null);
  const [model, setModel] = useState<string>(ASK_MON_MODELS[0].id);
  const logRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  useEffect(() => {
    let active = true;
    void fetch("/api/ask-mon/models")
      .then((response) => response.json())
      .then((payload: { default_model?: string }) => {
        if (active && isAllowedModel(payload.default_model)) {
          setModel(payload.default_model);
        }
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const node = logRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, pending]);

  function createId(): string {
    nextId.current += 1;
    return `msg-${nextId.current}`;
  }

  async function submit(raw: string) {
    const text = raw.trim();
    if (!text || pending) return;
    const startedAt = Date.now();
    const queryLength = text.length;
    setError(null);
    setFailedQuery(null);
    setPending(true);
    setPendingQuery(text);
    capture("ai_query_submitted", { query_length: queryLength });
    try {
      const response = await fetch("/api/ask-mon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text, history: historyFrom(messages), limit: 3, model })
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = parseResponse((await response.json()) as unknown);
      if (!payload) throw new Error("Invalid response");
      const question: ChatEntry = { id: createId(), role: "user", content: text };
      const answer: ChatEntry = {
        id: createId(),
        role: "assistant",
        content: payload.reply_markdown,
        mode: payload.mode,
        recommendations: payload.recommendations
      };
      setMessages((current) => [...current, question, answer]);
      setInput("");
      setPendingQuery(null);
      capture("ai_answer_shown", {
        mode: payload.mode,
        result_count: payload.recommendations.length,
        query_length: queryLength,
        latency_ms: Date.now() - startedAt
      });    } catch {
      setError("Không gửi được câu hỏi. Kiểm tra kết nối rồi thử lại.");
      setFailedQuery(text);
      setPendingQuery(null);
    } finally {
      setPending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submit(input);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      void submit(input);
    }
  }

  function clearConversation() {
    setMessages([]);
    setInput("");
    setError(null);
    setFailedQuery(null);
    setPendingQuery(null);
  }

  function retry() {
    if (failedQuery) void submit(failedQuery);
  }

  return (
    <div className="page-wrap grid gap-6 py-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
      <aside className="order-2 space-y-4 lg:order-1">
        <div className="card-surface p-5">
          <Mascot pose="thinking" className="mx-auto h-auto w-40" priority />
          <h1 className="mt-3 font-display text-3xl font-bold text-ink">Hỏi Mon</h1>
          <p className="mt-2 text-sm text-muted">
            Mon tìm ưu đãi trong danh mục hiện hành, giải thích điều kiện ngắn gọn và chỉ gợi ý các
            ưu đãi có thật.
          </p>
          <p className="mt-4 text-sm text-muted">
            Mon trả lời trực tiếp khi kết nối hoạt động. Nếu mô hình tạm thời không phản hồi, Mon vẫn
            tìm trong danh mục hiện hành để bạn không bị kẹt.
          </p>
          <p className="mt-4 rounded-xl bg-surface-lilac p-3 text-xs text-ink">
            Tin nhắn và vài lượt gần nhất có thể được gửi tới nhà cung cấp mô hình khi ở chế độ AI
            trực tiếp. Đừng nhập thông tin nhạy cảm.{" "}
            <Link href="/privacy" className="font-semibold text-brand-purple underline">
              Chính sách riêng tư
            </Link>
          </p>
          <Link
            href="/discover"
            className="mt-4 inline-flex text-sm font-semibold text-brand-purple underline"
          >
            Xem toàn bộ danh mục
          </Link>
          <div className="mt-5 border-t border-border pt-4">
            <label
              htmlFor="ask-mon-model"
              className="block text-xs font-bold uppercase tracking-[0.14em] text-muted"
            >
              Mô hình AI
            </label>
            <select
              id="ask-mon-model"
              value={model}
              onChange={(event) => setModel(event.target.value)}
              className="mt-2 w-full min-h-11 rounded-xl border border-border bg-white px-3 text-sm font-semibold text-ink"
            >
              {ASK_MON_MODELS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label} {option.free ? "(miễn phí)" : ""}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-muted">
              {ASK_MON_MODELS.find((option) => option.id === model)?.note ??
                "Mô hình dùng cho câu hỏi tiếp theo."}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={clearConversation}
          disabled={messages.length === 0 && !pending}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-border bg-white px-4 text-sm font-semibold text-ink transition hover:border-danger hover:text-danger disabled:cursor-not-allowed disabled:border-border disabled:text-muted"
        >
          Xóa hội thoại
        </button>
      </aside>

      <section aria-label="Cuộc trò chuyện với Mon" className="card-surface order-1 overflow-hidden lg:order-2">
        <div className="border-b border-border px-4 py-3 sm:px-5">
          <p className="text-sm font-bold text-ink">Mon</p>
          <p className="text-xs text-muted">Trợ lý tìm ưu đãi cho sinh viên</p>
        </div>

        <div
          ref={logRef}
          role="log"
          aria-live="polite"
          aria-label="Tin nhắn với Mon"
          className="min-h-64 max-h-[55vh] space-y-4 overflow-y-auto p-4 sm:p-5 lg:max-h-[60vh]"
        >
          {messages.length === 0 && !pending ? (
            <div className="mx-auto max-w-md space-y-3 py-6 text-center">
              <p className="font-display text-2xl font-bold text-ink">Chào bạn, mình là Mon.</p>
              <p className="text-sm text-muted">
                Bạn muốn tìm ưu đãi gì hôm nay? Thử một gợi ý bên dưới hoặc nhập câu hỏi của bạn.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => void submit(suggestion)}
                    className="rounded-full border border-border bg-white px-3 py-2 text-sm font-semibold text-ink transition hover:border-brand-purple hover:text-brand-purple"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {messages.map((entry) =>
            entry.role === "user" ? (
              <div key={entry.id} className="flex justify-end">
                <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-brand-purple px-4 py-3 text-sm text-white">
                  {entry.content}
                </div>
              </div>
            ) : (
              <div key={entry.id} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-yellow text-xs font-bold text-ink">
                    M
                  </span>
                  <span className="text-sm font-semibold text-ink">Mon</span>
                  {entry.mode ? <ModeNote mode={entry.mode} /> : null}
                </div>
                <div className="max-w-[92%] rounded-2xl rounded-tl-md border border-border bg-white px-4 py-3">
                  <div className="prose-mon max-w-none break-words text-sm leading-6 text-ink">
                    <ReactMarkdown
                      skipHtml
                      unwrapDisallowed
                      allowedElements={["p", "br", "strong", "em", "a", "ul", "ol", "li"]}
                      components={markdownComponents}
                    >
                      {entry.content}
                    </ReactMarkdown>
                  </div>
                  {entry.recommendations && entry.recommendations.length > 0 ? (
                    <ul className="mt-4 space-y-4">
                      {entry.recommendations.slice(0, 3).map((recommendation) => (
                        <li key={recommendation.deal.id} className="space-y-2">
                          <p className="text-sm text-muted">{recommendation.reason}</p>
                          <OfferCard deal={recommendation.deal} compact />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            )
          )}

          {pending && pendingQuery ? (
            <div className="flex justify-end">
              <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-brand-purple/60 px-4 py-3 text-sm text-white">
                {pendingQuery}
              </div>
            </div>
          ) : null}

          {pending ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-yellow text-xs font-bold text-ink">
                  M
                </span>
                <span className="text-sm font-semibold text-ink">Mon</span>
              </div>
              <p className="max-w-[92%] rounded-2xl rounded-tl-md border border-border bg-white px-4 py-3 text-sm text-muted">
                Mon đang tìm ưu đãi...
              </p>
            </div>
          ) : null}
        </div>

        <form onSubmit={handleSubmit} className="border-t border-border p-3 sm:p-4">
          {error ? (
            <div
              role="alert"
              className="mb-3 flex flex-col gap-2 rounded-xl border border-danger/30 bg-danger-surface p-3 text-sm text-danger sm:flex-row sm:items-center sm:justify-between"
            >
              <p>{error}</p>
              <div className="flex gap-2">
                {failedQuery ? (
                  <button
                    type="button"
                    onClick={retry}
                    disabled={pending}
                    className="inline-flex min-h-10 items-center rounded-lg bg-danger px-3 text-sm font-semibold text-white disabled:opacity-60"
                  >
                    Thử lại
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setFailedQuery(null);
                  }}
                  className="inline-flex min-h-10 items-center rounded-lg border border-danger/30 bg-white px-3 text-sm font-semibold text-danger"
                >
                  Đóng
                </button>
              </div>
            </div>
          ) : null}

          <label htmlFor="ask-mon-input" className="sr-only">
            Câu hỏi cho Mon
          </label>
          <textarea
            id="ask-mon-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={500}
            rows={2}
            aria-describedby="ask-mon-hint"
            placeholder="Ví dụ: tìm vé phim cho sinh viên"
            className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3 text-base text-ink placeholder:text-muted"
          />
          <div className="mt-2 flex items-center justify-between gap-3">
            <p id="ask-mon-hint" className="text-xs text-muted">
              Enter để gửi, Shift+Enter để xuống dòng. Tối đa 500 ký tự.
            </p>
            <button
              type="submit"
              disabled={pending || input.trim().length === 0}
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-brand-purple px-5 text-sm font-semibold text-white transition hover:bg-brand-purple-hover disabled:cursor-not-allowed disabled:bg-border disabled:text-muted"
            >
              {pending ? "Đang gửi..." : "Gửi"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
