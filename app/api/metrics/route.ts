import { parseMetric } from "@/lib/metrics/contract";
import { incrementMetric } from "@/lib/metrics/server";
export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  if (process.env.SITE_METRICS_ENABLED !== "true") return new Response(null, { status: 204, headers });
  try {
    const origin = request.headers.get("origin");
    const host = request.headers.get("host") || new URL(request.url).host;
    if (!origin || new URL(origin).host !== host || !["https:", "http:"].includes(new URL(origin).protocol)) return new Response(null, { status: 403, headers });
    if (Number(request.headers.get("content-length") || 0) > 512) return new Response(null, { status: 413, headers });
    const body = await request.text();
    if (new TextEncoder().encode(body).length > 512) return new Response(null, { status: 413, headers });
    let payload: unknown;
    try { payload = JSON.parse(body); } catch { return new Response(null, { status: 400, headers }); }
    const metric = parseMetric(payload);
    if (!metric) return new Response(null, { status: 400, headers });
    const recorded = await incrementMetric(metric);
    return new Response(null, { status: recorded ? 204 : 503, headers });
  } catch { return new Response(null, { status: 503, headers }); }
}
