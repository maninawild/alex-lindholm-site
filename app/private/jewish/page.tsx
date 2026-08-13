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

const erasmusProjects = [
  {
    eyebrow: "Hamburg · 2016",
    title: "Changemakers",
    summary:
      "A German–Ukrainian–Russian youth encounter on minority rights, participation and social activism.",
    details:
      "Held in Hamburg from 2–7 October 2016, the meet-up brought together young people from Germany, Ukraine and Russia, including participants from minority and migrant communities. The program addressed xenophobia, stigma, European values, solidarity and youth-led change, concluding with a participant-created photo exhibition.",
    href: "https://jubuk.wordpress.com/2019/01/21/meet-up-german-ukrainian-russian-youth-encounter-changemakers/",
  },
  {
    eyebrow: "Wuppertal · 2017",
    title: "Youth Exchange “Roots”",
    summary:
      "An Erasmus+ exchange connecting young people from Russia and Germany through history, inclusion and intercultural learning.",
    details:
      "Implemented in Wuppertal from 1–8 March 2017 by JuBuK and Hillel Russia, the exchange used history as a route into mutual respect, cultural diversity, social inclusion and justice. It also supported youth mobility and practical intercultural cooperation.",
    href: "https://jubuk.wordpress.com/2019/01/22/youth-exchange-roots/",
    videoId: "4QSZS4RbvII",
  },
  {
    eyebrow: "Saint Petersburg · 2018",
    title: "Youth Exchange “Roots 2gether”",
    summary:
      "A follow-up to Roots, bringing the German–Russian youth exchange to Saint Petersburg.",
    details:
      "Held from 25 April–2 May 2018 and organised by JuBuK with Hillel Russia, Roots 2gether continued the Erasmus+ partnership established in Germany in 2017. The project centred historical awareness, anti-discrimination, mobility and respectful cooperation across cultures.",
    href: "https://jubuk.wordpress.com/2019/01/22/youth-exchange-roots-2gether/",
  },
  {
    eyebrow: "Berlin · 2023",
    title: "Roots Reloaded",
    summary:
      "A later Roots follow-up connecting young people from Germany and Israel around history, diversity and mobility.",
    details:
      "Organised in Berlin from 21–28 February 2023 by JuBuK with Hillel Israel Ltd., the project extended the Roots 2gether model to German–Israeli cooperation. Its focus included historical understanding, mutual respect, social inclusion, anti-discrimination and access for participants facing social, economic or geographic barriers.",
    href: "https://jubuk.wordpress.com/2023/04/10/roots-reloaded/",
  },
];

const articles = [
  {
    source: "JEvents · 2017",
    title: "Sweden with a Jewish Accent · Part I",
    href: "https://jevents.ru/2017/shvetsiya-s-evrejskim-aktsentom-chast-pervaya/",
  },
  {
    source: "JEvents · 2018",
    title: "The Scandinavian Compromise of Stockholm · Part II",
    href: "https://jevents.ru/2018/shvetsiya-s-evrejskim-aktsentom-chast-vtoraya-skandinavskij-kompromiss-stokgolma/",
  },
  {
    source: "JEvents · 2019",
    title: "Swedish National Character · Part III",
    href: "https://jevents.ru/2019/shvetsiya-s-evrejskim-aktsentom-chast-tretya-natsionalnyj-harakter-shvedov/",
  },
  {
    source: "JEvents · 2017",
    title: "Interview with Lyonya Landa",
    href: "https://jevents.ru/2017/intervyu-s-lyonej-landa/",
  },
  {
    source: "JEPS",
    title: "Alex Puzin: “A joke is, first of all, a technology”",
    href: "https://news.jeps.ru/kultura/evrejskij-yumor-konkurs-stend-apa-gilel.html",
    photos: [
      "https://news.jeps.ru/images/news/kultura/konkurs-stend-apa-gilel_f1.jpg",
      "https://news.jeps.ru/images/news/kultura/konkurs-stend-apa-gilel_f2.jpg",
    ],
  },
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
                <p>Program leadership built on earlier work with the madrichim school and recurring educational initiatives at Hillel St. Petersburg. Responsibilities recorded in the source materials include mentoring participants, helping ideas become workable programs, coordinating delivery, and supporting community engagement.</p>
                <a href="https://hillel.ru/maximum/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex font-semibold text-electric hover:underline">Maximum program reference ↗</a>
              </PrivateProjectCard>
              <PrivateProjectCard eyebrow="Community" title="Hillel St. Petersburg" summary="Five years across program management, program direction, education and participant-led initiatives.">
                <p>From 2012 to 2016, Alex moved through program management, program direction, and leadership-program curation. The work covered event and program planning, community communications, stakeholder coordination, volunteer and participant support, and the development of educational and social projects.</p>
                <a href="https://hillel.ru/city/spb/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex font-semibold text-electric hover:underline">Hillel St. Petersburg ↗</a>
              </PrivateProjectCard>
              <PrivateProjectCard eyebrow="Culture" title="Festivals, camps and public formats" summary="A portfolio of youth, cultural and community projects developed between 2012 and 2015.">
                The documented portfolio includes Days of Jewish Culture at St. Petersburg State University, the Jewish Beauty Contest, Humour With No Limits Jewish stand-up competition, MEL Jewish Youth Camp, and the Shop of Israel at two international Christmas festivals in St. Petersburg.
              </PrivateProjectCard>
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 bg-paper py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.48fr_1fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">International exchange</p>
                <h2 className="mt-4 font-serif text-4xl font-medium tracking-[-0.035em] sm:text-5xl">Erasmus+ Exchange Projects</h2>
                <p className="mt-5 max-w-md text-base leading-7 text-graphite/66">A four-project sequence spanning Germany, Russia, Ukraine and Israel, with history and intercultural cooperation as shared foundations.</p>
              </div>
              <div className="border-b border-ink/12">
                {erasmusProjects.map((project) => (
                  <PrivateProjectCard key={project.title} eyebrow={project.eyebrow} title={project.title} summary={project.summary}>
                    <p>{project.details}</p>
                    {project.videoId ? (
                      <div className="mt-6 overflow-hidden rounded-sm border border-ink/10 bg-black shadow-quiet">
                        <div className="aspect-video">
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${project.videoId}`}
                            title="Project Roots by JuBuK Germany and Hillel Russia"
                            className="h-full w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    ) : null}
                    <a href={project.href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex font-semibold text-electric hover:underline">Project archive ↗</a>
                  </PrivateProjectCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Community archive photographs" className="bg-white py-4 sm:py-6">
          <div className="mx-auto grid max-w-7xl gap-3 px-5 sm:grid-cols-3 sm:px-8">
            {[
              ["/media/jewish/community-01.jpg", "Jewish community archive photograph in New York"],
              ["/media/jewish/community-02.jpg", "Portrait from a Hillel community event"],
              ["/media/jewish/community-03.jpg", "Illustration from a Hillel cultural program"],
            ].map(([src, alt]) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-sm bg-bone">
                <Image src={src} alt={alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
              </div>
            ))}
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
              <p className="mt-5 text-sm leading-6 text-graphite/58">The full reading list, including an interview on Jewish humour and stand-up, appears below.</p>
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 bg-bone py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.48fr_1fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">Reading</p>
                <h2 className="mt-4 font-serif text-4xl font-medium tracking-[-0.035em] sm:text-5xl">Selected articles</h2>
              </div>
              <div className="border-t border-ink/12">
                {articles.map((article) => (
                  <article key={article.href} className="grid gap-3 border-b border-ink/12 py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-copper">{article.source}</p>
                    <div>
                      <a href={article.href} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold leading-6 text-ink hover:text-electric hover:underline">{article.title} ↗</a>
                      {article.photos ? (
                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-graphite/55">
                          {article.photos.map((photo, index) => (
                            <a key={photo} href={photo} target="_blank" rel="noopener noreferrer" className="hover:text-electric hover:underline">Event photo {index + 1} ↗</a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </article>
                ))}
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
