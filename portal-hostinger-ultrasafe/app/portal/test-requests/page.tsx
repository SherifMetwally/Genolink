import { requireAuth } from '@/lib/auth';
import { apiFetch } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { clientApi } from '@/lib/client-api';

interface TestRequest {
  id: number;
  first_name: string;
  last_name: string;
  test_name: string;
  category: string;
  doctor_name?: string;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  report_id?: number;
}

export default async function TestRequestsPage() {
  const session  = await requireAuth();
  const isAdmin  = session.role === 'admin';
  let requests: TestRequest[] = [];

  try {
    requests = await apiFetch<TestRequest[]>('/test-requests');
  } catch {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Test Requests</h1>
          <p className="text-sm text-gray-500 mt-1">{requests.length} request{requests.length !== 1 ? 's' : ''}</p>
        </div>
        {!isAdmin && (
          <Link href="/portal/test-requests/new">
            <Button size="sm"><Plus size={16} />New Request</Button>
          </Link>
        )}
      </div>

      <Card>
        <CardContent className="p-0">
          {requests.length === 0 ? (
            <p className="px-6 py-12 text-center text-sm text-gray-400">No test requests found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="px-6 py-3 text-left">#</th>
                    <th className="px-6 py-3 text-left">Patient</th>
                    <th className="px-6 py-3 text-left">Test</th>
                    {isAdmin && <th className="px-6 py-3 text-left">Doctor</th>}
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Submitted</th>
                    <th className="px-6 py-3 text-left">Updated</th>
                    <th className="px-6 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {requests.map(r => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-gray-400">#{r.id}</td>
                      <td className="px-6 py-3 font-medium text-gray-900">{r.first_name} {r.last_name}</td>
                      <td className="px-6 py-3 text-gray-600">
                        <span className="block">{r.test_name}</span>
                        {r.category && <span className="text-xs text-gray-400">{r.category}</span>}
                      </td>
                      {isAdmin && <td className="px-6 py-3 text-gray-600">{r.doctor_name}</td>}
                      <td className="px-6 py-3"><Badge status={r.status} /></td>
                      <td className="px-6 py-3 text-gray-400">{formatDate(r.created_at)}</td>
                      <td className="px-6 py-3 text-gray-400">{formatDate(r.updated_at)}</td>
                      <td className="px-6 py-3">
                        {r.report_id ? (
                          <a
                            href={clientApi(`reports/${r.report_id}/download`)}
                            className="text-xs text-brand-600 hover:underline"
                          >
                            Download
                          </a>
                        ) : isAdmin ? (
                          <Link href={`/admin/upload?requestId=${r.id}`} className="text-xs text-gray-400 hover:text-brand-600">
                            Upload
                          </Link>
                        ) : (
                          <span className="text-xs text-gray-300">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

