import type { ReactNode } from "react";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/insights/breadcrumbs";

export function InsightsLandingHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  meta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  meta?: ReactNode;
}) {
  return (
    <header className="mx-auto max-w-7xl px-5 pb-12 pt-8 sm:px-8 lg:pb-16 lg:pt-12">
      <Breadcrumbs items={breadcrumbs} />
      <p className="mt-8 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-copper">
        {eyebrow}
      </p>
      <div className="mt-5 grid gap-6 lg:grid-cols-[0.9fr_0.55fr] lg:items-end">
        <h1 className="max-w-4xl font-serif text-5xl font-medium leading-[0.98] tracking-[-0.02em] text-balance sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <div>
          <p className="max-w-xl text-base leading-7 text-graphite/72">{description}</p>
          {meta ? <div className="mt-4 text-sm text-graphite/58">{meta}</div> : null}
        </div>
      </div>
    </header>
  );
}
