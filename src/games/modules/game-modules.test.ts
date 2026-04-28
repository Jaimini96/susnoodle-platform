import { describe, expect, it } from "vitest";
import { ashtaChammaModule } from "./ashta-chamma";
import { damrooModule } from "./damroo";
import { calculateGilliDistance, gilliDandaModule } from "./gilli-danda";
import { mokshaPatamModule } from "./moksha-patam";
import { pallankuzhiModule } from "./pallankuzhi";
import { rajaMantriModule } from "./raja-mantri";

describe("playable game modules", () => {
  it("scores a Raja Mantri Chor Sipahi accusation round", () => {
    const state = rajaMantriModule.createInitialState({ seed: "fixed" });
    const mantri = state.players.find((player) => state.roles[player] === "Mantri")!;
    const chor = state.players.find((player) => state.roles[player] === "Chor")!;
    const next = rajaMantriModule.applyAction(state, { type: "guess", playerId: mantri, suspectId: chor });

    expect(next.phase).toBe("result");
    expect(next.scores[mantri]).toBe(800);
    expect(next.scores[chor]).toBe(0);
  });

  it("moves Moksha Patam players with bounded board positions", () => {
    const state = mokshaPatamModule.createInitialState({ seed: "fixed", players: ["A", "B"] });
    const next = mokshaPatamModule.applyAction(state, { type: "roll", playerId: "A" });

    expect(next.positions.A).toBeGreaterThanOrEqual(1);
    expect(next.positions.A).toBeLessThanOrEqual(36);
    expect(next.turn).toBe(1);
  });

  it("captures seeds in Pallankuzhi when final seed lands in an empty own pit", () => {
    const state = pallankuzhiModule.createInitialState({ players: ["A", "B"] });
    const custom = {
      ...state,
      pits: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0]
    };
    const next = pallankuzhiModule.applyAction(custom, { type: "sow", playerId: "A", pitIndex: 2 });

    expect(next.captured[0]).toBe(5);
  });

  it("keeps Damroo score tied to timing accuracy", () => {
    const started = damrooModule.applyAction(damrooModule.createInitialState(), { type: "start" });
    const perfect = damrooModule.applyAction(started, { type: "tap", offsetMs: 0 });
    const miss = damrooModule.applyAction(started, { type: "tap", offsetMs: 220 });

    expect(perfect.score).toBeGreaterThan(miss.score);
    expect(miss.misses).toBe(1);
  });

  it("rewards clean Gilli Danda timing", () => {
    expect(calculateGilliDistance(0.78, 0.62)).toBeGreaterThan(calculateGilliDistance(0.2, 0.05));
    const state = gilliDandaModule.createInitialState();
    const next = gilliDandaModule.applyAction(state, { type: "strike", power: 0.78, angle: 0.62 });
    expect(next.totalDistance).toBeGreaterThan(80);
  });

  it("throws and moves in Ashta Chamma", () => {
    const state = ashtaChammaModule.createInitialState({ seed: "fixed", players: ["A", "B"] });
    const thrown = ashtaChammaModule.applyAction(state, { type: "throw", playerId: "A" });
    const action = ashtaChammaModule.getAvailableActions(thrown, "A").find((item) => item.type === "move");

    expect(thrown.roll).toBeDefined();
    expect(action).toBeDefined();
    if (action?.type === "move") {
      const moved = ashtaChammaModule.applyAction(thrown, action);
      expect(moved.tokens[action.tokenIndex].progress).toBeGreaterThan(0);
    }
  });
});
