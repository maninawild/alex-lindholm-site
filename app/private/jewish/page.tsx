import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { PrivateAccessGate } from "@/components/private/private-access-gate";
import { PrivatePageShell } from "@/components/private/private-page-shell";
import { PrivateProjectCard } from "@/components/private/private-project-card";
import { getPrivatePageBySlug } from "@/lib/private-access/config";
import { getPrivateSession } from "@/lib/private-access/session";

export const dynamic = "force-dynamic";

const pageDefinition = getPrivatePageBySlug("jewish")!;

const timeline = [
  ["2012–2013", "Program Manager, Hillel St. Petersburg"],
  ["2013–2015", "Program Director, Hillel St. Petersburg"],
  ["2013–2015", "Curator, madrichim leadership school and recurring education programs"],
  ["2015–2016", "Chief Curator, Maximum Jewish Leadership Program"],
  ["2016–2017", "One Year Program in Jewish Studies, Paideia, Stockholm"],
  ["2017", "Educator programs at Yad Vashem and BCI / American Jewish University"],
  ["2018", "Internship program, ANU Museum of the Jewish People, Tel Aviv"],
  ["2019–2020", "Crisis management and development work, World Federation of Georgian Jewry"],
];

const credentials = [
  ["Paideia", "Civilization and Jewish Studies, Stockholm"],
  ["Yad Vashem", "Teaching the Holocaust course for educators, Jerusalem"],
  ["BCI / AJU", "Brandeis Collegiate Institute, Los Angeles"],
  ["ANU Museum", "Internship program, Tel Aviv"],
  ["Lehava", "Leadership program, St. Petersburg and Cleveland"],
  ["NRU HSE", "Project Management in the Social Sector"],
];

export default async function JewishPrivatePage() {
  await connection();
  const session = await getPrivateSession(pageDefinition.id);
  if (!session) return <PrivateAccessGate pageSlug={pageDefinition.slug} />;

  return (
    <PrivatePageShell>
      <header className="border-b border-ink/10 bg-[#10131a] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="text-sm font-bold tracking-[-0.01em]">Alex Lindholm</Link>
          <span className="rounded-full border border-white/15 px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-white/72">
            Private &amp; Confidential
          </span>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-[#10131a] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgba(143,63,77,0.35),transparent_36%),radial-gradient(circle_at_15%_90%,rgba(37,99,235,0.18),transparent_32%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.08fr_0.72fr] lg:items-end lg:py-28">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Selected record · 2012–present</p>
              <h1 className="mt-5 max-w-4xl font-serif text-5xl font-medium leading-[0.98] tracking-[-0.045em] text-balance sm:text-7xl">
                {pageDefinition.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/66 sm:text-xl">
                {pageDefinition.subtitle}
              </p>
              <div className="mt-9 max-w-2xl border-l border-white/20 pl-5 text-sm leading-6 text-white/58">
                Shared personally with you. Please do not copy, forward or redistribute this content without permission.
              </div>
            </div>
            <div className="relative min-h-[300px] overflow-hidden rounded-sm border border-white/10 bg-white/5 shadow-[0_28px_80px_rgba(0,0,0,0.28)] sm:min-h-[390px]">
              <Image
                src="/media/alex/alex-speaking-01.jpg"
                alt="Alex Lindholm speaking during a community session"
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover object-center opacity-90"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10131a]/55 via-transparent to-transparent" />
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.58fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">Context</p>
              <h2 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-[-0.035em] text-balance sm:text-5xl">Community work as an operating discipline.</h2>
            </div>
            <div className="space-y-6 text-base leading-8 text-graphite/76 sm:text-lg">
              <p>
                Alex’s Jewish community work began as hands-on program leadership: supporting young adults, developing educational formats, enabling participant-led initiatives, and moving projects from concept through delivery and reporting.
              </p>
              <p>
                The record spans Hillel St. Petersburg, international leadership and educator programs, cultural projects, institutional development work, original lectures, interviews, and writing about Jewish life across borders.
              </p>
              <p>
                The recurring theme is practical community infrastructure: creating formats where identity, learning, leadership, culture, and trusted relationships reinforce one another.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-ink/10 bg-bone py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.48fr_1fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">Experience</p>
                <h2 className="mt-4 font-serif text-4xl font-medium tracking-[-0.035em] sm:text-5xl">Selected timeline</h2>
              </div>
              <div className="border-t border-ink/12">
                {timeline.map(([year, role]) => (
                  <div key={`${year}-${role}`} className="grid gap-2 border-b border-ink/12 py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-graphite/45">{year}</p>
                    <p className="text-base font-medium leading-6 text-ink">{role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">Programs &amp; projects</p>
              <h2 className="mt-4 font-serif text-4xl font-medium tracking-[-0.035em] sm:text-5xl">Selected work, opened in context.</h2>
              <p className="mt-5 text-base leading-7 text-graphite/68">These expandable records are the foundation for richer project pages with approved descriptions and photography later.</p>
            </div>
            <div className="mt-10 border-b border-ink/12">
              <PrivateProjectCard eyebrow="Leadership" title="Maximum Jewish Leadership Program" summary="Chief curator role focused on youth leadership and project development, 2015–2016.">
                Program leadership built on earlier work with the madrichim school and recurring educational initiatives at Hillel St. Petersburg. Responsibilities recorded in the source materials include mentoring participants, helping ideas become workable programs, coordinating delivery, and supporting community engagement.
              </PrivateProjectCard>
              <PrivateProjectCard eyebrow="Community" title="Hillel St. Petersburg" summary="Five years across program management, program direction, education and participant-led initiatives.">
                From 2012 to 2016, Alex moved through program management, program direction, and leadership-program curation. The work covered event and program planning, community communications, stakeholder coordination, volunteer and participant support, and the development of educational and social projects.
              </PrivateProjectCard>
              <PrivateProjectCard eyebrow="Cross-border" title="ROOTS Youth Seminar" summary="Initiator and organiser of a youth seminar in Germany, 2016.">
                Listed among Alex’s initiated and organised projects, ROOTS brought the community-development practice into a cross-border setting. Additional program notes and photography can be added here once cleared for publication.
              </PrivateProjectCard>
              <PrivateProjectCard eyebrow="Culture" title="Festivals, camps and public formats" summary="A portfolio of youth, cultural and community projects developed between 2012 and 2015.">
                The documented portfolio includes Days of Jewish Culture at St. Petersburg State University, the Jewish Beauty Contest, Humour With No Limits Jewish stand-up competition, MEL Jewish Youth Camp, and the Shop of Israel at two international Christmas festivals in St. Petersburg.
              </PrivateProjectCard>
            </div>
          </div>
        </section>

        <section className="bg-[#151922] py-16 text-white sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.7fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Learning &amp; networks</p>
              <h2 className="mt-4 font-serif text-4xl font-medium tracking-[-0.035em] sm:text-5xl">International formation</h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-white/58">Study and educator programs connecting Jewish civilization, Holocaust education, leadership, museum practice and community development.</p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-sm bg-white/10 sm:grid-cols-2">
              {credentials.map(([name, detail]) => (
                <div key={name} className="bg-[#151922] p-6 sm:p-7">
                  <p className="text-lg font-semibold">{name}</p>
                  <p className="mt-2 text-sm leading-6 text-white/52">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-paper py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.52fr_1fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">Education &amp; facilitation</p>
                <h2 className="mt-4 font-serif text-4xl font-medium tracking-[-0.035em] sm:text-5xl">Original learning formats</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Jewish activism", "A Café Midrash on awareness, humanism and responsibility, using curated classical and modern texts."],
                  ["AI, religion & community", "An interactive discussion on whether AI could replace a rabbi, enter a minyan, or change community practice."],
                  ["Humour through tears", "A journey through twentieth-century Jewish experience using humour, texts and stand-up as cultural evidence."],
                  ["Nordic Jewish life", "A cross-cultural view of Sweden, Israel, compromise, memory and the character of Nordic Jewish communities."],
                  ["Community event craft", "A practical workshop for new community activists on designing Jewish events people remember."],
                  ["Justice & memory", "A Hague-based discussion of international justice, the Eichmann trial, and why societies bring war criminals to court."],
                ].map(([title, text]) => (
                  <article key={title} className="rounded-sm border border-ink/10 bg-white p-6 shadow-quiet">
                    <h3 className="text-xl font-semibold tracking-[-0.02em]">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-graphite/66">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 bg-white py-16 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.58fr_1fr]">
            <div className="relative min-h-[330px] overflow-hidden rounded-sm bg-bone">
              <Image src="/media/speaking/ai-rabbi-lecture.jpg" alt="Alex Lindholm facilitating a session on artificial intelligence and religion" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
            </div>
            <div className="lg:py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">Writing &amp; field research</p>
              <h2 className="mt-4 font-serif text-4xl font-medium tracking-[-0.035em] sm:text-5xl">Jewish life across places.</h2>
              <p className="mt-5 text-base leading-8 text-graphite/72">For JEvents, Alex developed interviews and a three-part “Sweden with a Jewish Accent” series, combining historical research, lived experience in Stockholm, community observation and cross-cultural interpretation.</p>
              <div className="mt-7 flex flex-col gap-3 text-sm font-semibold text-electric">
                <a href="https://jevents.ru/2017/shvetsiya-s-evrejskim-aktsentom-chast-pervaya/" target="_blank" rel="noopener noreferrer" className="hover:underline">Sweden with a Jewish Accent · Part I ↗</a>
                <a href="https://jevents.ru/2018/shvetsiya-s-evrejskim-aktsentom-chast-vtoraya-skandinavskij-kompromiss-stokgolma/" target="_blank" rel="noopener noreferrer" className="hover:underline">The Scandinavian Compromise of Stockholm · Part II ↗</a>
                <a href="https://jevents.ru/2019/shvetsiya-s-evrejskim-aktsentom-chast-tretya-natsionalnyj-harakter-shvedov/" target="_blank" rel="noopener noreferrer" className="hover:underline">Swedish National Character · Part III ↗</a>
                <a href="https://jevents.ru/2017/intervyu-s-lyonej-landa/" target="_blank" rel="noopener noreferrer" className="hover:underline">Interview with Lyonya Landa ↗</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink/10 bg-bone">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs leading-5 text-graphite/52 sm:px-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-semibold uppercase tracking-[0.15em] text-ink/72">Private &amp; Confidential</p>
            <p className="mt-2 max-w-2xl">Shared personally with you. Please do not copy, forward or redistribute this content without permission.</p>
          </div>
          <p className="shrink-0">Confidential · Alex Lindholm © 2026</p>
        </div>
      </footer>
    </PrivatePageShell>
  );
}
