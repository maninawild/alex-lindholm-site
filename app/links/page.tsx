import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TrackedLink } from "@/components/tracked-link";

export const metadata: Metadata = {
  title: "Connect",
  description: "Connect with Alex Lindholm, book a call, and find his social profiles.",
  alternates: { canonical: "/links" },
  openGraph: {
    title: "Connect with Alex Lindholm",
    description: "Book a call and find Alex Lindholm on social media.",
    url: "/links",
    images: [{ url: "/media/alex/alex-portrait-01.jpg", alt: "Alex Lindholm" }],
  },
};

const links = [
  { id: "discovery", title: "15 min Discovery Call", detail: "Scouting / networking", href: "https://zcal.co/axlindholm/discovery", image: "/media/alex/alex-speaking-01.jpg" },
  { id: "consultation", title: "Book one hour consultation", detail: "€100", href: "https://zcal.co/axlindholm/1hour", image: "/media/alex/alex-workshop-01.jpg" },
  { id: "website", title: "Explore my website", detail: "Work, ideas and stories", href: "/", image: "/media/alex/alex-storyteller-01.jpg" },
  { id: "linkedin", title: "LinkedIn", detail: "Connect professionally", href: "https://www.linkedin.com/in/axlindholm/", image: "/media/alex/alex-portrait-01.jpg" },
  { id: "instagram", title: "Instagram", detail: "Going a bit personal", href: "https://www.instagram.com/alexplindholm", image: "/media/alex/alex-travel-01.jpg" },
];

export default function LinksPage() {
  return (
    <main className="min-h-screen bg-paper px-5 pb-16 pt-7 text-ink sm:pt-10">
      <div className="mx-auto max-w-xl">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em]">
          <Link href="/" className="transition hover:text-electric">Alex Lindholm</Link>
          <Link href="/" className="text-bluegray transition hover:text-electric">Main site ↗</Link>
        </div>

        <header className="pb-10 pt-14 text-center sm:pt-20">
          <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full ring-4 ring-white shadow-quiet sm:h-36 sm:w-36">
            <Image src="/media/alex/alex-portrait-01.jpg" alt="Alex Lindholm" fill priority sizes="144px" className="object-cover object-[center_25%]" />
          </div>
          <h1 className="mt-7 font-serif text-5xl leading-none sm:text-6xl">Alex Lindholm</h1>
          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-graphite sm:text-base">
            🇳🇱 NL Startup Visa Scout/ Accelerator<br />InsXchange Founder/ Relocation/ BizDev
          </p>
          <nav aria-label="Social profiles" className="mt-7 flex flex-wrap justify-center gap-3 text-sm font-semibold">
            <TrackedLink id="social_instagram" href="https://www.instagram.com/alexplindholm" className="rounded-full border border-ink/15 px-4 py-2 transition hover:border-electric hover:text-electric">Instagram ↗</TrackedLink>
            <TrackedLink id="social_linkedin" href="https://www.linkedin.com/in/axlindholm/" className="rounded-full border border-ink/15 px-4 py-2 transition hover:border-electric hover:text-electric">LinkedIn ↗</TrackedLink>
            <TrackedLink id="social_whatsapp" href="https://wa.me/message/4OIGQ3FHUZQSD1" className="rounded-full border border-ink/15 px-4 py-2 transition hover:border-electric hover:text-electric">WhatsApp ↗</TrackedLink>
            <TrackedLink id="social_x" href="https://x.com/AxLindholm" className="rounded-full border border-ink/15 px-4 py-2 transition hover:border-electric hover:text-electric">X ↗</TrackedLink>
            <TrackedLink id="social_payment" href="https://paypal.me/axlind?country.x=IL&locale.x=en_US" className="rounded-full border border-ink/15 px-4 py-2 transition hover:border-electric hover:text-electric">PayPal ↗</TrackedLink>
          </nav>
        </header>

        <div className="space-y-3" aria-label="Links">
          {links.map((link, index) => (
            <TrackedLink key={link.id} id={link.id} href={link.href} className={`group flex min-h-24 items-center gap-4 rounded-2xl border p-3 text-left transition hover:-translate-y-0.5 hover:shadow-quiet focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric ${index === 0 ? "border-ink bg-ink text-white" : "border-ink/10 bg-white hover:border-electric/40"}`}>
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-20">
                <Image src={link.image} alt="" fill sizes="80px" className="object-cover" />
              </span>
              <span className="min-w-0 flex-1"><span className="block text-base font-semibold sm:text-lg">{link.title}</span><span className={`mt-1 block text-sm ${index === 0 ? "text-white/70" : "text-bluegray"}`}>{link.detail}</span></span>
              <span aria-hidden="true" className={`px-2 text-xl transition group-hover:translate-x-1 ${index === 0 ? "text-white" : "text-electric"}`}>↗</span>
            </TrackedLink>
          ))}
        </div>
        <footer className="pt-12 text-center text-xs text-bluegray">© {new Date().getFullYear()} Alex Lindholm · <Link href="/" className="underline underline-offset-4">axlindholm.nl</Link></footer>
      </div>
    </main>
  );
}
