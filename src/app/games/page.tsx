import type { Metadata } from "next";
import { CatalogFilter } from "@/components/game/catalog-filter";
import { games } from "@/games/catalog";

export const metadata: Metadata = {
  title: "Games",
  description:
    "Browse playable and upcoming traditional Indian games on SusNoodle, including Raja Mantri Chor Sipahi, Ashta Chamma, Moksha Patam, Pallankuzhi, and Gilli Danda.",
  alternates: {
    canonical: "/games"
  }
};

export default function GamesPage() {
  return (
    <section className="page-shell py-12">
      <div className="mb-8 max-w-3xl">
        <p className="eyebrow mb-3">Catalog</p>
        <h1 className="display text-4xl font-black text-[#fff2d8] sm:text-5xl">Pick a table.</h1>
        <p className="mt-4 text-lg leading-8 text-[#b9aa90]">
          Six games are playable in this build. The rest are roadmap-ready catalog entries with rules, notes,
          and module plans.
        </p>
      </div>
      <CatalogFilter games={games} />
    </section>
  );
}
