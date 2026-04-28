import { games } from "../catalog";
import type { GameConfig, GameModule, GameResult } from "../types";
import { seededPick } from "@/lib/random";

export type AshtaToken = {
  owner: string;
  progress: number;
  finished: boolean;
};

export type AshtaState = {
  gameId: "ashta-chamma";
  seed: string;
  players: string[];
  turn: number;
  tokens: AshtaToken[];
  roll?: number;
  message: string;
  winner?: string;
};

export type AshtaAction =
  | { type: "throw"; playerId: string }
  | { type: "move"; playerId: string; tokenIndex: number };

const metadata = games.find((game) => game.slug === "ashta-chamma")!;
export const ashtaPath = [0, 1, 2, 3, 4, 9, 14, 19, 24, 23, 22, 21, 20, 15, 10, 5, 6, 7, 8, 13, 18, 17, 12];
export const ashtaSafeSquares = new Set([0, 4, 12, 20, 24]);

function legalTokenIndexes(state: AshtaState, playerId: string) {
  if (!state.roll) return [];
  return state.tokens
    .map((token, index) => ({ token, index }))
    .filter(({ token }) => token.owner === playerId && !token.finished && token.progress + state.roll! <= ashtaPath.length)
    .map(({ index }) => index);
}

export const ashtaChammaModule: GameModule<AshtaState, AshtaAction> = {
  metadata,
  createInitialState(config: GameConfig = {}) {
    const players = config.players?.slice(0, 4) ?? ["Asha", "Kabir"];
    return {
      gameId: "ashta-chamma",
      seed: config.seed ?? "ashta",
      players,
      turn: 0,
      tokens: players.flatMap((owner) => [
        { owner, progress: 0, finished: false },
        { owner, progress: 0, finished: false }
      ]),
      message: "Throw the cowries, then move a legal token."
    };
  },
  validateAction(state, action) {
    if (state.winner) return false;
    const active = state.players[state.turn];
    if (action.playerId !== active) return false;
    if (action.type === "throw") return state.roll === undefined;
    if (action.type === "move") return legalTokenIndexes(state, action.playerId).includes(action.tokenIndex);
    return false;
  },
  applyAction(state, action) {
    if (!this.validateAction(state, action)) return state;
    if (action.type === "throw") {
      const roll = seededPick([1, 2, 3, 4, 8], state.seed, state.turn + state.tokens.reduce((sum, token) => sum + token.progress, 0));
      const legal = legalTokenIndexes({ ...state, roll }, action.playerId);
      return {
        ...state,
        turn: legal.length ? state.turn : (state.turn + 1) % state.players.length,
        roll: legal.length ? roll : undefined,
        message: legal.length ? `${action.playerId} threw ${roll}. Choose a token.` : `${action.playerId} threw ${roll}, but no token can move.`
      };
    }
    const tokens = state.tokens.map((token) => ({ ...token }));
    const token = tokens[action.tokenIndex];
    token.progress += state.roll ?? 0;
    token.finished = token.progress >= ashtaPath.length;
    const square = ashtaPath[Math.min(token.progress, ashtaPath.length - 1)];
    let captured = "";
    if (!ashtaSafeSquares.has(square) && !token.finished) {
      for (const other of tokens) {
        if (other.owner !== action.playerId && !other.finished && ashtaPath[other.progress] === square) {
          other.progress = 0;
          captured = " Capture sends an opponent token home.";
        }
      }
    }
    const winner = tokens.every((item) => item.owner !== action.playerId || item.finished) ? action.playerId : undefined;
    return {
      ...state,
      tokens,
      winner,
      roll: undefined,
      turn: winner ? state.turn : (state.turn + 1) % state.players.length,
      message: winner ? `${action.playerId} brought both tokens home.` : `Moved to square ${square + 1}.${captured}`
    };
  },
  getAvailableActions(state, playerId) {
    if (state.players[state.turn] !== playerId) return [];
    if (state.roll === undefined) return [{ type: "throw", playerId }];
    return legalTokenIndexes(state, playerId).map((tokenIndex) => ({ type: "move", playerId, tokenIndex }));
  },
  isGameOver(state) {
    return Boolean(state.winner);
  },
  getResult(state): GameResult | null {
    if (!state.winner) return null;
    const scores = Object.fromEntries(
      state.players.map((player) => [
        player,
        state.tokens.filter((token) => token.owner === player).reduce((sum, token) => sum + token.progress, 0)
      ])
    );
    return {
      winnerIds: [state.winner],
      scores,
      summary: `${state.winner} completed the race.`
    };
  }
};
