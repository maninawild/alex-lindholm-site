import { translator, localizedHref, type Locale } from "@/lib/i18n";
import Image, { type StaticImageData } from "next/image";
import liveRoomPhoto from "@/public/media/speaking/ZaSkobkamy2.jpg";
import matchingPhoto from "@/public/media/speaking/swipe-matching-markets.jpg";
import audiencePhoto from "@/public/media/speaking/swipe-audience.jpg";
import interactionPhoto from "@/public/media/speaking/swipe-model-spectrum-live.jpg";
import digitalLecturePhoto from "@/public/media/speaking/digital-transformation-ai-lecture.jpg";
import rabbiLecturePhoto from "@/public/media/speaking/ai-rabbi-lecture.jpg";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { ArrowLink } from "@/components/arrow-link";
import { SectionHeader } from "@/components/section-header";
import { SiteHeader } from "@/components/site-header";
import { TestimonialsSection } from "@/components/testimonials-section";
import { getEventBySlug } from "@/data/events";
export function SpeakingContent({locale="en"}:{locale?:Locale}) {
 const t=translator(locale); const href=(v:string)=>localizedHref(v,locale);


const consultationUrl = "https://zcal.co/axlindholm/1hour";
const linkedinUrl = "https://www.linkedin.com/in/axlindholm/";
const whatsappUrl = "https://wa.me/message/4OIGQ3FHUZQSD1";



const credibility = [
  t("4.6/5+ audience rating"),
  t("500+ lectures, workshops & strategy sessions"),
  t("Erasmus University guest lecturer"),
  t("Paideia / Yad Vashem / BCI / ANU background"),
  t("65+ countries explored"),
];

const backgroundPrograms = [
  t("St. Petersburg State University — Social History, History of Business and Management"),
  t("NRU HSE St. Petersburg — Social Project Manager"),
  t("Lehava Leadership Program — St. Petersburg / Cleveland"),
  t("Paideia — The European Institute for Jewish Studies in Sweden"),
  t("Yad Vashem — Teaching the Holocaust, Course for Educators"),
  "Ziering Brandeis Collegiate Institute / BCI — American Jewish University",
  t("ANU Museum of the Jewish People — Internship Program, Tel Aviv"),
  t("InspireXchange.nl Accelerator — co-founder / program director"),
  t("Erasmus University Rotterdam — guest lecturer, Arts and Culture"),
];

const sessionFlow = [
  {
    title: t("Short impulse lecture"),
    text: t("A clear opening frame with stories, context, and enough structure for the room to enter the topic."),
  },
  {
    title: t("Audience voting / fast questions"),
    text: t("Quick polls, provocations, and reactions that show what people actually think before the discussion begins."),
  },
  {
    title: t("Texts, cases or film fragments"),
    text: t("Source material, examples, media, and real dilemmas that make abstract topics visible and human."),
  },
  {
    title: t("Open discussion / reflection"),
    text: t("The room gets space to argue, laugh, disagree, connect the topic to life, and leave with better questions."),
  },
];

const topicClusters = [
  {
    title: t("AI, power & personal freedom"),
    framing:
      t("For rooms trying to understand what technology changes in everyday autonomy, media, institutions, and trust."),
    examples: [
      t("Digital transformation and the challenges of AI"),
      t("Media, power and personal freedom"),
      t("Responsible AI in real communities"),
    ],
    formats: [t("lecture"), t("workshop"), t("corporate session")],
  },
  {
    title: t("Religion, ethics & future technology"),
    framing:
      t("For audiences interested in what should remain human when machines become more capable."),
    examples: [
      t("Will AI replace a rabbi?"),
      t("Technology, authority and religious life"),
      t("Transhumanism and spiritual continuity"),
    ],
    formats: [t("salon"), t("private talk"), t("cafe-midrash")],
  },
  {
    title: t("Jewish culture, humor & identity"),
    framing:
      t("Warm, serious, and often funny sessions on memory, community, survival, identity, and cultural language."),
    examples: [
      t("Jewish humor through the 20th century"),
      t("Jewish activism: choice or commandment?"),
      t("Jewish communities around the world"),
    ],
    formats: [t("lecture"), t("salon"), t("cafe-midrash")],
  },
  {
    title: t("Justice, war & human conflict"),
    framing:
      t("Difficult conversations about responsibility, institutions, violence, ethics, and public justice."),
    examples: [
      t("The Hague as infrastructure of justice"),
      t("Judaism and the ethics of war"),
      t("Why war criminals must be brought to court"),
    ],
    formats: [t("lecture"), t("discussion"), t("university class")],
  },
  {
    title: t("Cities, memory & public space"),
    framing:
      t("Sessions on how streets, buildings, monuments, borders, and city life shape conflict and belonging."),
    examples: [
      t("Flesh and Stone: conflict in European cities"),
      t("Memory and public space"),
      t("Cities as social infrastructure"),
    ],
    formats: [t("lecture"), t("walkshop"), t("salon")],
  },
  {
    title: t("Entrepreneurship, ecosystems & human-centered innovation"),
    framing:
      t("For founder groups and innovation teams that want more than startup vocabulary and pitch-deck theater."),
    examples: [
      t("Europe, ecosystems and the future of entrepreneurship"),
      t("Founder psychology and venture readiness"),
      t("Human-centered innovation in practice"),
    ],
    formats: [t("workshop"), t("private talk"), t("corporate session")],
  },
];

type FeaturedSession = {
  title: string;
  subtitle?: string;
  text: string;
  image?: StaticImageData;
  imageAlt?: string;
  highlight?: boolean;
};

const featuredSessions: FeaturedSession[] = [
  {
    title: t("Swipe Is Dead. But I Am Not."),
    subtitle:
      t("Experiments in LoveTech Business Models — and What Fundraising Has in Common"),
    text: t("A session about matching systems, incentives, funnels, marketplace design, rejection, narrative building, and what dating apps reveal about fundraising and human decision-making."),
    highlight: true,
  },
  {
    title: t("Digital Transformation & AI: Media, Power and Personal Freedom"),
    text: t("A session about how AI reshapes society at the level of state, community, and personal ethics."),
    image: digitalLecturePhoto,
    imageAlt:
      t("Alex Lindholm lecturing at Erasmus University Rotterdam on digital transformation and the future of AI"),
  },
  {
    title: t("Will AI Replace a Rabbi?"),
    text: t("A discussion on artificial intelligence, religion, authority, and what communities should or should not outsource to machines."),
    image: rabbiLecturePhoto,
    imageAlt:
      t("Alex Lindholm leading an interactive discussion connected to the Will AI Replace a Rabbi lecture"),
  },
  {
    title: t("Jewish Humor Through the 20th Century"),
    text: t("A serious conversation through jokes, trauma, survival, identity, and the strange wisdom of laughing when history is not funny."),
  },
  {
    title: t("The Hague as Infrastructure of Justice"),
    text: t("A lecture on international tribunals, public justice, and why war criminals must be brought to court."),
  },
  {
    title: t("Judaism and the Ethics of War"),
    text: t("An interactive session on just war, moral responsibility, and Jewish legal and ethical traditions."),
  },
  {
    title: t("Transhumanism: What Could Judaism Look Like in 239 Years?"),
    text: t("An experimental lecture about future humans, old texts, technology, bodies, identity, and spiritual continuity."),
  },
];

const detailBadges = [
  t("60-90 min"),
  t("Online / Offline"),
  t("Session language agreed in advance"),
  t("Interactive format"),
  t("University / Community / Private salon / Corporate session"),
];



function Day42Highlight() {
  const event = getEventBySlug("build-night-4-mollie-amsterdam-tech-week-2026");
  if (!event) return null;

  const eventPath = `/events/${event.slug}`;
  const [audiencePhoto, roomPhoto, , , , , conversationPhoto, speakerPhoto] =
    event.galleryImages;
  const moments = [
    { src: audiencePhoto, alt: "The DAY42 Build Night audience at Mollie in Amsterdam" },
    { src: roomPhoto, alt: "Alex Lindholm presenting to the DAY42 Build Night audience" },
    { src: conversationPhoto, alt: "Alex Lindholm and a DAY42 host on stage at Mollie" },
  ];

  return (
    <section
      id="day42-build-night"
      aria-labelledby="day42-heading"
      className="mx-auto max-w-7xl px-5 pb-16 sm:px-8"
    >
      <div className="border-t border-ink/10 pt-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
              {t("Featured event ·")}{event.organizer}
            </p>
            <h2
              id="day42-heading"
              className="mt-4 text-3xl font-medium leading-tight tracking-[-0.02em] sm:text-4xl"
            >
              {event.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-graphite/70">
              {event.displayDate} · {event.location}
            </p>
            <p className="mt-6 text-xl font-medium leading-8 text-ink">
              {event.talkTitle}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-graphite/76">
              {event.shortDescription}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ArrowLink
                href={eventPath}
                label={`Event recap & all ${event.galleryImages.length} photos`}
              />
              {event.linkedInUrl ? (
                <ArrowLink href={event.linkedInUrl} label={t("LinkedIn recap")} variant="lineDark" />
              ) : null}
            </div>
          </div>
          <a
            href={eventPath}
            className="relative block aspect-[4/3] overflow-hidden rounded-sm bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric"
            aria-label={`See the photos and recap of ${event.title}`}
          >
            <Image
              src={speakerPhoto || event.coverImage}
              alt={t("Alex Lindholm speaking at DAY42 Build Night at Mollie during Amsterdam Tech Week")}
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover object-center"
            />
          </a>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {moments.filter((photo) => photo.src).map((photo) => (
            <a
              key={photo.src}
              href={eventPath}
              className="relative block aspect-[3/2] overflow-hidden rounded-sm bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric"
              aria-label={photo.alt}
            >
              <Image
                src={photo.src}
                alt={t(photo.alt)}
                fill
                sizes="(min-width: 640px) 30vw, 100vw"
                className="object-cover object-center"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function CredibilityStrip() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-8">
      <div className="grid gap-x-8 gap-y-5 border-y border-ink/10 py-7 sm:grid-cols-2 lg:grid-cols-5">
        {credibility.map((item) => (
          <p
            className="border-l border-ink/10 pl-4 text-sm font-medium leading-6 text-graphite/78"
            key={t(item)}
          >
            {t(item)}
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
              {t("Background")}</p>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.02em] text-balance sm:text-4xl">
              {t("Education, cultural work and live-room experience.")}</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-graphite/72">
              {t("The lectures draw from history, leadership programs, Jewish studies, educator training, community work, startup acceleration, and university teaching.")}</p>
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
          eyebrow={t("How The Sessions Work")}
          title={t("A serious topic does not need to become a passive room.")}
          intro={t("Most sessions combine structure with participation: enough context to be useful, enough friction to stay alive.")}
        />
        <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {sessionFlow.map((item, index) => (
            <article
              key={t(item.title)}
              className="rounded-sm border border-ink/8 bg-bone p-5 shadow-quiet"
            >
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-copper">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-6 text-xl font-semibold leading-tight tracking-[-0.015em]">
                {t(item.title)}
              </h2>
              <p className="mt-4 text-sm leading-6 text-graphite/70">
                {t(item.text)}
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
    t("Interactive"),
    t("60-90 min"),
    t("University"),
    t("Founder Community"),
    t("Innovation Event"),
    t("Corporate Innovation"),
    t("English / Russian"),
  ];

  const parallels = [
    t("dating"),
    t("fundraising"),
    t("investor matching"),
    t("stakeholder relationships"),
    t("commitment systems"),
    t("incentives"),
    t("rejection"),
    t("narrative building"),
  ];

  const supportingImages = [
    {
      src: audiencePhoto,
      alt: "Audience listening during the Swipe Is Dead lecture",
      label: t("Audience"),
    },
    {
      src: interactionPhoto,
      alt: "Alex explaining the LoveTech business model spectrum",
      label: t("Interaction"),
    },
  ];

  return (
    <section className="section bg-bone">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-8">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
              {t("Featured Lecture")}</p>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.02em] text-balance sm:text-4xl">
              {t("Swipe Is Dead. But I Am Not.")}</h2>
            <p className="mt-4 text-lg leading-8 text-graphite/78">
              {t("Experiments in LoveTech Business Models — and What Fundraising Has in Common.")}</p>
            <p className="mt-5 text-base leading-7 text-graphite/72">
              {t("This is not a dating talk. It is a talk about matching systems, incentives, funnels, human behavior, and marketplace design.")}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  className="rounded-full border border-ink/12 px-3 py-1.5 text-xs font-medium text-graphite/68"
                  key={t(tag)}
                >
                  {t(tag)}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <SpeakingPhoto src={matchingPhoto} alt={t("Alex Lindholm presenting Swipe Is Dead. But I Am Not")} sizes="(min-width: 1024px) 58vw, 100vw"
              caption={(
                <>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-graphite">{t("Human Systems, LoveTech & Matching Markets")}</p>
                  <p className="mt-3 max-w-xl text-lg leading-7 text-ink">{t("What dating apps, startup fundraising, investor matching, marketplaces and human decision-making have in common.")}</p>
                </>
              )}
            />

            <div className="grid gap-3 md:grid-cols-[1fr_0.72fr]">
              <article className="rounded-sm border border-ink/8 bg-bone p-5 shadow-quiet">
                <p className="text-sm font-semibold text-ink">{t("Speaker frame")}</p>
                <p className="mt-3 text-sm leading-6 text-graphite/72">
                  {t("Alex P. Lindholm is Founder & Managing Partner of InspireXchange.nl Accelerator. By day he works with startups on product validation, fundraising, startup visas, investor-founder matching, PMF and human-centric innovation. By night he studies dating apps as matching systems and behavioral marketplaces.")}</p>
              </article>
              <article className="rounded-sm border border-ink/8 bg-bone p-5 shadow-quiet">
                <p className="text-sm font-semibold text-ink">{t("Fun fact")}</p>
                <p className="mt-3 text-sm leading-6 text-graphite/72">
                  {t("In 2025 Alex consistently kept between 6 and 12 dating apps active simultaneously as part of his ongoing research into matching systems and platform behavior.")}</p>
              </article>
            </div>

            <div className="rounded-sm border border-ink/8 bg-bone p-5 shadow-quiet">
              <p className="max-w-3xl text-base leading-7 text-graphite/76">
                {t("Why do dating apps feel exhausting, and why does startup fundraising often feel the same? Is more choice helping people connect, or quietly killing commitment? Through real-world experiments, audience interaction, and examples from LoveTech platforms, the session asks whether we are building systems that help people connect, or systems that profit from keeping them searching.")}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {parallels.map((item) => (
                  <span
                    className="rounded-full bg-ink/[0.035] px-3 py-1.5 text-xs font-medium text-graphite/64"
                    key={t(item)}
                  >
                    {t(item)}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {supportingImages.map((item) => (
                <SpeakingPhoto key={item.src.src} src={item.src} alt={t(item.alt)} sizes="(min-width: 1024px) 28vw, 100vw"
                  caption={<p className="text-xs font-medium uppercase tracking-[0.18em] text-ink">{item.label}</p>}
                />
              ))}
            </div>

            <figure className="rounded-sm border border-ink/10 bg-ink p-6 text-white shadow-premium">
              <div>
                <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-white/52">
                  {t("Participant feedback")}</p>
                <blockquote className="mt-4 text-2xl font-medium leading-snug tracking-[-0.02em] text-balance">
                  {t("“loooove the way and concept @alexplindholm shared his experience and business models in LoveTech”")}</blockquote>
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
          eyebrow={t("Topic Clusters")}
          title={t("Questions people can actually enter.")}
          intro={t("Each theme can become a lecture, workshop, university session, cafe-midrash, private salon, or corporate discussion.")}
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {topicClusters.map((cluster) => (
            <article
              key={t(cluster.title)}
              className="rounded-sm border border-ink/8 bg-bone p-5 shadow-quiet"
            >
              <h2 className="text-2xl font-semibold leading-tight tracking-[-0.02em]">
                {t(cluster.title)}
              </h2>
              <p className="mt-4 text-base leading-7 text-graphite/74">
                {t(cluster.framing)}
              </p>
              <div className="mt-5 grid gap-2">
                {cluster.examples.map((example) => (
                  <p
                    key={t(example)}
                    className="border-l border-ink/10 pl-3 text-sm leading-6 text-graphite/68"
                  >
                    {t(example)}
                  </p>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {cluster.formats.map((format) => (
                  <span
                    key={t(format)}
                    className="rounded-full bg-ink/[0.035] px-3 py-1.5 text-xs font-medium text-graphite/64"
                  >
                    {t(format)}
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
            eyebrow={t("Featured Sessions")}
            title={t("Sessions that usually open real conversation.")}
            intro={t("The titles are starting points. The best version is always adapted to the audience, context, and level of curiosity in the room.")}
          />
          <div className="grid gap-3">
            {featuredSessions.map((session) => (
              <article
                key={t(session.title)}
                className={`rounded-sm border border-ink/8 bg-bone p-5 shadow-quiet ${
                  session.highlight ? "md:grid md:grid-cols-[0.58fr_1fr] md:gap-5" : ""
                }`}
              >
                {session.image ? (
                  <div className="mb-5 self-start md:mb-0">
                    <SpeakingPhoto src={session.image} alt={t(session.imageAlt ?? session.title)} sizes="(min-width: 1024px) 28vw, 100vw" />
                  </div>
                ) : null}
                <div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <h2 className="max-w-2xl text-xl font-semibold leading-tight tracking-[-0.015em]">
                    {t(session.title)}
                  </h2>
                  <span className="w-fit shrink-0 rounded-full border border-ink/12 px-3 py-1.5 text-xs font-medium text-graphite/60">
                    {t("60-90 min")}</span>
                </div>
                {session.subtitle ? (
                  <p className="mt-3 text-sm font-medium leading-6 text-copper">
                    {t(session.subtitle)}
                  </p>
                ) : null}
                <p className="mt-4 max-w-3xl text-base leading-7 text-graphite/72">
                  {t(session.text)}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {[t("Interactive format"), t("Online / Offline"), t("Session language agreed in advance")].map(
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
            {t("Invite Alex")}</p>
          <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.02em] text-balance sm:text-4xl">
            {t("Invite Alex for a lecture, salon or private session.")}</h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-graphite/75">
            {t("Best for universities, communities, cultural organizations, founder groups, innovation teams, and private rooms where people are ready for a real conversation.")}</p>
          <p className="mt-4 text-sm leading-6 text-graphite/58">
            {t("Formats can be adapted for university, community, private salon, or corporate sessions.")}</p>
        </div>
        <div className="flex flex-col gap-3">
          <ArrowLink href={consultationUrl} label={t("Discuss a lecture")} />
          <ArrowLink href={linkedinUrl} label={t("Connect on LinkedIn")} variant="lineDark" />
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
              {t("Direct Message")}</p>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.02em] text-balance sm:text-4xl">
              {t("Let's continue the conversation.")}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/72">
              {t("Questions about a lecture, workshop, private salon, university session, or custom topic? Send me a message directly.")}</p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-md border border-white bg-white px-6 text-base font-semibold text-ink transition duration-300 hover:bg-white/90"
              aria-label={t("Message Alex Lindholm on WhatsApp")}
            >
              <span aria-hidden="true">WhatsApp</span>
              <span>{t("Message on WhatsApp")}</span>
              <span aria-hidden="true">→</span>
            </a>
            <a
              href={consultationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-white/24 px-6 text-sm font-medium text-white transition duration-300 hover:border-white/55 hover:bg-white/8"
            >
              <span>{t("Book a strategic call")}</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Photo and caption have separate surfaces; natural dimensions preserve the full frame.
function SpeakingPhoto({ src, alt, sizes, priority = false, caption }: {
  src: StaticImageData;
  alt: string;
  sizes: string;
  priority?: boolean;
  caption?: ReactNode;
}) {
  return (
    <figure className="self-start overflow-hidden rounded-sm border border-ink/10 bg-white">
      <Image src={src} alt={alt} sizes={sizes} priority={priority} className="block h-auto w-full" />
      {caption ? <figcaption className="border-t border-ink/10 bg-white p-5 sm:p-6">{caption}</figcaption> : null}
    </figure>
  );
}



  return (
    <main lang={locale} className="bg-bone pt-20 text-ink sm:pt-24">
      <SiteHeader transparentAtTop={false} contentLanguage={locale} languageSwitch={{href: locale === "ru" ? "/lectures-and-speaking" : "/ru/lectures-and-speaking",label:locale === "ru" ? "EN" : "RU",ariaLabel:locale === "ru" ? "Read in English" : "Читать по-русски"}} />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[0.92fr_0.72fr] lg:items-center lg:pt-12">
        <div>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
            {t("Lectures & Speaking")}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-medium leading-[1.08] tracking-[-0.03em] text-balance sm:text-5xl">
            {t("Lectures that feel like conversations.")}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite/76">
            {t("Interactive sessions on AI, society, Jewish culture, ethics, communities, entrepreneurship, and the human future, built for people who want to think, argue, laugh, and leave with better questions.")}</p>
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
            <ArrowLink href={consultationUrl} label={t("Discuss a lecture")} />
            <ArrowLink href={linkedinUrl} label={t("Connect on LinkedIn")} variant="lineDark" />
          </div>
        </div>

        <SpeakingPhoto src={liveRoomPhoto} alt={t("Alex Lindholm speaking during an interactive session")} sizes="(min-width: 1024px) 38vw, 100vw" priority
          caption={(
            <>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-graphite">{t("Live room format")}</p>
              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm leading-6 text-ink">
                <span>{t("Discussion prompts")}</span><span>{t("Audience voting")}</span>
                <span>{t("Matching systems")}</span><span>{t("Marketplace cases")}</span>
              </div>
            </>
          )}
        />
      </section>

      <Day42Highlight />
      <CredibilityStrip />
      <BackgroundPrograms />
      <HowSessionsWork />
      <SwipeIsDeadHighlight />
      <TopicClusters />
      <FeaturedSessions />
      <TestimonialsSection locale={locale} />
      <InviteCta />
      <WhatsAppCta />
    </main>
  );

}
