import { requireAuth } from '@/lib/auth';
import { apiFetch } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/Card';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import { UserPlus } from 'lucide-react';

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  dob: string | null;
  gender: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  doctor_name?: string;
  created_at: string;
}

export default async function PatientsPage() {
  const session  = await requireAuth();
  const isAdmin  = session.role === 'admin';
  let patients: Patient[] = [];

  try {
    patients = await apiFetch<Patient[]>('/patients');
  } catch {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-sm text-gray-500 mt-1">{patients.length} patient{patients.length !== 1 ? 's' : ''} found</p>
        </div>
        {!isAdmin && (
          <Link href="/patients/new">
            <Button size="sm">
              <UserPlus size={16} />
              Add Patient
            </Button>
          </Link>
        )}
      </div>

      <Card>
        <CardContent className="p-0">
          {patients.length === 0 ? (
            <p className="px-6 py-12 text-center text-sm text-gray-400">No patients yet. Add your first patient to get started.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Date of Birth</th>
                    <th className="px-6 py-3 text-left">Gender</th>
                    <th className="px-6 py-3 text-left">Contact</th>
                    {isAdmin && <th className="px-6 py-3 text-left">Doctor</th>}
                    <th className="px-6 py-3 text-left">Added</th>
                    <th className="px-6 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {patients.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">
                        {p.first_name} {p.last_name}
                      </td>
                      <td className="px-6 py-3 text-gray-600">{formatDate(p.dob)}</td>
                      <td className="px-6 py-3 text-gray-600 capitalize">{p.gender?.replace('_', ' ') || '—'}</td>
                      <td className="px-6 py-3 text-gray-600">
                        {p.contact_email || p.contact_phone || '—'}
                      </td>
                      {isAdmin && <td className="px-6 py-3 text-gray-600">{p.doctor_name || '—'}</td>}
                      <td className="px-6 py-3 text-gray-400">{formatDate(p.created_at)}</td>
                      <td className="px-6 py-3">
                        <Link
                          href={`/test-requests/new?patientId=${p.id}`}
                          className="text-xs text-brand-600 hover:underline whitespace-nowrap"
                        >
                          Request Test
                        </Link>
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
