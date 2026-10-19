"use client";

import { track } from "@vercel/analytics";
import type { ReactNode } from "react";

export function TrackedLink({ id, href, className, children }: { id: string; href: string; className?: string; children: ReactNode }) {
  return <a href={href} className={className} onClick={() => track("link_hub_click", { link: id })}>{children}</a>;
}
