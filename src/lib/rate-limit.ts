type Entry = { count: number; resetAt: number };
const store = new Map<string, Entry>();
// Best-effort in-memory limiter for single-instance deployments. Use a shared store (e.g. Redis) for multi-instance production.
export function rateLimit(key: string, limit = 8, windowMs = 60_000): boolean {
  const now = Date.now(); const entry = store.get(key);
  if (!entry || entry.resetAt <= now) { store.set(key, { count: 1, resetAt: now + windowMs }); return true; }
  if (entry.count >= limit) return false;
  entry.count += 1; return true;
}
