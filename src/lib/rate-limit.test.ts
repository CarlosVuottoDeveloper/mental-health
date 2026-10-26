import { createRateLimiter } from "./rate-limit";

describe("createRateLimiter", () => {
  it("limits per key within the window and resets after it", () => {
    const isLimited = createRateLimiter({ limit: 2, windowMs: 1000 });

    expect(isLimited("a", 0)).toBe(false);
    expect(isLimited("a", 100)).toBe(false);
    expect(isLimited("a", 200)).toBe(true);
    expect(isLimited("b", 200)).toBe(false);
    expect(isLimited("a", 1500)).toBe(false);
  });
});
