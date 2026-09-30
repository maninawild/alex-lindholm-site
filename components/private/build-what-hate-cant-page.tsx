import Image from "next/image";
import Link from "next/link";
import { PrivatePageShell } from "./private-page-shell";

const workshops = [
  ["1. From Concern to Build Brief", "Define the problem, audience, community needs and desired outcome that can be measured. Align with the host organisation / prototyping partner and establish team roles, decisions and feedback processes.", "Problem brief, stakeholder map and team working agreement (hours, dedication, areas of responsibility).\n\nExample: a brief for a Jewish community education tool.", "Presentation + guided Google Docs templates.\n\nHomework: validate the brief with the organisation and community representatives."],
  ["2. Creative Response Lab", "Avoid double work: explore responses and preventive actions and the base available against established antisemitic and hate narratives: memes, images, infographics, verified facts and reference libraries. Identify skills and partners for creation and distribution.", "Narrative-response canvas, content toolkit outline and skills/partner map.\n\nExample: a sourced infographic with supporting links. Opened databases available.", "Presentation + Miro workspace + sample toolkit in Google Slides.\n\nHomework: draft and test one response."],
  ["3. Test Before You Code", "Check whether a proposed solution is understandable, useful and relevant before development. Practise neutral interviews and prototype testing with intended users.", "Interview guide, five-user test plan and feedback tracker. Example: a clickable mockup or sample content.", "Presentation + practice + Google Docs/Sheets templates. Homework: run five tests and record findings."],
  ["4. Find Your Killer Feature", "Identify the single feature delivering the greatest benefit with the least user effort. Define the shortest journey to value and what to build first.", "Feature prioritisation canvas, core user journey and one-feature MVP specification with a success metric.\n\nExample: one guided flow replacing a confusing reporting process.", "Presentation + Miro workspace + MVP template in Google Docs. Homework: simplify and test the core journey (Miro sequence)"],
  ["5. Working with AI: Context, Trust & Validation", "Provide sufficient context and continuously validate AI outputs. Decide what to delegate, what to review and what requires human judgement in the flow you build. Address invented facts, unreliable references, bias and loss of context.", "Reusable context brief, task delegation matrix and validation checklist.\n\nExample: an AI-assisted response checked against an approved source library.", "Presentation + live exercise + Google Docs toolkit.\n\nHomework: document one AI-assisted workflow and its review steps."],
  ["6. Build a Viable Partnership", "Define the minimum partnerships and resources needed for a pilot (money, tokens, teams, users).\n\nClarify ownership, maintenance, responsibilities and liability. Explore potential support from Jewish communities, partner organisations and funders.", "Partnership canvas, minimum resource plan and responsibility/risk register.\n\nExample: a pilot agreement outline with a community organisation.", "Presentation + partner mapping in Miro + Google Docs/Sheets templates.\n\n Homework: review assumptions with a potential pilot partner."],
  ["7. Demo, Exposure & Product Continuity", "Turn the demo into a partnership opportunity.\n\nRequest a pilot in an organisation or community, plan exposure through relevant networks and prepare the product for continued use, potential funding and future programmes.", "Demo deck, one-page pilot proposal, partner outreach message and 90-day continuity plan.\n\nInclude a reusable project pack for subsequent seminars or hackathons.", "Presentation + rehearsal + Google Slides/Docs templates.\n\nHomework: finalise the demo, partner proposal and project handover materials."],
] as const;

const clinic = [
  ["Format", "A focused 15–20-minute review per team with Alex Lindholm / InspireXchange."],
  ["Focus", "User value, the killer feature, validation evidence, pilot readiness, viable partnerships and the resources needed for continued operation and growth."],
  ["Project action sheet", "A review scorecard, three priority actions and a practical next-step plan. Includes a brief research-based shortlist of potential funding partners, with fit rationale and suggested outreach steps."],
  ["Community exposure", "Suggested Jewish communities and partner organisations for prototype testing, pilot use and network exposure, with a clear proposal for how each could participate."],
  ["Continuity", "Recommendations for ownership, maintenance and documentation, including how the project can be reused or developed in subsequent seminars and hackathons."],
  ["Workspace", "Team demo + structured discussion + a shared Google Docs action sheet. Partner and funding research is added after the session; introductions depend on relevance and partner interest."],
] as const;

function Cell({ children }: { children: string }) {
  return <span className="whitespace-pre-line">{children}</span>;
}

export function BuildWhatHateCantPage() {
  return (
    <PrivatePageShell>
      <main className="bg-paper">
        <section className="border-b border-white/10 bg-[#10131a] text-white">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
            <Link href="/private#development-ideas" className="text-xs font-semibold uppercase tracking-[0.16em] text-white/52 transition hover:text-white">
              ← New Development Ideas
            </Link>
            <p className="mt-8 inline-flex border border-white/20 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/72">Private space · All rights reserved</p>
            <Image src="/logos/inspirexchange.jpg" alt="InspireXchange" width={900} height={900} priority className="mt-8 h-14 w-64 object-cover object-center" />
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-electric">Private Development Concept</p>
            <h1 className="mt-4 max-w-5xl font-serif text-5xl font-medium leading-[0.98] tracking-[-0.045em] text-balance sm:text-7xl">
              InspireXchange Workshops Track for “Build What Hate Can’t” Hackathon
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-white/72">From community challenges to working solutions with a future.</p>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="max-w-3xl space-y-6 text-base leading-8 text-graphite/76 sm:text-lg">
              <p>Designed for builders and non-builders working together, this programme applies startup practices to real challenges facing Jewish communities: problem definition, creative experimentation, user validation, focused development and viable partnerships. Our goal is to equip builders with the tools and approaches that maximise their work and help them to build the repetitive and scalable project.</p>
              <blockquote className="border-l-2 border-electric pl-5 font-serif text-2xl leading-9 tracking-[-0.02em] text-ink sm:text-3xl sm:leading-10">
                Inspired by <a href="https://voices.sefaria.org/sheets/246875" target="_blank" rel="noopener noreferrer" className="font-semibold text-electric underline decoration-electric/30 underline-offset-4 hover:decoration-electric">Olam Chesed Yibaneh</a>, “the world is built with kindness,” we bring that principle into practice: building this world from love through useful, collaborative action. <a href="https://voices.sefaria.org/sheets/246875" target="_blank" rel="noopener noreferrer" className="text-base font-sans font-medium text-electric underline decoration-electric/30 underline-offset-4 hover:decoration-electric">Voices on Sefaria ↗</a>
              </blockquote>
              <p>Our aim is to help each initiative become a tested solution with a clear path to adoption, growth, partnerships and potential funding. Reusable materials, documented learning and partner handovers allow projects to continue through future seminars and hackathons, reducing the risk of abandonment after the closing event.</p>
              <p>Seven online workshops, 40 minutes each: 10 minutes of introduction, 20 minutes of guided work and 10 minutes of feedback. Teams develop their own projects throughout the programme.</p>
            </div>

            <div className="mt-14 overflow-x-auto border border-ink/10">
              <table className="min-w-[44rem] w-full border-collapse text-left text-sm leading-6 text-graphite/76" aria-label="Workshop programme">
                <thead className="bg-ink text-white">
                  <tr>
                    <th scope="col" className="w-[25%] p-5 font-semibold">Workshop</th>
                    <th scope="col" className="p-5 font-semibold">Programme details</th>
                  </tr>
                </thead>
                <tbody>
                  {workshops.map(([workshop, focus, deliverables, format]) => (
                    <tr key={workshop} className="border-t border-ink/10 align-top even:bg-ink/[0.025]">
                      <th scope="row" className="p-5 font-semibold text-ink"><Cell>{workshop}</Cell></th>
                      <td className="space-y-5 p-5">
                        <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-electric">Focus</p><p className="mt-2"><Cell>{focus}</Cell></p></div>
                        <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-electric">Deliverables</p><p className="mt-2"><Cell>{deliverables}</Cell></p></div>
                        <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-electric">Format &amp; workspace</p><p className="mt-2"><Cell>{format}</Cell></p></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 bg-bone py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-electric">IX Product Clinic | In person at the closing event</p>
            <div className="mt-8 overflow-x-auto border border-ink/10 bg-white">
              <table className="min-w-[44rem] w-full border-collapse text-left text-sm leading-6 text-graphite/76">
                <thead className="bg-ink text-white">
                  <tr><th scope="col" className="w-[24%] p-5 font-semibold">Element</th><th scope="col" className="p-5 font-semibold">Description</th></tr>
                </thead>
                <tbody>
                  {clinic.map(([element, description]) => (
                    <tr key={element} className="border-t border-ink/10 align-top even:bg-ink/[0.025]">
                      <th scope="row" className="p-5 font-semibold text-ink">{element}</th>
                      <td className="p-5"><Cell>{description}</Cell></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <footer className="border-t border-ink/10 bg-white py-8">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 sm:px-8">
            <Image src="/logos/inspirexchange.jpg" alt="InspireXchange" width={900} height={900} className="h-14 w-64 object-cover object-center" />
            <p className="text-sm leading-6 text-graphite/62">© InspireXchange. All programme ideas and materials are protected by copyright.</p>
          </div>
        </footer>
      </main>
    </PrivatePageShell>
  );
}
