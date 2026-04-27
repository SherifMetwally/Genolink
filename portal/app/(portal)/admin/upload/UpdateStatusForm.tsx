'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { clientApi } from '@/lib/client-api';

interface TestRequest {
  id: number;
  first_name: string;
  last_name: string;
  test_name: string;
  status: string;
}

const STATUSES = ['pending', 'processing', 'completed', 'cancelled'];

export default function UpdateStatusForm({ requests }: { requests: TestRequest[] }) {
  const router   = useRouter();
  const [reqId,  setReqId]  = useState('');
  const [status, setStatus] = useState('');
  const [busy,   setBusy]   = useState(false);
  const [msg,    setMsg]    = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setMsg('');
    setBusy(true);

    try {
      const res = await fetch(clientApi(`test-requests/${reqId}/status`), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setMsg('Status updated successfully');
        setReqId(''); setStatus('');
        router.refresh();
      } else {
        const d = await res.json();
        setMsg(d.message || 'Failed to update status');
      }
    } catch {
      setMsg('Network error');
    } finally {
      setBusy(false);
    }
  }

  if (requests.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <h2 className="font-semibold text-gray-900">Update Test Status</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[220px] flex flex-col gap-1">
            <label htmlFor="update-reqId" className="text-sm font-medium text-gray-700">Test Request</label>
            <select
              id="update-reqId" value={reqId} onChange={e => setReqId(e.target.value)} required
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Select request…</option>
              {requests.map(r => (
                <option key={r.id} value={r.id}>
                  #{r.id} — {r.first_name} {r.last_name} — {r.test_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[150px] flex flex-col gap-1">
            <label htmlFor="update-status" className="text-sm font-medium text-gray-700">New Status</label>
            <select
              id="update-status" value={status} onChange={e => setStatus(e.target.value)} required
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Select status…</option>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <Button type="submit" disabled={busy}>{busy ? 'Updating…' : 'Update'}</Button>
        </form>
        {msg && <p className="mt-2 text-sm text-gray-600">{msg}</p>}
      </CardContent>
    </Card>
  );
}
