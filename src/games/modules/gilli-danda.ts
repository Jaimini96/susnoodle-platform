import { games } from "../catalog";
import type { GameModule, GameResult } from "../types";

export type GilliState = {
  gameId: "gilli-danda";
  attempts: number;
  totalDistance: number;
  lastDistance: number;
  phase: "aiming" | "finished";
  message: string;
};

export type GilliAction = { type: "strike"; power: number; angle: number } | { type: "reset" };

const metadata = games.find((game) => game.slug === "gilli-danda")!;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function calculateGilliDistance(power: number, angle: number) {
  const normalizedPower = clamp(power, 0, 1);
  const normalizedAngle = clamp(angle, 0, 1);
  const angleQuality = 1 - Math.abs(normalizedAngle - 0.62) * 1.7;
  const liftQuality = 1 - Math.abs(normalizedPower - 0.78) * 1.15;
  return Math.max(8, Math.round(145 * normalizedPower * Math.max(0.25, angleQuality) * Math.max(0.3, liftQuality)));
}

export const gilliDandaModule: GameModule<GilliState, GilliAction> = {
  metadata,
  createInitialState() {
    return {
      gameId: "gilli-danda",
      attempts: 0,
      totalDistance: 0,
      lastDistance: 0,
      phase: "aiming",
      message: "Charge the lift, then strike near the sweet angle."
    };
  },
  validateAction(state, action) {
    if (action.type === "reset") return true;
    return state.phase === "aiming" && action.type === "strike";
  },
  applyAction(state, action) {
    if (!this.validateAction(state, action)) return state;
    if (action.type === "reset") return this.createInitialState();
    const distance = calculateGilliDistance(action.power, action.angle);
    const attempts = state.attempts + 1;
    return {
      ...state,
      attempts,
      lastDistance: distance,
      totalDistance: state.totalDistance + distance,
      phase: attempts >= 3 ? "finished" : "aiming",
      message: distance > 95 ? "Clean flight." : distance > 55 ? "Playable strike." : "Late contact. Try a smoother lift."
    };
  },
  getAvailableActions(state) {
    return state.phase === "finished" ? [{ type: "reset" }] : [{ type: "strike", power: 0.75, angle: 0.62 }];
  },
  isGameOver(state) {
    return state.phase === "finished";
  },
  getResult(state): GameResult | null {
    if (!this.isGameOver(state)) return null;
    return {
      winnerIds: ["solo"],
      scores: { solo: state.totalDistance },
      summary: `${state.totalDistance} metres across three attempts.`
    };
  }
};
