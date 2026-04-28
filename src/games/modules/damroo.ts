import { games } from "../catalog";
import type { GameConfig, GameModule, GameResult } from "../types";
import { seededNumber } from "@/lib/random";

export type DamrooState = {
  gameId: "damroo";
  seed: string;
  beat: number;
  targetMs: number;
  score: number;
  combo: number;
  misses: number;
  phase: "ready" | "playing" | "finished";
  message: string;
};

export type DamrooAction =
  | { type: "start" }
  | { type: "tap"; offsetMs: number }
  | { type: "reset" };

const metadata = games.find((game) => game.slug === "damroo")!;

function targetFor(seed: string, beat: number) {
  return 640 + Math.round(seededNumber(seed, beat) * 520);
}

export const damrooModule: GameModule<DamrooState, DamrooAction> = {
  metadata,
  createInitialState(config: GameConfig = {}) {
    const seed = config.seed ?? "damroo";
    return {
      gameId: "damroo",
      seed,
      beat: 0,
      targetMs: targetFor(seed, 0),
      score: 0,
      combo: 0,
      misses: 0,
      phase: "ready",
      message: "Start the beat. Tap inside the brass ring."
    };
  },
  validateAction(state, action) {
    if (action.type === "reset") return true;
    if (action.type === "start") return state.phase === "ready";
    if (action.type === "tap") return state.phase === "playing";
    return false;
  },
  applyAction(state, action) {
    if (!this.validateAction(state, action)) return state;
    if (action.type === "reset") return this.createInitialState({ seed: state.seed });
    if (action.type === "start") return { ...state, phase: "playing", message: "Beat is live." };
    const accuracy = Math.abs(action.offsetMs);
    const perfect = accuracy <= 60;
    const good = accuracy <= 130;
    const combo = good ? state.combo + 1 : 0;
    const score = state.score + (perfect ? 120 : good ? 70 : 0) + combo * 5;
    const misses = good ? state.misses : state.misses + 1;
    const beat = state.beat + 1;
    const phase = beat >= 8 || misses >= 3 ? "finished" : "playing";
    return {
      ...state,
      beat,
      targetMs: targetFor(state.seed, beat),
      score,
      combo,
      misses,
      phase,
      message: perfect ? "Perfect hit." : good ? "Clean hit." : "Missed the ring."
    };
  },
  getAvailableActions(state) {
    if (state.phase === "ready") return [{ type: "start" }];
    if (state.phase === "playing") return [{ type: "tap", offsetMs: 0 }];
    return [{ type: "reset" }];
  },
  isGameOver(state) {
    return state.phase === "finished";
  },
  getResult(state): GameResult | null {
    if (!this.isGameOver(state)) return null;
    return {
      winnerIds: ["solo"],
      scores: { solo: state.score },
      summary: `Score ${state.score}. Best combo ${state.combo}.`
    };
  }
};
