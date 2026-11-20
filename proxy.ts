import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const isPrivate = request.nextUrl.pathname === "/private" || request.nextUrl.pathname.startsWith("/private/");
  requestHeaders.set("x-site-pathname", request.nextUrl.pathname);
  const hasPrivateTranslation = ["/private", "/private/jewish"].includes(request.nextUrl.pathname);
  const locale = request.nextUrl.pathname === "/ru" || request.nextUrl.pathname.startsWith("/ru/") || (hasPrivateTranslation && request.nextUrl.searchParams.get("lang") === "ru") ? "ru" : "en";
  requestHeaders.set("x-site-locale", locale);
  requestHeaders.set("x-private-locale", locale);
  requestHeaders.set("x-private-pathname", request.nextUrl.pathname);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  if (!isPrivate) return response;
  response.headers.set("Cache-Control", "private, no-store, max-age=0, must-revalidate");
  response.headers.set(
    "X-Robots-Tag",
    "noindex, nofollow, noarchive, nosnippet, noimageindex",
  );
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\.).*)"],
};
