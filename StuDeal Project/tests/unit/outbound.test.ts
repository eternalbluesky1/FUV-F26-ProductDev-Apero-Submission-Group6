import { describe, expect, it } from "vitest";
import { isAllowedDestination } from "@/lib/supabase";
import { CATALOG } from "@/lib/catalog-data";

const deal = CATALOG[0];

describe("isAllowedDestination", () => {
  it("accepts the exact stored HTTPS destination", () => {
    expect(isAllowedDestination(deal, deal.destination_url)).toBe(true);
  });

  it("accepts only deals with an HTTPS destination", () => {
    expect(
      isAllowedDestination({ ...deal, destination_url: "http://example.com/offer" }, "http://example.com/offer")
    ).toBe(false);
  });

  it("rejects a different host", () => {
    expect(isAllowedDestination(deal, "https://example.org/u22/")).toBe(false);
  });

  it("rejects a different path", () => {
    expect(isAllowedDestination(deal, `${deal.destination_url}extra`)).toBe(false);
  });

  it("rejects a different query string", () => {
    expect(isAllowedDestination(deal, `${deal.destination_url}?ref=attacker`)).toBe(false);
  });

  it("rejects credentials in the candidate URL", () => {
    expect(isAllowedDestination(deal, "https://user:pass@www.galaxycine.vn/u22/")).toBe(false);
  });

  it("rejects malformed and empty URLs", () => {
    expect(isAllowedDestination(deal, "not a url")).toBe(false);
    expect(isAllowedDestination(deal, "")).toBe(false);
  });

  it("rejects a deal without a stored destination", () => {
    expect(
      isAllowedDestination({ ...deal, destination_url: "" }, "https://example.com/")
    ).toBe(false);
  });

  it("accepts each seeded deal at its own destination only", () => {
    for (const item of CATALOG) {
      expect(isAllowedDestination(item, item.destination_url)).toBe(true);
    }
    expect(
      isAllowedDestination(CATALOG[0], CATALOG[1].destination_url)
    ).toBe(false);
  });
});
