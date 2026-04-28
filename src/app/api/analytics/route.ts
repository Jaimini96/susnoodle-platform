import { NextResponse } from "next/server";
import { normalizeAnalyticsPayload } from "@/services/analytics";

export async function POST(request: Request) {
  try {
    const payload = normalizeAnalyticsPayload(await request.json());
    // In production this endpoint can fan out to PostHog, Plausible, or Cloudflare Analytics Engine.
    return NextResponse.json({ ok: true, payload });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid analytics payload." },
      { status: 400 }
    );
  }
}
