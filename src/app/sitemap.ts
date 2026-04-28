import type { MetadataRoute } from "next";
import { games } from "@/games/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://susnoodle.com";
  return [
    "",
    "/games",
    "/play-with-friends",
    "/learn-rules",
    "/about",
    ...games.map((game) => `/games/${game.slug}`)
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path.startsWith("/games/") ? "weekly" : "daily",
    priority: path === "" ? 1 : path.startsWith("/games/") ? 0.85 : 0.7
  }));
}
