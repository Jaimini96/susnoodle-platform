export type GameCategory =
  | "board"
  | "strategy"
  | "bluffing"
  | "reflex"
  | "party"
  | "family"
  | "arcade"
  | "card"
  | "economy";

export type GameMode = "solo" | "local" | "online" | "practice" | "tutorial";

export type GameStatus = "playable" | "coming-soon" | "research-needed";

export type RuleSection = {
  title: string;
  body: string;
  bullets?: string[];
};

export type TutorialStep = {
  title: string;
  body: string;
  actionLabel?: string;
};

export type GameMetadata = {
  id: string;
  slug: string;
  title: string;
  alternateNames: string[];
  shortDescription: string;
  longDescription: string;
  culturalNote: string;
  minPlayers: number;
  maxPlayers: number;
  estimatedMinutes: number;
  difficulty: "easy" | "medium" | "hard";
  categories: GameCategory[];
  regions: string[];
  modes: GameMode[];
  status: GameStatus;
  heroAsset: string;
  thumbnailAsset: string;
  accent: string;
  rules: RuleSection[];
  tutorial: TutorialStep[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
};

export type GameConfig = {
  seed?: string;
  players?: string[];
  variant?: string;
};

export type GameResult = {
  winnerIds: string[];
  summary: string;
  scores?: Record<string, number>;
};

export interface GameModule<State, Action> {
  metadata: GameMetadata;
  createInitialState(config?: GameConfig): State;
  validateAction(state: State, action: Action): boolean;
  applyAction(state: State, action: Action): State;
  getAvailableActions(state: State, playerId: string): Action[];
  isGameOver(state: State): boolean;
  getResult(state: State): GameResult | null;
}

export type PlayableSlug =
  | "raja-mantri-chor-sipahi"
  | "ashta-chamma"
  | "damroo"
  | "moksha-patam"
  | "pallankuzhi"
  | "gilli-danda";
