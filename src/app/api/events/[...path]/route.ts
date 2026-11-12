import { NextRequest, NextResponse } from "next/server";

/**
 * Proxies /api/events/* to the API server (BACKEND_URL), the same way /api/register and /api/chat do.
 *   GET  /api/events/irg-2026          -> event details
 *   POST /api/events/irg-2026/register -> event registration
 *   POST /api/events/irg-2026/checkin  -> event check-in
 */
const HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "host",
  "content-length",
  "accept-encoding",
]);

function filterHeaders(headers: Headers) {
  const out = new Headers();
  for (const [key, value] of headers.entries()) {
    if (!HOP_BY_HOP.has(key.toLowerCase())) {
      out.set(key, value);
    }
  }
  return out;
}

type Ctx = { params: Promise<{ path?: string[] }> };

async function proxy(req: NextRequest, ctx: Ctx) {
  const backendBase = process.env.BACKEND_URL || "";
  if (!backendBase) {
    return NextResponse.json({ detail: "BACKEND_URL is not configured." }, { status: 500 });
  }

  const { path = [] } = await ctx.params;
  const target = new URL(`/api/events/${path.map(encodeURIComponent).join("/")}`, backendBase);
  target.search = req.nextUrl.search;

  const incomingHeaders = filterHeaders(req.headers);
  const body = req.method === "GET" || req.method === "HEAD" ? undefined : await req.text();

  try {
    const upstream = await fetch(target, {
      method: req.method,
      headers: incomingHeaders,
      body,
      cache: "no-store",
    });

    const respHeaders = filterHeaders(upstream.headers);
    respHeaders.delete("content-encoding");
    respHeaders.delete("content-length");
    const respBody = await upstream.arrayBuffer();

    return new NextResponse(respBody, {
      status: upstream.status,
      headers: respHeaders,
    });
  } catch {
    return NextResponse.json({ detail: "We couldn't reach the server. Please try again shortly." }, { status: 502 });
  }
}

export async function GET(req: NextRequest, ctx: Ctx) {
  return proxy(req, ctx);
}

export async function POST(req: NextRequest, ctx: Ctx) {
  return proxy(req, ctx);
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
