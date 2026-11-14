"use client";

const CONSENT_KEY = "studeal:analytics-consent";
export type Consent = "pending" | "granted" | "denied";

let client: typeof import("posthog-js").default | null = null;
let loading: Promise<typeof import("posthog-js").default | null> | null = null;

export function getConsent(): Consent {
  if (typeof window === "undefined") return "pending";
  const value = window.localStorage.getItem(CONSENT_KEY);
  return value === "granted" || value === "denied" ? value : "pending";
}

export function setConsent(value: Exclude<Consent, "pending">): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, value);
  if (value === "denied") {
    client?.opt_out_capturing();
  }
}

async function loadClient(): Promise<typeof import("posthog-js").default | null> {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  if (!key || !host) return null;
  if (client) return client;
  if (!loading) {
    loading = import("posthog-js").then(({ default: posthog }) => {
      posthog.init(key, {
        api_host: host,
        capture_pageview: false,
        capture_pageleave: false,
        autocapture: false,
        disable_session_recording: true,
        disable_surveys: true,
        advanced_disable_flags: true,
        persistence: "localStorage"
      });
      client = posthog;
      return posthog;
    });
  }
  return loading;
}

export async function initAnalytics(): Promise<void> {
  if (getConsent() !== "granted") return;
  const posthog = await loadClient();
  if (getConsent() !== "granted") {
    posthog?.opt_out_capturing();
    return;
  }
  posthog?.opt_in_capturing();
}

export function capture(event: string, properties: Record<string, unknown> = {}): void {
  if (getConsent() !== "granted") return;
  void loadClient().then((posthog) => {
    if (getConsent() === "granted") posthog?.capture(event, properties);
  });
}
