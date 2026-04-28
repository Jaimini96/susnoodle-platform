"use client";

import { useState } from "react";
import { BookOpen, ChevronDown } from "lucide-react";
import type { GameMetadata } from "@/games/types";

export function RulesDrawer({ game }: { game: GameMetadata }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="glass rounded-lg">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="focus-ring flex w-full items-center justify-between gap-4 rounded-lg p-4 text-left"
        aria-expanded={open}
      >
        <span className="inline-flex items-center gap-2 font-black">
          <BookOpen size={18} aria-hidden="true" color="var(--gold)" /> Rules drawer
        </span>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? (
        <div className="rules-copy grid gap-4 border-t border-[rgba(240,179,91,0.16)] p-4">
          {game.rules.map((rule) => (
            <article key={rule.title}>
              <h3 className="mb-1 font-black text-[#f8ecd4]">{rule.title}</h3>
              <p>{rule.body}</p>
              {rule.bullets ? (
                <ul className="mt-2 list-disc pl-5">
                  {rule.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
