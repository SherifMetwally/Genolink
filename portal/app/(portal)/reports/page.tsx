import { requireAuth } from '@/lib/auth';
import { apiFetch } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';
import { Download } from 'lucide-react';
import { clientApi } from '@/lib/client-api';

interface Report {
  id: number;
  first_name: string;
  last_name: string;
  test_name: string;
  original_name: string | null;
  uploaded_by_name?: string;
  uploaded_at: string;
}

export default async function ReportsPage() {
  const session = await requireAuth();
  const isAdmin = session.role === 'admin';
  let reports: Report[] = [];

  try {
    reports = await apiFetch<Report[]>('/reports');
  } catch {}

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-sm text-gray-500 mt-1">{reports.length} report{reports.length !== 1 ? 's' : ''} available</p>
      </div>

      <Card>
        <CardContent className="p-0">
          {reports.length === 0 ? (
            <p className="px-6 py-12 text-center text-sm text-gray-400">No reports available yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="px-6 py-3 text-left">Patient</th>
                    <th className="px-6 py-3 text-left">Test</th>
                    <th className="px-6 py-3 text-left">File</th>
                    {isAdmin && <th className="px-6 py-3 text-left">Uploaded by</th>}
                    <th className="px-6 py-3 text-left">Uploaded</th>
                    <th className="px-6 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {reports.map(r => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">{r.first_name} {r.last_name}</td>
                      <td className="px-6 py-3 text-gray-600">{r.test_name}</td>
                      <td className="px-6 py-3 text-gray-500 text-xs">{r.original_name || 'report.pdf'}</td>
                      {isAdmin && <td className="px-6 py-3 text-gray-600">{r.uploaded_by_name}</td>}
                      <td className="px-6 py-3 text-gray-400">{formatDate(r.uploaded_at)}</td>
                      <td className="px-6 py-3">
                        <a
                          href={clientApi(`reports/${r.id}/download`)}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-700"
                        >
                          <Download size={14} />
                          Download
                        </a>
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
