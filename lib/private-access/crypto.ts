import "server-only";

import { createHmac, pbkdf2 as pbkdf2Callback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { codeCanAccessPage, getAccessCodes, requireSessionSecret } from "./config";
import type { PrivateAccessCode, PrivatePageId, PrivateSession } from "./types";

const pbkdf2 = promisify(pbkdf2Callback);
const PBKDF2_ITERATIONS = 210_000;
const KEY_LENGTH = 32;
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

function safeEqual(left: Buffer, right: Buffer) {
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function findValidAccessCode(secret: string, pageId: PrivatePageId) {
  const normalized = secret.normalize("NFKC").trim();
  const codes = getAccessCodes().filter(
    (code) => !code.revoked && codeCanAccessPage(code, pageId),
  );

  let match: PrivateAccessCode | null = null;
  for (const code of codes) {
    const derived = await pbkdf2(
      normalized,
      Buffer.from(code.salt, "base64url"),
      PBKDF2_ITERATIONS,
      KEY_LENGTH,
      "sha256",
    );
    const expected = Buffer.from(code.hash, "base64url");
    if (safeEqual(derived, expected)) match = code;
  }

  return match;
}

export function signPrivateSession(code: PrivateAccessCode): string {
  const now = Math.floor(Date.now() / 1000);
  const session: PrivateSession = {
    codeId: code.id,
    label: code.label,
    pages: code.pages,
    issuedAt: now,
    expiresAt: now + SESSION_TTL_SECONDS,
  };
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  const signature = createHmac("sha256", requireSessionSecret())
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

export function verifyPrivateSession(token: string, pageId: PrivatePageId) {
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra) return null;

  const expected = createHmac("sha256", requireSessionSecret())
    .update(payload)
    .digest();
  const supplied = Buffer.from(signature, "base64url");
  if (!safeEqual(expected, supplied)) return null;

  try {
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as PrivateSession;
    if (!session.codeId || session.expiresAt <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    const activeCode = getAccessCodes().find(
      (code) => code.id === session.codeId && !code.revoked,
    );
    if (!activeCode || !codeCanAccessPage(activeCode, pageId)) return null;
    return session;
  } catch {
    return null;
  }
}

export function anonymousRateLimitKey(networkIdentifier: string) {
  return createHmac("sha256", requireSessionSecret())
    .update(networkIdentifier)
    .digest("base64url");
}

export const privateSessionMaxAge = SESSION_TTL_SECONDS;
