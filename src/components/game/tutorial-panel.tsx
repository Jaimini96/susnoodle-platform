"use client";

import { useState } from "react";
import { ArrowRight, GraduationCap, RotateCcw } from "lucide-react";
import type { GameMetadata } from "@/games/types";

export function TutorialPanel({ game }: { game: GameMetadata }) {
  const [step, setStep] = useState(0);
  const active = game.tutorial[step];
  return (
    <section className="glass grid gap-4 rounded-lg p-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="inline-flex items-center gap-2 font-black">
          <GraduationCap size={18} color="var(--gold)" aria-hidden="true" /> Tutorial
        </h2>
        <span className="text-xs font-black text-[#b9aa90]">
          {step + 1}/{game.tutorial.length}
        </span>
      </div>
      <div>
        <h3 className="mb-2 text-lg font-black text-[#f8ecd4]">{active.title}</h3>
        <p className="leading-7 text-[#b9aa90]">{active.body}</p>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          className="button-secondary focus-ring flex-1"
          onClick={() => setStep(0)}
        >
          <RotateCcw size={16} aria-hidden="true" /> Restart
        </button>
        <button
          type="button"
          className="button-primary focus-ring flex-1"
          onClick={() => setStep((value) => (value + 1) % game.tutorial.length)}
        >
          Next <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
