import Image from "next/image";
import Link from "next/link";
import { PrivatePageShell } from "./private-page-shell";

const modules = [
  { title: "Research & Match", focus: "Connect ideas with real community needs. Review existing tools, resources and initiatives to avoid duplication. Speak with intended users, match skills with challenges and establish roles, availability and a community contact for feedback.", result: "A project brief, existing-solutions map, initial user feedback, a measurable objective and a team working agreement.", materials: "Idea sharing, community interviews and stakeholder mapping. Google Docs / Sheets templates and a shared Miro workspace. Between sessions: validate the brief with community representatives." },
  { title: "Design & Build", focus: "Develop the first useful version. Workshops are selected around the cohort: creative responses to hate narratives, verified reference libraries, memes and infographics, user testing, the killer feature, prototyping and responsible AI workflows.", result: "A tested prototype or sample toolkit, core user journey, feedback log and a focused scope for the first usable version.", materials: "Prototype reviews, narrative-response exercises and AI context and validation practice. Decide what AI can handle, what needs review and what requires human judgement. Miro, Google materials and relevant prototyping tools. Between sessions: test and improve the core user journey." },
  { title: "Pilot & Partnerships", focus: "Prepare a community pilot and a convincing demo. Identify minimum resources, including money, AI tokens, people and users. Clarify ownership, maintenance, responsibilities and liability, and plan exposure through Jewish communities and partner organisations.", result: "A demo deck, pilot proposal, resource and partner shortlist, outreach materials, and a 90-day action plan with a reusable project handover pack.", materials: "Partner mapping, resource planning, funding research and demo rehearsal. Google Docs / Sheets / Slides templates. Between sessions: review assumptions with a potential pilot partner and prepare the handover materials." },
];
const session = [["20 min", "Guest & relevant case"], ["40 min", "Practical workshop"], ["40 min", "Guided project work"], ["20 min", "Q&A & next steps"]];
const wrap = "mx-auto max-w-6xl px-6 sm:px-12 lg:px-16";

export function BuildWhatHateCantPage() {
  return <PrivatePageShell>
    <main className="bg-[#171921] font-sans text-[#EEF2F6]">
      <section className={`${wrap} pb-16 pt-8 sm:pb-20`}>
        <div className="flex flex-wrap items-center justify-between gap-5 border-b border-[#3A3D48] pb-6 text-sm text-[#C5C9D5]">
          <Link href="/private#development-ideas" className="hover:text-white">← New Development Ideas</Link>
          <span>Private & Confidential · Programme proposal</span>
        </div>
        <a href="https://www.inspirexchange.nl/" target="_blank" rel="noopener noreferrer" className="mt-12 inline-block"><Image src="/logos/inspirexchange-wordmark-dark.svg" alt="InspireXchange" width={232} height={29} priority /></a>
        <p className="mt-10 text-xs font-medium uppercase tracking-[0.16em] text-[#FF6F61]">Build What Hate Can’t / Online accelerator track</p>
        <h1 className="mt-5 max-w-4xl text-balance text-4xl font-normal leading-[1.08] tracking-[-0.04em] text-[#EEF2F6] sm:text-6xl">From community challenges to working solutions with a future.</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-[#C5C9D5] sm:text-xl">Bring an idea, a community challenge or your skills. Work with others to research, build and test a practical response to antisemitism and hate.</p>
        <a href="#programme" className="mt-8 inline-flex min-h-12 items-center rounded-lg bg-[#FF6F61] px-6 py-3 font-medium text-[#171921] hover:bg-[#EEF2F6]">Explore the programme ↓</a>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#3A3D48] pt-6 text-sm text-[#C5C9D5]"><span>Weekly · 2 hours online</span><span>3 connected modules</span><span>Closing event · Live demos</span></div>
      </section>
      <section className="bg-[#EEF2F6] py-14 text-[#424449] sm:py-16">
        <div className={`${wrap} grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(14rem,1fr)]`}>
          <div className="space-y-6 text-base leading-8 text-[#424449]">
                <p>Designed for builders and non-builders working together, this programme applies startup practices to real challenges facing Jewish communities: problem definition, creative experimentation, user validation, focused development and viable partnerships. It is intended for projects and startup practitioners countering antisemitism and hate locally and online. Our goal is to equip builders with the tools and approaches that make their work more effective and build repeatable, scalable projects.</p>
                <blockquote className="border-l-2 border-[#FF6F61] pl-5 text-2xl leading-9 tracking-[-0.02em] text-[#424449] sm:text-3xl sm:leading-10">
                  <p>Inspired by <a href="https://voices.sefaria.org/sheets/246875" target="_blank" rel="noopener noreferrer" className="font-medium underline decoration-[#FF6F61]/60 underline-offset-4 hover:decoration-[#FF6F61]">Olam Chesed Yibaneh</a>, “the world is built with kindness,” we bring that principle into practice: building this world from love through useful, collaborative action.</p>
                  <a href="https://voices.sefaria.org/sheets/246875" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex text-sm font-sans font-medium text-[#424449] underline decoration-[#FF6F61]/60 underline-offset-4 hover:decoration-[#FF6F61]">Voices on Sefaria ↗</a>
                </blockquote>
                <p>Our aim is to help each initiative become a tested solution with a clear path to adoption, growth, partnerships and potential funding. Reusable materials, documented learning and partner handovers allow projects to continue through future seminars and hackathons, reducing the risk of abandonment after the closing event.</p>

          </div>
              <aside className="self-start border-l border-[#CDD1DC] pl-5 text-sm italic leading-6 text-[#555969]">
                <p><a href="https://www.cidi.nl/antisemitisme/antisemitisme-monitors/" target="_blank" rel="noopener noreferrer" className="font-semibold not-italic text-[#424449] hover:text-electric">CIDI monitor ↗</a></p>
                <p className="mt-3">Antisemitic incidents in the Netherlands reached 281 in 2025, and 421 in 2024, against an average of 138 across 2012 to 2022. Around 15% of registered discrimination incidents in police data are online. Most online hate incidents are not officially registered.</p>
                <p className="mt-3">Despite the lower number reported in 2025, <a href="https://www.cidi.nl/persbericht-cidi-monitor-antisemitische-incidenten-2025-antisemitisme-nog-altijd-hoog-toenemende-meldingsmoeheid/" target="_blank" rel="noopener noreferrer" className="font-semibold not-italic text-[#424449] hover:text-electric">CIDI ↗</a> warns of growing reluctance of victims to report incidents. The lower recorded total should not be treated as evidence that the problem has been resolved.</p>
              </aside>
        </div>
      </section>
      <section id="programme" className="scroll-mt-8 bg-[#EEF2F6] pb-14 text-[#424449] sm:pb-16">
        <div className={wrap}>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#555969]">The programme</p>
          <h2 className="mt-3 text-3xl font-normal leading-tight tracking-tight text-[#424449] sm:text-4xl">A clear path from an idea to a pilot.</h2>
          <p className="mt-5 max-w-3xl leading-7 text-[#424449]">Between the opening and closing events, teams work through three connected modules. Research establishes the project directions; Design & Build adapts to the participants; Pilot & Partnerships prepares teams for adoption and continued use.</p>
          <div className="mt-9">
            {modules.map((module, index) => <article key={module.title} className="grid gap-4 border-t border-[#CDD1DC] py-8 sm:grid-cols-[3rem_1fr] sm:gap-6">
              <span className="text-2xl text-[#555969]">0{index + 1}</span>
              <div>
                <h3 className="text-2xl font-medium text-[#424449]">{module.title}</h3>
                <div className="mt-5 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
                  <p className="leading-7 text-[#424449]">{module.focus}</p>
                  <div className="rounded-xl bg-[#E2E6F5] p-5 text-[#424449]"><p className="font-medium">You leave with</p><p className="mt-2 leading-7">{module.result}</p></div>
                </div>
                <details className="mt-5 text-[#424449]"><summary className="cursor-pointer py-2 text-sm font-medium underline underline-offset-4">Activities & materials</summary><p className="mt-3 max-w-3xl leading-7">{module.materials}</p></details>
              </div>
            </article>)}
          </div>
          <p className="text-sm leading-6 text-[#555969]">Module lengths and the schedule are agreed with organisers. Design & Build content is adapted after the research module.</p>
        </div>
      </section>
      <section className="bg-[#171921] py-14 text-[#EEF2F6] sm:py-16"><div className={wrap}>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#FF6F61]">How we work</p>
        <h2 className="mt-3 text-3xl font-normal tracking-tight text-[#EEF2F6] sm:text-4xl">Two hours. Your project moves forward.</h2>
        <div className="mt-9 grid grid-cols-2 gap-6 lg:grid-cols-4">{session.map(([time, title]) => <div key={title} className="border-t-2 border-[#FF6F61] pt-4"><p className="text-3xl text-[#EEF2F6]">{time}</p><p className="mt-3 leading-6 text-[#C5C9D5]">{title}</p></div>)}</div>
        <p className="mt-7 text-sm leading-6 text-[#C5C9D5]">Shared templates and workspaces throughout. A defined task between sessions. Guest contributions are selected to support the projects taking shape.</p>
      </div></section>
      <section className="bg-[#EEF2F6] py-14 text-[#424449] sm:py-16"><div className={`${wrap} grid gap-10 lg:grid-cols-2`}>
        <div><p className="text-xs font-medium uppercase tracking-[0.16em] text-[#555969]">At the closing event</p><h2 className="mt-3 text-3xl font-normal text-[#424449] sm:text-4xl">IX Product Clinic</h2><p className="mt-6 leading-8">A focused 15–20-minute review per team with Alex Lindholm / InspireXchange, building on the work completed online. We review user value, the killer feature, validation evidence, pilot readiness and the resources needed for continued operation and growth.</p></div>
        <div><h3 className="text-2xl font-medium text-[#424449]">A practical next-step action sheet.</h3><ul className="mt-5 list-disc space-y-4 pl-5 leading-7"><li>A review scorecard and three priority actions.</li><li>Suggested Jewish communities and partner organisations for prototype testing, pilot use and network exposure, with a proposal for how each could participate.</li><li>A brief research-based shortlist of potential funding partners, with fit rationale and suggested outreach steps.</li><li>Ownership, maintenance and documentation, including reuse in subsequent seminars and hackathons.</li></ul><p className="mt-5 text-sm leading-6 text-[#555969]">Team demo, structured discussion and a shared Google Docs action sheet. Partner and funding research follows the session; introductions depend on relevance and partner interest.</p></div>
      </div></section>
      <section className="bg-[#171921] py-14 text-[#EEF2F6] sm:py-16"><div className={wrap}>
        <div className="grid gap-10 lg:grid-cols-2"><div><p className="text-xs font-medium uppercase tracking-[0.16em] text-[#FF6F61]">Built for continuity</p><h2 className="mt-3 text-3xl font-normal tracking-tight text-[#EEF2F6] sm:text-4xl">The work continues after the final demo.</h2></div><p className="leading-8 text-[#C5C9D5]">Each team works towards a tested solution, evidence of user need, a pilot proposal and an identified owner for the next stage. Reusable materials and documented learning support further development through future seminars and hackathons.</p></div>
        <div className="mt-12 border-t border-[#3A3D48] pt-10"><h2 className="text-2xl font-medium text-[#EEF2F6]">Additional bonuses for participants</h2><div className="mt-7 grid gap-8 sm:grid-cols-2"><div><p className="text-4xl text-[#FF6F61]">1 hour</p><p className="mt-3 leading-7 text-[#C5C9D5]">Free consultation for each hackathon participant with the InspireXchange team, worth €150.</p></div><div><p className="text-4xl text-[#FF6F61]">€5,000</p><p className="mt-3 leading-7 text-[#C5C9D5]">The chance to win an educational grant covering six months of the acceleration programme.</p></div></div><a href="https://www.inspirexchange.nl/" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-sm text-[#EEF2F6] underline decoration-[#FF6F61] underline-offset-4">InspireXchange.nl ↗</a></div>
        <div className="mt-12 border-t border-[#3A3D48] pt-8"><h2 className="text-2xl font-medium text-[#EEF2F6]">Discuss the programme</h2><p className="mt-3 text-[#C5C9D5]">Scope, cohort size and delivery agreed with the organisers.</p><a href="https://wa.me/message/4OIGQ3FHUZQSD1" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center rounded-lg bg-[#FF6F61] px-6 py-3 font-medium text-[#171921] hover:bg-[#EEF2F6]">Request more details ↗</a></div>
        <footer className="mt-12 space-y-5 border-t border-[#3A3D48] pt-7 text-sm leading-6 text-[#C5C9D5]"><p>Build What Hate Can’t is organised by Israel’s Ministry of Foreign Affairs through the Embassy in The Hague and Israeli Techies NL. This online accelerator track is proposed by InspireXchange, with final scope and delivery agreed with the organisers.</p><p>© InspireXchange. All programme ideas and materials are protected by copyright.</p><p>Private & Confidential. Access is personal and non-transferable; no copying, forwarding, publication or redistribution without prior written permission.</p></footer>
      </div></section>
    </main>
  </PrivatePageShell>;
}
