import { NextRequest, NextResponse } from "next/server";

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

function rewriteRegistrationReply(reply: string, requestUrl: string): string {
  const current = new URL(requestUrl);
  return reply.replace(/https?:\/\/localhost:3000\/register(\?tab=registration)?/g, () => {
    const target = new URL("/register", current);
    target.searchParams.set("tab", "registration");
    return target.toString();
  });
}

async function proxy(req: NextRequest) {
  const backendBase = process.env.BACKEND_URL || "";
  const target = new URL("/api/chat", backendBase);
  target.search = req.nextUrl.search;

  const incomingHeaders = filterHeaders(req.headers);
  const body = req.method === "GET" || req.method === "HEAD" ? undefined : await req.text();

  const upstream = await fetch(target, {
    method: req.method,
    headers: incomingHeaders,
    body,
  });

  const respHeaders = filterHeaders(upstream.headers);
  respHeaders.delete("content-encoding");
  respHeaders.delete("content-length");

  if (upstream.headers.get("content-type")?.includes("application/json")) {
    const payload = (await upstream.json()) as { reply?: string; detail?: string };
    if (typeof payload.reply === "string") {
      payload.reply = rewriteRegistrationReply(payload.reply, req.url);
    }
    return NextResponse.json(payload, {
      status: upstream.status,
      headers: respHeaders,
    });
  }

  const respBody = await upstream.arrayBuffer();

  return new NextResponse(respBody, {
    status: upstream.status,
    headers: respHeaders,
  });
}

export async function GET(req: NextRequest) {
  return proxy(req);
}

export async function POST(req: NextRequest) {
  return proxy(req);
}

export async function PUT(req: NextRequest) {
  return proxy(req);
}

export async function PATCH(req: NextRequest) {
  return proxy(req);
}

export async function DELETE(req: NextRequest) {
  return proxy(req);
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
