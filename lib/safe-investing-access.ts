import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

export const courseAccessCookie = "safe_investing_access";
export const courseAccessMaxAge = 60 * 60 * 24 * 30;

const allowedCoursePrices = new Set(["eur:1900", "usd:2215"]);

function signingSecret() {
  const secret = process.env.PRIVATE_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("Course access signing is not configured.");
  }
  return secret;
}

function sign(payload: string) {
  return createHmac("sha256", signingSecret()).update(payload).digest("base64url");
}

export function createCourseAccessToken(sessionId: string) {
  const payload = Buffer.from(
    JSON.stringify({
      sessionId,
      expiresAt: Math.floor(Date.now() / 1000) + courseAccessMaxAge,
    }),
  ).toString("base64url");

  return `${payload}.${sign(payload)}`;
}

export function verifyCourseAccessToken(token?: string) {
  if (!token) return false;
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra) return false;

  const expected = Buffer.from(sign(payload), "base64url");
  const supplied = Buffer.from(signature, "base64url");
  if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) {
    return false;
  }

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      sessionId?: string;
      expiresAt?: number;
    };
    return Boolean(
      data.sessionId &&
        data.expiresAt &&
        data.expiresAt > Math.floor(Date.now() / 1000),
    );
  } catch {
    return false;
  }
}

async function stripeGet(path: string) {
  const reversedRestrictedKey = Object.keys(process.env).find((key) =>
    key.startsWith("rk_live_"),
  );
  const secret = process.env.STRIPE_SECRET_KEY || reversedRestrictedKey;
  if (!secret) return null;

  const response = await fetch(`https://api.stripe.com/v1/${path}`, {
    headers: { Authorization: `Bearer ${secret}` },
    cache: "no-store",
  });
  if (!response.ok) {
    console.error("Stripe API request failed", { path: path.split("?")[0], status: response.status });
    return null;
  }
  return response.json() as Promise<Record<string, unknown>>;
}

export async function verifyStripeCoursePayment(sessionId: string) {
  if (!/^cs_(?:test_|live_)?[A-Za-z0-9]+$/.test(sessionId)) return false;

  const session = await stripeGet(
    `checkout/sessions/${encodeURIComponent(sessionId)}`,
  );
  const validPaymentStatus =
    session?.payment_status === "paid" ||
    session?.payment_status === "no_payment_required";

  if (
    !session ||
    session.status !== "complete" ||
    !validPaymentStatus ||
    typeof session.payment_link !== "string"
  ) {
    return false;
  }

  return (
    typeof session.currency === "string" &&
    typeof session.amount_subtotal === "number" &&
    allowedCoursePrices.has(`${session.currency}:${session.amount_subtotal}`)
  );
}
