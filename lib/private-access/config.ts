import "server-only";

import type { PrivateAccessCode, PrivatePageDefinition, PrivatePageId } from "./types";

export const privatePages: Record<string, PrivatePageDefinition> = {
  jewish: {
    id: "jewish",
    slug: "jewish",
    title: "Jewish Experience & Projects",
    subtitle: "Selected community, educational and cultural experience",
  },
};

export function getPrivatePageBySlug(slug: string) {
  return privatePages[slug] ?? null;
}

export function codeCanAccessPage(code: PrivateAccessCode, pageId: PrivatePageId) {
  return code.pages === "*" || code.pages.includes(pageId);
}

export function getAccessCodes(): PrivateAccessCode[] {
  const raw = process.env.PRIVATE_ACCESS_CODES;
  if (!raw) return [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("PRIVATE_ACCESS_CODES must contain valid JSON.");
  }

  if (!Array.isArray(parsed)) {
    throw new Error("PRIVATE_ACCESS_CODES must be a JSON array.");
  }

  return parsed.filter((entry): entry is PrivateAccessCode => {
    if (!entry || typeof entry !== "object") return false;
    const code = entry as Partial<PrivateAccessCode>;
    return Boolean(
      code.id &&
        code.label &&
        code.salt &&
        code.hash &&
        (code.pages === "*" || Array.isArray(code.pages)),
    );
  });
}

export function requireSessionSecret() {
  const secret = process.env.PRIVATE_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("PRIVATE_SESSION_SECRET must be at least 32 characters.");
  }
  return secret;
}
