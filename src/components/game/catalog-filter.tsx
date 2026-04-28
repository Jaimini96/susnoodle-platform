"use client";

import { useMemo, useState } from "react";
import { GameCard } from "./game-card";
import type { GameCategory, GameMetadata } from "@/games/types";

const filters: Array<GameCategory | "all" | "playable"> = [
  "all",
  "playable",
  "board",
  "strategy",
  "bluffing",
  "reflex",
  "card",
  "family",
  "arcade"
];

export function CatalogFilter({ games }: { games: GameMetadata[] }) {
  const [active, setActive] = useState<(typeof filters)[number]>("all");
  const visibleGames = useMemo(() => {
    if (active === "all") return games;
    if (active === "playable") return games.filter((game) => game.status === "playable");
    return games.filter((game) => game.categories.includes(active));
  }, [active, games]);

  return (
    <section className="grid gap-7">
      <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Game filters">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            className={`focus-ring min-h-11 rounded-lg border px-4 text-sm font-black capitalize transition ${
              active === filter
                ? "border-[rgba(240,179,91,0.6)] bg-[rgba(240,179,91,0.16)] text-[#ffd58f]"
                : "border-[rgba(240,179,91,0.2)] bg-transparent text-[#b9aa90]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleGames.map((game, index) => (
          <GameCard key={game.id} game={game} priority={index + 1} />
        ))}
      </div>
    </section>
  );
}
