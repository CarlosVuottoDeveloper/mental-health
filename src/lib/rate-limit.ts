/**
 * Fixed-window rate limiter kept in memory. Good enough for a low-traffic
 * landing page on a single instance; a shared store (e.g. Redis) would be
 * needed to enforce the limit across many instances.
 */
export function createRateLimiter({
  limit,
  windowMs,
}: {
  limit: number;
  windowMs: number;
}) {
  const hits = new Map<string, number[]>();

  return function isLimited(key: string, now = Date.now()) {
    const recent = (hits.get(key) ?? []).filter(
      (time) => now - time < windowMs,
    );
    recent.push(now);
    hits.set(key, recent);
    return recent.length > limit;
  };
}
