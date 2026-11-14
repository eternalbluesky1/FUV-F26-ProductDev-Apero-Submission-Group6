import { describe, expect, it } from "vitest";
import {
  isCurrentlyPublic,
  normalize,
  rankDeck,
  searchDeals
} from "@/lib/catalog";
import { CATALOG } from "@/lib/catalog-data";
import type { PublicDeal } from "@/lib/types";

function baseDeal(overrides: Partial<PublicDeal> = {}): PublicDeal {
  return {
    id: "00000000-0000-4000-8000-000000000001",
    slug: "example-deal",
    brand_name: "Example",
    title: "Example offer",
    category: "cinema",
    offer_type: "Test",
    benefit_label: "Test benefit",
    eligibility_kind: "general",
    eligibility_text: "Test eligibility",
    source_url: "https://example.com/source",
    destination_url: "https://example.com/destination",
    source_type: "official",
    source_checked_at: "2026-01-01",
    review_by: "2027-01-01T00:00:00.000Z",
    content_status: "current_snapshot",
    relationship_label: "Không có quan hệ đối tác",
    redemption_steps: null,
    cities: null,
    starts_at: null,
    expires_at: null,
    ...overrides
  };
}

describe("normalize", () => {
  it("strips Vietnamese diacritics", () => {
    expect(normalize("Đại học")).toBe("dai hoc");
    expect(normalize("Ưu đãi")).toBe("uu dai");
    expect(normalize("Sinh Viên")).toBe("sinh vien");
  });

  it("maps đ and Đ to d", () => {
    expect(normalize("đ")).toBe("d");
    expect(normalize("Đ")).toBe("d");
    expect(normalize("Đà Nẵng")).toBe("da nang");
  });

  it("trims and lowercases plain text", () => {
    expect(normalize("  HELLO  ")).toBe("hello");
  });
});

describe("isCurrentlyPublic", () => {
  const now = new Date("2026-06-01T00:00:00.000Z");

  it("accepts a current snapshot within its window", () => {
    expect(isCurrentlyPublic(baseDeal(), now)).toBe(true);
  });

  it("requires content_status current_snapshot", () => {
    expect(isCurrentlyPublic(baseDeal({ content_status: "needs_review" }), now)).toBe(false);
    expect(isCurrentlyPublic(baseDeal({ content_status: "expired" }), now)).toBe(false);
    expect(isCurrentlyPublic(baseDeal({ content_status: "demo_fixture" }), now)).toBe(false);
  });

  it("requires source_checked_at", () => {
    expect(
      isCurrentlyPublic(baseDeal({ source_checked_at: null as unknown as string }), now)
    ).toBe(false);
  });

  it("requires review_by strictly after now", () => {
    expect(isCurrentlyPublic(baseDeal({ review_by: now.toISOString() }), now)).toBe(false);
    expect(
      isCurrentlyPublic(baseDeal({ review_by: "2026-06-01T00:00:00.001Z" }), now)
    ).toBe(true);
    expect(isCurrentlyPublic(baseDeal({ review_by: "2026-05-31T23:59:59.999Z" }), now)).toBe(
      false
    );
  });

  it("allows starts_at exactly now and rejects future starts", () => {
    expect(isCurrentlyPublic(baseDeal({ starts_at: now.toISOString() }), now)).toBe(true);
    expect(
      isCurrentlyPublic(baseDeal({ starts_at: "2026-06-01T00:00:00.001Z" }), now)
    ).toBe(false);
  });

  it("rejects expires_at exactly now and accepts future expiry", () => {
    expect(isCurrentlyPublic(baseDeal({ expires_at: now.toISOString() }), now)).toBe(false);
    expect(
      isCurrentlyPublic(baseDeal({ expires_at: "2026-06-01T00:00:00.001Z" }), now)
    ).toBe(true);
  });

  it("treats null start and expiry as open", () => {
    expect(isCurrentlyPublic(baseDeal({ starts_at: null, expires_at: null }), now)).toBe(true);
  });
});

describe("searchDeals", () => {
  it("matches accent-insensitive brand and benefit text", () => {
    const results = searchDeals("galaxy", undefined, 3, CATALOG);
    expect(results.map((deal) => deal.slug)).toEqual([
      "galaxy-cineg-online",
      "galaxy-u22-2d"
    ]);
  });

  it("matches Vietnamese text without accents", () => {
    const results = searchDeals("sinh vien", undefined, 3, CATALOG);
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((deal) => deal.slug === "cgv-student-ticket")).toBe(true);
  });

  it("filters by category", () => {
    const results = searchDeals("", "cinema", 3, CATALOG);
    expect(results).toHaveLength(3);
    expect(results.every((deal) => deal.category === "cinema")).toBe(true);
  });

  it("clamps limit to one through three", () => {
    expect(searchDeals("", undefined, 99, CATALOG)).toHaveLength(3);
    expect(searchDeals("", undefined, 1, CATALOG)).toHaveLength(1);
    expect(searchDeals("", undefined, 0, CATALOG)).toHaveLength(1);
  });

  it("returns an empty array when nothing matches", () => {
    expect(searchDeals("khong-co-uu-dai-nao", undefined, 3, CATALOG)).toEqual([]);
  });

  it("searches only the supplied deal collection", () => {
    const deals = [
      baseDeal({ id: "a", slug: "alpha", brand_name: "Alpha" }),
      baseDeal({ id: "b", slug: "beta", brand_name: "Beta" })
    ];
    expect(searchDeals("alpha", undefined, 3, deals).map((deal) => deal.slug)).toEqual([
      "alpha"
    ]);
  });
});

describe("rankDeck", () => {
  it("puts interested categories first and keeps slug order within groups", () => {
    const deals = [
      baseDeal({ id: "a", slug: "b-cinema", category: "cinema" }),
      baseDeal({ id: "b", slug: "a-software", category: "software" }),
      baseDeal({ id: "c", slug: "c-cinema", category: "cinema" }),
      baseDeal({ id: "d", slug: "d-food", category: "food" })
    ];

    expect(rankDeck(deals, ["cinema"]).map((deal) => deal.slug)).toEqual([
      "b-cinema",
      "c-cinema",
      "a-software",
      "d-food"
    ]);
  });

  it("falls back to slug order with no interests", () => {
    const deals = [
      baseDeal({ id: "a", slug: "zulu" }),
      baseDeal({ id: "b", slug: "alpha" })
    ];

    expect(rankDeck(deals, []).map((deal) => deal.slug)).toEqual(["alpha", "zulu"]);
  });

  it("does not mutate the input array", () => {
    const deals = [
      baseDeal({ id: "a", slug: "zulu" }),
      baseDeal({ id: "b", slug: "alpha" })
    ];
    const snapshot = deals.map((deal) => deal.slug);

    rankDeck(deals, ["software"]);

    expect(deals.map((deal) => deal.slug)).toEqual(snapshot);
  });
});
