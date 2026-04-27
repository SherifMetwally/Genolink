import { requireAdmin } from '@/lib/auth';
import { apiFetch } from '@/lib/api';
import UploadForm from './UploadForm';
import UpdateStatusForm from './UpdateStatusForm';

interface TestRequest {
  id: number;
  first_name: string;
  last_name: string;
  test_name: string;
  status: string;
  report_id?: number;
}

export default async function UploadReportPage() {
  await requireAdmin();
  let requests: TestRequest[] = [];

  try {
    requests = await apiFetch<TestRequest[]>('/test-requests');
  } catch {}

  const pending    = requests.filter(r => r.status !== 'cancelled');
  const noReport   = pending.filter(r => !r.report_id);
  const withReport = pending.filter(r => !!r.report_id);

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Upload Reports & Update Status</h1>
        <p className="text-sm text-gray-500 mt-1">Upload PDF reports for completed tests or update test request status</p>
      </div>

      <UpdateStatusForm requests={noReport.filter(r => r.status !== 'completed')} />
      <UploadForm requests={noReport} />
    </div>
  );
}
