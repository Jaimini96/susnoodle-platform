import { games } from "../catalog";
import type { GameConfig, GameModule, GameResult } from "../types";
import { seededPick } from "@/lib/random";

export type MokshaState = {
  gameId: "moksha-patam";
  seed: string;
  turn: number;
  players: string[];
  positions: Record<string, number>;
  lastRoll?: number;
  message: string;
  winner?: string;
};

export type MokshaAction = { type: "roll"; playerId: string };

const metadata = games.find((game) => game.slug === "moksha-patam")!;
export const mokshaLinks: Record<number, number> = {
  3: 14,
  8: 20,
  16: 6,
  21: 31,
  27: 10,
  34: 36
};

export const mokshaPatamModule: GameModule<MokshaState, MokshaAction> = {
  metadata,
  createInitialState(config: GameConfig = {}) {
    const players = config.players?.slice(0, 4) ?? ["Asha", "Kabir"];
    return {
      gameId: "moksha-patam",
      seed: config.seed ?? "moksha",
      turn: 0,
      players,
      positions: Object.fromEntries(players.map((player) => [player, 1])),
      message: "Roll to begin. Ladders lift, serpents pull back."
    };
  },
  validateAction(state, action) {
    return !state.winner && action.type === "roll" && state.players[state.turn] === action.playerId;
  },
  applyAction(state, action) {
    if (!this.validateAction(state, action)) return state;
    const roll = seededPick([1, 2, 3, 4, 5, 6], state.seed, state.turn + Object.values(state.positions).reduce((a, b) => a + b, 0));
    const currentPosition = state.positions[action.playerId] ?? 1;
    let nextPosition = currentPosition + roll;
    if (nextPosition > 36) nextPosition = currentPosition;
    const linked = mokshaLinks[nextPosition];
    const finalPosition = linked ?? nextPosition;
    const winner = finalPosition === 36 ? action.playerId : undefined;
    const movement =
      linked && linked > nextPosition
        ? `Ladder from ${nextPosition} to ${linked}.`
        : linked && linked < nextPosition
          ? `Serpent from ${nextPosition} to ${linked}.`
          : `Moved to ${finalPosition}.`;
    return {
      ...state,
      turn: winner ? state.turn : (state.turn + 1) % state.players.length,
      positions: { ...state.positions, [action.playerId]: finalPosition },
      lastRoll: roll,
      winner,
      message: `${action.playerId} rolled ${roll}. ${movement}`
    };
  },
  getAvailableActions(state, playerId) {
    return this.validateAction(state, { type: "roll", playerId }) ? [{ type: "roll", playerId }] : [];
  },
  isGameOver(state) {
    return Boolean(state.winner);
  },
  getResult(state): GameResult | null {
    if (!state.winner) return null;
    return {
      winnerIds: [state.winner],
      summary: `${state.winner} reached the final square.`,
      scores: state.positions
    };
  }
};
