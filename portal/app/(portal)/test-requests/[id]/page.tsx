import { requireAuth } from '@/lib/auth';
import { apiFetch } from '@/lib/api';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import StatusNotesPanel from './StatusNotesPanel';
import { notFound } from 'next/navigation';

interface StatusNote {
  id: number;
  status: string;
  note: string | null;
  created_at: string;
  created_by_name: string;
  created_by_role: string;
}

interface TestRequestDetail {
  id: number;
  doctor_id: number;
  first_name: string;
  last_name: string;
  test_name: string;
  category: string | null;
  doctor_name: string;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  status_notes?: StatusNote[];
}

export default async function TestRequestDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await requireAuth();
  let detail: TestRequestDetail | null = null;

  try {
    detail = await apiFetch<TestRequestDetail>(`/test-requests/${params.id}`);
  } catch {
    notFound();
  }

  if (!detail) notFound();

  const canUpdate =
    session.role === 'admin' ||
    (session.role === 'doctor' && detail.doctor_id === session.id);

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/test-requests" className="text-gray-400 hover:text-gray-600">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Request #{detail.id}</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {detail.first_name} {detail.last_name} · {detail.test_name}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900">Details</h2>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Status</p>
            <div className="mt-1"><Badge status={detail.status} /></div>
          </div>
          <div>
            <p className="text-gray-500">Doctor</p>
            <p className="mt-1 font-medium text-gray-900">{detail.doctor_name}</p>
          </div>
          <div>
            <p className="text-gray-500">Submitted</p>
            <p className="mt-1 text-gray-900">{formatDate(detail.created_at)}</p>
          </div>
          <div>
            <p className="text-gray-500">Last updated</p>
            <p className="mt-1 text-gray-900">{formatDate(detail.updated_at)}</p>
          </div>
          {detail.notes && (
            <div className="sm:col-span-2">
              <p className="text-gray-500">Request notes</p>
              <p className="mt-1 text-gray-900 whitespace-pre-wrap">{detail.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <StatusNotesPanel
        requestId={detail.id}
        currentStatus={detail.status}
        notes={detail.status_notes || []}
        canUpdate={canUpdate}
      />
    </div>
  );
}
