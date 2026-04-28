import { NextResponse } from "next/server";
import { addReaction, getRoom, joinRoom, setPlayerReady, startRoom } from "@/services/rooms";

type Context = {
  params: Promise<{ code: string }>;
};

export async function GET(_request: Request, context: Context) {
  const { code } = await context.params;
  const room = getRoom(code);
  if (!room) return NextResponse.json({ error: "Room not found." }, { status: 404 });
  return NextResponse.json({ room });
}

export async function POST(request: Request, context: Context) {
  try {
    const { code } = await context.params;
    const body = (await request.json()) as {
      action?: "join" | "ready" | "start" | "react";
      playerName?: string;
      playerId?: string;
      ready?: boolean;
      reaction?: string;
    };
    if (body.action === "join") {
      return NextResponse.json({ room: joinRoom({ code, playerName: body.playerName ?? "Guest" }) });
    }
    if (body.action === "ready") {
      return NextResponse.json({ room: setPlayerReady(code, body.playerId ?? "", Boolean(body.ready)) });
    }
    if (body.action === "start") {
      return NextResponse.json({ room: startRoom(code, body.playerId ?? "") });
    }
    if (body.action === "react") {
      return NextResponse.json({ room: addReaction(code, body.playerId ?? "", body.reaction ?? "nice") });
    }
    return NextResponse.json({ error: "Unknown room action." }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Room action failed." },
      { status: 400 }
    );
  }
}
