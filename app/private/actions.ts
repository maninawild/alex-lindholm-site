"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPrivatePageBySlug } from "@/lib/private-access/config";
import { anonymousRateLimitKey, findValidAccessCode } from "@/lib/private-access/crypto";
import { createPrivateSession } from "@/lib/private-access/session";
import {
  checkRateLimit,
  clearRateLimit,
  recordSuccessfulAccess,
} from "@/lib/private-access/storage";

export type PrivateAccessState = { error: string | null };

export async function unlockPrivatePage(
  _previousState: PrivateAccessState,
  formData: FormData,
): Promise<PrivateAccessState> {
  const slug = String(formData.get("page") ?? "");
  const requestedReturnPath = String(formData.get("returnPath") ?? "");
  const submittedCode = String(formData.get("accessCode") ?? "");
  const page = getPrivatePageBySlug(slug);

  if (!page || !submittedCode || submittedCode.length > 256) {
    return { error: "That access code could not be verified." };
  }

  try {
    const requestHeaders = await headers();
    const forwarded = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
    const networkIdentifier =
      forwarded || requestHeaders.get("x-real-ip") || "unavailable";
    const rateKey = anonymousRateLimitKey(networkIdentifier);
    const rateLimit = await checkRateLimit(rateKey);

    if (!rateLimit.allowed) {
      return {
        error: "Too many attempts. Please wait 15 minutes before trying again.",
      };
    }

    const code = await findValidAccessCode(submittedCode, page.id);
    if (!code) return { error: "That access code could not be verified." };

    await recordSuccessfulAccess(code, page.id);
    await clearRateLimit(rateKey);
    await createPrivateSession(code);
  } catch (error) {
    console.error("Private access could not be completed", error);
    return {
      error: "Private access is temporarily unavailable. Please try again shortly.",
    };
  }

  const defaultReturnPath = `/private/${page.slug}`;
  const returnPath = /^\/private\/ideas\/[a-z0-9-]+$/.test(requestedReturnPath)
    ? requestedReturnPath
    : defaultReturnPath;

  redirect(returnPath);
}
