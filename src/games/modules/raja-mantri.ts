import { games } from "../catalog";
import type { GameConfig, GameModule, GameResult } from "../types";
import { shuffleWithSeed } from "@/lib/random";

export type RajaRole = "Raja" | "Mantri" | "Chor" | "Sipahi";

export type RajaState = {
  gameId: "raja-mantri-chor-sipahi";
  seed: string;
  round: number;
  phase: "reveal" | "guess" | "result" | "finished";
  players: string[];
  roles: Record<string, RajaRole>;
  scores: Record<string, number>;
  guess?: string;
  explanation: string;
};

export type RajaAction =
  | { type: "new-round" }
  | { type: "guess"; playerId: string; suspectId: string }
  | { type: "finish" };

const metadata = games.find((game) => game.slug === "raja-mantri-chor-sipahi")!;
const roleScores: Record<RajaRole, number> = {
  Raja: 1000,
  Mantri: 800,
  Sipahi: 500,
  Chor: 0
};

function dealRoles(players: string[], seed: string, round: number) {
  const roles = shuffleWithSeed<RajaRole>(["Raja", "Mantri", "Chor", "Sipahi"], `${seed}:${round}`);
  return players.reduce<Record<string, RajaRole>>((assigned, player, index) => {
    assigned[player] = roles[index] ?? "Sipahi";
    return assigned;
  }, {});
}

function createScores(players: string[]) {
  return players.reduce<Record<string, number>>((scores, player) => {
    scores[player] = 0;
    return scores;
  }, {});
}

export const rajaMantriModule: GameModule<RajaState, RajaAction> = {
  metadata,
  createInitialState(config: GameConfig = {}) {
    const players = config.players?.slice(0, 4) ?? ["Asha", "Kabir", "Meera", "Dev"];
    const seed = config.seed ?? "raja";
    return {
      gameId: "raja-mantri-chor-sipahi",
      seed,
      round: 1,
      phase: "guess",
      players,
      roles: dealRoles(players, seed, 1),
      scores: createScores(players),
      explanation: "Roles are dealt. The Mantri must identify the Chor."
    };
  },
  validateAction(state, action) {
    if (state.phase === "finished") return false;
    if (action.type === "new-round") return state.phase === "result";
    if (action.type === "finish") return state.phase === "result";
    if (action.type === "guess") {
      return state.phase === "guess" && state.roles[action.playerId] === "Mantri" && state.players.includes(action.suspectId);
    }
    return false;
  },
  applyAction(state, action) {
    if (!this.validateAction(state, action)) return state;
    if (action.type === "new-round") {
      const round = state.round + 1;
      return {
        ...state,
        round,
        phase: "guess",
        roles: dealRoles(state.players, state.seed, round),
        guess: undefined,
        explanation: "Fresh chits, fresh suspicion. The new Mantri is on duty."
      };
    }
    if (action.type === "finish") {
      return { ...state, phase: "finished", explanation: "Match closed. Highest score wins." };
    }
    const chorId = state.players.find((player) => state.roles[player] === "Chor")!;
    const correct = action.suspectId === chorId;
    const scores = { ...state.scores };
    for (const player of state.players) {
      const role = state.roles[player];
      if (role === "Mantri") scores[player] += correct ? roleScores.Mantri : 0;
      else if (role === "Chor") scores[player] += correct ? 0 : 800;
      else scores[player] += roleScores[role];
    }
    return {
      ...state,
      phase: "result",
      guess: action.suspectId,
      scores,
      explanation: correct
        ? `${action.suspectId} was the Chor. Mantri reads the room correctly.`
        : `${action.suspectId} was not the Chor. The Chor slips away with 800 points.`
    };
  },
  getAvailableActions(state, playerId) {
    if (state.phase !== "guess" || state.roles[playerId] !== "Mantri") return [];
    return state.players
      .filter((player) => player !== playerId)
      .map((suspectId) => ({ type: "guess", playerId, suspectId }));
  },
  isGameOver(state) {
    return state.phase === "finished" || state.round >= 5;
  },
  getResult(state): GameResult | null {
    if (!this.isGameOver(state)) return null;
    const highScore = Math.max(...Object.values(state.scores));
    const winnerIds = Object.keys(state.scores).filter((player) => state.scores[player] === highScore);
    return {
      winnerIds,
      scores: state.scores,
      summary: `${winnerIds.join(", ")} lead with ${highScore} points.`
    };
  }
};
