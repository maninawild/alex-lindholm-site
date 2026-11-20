import type { Metadata } from "next";
import { SpeakingContent } from "@/components/speaking-content";
import { localizeMetadata } from "@/lib/i18n/metadata";
const original: Metadata = {
  title: "Lectures & Speaking",
  description:
    "Invite Alex Lindholm for interactive lectures, workshops, cultural salons, university sessions, and private talks on AI, society, Jewish culture, ethics, entrepreneurship, and the human future.",
  alternates: {
    canonical: "/lectures-and-speaking",
  },
  openGraph: {
    title: "Lectures & Speaking | Alex Lindholm",
    description:
      "Interactive sessions on AI, society, Jewish culture, ethics, communities, entrepreneurship, and the human future.",
    url: "/lectures-and-speaking",
  },
};
export const metadata = localizeMetadata(original, "/lectures-and-speaking", "en");
export default function Page(){return <SpeakingContent locale="en"/>;}
