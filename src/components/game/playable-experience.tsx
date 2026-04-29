"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import { ArrowRight, Dice5, HelpCircle, RotateCcw, Sparkles } from "lucide-react";
import { RulesDrawer } from "./rules-drawer";
import { RoomConsole } from "./room-console";
import { useGameSound } from "./sound-provider";
import { TutorialPanel } from "./tutorial-panel";
import { ashtaChammaModule, ashtaPath, ashtaSafeSquares } from "@/games/modules/ashta-chamma";
import { damrooModule } from "@/games/modules/damroo";
import { gilliDandaModule } from "@/games/modules/gilli-danda";
import { mokshaLinks, mokshaPatamModule } from "@/games/modules/moksha-patam";
import { pallankuzhiModule } from "@/games/modules/pallankuzhi";
import { rajaMantriModule } from "@/games/modules/raja-mantri";
import type { GameMetadata } from "@/games/types";

type PlayableExperienceProps = {
  game: GameMetadata;
};

const playfieldAssets = {
  ashta: "/assets/playfields/ashta-chamma-board-v2.jpg",
  damroo: "/assets/playfields/damroo-arena-v2.jpg",
  gilli: "/assets/playfields/gilli-danda-field-v2.jpg",
  moksha: "/assets/playfields/moksha-patam-board-v2.jpg",
  pallankuzhi: "/assets/playfields/pallankuzhi-board-v2.jpg",
  raja: "/assets/playfields/raja-mantri-table-v2.jpg"
} as const;

const gotiStyles = ["goti--saffron", "goti--peacock", "goti--maroon", "goti--emerald"] as const;

const mokshaVisualSquares = Array.from({ length: 36 }, (_, index) => {
  const visualRow = Math.floor(index / 6);
  const column = index % 6;
  const rowFromBottom = 5 - visualRow;
  const rowStart = rowFromBottom * 6 + 1;
  return rowFromBottom % 2 === 0 ? rowStart + column : rowStart + (5 - column);
});

function playerStyle(index: number) {
  return gotiStyles[index % gotiStyles.length];
}

export function PlayableExperience({ game }: PlayableExperienceProps) {
  const [mode, setMode] = useState<"practice" | "tutorial" | "room">("practice");

  if (game.status !== "playable") {
    return (
      <section className="glass rounded-lg p-6">
        <p className="eyebrow mb-2">Roadmap module</p>
        <h2 className="text-2xl font-black">This game is queued after launch polish.</h2>
        <p className="mt-3 leading-7 text-[#b9aa90]">
          Rules and metadata already exist, so the future implementation only needs a game module and renderer.
        </p>
      </section>
    );
  }

  return (
    <section className="grid gap-5">
      <div className="flex gap-2 overflow-x-auto">
        {[
          ["practice", "Practice"],
          ["tutorial", "Tutorial"],
          ["room", "Room"]
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={`focus-ring min-h-11 rounded-lg border px-4 text-sm font-black ${
              mode === value
                ? "border-[rgba(240,179,91,0.6)] bg-[rgba(240,179,91,0.16)] text-[#ffd58f]"
                : "border-[rgba(240,179,91,0.2)] text-[#b9aa90]"
            }`}
            onClick={() => setMode(value as typeof mode)}
          >
            {label}
          </button>
        ))}
      </div>
      {mode === "tutorial" ? <TutorialPanel game={game} /> : null}
      {mode === "room" ? <RoomConsole defaultGameSlug={game.slug} /> : null}
      {mode === "practice" ? <PracticeRenderer slug={game.slug} game={game} /> : null}
      <RulesDrawer game={game} />
    </section>
  );
}

function PracticeRenderer({ slug, game }: { slug: string; game: GameMetadata }) {
  if (slug === "raja-mantri-chor-sipahi") return <RajaMantriPlay />;
  if (slug === "ashta-chamma") return <AshtaChammaPlay />;
  if (slug === "damroo") return <DamrooPlay />;
  if (slug === "moksha-patam") return <MokshaPatamPlay />;
  if (slug === "pallankuzhi") return <PallankuzhiPlay />;
  if (slug === "gilli-danda") return <GilliDandaPlay />;
  return (
    <div className="glass rounded-lg p-6">
      <h2 className="text-xl font-black">{game.title}</h2>
      <p className="mt-2 text-[#b9aa90]">Practice mode is not wired yet.</p>
    </div>
  );
}

function RajaMantriPlay() {
  const { play } = useGameSound();
  const [state, setState] = useState(() => rajaMantriModule.createInitialState());
  const mantri = state.players.find((player) => state.roles[player] === "Mantri") ?? state.players[0];
  const result = rajaMantriModule.getResult(state);

  return (
    <section className="glass grid gap-5 rounded-lg p-5">
      <GameStatusBar title={`Round ${state.round}`} message={state.explanation} />
      <PlaySurface
        alt="Immersive Indian tabletop with four Raja Mantri Chor Sipahi role chits"
        className="min-h-[420px]"
        src={playfieldAssets.raja}
        variant="wide"
      >
        <div className="role-table">
          {state.players.map((player, index) => (
            <article key={player} className={`role-chit role-chit--${index}`}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-black">{player}</h3>
                <span className="rounded-full bg-[rgba(42,22,8,0.14)] px-2 py-1 text-xs font-black text-[#5a2c18]">
                  {state.scores[player]}
                </span>
              </div>
              <div className="mt-4 grid place-items-center gap-2 text-center">
                <span className={`role-sigil ${playerStyle(index)}`} aria-hidden="true" />
                <span className="text-xl font-black text-[#2a1608]">{state.roles[player]}</span>
              </div>
            </article>
          ))}
        </div>
      </PlaySurface>
      {state.phase === "guess" ? (
        <div>
          <p className="mb-3 text-sm font-bold text-[#cdbf9f]">{mantri} is Mantri. Choose the suspected Chor.</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {state.players
              .filter((player) => player !== mantri)
              .map((player) => (
                <button
                  key={player}
                  type="button"
                  className="button-secondary focus-ring"
                  onClick={() => {
                    play("success");
                    setState((value) => rajaMantriModule.applyAction(value, { type: "guess", playerId: mantri, suspectId: player }));
                  }}
                >
                  Accuse {player}
                </button>
              ))}
          </div>
        </div>
      ) : null}
      {state.phase === "result" ? (
        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="button" className="button-primary focus-ring flex-1" onClick={() => {
            play("move");
            setState((value) => rajaMantriModule.applyAction(value, { type: "new-round" }));
          }}>
            Next Round <ArrowRight size={16} aria-hidden="true" />
          </button>
          <button type="button" className="button-secondary focus-ring flex-1" onClick={() => setState((value) => rajaMantriModule.applyAction(value, { type: "finish" }))}>
            Finish Match
          </button>
        </div>
      ) : null}
      {result ? <ResultPanel summary={result.summary} /> : null}
    </section>
  );
}

function MokshaPatamPlay() {
  const { play } = useGameSound();
  const [state, setState] = useState(() => mokshaPatamModule.createInitialState());
  const active = state.players[state.turn];
  return (
    <section className="glass grid gap-5 rounded-lg p-5 lg:grid-cols-[1fr_280px]">
      <PlaySurface
        alt="Immersive Indianized Moksha Patam board with snakes and ladders"
        src={playfieldAssets.moksha}
        variant="square"
      >
        <div className="board-grid moksha-board-grid">
          {mokshaVisualSquares.map((square) => {
            const playersHere = state.players.filter((player) => state.positions[player] === square);
            const link = mokshaLinks[square];
            return (
              <div key={square} className={`board-cell ${link ? "board-cell--linked" : ""}`}>
                <span className="cell-number">{square}</span>
                {link ? <span className="cell-link-label">{link > square ? "Climb" : "Slide"}</span> : null}
                <div className="cell-tokens">
                  {playersHere.map((player) => (
                    <span
                      key={player}
                      className={`goti ${playerStyle(state.players.indexOf(player))}`}
                      title={player}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </PlaySurface>
      <aside className="grid content-start gap-4">
        <GameStatusBar title={`${active}'s turn`} message={state.message} />
        <button type="button" className="button-primary focus-ring" disabled={Boolean(state.winner)} onClick={() => {
          play("roll");
          setState((value) => mokshaPatamModule.applyAction(value, { type: "roll", playerId: active }));
        }}>
          <Dice5 size={17} aria-hidden="true" /> Roll {state.lastRoll ? `(${state.lastRoll})` : ""}
        </button>
        {state.winner ? <ResultPanel summary={`${state.winner} wins.`} /> : null}
      </aside>
    </section>
  );
}

function PallankuzhiPlay() {
  const { play } = useGameSound();
  const [state, setState] = useState(() => pallankuzhiModule.createInitialState());
  const active = state.players[state.turn];
  const result = pallankuzhiModule.getResult(state);
  return (
    <section className="glass grid gap-5 rounded-lg p-5">
      <GameStatusBar title={`${active}'s turn`} message={state.message} />
      <PlaySurface
        alt="Immersive carved wooden Pallankuzhi board with fourteen pits"
        className="pallankuzhi-surface"
        src={playfieldAssets.pallankuzhi}
        variant="wide"
      >
        {[1, 0].map((side) => (
          <div key={side} className="pallankuzhi-row">
            {Array.from({ length: 7 }).map((_, offset) => {
              const pitIndex = side === 0 ? offset : 13 - offset;
              const canMove = state.players[state.turn] === active && state.turn === side && state.pits[pitIndex] > 0;
              return (
                <button
                  key={pitIndex}
                  type="button"
                  disabled={!canMove || Boolean(result)}
                  onClick={() => {
                    play("move");
                    setState((value) => pallankuzhiModule.applyAction(value, { type: "sow", playerId: active, pitIndex }));
                  }}
                  className={`pit-button focus-ring ${canMove ? "pit-button--active" : ""}`}
                  aria-label={`Pit ${pitIndex + 1} with ${state.pits[pitIndex]} seeds`}
                >
                  <SeedCluster count={state.pits[pitIndex]} />
                  <span className="pit-count">{state.pits[pitIndex]}</span>
                </button>
              );
            })}
          </div>
        ))}
      </PlaySurface>
      <div className="grid gap-3 sm:grid-cols-2">
        {state.players.map((player, index) => (
          <div key={player} className="rounded-lg border border-[rgba(240,179,91,0.2)] p-4">
            <span className="text-sm text-[#b9aa90]">{player} captured</span>
            <div className="text-3xl font-black text-[#ffd58f]">{state.captured[index]}</div>
          </div>
        ))}
      </div>
      {result ? <ResultPanel summary={result.summary} /> : null}
    </section>
  );
}

function DamrooPlay() {
  const { play } = useGameSound();
  const [state, setState] = useState(() => damrooModule.createInitialState());
  const [offset, setOffset] = useState(0);
  const ringPosition = Math.max(8, Math.min(92, 50 + offset / 4));
  return (
    <section className="glass grid gap-5 rounded-lg p-5">
      <GameStatusBar title={`Beat ${Math.min(state.beat + 1, 8)} of 8`} message={state.message} />
      <PlaySurface
        alt="Immersive Indianized Damroo rhythm arena with circular beat target"
        className="min-h-[360px]"
        src={playfieldAssets.damroo}
        variant="wide"
      >
        <div className="damroo-stage">
          <div className="damroo-target" aria-hidden="true">
            <div className="damroo-perfect-zone" />
            <div className="damroo-beat-marker" style={{ left: `${ringPosition}%` }} />
          </div>
          <div className="damroo-caption">
            <span>Sweet spot</span>
            <strong>{Math.abs(offset) <= 130 ? "Inside rhythm" : "Drifting"}</strong>
          </div>
        </div>
      </PlaySurface>
      <label className="grid gap-2 text-sm font-bold text-[#cdbf9f]">
        Timing offset
        <input type="range" min="-220" max="220" value={offset} onChange={(event) => setOffset(Number(event.target.value))} />
      </label>
      <div className="grid gap-3 sm:grid-cols-3">
        <Metric label="Score" value={state.score} />
        <Metric label="Combo" value={state.combo} />
        <Metric label="Misses" value={state.misses} />
      </div>
      {state.phase === "ready" ? (
        <button type="button" className="button-primary focus-ring" onClick={() => {
          play("tap");
          setState((value) => damrooModule.applyAction(value, { type: "start" }));
        }}>
          Start Beat
        </button>
      ) : state.phase === "playing" ? (
        <button type="button" className="button-primary focus-ring" onClick={() => {
          play(Math.abs(offset) <= 130 ? "success" : "miss");
          setState((value) => damrooModule.applyAction(value, { type: "tap", offsetMs: offset }));
        }}>
          Tap Ring
        </button>
      ) : (
        <button type="button" className="button-secondary focus-ring" onClick={() => setState((value) => damrooModule.applyAction(value, { type: "reset" }))}>
          <RotateCcw size={16} aria-hidden="true" /> Play Again
        </button>
      )}
    </section>
  );
}

function GilliDandaPlay() {
  const { play } = useGameSound();
  const [state, setState] = useState(() => gilliDandaModule.createInitialState());
  const [power, setPower] = useState(0.75);
  const [angle, setAngle] = useState(0.62);
  const result = gilliDandaModule.getResult(state);
  return (
    <section className="glass grid gap-5 rounded-lg p-5">
      <GameStatusBar title={`Attempt ${Math.min(state.attempts + 1, 3)} of 3`} message={state.message} />
      <PlaySurface
        alt="Immersive Indian courtyard playfield for Gilli Danda"
        className="min-h-[340px]"
        src={playfieldAssets.gilli}
        variant="wide"
      >
        <div className="gilli-scene" aria-hidden="true">
          <div className="gilli-trajectory" style={{ transform: `rotate(${angle * -26 - 18}deg) scaleX(${0.55 + power * 0.6})` }} />
          <div className="gilli-danda" style={{ transform: `rotate(${angle * 58 - 32}deg)` }} />
          <div className="gilli-stick" />
        </div>
        <div className="play-badge absolute right-5 top-5">
          {state.lastDistance}m
        </div>
      </PlaySurface>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-[#cdbf9f]">
          Lift power
          <input type="range" min="0" max="1" step="0.01" value={power} onChange={(event) => setPower(Number(event.target.value))} />
        </label>
        <label className="grid gap-2 text-sm font-bold text-[#cdbf9f]">
          Strike angle
          <input type="range" min="0" max="1" step="0.01" value={angle} onChange={(event) => setAngle(Number(event.target.value))} />
        </label>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Metric label="Total" value={`${state.totalDistance}m`} />
        <Metric label="Attempts" value={state.attempts} />
      </div>
      {state.phase === "aiming" ? (
        <button type="button" className="button-primary focus-ring" onClick={() => {
          play("success");
          setState((value) => gilliDandaModule.applyAction(value, { type: "strike", power, angle }));
        }}>
          Strike
        </button>
      ) : (
        <button type="button" className="button-secondary focus-ring" onClick={() => setState((value) => gilliDandaModule.applyAction(value, { type: "reset" }))}>
          <RotateCcw size={16} aria-hidden="true" /> Reset Run
        </button>
      )}
      {result ? <ResultPanel summary={result.summary} /> : null}
    </section>
  );
}

function AshtaChammaPlay() {
  const { play } = useGameSound();
  const [state, setState] = useState(() => ashtaChammaModule.createInitialState());
  const active = state.players[state.turn];
  const result = ashtaChammaModule.getResult(state);
  const legalMoves = useMemo(() => ashtaChammaModule.getAvailableActions(state, active), [active, state]);
  return (
    <section className="glass grid gap-5 rounded-lg p-5 lg:grid-cols-[1fr_280px]">
      <PlaySurface
        alt="Immersive Indianized Ashta Chamma board with cowrie shells"
        src={playfieldAssets.ashta}
        variant="square"
      >
        <div className="board-grid ashta-board-grid">
        {Array.from({ length: 25 }).map((_, square) => {
          const pathIndex = ashtaPath.indexOf(square);
          const tokensHere = state.tokens
            .map((token, tokenIndex) => ({ token, tokenIndex }))
            .filter(({ token }) => ashtaPath[token.progress] === square && !token.finished);
          return (
            <div key={square} className={`board-cell ${pathIndex >= 0 ? "" : "board-cell--quiet"} ${ashtaSafeSquares.has(square) ? "board-cell--safe" : ""}`}>
              <span className="cell-number">{pathIndex >= 0 ? pathIndex + 1 : ""}</span>
              {ashtaSafeSquares.has(square) ? <Sparkles className="absolute right-1 top-1" size={13} color="var(--gold)" aria-hidden="true" /> : null}
              <div className="cell-tokens">
                {tokensHere.map(({ token, tokenIndex }) => {
                  const canMove = legalMoves.some((action) => action.type === "move" && action.tokenIndex === tokenIndex);
                  return (
                    <button
                      key={tokenIndex}
                      type="button"
                      disabled={!canMove}
                      onClick={() => {
                        play("move");
                        setState((value) => ashtaChammaModule.applyAction(value, { type: "move", playerId: active, tokenIndex }));
                      }}
                      className={`goti focus-ring ${playerStyle(state.players.indexOf(token.owner))} ${canMove ? "goti--legal" : ""}`}
                      aria-label={`${token.owner} token ${tokenIndex + 1}`}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
        </div>
      </PlaySurface>
      <aside className="grid content-start gap-4">
        <GameStatusBar title={`${active}'s turn`} message={state.message} />
        <Metric label="Cowrie throw" value={state.roll ?? "-"} />
        <button
          type="button"
          className="button-primary focus-ring"
          disabled={state.roll !== undefined || Boolean(result)}
          onClick={() => {
            play("roll");
            setState((value) => ashtaChammaModule.applyAction(value, { type: "throw", playerId: active }));
          }}
        >
          <Dice5 size={17} aria-hidden="true" /> Throw
        </button>
        {result ? <ResultPanel summary={result.summary} /> : null}
      </aside>
    </section>
  );
}

function GameStatusBar({ title, message }: { title: string; message: string }) {
  return (
    <div className="rounded-lg border border-[rgba(240,179,91,0.2)] bg-[rgba(255,255,255,0.035)] p-4">
      <h2 className="flex items-center gap-2 text-xl font-black">
        <HelpCircle size={18} color="var(--gold)" aria-hidden="true" /> {title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-[#b9aa90]">{message}</p>
    </div>
  );
}

function PlaySurface({
  alt,
  children,
  className = "",
  src,
  variant
}: {
  alt: string;
  children: ReactNode;
  className?: string;
  src: string;
  variant: "square" | "wide";
}) {
  return (
    <div className={`play-surface play-surface--${variant} ${className}`}>
      <Image alt={alt} className="play-surface__image" fill sizes="(max-width: 768px) 100vw, 760px" src={src} />
      <div className="play-surface__shade" aria-hidden="true" />
      <div className="play-surface__content">{children}</div>
    </div>
  );
}

function SeedCluster({ count }: { count: number }) {
  return (
    <span className="seed-cluster" aria-hidden="true">
      {Array.from({ length: Math.min(count, 10) }).map((_, index) => (
        <span key={index} className="seed" />
      ))}
    </span>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-[rgba(240,179,91,0.2)] bg-[rgba(255,255,255,0.035)] p-4">
      <div className="text-xs font-black uppercase text-[#9f927b]">{label}</div>
      <div className="mt-1 text-2xl font-black text-[#ffd58f]">{value}</div>
    </div>
  );
}

function ResultPanel({ summary }: { summary: string }) {
  return (
    <div className="rounded-lg border border-[rgba(126,191,99,0.35)] bg-[rgba(126,191,99,0.1)] p-4">
      <h3 className="font-black text-[#d8f0c8]">Result</h3>
      <p className="mt-1 text-sm leading-6 text-[#c7ddb9]">{summary}</p>
    </div>
  );
}
