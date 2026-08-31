import Link from "next/link";
import { PrivatePageShell } from "./private-page-shell";

const naomieFramework = [
  {
    key: "N",
    title: "Needs",
    description:
      "Identifying the target group's requirements, interests, problems and context.",
  },
  {
    key: "A",
    title: "Aims",
    description: "The overarching purpose of the project.",
  },
  {
    key: "O",
    title: "Outcomes",
    description:
      "Concrete intended changes in learning, behavior, attitudes, participation or other relevant outcomes.",
  },
  {
    key: "M",
    title: "Methods",
    description: "Activities, formats and methods selected to achieve the aims.",
  },
  {
    key: "I",
    title: "Implementation",
    description: "Resources, logistics, timeline, participants and delivery.",
  },
  {
    key: "E",
    title: "Evaluation",
    description:
      "How results, participant feedback and future improvements will be assessed.",
  },
] as const;

export function PrivateIdeaPage({ title }: { title: string }) {
  return (
    <PrivatePageShell>
      <main className="bg-paper">
        <section className="border-b border-white/10 bg-[#10131a] text-white">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
            <Link
              href="/private#development-ideas"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-white/52 transition hover:text-white"
            >
              ← New Development Ideas
            </Link>
            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-[#d9a6af]">
              Private Development Concept
            </p>
            <h1 className="mt-4 max-w-4xl font-serif text-5xl font-medium leading-[0.98] tracking-[-0.045em] text-balance sm:text-7xl">
              {title}
            </h1>
            <div className="mt-8 max-w-3xl border-l border-[#d9a6af]/45 pl-5 text-sm leading-6 text-white/66">
              <p className="font-semibold text-white/88">Private concept by Alex Lindholm</p>
              <p className="mt-2">
                This material contains private development concepts and intellectual property shared for individual review only. Copying, forwarding, redistribution or reuse without permission is prohibited.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20" aria-labelledby="naomie-title">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col gap-3 border-b border-ink/12 pb-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">
                  Project framework
                </p>
                <h2 id="naomie-title" className="mt-3 font-serif text-4xl font-medium tracking-[-0.035em] sm:text-5xl">
                  NAOMIE
                </h2>
              </div>
              <p className="text-sm font-medium text-graphite/48">Structured for development</p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {naomieFramework.map((section, index) => (
                <article
                  key={section.key}
                  className="flex min-h-64 flex-col rounded-sm border border-ink/10 bg-white p-6 shadow-quiet sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl font-medium text-copper" aria-hidden="true">
                      {section.key}
                    </span>
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-graphite/36">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-8 text-xl font-semibold tracking-[-0.02em] text-ink">
                    {section.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-graphite/62">
                    {section.description}
                  </p>
                  <div aria-hidden="true" className="mt-auto border-b border-dashed border-ink/16 pt-8" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 bg-white py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-5 text-sm leading-6 text-graphite/62 sm:px-8">
            <p className="font-semibold text-ink">Private concept by Alex Lindholm</p>
            <p className="mt-1">© 2026 Alex Lindholm. All rights reserved.</p>
            <p className="mt-4 max-w-4xl">
              This material contains private development concepts and intellectual property shared for individual review only. Copying, forwarding, redistribution or reuse without permission is prohibited.
            </p>
          </div>
        </section>
      </main>
    </PrivatePageShell>
  );
}
