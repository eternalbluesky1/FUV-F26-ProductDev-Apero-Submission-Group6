import { describe, expect, it } from "vitest";
import { ASK_MON_MODELS, isAllowedModel, resolveModel } from "@/lib/ask-mon-models";

describe("ask mon model allowlist", () => {
  it("exposes models that can call tools", () => {
    expect(ASK_MON_MODELS.length).toBeGreaterThan(0);
    expect(ASK_MON_MODELS.every((model) => model.id.includes("/"))).toBe(true);
    expect(ASK_MON_MODELS.every((model) => model.label.length > 0)).toBe(true);
  });

  it("accepts only known model ids", () => {
    expect(isAllowedModel("baidu/ernie-5.5-flash-preview:free")).toBe(true);
    expect(isAllowedModel("evil/model")).toBe(false);
    expect(isAllowedModel("")).toBe(false);
    expect(isAllowedModel(undefined)).toBe(false);
    expect(isAllowedModel(null)).toBe(false);
  });

  it("falls back to an allowlisted model when the request asks for an unknown one", () => {
    const previous = process.env.OPENROUTER_MODEL;
    process.env.OPENROUTER_MODEL = "evil/model";
    expect(resolveModel("also/evil")).toBe(ASK_MON_MODELS[0].id);
    expect(isAllowedModel(resolveModel(null))).toBe(true);
    if (previous === undefined) {
      delete process.env.OPENROUTER_MODEL;
    } else {
      process.env.OPENROUTER_MODEL = previous;
    }
  });

  it("honours a requested model that is on the allowlist", () => {
    const target = ASK_MON_MODELS[1].id;
    expect(resolveModel(target)).toBe(target);
  });
});
