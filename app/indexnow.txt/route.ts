export const dynamic = "force-dynamic";

export function GET() {
  const key = process.env.INDEXNOW_KEY;

  if (!key || !/^[A-Za-z0-9-]{8,128}$/.test(key)) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(key, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
