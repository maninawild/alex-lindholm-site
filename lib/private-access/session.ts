import "server-only";

import { cookies } from "next/headers";
import { privateSessionMaxAge, signPrivateSession, verifyPrivateSession } from "./crypto";
import type { PrivateAccessCode, PrivatePageId } from "./types";

const COOKIE_NAME = "alex_private_session";

export async function getPrivateSession(pageId: PrivatePageId) {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  return token ? verifyPrivateSession(token, pageId) : null;
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
