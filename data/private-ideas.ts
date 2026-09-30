export const privateIdeas = [
  {
    slug: "jewerly-hills-2",
    title: "Jewerly Hills 2.0",
    status: "Private Development Concept",
  },
  {
    slug: "youth-exchange",
    title: "Youth Exchange Ideas",
    status: "Private Development Concept",
  },
  {
    slug: "build-what-hate-cant",
    title: "InspireXchange Workshops Track for “Build What Hate Can’t” Hackathon",
    status: "Private Development Concept",
  },
  {
    slug: "gesharim-netherlands",
    title: "Gesharim Netherlands",
    status: "Private Development Concept",
  },
] as const;

export function getPrivateIdea(slug: string) {
  return privateIdeas.find((idea) => idea.slug === slug) ?? null;
}
