import { Redis } from "@upstash/redis";
import type { Metric } from "./contract";
export async function incrementMetric(metric: Metric | { event: "contact_provider_accepted"; page: "home"; placement: "contact" }) {
  if (process.env.SITE_METRICS_ENABLED !== "true" || !process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return false;
  const redis = new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });
  const day = new Date().toISOString().slice(0, 10);
  const key = `site-metrics:v1:${day}`;
  // Bounded keys and daily aggregates only: no identity, IP, message, email or URL.
  const count = await redis.incr(`site-metrics:v1:budget:${day}`);
  if (count === 1) await redis.expire(`site-metrics:v1:budget:${day}`, 86400 * 63);
  if (count > 10000) return false;
  await redis.hincrby(key, `${metric.event}:${metric.page}:${metric.placement}`, 1);
  await redis.expire(key, 86400 * 63);
  await redis.set("site-metrics:v1:startedAt", new Date().toISOString(), { nx: true });
  return true;
}
