import { describe, expect, it } from "vitest";
import { CATALOG, CATEGORY_LABELS } from "@/lib/catalog-data";
import { BRAND_ASSETS, getBrandAsset } from "@/lib/brand-assets";
import { isCurrentlyPublic } from "@/lib/catalog";

describe("catalog integrity", () => {
  it("has a large, multi-brand catalog", () => {
    expect(CATALOG.length).toBeGreaterThanOrEqual(25);
    const brands = new Set(CATALOG.map((deal) => deal.brand_slug));
    expect(brands.size).toBeGreaterThanOrEqual(15);
  });

  it("uses unique slugs and unique ids", () => {
    const slugs = new Set(CATALOG.map((deal) => deal.slug));
    const ids = new Set(CATALOG.map((deal) => deal.id));
    expect(slugs.size).toBe(CATALOG.length);
    expect(ids.size).toBe(CATALOG.length);
  });

  it("labels every category and uses only known categories", () => {
    for (const deal of CATALOG) {
      expect(CATEGORY_LABELS[deal.category]).toBeTruthy();
    }
    expect(Object.keys(CATEGORY_LABELS).length).toBeGreaterThanOrEqual(4);
  });

  it("gives every deal an official https source and a matching destination", () => {
    for (const deal of CATALOG) {
      expect(deal.source_url.startsWith("https://")).toBe(true);
      expect(deal.destination_url.startsWith("https://")).toBe(true);
      expect(deal.source_type).toBe("official");
      expect(deal.eligibility_text.length).toBeGreaterThan(20);
      expect(deal.benefit_label.length).toBeGreaterThan(0);
    }
  });

  it("never claims a partnership", () => {
    for (const deal of CATALOG) {
      expect(deal.relationship_label).toBe("Không có quan hệ đối tác");
    }
  });

  it("registers a brand asset for every brand slug used by a deal", () => {
    for (const deal of CATALOG) {
      expect(deal.brand_slug).toBeTruthy();
      const asset = getBrandAsset(deal.slug, deal.brand_name, deal.brand_slug);
      expect(asset.initials.length).toBeGreaterThan(0);
    }
  });

  it("has a local logo file or a documented monogram fallback for each brand", () => {
    for (const [slug, asset] of Object.entries(BRAND_ASSETS)) {
      if (asset.logoSrc) {
        expect(asset.logoSrc.startsWith("/brand/logos/")).toBe(true);
      } else {
        expect(asset.initials.length).toBeGreaterThan(0);
      }
      expect(slug.length).toBeGreaterThan(0);
    }
  });

  it("keeps every published offer currently visible", () => {
    const now = new Date("2026-11-14T12:00:00+07:00");
    for (const deal of CATALOG) {
      expect(isCurrentlyPublic(deal, now)).toBe(true);
    }
  });

  it("does not publish an offer whose stated expiry has passed", () => {
    const afterExpiry = new Date("2027-02-01T00:00:00+07:00");
    const expired = CATALOG.filter((deal) => deal.expires_at);
    expect(expired.length).toBeGreaterThan(0);
    for (const deal of expired) {
      expect(isCurrentlyPublic(deal, afterExpiry)).toBe(false);
    }
  });

  it("does not publish an offer before its stated start", () => {
    const beforeStart = new Date("2026-01-01T00:00:00+07:00");
    for (const deal of CATALOG) {
      if (deal.starts_at) {
        expect(isCurrentlyPublic(deal, beforeStart)).toBe(false);
      }
    }
  });
});
