import { NextRequest, NextResponse } from 'next/server';

const UPSTREAM = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api').replace(/\/$/, '');

async function proxy(req: NextRequest, pathParts: string[]) {
  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const subpath = pathParts.join('/');
  const url = new URL(req.url);
  const target = `${UPSTREAM}/${subpath}${url.search}`;

  const headers = new Headers();
  headers.set('Authorization', `Bearer ${token}`);

  const contentType = req.headers.get('content-type') || '';
  let body: BodyInit | undefined;

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    if (contentType.includes('multipart/form-data')) {
      body = await req.formData();
    } else if (contentType.includes('application/json')) {
      headers.set('Content-Type', 'application/json');
      body = await req.text();
    } else if (contentType) {
      body = await req.arrayBuffer();
    }
  }

  const upstreamRes = await fetch(target, { method: req.method, headers, body });

  // PDF / binary download
  const ct = upstreamRes.headers.get('content-type') || '';
  if (ct.includes('application/pdf') || ct.includes('application/octet-stream')) {
    const buf = await upstreamRes.arrayBuffer();
    const out = new NextResponse(buf, { status: upstreamRes.status });
    const disp = upstreamRes.headers.get('content-disposition');
    if (disp) out.headers.set('Content-Disposition', disp);
    out.headers.set('Content-Type', ct);
    return out;
  }

  const text = await upstreamRes.text();
  return new NextResponse(text, {
    status: upstreamRes.status,
    headers: { 'Content-Type': 'application/json' },
  });
}

type Ctx = { params: { path: string[] } };

export async function GET(req: NextRequest, ctx: Ctx) {
  return proxy(req, ctx.params.path);
}

export async function POST(req: NextRequest, ctx: Ctx) {
  return proxy(req, ctx.params.path);
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  return proxy(req, ctx.params.path);
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  return proxy(req, ctx.params.path);
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  return proxy(req, ctx.params.path);
}
