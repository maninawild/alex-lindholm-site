export const clientEvents = ["hiring_entry_click", "hiring_contact_click", "consultation_click", "contact_email_draft", "contact_submit_error"] as const;
export type ClientEvent = typeof clientEvents[number];
export const pages = ["home", "hiring", "consulting", "speaking", "other-public"] as const;
export const placements = ["navigation", "contact", "content"] as const;
export type Metric = { event: ClientEvent; page: typeof pages[number]; placement: typeof placements[number] };
export function metricPage(path: string): Metric["page"] | null {
  const route = path.replace(/^\/ru(?=\/|$)/, "") || "/";
  if (/^\/(private|api)(\/|$)/.test(route)) return null;
  if (route === "/") return "home";
  if (route === "/product-venture-leader") return "hiring";
  if (route === "/consulting") return "consulting";
  if (["/speaking", "/lectures-and-speaking"].includes(route)) return "speaking";
  return "other-public";
}
export function parseMetric(value: unknown): Metric | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const o = value as Record<string, unknown>;
  if (Object.keys(o).some(k => !["event", "page", "placement"].includes(k))) return null;
  if (!(clientEvents as readonly unknown[]).includes(o.event) || !(pages as readonly unknown[]).includes(o.page) || !(placements as readonly unknown[]).includes(o.placement)) return null;
  return o as Metric;
}
