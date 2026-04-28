import { games } from "../catalog";
import type { GameConfig, GameModule, GameResult } from "../types";

export type PallankuzhiState = {
  gameId: "pallankuzhi";
  players: string[];
  turn: 0 | 1;
  pits: number[];
  captured: [number, number];
  message: string;
};

export type PallankuzhiAction = { type: "sow"; playerId: string; pitIndex: number };

const metadata = games.find((game) => game.slug === "pallankuzhi")!;
const sideRanges = [
  [0, 1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12, 13]
];

function ownerOfPit(pitIndex: number) {
  return pitIndex < 7 ? 0 : 1;
}

function oppositePit(pitIndex: number) {
  return 13 - pitIndex;
}

function sideEmpty(pits: number[], side: 0 | 1) {
  return sideRanges[side].every((pit) => pits[pit] === 0);
}

export const pallankuzhiModule: GameModule<PallankuzhiState, PallankuzhiAction> = {
  metadata,
  createInitialState(config: GameConfig = {}) {
    return {
      gameId: "pallankuzhi",
      players: config.players?.slice(0, 2) ?? ["Asha", "Kabir"],
      turn: 0,
      pits: Array.from({ length: 14 }, () => 5),
      captured: [0, 0],
      message: "Choose a pit from your row to sow seeds."
    };
  },
  validateAction(state, action) {
    const activePlayer = state.players[state.turn];
    return (
      action.type === "sow" &&
      action.playerId === activePlayer &&
      sideRanges[state.turn].includes(action.pitIndex) &&
      state.pits[action.pitIndex] > 0 &&
      !this.isGameOver(state)
    );
  },
  applyAction(state, action) {
    if (!this.validateAction(state, action)) return state;
    const pits = [...state.pits];
    let seeds = pits[action.pitIndex];
    pits[action.pitIndex] = 0;
    let cursor = action.pitIndex;
    while (seeds > 0) {
      cursor = (cursor + 1) % pits.length;
      pits[cursor] += 1;
      seeds -= 1;
    }
    const captured: [number, number] = [...state.captured];
    let message = `${action.playerId} sowed from pit ${action.pitIndex + 1}.`;
    if (ownerOfPit(cursor) === state.turn && pits[cursor] === 1) {
      const opposite = oppositePit(cursor);
      const capturedSeeds = pits[opposite];
      if (capturedSeeds > 0) {
        captured[state.turn] += capturedSeeds + 1;
        pits[opposite] = 0;
        pits[cursor] = 0;
        message = `${action.playerId} captured ${capturedSeeds + 1} seeds from the opposite pit.`;
      }
    }
    const nextTurn = state.turn === 0 ? 1 : 0;
    return {
      ...state,
      pits,
      captured,
      turn: sideEmpty(pits, nextTurn) ? state.turn : nextTurn,
      message
    };
  },
  getAvailableActions(state, playerId) {
    if (state.players[state.turn] !== playerId) return [];
    return sideRanges[state.turn]
      .filter((pitIndex) => state.pits[pitIndex] > 0)
      .map((pitIndex) => ({ type: "sow", playerId, pitIndex }));
  },
  isGameOver(state) {
    return sideEmpty(state.pits, 0) || sideEmpty(state.pits, 1);
  },
  getResult(state): GameResult | null {
    if (!this.isGameOver(state)) return null;
    const remaining: [number, number] = [
      sideRanges[0].reduce((sum, pit) => sum + state.pits[pit], 0),
      sideRanges[1].reduce((sum, pit) => sum + state.pits[pit], 0)
    ];
    const scores = {
      [state.players[0]]: state.captured[0] + remaining[0],
      [state.players[1]]: state.captured[1] + remaining[1]
    };
    const highScore = Math.max(...Object.values(scores));
    return {
      winnerIds: Object.keys(scores).filter((player) => scores[player] === highScore),
      scores,
      summary: `Seeds counted. High score: ${highScore}.`
    };
  }
};
