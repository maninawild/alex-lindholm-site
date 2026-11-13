import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { createHmac, randomUUID } from "node:crypto";
import { parseContactInput } from "@/lib/contact-input";

export async function POST(request: Request) {
  const reply = (error: string, status: number) => NextResponse.json({ error }, { status, headers: { "Cache-Control": "no-store" } });
  const origin = request.headers.get("origin");
  const host = request.headers.get("host") || new URL(request.url).host;
  try {
    if (!origin || new URL(origin).host !== host || !["https:", "http:"].includes(new URL(origin).protocol)) return reply("Request not allowed.", 403);
  } catch { return reply("Request not allowed.", 403); }
  if (Number(request.headers.get("content-length") || 0) > 20000) return reply("Message too long.", 413);
  const body = await request.text();
  if (Buffer.byteLength(body) > 20000) return reply("Message too long.", 413);
  let parsed;
  try { parsed = parseContactInput(JSON.parse(body)); } catch { return reply("Check the form fields.", 400); }
  if (!parsed) return reply("Check the form fields.", 400);
  const key = process.env.RESEND_API_KEY, from = process.env.CONTACT_FROM;
  const url = process.env.KV_REST_API_URL, token = process.env.KV_REST_API_TOKEN, salt = process.env.CONTACT_RATE_SECRET;
  if (process.env.CONTACT_PROVIDER !== "resend" || !key || !from || !url || !token || !salt) return reply("Sending is unavailable. Please email Alex directly.", 503);
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const bucket = Math.floor(Date.now() / 900000);
    const identifier = createHmac("sha256", salt).update(`${bucket}:${ip}`).digest("hex");
    const redis = new Redis({ url, token });
    const count = await redis.incr(`contact:rate:${identifier}`);
    if (count === 1) await redis.expire(`contact:rate:${identifier}`, 900);
    if (count > 5) return reply("Please wait before sending another message.", 429);
    const id = randomUUID();
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST", signal: AbortSignal.timeout(10000),
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": id },
      body: JSON.stringify({ from, to: ["alex@inspirexchange.nl"], reply_to: parsed.email, subject: `Website: ${parsed.intent}`, text: `${parsed.message}\n\nFrom: ${parsed.name}\nReply to: ${parsed.email}\nReference: ${id}` }),
    });
    if (!response.ok) return reply("Sending failed. Please retry or email Alex directly.", 502);
    const result = await response.json();
    if (typeof result.id !== "string") return reply("Sending could not be confirmed.", 502);
    return NextResponse.json({ accepted: true, reference: id }, { headers: { "Cache-Control": "no-store" } });
  } catch { return reply("Sending is unavailable. Please email Alex directly.", 503); }
}
