/** Browser-side API base: Next.js proxy adds Bearer token from httpOnly cookie. */
export function clientApi(path: string): string {
  const p = path.replace(/^\//, '');
  return `/api/backend/${p}`;
}
