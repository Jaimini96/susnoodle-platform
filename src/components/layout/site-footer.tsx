import Link from "next/link";
import { GitBranch, ShieldCheck } from "lucide-react";
import { playableSlugs } from "@/games/catalog";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[rgba(240,179,91,0.18)]">
      <div className="page-shell grid gap-8 py-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="mb-3 flex items-center gap-2 text-lg font-black">susnoodle</div>
          <p className="max-w-md text-sm leading-7 text-[#b9aa90]">
            Old Indian games rebuilt as fast, tactile browser play. No betting, no fake numbers, no clutter.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-black text-[#f8ecd4]">Platform</h2>
          <div className="grid gap-2 text-sm text-[#b9aa90]">
            <Link href="/games">Game catalog</Link>
            <Link href="/play-with-friends">Friend rooms</Link>
            <Link href="/learn-rules">Rules</Link>
          </div>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-black text-[#f8ecd4]">Build Notes</h2>
          <div className="grid gap-2 text-sm text-[#b9aa90]">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={15} aria-hidden="true" /> {playableSlugs.length} playable modules
            </span>
            <span className="inline-flex items-center gap-2">
              <GitBranch size={15} aria-hidden="true" /> Cloudflare-ready
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
