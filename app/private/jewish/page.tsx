import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { PrivatePageShell } from "@/components/private/private-page-shell";
import { PrivateProjectCard } from "@/components/private/private-project-card";
import { privateIdeas } from "@/data/private-ideas";

export const dynamic = "force-dynamic";


export default async function JewishPrivatePage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const locale = (await searchParams).lang === "ru" ? "ru" : "en";
  const t = (en: string, ru: string) => locale === "ru" ? ru : en;
  const timeline = [
  ["2011–2013", t("Program Manager, Hillel St. Petersburg", "Менеджер программ, «Гилель» Санкт-Петербурга")],
  ["2013–2015", t("Program Director, Hillel St. Petersburg", "Программный директор, «Гилель» Санкт-Петербурга")],
  ["2013–2015", t("Curator, madrichim leadership school and recurring education programs", "Куратор школы мадрихов и регулярных образовательных программ")],
  ["2015–2016", t("Chief Curator, Maximum Jewish Leadership Program", "Главный куратор еврейской лидерской программы «Максимум»")],
  ["2016–2017", t("One Year Program in Jewish Studies, Paideia, Stockholm", "Годовая программа еврейских исследований, Paideia, Стокгольм")],
  ["2017", t("Educator programs at Yad Vashem and BCI / American Jewish University", "Образовательные программы «Яд Вашем» и BCI / American Jewish University")],
  ["2018", t("Internship program, ANU Museum of the Jewish People, Tel Aviv", "Стажировка в Музее еврейского народа ANU, Тель-Авив")],
  ["2019–2020", t("Crisis management and development work, World Federation of Georgian Jewry", "Антикризисное управление и развитие, Всемирная федерация грузинских евреев")],
];

const credentials = [
  ["Paideia", t("Civilization and Jewish Studies, Stockholm", "Изучение еврейской цивилизации, Стокгольм")],
  [t("Yad Vashem", "Яд Вашем"), t("Teaching the Holocaust course for educators, Jerusalem", "Курс по преподаванию истории Холокоста для педагогов, Иерусалим")],
  ["BCI / AJU", t("Brandeis Collegiate Institute, Los Angeles", "Brandeis Collegiate Institute, Лос-Анджелес")],
  [t("ANU Museum", "Музей ANU"), t("Internship program, Tel Aviv", "Программа стажировки, Тель-Авив")],
  ["Lehava", t("Leadership program, St. Petersburg and Cleveland", "Лидерская программа, Санкт-Петербург и Кливленд")],
  [t("NRU HSE", "НИУ ВШЭ"), t("Project Management in the Social Sector", "Управление проектами в социальной сфере")],
];

const erasmusProjects = [
  {
    eyebrow: t("Hamburg · 2016", "Гамбург · 2016"),
    title: "Changemakers",
    summary:
      t("A German–Ukrainian–Russian youth encounter on minority rights, participation and social activism.", "Встреча молодёжи из Германии, Украины и России о правах меньшинств, общественном участии и активизме."),
    details:
      t("Held in Hamburg from 2–7 October 2016, the meet-up brought together young people from Germany, Ukraine and Russia, including participants from minority and migrant communities. The program addressed xenophobia, stigma, European values, solidarity and youth-led change, concluding with a participant-created photo exhibition.", "Встреча прошла в Гамбурге 2–7 октября 2016 года. Она объединила молодых людей из Германии, Украины и России, в том числе представителей меньшинств и мигрантских сообществ. Участники обсуждали ксенофобию, стигматизацию, европейские ценности, солидарность и молодёжные инициативы. В завершение они подготовили фотовыставку."),
    image: "/media/jewish/exchange/changemakers-hamburg-2016.jpg",
    imageAlt: t("Changemakers participants gathered in Hamburg in 2016", "Участники Changemakers в Гамбурге, 2016 год"),
    href: "https://jubuk.wordpress.com/2019/01/21/meet-up-german-ukrainian-russian-youth-encounter-changemakers/",
  },
  {
    eyebrow: t("Wuppertal · 2017", "Вупперталь · 2017"),
    title: t("Youth Exchange “Roots”", "Молодёжный обмен Roots"),
    summary:
      t("An Erasmus+ exchange connecting young people from Russia and Germany through history, inclusion and intercultural learning.", "Обмен Erasmus+ для молодёжи из России и Германии: история, инклюзия и межкультурное обучение."),
    details:
      t("Implemented in Wuppertal from 1–8 March 2017 by JuBuK and Hillel Russia, the exchange used history as a route into mutual respect, cultural diversity, social inclusion and justice. It also supported youth mobility and practical intercultural cooperation.", "Обмен состоялся в Вуппертале 1–8 марта 2017 года. Организаторы — JuBuK и «Гилель» России. Через изучение истории участники обсуждали взаимное уважение, культурное разнообразие, социальную инклюзию и справедливость. Программа также развивала молодёжную мобильность и практическое сотрудничество между культурами."),
    image: "/media/jewish/exchange/roots-wuppertal-2017.jpg",
    imageAlt: t("Youth Exchange Roots participants in a workshop in Wuppertal in 2017", "Участники обмена Roots на занятии в Вуппертале, 2017 год"),
    href: "https://jubuk.wordpress.com/2019/01/22/youth-exchange-roots/",
    videoId: "4QSZS4RbvII",
  },
  {
    eyebrow: t("Saint Petersburg · 2018", "Санкт-Петербург · 2018"),
    title: t("Youth Exchange “Roots 2gether”", "Молодёжный обмен Roots 2gether"),
    summary:
      t("A follow-up to Roots, bringing the German–Russian youth exchange to Saint Petersburg.", "Продолжение Roots: немецко-российский молодёжный обмен в Санкт-Петербурге."),
    details:
      t("Held from 25 April–2 May 2018 and organised by JuBuK with Hillel Russia, Roots 2gether continued the Erasmus+ partnership established in Germany in 2017. The project centred historical awareness, anti-discrimination, mobility and respectful cooperation across cultures.", "Roots 2gether прошёл с 25 апреля по 2 мая 2018 года. JuBuK и «Гилель» России продолжили партнёрство Erasmus+, начатое в Германии в 2017 году. В центре программы — историческая память, противодействие дискриминации, мобильность и уважительное межкультурное сотрудничество."),
    image: "/media/jewish/exchange/roots-2gether-saint-petersburg-2018.jpg",
    imageAlt: t("Roots 2gether participants outside the Grand Choral Synagogue in Saint Petersburg in 2018", "Участники Roots 2gether у Большой хоральной синагоги Санкт-Петербурга, 2018 год"),
    href: "https://jubuk.wordpress.com/2019/01/22/youth-exchange-roots-2gether/",
  },
  {
    eyebrow: t("Berlin · 2023", "Берлин · 2023"),
    title: "Roots Reloaded",
    summary:
      t("A later Roots follow-up connecting young people from Germany and Israel around history, diversity and mobility.", "Продолжение Roots для молодёжи из Германии и Израиля: история, разнообразие и мобильность."),
    details:
      t("Organised in Berlin from 21–28 February 2023 by JuBuK with Hillel Israel Ltd., the project extended the Roots 2gether model to German–Israeli cooperation. Its focus included historical understanding, mutual respect, social inclusion, anti-discrimination and access for participants facing social, economic or geographic barriers.", "Проект прошёл в Берлине 21–28 февраля 2023 года. JuBuK и Hillel Israel Ltd. применили формат Roots 2gether к немецко-израильскому сотрудничеству. Программа была посвящена пониманию истории, взаимному уважению, социальной инклюзии и противодействию дискриминации. Особое внимание уделялось участию молодых людей, сталкивающихся с социальными, экономическими или географическими барьерами."),
    image: "/media/jewish/exchange/roots-reloaded-berlin-2023.jpg",
    imageAlt: t("Roots Reloaded participants gathered in Berlin in 2023", "Участники Roots Reloaded в Берлине, 2023 год"),
    href: "https://jubuk.wordpress.com/2023/04/10/roots-reloaded/",
  },
];

const articles = [
  {
    source: "JEvents · 2017",
    title: t("Sweden with a Jewish Accent · Part I", "Швеция с еврейским акцентом · Часть I"),
    href: "https://jevents.ru/2017/shvetsiya-s-evrejskim-aktsentom-chast-pervaya/",
  },
  {
    source: "JEvents · 2018",
    title: t("The Scandinavian Compromise of Stockholm · Part II", "Швеция с еврейским акцентом · Часть II. Скандинавский компромисс Стокгольма"),
    href: "https://jevents.ru/2018/shvetsiya-s-evrejskim-aktsentom-chast-vtoraya-skandinavskij-kompromiss-stokgolma/",
  },
  {
    source: "JEvents · 2019",
    title: t("Swedish National Character · Part III", "Швеция с еврейским акцентом · Часть III. Национальный характер шведов"),
    href: "https://jevents.ru/2019/shvetsiya-s-evrejskim-aktsentom-chast-tretya-natsionalnyj-harakter-shvedov/",
  },
  {
    source: "JEvents · 2017",
    title: t("Interview with Lyonya Landa", "Интервью с Лёней Ландой"),
    href: "https://jevents.ru/2017/intervyu-s-lyonej-landa/",
  },
  {
    source: "JEPS",
    title: t("Alex Puzin: “A joke is, first of all, a technology”", "Алексей Пузин: «Шутка — это прежде всего технология»"),
    href: "https://news.jeps.ru/kultura/evrejskij-yumor-konkurs-stend-apa-gilel.html",
    photos: [
      "https://news.jeps.ru/images/news/kultura/konkurs-stend-apa-gilel_f1.jpg",
      "https://news.jeps.ru/images/news/kultura/konkurs-stend-apa-gilel_f2.jpg",
    ],
  },
];


  await connection();


  return (
    <PrivatePageShell locale={locale}>
      <main lang={locale}>
        <section className="relative overflow-hidden bg-[#10131a] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_90%,rgba(37,99,235,0.18),transparent_32%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.08fr_0.72fr] lg:items-end lg:py-28">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">{t("Selected record · 2011–present", "Избранный опыт · с 2011 года")}</p>
              <h1 className="mt-5 max-w-4xl font-serif text-5xl font-medium leading-[0.98] tracking-[-0.045em] text-balance sm:text-7xl">
                {t("Jewish Experience & Projects", "Еврейский опыт и проекты")}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/66 sm:text-xl">
                {t("Selected community, educational and cultural experience", "Опыт работы в общинах, образовании и культуре")}
              </p>
              <div className="mt-9 max-w-2xl border-l border-white/20 pl-5 text-sm leading-6 text-white/58">
                {t("Shared personally with you. Please do not copy, forward or redistribute this content without permission.", "Эти материалы переданы вам лично. Пожалуйста, не копируйте и не распространяйте их без разрешения.")}</div>
              <nav aria-label={t("Private section navigation", "Навигация закрытого раздела")} className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
                <Link href="/private" className="text-white/68 transition hover:text-white">
                  {t("← Private overview", "← Обзор закрытого раздела (EN)")}</Link>
                <Link href="/private#development-ideas" className="text-white/68 transition hover:text-white">
                  {t("Explore New Development Ideas →", "Новые идеи проектов (EN) →")}</Link>
              </nav>
            </div>
            <div className="relative min-h-[300px] overflow-hidden rounded-sm border border-white/10 bg-white/5 shadow-[0_28px_80px_rgba(0,0,0,0.28)] sm:min-h-[390px]">
              <Image
                src="/media/alex/alex-speaking-01.jpg"
                alt={t("Alex Lindholm speaking during a community session", "Алекс Линдхольм ведёт занятие в общине")}
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
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">{t("Context", "Контекст")}</p>
              <h2 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-[-0.035em] text-balance sm:text-5xl">{t("Community work as an operating discipline.", "Работа в общине: от идеи к реализации.")}</h2>
            </div>
            <div className="space-y-6 text-base leading-8 text-graphite/76 sm:text-lg">
              <p>
                {t("Alex’s Jewish community work began as hands-on program leadership: supporting young adults, developing educational formats, enabling participant-led initiatives, and moving projects from concept through delivery and reporting.", "Работа Алекса в еврейских общинах началась с управления программами: поддержки молодёжи, разработки образовательных форматов и помощи инициативам участников — от идеи до реализации и отчётности.")}</p>
              <p>
                {t("The record spans Hillel St. Petersburg, international leadership and educator programs, cultural projects, institutional development work, original lectures, interviews, and writing about Jewish life across borders.", "Этот опыт включает работу в петербургском «Гилеле», международные лидерские и образовательные программы, культурные проекты, развитие организаций, авторские лекции, интервью и статьи о еврейской жизни в разных странах.")}</p>
              <p>
                {t("The recurring theme is practical community infrastructure: creating formats where identity, learning, leadership, culture, and trusted relationships reinforce one another.", "Общая задача этой работы — создавать в общине условия для обучения, культурной жизни, развития лидерства и доверительных отношений, помогая участникам осмыслять свою идентичность.")}</p>
              <p>
                {t("Since 2023, Alex has been a member of the Advisory Board of the ", "С 2023 года Алекс входит в Advisory Board")} {" "}<a href="https://globaljewry.org/about-us/alex-lindholm/" target="_blank" rel="noopener noreferrer" className="font-semibold text-electric hover:underline">{t("Global Jewry initiative ↗", "инициативы Global Jewry ↗")}</a>{t(", aligning with its mission of building the relationships, shared awareness, and mutual trust that make collective action possible. This role extends more than a decade of work across international and local Jewish organisations in six countries, including mentoring counter-hate media initiatives.", ". Её миссия — развивать связи, взаимопонимание и доверие, необходимые для совместных действий. Эта роль продолжает более чем десятилетнюю работу с международными и местными еврейскими организациями в шести странах, включая менторство медийных инициатив против ненависти.")}</p>
            </div>
          </div>
        </section>

        <section className="border-y border-ink/10 bg-bone py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.48fr_1fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">{t("Experience", "Опыт")}</p>
                <h2 className="mt-4 font-serif text-4xl font-medium tracking-[-0.035em] sm:text-5xl">{t("Selected timeline", "Основные этапы")}</h2>
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
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">{t("Programs & projects", "Программы и проекты")}</p>
              <h2 className="mt-4 font-serif text-4xl font-medium tracking-[-0.035em] sm:text-5xl">{t("Selected work, opened in context.", "Избранные проекты в подробностях.")}</h2>
              <p className="mt-5 text-base leading-7 text-graphite/68">{t("Expand each entry to read more about the project.", "Раскройте карточки, чтобы прочитать подробнее о проектах.")}</p>
            </div>
            <div className="mt-10 border-b border-ink/12">
              <PrivateProjectCard eyebrow={t("Leadership", "Лидерство")} title={t("Maximum Jewish Leadership Program", "Еврейская лидерская программа «Максимум»")} summary={t("Chief curator role focused on youth leadership and project development, 2015–2016.", "Главный куратор: молодёжное лидерство и развитие проектов, 2015–2016 годы.")}>
                <p>{t("Program leadership built on earlier work with the madrichim school and recurring educational initiatives at Hillel St. Petersburg. Responsibilities recorded in the source materials include mentoring participants, helping ideas become workable programs, coordinating delivery, and supporting community engagement.", "Руководство программой продолжило работу со школой мадрихов и регулярными образовательными инициативами петербургского «Гилеля». В задачи входили менторство участников, помощь в разработке программ, координация их реализации и вовлечение в жизнь общины.")}</p>
                <a href="https://hillel.ru/maximum/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex font-semibold text-electric hover:underline">{t("Maximum program reference ↗", "О программе «Максимум» ↗")}</a>
              </PrivateProjectCard>
              <PrivateProjectCard eyebrow={t("Community", "Община")} title={t("Hillel St. Petersburg", "«Гилель» Санкт-Петербурга")} summary={t("Program management, program direction, education and participant-led initiatives, 2011–2016.", "Управление программами, образование и инициативы участников, 2011–2016 годы.")}>
                <p>{t("From 2011 to 2016, Alex moved through program management, program direction, and leadership-program curation. The work covered event and program planning, community communications, stakeholder coordination, volunteer and participant support, and the development of educational and social projects.", "В 2011–2016 годах Алекс работал менеджером и программным директором, затем курировал лидерские программы. Он занимался планированием мероприятий и программ, коммуникациями общины, взаимодействием с партнёрами, поддержкой волонтёров и участников, развитием образовательных и социальных проектов.")}</p>
                <a href="https://hillel.ru/city/spb/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex font-semibold text-electric hover:underline">Hillel St. Petersburg ↗</a>
              </PrivateProjectCard>
              <PrivateProjectCard eyebrow={t("Culture", "Культура")} title={t("Festivals, camps and public formats", "Фестивали, лагеря и открытые мероприятия")} summary={t("A portfolio of youth, cultural and community projects developed between 2012 and 2015.", "Молодёжные, культурные и общинные проекты 2012–2015 годов.")}>
                {t("The documented portfolio includes Days of Jewish Culture at St. Petersburg State University, the Jewish Beauty Contest, Humour With No Limits Jewish stand-up competition, MEL Jewish Youth Camp, and the Shop of Israel at two international Christmas festivals in St. Petersburg.", "Среди проектов — Дни еврейской культуры в СПбГУ, еврейский конкурс красоты, конкурс еврейского стендапа «Юмор без границ», еврейский молодёжный лагерь MEL и «Лавка Израиля» на двух международных рождественских фестивалях в Санкт-Петербурге.")}</PrivateProjectCard>
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 bg-paper py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.48fr_1fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">{t("International exchange", "Международные обмены")}</p>
                <h2 className="mt-4 font-serif text-4xl font-medium tracking-[-0.035em] sm:text-5xl">{t("Erasmus+ Exchange Projects", "Проекты молодёжных обменов Erasmus+")}</h2>
                <p className="mt-5 max-w-md text-base leading-7 text-graphite/66">{t("A four-project sequence spanning Germany, Russia, Ukraine and Israel, with history and intercultural cooperation as shared foundations.", "Четыре проекта с участниками из Германии, России, Украины и Израиля. Общие темы — история и межкультурное сотрудничество.")}</p>
                <Link href="/private/ideas/youth-exchange" className="mt-6 inline-flex font-semibold text-electric hover:underline">
                  {t("Explore Youth Exchange Ideas →", "Идеи молодёжных обменов (EN) →")}</Link>
              </div>
              <div className="border-b border-ink/12">
                {erasmusProjects.map((project) => (
                  <PrivateProjectCard key={project.title} eyebrow={project.eyebrow} title={project.title} summary={project.summary}>
                    <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-sm border border-ink/10 bg-bone shadow-quiet">
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 52vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <p>{project.details}</p>
                    {project.videoId ? (
                      <div className="mt-6 overflow-hidden rounded-sm border border-ink/10 bg-black shadow-quiet">
                        <div className="aspect-video">
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${project.videoId}`}
                            title={t("Project Roots by JuBuK Germany and Hillel Russia", "Проект Roots: JuBuK (Германия) и «Гилель» России")}
                            className="h-full w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    ) : null}
                    <a href={project.href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex font-semibold text-electric hover:underline">{t("Project archive ↗", "Архив проекта ↗")}</a>
                  </PrivateProjectCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="development-ideas"
          className="relative overflow-hidden bg-[#10131a] px-5 py-16 text-white sm:px-8 sm:py-24"
          aria-labelledby="development-ideas-title"
        >
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-electric/25 blur-3xl" />
          <div className="relative mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">{t("Private concepts", "Закрытые концепции")}</p>
            <h2 id="development-ideas-title" className="mt-3 font-serif text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
              {t("New Development Ideas", "Новые идеи проектов")}</h2>
            <nav aria-label={t("New development ideas", "Новые идеи проектов")} className="mt-8 grid gap-3 md:grid-cols-3">
              {privateIdeas.map((idea, index) => (
                <Link
                  key={idea.slug}
                  href={`/private/ideas/${idea.slug}`}
                  className="group flex min-h-44 flex-col justify-between rounded-sm border border-white/14 bg-white/[0.065] p-5 transition hover:-translate-y-0.5 hover:border-electric/65 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
                >
                  <span className="flex items-center justify-between gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white/42">
                    <span>{t(idea.status, idea.status === "Private Funding Proposal" ? "Закрытая заявка на финансирование · EN" : "Закрытая концепция проекта · EN")}</span>
                    <span aria-hidden="true">0{index + 1}</span>
                  </span>
                  <span className="flex items-end justify-between gap-4">
                    <span className="font-serif text-2xl font-medium leading-tight tracking-[-0.025em]">{idea.title}</span>
                    <span className="shrink-0 text-electric transition group-hover:translate-x-1" aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </section>

        <section aria-label={t("Community archive photographs", "Архивные фотографии общины")} className="bg-white py-4 sm:py-6">
          <div className="mx-auto grid max-w-7xl gap-3 px-5 sm:grid-cols-3 sm:px-8">
            {[
              ["/media/jewish/community-01.jpg", t("Jewish community archive photograph in New York", "Архивная фотография еврейской общины в Нью-Йорке")],
              ["/media/jewish/community-02.jpg", t("Portrait from a Hillel community event", "Портрет с мероприятия «Гилеля»")],
              ["/media/jewish/community-03.jpg", t("Illustration from a Hillel cultural program", "Иллюстрация культурной программы «Гилеля»")],
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
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">{t("Learning & networks", "Образование и профессиональные связи")}</p>
              <h2 className="mt-4 font-serif text-4xl font-medium tracking-[-0.035em] sm:text-5xl">{t("International formation", "Международное образование")}</h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-white/58">{t("Study and educator programs connecting Jewish civilization, Holocaust education, leadership, museum practice and community development.", "Учебные программы и подготовка педагогов: еврейская цивилизация, преподавание истории Холокоста, лидерство, музейная практика и развитие общин.")}</p>
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
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">{t("Education & facilitation", "Образование и работа с группами")}</p>
                <h2 className="mt-4 font-serif text-4xl font-medium tracking-[-0.035em] sm:text-5xl">{t("Original learning formats", "Авторские лекции и занятия")}</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  [t("[Jewish] Activism: A Choice or a Commandment?", "[Еврейский] активизм: выбор или заповедь?"), t("A Café Midrash: reading and discussing texts from the Torah and Talmud alongside contemporary authors, exploring awareness, humanism and responsibility.", "Кафе-Мидраш: чтение и обсуждение текстов Торы, Талмуда и современных авторов об осознанности, гуманизме и ответственности.")],
                  [t("Will AI Replace a Rabbi—and Should AI Be Allowed into a Minyan? Artificial Intelligence and the Transformation of Religion.", "Заменит ли ИИ раввина и пускать ли ИИ в миньян? Искусственный интеллект и трансформация религии."), t("An interactive lecture on how AI might find a place in our community and how religion might change.", "Интерактивная лекция о том, как ИИ найдёт место в нашей общине и как изменится религия.")],
                  [t("Laughter Through Tears. Twentieth-Century Suffering Through the Lens of Jewish Humour.", "Смех сквозь слёзы. XX век страданий через призму еврейского юмора"), t("From the first laughter in the Torah to today’s Jewish stand-up comedians: an interactive lecture with texts and video excerpts.", "От первого смеха в Торе до еврейских стендаперов дня сегодняшнего: интерактивная лекция с текстами и видеофрагментами.")],
                  [t("Hummus and Meatballs: The Scandinavian Compromise of Jewish Happiness", "Хумус и фрикадельки: скандинавский компромисс еврейского счастья"), t("The phenomenon of Nordic Jewish life, the character of the community, and relations between Sweden and Israel.", "Феномен скандинавского еврея, особенности общины и взаимоотношений Швеции и Израиля.")],
                  [t("101 Ways to Ruin a Jewish Event", "101 способ испортить еврейское мероприятие"), t("How do you make a Jewish event unforgettable? Three interactive, in-person workshops for community newcomers and activists.", "Как сделать еврейское событие незабываемым? Три интерактивных очных занятия для новичков еврейской общины и активистов.")],
                  [t("The Hague: The Infrastructure of Justice. Why Must War Criminals Be Brought to Trial?", "Гаага — инфраструктура справедливости: почему военных преступников нужно доводить до суда?"), t("International tribunals and social progress: the Eichmann trial as a case for the necessity of a fair trial.", "Международные трибуналы и общественный прогресс: суд над Эйхманом как пример необходимости справедливого суда.")],
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
              <Image src="/media/speaking/ai-rabbi-lecture.jpg" alt={t("Alex Lindholm facilitating a session on artificial intelligence and religion", "Алекс Линдхольм ведёт занятие об искусственном интеллекте и религии")} fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
            </div>
            <div className="lg:py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">{t("Writing & field research", "Публикации и исследования")}</p>
              <h2 className="mt-4 font-serif text-4xl font-medium tracking-[-0.035em] sm:text-5xl">{t("Jewish life across places.", "Еврейская жизнь в разных странах.")}</h2>
              <p className="mt-5 text-base leading-8 text-graphite/72">{t("For JEvents, Alex developed interviews and a three-part “Sweden with a Jewish Accent” series, combining historical research, lived experience in Stockholm, community observation and cross-cultural interpretation.", "Для JEvents Алекс подготовил интервью и цикл из трёх статей «Швеция с еврейским акцентом», соединив историческое исследование, личный опыт жизни в Стокгольме и наблюдения за жизнью общины.")}</p>
              <p className="mt-5 text-sm leading-6 text-graphite/58">{t("The full reading list, including an interview on Jewish humour and stand-up, appears below.", "Ниже — список публикаций, включая интервью о еврейском юморе и стендапе.")}</p>
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 bg-bone py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.48fr_1fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">{t("Reading", "Публикации")}</p>
                <h2 className="mt-4 font-serif text-4xl font-medium tracking-[-0.035em] sm:text-5xl">{t("Selected articles", "Избранные статьи")}</h2>
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
                            <a key={photo} href={photo} target="_blank" rel="noopener noreferrer" className="hover:text-electric hover:underline">{t("Event photo", "Фото мероприятия")} {index + 1} ↗</a>
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

    </PrivatePageShell>
  );
}
