import { DurableObject } from "cloudflare:workers";

export interface Env {
  ROOMS: DurableObjectNamespace;
}

type RoomPayload = {
  type: "join" | "ready" | "start" | "react" | "sync";
  playerId?: string;
  playerName?: string;
  ready?: boolean;
  reaction?: string;
};

export class RoomDurableObject extends DurableObject {
  private sessions = new Set<WebSocket>();

  constructor(private readonly state: DurableObjectState, env: Env) {
    super(state, env);
  }

  async fetch(request: Request) {
    const upgrade = request.headers.get("Upgrade");
    if (upgrade !== "websocket") {
      const snapshot = (await this.state.storage.get("room")) ?? { players: [], status: "lobby" };
      return Response.json({ room: snapshot });
    }

    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    server.accept();
    this.sessions.add(server);
    server.addEventListener("message", (event: MessageEvent) => this.onMessage(server, String(event.data)));
    server.addEventListener("close", () => this.sessions.delete(server));
    server.addEventListener("error", () => this.sessions.delete(server));
    return new Response(null, { status: 101, webSocket: client });
  }

  private async onMessage(socket: WebSocket, raw: string) {
    const payload = JSON.parse(raw) as RoomPayload;
    const room = ((await this.state.storage.get("room")) as Record<string, unknown> | undefined) ?? {
      players: [],
      status: "lobby",
      reactions: []
    };
    const nextRoom = {
      ...room,
      updatedAt: new Date().toISOString(),
      lastEvent: payload
    };
    await this.state.storage.put("room", nextRoom);
    this.broadcast(JSON.stringify({ room: nextRoom }));
    socket.send(JSON.stringify({ ok: true }));
  }

  private broadcast(message: string) {
    for (const session of this.sessions) {
      try {
        session.send(message);
      } catch {
        this.sessions.delete(session);
      }
    }
  }
}

const realtimeWorker = {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const code = url.pathname.split("/").filter(Boolean).at(-1) ?? "default";
    const id = env.ROOMS.idFromName(code.toUpperCase());
    return env.ROOMS.get(id).fetch(request);
  }
};

export default realtimeWorker;
