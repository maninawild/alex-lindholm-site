import Image from "next/image";
import {
  collaborations,
  educationHighlights,
  explorations,
  humanNotes,
  initiatives,
  mediaNotes,
  metrics,
  thinkingTopics,
} from "@/data/site-content";
import { SectionHeader } from "@/components/section-header";
import { ArrowLink } from "@/components/arrow-link";
import { SiteHeader } from "@/components/site-header";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alex Lindholm",
  sameAs: ["https://www.linkedin.com/in/axlindholm/"],
  jobTitle: [
    "Venture Architect",
    "Human-Centered Technologist",
    "Ecosystem Builder",
  ],
  description:
    "Alex Lindholm works across startups, venture ecosystems, ethical technology, responsible AI, human-centered innovation, and cross-border partnerships.",
  knowsAbout: [
    "Human-Centered Innovation",
    "Ethical Technology",
    "Responsible AI",
    "Venture Ecosystems",
    "Systems Thinking",
    "Innovation Leadership",
    "Human-Centric AI",
    "Digital Humanism",
    "Future of Entrepreneurship",
    "Ecosystem Design",
    "Technology Ethics",
    "Strategic Foresight",
    "European Innovation",
    "Human Networks",
    "Meaningful Technology",
  ],
};

const socialLinks = {
  linkedin: "https://www.linkedin.com/in/axlindholm/",
  telegram: "https://t.me/alexinspirexchange",
  whatsapp: "https://wa.me/message/4OIGQ3FHUZQSD1",
  instagram: "https://www.instagram.com/alexplindholm",
  strategicSession: "https://zcal.co/axlindholm/1hour",
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <WhoIAm />
      <FieldNotes />
      <OperatingPhilosophy />
      <ExploreGrid />
      <SelectedInitiatives />
      <Experience />
      <EducationAndSpeaking />
      <CredibilitySection />
      <Thinking />
      <Collaborations />
      <HumanSide />
      <InstagramFieldNotes />
      <StrategicSession />
      <Contact />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-ink text-bone">
      <Image
        src="/media/alex/alex-hero-01.jpg"
        alt="Alex Lindholm in an innovation workshop setting"
        fill
        priority
        loading="eager"
        sizes="100vw"
        className="object-cover object-[64%_50%]"
      />
      <div className="absolute inset-0 bg-ink/18 backdrop-blur-[0.5px]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,19,26,0.90)_0%,rgba(16,19,26,0.70)_34%,rgba(16,19,26,0.30)_58%,rgba(16,19,26,0.64)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(16,19,26,0.74)_0%,rgba(16,19,26,0.05)_42%,rgba(16,19,26,0.34)_100%)]" />

      <SiteHeader />

      <div
        id="top"
        className="relative z-10 mx-auto grid min-h-[calc(100vh-5.5rem)] max-w-7xl items-center gap-10 px-5 pb-14 pt-10 sm:px-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(380px,460px)] lg:gap-8 lg:pb-20 lg:pt-10"
      >
        <div className="w-full min-w-0 max-w-[21rem] sm:max-w-3xl lg:pr-8">
          <p className="mb-4 max-w-[20rem] text-[0.64rem] font-medium uppercase tracking-[0.08em] text-bone/68 sm:text-[0.72rem] sm:tracking-[0.18em]">
            Venture Architect | Human-Centered Technologist | Ecosystem Builder
          </p>
          <h1 className="max-w-full text-[1.92rem] font-medium leading-[1.08] tracking-[-0.03em] text-balance text-bone drop-shadow-[0_1px_18px_rgba(0,0,0,0.24)] sm:text-5xl xl:text-[3.75rem]">
            I help founders, investors and organizations make better decisions
            in uncertain markets.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-bone/78 drop-shadow-[0_1px_14px_rgba(0,0,0,0.22)] sm:text-lg">
            Connecting founders, investors, institutions and operators around
            ideas worth building.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ArrowLink href="#work" label="Explore Projects" />
            <ArrowLink href={socialLinks.strategicSession} label="Book a Strategic Session" variant="light" />
          </div>
        </div>
        <div className="w-full min-w-0 max-w-[21rem] sm:max-w-[430px] lg:ml-0 lg:max-w-[420px] lg:translate-x-32 xl:translate-x-48">
          <HeroLinkedInCard />
        </div>
      </div>
    </section>
  );
}

function HeroLinkedInCard() {
  return (
    <aside
      className="rounded-sm border border-bone/34 bg-ink/36 p-5 text-bone shadow-premium backdrop-blur-xl sm:p-6"
      aria-label="Alex Lindholm LinkedIn profile summary"
    >
      <div className="flex items-start gap-4">
        <span
          className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] bg-bone text-base font-bold text-ink"
          aria-hidden="true"
        >
          in
        </span>
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-bone/76">
            Most active on LinkedIn
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">
            Alex P. Lindholm
          </h2>
          <p className="mt-1 text-sm text-bone/76">500+ connections</p>
        </div>
      </div>

      <div className="mt-5 border-t border-bone/20 pt-5">
        <p className="text-base leading-7 text-bone/88">
          I stress-test startups before they waste time and money. Founder
          advisor, venture architect, and practical connector for VC,
          fundraising, and consultation.
        </p>
      </div>

      <div className="mt-5 grid gap-3 border-t border-bone/20 pt-5 text-sm">
        <div className="grid grid-cols-[0.8fr_1.2fr] gap-4">
          <span className="text-bone/66">Location</span>
          <span>Rotterdam and The Hague</span>
        </div>
        <div className="grid grid-cols-[0.8fr_1.2fr] gap-4">
          <span className="text-bone/66">Companies</span>
          <span>InspireXchange, Masterschool</span>
        </div>
      </div>

      <a
        href={socialLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer me"
        aria-label="Connect with Alex Lindholm on LinkedIn"
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-md border border-ink bg-ink px-5 text-sm font-medium text-bone transition duration-300 hover:bg-graphite"
      >
        <SocialMark type="linkedin" />
        <span>Connect on LinkedIn</span>
        <span aria-hidden="true">→</span>
      </a>
    </aside>
  );
}

function WhoIAm() {
  return (
    <section className="section bg-bone text-ink">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <SectionHeader
            eyebrow="Who I Am"
            title="Operator instinct. Human context. Venture discipline."
          />
          <p className="mt-5 max-w-sm text-sm leading-6 text-graphite/64">
            A practical bridge between founders, capital, institutions,
            creative operators, and technology teams.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-start">
          <div className="relative min-h-[390px] overflow-hidden rounded-sm shadow-quiet">
            <Image
              src="/media/alex/AlexPuzinLindholm.jpg"
              alt="Portrait of Alex Lindholm"
              fill
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="object-cover object-[50%_28%]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white drop-shadow-sm">
                Rotterdam / The Hague / Cross-border
              </p>
            </div>
          </div>
          <div className="space-y-5 border-l border-ink/10 pl-6 text-lg leading-8 text-graphite/82">
            <p>
              For more than a decade, I have been working across startups,
              venture ecosystems, NGOs, educational initiatives, and
              international partnerships, helping ideas, people, and
              organizations grow in chaotic and fast-changing environments.
            </p>
            <p>
              As a managing partner of InspireXchange and venture architect, I
              focus on connecting the right people around useful opportunities:
              founders, investors, institutions, innovators, and unconventional
              collaborators.
            </p>
            <p>
              My work sits between venture strategy, ecosystem building,
              human-centered innovation, and practical execution. I enjoy
              creating situations where long-term partnerships, trust, and
              shared vision become more valuable than short-term transactions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldNotes() {
  return (
    <section className="bg-bone pb-16 text-ink">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {mediaNotes.map((item) => (
            <article
              className="overflow-hidden rounded-sm border border-ink/8 bg-bone shadow-quiet"
              key={item.title}
            >
              {item.image ? (
                <div className="relative min-h-[190px] bg-stone">
                  <Image
                    src={item.image}
                    alt={`${item.title} with Alex Lindholm`}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
              <div className="p-6">
                <h3 className="text-xl font-semibold tracking-[-0.01em]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-graphite/70">
                  {item.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OperatingPhilosophy() {
  return (
    <section id="operating-philosophy" className="section bg-bone text-ink">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:min-h-[calc(100vh+6rem)] lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <SectionHeader
            eyebrow="Operating Philosophy"
            title="Practical before impressive."
            intro="I have always approached startups through a crash-test lens: validating not only the product or market, but also whether an idea should exist in its current form at all."
          />
        </div>
        <div className="space-y-5 border-l border-ink/10 pl-6 text-lg leading-8 text-graphite/82">
          <p>
            Not every venture is meant to become a unicorn, and that is
            perfectly fine. Some ideas create far more value for ecosystems,
            cities, educational institutions, NGOs, or public initiatives than
            for traditional shareholders.
          </p>
          <p>
            I am interested in sustainable and useful models where innovation
            remains human, practical, and grounded in reality.
          </p>
          <p>
            Having lived in five countries and explored more than 65, I
            understand how differently people, cultures, and systems operate
            across borders. From localization and partnerships to scaling and
            communication between teams, I tend to work best where different
            worlds need to find a common language.
          </p>
          <p>
            Most collaborations I take part in are long-term, trust-based, and
            often structured around shared upside rather than transactional
            consulting.
          </p>
        </div>
      </div>
    </section>
  );
}

function ExploreGrid() {
  return (
    <section id="work" className="bg-bone pb-8 pt-16 text-ink sm:pb-10 sm:pt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Things I Build / Explore"
          title="Focused areas."
          intro="The work usually sits where venture strategy, ecosystem design, human-centered innovation, and cross-border execution meet."
        />
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {explorations.map((item, index) => (
            <article
              className="group flex min-h-[205px] flex-col justify-between rounded-sm border border-ink/8 bg-bone p-5 shadow-quiet transition duration-300 hover:-translate-y-0.5 hover:border-electric/30 hover:bg-bone"
              key={item.title}
            >
              <div>
                <div className="flex items-center justify-between gap-4 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-copper">
                  <span>{item.label}</span>
                  <span className="text-ink/28">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-7 text-2xl font-semibold leading-tight tracking-[-0.02em] text-balance">
                  {item.title}
                </h3>
                <p className="mt-5 text-base leading-7 text-graphite/72">
                  {item.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SelectedInitiatives() {
  return (
    <section className="bg-bone pb-16 pt-8 text-ink sm:pb-20 sm:pt-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Selected Initiatives"
          title="Projects, rooms, and working formats."
          intro="Concrete formats I build or help shape around founders, investors, operators, homes, and ecosystem partners."
        />
        <div className="mt-6 max-w-3xl border-l-2 border-electric/55 pl-5 text-base leading-7 text-graphite/78">
          Open to new partners, ideas and projects as investor, partner, venture architect and risk-manager.
        </div>
        <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
          {initiatives.map((project, index) => (
            <article
              className="grid gap-4 py-6 transition duration-300 hover:bg-ink/[0.02] md:grid-cols-[0.16fr_0.34fr_1fr]"
              key={project.title}
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-graphite/46 md:block">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-graphite/44">
                {project.type}
              </div>
              <h3 className="text-2xl font-semibold tracking-[-0.02em]">{project.title}</h3>
              <p className="text-base leading-7 text-graphite/68 md:col-start-3">
                {project.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section bg-bone text-ink">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Experience / Social Proof"
          title="A few useful signals."
          intro="The work has moved through founder calls, universities, accelerators, volunteer initiatives, innovation ecosystems, speaking rooms, and partnership tables."
        />
        <div className="mt-8 grid gap-x-8 gap-y-6 border-y border-ink/10 py-8 sm:grid-cols-2">
          {metrics.map((metric) => (
            <div className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-8 before:w-px before:bg-copper/55" key={metric.label}>
              <div className="text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
                {metric.value}
              </div>
              <p className="mt-4 text-sm leading-6 text-graphite/65">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationAndSpeaking() {
  return (
    <section id="beyond-venture-work" className="bg-bone pb-16 text-ink">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 border-y border-ink/10 py-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
              Beyond Venture Work
            </p>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.015em] text-balance sm:text-4xl">
              Education, lectures & community work.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-graphite/75">
              Alex also works as an educator, lecturer, community builder, and
              cultural thinker across technology, ethics, entrepreneurship, and
              society.
            </p>
            <a
              href="/lectures-and-speaking"
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-ink/15 px-6 text-sm font-medium text-ink transition duration-300 hover:border-electric hover:bg-electric/5"
            >
              <span>View lectures & speaking topics</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-[0.72fr_1fr]">
            <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-sm bg-ink shadow-quiet">
              <Image
                src="/media/speaking/ZaSkobkamy3.jpg"
                alt="Alex Lindholm speaking during an educational session"
                fill
                sizes="(min-width: 1024px) 28vw, 100vw"
                className="object-contain"
              />
            </div>
            <div className="grid gap-3">
              {educationHighlights.map((item) => (
                <article
                  key={item.title}
                  className="rounded-sm border border-ink/8 bg-bone p-5 shadow-quiet"
                >
                  <h3 className="text-lg font-semibold leading-tight tracking-[-0.015em]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-graphite/70">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const credibilityCategories = [
  {
    label: "Built",
    text: "Ventures, platforms, deal-room formats and ecosystem experiments around founders, investors and operators.",
  },
  {
    label: "Learned",
    text: "Leadership, cultural and educational programs that shaped a cross-border, human-centered way of working.",
  },
  {
    label: "Taught",
    text: "University sessions, lectures and workshops on AI, digital transformation, entrepreneurship, society and ethics.",
  },
  {
    label: "Contributed",
    text: "Community organizations, innovation ecosystems and partner networks where trust is built through long-term work.",
  },
];

type CredibilityLogo = {
  name: string;
  src?: string;
  treatment?: "standard" | "wide" | "tall" | "dark";
  logoScale?: number;
  maxWidth?: number;
};

const credibilityLogoGroups: { title: string; items: CredibilityLogo[] }[] = [
  {
    title: "Built",
    items: [
      { name: "InspireXchange", src: "/media/logos/inspirexchange.jpg", treatment: "tall", logoScale: 2.15 },
      { name: "EVI Safety Technology", src: "/media/logos/evi-safety-technology.jpg", treatment: "tall", logoScale: 1.22 },
    ],
  },
  {
    title: "Ecosystems",
    items: [
      { name: "YES!Delft", src: "/media/logos/yes-delft.jpg", treatment: "tall", logoScale: 1.72 },
      { name: "The Hague Tech", src: "/media/logos/the-hague-tech.png", treatment: "dark", logoScale: 1 },
      { name: "HSD Security Delta", src: "/media/logos/hsd-security-delta.jpg", treatment: "tall", logoScale: 1.72 },
    ],
  },
  {
    title: "Learned & Community",
    items: [
      { name: "Global Jewry", src: "/media/logos/global-jewry.webp", treatment: "wide", logoScale: 0.64 },
      { name: "Paideia", src: "/media/logos/paideia.png", treatment: "dark", logoScale: 1.04 },
      { name: "ANU Museum of the Jewish People", src: "/media/logos/anu-museum.jpg", treatment: "wide", logoScale: 1.38 },
      { name: "BCI / American Jewish University", src: "/media/logos/american-jewish-university.svg", treatment: "wide", logoScale: 0.84 },
      { name: "Hillel International", src: "/media/logos/hillel-international.svg", treatment: "wide", logoScale: 0.62 },
    ],
  },
  {
    title: "Taught",
    items: [
      { name: "Saint Petersburg State University", src: "/media/logos/spbsu.svg", treatment: "dark", logoScale: 1.12 },
      { name: "Erasmus University Rotterdam", src: "/media/logos/erasmus-university-rotterdam.svg", treatment: "wide", logoScale: 1.08 },
      { name: "Yad Vashem", src: "/media/logos/yad-vashem.svg", treatment: "wide", logoScale: 1.06 },
    ],
  },
];

function CredibilitySection() {
  return (
    <section id="credibility" className="bg-bone pb-16 text-ink">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 border-y border-ink/10 py-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
              Credibility
            </p>
            <h2 className="mt-4 max-w-xl text-3xl font-medium leading-tight tracking-[-0.015em] text-balance sm:text-4xl">
              Where I Built, Learned and Contributed
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-graphite/75">
              Selected places where I built, learned, taught and contributed.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {credibilityCategories.map((item) => (
                <article
                  key={item.label}
                  className="border-l border-ink/12 pl-4"
                >
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-ink">
                    {item.label}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-graphite/68">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            {credibilityLogoGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-graphite/58">
                  {group.title}
                </h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {group.items.map((item) => (
                    <LogoCard item={item} key={item.name} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoCard({ item }: { item: CredibilityLogo }) {
  const treatment = item.treatment ?? "standard";
  const imageSrc = item.src;

  const isDark = treatment === "dark";
  const logoScale = item.logoScale ?? 1;
  const maxWidth = item.maxWidth ?? 230;
  const imageSizeClass =
    treatment === "wide"
      ? "h-[88px]"
      : treatment === "tall" || treatment === "dark"
        ? "h-[92px]"
        : "h-[84px]";

  return (
    <article
      className={`flex min-h-[136px] items-center justify-center overflow-hidden rounded-md border px-5 py-5 shadow-quiet transition duration-300 hover:-translate-y-0.5 ${
        isDark
          ? "border-ink/12 bg-ink text-bone"
          : "border-ink/8 bg-white text-ink"
      }`}
    >
      {!imageSrc ? (
        <p className="max-w-[13rem] text-center text-base font-semibold leading-tight tracking-[-0.01em]">
          {item.name}
        </p>
      ) : (
      <div
        className={`relative mx-auto w-full max-w-[230px] ${imageSizeClass}`}
        style={{ maxWidth, transform: `scale(${logoScale})` }}
      >
        <Image
          src={imageSrc}
          alt={`${item.name} logo`}
          fill
          loading="eager"
          unoptimized={imageSrc.endsWith(".svg")}
          sizes="(min-width: 1280px) 220px, (min-width: 640px) 40vw, 80vw"
          className="object-contain"
        />
      </div>
      )}
    </article>
  );
}

function Thinking() {
  return (
    <section id="thinking" className="section bg-bone text-ink">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <SectionHeader
            eyebrow="Ideas / Thinking"
            title="What I keep thinking about."
          />
        </div>
        <div className="grid gap-6 border-l border-ink/10 pl-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="max-w-2xl text-lg leading-8 text-graphite/78">
              I am interested in practical questions around human-centered
              innovation, ethical technology, responsible AI, digital humanism,
              innovation leadership, and the future of entrepreneurship in Europe
              and beyond.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {thinkingTopics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-ink/12 bg-bone px-4 py-2 text-sm text-graphite/75"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
          <div className="relative flex min-h-[390px] items-center justify-center overflow-hidden rounded-sm bg-stone shadow-quiet">
            <Image
              src="/media/alex/IMG_2396-display.jpg"
              alt="Alex Lindholm seated beside a wall quote about permanent anxiety"
              fill
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Collaborations() {
  return (
    <section id="collaborate" className="section bg-bone text-ink">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <SectionHeader
              eyebrow="Collaborations"
              title="The best work usually starts between worlds."
              intro="I collaborate with people who care about substance: builders, capital partners, creative operators, institutions, private communities, and technology teams working on real questions."
            />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
          {collaborations.map((item, index) => (
            <article
              className="group min-h-[190px] rounded-sm border border-ink/8 bg-bone p-5 shadow-quiet transition duration-300 hover:-translate-y-0.5 hover:border-copper/20"
              key={item.title}
            >
              <div className="flex items-center justify-between text-[0.68rem] font-medium uppercase tracking-[0.16em] text-copper">
                <span>Collaboration</span>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-7 text-2xl font-semibold leading-tight tracking-[-0.02em] text-balance">
                {item.title}
              </h3>
              <p className="mt-5 text-base leading-7 text-graphite/70">
                {item.text}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    className="text-xs text-graphite/45"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HumanSide() {
  return (
    <section id="human-side" className="section bg-bone text-ink">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <SectionHeader
            eyebrow="Human Side"
            title="The human side matters too."
          />
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[440px] overflow-hidden rounded-sm">
            <Image
              src="/media/alex/alex-travel-01.jpg"
              alt="Alex Lindholm in Tallinn during a personal travel moment"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[45%_50%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/62 to-transparent" />
          </div>
          <div className="grid content-start gap-4">
            {humanNotes.map((note) => (
              <p className="border-l border-ink/10 pl-4 text-base leading-7 text-graphite/70" key={note}>
                {note}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-bone pb-14 pt-8 text-ink sm:pb-16 sm:pt-10">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_0.72fr] lg:items-start">
        <div>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
            Contact
          </p>
          <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.025em] text-balance sm:text-4xl">
            Build something meaningful.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-graphite/75">
            Looking for a strategic perspective, the right introduction, or an
            unconventional collaboration? Start with a clear note and a real
            reason to connect.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer me"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-electric bg-electric px-6 text-sm font-medium text-bone transition duration-300 hover:bg-blue-700"
              aria-label="Connect with Alex Lindholm on LinkedIn"
            >
              <SocialMark type="linkedin" />
              <span>Connect on LinkedIn</span>
              <span aria-hidden="true">→</span>
            </a>
            <ArrowLink href="mailto:hello@alexlindholm.com" label="Start a Conversation" variant="lineDark" />
          </div>
          <SocialContactLinks />
        </div>
        <LinkedInProfileCard tone="light" />
      </div>
    </section>
  );
}

const instagramFieldNotes = [
  {
    src: "/media/alex/alex-human-01.jpg",
    alt: "Alex Lindholm in a European city setting",
    label: "Cities",
  },
  {
    src: "/media/alex/alex-workshop-01.jpg",
    alt: "Alex Lindholm attending an innovation ecosystem workshop",
    label: "Projects",
  },
  {
    src: "/media/alex/alex-field-01.jpg",
    alt: "Alex Lindholm during an outdoor media interview",
    label: "People",
  },
  {
    src: "/media/alex/alex-speaking-01.jpg",
    alt: "Alex Lindholm speaking during a project session",
    label: "Rooms",
  },
];

function InstagramFieldNotes() {
  return (
    <section className="section bg-bone text-ink" aria-labelledby="instagram-heading">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.58fr_1fr] lg:items-start">
        <div>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
            Instagram / Field Notes
          </p>
          <h2
            id="instagram-heading"
            className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.02em] text-balance sm:text-4xl"
          >
            A quieter look at travel, people, cities, and projects.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-graphite/75">
            Field notes from travel, projects, people and the human side of
            building across borders.
          </p>
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Alex Lindholm on Instagram"
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-ink/15 px-6 text-sm font-medium text-ink transition duration-300 hover:border-electric hover:bg-electric/5"
          >
            <span>Follow on Instagram</span>
            <span aria-hidden="true">→</span>
          </a>
          <p className="mt-4 text-xs leading-5 text-graphite/55">
            Personal notes only. For venture updates and ecosystem
            conversations, LinkedIn remains the main channel.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {instagramFieldNotes.map((item) => (
            <article
              key={item.src}
              className="group relative aspect-square overflow-hidden rounded-sm bg-ink shadow-quiet even:translate-y-3"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 18vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-white/82 drop-shadow-sm">
                  {item.label}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StrategicSession() {
  const sessionBullets = [
    "startup / venture crash-test",
    "fundraising and investor-readiness review",
    "partnership or ecosystem strategy",
    "human-centered technology and innovation positioning",
    "personal strategic sparring",
  ];

  return (
    <section className="bg-bone py-10 text-ink sm:py-12" id="strategic-session">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 rounded-sm border border-ink/10 bg-bone p-6 shadow-quiet sm:p-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
              Paid Consultation
            </p>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.025em] text-balance sm:text-4xl">
              Book a Strategic Session
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-graphite/75">
              For founders, operators, investors, and partners who need a clear
              external perspective, a sharp challenge to their idea, or a
              practical route through a complex decision.
            </p>
            <p className="mt-5 text-sm leading-6 text-graphite/58">
              Paid consultation. Best for concrete questions, complex
              decisions, or early collaboration fit.
            </p>
          </div>
          <div>
            <ul className="grid gap-3 text-sm leading-6 text-graphite/76 sm:grid-cols-2">
              {sessionBullets.map((item) => (
                <li className="flex gap-3" key={item}>
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={socialLinks.strategicSession}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-md border border-electric bg-electric px-6 text-sm font-medium text-white transition duration-300 hover:bg-blue-700"
            >
              Book 1-hour strategic session
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialContactLinks() {
  const links = [
    {
      name: "Telegram",
      href: socialLinks.telegram,
      mark: "telegram" as const,
      text: "Fast notes and direct coordination",
    },
    {
      name: "WhatsApp",
      href: socialLinks.whatsapp,
      mark: "whatsapp" as const,
      text: "Simple conversation starter",
    },
    {
      name: "Instagram",
      href: socialLinks.instagram,
      mark: "instagram" as const,
      text: "Field notes from travel and projects",
    },
  ];

  return (
    <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
      {links.map((link) => (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-sm font-medium text-graphite transition hover:text-electric"
          key={link.name}
          aria-label={`Contact Alex Lindholm on ${link.name}`}
        >
          <span className="text-ink" aria-hidden="true">
            <SocialMark type={link.mark} />
          </span>
          <span>{link.name}</span>
          <span className="sr-only">
            {link.text}
          </span>
        </a>
      ))}
    </div>
  );
}

function SocialMark({
  type,
}: {
  type: "linkedin" | "telegram" | "whatsapp" | "instagram";
}) {
  if (type === "linkedin") {
    return <span className="text-sm font-semibold leading-none">in</span>;
  }

  const common = "h-4 w-4";

  if (type === "telegram") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path
          d="M20.4 4.8 3.7 11.3c-.8.3-.8 1.4.1 1.6l4.1 1.2 1.6 4.8c.3.8 1.3.9 1.8.2l2.2-3 4.3 3.1c.7.5 1.6.1 1.8-.7l2.4-12.3c.2-.9-.7-1.7-1.6-1.4Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="m8 14 8.2-5.1-5.8 7.2"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path
          d="M5.5 19.1 6.4 16A7.5 7.5 0 1 1 9 18.4l-3.5.7Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M9.6 8.6c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.6 1.4c.1.3.1.5-.1.7l-.4.5c.6 1.1 1.4 1.9 2.6 2.5l.5-.5c.2-.2.4-.2.7-.1l1.4.6c.3.1.4.3.4.6v.4c0 .4-.1.7-.5.9-.7.4-1.7.4-3-.2-1.6-.7-3-1.8-4-3.2-.9-1.3-1.2-2.5-.9-3.2Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
      <rect
        x="5"
        y="5"
        width="14"
        height="14"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16.4" cy="7.7" r="1" fill="currentColor" />
    </svg>
  );
}

function LinkedInProfileCard({
  tone,
  compact = false,
}: {
  tone: "dark" | "light";
  compact?: boolean;
}) {
  const isDark = tone === "dark";
  const shellClass = isDark
    ? "border-bone/16 bg-bone text-bone shadow-quiet"
    : "border-ink/10 bg-bone text-ink shadow-quiet";
  const mutedTextClass = isDark ? "text-graphite/68" : "text-graphite/70";
  const fineTextClass = isDark ? "text-bone/54" : "text-graphite/56";

  return (
    <aside
      className={`overflow-hidden rounded-sm border backdrop-blur-md ${shellClass}`}
      aria-label="Alex Lindholm LinkedIn profile"
    >
      <div className={`relative overflow-hidden bg-[linear-gradient(135deg,#10131A_0%,#4A3A63_72%,#2B3038_100%)] ${compact ? "h-16" : "h-20"}`}>
        {compact ? (
          <Image
            src="/media/linkedin-banner.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 34vw, 100vw"
            className="object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/22 via-transparent to-ink/30" />
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-sm border border-bone/18 bg-ink/42 px-3 py-2 text-[0.66rem] font-medium uppercase tracking-[0.14em] text-bone">
          <span
            className="flex h-5 w-5 items-center justify-center rounded-[3px] bg-bone text-[0.62rem] font-bold text-ink"
            aria-hidden="true"
          >
            in
          </span>
          LinkedIn Profile
        </div>
      </div>

      <div className={`px-4 pb-4 ${compact ? "text-[0.94rem]" : ""}`}>
        <div className="-mt-8 flex items-end justify-between gap-4">
          <div className={`flex items-center justify-center rounded-full border-4 border-paper bg-ink text-bone shadow-quiet ${compact ? "h-14 w-14" : "h-16 w-16"}`}>
            <span className="text-sm font-semibold tracking-[0.08em]">AL</span>
          </div>
          <p className={`pb-1.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] ${fineTextClass}`}>
            500+ connections
          </p>
        </div>

        <h3 className={`mt-3 font-medium leading-tight tracking-[-0.015em] ${compact ? "text-lg" : "text-xl"}`}>
          Alex P. Lindholm
        </h3>
        <p className={`mt-2 text-sm ${compact ? "leading-5" : "leading-6"} ${mutedTextClass}`}>
          I stress-test startups before they waste time and money. Founder
          advisor, venture architect, and practical connector for VC,
          fundraising, and consultation.
        </p>

        <div
          className={`mt-4 gap-2 border-t pt-4 ${compact ? "hidden text-xs sm:grid" : "grid text-sm"} ${
            isDark ? "border-ink/10" : "border-ink/10"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <span className={fineTextClass}>Location</span>
            <span className="text-right">Rotterdam and The Hague</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className={fineTextClass}>Companies</span>
            <span className="text-right">InspireXchange, Masterschool</span>
          </div>
        </div>

        <p className={`mt-4 text-xs leading-5 ${fineTextClass} ${compact ? "hidden sm:block" : ""}`}>
          Follow ongoing projects, essays, and ecosystem perspectives on
          startups, ethical technology, venture building, and long-term
          collaborations.
        </p>
      </div>

      <a
        href={socialLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer me"
        aria-label="Connect with Alex Lindholm on LinkedIn"
        className={`mx-4 mb-4 inline-flex w-[calc(100%-2rem)] items-center justify-center gap-3 rounded-md border px-5 text-sm font-medium transition duration-300 ${compact ? "min-h-10" : "min-h-11"} ${
          isDark
            ? "border-bone bg-bone text-ink hover:bg-paper"
            : "border-ink bg-ink text-bone hover:bg-graphite"
        }`}
      >
        <SocialMark type="linkedin" />
        <span>Connect on LinkedIn</span>
        <span aria-hidden="true">→</span>
      </a>
    </aside>
  );
}

function Footer() {
  return (
    <footer className="bg-bone px-5 py-8 text-ink sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-ink/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-[-0.01em]">Alex Lindholm</p>
          <p className="mt-2 text-sm text-graphite/58">
            Venture architecture, human-centered innovation, and ecosystem
            partnerships.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm sm:items-end">
          <div className="flex flex-wrap gap-x-4 gap-y-2 sm:justify-end">
            <a href="/speaking" className="text-graphite/55 transition hover:text-ink">
              Speaking
            </a>
            <a href="/human-centered-ai" className="text-graphite/55 transition hover:text-ink">
              Human-Centered AI
            </a>
            <a href="/startup-mentor" className="text-graphite/55 transition hover:text-ink">
              Startup Mentor
            </a>
            <a href="/consulting" className="text-graphite/55 transition hover:text-ink">
              Consulting
            </a>
            <a href="/media" className="text-graphite/55 transition hover:text-ink">
              Media
            </a>
          </div>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer me"
            aria-label="Alex Lindholm LinkedIn profile"
            className="font-medium text-ink underline decoration-ink/25 underline-offset-8 transition hover:decoration-ink"
          >
            Connect on LinkedIn
          </a>
          <a
            href={socialLinks.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-graphite/55 transition hover:text-ink"
          >
            Telegram
          </a>
          <a
            href={socialLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-graphite/55 transition hover:text-ink"
          >
            WhatsApp
          </a>
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-graphite/55 transition hover:text-ink"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
