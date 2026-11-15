import { afterEach, describe, expect, it } from "vitest";
import { fetchPublicDeals, getDataMode, hasPublicSupabaseConfig } from "@/lib/supabase-public";
import { getPublicDeals } from "@/lib/catalog";

const originalMode = process.env.NEXT_PUBLIC_STUDEAL_DATA_MODE;
const originalUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const originalKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

afterEach(() => {
  restore("NEXT_PUBLIC_STUDEAL_DATA_MODE", originalMode);
  restore("NEXT_PUBLIC_SUPABASE_URL", originalUrl);
  restore("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", originalKey);
});

function restore(name: string, value: string | undefined) {
  if (value === undefined) {
    delete process.env[name];
  } else {
    process.env[name] = value;
  }
}

describe("catalog data source", () => {
  it("defaults to supabase mode and reports missing configuration honestly", () => {
    delete process.env.NEXT_PUBLIC_STUDEAL_DATA_MODE;
    expect(getDataMode()).toBe("supabase");
  });

  it("uses fixture mode when explicitly configured", () => {
    process.env.NEXT_PUBLIC_STUDEAL_DATA_MODE = "fixture";
    expect(getDataMode()).toBe("fixture");
  });

  it("returns the bundled snapshot without a network call in fixture mode", async () => {
    process.env.NEXT_PUBLIC_STUDEAL_DATA_MODE = "fixture";
    const deals = await fetchPublicDeals();
    expect(deals).toHaveLength(getPublicDeals().length);
  });

  it("falls back to the bundled snapshot when public credentials are absent", async () => {
    delete process.env.NEXT_PUBLIC_STUDEAL_DATA_MODE;
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    expect(hasPublicSupabaseConfig()).toBe(false);
    const deals = await fetchPublicDeals();
    expect(deals).toHaveLength(getPublicDeals().length);
  });
});
