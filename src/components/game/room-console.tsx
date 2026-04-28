"use client";

import { useState } from "react";
import { Copy, Loader2, Play, UsersRound } from "lucide-react";
import { games } from "@/games/catalog";
import type { RoomState } from "@/services/rooms";

export function RoomConsole({ defaultGameSlug = "raja-mantri-chor-sipahi" }: { defaultGameSlug?: string }) {
  const playableGames = games.filter((game) => game.status === "playable" && game.modes.includes("online"));
  const [gameSlug, setGameSlug] = useState(defaultGameSlug);
  const [hostName, setHostName] = useState("Host");
  const [joinCode, setJoinCode] = useState("");
  const [joinName, setJoinName] = useState("Guest");
  const [room, setRoom] = useState<RoomState | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function create() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/rooms", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ gameSlug, hostName })
      });
      const data = (await response.json()) as { room?: RoomState; error?: string };
      if (!response.ok || !data.room) throw new Error(data.error ?? "Could not create room.");
      setRoom(data.room);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not create room.");
    } finally {
      setLoading(false);
    }
  }

  async function join() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/rooms/${joinCode}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "join", playerName: joinName })
      });
      const data = (await response.json()) as { room?: RoomState; error?: string };
      if (!response.ok || !data.room) throw new Error(data.error ?? "Could not join room.");
      setRoom(data.room);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not join room.");
    } finally {
      setLoading(false);
    }
  }

  const shareUrl = room ? `${globalThis.location?.origin ?? "https://susnoodle.com"}/play-with-friends?room=${room.code}` : "";

  return (
    <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="glass grid gap-4 rounded-lg p-5">
        <div>
          <h2 className="text-2xl font-black">Create room</h2>
          <p className="mt-2 text-sm leading-6 text-[#b9aa90]">Guest-friendly lobby creation for playable online games.</p>
        </div>
        <label className="grid gap-2 text-sm font-bold text-[#cdbf9f]">
          Game
          <select
            value={gameSlug}
            onChange={(event) => setGameSlug(event.target.value)}
            className="focus-ring min-h-12 rounded-lg border border-[rgba(240,179,91,0.24)] bg-[#0d0b09] px-3 text-[#f8ecd4]"
          >
            {playableGames.map((game) => (
              <option key={game.slug} value={game.slug}>
                {game.title}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-[#cdbf9f]">
          Host name
          <input
            value={hostName}
            onChange={(event) => setHostName(event.target.value)}
            className="focus-ring min-h-12 rounded-lg border border-[rgba(240,179,91,0.24)] bg-[#0d0b09] px-3 text-[#f8ecd4]"
          />
        </label>
        <button type="button" onClick={create} className="button-primary focus-ring" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" size={17} aria-hidden="true" /> : <UsersRound size={17} aria-hidden="true" />}
          Create Room
        </button>
      </div>

      <div className="glass grid gap-4 rounded-lg p-5">
        <div>
          <h2 className="text-2xl font-black">Join room</h2>
          <p className="mt-2 text-sm leading-6 text-[#b9aa90]">Use a six-character code. Realtime Durable Object wiring is included for production.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-[#cdbf9f]">
            Code
            <input
              value={joinCode}
              onChange={(event) => setJoinCode(event.target.value.toUpperCase())}
              placeholder="AB12CD"
              className="focus-ring min-h-12 rounded-lg border border-[rgba(240,179,91,0.24)] bg-[#0d0b09] px-3 text-[#f8ecd4]"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-[#cdbf9f]">
            Name
            <input
              value={joinName}
              onChange={(event) => setJoinName(event.target.value)}
              className="focus-ring min-h-12 rounded-lg border border-[rgba(240,179,91,0.24)] bg-[#0d0b09] px-3 text-[#f8ecd4]"
            />
          </label>
        </div>
        <button type="button" onClick={join} className="button-secondary focus-ring" disabled={loading || !joinCode}>
          <Play size={17} aria-hidden="true" /> Join
        </button>

        {error ? <p className="rounded-lg border border-[#b63852] bg-[#2a1118] p-3 text-sm text-[#ffd5dc]">{error}</p> : null}
        {room ? (
          <div className="rounded-lg border border-[rgba(240,179,91,0.22)] bg-[rgba(255,255,255,0.03)] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase text-[#b9aa90]">Room code</p>
                <p className="text-3xl font-black text-[#ffd58f]">{room.code}</p>
              </div>
              <button
                type="button"
                className="button-secondary focus-ring"
                onClick={() => navigator.clipboard?.writeText(shareUrl)}
              >
                <Copy size={16} aria-hidden="true" /> Copy Link
              </button>
            </div>
            <div className="mt-4 grid gap-2">
              {room.players.map((player) => (
                <div key={player.id} className="flex items-center justify-between rounded-lg bg-[rgba(255,255,255,0.04)] px-3 py-2 text-sm">
                  <span>{player.name}</span>
                  <span className="font-bold text-[#7ebf63]">{player.ready ? "Ready" : "Waiting"}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
