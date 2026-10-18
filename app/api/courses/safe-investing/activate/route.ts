import { NextRequest, NextResponse } from "next/server";
import {
  courseAccessCookie,
  courseAccessMaxAge,
  createCourseAccessToken,
  verifyStripeCoursePayment,
} from "@/lib/safe-investing-access";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id") ?? "";
  const accessUrl = new URL(
    "/ru/courses/safe-investing/access",
    request.nextUrl.origin,
  );

  if (!(await verifyStripeCoursePayment(sessionId))) {
    accessUrl.searchParams.set("error", "payment");
    return NextResponse.redirect(accessUrl);
  }

  const response = NextResponse.redirect(accessUrl);
  response.cookies.set(courseAccessCookie, createCourseAccessToken(sessionId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/ru/courses/safe-investing/access",
    maxAge: courseAccessMaxAge,
  });
  return response;
}
