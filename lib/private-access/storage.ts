import "server-only";

import { Redis } from "@upstash/redis";
import type { PrivateAccessCode, PrivatePageId } from "./types";

const RATE_LIMIT_WINDOW_SECONDS = 15 * 60;
const RATE_LIMIT_MAX_ATTEMPTS = 8;

let redis: Redis | null = null;

function getRedis() {
  if (redis) return redis;
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error("Private access storage is not configured.");
  redis = new Redis({ url, token });
  return redis;
}

export async function checkRateLimit(identifier: string) {
  const client = getRedis();
  const key = `private:rate:${identifier}`;
  const attempts = await client.incr(key);
  if (attempts === 1) await client.expire(key, RATE_LIMIT_WINDOW_SECONDS);

  return {
    allowed: attempts <= RATE_LIMIT_MAX_ATTEMPTS,
    remaining: Math.max(0, RATE_LIMIT_MAX_ATTEMPTS - attempts),
  };
}

export async function clearRateLimit(identifier: string) {
  await getRedis().del(`private:rate:${identifier}`);
}

export async function recordSuccessfulAccess(
  code: PrivateAccessCode,
  pageId: PrivatePageId,
) {
  const client = getRedis();
  const key = `private:access:${code.id}:${pageId}`;
  const now = new Date().toISOString();
  const pipeline = client.pipeline();
  pipeline.hsetnx(key, "firstSuccessfulAccess", now);
  pipeline.hset(key, {
    codeId: code.id,
    label: code.label,
    page: pageId,
    latestSuccessfulAccess: now,
  });
  pipeline.hincrby(key, "accessCount", 1);
  await pipeline.exec();
}
