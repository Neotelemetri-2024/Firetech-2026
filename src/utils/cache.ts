// src/utils/cache.ts (contoh, belum dibuat)
interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export function setCache<T>(key: string, value: T, ttlMs: number) {
  const entry: CacheEntry<T> = { value, expiresAt: Date.now() + ttlMs };
  localStorage.setItem(key, JSON.stringify(entry));
}

export function getCache<T>(key: string): T | null {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  const entry: CacheEntry<T> = JSON.parse(raw);
  if (Date.now() > entry.expiresAt) {
    localStorage.removeItem(key);
    return null;
  }
  return entry.value;
}
