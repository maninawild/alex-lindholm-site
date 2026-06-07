import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLink } from "@/components/arrow-link";
import { SectionHeader } from "@/components/section-header";
import { SiteHeader } from "@/components/site-header";

const consultationUrl = "https://zcal.co/axlindholm/1hour";
const linkedinUrl = "https://www.linkedin.com/in/axlindholm/";
const whatsappUrl = "https://wa.me/message/4OIGQ3FHUZQSD1";

export const metadata: Metadata = {
  title: "Lectures & Speaking",
  description:
    "Invite Alex Lindholm for interactive lectures, workshops, cultural salons, university sessions, and private talks on AI, society, Jewish culture, ethics, entrepreneurship, and the human future.",
  openGraph: {
    title: "Lectures & Speaking | Alex Lindholm",
    description:
      "Interactive sessions on AI, society, Jewish culture, ethics, communities, entrepreneurship, and the human future.",
    url: "/lectures-and-speaking",
  },
};

const credibility = [
  "4.6/5+ audience rating",
  "1000+ lectures, workshops & strategy sessions",
  "Erasmus University guest lecturer",
  "Paideia / Yad Vashem / BCI / ANU background",
  "65+ countries explored",
];

const backgroundPrograms = [
  "St. Petersburg State University — Social History, History of Business and Management",
  "NRU HSE St. Petersburg — Social Project Manager",
  "Lehava Leadership Program — St. Petersburg / Cleveland",
  "Paideia — The European Institute for Jewish Studies in Sweden",
  "Yad Vashem — Teaching the Holocaust, Course for Educators",
  "Ziering Brandeis Collegiate Institute / BCI — American Jewish University",
  "ANU Museum of the Jewish People — Internship Program, Tel Aviv",
  "InspireXchange.nl Accelerator — co-founder / program director",
  "Erasmus University Rotterdam — guest lecturer, Arts and Culture",
];

const sessionFlow = [
  {
    title: "Short impulse lecture",
    text: "A clear opening frame with stories, context, and enough structure for the room to enter the topic.",
  },
  {
    title: "Audience voting / fast questions",
    text: "Quick polls, provocations, and reactions that show what people actually think before the discussion begins.",
  },
  {
    title: "Texts, cases or film fragments",
    text: "Source material, examples, media, and real dilemmas that make abstract topics visible and human.",
  },
  {
    title: "Open discussion / reflection",
    text: "The room gets space to argue, laugh, disagree, connect the topic to life, and leave with better questions.",
  },
];

const topicClusters = [
  {
    title: "AI, power & personal freedom",
    framing:
      "For rooms trying to understand what technology changes in everyday autonomy, media, institutions, and trust.",
    examples: [
      "Digital transformation and the challenges of AI",
      "Media, power and personal freedom",
      "Responsible AI in real communities",
    ],
    formats: ["lecture", "workshop", "corporate session"],
  },
  {
    title: "Religion, ethics & future technology",
    framing:
      "For audiences interested in what should remain human when machines become more capable.",
    examples: [
      "Will AI replace a rabbi?",
      "Technology, authority and religious life",
      "Transhumanism and spiritual continuity",
    ],
    formats: ["salon", "private talk", "cafe-midrash"],
  },
  {
    title: "Jewish culture, humor & identity",
    framing:
      "Warm, serious, and often funny sessions on memory, community, survival, identity, and cultural language.",
    examples: [
      "Jewish humor through the 20th century",
      "Jewish activism: choice or commandment?",
      "Jewish communities around the world",
    ],
    formats: ["lecture", "salon", "cafe-midrash"],
  },
  {
    title: "Justice, war & human conflict",
    framing:
      "Difficult conversations about responsibility, institutions, violence, ethics, and public justice.",
    examples: [
      "The Hague as infrastructure of justice",
      "Judaism and the ethics of war",
      "Why war criminals must be brought to court",
    ],
    formats: ["lecture", "discussion", "university class"],
  },
  {
    title: "Cities, memory & public space",
    framing:
      "Sessions on how streets, buildings, monuments, borders, and city life shape conflict and belonging.",
    examples: [
      "Flesh and Stone: conflict in European cities",
      "Memory and public space",
      "Cities as social infrastructure",
    ],
    formats: ["lecture", "walkshop", "salon"],
  },
  {
    title: "Entrepreneurship, ecosystems & human-centered innovation",
    framing:
      "For founder groups and innovation teams that want more than startup vocabulary and pitch-deck theater.",
    examples: [
      "Europe, ecosystems and the future of entrepreneurship",
      "Founder psychology and venture readiness",
      "Human-centered innovation in practice",
    ],
    formats: ["workshop", "private talk", "corporate session"],
  },
];

type FeaturedSession = {
  title: string;
  subtitle?: string;
  text: string;
  image?: string;
  imageAlt?: string;
  highlight?: boolean;
};

const featuredSessions: FeaturedSession[] = [
  {
    title: "Swipe Is Dead. But I Am Not.",
    subtitle:
      "Experiments in LoveTech Business Models — and What Fundraising Has in Common",
    text: "A session about matching systems, incentives, funnels, marketplace design, rejection, narrative building, and what dating apps reveal about fundraising and human decision-making.",
    highlight: true,
  },
  {
    title: "Digital Transformation & AI: Media, Power and Personal Freedom",
    text: "A session about how AI reshapes society at the level of state, community, and personal ethics.",
    image: "/media/speaking/digital-transformation-ai-lecture.jpg",
    imageAlt:
      "Alex Lindholm lecturing at Erasmus University Rotterdam on digital transformation and the future of AI",
  },
  {
    title: "Will AI Replace a Rabbi?",
    text: "A discussion on artificial intelligence, religion, authority, and what communities should or should not outsource to machines.",
    image: "/media/speaking/ai-rabbi-lecture.jpg",
    imageAlt:
      "Alex Lindholm leading an interactive discussion connected to the Will AI Replace a Rabbi lecture",
  },
  {
    title: "Jewish Humor Through the 20th Century",
    text: "A serious conversation through jokes, trauma, survival, identity, and the strange wisdom of laughing when history is not funny.",
  },
  {
    title: "The Hague as Infrastructure of Justice",
    text: "A lecture on international tribunals, public justice, and why war criminals must be brought to court.",
  },
  {
    title: "Judaism and the Ethics of War",
    text: "An interactive session on just war, moral responsibility, and Jewish legal and ethical traditions.",
  },
  {
    title: "Transhumanism: What Could Judaism Look Like in 239 Years?",
    text: "An experimental lecture about future humans, old texts, technology, bodies, identity, and spiritual continuity.",
  },
];

const detailBadges = [
  "60-90 min",
  "Online / Offline",
  "English or Russian",
  "Interactive format",
  "University / Community / Private salon / Corporate session",
];

export default function LecturesAndSpeakingPage() {
  return (
    <main className="bg-bone pt-20 text-ink sm:pt-24">
      <SiteHeader transparentAtTop={false} />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[0.92fr_0.72fr] lg:items-center lg:pt-12">
        <div>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
            Lectures & Speaking
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-medium leading-[1.08] tracking-[-0.03em] text-balance sm:text-5xl">
            Lectures that feel like conversations.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite/76">
            Interactive sessions on AI, society, Jewish culture, ethics,
            communities, entrepreneurship, and the human future, built for
            people who want to think, argue, laugh, and leave with better
            questions.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {detailBadges.slice(0, 4).map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-ink/12 px-4 py-2 text-sm text-graphite/72"
              >
                {badge}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ArrowLink href={consultationUrl} label="Discuss a lecture" />
            <ArrowLink href={linkedinUrl} label="Connect on LinkedIn" variant="lineDark" />
          </div>
        </div>

        <div className="relative flex min-h-[430px] items-center justify-center overflow-hidden rounded-sm bg-ink shadow-premium">
          <Image
            src="/media/speaking/ZaSkobkamy2.jpg"
            alt="Alex Lindholm speaking during an interactive session"
            fill
            priority
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/84 via-ink/18 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/72">
              Live room format
            </p>
            <div className="mt-4 grid gap-2 text-sm leading-6 text-white/86 sm:grid-cols-2">
              <span>Discussion prompts</span>
              <span>Audience voting</span>
              <span>Matching systems</span>
              <span>Marketplace cases</span>
            </div>
          </div>
        </div>
      </section>

      <CredibilityStrip />
      <BackgroundPrograms />
      <HowSessionsWork />
      <SwipeIsDeadHighlight />
      <TopicClusters />
      <FeaturedSessions />
      <InviteCta />
      <WhatsAppCta />
    </main>
  );
}

function CredibilityStrip() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-8">
      <div className="grid gap-x-8 gap-y-5 border-y border-ink/10 py-7 sm:grid-cols-2 lg:grid-cols-5">
        {credibility.map((item) => (
          <p
            className="border-l border-ink/10 pl-4 text-sm font-medium leading-6 text-graphite/78"
            key={item}
          >
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}

function BackgroundPrograms() {
  return (
    <section className="bg-bone pb-14 text-ink">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-7 border-b border-ink/10 pb-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
              Background
            </p>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.02em] text-balance sm:text-4xl">
              Education, cultural work and live-room experience.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-graphite/72">
              The lectures draw from history, leadership programs, Jewish
              studies, educator training, community work, startup acceleration,
              and university teaching.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {backgroundPrograms.map((program) => (
              <p
                key={program}
                className="rounded-sm border border-ink/8 px-4 py-3 text-sm leading-6 text-graphite/72"
              >
                {program}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowSessionsWork() {
  return (
    <section className="section bg-bone">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="How The Sessions Work"
          title="A serious topic does not need to become a passive room."
          intro="Most sessions combine structure with participation: enough context to be useful, enough friction to stay alive."
        />
        <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {sessionFlow.map((item, index) => (
            <article
              key={item.title}
              className="rounded-sm border border-ink/8 bg-bone p-5 shadow-quiet"
            >
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-copper">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-6 text-xl font-semibold leading-tight tracking-[-0.015em]">
                {item.title}
              </h2>
              <p className="mt-4 text-sm leading-6 text-graphite/70">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SwipeIsDeadHighlight() {
  const tags = [
    "Interactive",
    "60-90 min",
    "University",
    "Founder Community",
    "Innovation Event",
    "Corporate Innovation",
    "English / Russian",
  ];

  const parallels = [
    "dating",
    "fundraising",
    "investor matching",
    "stakeholder relationships",
    "commitment systems",
    "incentives",
    "rejection",
    "narrative building",
  ];

  const supportingImages = [
    {
      src: "/media/speaking/swipe-audience.jpg",
      alt: "Audience listening during the Swipe Is Dead lecture",
      label: "Audience",
    },
    {
      src: "/media/speaking/swipe-model-spectrum-live.jpg",
      alt: "Alex explaining the LoveTech business model spectrum",
      label: "Interaction",
    },
  ];

  return (
    <section className="section bg-bone">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-8">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
              Featured Lecture
            </p>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.02em] text-balance sm:text-4xl">
              Swipe Is Dead. But I Am Not.
            </h2>
            <p className="mt-4 text-lg leading-8 text-graphite/78">
              Experiments in LoveTech Business Models — and What Fundraising Has
              in Common.
            </p>
            <p className="mt-5 text-base leading-7 text-graphite/72">
              This is not a dating talk. It is a talk about matching systems,
              incentives, funnels, human behavior, and marketplace design.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  className="rounded-full border border-ink/12 px-3 py-1.5 text-xs font-medium text-graphite/68"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="relative flex min-h-[430px] items-center justify-center overflow-hidden rounded-sm bg-ink shadow-premium">
              <Image
                src="/media/speaking/swipe-matching-markets.jpg"
                alt="Alex Lindholm presenting Swipe Is Dead. But I Am Not"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/86 via-ink/16 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/70">
                  Human Systems, LoveTech & Matching Markets
                </p>
                <p className="mt-3 max-w-xl text-lg leading-7 text-white/88">
                  What dating apps, startup fundraising, investor matching,
                  marketplaces and human decision-making have in common.
                </p>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-[1fr_0.72fr]">
              <article className="rounded-sm border border-ink/8 bg-bone p-5 shadow-quiet">
                <p className="text-sm font-semibold text-ink">Speaker frame</p>
                <p className="mt-3 text-sm leading-6 text-graphite/72">
                  Alex P. Lindholm is Founder & Managing Partner of
                  InspireXchange.nl Accelerator. By day he works with startups
                  on product validation, fundraising, startup visas,
                  investor-founder matching, PMF and human-centric innovation.
                  By night he studies dating apps as matching systems and
                  behavioral marketplaces.
                </p>
              </article>
              <article className="rounded-sm border border-ink/8 bg-bone p-5 shadow-quiet">
                <p className="text-sm font-semibold text-ink">Fun fact</p>
                <p className="mt-3 text-sm leading-6 text-graphite/72">
                  In 2025 Alex consistently kept between 6 and 12 dating apps
                  active simultaneously as part of his ongoing research into
                  matching systems and platform behavior.
                </p>
              </article>
            </div>

            <div className="rounded-sm border border-ink/8 bg-bone p-5 shadow-quiet">
              <p className="max-w-3xl text-base leading-7 text-graphite/76">
                Why do dating apps feel exhausting, and why does startup
                fundraising often feel the same? Is more choice helping people
                connect, or quietly killing commitment? Through real-world
                experiments, audience interaction, and examples from LoveTech
                platforms, the session asks whether we are building systems
                that help people connect, or systems that profit from keeping
                them searching.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {parallels.map((item) => (
                  <span
                    className="rounded-full bg-ink/[0.035] px-3 py-1.5 text-xs font-medium text-graphite/64"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {supportingImages.map((item) => (
                <article
                  className="relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-sm bg-ink shadow-quiet"
                  key={item.src}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 28vw, 100vw"
                    className="object-contain"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/72 to-transparent p-4">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/82">
                      {item.label}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <figure className="rounded-sm border border-ink/10 bg-ink p-6 text-white shadow-premium">
              <div>
                <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-white/52">
                  Participant feedback
                </p>
                <blockquote className="mt-4 text-2xl font-medium leading-snug tracking-[-0.02em] text-balance">
                  “loooove the way and concept @alexplindholm shared his
                  experience and business models in LoveTech”
                </blockquote>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

function TopicClusters() {
  return (
    <section className="section bg-bone">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Topic Clusters"
          title="Questions people can actually enter."
          intro="Each theme can become a lecture, workshop, university session, cafe-midrash, private salon, or corporate discussion."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {topicClusters.map((cluster) => (
            <article
              key={cluster.title}
              className="rounded-sm border border-ink/8 bg-bone p-5 shadow-quiet"
            >
              <h2 className="text-2xl font-semibold leading-tight tracking-[-0.02em]">
                {cluster.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-graphite/74">
                {cluster.framing}
              </p>
              <div className="mt-5 grid gap-2">
                {cluster.examples.map((example) => (
                  <p
                    key={example}
                    className="border-l border-ink/10 pl-3 text-sm leading-6 text-graphite/68"
                  >
                    {example}
                  </p>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {cluster.formats.map((format) => (
                  <span
                    key={format}
                    className="rounded-full bg-ink/[0.035] px-3 py-1.5 text-xs font-medium text-graphite/64"
                  >
                    {format}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedSessions() {
  return (
    <section className="section bg-bone">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr]">
          <SectionHeader
            eyebrow="Featured Sessions"
            title="Sessions that usually open real conversation."
            intro="The titles are starting points. The best version is always adapted to the audience, context, and level of curiosity in the room."
          />
          <div className="grid gap-3">
            {featuredSessions.map((session) => (
              <article
                key={session.title}
                className={`rounded-sm border border-ink/8 bg-bone p-5 shadow-quiet ${
                  session.highlight ? "md:grid md:grid-cols-[0.58fr_1fr] md:gap-5" : ""
                }`}
              >
                {session.image ? (
                  <div className="relative mb-5 flex min-h-[320px] items-center justify-center overflow-hidden rounded-sm bg-ink md:mb-0">
                    <Image
                      src={session.image}
                      alt={session.imageAlt ?? session.title}
                      fill
                      sizes="(min-width: 1024px) 28vw, 100vw"
                      className="object-contain"
                    />
                  </div>
                ) : null}
                <div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <h2 className="max-w-2xl text-xl font-semibold leading-tight tracking-[-0.015em]">
                    {session.title}
                  </h2>
                  <span className="w-fit shrink-0 rounded-full border border-ink/12 px-3 py-1.5 text-xs font-medium text-graphite/60">
                    60-90 min
                  </span>
                </div>
                {session.subtitle ? (
                  <p className="mt-3 text-sm font-medium leading-6 text-copper">
                    {session.subtitle}
                  </p>
                ) : null}
                <p className="mt-4 max-w-3xl text-base leading-7 text-graphite/72">
                  {session.text}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Interactive format", "Online / Offline", "English or Russian"].map(
                    (badge) => (
                      <span
                        key={badge}
                        className="rounded-full bg-ink/[0.035] px-3 py-1.5 text-xs font-medium text-graphite/64"
                      >
                        {badge}
                      </span>
                    ),
                  )}
                </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function InviteCta() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">
      <div className="grid gap-8 rounded-sm border border-ink/10 bg-bone p-6 shadow-quiet sm:p-8 lg:grid-cols-[1fr_0.72fr] lg:items-center">
        <div>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
            Invite Alex
          </p>
          <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.02em] text-balance sm:text-4xl">
            Invite Alex for a lecture, salon or private session.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-graphite/75">
            Best for universities, communities, cultural organizations, founder
            groups, innovation teams, and private rooms where people are ready
            for a real conversation.
          </p>
          <p className="mt-4 text-sm leading-6 text-graphite/58">
            Formats can be adapted for university, community, private salon, or
            corporate sessions.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <ArrowLink href={consultationUrl} label="Discuss a lecture" />
          <ArrowLink href={linkedinUrl} label="Connect on LinkedIn" variant="lineDark" />
        </div>
      </div>
    </section>
  );
}

function WhatsAppCta() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
      <div className="rounded-sm border border-ink/10 bg-ink p-6 text-white shadow-premium sm:p-8 lg:p-10">
        <div className="grid gap-7 lg:grid-cols-[1fr_0.56fr] lg:items-center">
          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-white/56">
              Direct Message
            </p>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.02em] text-balance sm:text-4xl">
              Let&apos;s continue the conversation.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/72">
              Questions about a lecture, workshop, private salon, university
              session, or custom topic? Send me a message directly.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-md border border-white bg-white px-6 text-base font-semibold text-ink transition duration-300 hover:bg-white/90"
              aria-label="Message Alex Lindholm on WhatsApp"
            >
              <span aria-hidden="true">WhatsApp</span>
              <span>Message on WhatsApp</span>
              <span aria-hidden="true">→</span>
            </a>
            <a
              href={consultationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-white/24 px-6 text-sm font-medium text-white transition duration-300 hover:border-white/55 hover:bg-white/8"
            >
              <span>Book a strategic call</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
