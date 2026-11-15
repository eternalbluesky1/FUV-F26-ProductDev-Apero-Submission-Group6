"use client";

const CONSENT_KEY = "studeal:analytics-consent";
export type Consent = "granted" | "denied";

let client: typeof import("posthog-js").default | null = null;
let loading: Promise<typeof import("posthog-js").default | null> | null = null;
let memoryConsent: Consent | null = null;

function readStoredConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function getConsent(): Consent {
  if (memoryConsent) return memoryConsent;
  return readStoredConsent() ?? "granted";
}

export function isAnalyticsEnabled(): boolean {
  return getConsent() !== "denied";
}

export function setConsent(value: Consent): boolean {
  memoryConsent = value;
  let persisted = false;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
      persisted = true;
    } catch {
      persisted = false;
    }
  }
  if (value === "denied") {
    client?.opt_out_capturing();
  } else {
    client?.opt_in_capturing({ captureEventName: false });
  }
  return persisted;
}

async function loadClient(): Promise<typeof import("posthog-js").default | null> {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  if (!key || !host) return null;
  if (client) return client;
  if (!loading) {
    loading = import("posthog-js")
      .then(({ default: posthog }) => {
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
      })
      .catch(() => null);
  }
  return loading;
}

export async function initAnalytics(): Promise<void> {
  if (typeof window === "undefined") return;
  if (!isAnalyticsEnabled()) {
    client?.opt_out_capturing();
    return;
  }
  const posthog = await loadClient();
  if (!posthog) return;
  if (isAnalyticsEnabled()) {
    posthog.opt_in_capturing({ captureEventName: false });
  } else {
    posthog.opt_out_capturing();
  }
}

export function capture(event: string, properties: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  if (!isAnalyticsEnabled()) return;
  void loadClient().then((posthog) => {
    if (posthog && isAnalyticsEnabled()) posthog.capture(event, properties);
  });
}
