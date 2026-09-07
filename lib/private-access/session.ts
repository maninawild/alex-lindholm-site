import "server-only";

import { cookies } from "next/headers";
import { privateSessionMaxAge, signPrivateSession } from "./crypto";
import type { PrivateAccessCode, PrivatePageId, PrivateSession } from "./types";

const COOKIE_NAME = "alex_private_session";

export async function getPrivateSession(pageId: PrivatePageId): Promise<PrivateSession> {
  const now = Math.floor(Date.now() / 1000);

  return {
    codeId: "direct-link-access",
    label: "Direct link access",
    pages: [pageId],
    issuedAt: now,
    expiresAt: now + privateSessionMaxAge,
  };
}

export async function createPrivateSession(code: PrivateAccessCode) {
  (await cookies()).set(COOKIE_NAME, signPrivateSession(code), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/private",
    maxAge: privateSessionMaxAge,
  });
}
