import Link from "next/link";
import { PrivatePageShell } from "./private-page-shell";

const concepts = [
  { number: "01", title: "ROOTS: WHAT WE CARRY", subtitle: "From Inherited Memory to Shared Action Against Hate", href: "/private/ideas/youth-exchange/roots-what-we-carry", ready: true },
  { number: "02", title: "BUILD WITHOUT BARRIERS", subtitle: "The Vibe Coding Youth Exchange", href: "/private/ideas/youth-exchange/build-without-barriers", ready: true },
  { number: "03", title: "MOSAIC: ROOTS IN MOTION", subtitle: "From Migration Stories to Local Action", href: "/private/ideas/youth-exchange/mosaic-roots-in-motion", ready: true },
  { number: "04", title: "BEYOND THE COMMENTS", subtitle: "Young Creators Turning Online Hate into Real-World Dialogue", href: "/private/ideas/youth-exchange/beyond-the-comments", ready: true },
] as const;

export function YouthExchangeIdeasHub() {
  return (
    <PrivatePageShell>
      <main className="bg-paper">
        <section className="border-b border-white/10 bg-[#10131a] text-white">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
            <Link href="/private#development-ideas" className="text-xs font-semibold uppercase tracking-[0.16em] text-white/52 transition hover:text-white">← New Development Ideas</Link>
            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-[#d9a6af]">Private Development Concept</p>
            <h1 className="mt-4 max-w-4xl font-serif text-5xl font-medium leading-[0.98] tracking-[-0.045em] text-balance sm:text-7xl">Youth Exchange Ideas</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/66">Four concepts developed as separate youth-exchange proposals using one shared project structure.</p>
          </div>
        </section>
        <section className="py-14 sm:py-20"><div className="mx-auto max-w-7xl px-5 sm:px-8"><div className="grid gap-4 md:grid-cols-2">
          {concepts.map((concept) => <Link key={concept.number} href={concept.href} className={`group flex min-h-64 flex-col justify-between rounded-sm border border-ink/10 p-7 transition hover:-translate-y-0.5 hover:border-copper/45 ${concept.ready ? "bg-white shadow-quiet" : "bg-white/60"}`}><span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-graphite/36">{concept.number}</span><span><span className={`block font-serif text-3xl font-medium leading-tight tracking-[-0.03em] ${concept.ready ? "text-ink" : "text-ink/50"}`}>{concept.title}</span><span className={`mt-3 block text-sm leading-6 ${concept.ready ? "text-graphite/62" : "text-graphite/42"}`}>{concept.subtitle}</span></span><span className={`text-sm font-semibold ${concept.ready ? "text-copper" : "text-graphite/42"}`}>{concept.ready ? "Open concept →" : "Reserved →"}</span></Link>)}
        </div></div></section>
      </main>
    </PrivatePageShell>
  );
}
