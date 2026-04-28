import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { games } from "@/games/catalog";

export const metadata: Metadata = {
  title: "Learn Rules",
  description:
    "Short, specific rules for traditional Indian games including Raja Mantri Chor Sipahi, Ashta Chamma, Moksha Patam, Pallankuzhi, and more."
};

export default function LearnRulesPage() {
  return (
    <section className="page-shell py-12">
      <div className="mb-10 max-w-3xl">
        <p className="eyebrow mb-3">Rules</p>
        <h1 className="display text-4xl font-black text-[#fff2d8] sm:text-5xl">Short rules, no fog.</h1>
        <p className="mt-4 text-lg leading-8 text-[#b9aa90]">
          Every game keeps its rules close to play. Regional differences are called out instead of flattened.
        </p>
      </div>
      <div className="grid gap-4">
        {games.map((game) => (
          <article key={game.id} className="glass grid gap-4 rounded-lg p-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="mb-2 flex flex-wrap gap-2">
                {game.alternateNames.slice(0, 3).map((name) => (
                  <span key={name} className="rounded-full border border-[rgba(240,179,91,0.22)] px-2 py-1 text-xs text-[#cdbf9f]">
                    {name}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl font-black">{game.title}</h2>
              <p className="mt-2 leading-7 text-[#b9aa90]">{game.rules[0]?.body}</p>
            </div>
            <Link href={`/games/${game.slug}`} className="button-primary focus-ring">
              Open <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
