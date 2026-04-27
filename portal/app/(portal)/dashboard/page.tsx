import { requireAuth } from '@/lib/auth';
import { apiFetch } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/Card';
import { Users, FlaskConical, FileText, Clock } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface TestRequest {
  id: number;
  first_name: string;
  last_name: string;
  test_name: string;
  status: string;
  created_at: string;
}

interface AdminStats {
  total_doctors: number;
  total_patients: number;
  total_requests: number;
  pending: number;
  processing: number;
  completed: number;
}

export default async function DashboardPage() {
  const session = await requireAuth();
  const isAdmin = session.role === 'admin';

  let recentRequests: TestRequest[] = [];
  let adminStats: AdminStats | null = null;
  let patientCount = 0;
  let requestCount = 0;

  try {
    recentRequests = await apiFetch<TestRequest[]>('/test-requests');
    if (isAdmin) {
      adminStats = await apiFetch<AdminStats>('/admin/stats');
    } else {
      const patients = await apiFetch<unknown[]>('/patients');
      patientCount = patients.length;
      requestCount = recentRequests.length;
    }
  } catch {}

  const recent = recentRequests.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {session.name}</h1>
        <p className="text-gray-500 text-sm mt-1">Here&apos;s an overview of your activity</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isAdmin && adminStats ? (
          <>
            <StatCard icon={<Users size={22} className="text-brand-600" />}    label="Active Doctors"   value={adminStats.total_doctors} />
            <StatCard icon={<Users size={22} className="text-green-600" />}    label="Total Patients"   value={adminStats.total_patients} />
            <StatCard icon={<FlaskConical size={22} className="text-purple-600" />} label="Test Requests" value={adminStats.total_requests} />
            <StatCard icon={<Clock size={22} className="text-yellow-600" />}   label="Pending"          value={adminStats.pending} />
          </>
        ) : (
          <>
            <StatCard icon={<Users size={22} className="text-brand-600" />}       label="My Patients"      value={patientCount} />
            <StatCard icon={<FlaskConical size={22} className="text-purple-600" />} label="Test Requests"   value={requestCount} />
            <StatCard icon={<Clock size={22} className="text-yellow-600" />}      label="Pending"          value={recentRequests.filter(r => r.status === 'pending').length} />
            <StatCard icon={<FileText size={22} className="text-green-600" />}    label="Completed"        value={recentRequests.filter(r => r.status === 'completed').length} />
          </>
        )}
      </div>

      {/* Recent test requests */}
      <Card>
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Recent Test Requests</h2>
          <Link href="/test-requests" className="text-sm text-brand-600 hover:underline">View all</Link>
        </div>
        <CardContent className="p-0">
          {recent.length === 0 ? (
            <p className="px-6 py-8 text-center text-sm text-gray-400">No test requests yet</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                <tr>
                  <th className="px-6 py-3 text-left">Patient</th>
                  <th className="px-6 py-3 text-left">Test</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recent.map(r => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium text-gray-900">{r.first_name} {r.last_name}</td>
                    <td className="px-6 py-3 text-gray-600">{r.test_name}</td>
                    <td className="px-6 py-3"><Badge status={r.status} /></td>
                    <td className="px-6 py-3 text-gray-400">{formatDate(r.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 py-5">
        <div className="p-2.5 rounded-xl bg-gray-50">{icon}</div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
