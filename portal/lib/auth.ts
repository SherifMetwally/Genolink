import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export interface JWTPayload {
  id: number;
  name: string;
  email: string;
  role: 'doctor' | 'admin';
}

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback_secret_change_me'
);

export async function getSession(): Promise<JWTPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

export async function requireAuth(): Promise<JWTPayload> {
  const session = await getSession();
  if (!session) redirect('/login');
  return session;
}

export async function requireAdmin(): Promise<JWTPayload> {
  const session = await requireAuth();
  if (session.role !== 'admin') redirect('/dashboard');
  return session;
}

export function getApiUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  return `${base}${path}`;
}
