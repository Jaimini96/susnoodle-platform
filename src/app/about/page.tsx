import type { Metadata } from "next";
import { Shield, Sparkles, Workflow } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Why SusNoodle exists and how the platform treats traditional Indian games with care."
};

export default function AboutPage() {
  return (
    <section className="page-shell py-12">
      <div className="max-w-3xl">
        <p className="eyebrow mb-3">About</p>
        <h1 className="display text-4xl font-black text-[#fff2d8] sm:text-5xl">
          A premium home for games people already love.
        </h1>
        <p className="mt-5 text-lg leading-8 text-[#b9aa90]">
          SusNoodle is built around respect for regional variation. Rules are labeled, mechanics are testable,
          and future game additions follow the same module contract instead of starting from scratch.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          {
            icon: Shield,
            title: "No Betting",
            body: "The launch product avoids real-money gaming, casino UX, and fake urgency."
          },
          {
            icon: Workflow,
            title: "Extensible",
            body: "Metadata, rules, tutorials, and engines are separated so new games are straightforward."
          },
          {
            icon: Sparkles,
            title: "Handcrafted Feel",
            body: "Previews are mechanic-driven pieces, not stock icons or generic culture collage."
          }
        ].map((item) => (
          <article key={item.title} className="glass rounded-lg p-6">
            <item.icon color="var(--gold)" aria-hidden="true" />
            <h2 className="mt-5 text-xl font-black">{item.title}</h2>
            <p className="mt-3 leading-7 text-[#b9aa90]">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
