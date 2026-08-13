import type { ReactNode } from "react";

type PrivateProjectCardProps = {
  eyebrow: string;
  title: string;
  summary: string;
  children: ReactNode;
};

export function PrivateProjectCard({
  eyebrow,
  title,
  summary,
  children,
}: PrivateProjectCardProps) {
  return (
    <details className="group border-t border-ink/12 py-5 first:border-t-0 sm:py-6">
      <summary className="grid cursor-pointer list-none gap-4 sm:grid-cols-[8rem_1fr_auto] sm:items-start [&::-webkit-details-marker]:hidden">
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.17em] text-copper">
          {eyebrow}
        </span>
        <span>
          <span className="block text-xl font-semibold tracking-[-0.02em] text-ink sm:text-2xl">
            {title}
          </span>
          <span className="mt-2 block max-w-2xl text-sm leading-6 text-graphite/66">
            {summary}
          </span>
        </span>
        <span aria-hidden="true" className="text-2xl font-light leading-none text-graphite/38 transition group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="mt-5 max-w-3xl text-sm leading-7 text-graphite/76 sm:ml-32 sm:pl-4">
        {children}
      </div>
    </details>
  );
}
