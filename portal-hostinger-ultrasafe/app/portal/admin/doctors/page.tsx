import { requireAdmin } from '@/lib/auth';
import { apiFetch } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { UserPlus } from 'lucide-react';
import DoctorActions from './DoctorActions';

interface Doctor {
  id: number;
  name: string;
  email: string;
  is_active: number;
  license_number: string | null;
  specialty: string | null;
  phone: string | null;
  created_at: string;
}

export default async function DoctorsPage() {
  await requireAdmin();
  let doctors: Doctor[] = [];

  try {
    doctors = await apiFetch<Doctor[]>('/admin/doctors');
  } catch {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Doctor Accounts</h1>
          <p className="text-sm text-gray-500 mt-1">{doctors.length} doctor{doctors.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/portal/admin/doctors/new">
          <Button size="sm"><UserPlus size={16} />Add Doctor</Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          {doctors.length === 0 ? (
            <p className="px-6 py-12 text-center text-sm text-gray-400">No doctor accounts yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Specialty</th>
                    <th className="px-6 py-3 text-left">License</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Joined</th>
                    <th className="px-6 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {doctors.map(d => (
                    <tr key={d.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">{d.name}</td>
                      <td className="px-6 py-3 text-gray-600">{d.email}</td>
                      <td className="px-6 py-3 text-gray-600">{d.specialty || '—'}</td>
                      <td className="px-6 py-3 text-gray-400 text-xs">{d.license_number || '—'}</td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${d.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {d.is_active ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-gray-400">{formatDate(d.created_at)}</td>
                      <td className="px-6 py-3">
                        <DoctorActions doctorId={d.id} isActive={!!d.is_active} />
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

