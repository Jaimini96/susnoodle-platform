import Link from "next/link";
import { Gamepad2, Menu, Search } from "lucide-react";
import { SoundToggle } from "@/components/game/sound-provider";
import { games } from "@/games/catalog";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Games" },
  { href: "/play-with-friends", label: "Play With Friends" },
  { href: "/learn-rules", label: "Learn Rules" },
  { href: "/about", label: "About" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(240,179,91,0.18)] bg-[rgba(7,7,6,0.78)] backdrop-blur-2xl">
      <nav className="page-shell flex min-h-20 items-center justify-between gap-4">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-lg" aria-label="SusNoodle home">
          <span className="grid size-10 place-items-center rounded-lg border border-[rgba(240,179,91,0.45)] bg-[rgba(240,179,91,0.12)]">
            <Gamepad2 aria-hidden="true" size={21} color="var(--gold)" />
          </span>
          <span className="text-xl font-black tracking-normal text-[#f8ecd4]">susnoodle</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-lg px-4 py-3 text-sm font-bold text-[#cdbf9f] transition hover:text-[#f8ecd4]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <SoundToggle />
          <Link
            href="/games"
            className="focus-ring hidden size-11 place-items-center rounded-lg border border-[rgba(240,179,91,0.28)] text-[#f8ecd4] sm:grid"
            aria-label={`Search ${games.length} games`}
          >
            <Search aria-hidden="true" size={18} />
          </Link>
          <Link href="/play-with-friends" className="button-secondary focus-ring hidden sm:inline-flex">
            Create Room
          </Link>
          <Link href="/games/raja-mantri-chor-sipahi" className="button-primary focus-ring">
            Play Now
          </Link>
          <Link
            href="/games"
            className="focus-ring grid size-11 place-items-center rounded-lg border border-[rgba(240,179,91,0.28)] lg:hidden"
            aria-label="Open games"
          >
            <Menu aria-hidden="true" size={20} />
          </Link>
        </div>
      </nav>
    </header>
  );
}
