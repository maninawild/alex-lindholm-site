import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { TrackedLink } from "@/components/tracked-link";

export const metadata: Metadata = {
  title: "Connect",
  description: "Connect with Alex Lindholm, book a call, and find his social profiles.",
  alternates: { canonical: "/links" },
  openGraph: {
    title: "Connect with Alex Lindholm",
    description: "Book a call and find Alex Lindholm on social media.",
    url: "/links",
    images: [{ url: "/media/alex/linktree-portrait.jpg", alt: "Alex Lindholm" }],
  },
};

const links = [
  { id: "discovery", title: "15 min Discovery Call", detail: "Scouting / networking", href: "https://zcal.co/axlindholm/discovery", image: "/media/alex/alex-speaking-01.jpg" },
  { id: "consultation", title: "Book one hour consultation", detail: "€100", href: "https://zcal.co/axlindholm/1hour", image: "/media/alex/alex-workshop-01.jpg" },
  { id: "website", title: "Explore my website", detail: "Work, ideas and stories", href: "/", image: "/media/alex/alex-storyteller-01.jpg" },
  { id: "linkedin", title: "LinkedIn", detail: "Connect professionally", href: "https://www.linkedin.com/in/axlindholm/", image: "/media/alex/alex-portrait-01.jpg" },
  { id: "instagram", title: "Instagram", detail: "Going a bit personal", href: "https://www.instagram.com/alexplindholm", image: "/media/alex/alex-travel-01.jpg" },
];

const socialProfiles: { id: string; label: string; href: string; color: string; icon: ReactNode }[] = [
  { id: "instagram", color: "text-[#C13584]", label: "Instagram", href: "https://www.instagram.com/alexplindholm", icon: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></> },
  { id: "linkedin", color: "text-[#0A66C2]", label: "LinkedIn", href: "https://www.linkedin.com/in/axlindholm/", icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 10v7m0-10v.01M11 17v-7m0 3a3 3 0 0 1 6 0v4" /></> },
  { id: "whatsapp", color: "text-[#128C7E]", label: "WhatsApp", href: "https://wa.me/message/4OIGQ3FHUZQSD1", icon: <><path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.7a8.5 8.5 0 1 1 16.3-3.8Z" /><path d="m8.5 7.5 1.5 3-1 1c1 2 2 3 4 4l1-1 3 1.5c-.5 2-2 2-3 1.5-4-1.5-7-4.5-8-8-.3-1 .5-2 2.5-2Z" /></> },
  { id: "x", color: "text-black", label: "X", href: "https://x.com/AxLindholm", icon: <><path d="M4 3h4l12 18h-4ZM20 3 4 21" /></> },
  { id: "payment", color: "text-[#003087]", label: "PayPal", href: "https://paypal.me/axlind?country.x=IL&locale.x=en_US", icon: <><path d="m7 21 3-17h6a4 4 0 0 1 0 8h-6m3-5h4a4 4 0 0 1 0 8h-4l-1 6Z" /></> },
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
          <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full ring-4 ring-white shadow-quiet sm:h-28 sm:w-28">
            <Image src="/media/alex/linktree-portrait.jpg" alt="Alex Lindholm" fill priority sizes="112px" className="object-cover" />
          </div>
          <h1 className="mt-7 font-serif text-5xl leading-none sm:text-6xl">Alex Lindholm</h1>
          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-graphite sm:text-base">
            🇳🇱 NL Startup Visa Scout/ Accelerator<br />InsXchange Founder/ Relocation/ BizDev
          </p>
          <nav aria-label="Social profiles" className="mt-6 flex justify-center gap-2">
            {socialProfiles.map((social) => (
              <TrackedLink key={social.id} id={`social_${social.id}`} href={social.href} className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#CBD5E1] bg-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#F1F5F9] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric ${social.color}`}>
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{social.icon}</svg>
                <span className="sr-only">{social.label}</span>
              </TrackedLink>
            ))}
          </nav>
        </header>

        <div className="space-y-3" aria-label="Links">
          {links.map((link, index) => (
            <TrackedLink key={link.id} id={link.id} href={link.href} className={`group flex min-h-20 items-center gap-4 rounded-2xl border p-3 text-left transition hover:-translate-y-0.5 hover:shadow-quiet focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric ${index === 0 ? "border-[#244FD8] bg-[#244FD8] text-white hover:bg-[#1C3FAE]" : "border-[#25334D] bg-[#25334D] text-white hover:border-[#354968] hover:bg-[#354968]"}`}>
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg sm:h-14 sm:w-14">
                <Image src={link.image} alt="" fill sizes="56px" className="object-cover" />
              </span>
              <span className="min-w-0 flex-1"><span className="block text-base font-semibold sm:text-lg">{link.title}</span><span className={`mt-1 block text-sm text-white/80`}>{link.detail}</span></span>
              <span aria-hidden="true" className={`px-2 text-xl transition group-hover:translate-x-1 text-white`}>↗</span>
            </TrackedLink>
          ))}
        </div>
        <footer className="pt-12 text-center text-xs text-bluegray">© {new Date().getFullYear()} Alex Lindholm · <Link href="/" className="underline underline-offset-4">axlindholm.nl</Link></footer>
      </div>
    </main>
  );
}
