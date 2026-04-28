import { describe, expect, it } from "vitest";
import { normalizeAnalyticsPayload } from "@/services/analytics";

describe("analytics service", () => {
  it("normalizes known events", () => {
    expect(
      normalizeAnalyticsPayload({
        event: "game_start",
        gameSlug: "pallankuzhi",
        metadata: { mode: "practice" }
      })
    ).toEqual({
      event: "game_start",
      gameSlug: "pallankuzhi",
      roomCode: undefined,
      deviceHint: undefined,
      metadata: { mode: "practice" }
    });
  });

  it("rejects missing events", () => {
    expect(() => normalizeAnalyticsPayload({})).toThrow("Analytics event is required.");
  });
});
