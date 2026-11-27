"use client";
import { metricPage, type ClientEvent, type Metric } from "./contract";
export function recordIntent(enabled: boolean, event: ClientEvent, placement: Metric["placement"] = "contact") {
  if (!enabled || navigator.doNotTrack === "1" || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return;
  const page = metricPage(location.pathname);
  if (!page) return;
  void fetch("/api/metrics", { method: "POST", credentials: "omit", keepalive: true, referrerPolicy: "no-referrer",
    headers: { "Content-Type": "application/json" }, body: JSON.stringify({ event, page, placement }) }).catch(() => {});
}
