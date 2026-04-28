import { games } from "@/games/catalog";

export type RoomPlayer = {
  id: string;
  name: string;
  ready: boolean;
  connectedAt: string;
};

export type RoomState = {
  code: string;
  gameSlug: string;
  hostId: string;
  status: "lobby" | "playing" | "finished";
  players: RoomPlayer[];
  createdAt: string;
  updatedAt: string;
  reactions: Array<{ playerId: string; reaction: string; at: string }>;
};

type CreateRoomInput = {
  gameSlug: string;
  hostName: string;
};

type JoinRoomInput = {
  code: string;
  playerName: string;
};

const roomStore = new Map<string, RoomState>();

function now() {
  return new Date().toISOString();
}

function createCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
}

function createPlayer(name: string): RoomPlayer {
  return {
    id: crypto.randomUUID(),
    name: name.trim().slice(0, 24) || "Guest",
    ready: false,
    connectedAt: now()
  };
}

export function createRoom(input: CreateRoomInput): RoomState {
  const game = games.find((item) => item.slug === input.gameSlug);
  if (!game || game.status !== "playable") {
    throw new Error("Room can only be created for a playable game.");
  }
  let code = createCode();
  while (roomStore.has(code)) code = createCode();
  const host = createPlayer(input.hostName);
  const timestamp = now();
  const room: RoomState = {
    code,
    gameSlug: input.gameSlug,
    hostId: host.id,
    status: "lobby",
    players: [{ ...host, ready: true }],
    createdAt: timestamp,
    updatedAt: timestamp,
    reactions: []
  };
  roomStore.set(code, room);
  return room;
}

export function getRoom(code: string) {
  return roomStore.get(code.toUpperCase()) ?? null;
}

export function joinRoom(input: JoinRoomInput): RoomState {
  const room = getRoom(input.code);
  if (!room) throw new Error("Room not found.");
  if (room.players.length >= 4) throw new Error("Room is full.");
  const player = createPlayer(input.playerName);
  const updated = {
    ...room,
    updatedAt: now(),
    players: [...room.players, player]
  };
  roomStore.set(room.code, updated);
  return updated;
}

export function setPlayerReady(code: string, playerId: string, ready: boolean): RoomState {
  const room = getRoom(code);
  if (!room) throw new Error("Room not found.");
  const updated = {
    ...room,
    updatedAt: now(),
    players: room.players.map((player) => (player.id === playerId ? { ...player, ready } : player))
  };
  roomStore.set(room.code, updated);
  return updated;
}

export function startRoom(code: string, hostId: string): RoomState {
  const room = getRoom(code);
  if (!room) throw new Error("Room not found.");
  if (room.hostId !== hostId) throw new Error("Only the host can start.");
  if (!room.players.every((player) => player.ready)) throw new Error("All players must be ready.");
  const updated = {
    ...room,
    status: "playing" as const,
    updatedAt: now()
  };
  roomStore.set(room.code, updated);
  return updated;
}

export function addReaction(code: string, playerId: string, reaction: string): RoomState {
  const room = getRoom(code);
  if (!room) throw new Error("Room not found.");
  const updated = {
    ...room,
    updatedAt: now(),
    reactions: [...room.reactions.slice(-8), { playerId, reaction: reaction.slice(0, 16), at: now() }]
  };
  roomStore.set(room.code, updated);
  return updated;
}

export function clearRoomsForTests() {
  roomStore.clear();
}
