import Image from "next/image";
import type { CSSProperties } from "react";
import type { GameMetadata } from "@/games/types";

type GamePreviewArtProps = {
  game: GameMetadata;
  compact?: boolean;
};

export function GamePreviewArt({ game, compact = false }: GamePreviewArtProps) {
  const sizeClass = compact ? "min-h-[120px]" : "";
  const asset = game.thumbnailAsset.startsWith("/") ? game.thumbnailAsset : game.heroAsset;
  return (
    <div className={`game-card-preview ${sizeClass}`} style={{ "--accent": game.accent } as CSSProperties}>
      {asset.startsWith("/") ? (
        <Image
          src={asset}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      ) : null}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_26%,rgba(255,255,255,0.12),transparent_7rem)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,7,6,0.64)] via-transparent to-transparent" />
      {asset.startsWith("/") ? null : renderPreview(game.slug)}
    </div>
  );
}

function renderPreview(slug: string) {
  if (slug === "raja-mantri-chor-sipahi") {
    return (
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid grid-cols-2 gap-3">
          {["Raja", "Mantri", "Chor", "Sipahi"].map((role, index) => (
            <div
              key={role}
              className="grid h-20 w-16 place-items-center rounded-md border border-[rgba(255,218,154,0.42)] bg-[#ead2a7] text-[10px] font-black uppercase text-[#2a1608] shadow-xl"
              style={{ transform: `rotate(${[-7, 5, -3, 8][index]}deg)` }}
            >
              {role}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slug === "damroo") {
    return (
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative size-28 rounded-full border border-[rgba(255,226,172,0.35)]">
          <div className="absolute inset-4 rounded-full border-2 border-[var(--accent)] opacity-70" />
          <div className="absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_40px_rgba(231,87,63,0.48)]" />
          <div className="absolute left-1/2 top-[-12px] h-[136px] w-2 -translate-x-1/2 rounded-full bg-[#f3c374]" />
        </div>
      </div>
    );
  }

  if (slug === "pallankuzhi") {
    return (
      <div className="absolute inset-x-6 top-10 grid grid-cols-7 gap-2">
        {Array.from({ length: 14 }).map((_, index) => (
          <span
            key={index}
            className="grid aspect-square place-items-center rounded-full border border-[rgba(255,226,172,0.25)] bg-[#7a4427] shadow-inner"
          >
            <span className="size-2 rounded-full bg-[#eec17a]" />
          </span>
        ))}
      </div>
    );
  }

  if (slug === "gilli-danda") {
    return (
      <div className="absolute inset-0">
        <div className="absolute bottom-12 left-12 h-3 w-36 origin-left rotate-[-22deg] rounded-full bg-[#c68643]" />
        <div className="absolute bottom-20 left-24 h-3 w-16 rotate-[18deg] rounded-full bg-[#e4b16a]" />
        <div className="absolute right-10 top-10 rounded-full border border-[rgba(240,179,91,0.3)] px-3 py-1 text-xs font-black text-[#ffd58f]">
          118m
        </div>
      </div>
    );
  }

  if (slug === "moksha-patam") {
    return (
      <div className="absolute inset-6 grid grid-cols-6 grid-rows-6 overflow-hidden rounded-md border border-[rgba(240,179,91,0.22)]">
        {Array.from({ length: 36 }).map((_, index) => (
          <span
            key={index}
            className="border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.03)] text-[8px] text-[#cdbf9f]"
          >
            {index + 1}
          </span>
        ))}
        <span className="absolute left-10 top-16 h-24 w-2 rotate-45 rounded-full bg-[#82bd69]" />
        <span className="absolute bottom-10 right-14 h-24 w-2 rotate-[-38deg] rounded-full bg-[#b63852]" />
      </div>
    );
  }

  return (
    <>
      <div className="mini-board" />
      <div className="absolute left-[32%] top-[30%] token" />
      <div className="absolute right-[30%] top-[42%] token bg-[#2db7a3]" />
      <div className="absolute bottom-[24%] left-[46%] token bg-[#7d2635]" />
    </>
  );
}
