import { splitCompanyMentions } from "@/data/company-links";

export function CompanyMentions({ text }: { text: string }) {
  return splitCompanyMentions(text).map((part, index) => part.url ? (
    <a key={index} href={part.url} target="_blank" rel="noopener noreferrer" className="underline decoration-current/30 underline-offset-4 transition hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
      {part.text}
    </a>
  ) : part.text);
}
