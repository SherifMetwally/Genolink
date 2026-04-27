import { requireAdmin } from '@/lib/auth';
import { apiFetch } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/Card';
import TestCatalogActions from './TestCatalogActions';
import AddTestForm from './AddTestForm';

interface Test {
  id: number;
  name: string;
  description: string | null;
  category: string | null;
  is_active: number;
}

export default async function TestCatalogPage() {
  await requireAdmin();
  let tests: Test[] = [];

  try {
    tests = await apiFetch<Test[]>('/admin/test-catalog');
  } catch {}

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Test Catalog</h1>
        <p className="text-sm text-gray-500 mt-1">{tests.length} test{tests.length !== 1 ? 's' : ''} in catalog</p>
      </div>

      {/* Add new test form */}
      <AddTestForm />

      {/* Catalog table */}
      <Card>
        <CardContent className="p-0">
          {tests.length === 0 ? (
            <p className="px-6 py-12 text-center text-sm text-gray-400">No tests in catalog yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Category</th>
                    <th className="px-6 py-3 text-left">Description</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {tests.map(t => (
                    <tr key={t.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">{t.name}</td>
                      <td className="px-6 py-3 text-gray-600">{t.category || '—'}</td>
                      <td className="px-6 py-3 text-gray-500 text-xs max-w-xs truncate">{t.description || '—'}</td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${t.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {t.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <TestCatalogActions testId={t.id} isActive={!!t.is_active} />
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
