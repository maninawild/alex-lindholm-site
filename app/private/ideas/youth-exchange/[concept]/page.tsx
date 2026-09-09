import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PrivatePageShell } from "@/components/private/private-page-shell";

export const metadata: Metadata = {
  title: "Youth Exchange Concept",
  description: "Unlisted youth exchange development concept.",
  robots: { index: false, follow: false, noarchive: true, nosnippet: true, noimageindex: true },
};

const reservedConcepts = new Set(["concept-02", "concept-03", "concept-04"]);

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-electric underline decoration-electric/30 underline-offset-4 hover:decoration-electric">{children}</a>;
}

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-ink/10 py-10 sm:py-12">
      <div className="grid gap-6 lg:grid-cols-[11rem_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">{number}</p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-[-0.03em] text-ink">{title}</h2>
        </div>
        <div className="max-w-3xl space-y-5 text-base leading-8 text-graphite/76">{children}</div>
      </div>
    </section>
  );
}

function ReservedConcept({ concept }: { concept: string }) {
  const number = concept.slice(-2);
  return (
    <PrivatePageShell>
      <main className="bg-paper">
        <section className="bg-[#10131a] text-white">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
            <Link href="/private/ideas/youth-exchange" className="text-xs font-semibold uppercase tracking-[0.16em] text-white/52 hover:text-white">← Youth Exchange Ideas</Link>
            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-[#d9a6af]">Concept {number}</p>
            <h1 className="mt-4 font-serif text-5xl font-medium tracking-[-0.045em] sm:text-7xl">Youth Exchange Concept {number}</h1>
            <p className="mt-6 text-lg text-white/58">Content pending.</p>
          </div>
        </section>
      </main>
    </PrivatePageShell>
  );
}

export default async function YouthExchangeConceptPage({ params }: { params: Promise<{ concept: string }> }) {
  const { concept } = await params;
  if (reservedConcepts.has(concept)) return <ReservedConcept concept={concept} />;
  if (concept !== "roots-what-we-carry") notFound();

  return (
    <PrivatePageShell>
      <main className="bg-paper">
        <section className="border-b border-white/10 bg-[#10131a] text-white">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
            <Link href="/private/ideas/youth-exchange" className="text-xs font-semibold uppercase tracking-[0.16em] text-white/52 transition hover:text-white">← Youth Exchange Ideas</Link>
            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-[#d9a6af]">Youth Exchange Concept 01</p>
            <h1 className="mt-4 max-w-5xl font-serif text-5xl font-medium leading-[0.98] tracking-[-0.045em] text-balance sm:text-7xl">ROOTS: WHAT WE CARRY</h1>
            <h2 className="mt-6 max-w-4xl text-xl font-medium leading-8 text-white/72 sm:text-2xl">From Inherited Memory to Shared Action Against Hate</h2>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Section number="1" title="Project concept">
            <p>ROOTS: WHAT WE CARRY is a seven-day Erasmus+ Youth Exchange bringing together Jewish and non-Jewish young people to explore how family history, migration, collective memory and personal identity influence their encounters with antisemitism, prejudice and social polarisation.</p>
            <p>Antisemitism remains the project’s central and clearly defined issue. Participants will also examine its connections with broader mechanisms of hate, without equating different experiences or turning Jewish participants into educators responsible for explaining antisemitism.</p>
          </Section>

          <Section number="2" title="Problem and evidence">
            <p>Antisemitism increasingly affects whether young Jewish Europeans feel safe expressing their identity. FRA’s latest EU survey found that:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>96% encountered antisemitism during the previous year;</li>
              <li>90% encountered it online;</li>
              <li>37% experienced antisemitic harassment;</li>
              <li>76% hide their Jewish identity at least occasionally;</li>
              <li>75% feel blamed for actions of the Israeli government.</li>
            </ul>
            <p>Several Jewish organisations reported increases of more than 400% after October 2023. In the Netherlands, police-recorded cases increased from 549 in 2022 to 880 in 2023, while reported incidents monitored by CIDI rose from 155 to 379. Germany recorded more than 6,000 antisemitic offences in 2024—a 21% increase from 2023. <ExternalLink href="https://fra.europa.eu/en/news/2024/jews-europe-still-face-high-levels-antisemitism">FRA survey</ExternalLink>, <ExternalLink href="https://commission.europa.eu/document/download/dc092fcd-9bb8-4290-b644-a838501e9aa0_en?filename=National%2BStrategy%2Bto%2BCombat%2BAntisemitism%2B2024-2030.pdf">Dutch national strategy</ExternalLink>, <ExternalLink href="https://www.bundesregierung.de/breg-de/aktuelles/politisch-motivierte-kriminalitaet-2024-entwicklung-2348762">German government</ExternalLink></p>
          </Section>

          <Section number="3" title="Target group">
            <p>The project will involve 30 participants aged 18–30: 10 from the Netherlands, 10 from Germany and 10 from Israel, with equal representation of Jewish and non-Jewish participants across the full group.</p>
            <p>Priority will be given to young people facing cultural, social or economic barriers, including migrants, refugees, children of migrants, religious or ethnic minorities and young people struggling with belonging or adaptation in their country of residence. Disclosure of religious or ethnic identity will remain voluntary and confidential.</p>
          </Section>

          <Section number="4" title="Objectives and EU alignment">
            <p>The project will:</p>
            <ol className="list-decimal space-y-2 pl-5">
              <li>strengthen participants’ ability to recognise antisemitism, stereotyping, online hate and the escalation from prejudice to exclusion;</li>
              <li>develop practical dialogue, media-literacy and bystander-intervention skills;</li>
              <li>enable young people to transform personal and inherited histories into peer-led local actions against hate.</li>
            </ol>
            <p>The objectives directly support KA152 priorities: intercultural dialogue, breaking stereotypes, European values, inclusion and democratic participation. They also align with European Youth Goals #3 “Inclusive Societies”, #4 “Information and Constructive Dialogue” and #9 “Space and Participation for All”, as well as the EU Strategy on Combating Antisemitism 2021–2030, which explicitly supports Erasmus+ activities combining civic education, youth participation and action against intolerance. <ExternalLink href="https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/combatting-discrimination/racism-and-xenophobia/combating-antisemitism/eu-strategy-combating-antisemitism-and-fostering-jewish-life-2021-2030_en">EU Strategy</ExternalLink></p>
          </Section>

          <Section number="5" title="Proposed consortium">
            <p>The consortium consists of:</p>
            <ul className="list-disc space-y-2 pl-5"><li>Youth Line Netherlands;</li><li>JuBuK, Germany;</li><li>Hillel Israel.</li></ul>
            <p>Youth Line’s public network and project footprint spans the Netherlands, Portugal, Latvia, Germany and Greece. JuBuK reports more than 100 national and international projects since 2008, with strong experience in migrant youth, minorities, interreligious dialogue, inclusion and non-formal education.</p>
            <p>Hillel Israel operates seven centres across Israel, engages more than 20,000 students and has tripled its student outreach over the past decade. Its experience in Jewish pluralism, identity and student engagement makes it a strong partner for participant recruitment, content development and peer-led exploration of contemporary Jewish life. <ExternalLink href="https://youth-line.org/our-story/">Youth Line</ExternalLink>, <ExternalLink href="https://jubuk.wordpress.com/jubuk/">JuBuK</ExternalLink>, <ExternalLink href="https://www.hillel.org/israel/">Hillel Israel</ExternalLink></p>
          </Section>

          <Section number="6" title="Activity flow">
            <p>Before the exchange, national groups will collect personal stories, family objects, photographs, local memories and examples of hate or solidarity from their communities.</p>
            <p>The seven-day exchange will combine:</p>
            <ul className="list-disc space-y-2 pl-5"><li>identity and trust-building;</li><li>personal and family storytelling;</li><li>mapping stereotypes and inherited narratives;</li><li>exploration of the host location’s Jewish history;</li><li>analysis of online hate and misinformation;</li><li>role-play and bystander-response simulations;</li><li>dialogue with Jewish-community representatives;</li><li>participant-designed local actions.</li></ul>
            <p>Follow-up will take place through workshops, story circles or campaigns led by participants in their own communities.</p>
          </Section>

          <Section number="7" title="Youth participation and learning">
            <p>Participants will not receive a ready-made adult training programme. Each national group will contribute cases, stories and activities during preparation. Participants will facilitate peer sessions, document their learning through Youthpass and co-design the follow-up.</p>
            <p>A central method will be “history carried by people”: participants explore how family migration, religion, silence, trauma, privilege and local history shape their present identities and reactions to others.</p>
          </Section>

          <Section number="8" title="European added value">
            <p>Antisemitism and hate operate across borders, while their language, historical roots and public expression differ between countries. Comparing these realities allows participants to recognise shared patterns without erasing national or personal differences.</p>
            <p>Israel adds a valuable Jewish-life and identity perspective, while the Dutch and German groups connect historical memory with contemporary European experiences of migration, minority identity, belonging and citizenship.</p>
          </Section>

          <Section number="9" title="Format and location">
            <p>Proposed action: KA152 Youth Exchange.</p>
            <p>The exchange will involve 36 young people from three countries, 12 participants per country, one group leader from each country and two facilitators. The programme will include seven activity days, excluding travel days.</p>
            <p>The exchange will take place in the Netherlands, Germany or another country represented by an eligible participating organisation. The venue will be selected by comparing accommodation, travel, accessibility, safeguarding conditions and applicable Erasmus+ unit rates.</p>
            <p>Israel is an eligible Region 3 neighbouring partner country under the 2026 Erasmus+ rules and can participate in a KA152 Youth Exchange with organisations from Programme countries.</p>
          </Section>

          <Section number="10" title="Partner roles and safety">
            <p>Youth Line Netherlands will coordinate mobility design and recruitment in the Netherlands. JuBuK will lead intercultural learning, minority inclusion and Erasmus+ quality management. Hillel Israel will recruit the Israeli group and contribute expertise in Jewish identity, pluralism and contemporary Jewish life. All three partners will lead national preparation and follow-up.</p>
            <p>Because participants will discuss identity, family history, Israel, antisemitism and other forms of hate, the project requires trained facilitators, a safeguarding protocol, confidential reporting, rules against identity-based attacks and a clear distinction between criticism of governments and blaming people for government actions.</p>
          </Section>
        </div>
      </main>
    </PrivatePageShell>
  );
}
