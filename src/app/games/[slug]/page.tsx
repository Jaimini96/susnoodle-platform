import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, MapPin, Users } from "lucide-react";
import { GamePreviewArt } from "@/components/game/game-preview-art";
import { PlayableExperience } from "@/components/game/playable-experience";
import { games, getGameBySlug } from "@/games/catalog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};
  return {
    title: game.seo.title,
    description: game.seo.description,
    keywords: game.seo.keywords,
    alternates: {
      canonical: `/games/${game.slug}`
    },
    openGraph: {
      title: game.seo.title,
      description: game.seo.description,
      url: `/games/${game.slug}`,
      type: "website"
    }
  };
}

export default async function GamePage({ params }: PageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Game",
    name: game.title,
    alternateName: game.alternateNames,
    description: game.longDescription,
    numberOfPlayers: `${game.minPlayers}-${game.maxPlayers}`,
    genre: game.categories.join(", "),
    playMode: game.modes.join(", ")
  };

  return (
    <section className="page-shell py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Link href="/games" className="button-ghost focus-ring mb-6">
        <ArrowLeft size={16} aria-hidden="true" /> Games
      </Link>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="grid gap-5">
          <GamePreviewArt game={game} />
          <div className="glass rounded-lg p-5">
            <p className="eyebrow mb-3">{game.status === "playable" ? "Playable now" : "Catalog roadmap"}</p>
            <h1 className="display text-4xl font-black leading-tight text-[#fff2d8]">{game.title}</h1>
            <p className="mt-4 text-lg leading-8 text-[#cdbf9f]">{game.longDescription}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {game.alternateNames.map((name) => (
                <span key={name} className="rounded-full border border-[rgba(240,179,91,0.24)] px-3 py-1 text-sm text-[#cdbf9f]">
                  {name}
                </span>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <InfoPill icon={<Users size={16} />} label={`${game.minPlayers}-${game.maxPlayers} players`} />
              <InfoPill icon={<Clock size={16} />} label={`${game.estimatedMinutes} minutes`} />
              <InfoPill icon={<MapPin size={16} />} label={game.regions[0] ?? "India"} />
            </div>
          </div>
          <article className="glass rounded-lg p-5">
            <h2 className="mb-3 text-xl font-black">Cultural note</h2>
            <p className="leading-7 text-[#b9aa90]">{game.culturalNote}</p>
          </article>
        </div>
        <PlayableExperience game={game} />
      </div>
    </section>
  );
}

function InfoPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-[rgba(240,179,91,0.18)] bg-[rgba(255,255,255,0.035)] px-3 py-2 text-sm font-bold text-[#cdbf9f]">
      {icon}
      <span>{label}</span>
    </div>
  );
}
