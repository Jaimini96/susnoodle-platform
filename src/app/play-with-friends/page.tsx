import type { Metadata } from "next";
import { RoomConsole } from "@/components/game/room-console";

export const metadata: Metadata = {
  title: "Play With Friends",
  description: "Create and join guest-friendly SusNoodle friend rooms for playable traditional Indian games."
};

export default function PlayWithFriendsPage() {
  return (
    <section className="page-shell py-12">
      <div className="mb-10 max-w-3xl">
        <p className="eyebrow mb-3">Friend rooms</p>
        <h1 className="display text-4xl font-black text-[#fff2d8] sm:text-5xl">Start a room. Share the code.</h1>
        <p className="mt-4 text-lg leading-8 text-[#b9aa90]">
          The MVP room service supports creation, joining, ready state, host start, and reactions. Local dev uses
          the API routes; Cloudflare production can move the same contract to Durable Objects.
        </p>
      </div>
      <RoomConsole />
    </section>
  );
}
