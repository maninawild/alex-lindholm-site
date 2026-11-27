"use client";
import { Analytics } from "@vercel/analytics/next";
import { metricPage } from "@/lib/metrics/contract";
export function SiteAnalytics() {
  return <Analytics beforeSend={event => {
    if (navigator.doNotTrack === "1" || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return null;
    const url = new URL(event.url);
    if (!metricPage(url.pathname)) return null;
    url.search = ""; url.hash = "";
    return { ...event, url: url.toString() };
  }} />;
}
