import type { Category, GuestState } from "./types";

const KEY = "studeal:guest:v1";

export const CATEGORY_KEYS: Category[] = [
  "cinema",
  "food",
  "software",
  "learning",
  "shopping",
  "transport"
];

export const emptyState: GuestState = {
  version: 1,
  selectedInterests: [],
  onboarding: "pending",
  deckIds: [],
  seenIds: [],
  savedIds: []
};

export interface LoadResult {
  state: GuestState;
  storageAvailable: boolean;
}

export function loadGuestState(): LoadResult {
  if (typeof window === "undefined") {
    return { state: emptyState, storageAvailable: false };
  }
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { state: emptyState, storageAvailable: true };
    const parsed = JSON.parse(raw) as Partial<GuestState>;
    if (parsed.version !== 1) return { state: emptyState, storageAvailable: true };
    return {
      state: {
        version: 1,
        selectedInterests: Array.isArray(parsed.selectedInterests)
          ? (parsed.selectedInterests.filter((x) =>
              CATEGORY_KEYS.includes(x as Category)
            ) as Category[])
          : [],
        onboarding:
          parsed.onboarding === "done" || parsed.onboarding === "skipped"
            ? parsed.onboarding
            : "pending",
        deckIds: Array.isArray(parsed.deckIds) ? parsed.deckIds.filter((x) => typeof x === "string") : [],
        seenIds: Array.isArray(parsed.seenIds) ? parsed.seenIds.filter((x) => typeof x === "string") : [],
        savedIds: Array.isArray(parsed.savedIds) ? parsed.savedIds.filter((x) => typeof x === "string") : []
      },
      storageAvailable: true
    };
  } catch {
    return { state: emptyState, storageAvailable: false };
  }
}

export function saveGuestState(state: GuestState): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function clearGuestState(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    return;
  }
}
