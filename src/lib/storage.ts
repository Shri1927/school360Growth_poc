import type { MockDb } from "@/types";

const STORAGE_KEY = "school360-mockdb-v1";

export function loadPersistedDb(fallback: MockDb): MockDb {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as MockDb;
    return { ...fallback, ...parsed, users: fallback.users, students: fallback.students };
  } catch {
    return fallback;
  }
}

export function persistDb(db: MockDb): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch {
    /* ignore quota errors in demo */
  }
}

export function resetDemoData(): void {
  localStorage.removeItem(STORAGE_KEY);
}
