import type { Metadata } from "next";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { PrivateAccessGate } from "@/components/private/private-access-gate";
import { PrivateIdeaPage } from "@/components/private/private-idea-page";
import { getPrivateIdea } from "@/data/private-ideas";
import { getPrivatePageBySlug } from "@/lib/private-access/config";
import { getPrivateSession } from "@/lib/private-access/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Private Development Concept",
  description: "Private access required.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
  openGraph: {
    title: "Private Access | Alex Lindholm",
    description: "Private access required.",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Private Access | Alex Lindholm",
    description: "Private access required.",
    images: [],
  },
};

const accessDefinition = getPrivatePageBySlug("jewish")!;

export default async function PrivateIdeaRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await connection();

  const { slug } = await params;
  const idea = getPrivateIdea(slug);
  if (!idea) notFound();

  const session = await getPrivateSession(accessDefinition.id);
  if (!session) {
    return (
      <PrivateAccessGate
        pageSlug={accessDefinition.slug}
        returnPath={`/private/ideas/${idea.slug}`}
      />
    );
  }

  return <PrivateIdeaPage title={idea.title} />;
}
