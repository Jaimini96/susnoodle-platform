import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Globe2, UsersRound, Zap } from "lucide-react";
import { GameCard } from "@/components/game/game-card";
import { games, getFeaturedGames, playableSlugs } from "@/games/catalog";

export default function HomePage() {
  const featured = getFeaturedGames();

  return (
    <>
      <section className="relative min-h-[calc(88svh-80px)] overflow-hidden border-b border-[rgba(240,179,91,0.18)]">
        <Image
          src="/susnoodle-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_50%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,6,0.98)_0%,rgba(7,7,6,0.82)_39%,rgba(7,7,6,0.38)_72%,rgba(7,7,6,0.8)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#070706] to-transparent" />
        <div className="page-shell relative grid min-h-[calc(88svh-80px)] content-center py-12">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Indian games. Browser-fast. Friend-ready.</p>
            <h1 className="display text-5xl font-black leading-[0.98] text-[#fff2d8] sm:text-6xl lg:text-7xl">
              Old Indian games, rebuilt beautifully for today.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#cdbf9f]">
              Start with a role chit, a cowrie throw, a seed count, or a clean strike. No login gate.
              No casino noise. Just sharp, tactile play.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/games/raja-mantri-chor-sipahi" className="button-primary focus-ring">
                Start a Game <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/play-with-friends" className="button-secondary focus-ring">
                Create Friend Room <UsersRound size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3 border-y border-[rgba(240,179,91,0.18)] py-5">
              {[
                [`${games.length}`, "catalog games"],
                [`${playableSlugs.length}`, "playable now"],
                ["0", "real-money hooks"]
              ].map(([value, label]) => (
                <div key={label}>
                  <div className="text-2xl font-black text-[#ffd58f]">{value}</div>
                  <div className="mt-1 text-xs font-bold uppercase text-[#9f927b]">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[rgba(240,179,91,0.18)] bg-[rgba(255,255,255,0.02)] py-14">
        <div className="page-shell">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow mb-3">Launch collection</p>
              <h2 className="display text-3xl font-black text-[#fff2d8] sm:text-4xl">
                Traditional Indian game catalog
              </h2>
            </div>
            <Link href="/games" className="button-secondary focus-ring">
              View Catalog <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((game, index) => (
              <GameCard key={game.id} game={game} priority={index + 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell grid gap-5 py-16 md:grid-cols-3">
        {[
          {
            icon: BookOpen,
            title: "Rules That Teach",
            body: "Each game page carries concise rules, a cultural note, and a tutorial mode built from metadata."
          },
          {
            icon: Zap,
            title: "Reusable Engines",
            body: "Game modules expose one contract for state, validation, actions, results, rooms, and tests."
          },
          {
            icon: Globe2,
            title: "Cloudflare Native",
            body: "Pages, Workers, Durable Objects, D1, R2, and Turnstile are prepared in the project structure."
          }
        ].map((item) => (
          <article key={item.title} className="glass rounded-lg p-6">
            <item.icon color="var(--gold)" aria-hidden="true" />
            <h2 className="mt-5 text-xl font-black">{item.title}</h2>
            <p className="mt-3 leading-7 text-[#b9aa90]">{item.body}</p>
          </article>
        ))}
      </section>
    </>
  );
}
