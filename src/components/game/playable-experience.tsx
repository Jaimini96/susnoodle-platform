"use client";

import { useMemo, useState } from "react";
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
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {state.players.map((player) => (
          <article key={player} className="rounded-lg border border-[rgba(240,179,91,0.2)] bg-[rgba(255,255,255,0.04)] p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black">{player}</h3>
              <span className="text-sm font-black text-[#ffd58f]">{state.scores[player]}</span>
            </div>
            <div className="mt-4 grid h-28 place-items-center rounded-md bg-[#ead2a7] text-xl font-black text-[#2a1608] shadow-inner">
              {state.phase === "guess" ? state.roles[player] : state.roles[player]}
            </div>
          </article>
        ))}
      </div>
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
      <div className="grid grid-cols-6 overflow-hidden rounded-lg border border-[rgba(240,179,91,0.24)]">
        {Array.from({ length: 36 }).map((_, index) => {
          const square = index + 1;
          const playersHere = state.players.filter((player) => state.positions[player] === square);
          const link = mokshaLinks[square];
          return (
            <div key={square} className="relative aspect-square border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.035)] p-1">
              <span className="text-[10px] font-bold text-[#8f826c]">{square}</span>
              {link ? <span className="absolute right-1 top-1 text-[10px] font-black text-[#ffd58f]">{link > square ? "Up" : "Down"}</span> : null}
              <div className="absolute bottom-1 left-1 flex gap-1">
                {playersHere.map((player) => (
                  <span key={player} className="token size-4" title={player} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
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
      <div className="grid gap-3 rounded-[28px] border border-[rgba(240,179,91,0.24)] bg-[#6c3b21] p-4 shadow-inner">
        {[1, 0].map((side) => (
          <div key={side} className="grid grid-cols-7 gap-2">
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
                  className="focus-ring grid aspect-square place-items-center rounded-full border border-[rgba(255,226,172,0.24)] bg-[#28160e] text-lg font-black text-[#ffd58f] shadow-inner disabled:opacity-70"
                  aria-label={`Pit ${pitIndex + 1} with ${state.pits[pitIndex]} seeds`}
                >
                  {state.pits[pitIndex]}
                </button>
              );
            })}
          </div>
        ))}
      </div>
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
      <div className="grid place-items-center py-8">
        <div className="relative size-52 rounded-full border border-[rgba(240,179,91,0.3)]">
          <div className="absolute inset-10 rounded-full border-8 border-[#f0b35b]" />
          <div className="absolute top-1/2 size-10 -translate-y-1/2 rounded-full bg-[#e7573f] shadow-[0_0_42px_rgba(231,87,63,0.55)]" style={{ left: `${ringPosition}%` }} />
        </div>
      </div>
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
      <div className="relative min-h-56 overflow-hidden rounded-lg border border-[rgba(240,179,91,0.22)] bg-[linear-gradient(180deg,rgba(49,99,66,0.26),rgba(95,51,26,0.34))]">
        <div className="absolute bottom-14 left-12 h-4 w-44 origin-left rounded-full bg-[#b86f35]" style={{ transform: `rotate(${angle * 58 - 32}deg)` }} />
        <div className="absolute bottom-24 left-28 h-3 w-16 rounded-full bg-[#f0b35b]" />
        <div className="absolute right-5 top-5 rounded-lg bg-[rgba(0,0,0,0.28)] px-4 py-2 font-black text-[#ffd58f]">
          {state.lastDistance}m
        </div>
      </div>
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
      <div className="grid grid-cols-5 overflow-hidden rounded-lg border border-[rgba(240,179,91,0.24)]">
        {Array.from({ length: 25 }).map((_, square) => {
          const pathIndex = ashtaPath.indexOf(square);
          const tokensHere = state.tokens
            .map((token, tokenIndex) => ({ token, tokenIndex }))
            .filter(({ token }) => ashtaPath[token.progress] === square && !token.finished);
          return (
            <div key={square} className="relative aspect-square border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.035)] p-1">
              <span className="text-[10px] font-bold text-[#8f826c]">{pathIndex >= 0 ? pathIndex + 1 : ""}</span>
              {ashtaSafeSquares.has(square) ? <Sparkles className="absolute right-1 top-1" size={12} color="var(--gold)" aria-hidden="true" /> : null}
              <div className="absolute bottom-1 left-1 flex flex-wrap gap-1">
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
                      className={`token size-4 focus-ring ${token.owner === state.players[0] ? "" : "bg-[#2db7a3]"} ${canMove ? "ring-2 ring-[#ffd58f]" : ""}`}
                      aria-label={`${token.owner} token ${tokenIndex + 1}`}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
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
