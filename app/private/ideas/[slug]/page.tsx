import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrivateIdeaPage } from "@/components/private/private-idea-page";
import { BuildWhatHateCantPage } from "@/components/private/build-what-hate-cant-page";
import { CommunityImpactTrackPage } from "@/components/private/community-impact-track-page";
import { YouthExchangeIdeasHub } from "@/components/private/youth-exchange-ideas-hub";
import { getPrivateIdea } from "@/data/private-ideas";

export const metadata: Metadata = {
  title: "Private Development Concept",
  description: "Unlisted private development concept.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
};

export default async function PrivateIdeaRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idea = getPrivateIdea(slug);
  if (!idea) notFound();

  if (slug === "youth-exchange") {
    return <YouthExchangeIdeasHub />;
  }

  if (slug === "build-what-hate-cant") {
    return <BuildWhatHateCantPage />;
  }

  if (slug === "community-impact-track-2027") {
    return <CommunityImpactTrackPage />;
  }

  return <PrivateIdeaPage title={idea.title} />;
}
