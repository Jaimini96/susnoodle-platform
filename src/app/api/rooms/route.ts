import { NextResponse } from "next/server";
import { createRoom } from "@/services/rooms";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { gameSlug?: string; hostName?: string };
    const room = createRoom({
      gameSlug: body.gameSlug ?? "",
      hostName: body.hostName ?? "Guest"
    });
    return NextResponse.json({ room });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not create room." },
      { status: 400 }
    );
  }
}
