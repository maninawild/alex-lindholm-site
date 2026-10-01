import Link from "next/link";
import type { ReactNode } from "react";
import { PrivatePageShell } from "./private-page-shell";

const whatsappUrl = "https://wa.me/message/4OIGQ3FHUZQSD1";

const deliveries = [
  ["Seven 40-minute online workshops", "problem definition, creative responses, user testing, the core product feature, responsible AI use, viable partnerships and preparation for a pilot."],
  ["Practical materials", "templates, shared workspaces, examples and documented workflows that communities can reuse."],
  ["Product Clinic and follow-up reviews", "identify priority improvements and prepare selected projects for adoption."],
  ["A project action sheet", "pilot plan, ownership, minimum resources, responsibilities and a brief shortlist of potential funding partners."],
  ["Community exposure and continuity", "identify suitable Jewish communities and partner organisations for testing, distribution and further development through subsequent seminars or hackathons."],
] as const;

export function CommunityImpactTrackPage() {
  return (
    <PrivatePageShell>
      <main className="bg-paper">
        <section className="border-b border-white/10 bg-[#10131a] text-white">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
            <Link href="/private#development-ideas" className="text-xs font-semibold uppercase tracking-[0.16em] text-white/52 transition hover:text-white">← New Development Ideas</Link>
            <p className="mt-8 inline-flex border border-white/20 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/72">Private space · All rights reserved</p>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-electric">Private Funding Proposal</p>
            <h1 className="mt-4 max-w-5xl font-serif text-5xl font-medium leading-[0.98] tracking-[-0.045em] text-balance sm:text-7xl">Community Impact Track 2027 Proposal</h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-white/72">A funding proposal from InspireXchange to a partner organisation (FOUNDATION X)</p>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="max-w-3xl space-y-12 text-base leading-8 text-graphite/76 sm:text-lg">
              <ProposalSection title="Purpose">
                Help Jewish communities and activists turn real challenges into practical tools, educational resources and sustainable initiatives locally. The proposed track brings technical volunteers, activists, educators and community organisations together, applying startup methods to validate needs, build focused solutions and establish partnerships for continued use.
              </ProposalSection>
              <ProposalSection title="Context and independence">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-electric hover:underline">Request by messaging us. ↗</a>
                <p className="mt-5 font-semibold text-ink">We are seeking a Partnership funding for a dedicated InspireXchange Community Impact Track in 2027.</p>
                <p className="mt-5">This proposal concerns our own delivery and project support. Any connection to the organisers’ programme would be discussed with them separately.</p>
              </ProposalSection>
              <ProposalSection title="Proposed pilot">
                <p>An initial cohort of <strong className="font-semibold text-ink">3–5 initiatives</strong>, each addressing a specific need identified with a Jewish community or partner organisation. Potential projects include educational toolkits addressing antisemitic narratives, verified reference libraries and databases, interactive learning materials and tools for community engagement as well as educators support.</p>
                <p className="mt-5">Builders and non-builders work together, combining technical skills with community knowledge and practice. Each project begins with an intended user group and an organisation willing to help validate and pilot the solution.</p>
              </ProposalSection>
            </div>

            <section className="mt-14 border-y border-ink/10 bg-bone py-10 sm:mt-20 sm:py-14" aria-labelledby="deliver-title">
              <div className="max-w-4xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-electric">Programme</p>
                <h2 id="deliver-title" className="mt-3 font-serif text-4xl font-medium tracking-[-0.035em] text-ink sm:text-5xl">What InspireXchange delivers</h2>
                <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
                  {deliveries.map(([title, description]) => (
                    <div key={title} className="grid gap-2 py-5 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-8">
                      <h3 className="font-semibold text-ink">{title}</h3>
                      <p className="leading-7 text-graphite/76">{description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="mt-14 max-w-3xl space-y-12 text-base leading-8 text-graphite/76 sm:mt-20 sm:text-lg">
              <ProposalSection title="Outcomes and measurement">
                <p>We propose tracking projects validated with users, prototypes completed, community pilots launched, partner commitments and continued use three and six months after delivery. Each selected project leaves with a documented handover, a responsible owner and a realistic next-step plan.</p>
                <p className="mt-5">The aim is to reduce project abandonment after events and build a repeatable process for developing useful community initiatives.</p>
              </ProposalSection>
              <ProposalSection title="Proposed role for Partner">
                <p>We invite Nadav Foundation to fund the pilot’s programme design, workshop delivery, mentoring, partner research and follow-up evaluation. Nadav could also help shape the thematic priorities and identify relevant community partners.</p>
                <p className="mt-5">InspireXchange would manage delivery and report on agreed milestones. Scope, budget and partner responsibilities would be defined together before launch.</p>
              </ProposalSection>
              <ProposalSection title="Next step">
                A short discussion to assess alignment with Nadav’s 2027 priorities, followed by a costed pilot proposal.
              </ProposalSection>
            </div>

            <div className="mt-14 max-w-3xl border-l-2 border-electric bg-bone px-5 py-6 sm:mt-20">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-electric">Concept</p>
              <Link href="/private/ideas/build-what-hate-cant" className="mt-3 inline-flex font-serif text-2xl font-medium tracking-[-0.02em] text-ink hover:text-electric">InspireXchange Workshops Track for “Build What Hate Can’t” Hackathon →</Link>
            </div>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-electric px-5 text-sm font-semibold text-white transition hover:bg-ink">Message Alex <span className="ml-2" aria-hidden="true">→</span></a>
          </div>
        </section>
      </main>
    </PrivatePageShell>
  );
}

function ProposalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-electric">{title}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}
