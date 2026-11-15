"use client";

import { useEffect } from "react";
import { capture, initAnalytics, isAnalyticsEnabled } from "@/lib/analytics";

const LANDING_KEY = "studeal:landing-viewed";
let landingCaptured = false;

function referrerCategory(): string {
  if (typeof document === "undefined") return "direct";
  const referrer = document.referrer;
  if (!referrer) return "direct";
  try {
    const url = new URL(referrer);
    if (typeof window !== "undefined" && url.origin === window.location.origin) {
      return "internal";
    }
    return url.hostname;
  } catch {
    return "direct";
  }
}

function claimLandingEvent(): boolean {
  try {
    if (window.sessionStorage.getItem(LANDING_KEY) === "1") return false;
    window.sessionStorage.setItem(LANDING_KEY, "1");
  } catch {
    return true;
  }
  return true;
}

export function AnalyticsInit() {
  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!isAnalyticsEnabled()) return;
      await initAnalytics();
      if (cancelled || !isAnalyticsEnabled()) return;
      if (landingCaptured) return;
      landingCaptured = true;
      if (!claimLandingEvent()) return;
      capture("landing_viewed", { referrer: referrerCategory() });
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
