export type AnalyticsEvent =
  | "landing_game_start"
  | "game_start"
  | "tutorial_step"
  | "tutorial_complete"
  | "room_create"
  | "room_join"
  | "rematch"
  | "confusion_event";

export type AnalyticsPayload = {
  event: AnalyticsEvent;
  gameSlug?: string;
  roomCode?: string;
  deviceHint?: string;
  metadata?: Record<string, string | number | boolean>;
};

export function normalizeAnalyticsPayload(payload: Partial<AnalyticsPayload>): AnalyticsPayload {
  if (!payload.event) {
    throw new Error("Analytics event is required.");
  }
  return {
    event: payload.event,
    gameSlug: payload.gameSlug,
    roomCode: payload.roomCode,
    deviceHint: payload.deviceHint,
    metadata: payload.metadata ?? {}
  };
}
