import { NextResponse } from "next/server";

export function proxy() {
  const response = NextResponse.next();
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
  matcher: ["/private/:path*"],
};
