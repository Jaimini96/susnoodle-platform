import Link from "next/link";
import { ArrowRight, Clock, Users } from "lucide-react";
import { GamePreviewArt } from "./game-preview-art";
import type { GameMetadata } from "@/games/types";

type GameCardProps = {
  game: GameMetadata;
  priority?: number;
};

export function GameCard({ game, priority }: GameCardProps) {
  return (
    <article className="glass group overflow-hidden rounded-lg transition duration-200 hover:-translate-y-1 hover:border-[rgba(240,179,91,0.45)]">
      <GamePreviewArt game={game} />
      <div className="grid gap-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="mb-2 flex items-center gap-2">
              {typeof priority === "number" ? (
                <span className="grid size-7 place-items-center rounded-full bg-[rgba(240,179,91,0.16)] text-xs font-black text-[#ffd58f]">
                  {priority}
                </span>
              ) : null}
              <span className="rounded-full border border-[rgba(240,179,91,0.24)] px-2 py-1 text-[11px] font-black uppercase text-[#cdbf9f]">
                {game.status === "playable" ? "Playable" : game.status === "coming-soon" ? "Roadmap" : "Research"}
              </span>
            </div>
            <h2 className="text-xl font-black leading-tight text-[#f8ecd4]">{game.title}</h2>
          </div>
        </div>
        <p className="min-h-12 text-sm leading-6 text-[#b9aa90]">{game.shortDescription}</p>
        <div className="flex flex-wrap gap-3 text-xs text-[#cdbf9f]">
          <span className="inline-flex items-center gap-1">
            <Users size={14} aria-hidden="true" /> {game.minPlayers}-{game.maxPlayers}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock size={14} aria-hidden="true" /> {game.estimatedMinutes} min
          </span>
        </div>
        <Link href={`/games/${game.slug}`} className="button-primary focus-ring w-full">
          {game.status === "playable" ? "Play" : "Open Rules"} <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
